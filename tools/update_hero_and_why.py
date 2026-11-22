#!/usr/bin/env python3
"""
Update Hero graphic:
 - Shifting graphic closer to text (minimal distance, translate(100, 48))
 - Slightly larger size (scale(0.85))
 - Adding real photos in the 2 remaining spots:
     * Spot 1: Bottom-left cylinder pill (Pill 3, 1140, 632) -> Team unity hands (pill_team.jpg)
     * Spot 2: Right dark card (c2, 1528, 552) -> Capital markets/financial audit analytics (pill_market.jpg)

Update Why Choose photo:
 - Make image smaller with generous padding/margins so there is space between pic and borders.
"""

import os
import base64
import io
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE_DIR = os.path.join(BASE_DIR, 'site')
ORIG_DIR = os.path.join(BASE_DIR, 'original')
SERK_UPLOADS = os.path.join(SITE_DIR, 'wp-content', 'uploads', 'serk')
ORIG_UPLOADS = os.path.join(ORIG_DIR, 'wp-content', 'uploads', 'serk')

os.makedirs(SERK_UPLOADS, exist_ok=True)
os.makedirs(ORIG_UPLOADS, exist_ok=True)

def crop_vertical(src_path, target_w, target_h, focus='center'):
    im = Image.open(src_path).convert('RGB')
    src_w, src_h = im.size
    target_ratio = target_w / target_h
    src_ratio = src_w / src_h
    
    if src_ratio > target_ratio:
        new_w = int(src_h * target_ratio)
        if focus == 'right':
            left = src_w - new_w
        elif focus == 'left':
            left = 0
        elif focus == 'center_right':
            left = int((src_w - new_w) * 0.72)
        elif focus == 'center_left':
            left = int((src_w - new_w) * 0.35)
        else:
            left = int((src_w - new_w) / 2)
        top = 0
        right = left + new_w
        bottom = src_h
    else:
        new_h = int(src_w / target_ratio)
        left = 0
        right = src_w
        top = int((src_h - new_h) / 2)
        bottom = top + new_h
        
    cropped = im.crop((left, top, right, bottom))
    cropped = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    cropped.save(buf, format='JPEG', quality=86, optimize=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode('ascii')

print("1. Preparing photo pill base64 strings (all 6 photo cylinders)...")
# 4 existing photo pills
b_eng = crop_vertical(os.path.join(SERK_UPLOADS, 'serk-photo-engineering.jpg'), 368, 620, 'center_right')
b_const = crop_vertical(os.path.join(SERK_UPLOADS, 'serk-photo-construction.jpg'), 204, 424, 'center')
b_health = crop_vertical(os.path.join(SERK_UPLOADS, 'serk-photo-health.jpg'), 242, 452, 'center')
b_tower = crop_vertical(os.path.join(ORIG_DIR, 'wp-content', 'uploads', '2025', '03', 'photo_2022-11-14_11-43-48.jpg'), 198, 700, 'center')

# 2 spots left:
# Spot 1: Bottom-left cylinder pill (Pill 3, 160x370) -> Team unity hands
b_team = crop_vertical(os.path.join(ORIG_DIR, 'wp-content', 'uploads', '2025', '04', 'fghghhghgh.jpg'), 160, 370, 'center')

# Spot 2: Live AUDIT +18% card (c2, 216x466) -> Capital market & financial analytics
b_market = crop_vertical(os.path.join(ORIG_DIR, 'wp-content', 'uploads', '2025', '11', 'capital-market2.jpg'), 216, 466, 'center')

print("2. Generating updated serk-hero.svg...")
w, h = 1920, 1080

# Striped background
bg_paths = ''
for i in range(-6, 16):
    bg_paths += f'<path d="M{i * 190} -40 l-760 1160" stroke="#F6F6FA" stroke-width="64"/>\n'

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
<defs>
    <style>
        text {{ font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }}
    </style>
    <!-- Drop shadows -->
    <filter id="pill-sh" x="-25%" y="-20%" width="150%" height="150%">
        <feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="#101513" flood-opacity=".18"/>
    </filter>
    <filter id="card-sh" x="-25%" y="-20%" width="150%" height="150%">
        <feDropShadow dx="0" dy="24" stdDeviation="30" flood-color="#101513" flood-opacity=".22"/>
    </filter>
    <filter id="soft-sh" x="-20%" y="-15%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#101513" flood-opacity=".12"/>
    </filter>

    <!-- Gradients -->
    <linearGradient id="gp" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2D735A"/>
        <stop offset="1" stop-color="#082E22"/>
    </linearGradient>
    <linearGradient id="gn" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#18201C"/>
        <stop offset="1" stop-color="#0E1311"/>
    </linearGradient>
    <linearGradient id="pill-tint-green" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0E382B" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#082E22" stop-opacity="0.55"/>
    </linearGradient>
    <linearGradient id="pill-tint-dark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#101513" stop-opacity="0.10"/>
        <stop offset="100%" stop-color="#101513" stop-opacity="0.60"/>
    </linearGradient>
    <linearGradient id="card-dark-tint" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#18201C" stop-opacity="0.65"/>
        <stop offset="60%" stop-color="#101513" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#080B0A" stop-opacity="0.95"/>
    </linearGradient>

    <!-- Cylinder Pill Clip Paths -->
    <clipPath id="cp_eng"><rect x="1392" y="190" width="368" height="620" rx="184"/></clipPath>
    <clipPath id="cp_const"><rect x="1662" y="360" width="204" height="424" rx="102"/></clipPath>
    <clipPath id="cp_health"><rect x="1058" y="544" width="242" height="452" rx="121"/></clipPath>
    <clipPath id="cp_tower"><rect x="1362" y="396" width="198" height="700" rx="99"/></clipPath>
    <clipPath id="cp_team"><rect x="1140" y="632" width="160" height="370" rx="80"/></clipPath>

    <!-- Card Clip Paths -->
    <clipPath id="c1"><rect x="1198" y="278" width="284" height="644" rx="142"/></clipPath>
    <clipPath id="c2"><rect x="1528" y="552" width="216" height="466" rx="108"/></clipPath>
</defs>

<!-- Background -->
<rect width="{w}" height="{h}" fill="#FCFCFE"/>
{bg_paths}

<!-- Hero Graphic Composition: Minimal distance from text (shifted left) and larger scale (0.85) -->
<g transform="translate(100, 48) scale(0.85)">

    <!-- 1. Background Cylinder Pills Filled with Real Photography -->

    <!-- Pill 4: Sovereign Enterprise & Commercial Infrastructure (Skyscraper) -->
    <g filter="url(#soft-sh)">
        <g clip-path="url(#cp_tower)">
            <image href="{b_tower}" x="1362" y="396" width="198" height="700" preserveAspectRatio="xMidYMid slice"/>
            <rect x="1362" y="396" width="198" height="700" fill="url(#pill-tint-dark)"/>
        </g>
        <rect x="1362" y="396" width="198" height="700" rx="99" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-opacity="0.65"/>
    </g>

    <!-- Pill 0: Core Engineering & Software Systems (Real Engineers Coding) -->
    <g filter="url(#pill-sh)">
        <g clip-path="url(#cp_eng)">
            <image href="{b_eng}" x="1392" y="190" width="368" height="620" preserveAspectRatio="xMidYMid slice"/>
            <rect x="1392" y="190" width="368" height="620" fill="url(#pill-tint-green)"/>
        </g>
        <rect x="1392" y="190" width="368" height="620" rx="184" fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-opacity="0.9"/>
    </g>

    <!-- Pill 1: Construction Intelligence & Civil Takeoff (Site Rebar & Civil Engineers) -->
    <g filter="url(#pill-sh)">
        <g clip-path="url(#cp_const)">
            <image href="{b_const}" x="1662" y="360" width="204" height="424" preserveAspectRatio="xMidYMid slice"/>
            <rect x="1662" y="360" width="204" height="424" fill="url(#pill-tint-dark)"/>
        </g>
        <rect x="1662" y="360" width="204" height="424" rx="102" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-opacity="0.85"/>
    </g>

    <!-- Spot 1: Bottom-Left Cylinder Pill Filled with Real Team Unity Hands Photo -->
    <g filter="url(#soft-sh)">
        <g clip-path="url(#cp_team)">
            <image href="{b_team}" x="1140" y="632" width="160" height="370" preserveAspectRatio="xMidYMid slice"/>
            <rect x="1140" y="632" width="160" height="370" fill="url(#pill-tint-dark)"/>
        </g>
        <rect x="1140" y="632" width="160" height="370" rx="80" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-opacity="0.75"/>
    </g>

    <!-- Pill 2: Clinical Hospital Management (Doctor with Stethoscope & Mobile Device) -->
    <g filter="url(#pill-sh)">
        <g clip-path="url(#cp_health)">
            <image href="{b_health}" x="1058" y="544" width="242" height="452" preserveAspectRatio="xMidYMid slice"/>
            <rect x="1058" y="544" width="242" height="452" fill="url(#pill-tint-green)"/>
        </g>
        <rect x="1058" y="544" width="242" height="452" rx="121" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-opacity="0.9"/>
    </g>

    <!-- 2. Foreground Glass UI Cards Layered in Front -->

    <!-- Card 1: White Glass "Serk AI" Platform Card -->
    <g filter="url(#card-sh)">
        <g clip-path="url(#c1)">
            <rect x="1198" y="278" width="284" height="644" fill="#FFFFFF"/>
            <!-- Top brand header -->
            <rect x="1198" y="278" width="284" height="150" fill="url(#gp)"/>
            <text x="1340" y="352" font-size="25" font-weight="700" fill="#FFFFFF" text-anchor="middle">Serk AI</text>
            <text x="1340" y="386" font-size="14" font-weight="500" fill="#CDE5DC" text-anchor="middle" letter-spacing="1">one platform</text>
            
            <!-- Estimate ready module -->
            <rect x="1222" y="448" width="236" height="74" rx="16" fill="#F7F9F8" stroke="#E6ECE9" stroke-width="1"/>
            <text x="1242" y="478" font-size="14.5" font-weight="600" fill="#101513">Estimate ready</text>
            <rect x="1242" y="492" width="140" height="8" rx="4" fill="#D3DDD7"/>
            <circle cx="1428" cy="484" r="15" fill="#082E22"/>
            <path d="M1422 484l4 4 8-9" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

            <!-- Performance bars module -->
            <rect x="1222" y="536" width="236" height="150" rx="16" fill="#F7F9F8" stroke="#E6ECE9" stroke-width="1"/>
            <text x="1242" y="566" font-size="14.5" font-weight="600" fill="#101513">Performance</text>
            <!-- Bars -->
            <g transform="translate(1242, 582)">
                <rect x="0" y="54" width="24" height="36" rx="4" fill="#101513"/>
                <rect x="34" y="34" width="24" height="56" rx="4" fill="#E3AB72"/>
                <rect x="68" y="45" width="24" height="45" rx="4" fill="#101513"/>
                <rect x="102" y="18" width="24" height="72" rx="4" fill="#E3AB72"/>
                <rect x="136" y="30" width="24" height="60" rx="4" fill="#101513"/>
                <rect x="170" y="5" width="24" height="85" rx="4" fill="#082E22"/>
            </g>

            <!-- Patients today sparkline module -->
            <rect x="1222" y="700" width="236" height="118" rx="16" fill="#F7F9F8" stroke="#E6ECE9" stroke-width="1"/>
            <text x="1242" y="730" font-size="14.5" font-weight="600" fill="#101513">Patients today</text>
            <path d="M1242 785 Q 1270 760, 1290 775 T 1340 750 T 1390 765 T 1438 735" fill="none" stroke="#082E22" stroke-width="3" stroke-linecap="round"/>

            <!-- Bottom telemetry preview -->
            <rect x="1222" y="832" width="236" height="60" rx="16" fill="#F7F9F8" stroke="#E6ECE9" stroke-width="1"/>
            <rect x="1242" y="850" width="110" height="7" rx="3.5" fill="#D3DDD7"/>
            <rect x="1242" y="865" width="75" height="7" rx="3.5" fill="#E3AB72"/>
        </g>
        <!-- Crisp Glass Outline -->
        <rect x="1198" y="278" width="284" height="644" rx="142" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-opacity="0.95"/>
    </g>

    <!-- Spot 2: Card 2 - Dark Glass "Live +18%" Card Filled with Real Financial Analytics Chart Photo -->
    <g filter="url(#card-sh)">
        <g clip-path="url(#c2)">
            <!-- Real photo of market analytics embedded in background -->
            <image href="{b_market}" x="1528" y="552" width="216" height="466" preserveAspectRatio="xMidYMid slice"/>
            <rect x="1528" y="552" width="216" height="466" fill="url(#card-dark-tint)"/>
            
            <text x="1636" y="626" font-size="13" font-weight="600" fill="#E3AB72" text-anchor="middle" letter-spacing="1.5">LIVE AUDIT</text>
            <text x="1636" y="670" font-size="38" font-weight="700" fill="#FFFFFF" text-anchor="middle">+18%</text>
            
            <!-- Graph with gold area -->
            <path d="M1548 780 Q 1575 750, 1600 765 T 1650 725 T 1700 735 T 1724 690 L 1724 800 L 1548 800 Z" fill="#E3AB72" fill-opacity="0.2"/>
            <path d="M1548 780 Q 1575 750, 1600 765 T 1650 725 T 1700 735 T 1724 690" fill="none" stroke="#E3AB72" stroke-width="3.5" stroke-linecap="round"/>
            <circle cx="1724" cy="690" r="5" fill="#E3AB72"/>

            <!-- Compact telemetry bars -->
            <g transform="translate(1556, 836)">
                <rect x="0" y="40" width="22" height="45" rx="3" fill="#2D735A"/>
                <rect x="34" y="22" width="22" height="63" rx="3" fill="#E3AB72"/>
                <rect x="68" y="48" width="22" height="37" rx="3" fill="#2D735A"/>
                <rect x="102" y="10" width="22" height="75" rx="3" fill="#E3AB72"/>
                <rect x="136" y="32" width="22" height="53" rx="3" fill="#2D735A"/>
            </g>
        </g>
        <!-- Dark Card Crisp Border -->
        <rect x="1528" y="552" width="216" height="466" rx="108" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="2.5"/>
    </g>

</g>
</svg>
'''

# Write serk-hero.svg to site and original
hero_site_path = os.path.join(SERK_UPLOADS, 'serk-hero.svg')
hero_orig_path = os.path.join(ORIG_UPLOADS, 'serk-hero.svg')

with open(hero_site_path, 'w', encoding='utf-8') as f:
    f.write(svg_content)
print(f"Saved: {hero_site_path} ({len(svg_content)} bytes)")

with open(hero_orig_path, 'w', encoding='utf-8') as f:
    f.write(svg_content)
print(f"Saved: {hero_orig_path}")

print("3. Updating Why Choose Section with space/margin between pic and border...")
index_path = os.path.join(SITE_DIR, 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Look for elementor-element-291bfca
import re
pattern = r'(<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-291bfca"[^>]*>)([\s\S]*?)(</div>\s*</div>\s*</div>\s*</section>)'

m = re.search(r'<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-291bfca"[\s\S]*?</div>\s*</div>\s*</div>\s*</section>', html)
if m:
    old_col = m.group(0)
    # create new column content with generous padding and smaller image frame
    new_col = '''				<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-291bfca" data-id="291bfca" data-element_type="column">
			<div class="elementor-widget-wrap elementor-element-populated" style="padding: 20px 28px 24px 16px; display: flex; align-items: center; justify-content: center; box-sizing: border-box; width: 100%;">
				<div class="serk-why-img-frame" style="width: 100%; max-width: 480px; height: 420px; position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 16px 40px rgba(16, 21, 19, 0.12); border: 1px solid rgba(16, 21, 19, 0.08); margin: auto;">
					<img src="/wp-content/uploads/serk/serk-why-choose.jpg?v=20261122-02" alt="SERK Technologies Group Engineering Team" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 20px;" />
					<div class="serk-why-overlay" style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(16, 21, 19, 0.88) 0%, rgba(16, 21, 19, 0.45) 55%, transparent 100%); padding: 22px 20px 20px 20px; color: #FFFFFF; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;">
						<div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(227, 171, 114, 0.2); border: 1px solid rgba(227, 171, 114, 0.4); padding: 4px 12px; border-radius: 100px; margin-bottom: 8px;">
							<span style="width: 6px; height: 6px; border-radius: 50%; background: #E3AB72;"></span>
							<span style="font-size: 11px; font-weight: 700; color: #E3AB72; letter-spacing: 0.08em; text-transform: uppercase;">Engineering &amp; Innovation</span>
						</div>
						<h4 style="font-size: 17px; font-weight: 600; color: #FFFFFF; margin: 0 0 4px 0; line-height: 1.35; font-family: 'Times New Roman', serif;">Sovereign Digital Systems Built for Heavy Enterprise</h4>
						<p style="font-size: 12.5px; color: #D5E2DC; margin: 0; line-height: 1.4; font-family: 'Quicksand', sans-serif;">Pairing real African industry know-how with practical, mission-critical engineering.</p>
					</div>
				</div>
			</div>
		</div>
					</div>
		</section>'''
    html = html.replace(old_col, new_col)
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Updated site/index.html with padded Why Choose frame!")

# Also update original/index.html
orig_index_path = os.path.join(ORIG_DIR, 'index.html')
if os.path.exists(orig_index_path):
    with open(orig_index_path, 'r', encoding='utf-8') as f:
        orig_html = f.read()
    m_orig = re.search(r'<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-291bfca"[\s\S]*?</div>\s*</div>\s*</div>\s*</section>', orig_html)
    if m_orig:
        orig_html = orig_html.replace(m_orig.group(0), new_col)
        with open(orig_index_path, 'w', encoding='utf-8') as f:
            f.write(orig_html)
        print("Updated original/index.html with padded Why Choose frame!")

print("Done updating!")
