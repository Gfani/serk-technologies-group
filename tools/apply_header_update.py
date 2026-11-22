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

    header_html = get_header_html(active_key)
    footer_html = get_footer_html()

    # 1. Replace existing serk-header
    pattern_header = re.compile(r'<!-- SERK Structured 2-Row Global Header -->.*?<!-- Mobile Drawer:.*?</div>\s*</div>\s*</header>', re.S)
    if pattern_header.search(content):
        content = pattern_header.sub(header_html.strip(), content)
    else:
        # Check for header tag with id="serk-global-header"
        pattern_header2 = re.compile(r'<header class="serk-header" id="serk-global-header">.*?</header>', re.S)
        if pattern_header2.search(content):
            content = pattern_header2.sub(header_html.strip(), content)

    # 2. Replace existing serk-global-footer
    pattern_footer = re.compile(r'<!-- SERK Enterprise Global Footer \(#082E22\) -->.*?</footer>', re.S)
    if pattern_footer.search(content):
        content = pattern_footer.sub(footer_html.strip(), content)
    else:
        pattern_footer2 = re.compile(r'<footer class="serk-global-footer" id="serk-global-footer"[^>]*>.*?</footer>', re.S)
        if pattern_footer2.search(content):
            content = pattern_footer2.sub(footer_html.strip(), content)

    # 3. Add cache buster to serk-theme.css
    content = re.sub(r'serk-theme\.css(?:\?[^"]*)?', 'serk-theme.css?v=20261122-02', content)

    # 4. Fix corrupted UTF-8 entities
    content = content.replace('Â·', '·')
    content = content.replace('â€”', '—')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated: {rel}")

def main():
    pages = [os.path.join(r, f) for r, _, fs in os.walk(SITE) for f in fs if f.endswith('.html')]
    for p in sorted(pages):
        update_file(p)
    print(f"Total updated: {len(pages)} pages")

if __name__ == '__main__':
    main()
