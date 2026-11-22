import os, re, glob
from templates import get_header_html, get_footer_html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, 'site')
ORIGINAL = os.path.join(ROOT, 'original')
THEME_CSS_SITE = os.path.join(SITE, 'wp-content', 'themes', 'royal-elementor-kit', 'serk-theme.css')
THEME_CSS_ORIG = os.path.join(ORIGINAL, 'wp-content', 'themes', 'royal-elementor-kit', 'serk-theme.css')

def update_css():
    print("=== Updating serk-theme.css for exact Zuri size footer layout ===")
    with open(THEME_CSS_SITE, 'r', encoding='utf-8') as f:
        css = f.read()

    # Locate and replace footer styles
    markers = [
        '/* ========================================================\n   SINGLE PROFESSIONAL FOOTER',
        '/* ========================================================\n   SINGLE COMPACT FOOTER',
        '/* ========================================================\n   SINGLE COMPACT PROFESSIONAL FOOTER',
        '/* ========================================================\n   EXACT ZURI SIZE FOOTER'
    ]
    for m in markers:
        if m in css:
            idx = css.find(m)
            css = css[:idx]
            break

    compact_footer_css = """
/* ========================================================
   EXACT ZURI SIZE FOOTER (1175)
   ======================================================== */
.elementor-1175,
.elementor-element-5b611c4 {
  background-color: #101513 !important;
  color: #FFFFFF !important;
  padding: 22px 20px 16px 20px !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.elementor-1175 .elementor-element-5384061 > .elementor-element-populated,
.elementor-1175 .elementor-element-3bf3c57 > .elementor-element-populated,
.elementor-1175 .elementor-element-7e0acc4 > .elementor-element-populated {
  margin: 0 !important;
  padding: 0 !important;
}

.elementor-element-e959569 {
  background-color: #000000 !important;
  padding: 7px 20px !important;
  border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
}

.serk-copyright-left {
  font-size: 11px !important;
  color: #7E8A84 !important;
  line-height: 1.35 !important;
}

.serk-copyright-right {
  font-size: 11px !important;
}

.serk-footer-sublink {
  color: #9AA6A0 !important;
  text-decoration: none !important;
  transition: color 0.2s ease !important;
}

.serk-footer-sublink:hover {
  color: #FFFFFF !important;
  text-decoration: underline !important;
}

.elementor-element-e1f0665 .elementor-heading-title,
.elementor-element-c12ecba .elementor-heading-title,
.elementor-element-8c3ad61 .elementor-heading-title {
  color: #FFFFFF !important;
  font-family: var(--serk-font-sans) !important;
  font-size: 0.95rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: 0.04em !important;
  margin-bottom: 8px !important;
}

.serk-footer-col-vertical {
  display: flex !important;
  flex-direction: column !important;
  gap: 4px !important;
}

.serk-footer-grid-split {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 4px 18px !important;
}

@media (max-width: 767px) {
  .serk-footer-grid-split {
    grid-template-columns: 1fr !important;
    gap: 4px !important;
  }
}

.serk-footer-link {
  color: #A0AAA5 !important;
  font-family: var(--serk-font-sans) !important;
  font-size: 0.84rem !important;
  font-weight: 400 !important;
  text-decoration: none !important;
  display: block !important;
  line-height: 1.35 !important;
  transition: color 0.2s ease, transform 0.2s ease !important;
}

.serk-footer-link:hover {
  color: #FFFFFF !important;
  text-decoration: none !important;
  transform: translateX(3px) !important;
}
"""
    css = css.strip() + "\n" + compact_footer_css.strip() + "\n"

    with open(THEME_CSS_SITE, 'w', encoding='utf-8') as f:
        f.write(css)
    with open(THEME_CSS_ORIG, 'w', encoding='utf-8') as f:
        f.write(css)
    print("Updated serk-theme.css with Zuri-sized footer styles!")

def update_page(path):
    rel = os.path.relpath(path, SITE).replace('\\', '/')
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # 1. Clean out any leftover serk-global-footer
    content = re.sub(r'<!-- SERK Enterprise Global Footer.*?</footer>\s*', '', content, flags=re.S)
    content = re.sub(r'<footer class="serk-global-footer".*?</footer>\s*', '', content, flags=re.S)

    # 2. Replace elementor-1175 footer with the new Zuri-sized compact footer
    footer_html = get_footer_html()
    if 'data-elementor-id="1175"' in content:
        pattern = r'<div\s+data-elementor-type="wp-post"\s+data-elementor-id="1175"\s+class="elementor\s+elementor-1175">[\s\S]*?</div>\s*(?=<script|\s*</body>)'
        if re.search(pattern, content):
            content = re.sub(pattern, footer_html.strip() + '\n', content, count=1)
        else:
            idx = content.find('data-elementor-id="1175"')
            div_start = content.rfind('<div', 0, idx)
            idx_script = content.find('<script', idx)
            div_end = content.rfind('</div>', idx, idx_script) + len('</div>')
            content = content[:div_start] + footer_html.strip() + '\n' + content[div_end:]

    # 3. Cache buster on serk-theme.css
    content = re.sub(r'serk-theme\.css(?:\?[^"]*)?', 'serk-theme.css?v=20261122-zurisize01', content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated: {rel}")

def main():
    update_css()
    pages = [os.path.join(r, f) for r, _, fs in os.walk(SITE) for f in fs if f.endswith('.html') and 'wp-' not in r]
    for p in sorted(pages):
        update_page(p)
    print(f"Total pages updated: {len(pages)}")

if __name__ == '__main__':
    main()
