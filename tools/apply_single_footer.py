import os, re, glob, shutil
from templates import get_header_html, get_footer_html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, 'site')
ORIGINAL = os.path.join(ROOT, 'original')
THEME_CSS_SITE = os.path.join(SITE, 'wp-content', 'themes', 'royal-elementor-kit', 'serk-theme.css')
THEME_CSS_ORIG = os.path.join(ORIGINAL, 'wp-content', 'themes', 'royal-elementor-kit', 'serk-theme.css')

def sync_assets():
    print("=== Syncing brand assets ===")
    src_mark = os.path.join(SITE, 'wp-content', 'uploads', 'serk', 'serk-logo-mark.png')
    dst_mark_dir = os.path.join(ORIGINAL, 'wp-content', 'uploads', 'serk')
    os.makedirs(dst_mark_dir, exist_ok=True)
    dst_mark = os.path.join(dst_mark_dir, 'serk-logo-mark.png')
    if os.path.exists(src_mark):
        shutil.copy2(src_mark, dst_mark)
        print(f"Copied {src_mark} to {dst_mark}")

def update_css():
    print("=== Updating serk-theme.css for Zuri-style spacious 3-col footer ===")
    with open(THEME_CSS_SITE, 'r', encoding='utf-8') as f:
        css = f.read()

    # Locate and replace footer styles
    markers = [
        '/* ========================================================\n   SINGLE PROFESSIONAL FOOTER',
        '/* ========================================================\n   SINGLE COMPACT FOOTER',
        '/* ========================================================\n   SINGLE COMPACT PROFESSIONAL FOOTER',
        '/* ========================================================\n   EXACT ZURI SIZE FOOTER',
        '/* ========================================================\n   SPACIOUS PROFESSIONAL FOOTER',
        '/* ========================================================\n   ZURI REFERENCE REFACTORED FOOTER'
    ]
    for m in markers:
        if m in css:
            idx = css.find(m)
            css = css[:idx]
            break

    zuri_footer_css = """
/* ========================================================
   ZURI REFERENCE REFACTORED FOOTER (1175)
   ======================================================== */
html, body {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

.elementor-1175 {
  background-color: #101513 !important;
  color: #FFFFFF !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.elementor-element-5b611c4 {
  background-color: #101513 !important;
  color: #FFFFFF !important;
  padding: 72px 0 64px 0 !important;
  margin: 0 !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.elementor-1175 .elementor-element-5384061 > .elementor-element-populated,
.elementor-1175 .elementor-element-3bf3c57 > .elementor-element-populated,
.elementor-1175 .elementor-element-7e0acc4 > .elementor-element-populated {
  margin: 0 !important;
  padding: 0 !important;
}

.serk-footer-container {
  display: grid !important;
  grid-template-columns: 1.2fr 1fr 1.3fr !important;
  gap: 64px !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
  padding: 0 32px !important;
  box-sizing: border-box !important;
}

.serk-footer-col {
  display: flex !important;
  flex-direction: column !important;
}

.serk-footer-col-brand {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
}

.serk-footer-mark-link {
  display: block !important;
  position: static !important;
  margin: 0 0 24px 0 !important;
  padding: 0 !important;
  line-height: 1 !important;
}

.serk-footer-mark-img {
  width: 44px !important;
  height: 44px !important;
  max-width: 44px !important;
  max-height: 44px !important;
  display: block !important;
  position: static !important;
  object-fit: contain !important;
}

.serk-footer-heading {
  color: #FFFFFF !important;
  font-family: var(--serk-font-sans, 'Poppins', sans-serif) !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  letter-spacing: 0.02em !important;
  margin: 0 0 20px 0 !important;
  padding: 0 !important;
  text-transform: none !important;
}

.serk-footer-heading-visitus {
  color: #E3AB72 !important;
  margin: 0 0 14px 0 !important;
}

.serk-footer-socials {
  display: flex !important;
  align-items: center !important;
  position: static !important;
  margin: 0 !important;
  padding: 0 !important;
}

.serk-footer-social-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 34px !important;
  height: 34px !important;
  border-radius: 4px !important;
  border: 1px solid rgba(227, 171, 114, 0.35) !important;
  background-color: rgba(227, 171, 114, 0.08) !important;
  color: #E3AB72 !important;
  transition: all 0.2s ease !important;
  text-decoration: none !important;
}

.serk-footer-social-btn:hover {
  background-color: #E3AB72 !important;
  color: #101513 !important;
  border-color: #E3AB72 !important;
  transform: translateY(-2px) !important;
}

.serk-footer-social-btn svg {
  width: 16px !important;
  height: 16px !important;
  fill: currentColor !important;
}

.serk-footer-nav {
  margin: 0 !important;
  padding: 0 !important;
}

.serk-footer-list {
  display: flex !important;
  flex-direction: column !important;
  gap: 14px !important;
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.serk-footer-list li {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1.4 !important;
}

.serk-footer-link {
  color: #CDE5DC !important;
  font-family: var(--serk-font-sans, 'Poppins', sans-serif) !important;
  font-size: 14.5px !important;
  font-weight: 400 !important;
  text-decoration: none !important;
  line-height: 1.45 !important;
  display: inline-block !important;
  transition: color 0.2s ease, transform 0.2s ease !important;
}

.serk-footer-link:hover {
  color: #FFFFFF !important;
  text-decoration: none !important;
  transform: translateX(4px) !important;
}

/* Full-Width Bottom Copyright Bar flush to very bottom (Pure Black) */
.elementor-element-e959569 {
  width: 100% !important;
  margin: 0 !important;
  padding: 18px 0 !important;
  background-color: #000000 !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-sizing: border-box !important;
}

.serk-copyright-inner {
  max-width: 1200px !important;
  margin: 0 auto !important;
  padding: 0 32px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 12px !important;
  box-sizing: border-box !important;
}

.serk-copyright-left {
  font-family: var(--serk-font-sans, 'Poppins', sans-serif) !important;
  font-size: 13px !important;
  color: #999999 !important;
  line-height: 1.4 !important;
  margin: 0 !important;
}

.serk-copyright-right {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  font-size: 11.5px !important;
  color: #888888 !important;
  margin: 0 !important;
}

.serk-copyright-link {
  color: #888888 !important;
  font-family: var(--serk-font-sans, 'Poppins', sans-serif) !important;
  font-size: 11.5px !important;
  text-decoration: none !important;
  transition: color 0.2s ease !important;
}

.serk-copyright-link:hover {
  color: #FFFFFF !important;
  text-decoration: underline !important;
}

.serk-copyright-sep {
  color: rgba(255, 255, 255, 0.2) !important;
  user-select: none !important;
}

/* Completely remove residual floating phone call widget */
.wpr-pc-btn,
.elementor-widget-wpr-phone-call,
[data-id="b48140f"],
.elementor-element-b48140f,
.wpr-pc-wrapper {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  height: 0 !important;
  width: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Subtle Back-to-Top Button: Ensure zero extra bottom padding/margin */
.elementor-element-ff04cb5 {
  margin: 0 !important;
  padding: 0 !important;
  height: 0 !important;
  min-height: 0 !important;
  border: none !important;
  overflow: visible !important;
}

.elementor-element-ff04cb5 .elementor-container {
  min-height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* Mobile responsive */
@media (max-width: 900px) {
  .elementor-element-5b611c4 {
    padding: 56px 0 48px 0 !important;
  }
  .serk-footer-container {
    grid-template-columns: 1fr !important;
    gap: 40px !important;
    padding: 0 24px !important;
  }
  .serk-copyright-inner {
    flex-direction: column !important;
    align-items: flex-start !important;
    padding: 0 24px !important;
    gap: 10px !important;
  }
}
"""
    css = css.strip() + "\n" + zuri_footer_css.strip() + "\n"

    with open(THEME_CSS_SITE, 'w', encoding='utf-8') as f:
        f.write(css)
    with open(THEME_CSS_ORIG, 'w', encoding='utf-8') as f:
        f.write(css)
    print("Updated serk-theme.css with Zuri-style spacious footer styles!")

def update_page(path):
    rel = os.path.relpath(path, SITE).replace('\\', '/')
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # 1. Clean out any leftover serk-global-footer or duplicate footer comments
    content = re.sub(r'<!-- SERK Enterprise Global Footer.*?</footer>\s*', '', content, flags=re.S)
    content = re.sub(r'<footer class="serk-global-footer".*?</footer>\s*', '', content, flags=re.S)
    content = re.sub(r'(?:<!--\s*SERK Enterprise Elementor Footer\s*\(1175\)\s*-->\s*)+', '', content)

    # 2. Replace elementor-1175 footer with the new spacious footer
    footer_html = get_footer_html()
    if 'data-elementor-id="1175"' in content:
        # Match from <div data-elementor-type="wp-post" data-elementor-id="1175" to its closing </div>
        idx = content.find('data-elementor-id="1175"')
        div_start = content.rfind('<div', 0, idx)
        # Find next script or closing body tag
        idx_script = content.find('<script', idx)
        if idx_script == -1:
            idx_script = content.find('</body>', idx)
        div_end = content.rfind('</div>', idx, idx_script) + len('</div>')
        content = content[:div_start] + footer_html.strip() + '\n' + content[div_end:]
    else:
        # Append before </body> if missing
        content = content.replace('</body>', footer_html.strip() + '\n</body>')

    # 3. Cache buster on serk-theme.css
    content = re.sub(r'serk-theme\.css(?:\?[^"]*)?', 'serk-theme.css?v=20261122-footerblack01', content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated: {rel}")

def main():
    sync_assets()
    update_css()
    pages = [os.path.join(r, f) for r, _, fs in os.walk(SITE) for f in fs if f.endswith('.html') and 'wp-' not in r]
    for p in sorted(pages):
        update_page(p)
    print(f"Total pages updated: {len(pages)}")

if __name__ == '__main__':
    main()
