import re
import json

# Let's extract ALL_PROJECTS from src/lib/constants.ts
with open('src/lib/constants.ts', 'r', encoding='utf-8') as f:
    ts = f.read()

# Find the array content of ALL_PROJECTS
start_idx = ts.find('export const ALL_PROJECTS')
arr_start = ts.find('[', start_idx)
arr_end = ts.rfind('];')
projects_raw = ts[arr_start:arr_end+1]

# Let's parse project blocks
project_blocks = re.findall(r'\{\s*slug:\s*\'([^\']+)\'([^}]+)\}', projects_raw, re.DOTALL)
print(f"Extracted {len(project_blocks)} project blocks.")

projects = []
for slug, block in project_blocks:
    def get_val(key):
        m = re.search(rf"{key}:\s*['\"]([^'\"]+)['\"]", block)
        return m.group(1) if m else ''
    
    name = get_val('name')
    category = get_val('category')
    maturity = get_val('maturity')
    summary = get_val('summary')
    image_url = get_val('imageUrl') or '/images/serk-logo-mark.png'
    public_cta = get_val('publicCta') or 'View Platform Dossier'
    cta_url = get_val('ctaUrl') or f'/contact?interest={slug}'

    projects.append({
        'slug': slug,
        'name': name,
        'category': category,
        'maturity': maturity,
        'summary': summary,
        'imageUrl': image_url,
        'publicCta': public_cta,
        'ctaUrl': cta_url,
    })

print(f"Parsed {len(projects)} projects.")
for p in projects[:3]:
    print(p)
