with open('site/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('data-elementor-id="1175"')
print('Found at:', idx)
print("--- PREV AND OPENING ---")
print(html[idx-60:idx+250])

idx_copy = html.find('e959569', idx)
print("--- COPYRIGHT SECTION AND AFTER ---")
idx_after_copy = html.find('</section>', idx_copy)
print(html[idx_copy:idx_after_copy+12])

# Let's find back to top or end of 1175
idx_next = html.find('<!--', idx_after_copy)
print("--- NEXT COMMENT ---")
print(html[idx_after_copy:idx_after_copy+500])
