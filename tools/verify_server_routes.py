import urllib.request

routes = [
    '/',
    '/about_us/',
    '/services/',
    '/products/',
    '/industries/',
    '/ventures/',
    '/contact_us/',
    '/gallery/',
    '/insight/',
    '/privacy/',
    '/terms/'
]

all_passed = True
for r in routes:
    try:
        req = urllib.request.urlopen(f'http://localhost:3000{r}')
        body = req.read().decode('utf-8', errors='ignore')
        has_visitus = "VISIT US" in body
        has_tagline = "Innovation with Integrity" in body
        has_explore = "EXPLORE" in body
        has_platforms = "PLATFORMS" in body
        ok = has_visitus and has_tagline and has_explore and has_platforms
        if not ok:
            all_passed = False
        print(f"{r:16} -> {req.status} OK | Size: {len(body):6} bytes | Footer match: {ok}")
    except Exception as e:
        all_passed = False
        print(f"{r:16} -> ERROR: {e}")

print(f"\nAll routes passed verification: {all_passed}")
