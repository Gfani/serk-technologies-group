import os
import re

base_dirs = ['public', 'site']

for base in base_dirs:
    if not os.path.exists(base):
        continue

    # 1. Products, Ventures, Industries, Partners, Gallery, Privacy, Terms
    pages_to_clean = {
        'products': (r'<span style="display: inline-block; font-size: 0\.8rem;.*?SERK Products & Platforms</h1>\s*', ''),
        'ventures': (r'<span style="display: inline-block; font-size: 0\.8rem;.*?Turning Technology Into Possibilities</h1>\s*', ''),
        'industries': (r'<span style="display: inline-block; font-size: 0\.8rem;.*?Built Around Your Industry</h1>\s*', ''),
        'partners': (r'<span style="display: inline-block; font-size: 0\.8rem;.*?Some of Our Clients & Partners</h1>\s*', ''),
        'gallery': (r'<span style="display: inline-block; font-size: 0\.8rem;.*?Media & Visual Gallery</h1>\s*', ''),
        'privacy': (r'<span style="display: inline-block; font-size: 0\.8rem;.*?Privacy Policy</h1>\s*', ''),
        'terms': (r'<span style="display: inline-block; font-size: 0\.8rem;.*?Terms of Service</h1>\s*', ''),
    }

    for page, (pattern, repl) in pages_to_clean.items():
        fpath = f'{base}/{page}/index.html'
        if os.path.exists(fpath):
            with open(fpath, 'r', encoding='utf-8') as f:
                c = f.read()
            m = re.search(pattern, c, re.DOTALL)
            print(f'[{base}] {page} matched:', bool(m))
            if m:
                c = re.sub(pattern, repl, c, count=1, flags=re.DOTALL)
                # tighten padding
                c = c.replace('padding: 100px 20px 60px 20px;', 'padding: 32px 20px 28px 20px;')
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(c)

    # 2. contact_us: remove 'Details' (1a09a4d3) and 'Contact Information' (4959c540)
    contact_path = f'{base}/contact_us/index.html'
    if os.path.exists(contact_path):
        with open(contact_path, 'r', encoding='utf-8') as f:
            c = f.read()
        pat_contact = r'<div class="elementor-element elementor-element-1a09a4d3.*?(?=<div class="elementor-element elementor-element-4782b482)'
        m = re.search(pat_contact, c, re.DOTALL)
        print(f'[{base}] contact_us matched:', bool(m))
        if m:
            c = re.sub(pat_contact, '', c, count=1, flags=re.DOTALL)
            with open(contact_path, 'w', encoding='utf-8') as f:
                f.write(c)

    # 3. blog-landing-page-business-v1: remove section 7f9801c (the old 'Blog' heading)
    blog_path = f'{base}/blog-landing-page-business-v1/index.html'
    if os.path.exists(blog_path):
        with open(blog_path, 'r', encoding='utf-8') as f:
            c = f.read()
        pat_blog = r'<section class="elementor-section [^"]*elementor-element-7f9801c.*?</section>\s*(?=<section)'
        m = re.search(pat_blog, c, re.DOTALL)
        print(f'[{base}] blog_landing matched:', bool(m))
        if m:
            c = re.sub(pat_blog, '', c, count=1, flags=re.DOTALL)
            with open(blog_path, 'w', encoding='utf-8') as f:
                f.write(c)

    # 4. category/latest: remove section 74aa2d8 (the old 'Latest' archive title)
    cat_path = f'{base}/category/latest/index.html'
    if os.path.exists(cat_path):
        with open(cat_path, 'r', encoding='utf-8') as f:
            c = f.read()
        pat_cat = r'<section class="elementor-section [^"]*elementor-element-74aa2d8.*?</section>\s*(?=<section)'
        m = re.search(pat_cat, c, re.DOTALL)
        print(f'[{base}] category/latest matched:', bool(m))
        if m:
            c = re.sub(pat_cat, '', c, count=1, flags=re.DOTALL)
            with open(cat_path, 'w', encoding='utf-8') as f:
                f.write(c)

    # 5. Blog posts banner: standardize to 'Insights & Perspectives'
    blog_slugs = [
        'close-the-books-faster-what-ai-changes-in-finance',
        'the-hospital-that-runs-on-insight',
        'from-drawing-to-budget-inside-the-serk-ai-estimator',
        'ai-integrated-vs-ai-added-later',
        'automate-the-boring-amplify-the-brilliant',
        'every-sale-tells-a-story-getting-more-from-your-pos',
        'five-questions-before-you-buy-business-software',
        'one-family-of-systems-the-case-for-connected-software'
    ]
    for bslug in blog_slugs:
        bp = f'{base}/{bslug}/index.html'
        if os.path.exists(bp):
            with open(bp, 'r', encoding='utf-8') as f:
                c = f.read()
            # replace whatever was in the banner with Insights & Perspectives
            c = re.sub(r'data-full-text="[^"]*"', 'data-full-text="Insights &amp; Perspectives"', c)
            c = re.sub(r'<b data-full-text="Insights &amp; Perspectives">[^<]*</b>', '<b data-full-text="Insights &amp; Perspectives">Insights &amp; Perspectives</b>', c)
            with open(bp, 'w', encoding='utf-8') as f:
                f.write(c)
    print(f'[{base}] blog posts standardized')

print("Static HTML cleanup completed successfully!")
