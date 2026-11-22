import urllib.request

url = 'http://localhost:3000/products/'
req = urllib.request.urlopen(url)
html = req.read().decode('utf-8', errors='ignore')

categories = [
    'sector-intelligence',
    'ai-security',
    'enterprise-operations',
    'solutions',
    'ventures',
    'affiliated',
    'future-innovation'
]

print(f"Products page status: {req.status}")
print("Checking categories in HTML:")
for cat in categories:
    in_html = f'id="{cat}"' in html
    in_nav = f'href="#{cat}"' in html
    in_dropdown = f'href="/products/#{cat}"' in html
    print(f"  - {cat:25}: section={in_html} | pill_link={in_nav} | header_dropdown={in_dropdown}")

# Test redirects
for redirect_path in ['/affiliated', '/future-innovation', '/ai-security']:
    try:
        r = urllib.request.urlopen(f'http://localhost:3000{redirect_path}')
        print(f"Redirect {redirect_path} -> status: {r.status}, url: {r.geturl()}")
    except Exception as e:
        print(f"Redirect {redirect_path} error: {e}")
