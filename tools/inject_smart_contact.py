import glob

tag = '<script src="/wp-content/themes/royal-elementor-kit/serk-smart-contact.js"></script>'
files = sorted(set(glob.glob('public/**/*.html', recursive=True) + glob.glob('site/**/*.html', recursive=True)))
count = 0
for f in files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        html = fp.read()
    if 'serk-smart-contact.js' not in html:
        idx = html.rfind('</body>')
        if idx != -1:
            html = html[:idx] + '\n' + tag + '\n' + html[idx:]
            with open(f, 'w', encoding='utf-8') as fp:
                fp.write(html)
            count += 1
print(f"Injected smart contact script into {count} files.")
