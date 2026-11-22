from bs4 import BeautifulSoup

soup = BeautifulSoup(open('site/index.html', encoding='utf-8'), 'html.parser')
sections = soup.find('div', class_='elementor-1158').find_all(['section', 'div'], recursive=False)

for i, s in enumerate(sections):
    texts = list(s.stripped_strings)
    preview = ' // '.join(texts[:5]) if texts else 'EMPTY'
    print(f"[{i}] id={s.get('data-id')} tag={s.name} class={s.get('class')}")
    print(f"    Preview: {preview[:160]}\n")
