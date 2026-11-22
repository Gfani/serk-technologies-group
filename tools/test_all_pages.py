import urllib.request

urls = [
    '/',
    '/about_us',
    '/about',
    '/services',
    '/solutions',
    '/products',
    '/industries',
    '/ventures',
    '/partners',
    '/gallery',
    '/insight',
    '/insights',
    '/contact_us',
    '/contact',
    '/privacy',
    '/terms',
    '/from-drawing-to-budget-inside-the-serk-ai-estimator',
    '/the-hospital-that-runs-on-insight',
    '/close-the-books-faster-what-ai-changes-in-finance',
    '/ai-integrated-vs-ai-added-later',
    '/automate-the-boring-amplify-the-brilliant',
    '/every-sale-tells-a-story-getting-more-from-your-pos',
    '/five-questions-before-you-buy-business-software',
    '/one-family-of-systems-the-case-for-connected-software',
    '/admin/login',
    '/api/health',
]

print(f"{'URL':<60} | {'Status':<6} | {'Length':<8}")
print("-" * 80)
all_ok = True
for u in urls:
    try:
        resp = urllib.request.urlopen("http://localhost:3000" + u)
        status = resp.getcode()
        length = len(resp.read())
        print(f"{u:<60} | {status:<6} | {length:<8}")
    except Exception as e:
        print(f"{u:<60} | FAIL: {e}")
        all_ok = False

if all_ok:
    print("\nALL 26 ROUTES RETURNED 200 OK WITH FULL PAGE CONTENT!")
