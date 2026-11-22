import os, re
from templates import get_header_html, get_footer_html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, 'site')

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

def update_file(path):
    rel = os.path.relpath(path, SITE).replace('\\', '/')
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
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

    # 1. Replace header
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

    # 2. In about_us/index.html, ensure Vision and Mission are white
    if rel == 'about_us/index.html':
        content = re.sub(r'(data-id="ec224c7"[\s\S]*?<h2 class="elementor-heading-title[^"]*)"([^>]*>)\s*Our Vision\s*</h2>',
                         r'\1" style="color: #FFFFFF !important; font-family: \'Playfair Display\', Georgia, serif;"\2Our Vision</h2>', content)
        content = re.sub(r'(data-id="c49bbe5"[\s\S]*?<h2 class="elementor-heading-title[^"]*)"([^>]*>)\s*Our Mission\s*</h2>',
                         r'\1" style="color: #FFFFFF !important; font-family: \'Playfair Display\', Georgia, serif;"\2Our Mission</h2>', content)
        content = re.sub(r'(data-id="2055672"[\s\S]*?<p)>', r'\1 style="color: #DEE6E0 !important; font-size: 1.05rem; line-height: 1.7;">', content)
        content = re.sub(r'(data-id="3e5f206"[\s\S]*?<p)>', r'\1 style="color: #DEE6E0 !important; font-size: 1.05rem; line-height: 1.7;">', content)

    # 3. Cache buster on serk-theme.css
    content = re.sub(r'serk-theme\.css(?:\?[^"]*)?', 'serk-theme.css?v=20261122-serk05', content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated: {rel}")

def main():
    pages = [os.path.join(r, f) for r, _, fs in os.walk(SITE) for f in fs if f.endswith('.html') and 'wp-' not in r]
    for p in sorted(pages):
        update_file(p)
    print(f"Total updated: {len(pages)} pages")

if __name__ == '__main__':
    main()
