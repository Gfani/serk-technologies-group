import os, sys, re, glob, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, 'site')
ORIGINAL = os.path.join(ROOT, 'original')
CSS_DIR = os.path.join(SITE, 'wp-content', 'uploads', 'elementor', 'css')
THEME_CSS_SITE = os.path.join(SITE, 'wp-content', 'themes', 'royal-elementor-kit', 'serk-theme.css')
THEME_CSS_ORIG = os.path.join(ORIGINAL, 'wp-content', 'themes', 'royal-elementor-kit', 'serk-theme.css')

sys.path.insert(0, os.path.join(ROOT, 'tools'))
from templates import get_header_html, get_footer_html

def step1_update_gen_images():
    print("=== Step 1: Update gen_images.py palette to pure Black & White ===")
    gen_path = os.path.join(ROOT, 'tools', 'gen_images.py')
    with open(gen_path, 'r', encoding='utf-8') as f:
        c = f.read()

    c = re.sub(r"P,\s*P2,\s*PLUM,\s*INK\s*=\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*'[^']+'",
               "P, P2, PLUM, INK = '#101513', '#000000', '#101513', '#101513'", c)
    c = re.sub(r"TAN,\s*TAN2,\s*LAV,\s*MINT,\s*TEAL\s*=\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*'[^']+'",
               "TAN, TAN2, LAV, MINT, TEAL = '#2A302D', '#444C47', '#F4F7F5', '#DEE6E0', '#101513'", c)
    c = re.sub(r"GREEN,\s*RED\s*=\s*'[^']+',\s*'[^']+'",
               "GREEN, RED = '#101513', '#5B6761'", c)

    with open(gen_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("Regenerating SVGs...")
    out_dir = os.path.join(SITE, 'wp-content', 'uploads', 'serk')
    cmd = [sys.executable, gen_path, ORIGINAL, out_dir]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("gen_images stderr:", res.stderr)
    else:
        print("SVGs regenerated successfully!")

def step2_sync_serk_theme_css():
    print("=== Step 2: Sync and finalize Black & White serk-theme.css ===")
    with open(THEME_CSS_ORIG, 'r', encoding='utf-8') as f:
        css = f.read()

    extra_rules = """
/* Status Badges */
.serk-badge-production {
  background-color: #101513 !important;
  color: #FFFFFF !important;
  border: 1px solid #101513 !important;
}
.serk-badge-pilot {
  background-color: #F4F7F5 !important;
  color: #101513 !important;
  border: 1px solid #DEE6E0 !important;
}
.serk-badge-alpha {
  background-color: #FFFFFF !important;
  color: #5B6761 !important;
  border: 1px solid #DEE6E0 !important;
}

/* Headings on any dark containers remain crisp white */
.serk-cta-banner h1, .serk-cta-banner h2, .serk-cta-banner h3, .serk-cta-banner h4,
.serk-dark-sec h1, .serk-dark-sec h2, .serk-dark-sec h3, .serk-dark-sec h4,
.elementor-element[style*="082E22"] .elementor-heading-title,
.elementor-element[style*="0D4634"] .elementor-heading-title,
.elementor-element[style*="101513"] .elementor-heading-title,
.elementor-element[style*="#101513"] .elementor-heading-title,
.elementor-section[style*="082E22"] .elementor-heading-title,
.elementor-section[style*="0D4634"] .elementor-heading-title,
.elementor-section[style*="101513"] .elementor-heading-title,
.elementor-section-boxed[style*="082E22"] .elementor-heading-title,
.elementor-section-boxed[style*="0D4634"] .elementor-heading-title,
.elementor-section-boxed[style*="101513"] .elementor-heading-title {
  color: #FFFFFF !important;
}
"""
    if '.serk-badge-production' not in css:
        css += extra_rules

    with open(THEME_CSS_ORIG, 'w', encoding='utf-8') as f:
        f.write(css)
    with open(THEME_CSS_SITE, 'w', encoding='utf-8') as f:
        f.write(css)
    print("Synced serk-theme.css to both original/ and site/!")

def step3_purge_elementor_post_css():
    print("=== Step 3: Purge leftover Zuri and Green colors from Elementor post-*.css ===")
    color_replacements = [
        (re.compile(r'#463746', re.I), '#101513'),
        (re.compile(r'#241924', re.I), '#101513'),
        (re.compile(r'#1a5aff', re.I), '#101513'),
        (re.compile(r'#e4c19d', re.I), '#101513'),
        (re.compile(r'#f4ac1c', re.I), '#101513'),
        (re.compile(r'#0d4634', re.I), '#101513'),
        (re.compile(r'#2d735a', re.I), '#101513'),
        (re.compile(r'#082e22', re.I), '#101513'),
        (re.compile(r'#458b72', re.I), '#2A302D'),
        (re.compile(r'#162b23', re.I), '#101513'),
    ]

    count = 0
    for p in glob.glob(os.path.join(CSS_DIR, '*.css')):
        with open(p, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        orig = content
        for pattern, repl in color_replacements:
            content = pattern.sub(repl, content)
        if content != orig:
            with open(p, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            print(f"Purged colors in: {os.path.basename(p)}")
    print(f"Updated {count} Elementor CSS files.")

def step4_update_html_pages():
    print("=== Step 4: Apply 2-Row Header & Black Footer & Clean Colors in HTML pages ===")
    PAGE_MAP = {
        'index.html': 'home',
        'about_us/index.html': 'about',
        'products/index.html': 'products',
        'industries/index.html': 'industries',
        'services/index.html': 'services',
        'ventures/index.html': 'ventures',
        'partners/index.html': 'partners',
        'gallery/index.html': 'gallery',
        'insight/index.html': 'insights',
        'contact_us/index.html': 'contact',
        'privacy/index.html': 'privacy',
        'terms/index.html': 'terms',
    }

    pages = [os.path.join(r, f) for r, _, fs in os.walk(SITE) for f in fs if f.endswith('.html') and 'wp-' not in r]

    for p in sorted(pages):
        rel = os.path.relpath(p, SITE).replace('\\', '/')
        with open(p, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        active_key = PAGE_MAP.get(rel, 'home')
        if 'products' in rel: active_key = 'products'
        elif 'industries' in rel: active_key = 'industries'
        elif 'services' in rel: active_key = 'services'
        elif 'ventures' in rel: active_key = 'ventures'
        elif 'about' in rel: active_key = 'about'
        elif 'contact' in rel: active_key = 'contact'
        elif 'partner' in rel: active_key = 'partners'
        elif 'gallery' in rel: active_key = 'gallery'
        elif 'insight' in rel: active_key = 'insights'

        header_html = get_header_html(active_key)
        footer_html = get_footer_html()

        # 1. Replace Header
        if '<!-- SERK Structured 2-Row Global Header -->' in content:
            content = re.sub(r'<!-- SERK Structured 2-Row Global Header -->.*?</header>', header_html.strip(), content, count=1, flags=re.S)
        elif '<header class="serk-header"' in content:
            content = re.sub(r'<header class="serk-header".*?</header>', header_html.strip(), content, count=1, flags=re.S)
        elif 'data-elementor-id="1174"' in content:
            idx_1174 = content.find('data-elementor-id="1174"')
            h_start = content.rfind('<div', 0, idx_1174)
            sec_end = content.find('</section>', idx_1174)
            div_end = content.find('</div>', sec_end) + len('</div>')
            content = content[:h_start] + header_html + content[div_end:]

        # 2. Replace Footer
        if '<!-- SERK Enterprise Global Footer' in content:
            content = re.sub(r'<!-- SERK Enterprise Global Footer.*?</footer>', footer_html.strip(), content, count=1, flags=re.S)
        elif '<footer class="serk-global-footer"' in content:
            content = re.sub(r'<footer class="serk-global-footer".*?</footer>', footer_html.strip(), content, count=1, flags=re.S)
        elif 'data-elementor-id="1175"' in content:
            idx_1175 = content.find('data-elementor-id="1175"')
            f_start = content.rfind('<div', 0, idx_1175)
            f_end = content.find('</div>', f_start)
            content = content[:f_start] + footer_html + content[f_start:]

        # 3. Clean up leftover green hex codes in inline styles
        content = re.sub(r'#0[dD]4634', '#101513', content)
        content = re.sub(r'#2[dD]735[aA]', '#101513', content)
        content = re.sub(r'#082[eE]22', '#101513', content)
        content = re.sub(r'#458[bB]72', '#2A302D', content)
        content = re.sub(r'#162[bB]23', '#101513', content)

        # 4. In about_us/index.html, ensure Vision and Mission are cleanly styled
        if rel == 'about_us/index.html':
            # Clean any previously stacked styles first
            content = re.sub(r'data-id="ec224c7"([\s\S]*?)<h2[^>]*>\s*Our Vision\s*</h2>',
                             'data-id="ec224c7"\\1<h2 class="elementor-heading-title elementor-size-default" style="color: #FFFFFF !important; font-family: \'Playfair Display\', Georgia, serif;">Our Vision</h2>', content)
            content = re.sub(r'data-id="c49bbe5"([\s\S]*?)<h2[^>]*>\s*Our Mission\s*</h2>',
                             'data-id="c49bbe5"\\1<h2 class="elementor-heading-title elementor-size-default" style="color: #FFFFFF !important; font-family: \'Playfair Display\', Georgia, serif;">Our Mission</h2>', content)
            content = re.sub(r'data-id="2055672"([\s\S]*?)<p[^>]*>',
                             'data-id="2055672"\\1<p style="color: #DEE6E0 !important; font-size: 1.05rem; line-height: 1.7;">', content)
            content = re.sub(r'data-id="3e5f206"([\s\S]*?)<p[^>]*>',
                             'data-id="3e5f206"\\1<p style="color: #DEE6E0 !important; font-size: 1.05rem; line-height: 1.7;">', content)

        # 5. Cache buster on serk-theme.css
        content = re.sub(r'serk-theme\.css(?:\?[^"]*)?', 'serk-theme.css?v=20261122-bw01', content)

        with open(p, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {rel}")
    print(f"Total HTML pages updated: {len(pages)}")

if __name__ == '__main__':
    step1_update_gen_images()
    step2_sync_serk_theme_css()
    step3_purge_elementor_post_css()
    step4_update_html_pages()
    print("=== All updates completed successfully! ===")
