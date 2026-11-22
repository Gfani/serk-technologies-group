import sys
from collections import defaultdict
# We can read src/lib/constants.ts and parse the ALL_PROJECTS array
with open('src/lib/constants.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's see all categories and their items
import re

# find all objects { slug: '...', name: '...', category: '...', maturity: '...', summary: '...', ... }
slugs = re.findall(r"slug:\s*'([^']+)'", text)
names = re.findall(r"name:\s*'([^']+)'", text)
cats = re.findall(r"category:\s*'([^']+)'", text)
mats = re.findall(r"maturity:\s*'([^']+)'", text)

print(f"Total projects found: {len(slugs)}")
by_cat = defaultdict(list)
for s, n, c, m in zip(slugs, names, cats, mats):
    by_cat[c].append((s, n, m))

for c, items in by_cat.items():
    print(f"\nCategory: '{c}' ({len(items)} items):")
    for s, n, m in items:
        print(f"  - [{m}] {n} ({s})")
