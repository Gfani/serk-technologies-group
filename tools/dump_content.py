from bs4 import BeautifulSoup

soup = BeautifulSoup(open('site/index.html', encoding='utf-8'), 'html.parser')
sections = soup.find('div', class_='elementor-1158').find_all(['section', 'div'], recursive=False)

for i, s in enumerate(sections):
    print(f"================ SECTION {i} (id={s.get('data-id')}) ================")
    for heading in s.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
        print(f"[{heading.name}] {heading.get_text().strip()}")
    imgs = [img.get('src') for img in s.find_all('img') if img.get('src')]
    if imgs:
        print(f"[IMGS] {imgs[:3]}")
    p_texts = [p.get_text().strip() for p in s.find_all('p') if p.get_text().strip()]
    if p_texts:
        print(f"[PARAGRAPHS] {len(p_texts)} paragraphs. First: {p_texts[0][:120]}...")
    print()
