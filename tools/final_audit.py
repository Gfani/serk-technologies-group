import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, 'site')

pages = [os.path.join(r, f) for r, _, fs in os.walk(SITE) for f in fs if f.endswith('.html')]

issues = []
print(f"Auditing {len(pages)} HTML pages in {SITE}...\n")

zuri_pattern = re.compile(r'(?i)\bzuri\b')
dummy_contacts = ['hello@your-domain.com', '123456789', '+251 000', 'info@zuriadvisors.com']

for p in sorted(pages):
    rel = os.path.relpath(p, SITE).replace('\\', '/')
    c = open(p, encoding='utf-8').read()
    
    # 1. Check Zuri mentions (excluding historical file comments if any)
    # Strip script/style tags for text check
    body_text = re.sub(r'<(script|style)\b.*?</\1>', ' ', c, flags=re.S)
    body_text = re.sub(r'<[^>]+>', ' ', body_text)
    zuris = zuri_pattern.findall(body_text)
    if zuris:
        issues.append(f"{rel}: {len(zuris)} Zuri text occurrences")
        
    # Check attributes/links for Zuri
    attr_zuris = zuri_pattern.findall(c)
    if len(attr_zuris) > len(zuris):
        issues.append(f"{rel}: {len(attr_zuris) - len(zuris)} Zuri in tags/attributes")
        
    # 2. Check dummy contacts
    for dc in dummy_contacts:
        if dc in c:
            issues.append(f"{rel}: Contains dummy contact '{dc}'")
            
    # 3. Check for floating phone widget
    if 'wpr-phone-call' in c and 'display: none' not in c:
        # Check if the actual widget html exists
        if '<a href="tel:' in c and 'wpr-pc-btn' in c:
            issues.append(f"{rel}: Contains unremoved wpr-phone-call markup")
            
    # 4. Check for h1 tag
    h1s = re.findall(r'<h1\b[^>]*>(.*?)</h1>', c, re.S)
    if not h1s:
        issues.append(f"{rel}: Missing <h1> tag")
    elif len(h1s) > 1:
        pass # Multiple h1s can happen in some Elementor templates, but let's check
        
    # 5. Check for title and meta description
    titles = re.findall(r'<title>(.*?)</title>', c, re.S)
    if not titles or not titles[0].strip():
        issues.append(f"{rel}: Missing <title>")
        
    metas = re.findall(r'<meta\s+name="description"\s+content="([^"]*)"', c)
    if not metas or not metas[0].strip():
        issues.append(f"{rel}: Missing meta description")
        
    # 6. Check for header and footer presence
    if 'serk-header' not in c:
        issues.append(f"{rel}: Missing serk-header")
    if 'serk-global-footer' not in c:
        issues.append(f"{rel}: Missing serk-global-footer")
        
    # 7. Check for skewed badges in HTML styles
    if 'skew(-14deg)' in c:
        issues.append(f"{rel}: Contains inline skew(-14deg)")

print(f"Audit Complete. Issues found: {len(issues)}")
for iss in issues:
    print(" [!]", iss)

if not issues:
    print("ALL CHECKS PASSED PERFECTLY!")
