import os
import re

# ==============================================================================
# 1. Parse ALL_PROJECTS from src/lib/constants.ts
# ==============================================================================
with open('src/lib/constants.ts', 'r', encoding='utf-8') as f:
    ts = f.read()

start_idx = ts.find('export const ALL_PROJECTS')
arr_start = ts.find('[', start_idx)
arr_end = ts.rfind('];')
projects_raw = ts[arr_start:arr_end+1]

project_blocks = re.findall(r'\{\s*slug:\s*\'([^\']+)\'([^}]+)\}', projects_raw, re.DOTALL)

projects = []
for slug, block in project_blocks:
    def get_val(key):
        m = re.search(rf"{key}:\s*['\"]([^'\"]+)['\"]", block)
        return m.group(1) if m else ''
    
    name = get_val('name')
    category = get_val('category')
    maturity = get_val('maturity')
    summary = get_val('summary')
    image_url = get_val('imageUrl') or '/images/serk-logo-mark.png'
    public_cta = get_val('publicCta') or 'View Platform Dossier'
    cta_url = get_val('ctaUrl') or f'/contact?interest={slug}'

    projects.append({
        'slug': slug,
        'name': name,
        'category': category,
        'maturity': maturity,
        'summary': summary,
        'imageUrl': image_url,
        'publicCta': public_cta,
        'ctaUrl': cta_url,
    })

PROJECTS_BY_SLUG = {p['slug']: p for p in projects}

CATEGORIES_ORDER = [
    {
        'id': 'sector-intelligence',
        'title': 'Sector Intelligence',
        'subtitle': 'Specialized vertical platforms engineering decisions and workflows for construction and healthcare.',
        'slugs': ['construction-intelligence-os', 'health-os', 'clinic-os']
    },
    {
        'id': 'ai-security',
        'title': 'AI & Security Research',
        'subtitle': 'Engineering foundations for governed multi-model intelligence, cybersecurity, and quantitative estimating.',
        'slugs': ['5d-engineering-lab', 'quorum', 'sentinel-ai']
    },
    {
        'id': 'enterprise-operations',
        'title': 'Enterprise & Operations',
        'subtitle': 'Connected software environments that streamline core administrative, financial, sales, and supply chain operations.',
        'slugs': ['office-os', 'finance', 'pos-hospitality', 'materials']
    },
    {
        'id': 'solutions',
        'title': 'Core Solutions & Integrations',
        'subtitle': 'Purpose-built operational automation, workflow copilots, and financial infrastructure linking legacy systems.',
        'slugs': ['ai-automation', 'serk-pay']
    },
    {
        'id': 'ventures',
        'title': 'Digital Ventures',
        'subtitle': 'Autonomous digital platforms exploring urban mobility, connected delivery, transparent commerce, and heritage tourism.',
        'slugs': ['segar-ride', 'segar-delivery', 'lo-africa', 'visit-tigray']
    },
    {
        'id': 'affiliated',
        'title': 'Affiliated & Associated Businesses',
        'subtitle': 'Frontline enterprise proving grounds and leadership-associated companies providing real-world operational testing.',
        'slugs': ['kabun-coffee', 'yummy-bakery', 'vision-real-estate', 'senselet-construction']
    },
    {
        'id': 'future-innovation',
        'title': 'Future Innovation & Sovereign Tech',
        'subtitle': 'Long-term industrial research, vehicle assembly concepts, clean energy accessories, and African developer talent development.',
        'slugs': ['senselet-motors', 'serk-hardware', 'academy-community']
    }
]

IMAGE_FALLBACKS = {
    'office-os': '/wp-content/uploads/serk/serk-photo-lobby.jpg',
    'materials': '/wp-content/uploads/serk/serk-platforms.svg',
    'senselet-motors': '/wp-content/uploads/serk/serk-why-choose.jpg',
    'kabun-coffee': '/wp-content/uploads/serk/serk-photo-pos.jpg',
    'yummy-bakery': '/wp-content/uploads/serk/serk-why-choose.jpg',
    'vision-real-estate': '/images/pill_tower.jpg',
    'senselet-construction': '/wp-content/uploads/serk/serk-photo-construction.jpg',
    'serk-hardware': '/images/client-zoscales.png',
    'academy-community': '/images/pill_team.jpg',
    'segar-delivery': '/wp-content/uploads/serk/serk-why-choose.jpg',
    'lo-africa': '/images/client-innobiz.png',
    'visit-tigray': '/images/pill_tower.jpg',
    'ai-automation': '/images/serk-photo-engineering.jpg',
    'serk-pay': '/images/client-hibret-bank.png',
    'quorum': '/images/serk-photo-engineering.jpg',
    'sentinel-ai': '/images/pill_market.jpg'
}

MATURITY_BADGES = {
    'PRODUCTION_AVAILABLE': ('serk-badge-production', 'Production Available'),
    'PILOT_PRIVATE_BETA': ('serk-badge-pilot', 'Pilot / Private Beta'),
    'INTERNAL_ALPHA': ('serk-badge-alpha', 'Internal Alpha / Development'),
    'RESEARCH_PROTOTYPE': ('serk-badge-alpha', 'Research & Prototype'),
    'OPERATING_VENTURE': ('serk-badge-production', 'Operating Venture'),
    'CONCEPT': ('serk-badge-alpha', 'Concept / Feasibility'),
}

# ==============================================================================
# 2. Build New Main Content for Products Page
# ==============================================================================
nav_pills = []
sections_html = []

for cat in CATEGORIES_ORDER:
    cid = cat['id']
    ctitle = cat['title']
    csub = cat['subtitle']
    slugs = cat['slugs']
    count = len(slugs)

    nav_pills.append(f'<a href="#{cid}" class="serk-cat-pill">{ctitle} <span style="opacity:0.65;font-size:11px;">({count})</span></a>')

    cards_html = []
    for s in slugs:
        p = PROJECTS_BY_SLUG.get(s)
        if not p:
            continue

        img = IMAGE_FALLBACKS.get(s, p['imageUrl'])
        b_class, b_text = MATURITY_BADGES.get(p['maturity'], ('serk-badge-alpha', p['maturity']))
        name = p['name']
        summary = p['summary']
        cta_text = p['publicCta'] or 'View Dossier'
        cta_url = f'/products/{s}/'

        card = f"""        <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 26px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: transform 0.2s ease, box-shadow 0.2s ease;">
            <div>
                <div style="height: 160px; overflow: hidden; border-radius: 6px; margin-bottom: 16px; background: #F8FAFC; display: flex; align-items: center; justify-content: center; border: 1px solid #E2E8F0;">
                    <img src="{img}" alt="{name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <span class="serk-badge {b_class}"><span>{b_text}</span></span>
                <h3 style="font-size: 1.28rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0; line-height: 1.3;">{name}</h3>
                <p style="font-size: 0.92rem; color: #5B6761; line-height: 1.6; margin: 0 0 16px 0;">{summary}</p>
            </div>
            <div style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
                <a href="{cta_url}" class="elementor-button" style="padding: 9px 16px; font-size: 0.88rem; text-decoration: none; display: inline-block;">{cta_text}</a>
                <a href="/contact_us/?interest={s}" style="color: #0D4634; font-size: 0.85rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">Inquire &rarr;</a>
            </div>
        </div>"""
        cards_html.append(card)

    cards_grid = "\n".join(cards_html)
    section = f"""<!-- Category Section: {ctitle} ({cid}) -->
<div id="{cid}" style="margin-bottom: 70px; scroll-margin-top: 160px;">
    <div style="border-bottom: 2px solid #101513; padding-bottom: 14px; margin-bottom: 28px; display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <h2 style="font-size: 1.75rem; font-weight: 700; color: #101513; margin: 0;">{ctitle}</h2>
            <span style="font-size: 0.85rem; font-weight: 600; color: #5B6761; background: #F4F7F5; padding: 3px 10px; border-radius: 20px; border: 1px solid #DEE6E0;">{count} Platforms</span>
        </div>
        <p style="color: #5B6761; margin: 0; font-size: 0.98rem; line-height: 1.5;">{csub}</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
{cards_grid}
    </div>
</div>"""
    sections_html.append(section)

pills_joined = "\n  ".join(nav_pills)
all_sections = "\n\n".join(sections_html)

NEW_MAIN_CONTENT = f"""    <!-- Main Content -->
    <main style="padding: 40px 20px 100px 20px; background: #FCFCFE;">
        <div style="max-width: 1200px; margin: 0 auto;">

            <!-- Sticky Category Jump Navigation Bar -->
            <nav class="serk-category-nav" style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 14px 18px; margin-bottom: 48px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; position: sticky; top: 76px; z-index: 40; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
                <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #5B6761; letter-spacing: 0.06em; margin-right: 6px;">Categories:</span>
  {pills_joined}
            </nav>

{all_sections}

        </div>
    </main>"""

# Replace in public/products/index.html and site/products/index.html
MAIN_REGEX = re.compile(r'<!-- Main Content -->\s*<main.*?</main>', re.DOTALL)

for target_file in ['public/products/index.html', 'site/products/index.html']:
    with open(target_file, 'r', encoding='utf-8') as fp:
        html = fp.read()
    if MAIN_REGEX.search(html):
        new_html = MAIN_REGEX.sub(NEW_MAIN_CONTENT, html, count=1)
        with open(target_file, 'w', encoding='utf-8') as fp:
            fp.write(new_html)
        print(f"Updated main content in {target_file}")
    else:
        print(f"ERROR: could not find <main> block in {target_file}")

# ==============================================================================
# 3. Add CSS for category pills and header dropdowns
# ==============================================================================
CATEGORY_CSS = """
/* ==========================================================================
   SERK Category Navigation & Header Dropdown Menu
   ========================================================================== */
.serk-cat-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: #F4F7F5;
  color: #101513;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid #DEE6E0;
  font-family: var(--serk-font-sans, 'Poppins', sans-serif);
  font-size: 12.5px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.18s ease;
}

.serk-cat-pill:hover {
  background-color: #0D4634;
  color: #FFFFFF !important;
  border-color: #0D4634;
  transform: translateY(-1px);
}

.serk-menu-item-has-children {
  position: relative;
}

.serk-menu-item-has-children .serk-sub-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 250px;
  background-color: #FFFFFF;
  border: 1px solid #DEE6E0;
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  padding: 8px 0;
  list-style: none !important;
  margin: 0 !important;
  z-index: 100;
}

.serk-menu-item-has-children:hover .serk-sub-menu,
.serk-menu-item-has-children:focus-within .serk-sub-menu {
  display: block;
}

.serk-sub-menu li {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.serk-sub-menu a {
  display: block;
  padding: 9px 18px;
  font-family: var(--serk-font-sans, 'Poppins', sans-serif);
  font-size: 13.5px;
  font-weight: 500;
  color: #101513;
  text-decoration: none;
  transition: all 0.15s ease;
}

.serk-sub-menu a:hover {
  background-color: #F4F7F5;
  color: #0D4634;
  padding-left: 22px;
}
"""

for css_file in [
    'public/wp-content/themes/royal-elementor-kit/serk-theme.css',
    'site/wp-content/themes/royal-elementor-kit/serk-theme.css'
]:
    with open(css_file, 'r', encoding='utf-8') as fp:
        css = fp.read()
    if '.serk-cat-pill' not in css:
        css += CATEGORY_CSS
        with open(css_file, 'w', encoding='utf-8') as fp:
            fp.write(css)
        print(f"Added category styles to {css_file}")

# ==============================================================================
# 4. Update Header Nav across all HTML files
# ==============================================================================
OLD_NAV_ITEM = '<li><a href="/products/" class="serk-nav-link active">Products</a></li>'
OLD_NAV_ITEM_INACTIVE = '<li><a href="/products/" class="serk-nav-link ">Products</a></li>'
OLD_NAV_ITEM_PLAIN = '<li><a href="/products/" class="serk-nav-link">Products</a></li>'

NEW_NAV_ITEM = """<li class="serk-menu-item-has-children">
            <a href="/products/" class="serk-nav-link {active_class}">Products <svg style="display:inline-block;vertical-align:middle;margin-left:3px;" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></a>
            <ul class="serk-sub-menu">
              <li><a href="/products/#sector-intelligence">Sector Intelligence (3)</a></li>
              <li><a href="/products/#ai-security">AI &amp; Security (3)</a></li>
              <li><a href="/products/#enterprise-operations">Enterprise &amp; Operations (4)</a></li>
              <li><a href="/products/#solutions">Core Solutions (2)</a></li>
              <li><a href="/products/#ventures">Digital Ventures (4)</a></li>
              <li><a href="/products/#affiliated">Affiliated Businesses (4)</a></li>
              <li><a href="/products/#future-innovation">Future Innovation (3)</a></li>
            </ul>
          </li>"""

# Also update mobile drawer under Products
OLD_MOBILE_PRODUCTS = '<li><a href="/products/" style="color:#101513;font-weight:700;">Products</a></li>'
OLD_MOBILE_PRODUCTS_GENERIC = '<li><a href="/products/" style="">Products</a></li>'

NEW_MOBILE_PRODUCTS = """<li class="serk-mobile-item-has-children">
        <a href="/products/" style="color:#101513;font-weight:700;">Products</a>
        <ul style="list-style:none;margin:4px 0 10px 12px;padding:0;border-left:2px solid #DEE6E0;">
          <li><a href="/products/#sector-intelligence" style="font-size:13px;color:#5B6761;padding:2px 0 2px 10px;">Sector Intelligence</a></li>
          <li><a href="/products/#ai-security" style="font-size:13px;color:#5B6761;padding:2px 0 2px 10px;">AI &amp; Security</a></li>
          <li><a href="/products/#enterprise-operations" style="font-size:13px;color:#5B6761;padding:2px 0 2px 10px;">Enterprise &amp; Operations</a></li>
          <li><a href="/products/#solutions" style="font-size:13px;color:#5B6761;padding:2px 0 2px 10px;">Core Solutions</a></li>
          <li><a href="/products/#ventures" style="font-size:13px;color:#5B6761;padding:2px 0 2px 10px;">Digital Ventures</a></li>
          <li><a href="/products/#affiliated" style="font-size:13px;color:#5B6761;padding:2px 0 2px 10px;">Affiliated Businesses</a></li>
          <li><a href="/products/#future-innovation" style="font-size:13px;color:#5B6761;padding:2px 0 2px 10px;">Future Innovation</a></li>
        </ul>
      </li>"""

import glob
html_files = sorted(set(glob.glob('public/**/*.html', recursive=True) + glob.glob('site/**/*.html', recursive=True)))
nav_updated_count = 0

for hpath in html_files:
    with open(hpath, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()
    
    modified = False
    
    # Check desktop nav
    if OLD_NAV_ITEM in content:
        content = content.replace(OLD_NAV_ITEM, NEW_NAV_ITEM.format(active_class="active"))
        modified = True
    elif OLD_NAV_ITEM_INACTIVE in content:
        content = content.replace(OLD_NAV_ITEM_INACTIVE, NEW_NAV_ITEM.format(active_class=""))
        modified = True
    elif OLD_NAV_ITEM_PLAIN in content:
        content = content.replace(OLD_NAV_ITEM_PLAIN, NEW_NAV_ITEM.format(active_class=""))
        modified = True
        
    # Check mobile drawer
    if OLD_MOBILE_PRODUCTS in content:
        content = content.replace(OLD_MOBILE_PRODUCTS, NEW_MOBILE_PRODUCTS)
        modified = True
    elif OLD_MOBILE_PRODUCTS_GENERIC in content:
        content = content.replace(OLD_MOBILE_PRODUCTS_GENERIC, NEW_MOBILE_PRODUCTS)
        modified = True

    if modified:
        with open(hpath, 'w', encoding='utf-8') as fp:
            fp.write(content)
        nav_updated_count += 1

print(f"Updated header navigation with Categories dropdown in {nav_updated_count} / {len(html_files)} HTML files.")
