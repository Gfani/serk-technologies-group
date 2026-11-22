import os, re

PAGE_TITLES = {
    'products/index.html': 'Products & Platforms',
    'ventures/index.html': 'Digital Ventures',
    'industries/index.html': 'Industry Sectors',
    'partners/index.html': 'Partners & Clients',
    'gallery/index.html': 'Media Gallery',
    'contact_us/index.html': 'Contact Us',
    'privacy/index.html': 'Privacy Policy',
    'terms/index.html': 'Terms of Service',
    'blog-landing-page-business-v1/index.html': 'Insights & Perspectives',
    'category/latest/index.html': 'Latest Updates',
    'close-the-books-faster-what-ai-changes-in-finance/index.html': 'Finance & Audit Engine',
    'the-hospital-that-runs-on-insight/index.html': 'Health OS & Clinical AI',
    'from-drawing-to-budget-inside-the-serk-ai-estimator/index.html': '5D Construction AI',
    'ai-integrated-vs-ai-added-later/index.html': 'Intelligent Architecture',
    'automate-the-boring-amplify-the-brilliant/index.html': 'Enterprise Automation',
    'every-sale-tells-a-story-getting-more-from-your-pos/index.html': 'Smart Retail & POS',
    'five-questions-before-you-buy-business-software/index.html': 'Technology Advisory',
    'one-family-of-systems-the-case-for-connected-software/index.html': 'Connected Systems',
    'page/2/index.html': 'Insights Archive',
    'page/3/index.html': 'Insights Archive',
    '404.html': 'Page Not Found',
}

def make_header_banner(title):
    return f"""
<!-- SERK Orange Animated Page Header Banner -->
<div class="serk-page-header-banner">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
    <h2 class="wpr-advanced-text" style="text-align: center; margin: 0; padding: 0;">
      <span class="wpr-anim-text wpr-anim-text-type-clip" data-anim-duration="1000,2000" data-anim-loop="yes">
        <span class="wpr-anim-text-inner">
          <b data-full-text="{title}">{title}</b>
        </span>
        <span class="wpr-anim-text-cursor">|</span>
      </span>
    </h2>
  </div>
</div>
"""

SCRIPT_TAG = '<script src="/wp-content/themes/royal-elementor-kit/serk-anim-header.js"></script>'

def process_file(file_path, key_path):
    if not os.path.exists(file_path):
        return
    
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    modified = False

    # 1. Add script tag before </body> if not present
    if 'serk-anim-header.js' not in html:
        idx_body_close = html.rfind('</body>')
        if idx_body_close != -1:
            html = html[:idx_body_close] + f"\n{SCRIPT_TAG}\n" + html[idx_body_close:]
            modified = True

    # 2. Inject banner if this page needs a new banner
    if key_path in PAGE_TITLES:
        title = PAGE_TITLES[key_path]
        if 'serk-page-header-banner' not in html:
            idx_hdr = html.find('</header>')
            if idx_hdr != -1:
                insert_pos = idx_hdr + len('</header>')
                banner_html = make_header_banner(title)
                html = html[:insert_pos] + banner_html + html[insert_pos:]
                modified = True
                print(f"Injected banner '{title}' into {file_path}")

    # 3. For about_us, services, insight: ensure data-full-text is on b
    if 'about_us' in key_path:
        html = re.sub(r'<b>About Us</b>', r'<b data-full-text="About Us">About Us</b>', html)
        modified = True
    elif 'services' in key_path:
        html = re.sub(r'<b>Solutions</b>', r'<b data-full-text="Solutions">Solutions</b>', html)
        modified = True
    elif 'insight' in key_path:
        html = re.sub(r'<b>Insights</b>', r'<b data-full-text="Insights">Insights</b>', html)
        modified = True

    # 4. For home (index.html), add eyebrow if not present
    if key_path == 'index.html':
        if 'serk-hero-anim-eyebrow' not in html:
            eyebrow = """
<div class="serk-hero-anim-eyebrow" style="margin-bottom: 20px;">
  <span class="wpr-anim-text wpr-anim-text-type-clip" data-anim-duration="1000,2000" data-anim-loop="yes" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 18px; background: rgba(227, 171, 114, 0.1); border: 1px solid rgba(227, 171, 114, 0.35); border-radius: 9999px;">
    <span class="wpr-anim-text-inner">
      <b data-full-text="Sovereign Digital Systems" style="color: #E3AB72; font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Sovereign Digital Systems</b>
    </span>
    <span class="wpr-anim-text-cursor" style="color: #E3AB72; font-size: 14px; font-weight: 300;">|</span>
  </span>
</div>
"""
            idx_h1 = html.find('We Engineer the Systems Behind Better Business.')
            if idx_h1 != -1:
                # find start of widget containing this h1
                idx_widget = html.rfind('<div class="elementor-element elementor-element-9d25fef', 0, idx_h1)
                if idx_widget != -1:
                    html = html[:idx_widget] + eyebrow + html[idx_widget:]
                    modified = True
                    print("Injected hero animated eyebrow into index.html")

    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html)

for base in ['public', 'site']:
    for root, dirs, fnames in os.walk(base):
        for fname in fnames:
            if fname.endswith('.html'):
                fpath = os.path.join(root, fname)
                rel = os.path.relpath(fpath, base).replace('\\', '/')
                process_file(fpath, rel)

print("Done processing all HTML files.")
