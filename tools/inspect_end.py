with open('site/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('data-elementor-id="1175"')
idx_stt = html.find('ff04cb5', idx)
idx_after_stt = html.find('</section>', idx_stt)
print(html[idx_stt:idx_after_stt+200])
