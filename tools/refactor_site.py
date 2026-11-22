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

TITLES = {
    'index.html': 'SERK Technologies Group | Enterprise Software &amp; Intelligent Systems',
    'about_us/index.html': 'About Us | SERK Technologies Group',
    'products/index.html': 'Software Platforms &amp; Products | SERK Technologies Group',
    'industries/index.html': 'Industry Solutions | SERK Technologies Group',
    'services/index.html': 'Custom Software &amp; Cloud Engineering | SERK Technologies Group',
    'ventures/index.html': 'Ventures &amp; Innovation | SERK Technologies Group',
    'partners/index.html': 'Partners &amp; Clients | SERK Technologies Group',
    'gallery/index.html': 'Media Gallery | SERK Technologies Group',
    'insight/index.html': 'Insights &amp; Engineering Articles | SERK Technologies Group',
    'contact_us/index.html': 'Contact Us &amp; Project Discussion | SERK Technologies Group',
    'privacy/index.html': 'Privacy Policy | SERK Technologies Group',
    'terms/index.html': 'Terms of Service | SERK Technologies Group',
    '404.html': 'Page Not Found | SERK Technologies Group',
}

DESCRIPTIONS = {
    'index.html': 'SERK Technologies Group engineers enterprise software, intelligent operating platforms, and practical applied AI for construction, healthcare, finance, and commerce across Ethiopia and Africa.',
    'about_us/index.html': 'Learn about SERK Technologies Group: our philosophy of Innovation with Integrity, engineering standards, and mission to build dependable African technology.',
    'products/index.html': 'Explore SERK proprietary platforms including Construction Intelligence OS, Health OS, Connected Finance, Retail POS, and Office OS.',
    'industries/index.html': 'Industry-specific digital platforms for contractors, hospitals, financial teams, retailers, and enterprise operations.',
    'services/index.html': 'Custom software development, system architecture, workflow automation, and secure cloud engineering by SERK Group.',
    'ventures/index.html': 'SERK digital ventures including Segar Ride mobility, Visit Tigray heritage tourism, and emerging commerce platforms.',
    'partners/index.html': 'Clients and enterprise partners collaborating with SERK Technologies Group across East Africa.',
    'gallery/index.html': 'Visual showcase of SERK platforms, engineering workspaces, and field implementations.',
    'insight/index.html': 'Technical perspectives, case studies, and engineering breakdowns from the SERK Technologies Group engineering team.',
    'contact_us/index.html': 'Discuss your next software development, system integration, or enterprise modernization project with SERK Technologies Group in Mekelle, Ethiopia.',
    'privacy/index.html': 'Privacy policy and data governance practices of SERK Technologies Group.',
    'terms/index.html': 'Terms of service and engagement standards for SERK Technologies Group digital platforms.',
}

def clean_residual_colors(text):
    # Purge Zuri purple, bright blue, tan/gold across all CSS/HTML
    # 241924 (dark purple) -> 101513 (ink)
    # 463746 (medium purple) -> 5B6761 (slate) or 101513
    # 1A5AFF (bright blue) -> 0D4634 (deep forest)
    # E4C19D / e4c19d (tan/gold) -> DEE6E0 (hairline) or F4F7F5 (mist)
    # F4AC1C / f4ac1c (yellow/orange) -> 2D735A (light green)
    text = re.sub(r'#241924', '#101513', text, flags=re.IGNORECASE)
    text = re.sub(r'#463746', '#5B6761', text, flags=re.IGNORECASE)
    text = re.sub(r'#1A5AFF', '#0D4634', text, flags=re.IGNORECASE)
    text = re.sub(r'#E4C19D', '#DEE6E0', text, flags=re.IGNORECASE)
    text = re.sub(r'#F4AC1C', '#0D4634', text, flags=re.IGNORECASE)
    return text

def clean_placeholders_and_widgets(h):
    # Remove floating phone call widget
    h = re.sub(r'<section[^>]*class="[^"]*wpr-phone-call[^"]*"[^>]*>.*?</section>', '', h, flags=re.S)
    h = re.sub(r'<div[^>]*class="[^"]*elementor-widget-wpr-phone-call[^"]*"[^>]*>.*?</div>\s*</div>\s*</div>', '', h, flags=re.S)
    h = re.sub(r'<section[^>]*data-id="b48140f"[^>]*>.*?</section>', '', h, flags=re.S)
    
    # Remove particles.js
    h = re.sub(r'<script[^>]*src="[^"]*particles\.js[^"]*"[^>]*></script>', '', h)
    
    # Clean phone numbers and emails
    h = h.replace('tel:123456789', 'tel:+251999911192')
    h = h.replace('tel:000000000', 'tel:+251999911192')
    h = h.replace('+251 000 000 000', '+251 999 911 192')
    h = h.replace('hello@your-domain.com', 'serktechgroup@gmail.com')
    h = h.replace('info@zuriadvisors.com', 'serktechgroup@gmail.com')
    h = h.replace('Your office address, Addis Ababa, Ethiopia', 'Mekelle, Tigray, Ethiopia')
    
    # Clean Zuri names
    h = re.sub(r'\bZuri Capital Advisors\b', 'SERK Technologies Group', h)
    h = re.sub(r'\bZuri Capital\b', 'SERK Group', h)
    h = re.sub(r'\bZuri Advisors\b', 'SERK Technologies Group', h)
    h = re.sub(r'\bZuri\b', 'SERK', h)
    
    # Remove Zuri logo references
    h = h.replace('Zuri-Dark-nobg.png', 'serk-logo-wide.png')
    h = h.replace('Zuri_icon_LE_upscale_balanced_x4-removebg-preview-1', 'serk-favicon')
    
    return h

def refactor_page(path):
    rel = os.path.relpath(path, SITE).replace('\\', '/')
    h = open(path, encoding='utf-8').read()
    
    # 1. Determine active page
    active_key = PAGE_MAP.get(rel, 'home')
    if 'products' in rel: active_key = 'products'
    elif 'industries' in rel: active_key = 'industries'
    elif 'services' in rel: active_key = 'services'
    elif 'ventures' in rel: active_key = 'ventures'
    elif 'about' in rel: active_key = 'about'
    elif 'contact' in rel: active_key = 'contact'
    
    header_html = get_header_html(active_key)
    footer_html = get_footer_html()
    
    # 2. Replace Header: find data-elementor-id="1174"
    idx_1174 = h.find('data-elementor-id="1174"')
    if idx_1174 != -1:
        # Find start of container div
        h_start = h.rfind('<div', 0, idx_1174)
        # Find end of container div: it contains </section>\s*</div>
        sec_end = h.find('</section>', idx_1174)
        div_end = h.find('</div>', sec_end) + len('</div>')
        h = h[:h_start] + header_html + h[div_end:]
    
    # 3. Replace Footer: find data-elementor-id="1175"
    idx_1175 = h.find('data-elementor-id="1175"')
    if idx_1175 != -1:
        f_start = h.rfind('<div', 0, idx_1175)
        # The footer and any following widgets extend to speculationrules or lazyload scripts or </body>
        idx_spec = h.find('<script type="speculationrules">', f_start)
        if idx_spec == -1:
            idx_spec = h.find('<script> const lazyloadRunObserver', f_start)
        if idx_spec == -1:
            idx_spec = h.find('</body>', f_start)
        
        h = h[:f_start] + footer_html + '\n' + h[idx_spec:]
    
    # 4. Clean placeholders, widgets, and Zuri colors
    h = clean_placeholders_and_widgets(h)
    h = clean_residual_colors(h)
    
    # 5. Ensure serk-theme.css is linked
    if 'serk-theme.css' not in h:
        h = h.replace('</head>', '\t<link rel="stylesheet" id="serk-theme-css" href="/wp-content/themes/royal-elementor-kit/serk-theme.css">\n</head>')
    
    # 6. Ensure Title and Meta Description
    title_text = TITLES.get(rel, 'SERK Technologies Group | Innovation with Integrity')
    desc_text = DESCRIPTIONS.get(rel, 'SERK Technologies Group — Software, intelligent systems and digital platforms.')
    
    h = re.sub(r'<title>.*?</title>', f'<title>{title_text}</title>', h, count=1, flags=re.S)
    
    if '<meta name="description"' in h:
        h = re.sub(r'<meta name="description" content="[^"]*"', f'<meta name="description" content="{desc_text}"', h, count=1)
    else:
        meta_tag = f'\n\t<meta name="description" content="{desc_text}">'
        h = re.sub(r'(<meta charset="UTF-8">)', r'\1' + meta_tag, h, count=1)
        
    open(path, 'w', encoding='utf-8').write(h)
    print(f"Refactored: {rel}")

def main():
    print("Refactoring all pages in /site/...")
    pages = [os.path.join(r, f) for r, _, fs in os.walk(SITE) for f in fs if f.endswith('.html')]
    for p in sorted(pages):
        refactor_page(p)
        
    # Also clean post-*.css files
    css_dir = os.path.join(SITE, 'wp-content/uploads/elementor/css')
    if os.path.exists(css_dir):
        for f in os.listdir(css_dir):
            if f.endswith('.css'):
                cp = os.path.join(css_dir, f)
                c = open(cp, encoding='utf-8').read()
                c2 = clean_residual_colors(c)
                # replace Playfair Display and Roboto Slab with Poppins
                c2 = re.sub(r'"Playfair Display"', '"Poppins"', c2)
                c2 = re.sub(r'"Roboto Slab"', '"Poppins"', c2)
                if c2 != c:
                    open(cp, 'w', encoding='utf-8').write(c2)
                    print(f"Cleaned CSS: {f}")

if __name__ == '__main__':
    main()
