import glob
import re

files = sorted(set(glob.glob('public/**/*.html', recursive=True) + glob.glob('site/**/*.html', recursive=True)))
footer_1175 = []
footer_other = []
no_footer = []

for f in files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()
    if 'data-elementor-id="1175"' in content:
        footer_1175.append(f)
    elif '<footer' in content or 'elementor-location-footer' in content or 'serk-footer-container' in content:
        footer_other.append(f)
    else:
        no_footer.append(f)

print(f"Total HTML files: {len(files)}")
print(f"Files with data-elementor-id=\"1175\": {len(footer_1175)}")
print(f"Files with other footer markers: {len(footer_other)}")
print(f"Files with no footer marker: {len(no_footer)}")
if footer_other:
    print("Other files:", footer_other[:5])
if no_footer:
    print("No footer files:", no_footer[:5])
