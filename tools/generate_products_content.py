import os
import re

# ==============================================================================
# 1. Project definitions with 7 Categories and all 23 items
# ==============================================================================

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

from tools.parse_projects import projects

PROJECTS_BY_SLUG = {p['slug']: p for p in projects}

# Image fallbacks for missing assets
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

def generate_products_html():
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

    return f"""    <!-- Main Content -->
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

print("Products HTML generator ready.")
