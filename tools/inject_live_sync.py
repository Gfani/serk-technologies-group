files = [
    'public/products/index.html',
    'site/products/index.html',
    'public/ventures/index.html',
    'site/ventures/index.html'
]
tag = '<script src="/wp-content/themes/royal-elementor-kit/serk-live-sync.js"></script>'
for f in files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        html = fp.read()
    if 'serk-live-sync.js' not in html:
        idx = html.rfind('</body>')
        if idx != -1:
            html = html[:idx] + '\n' + tag + '\n' + html[idx:]
            with open(f, 'w', encoding='utf-8') as fp:
                fp.write(html)
            print(f'Injected live-sync into {f}')
