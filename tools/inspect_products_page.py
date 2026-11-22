from bs4 import BeautifulSoup

with open('public/products/index.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

main = soup.find('main')
if main:
    groups = main.find_all('div', recursive=False)
    print(f"Direct divs in main: {len(groups)}")
    inner_container = main.find('div')
    if inner_container:
        sub_groups = inner_container.find_all('div', recursive=False)
        print(f"Direct divs in inner container: {len(sub_groups)}")
        for i, g in enumerate(sub_groups):
            h2 = g.find('h2')
            cards = g.find_all('h3')
            print(f"  Group {i+1}: {h2.get_text(strip=True) if h2 else 'No H2'} ({len(cards)} cards)")
            for c in cards:
                print(f"    - {c.get_text(strip=True)}")
