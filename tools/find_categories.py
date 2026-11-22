import os

terms = ['affiliated', 'ai-security', 'future-innovation', 'sector-intel', 'sector-inteleg', 'solutions']
matches = []

for root, dirs, files in os.walk('.'):
    if any(p in root for p in ['.git', 'node_modules', '.next']):
        continue
    for f in files:
        if f.endswith(('.ts', '.tsx', '.js', '.json', '.prisma', '.md', '.html')):
            p = os.path.join(root, f)
            try:
                with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                    content = fp.read()
                    for t in terms:
                        if t in content.lower():
                            matches.append((p, t))
            except Exception:
                pass

for path, term in sorted(set(matches)):
    print(f"{path} contains '{term}'")
