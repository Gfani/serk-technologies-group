import os
from PIL import Image, ImageDraw, ImageFont

svg_dark = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 50" width="280" height="50">
  <defs>
    <linearGradient id="serkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0D4634" />
      <stop offset="100%" stop-color="#185E47" />
    </linearGradient>
  </defs>
  <!-- Mark Emblem -->
  <rect x="2" y="5" width="40" height="40" rx="8" fill="url(#serkGrad)" />
  <!-- Stylized Geometric S -->
  <path d="M28 15 C24 15, 16 16, 16 21 C16 27, 28 27, 28 32 C28 35, 22 36, 16 34" fill="none" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="28" cy="15" r="2" fill="#5DF2B5" />
  <circle cx="16" cy="34" r="2" fill="#5DF2B5" />
  <!-- Wordmark -->
  <text x="52" y="27" font-family="'Poppins', 'Inter', system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#101513" letter-spacing="1.5">SERK</text>
  <text x="53" y="41" font-family="'Poppins', 'Inter', system-ui, -apple-system, sans-serif" font-size="8.5" font-weight="600" fill="#5B6761" letter-spacing="2.8">TECHNOLOGIES GROUP</text>
</svg>'''

svg_light = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 50" width="280" height="50">
  <defs>
    <linearGradient id="serkGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#185E47" />
      <stop offset="100%" stop-color="#2D735A" />
    </linearGradient>
  </defs>
  <!-- Mark Emblem -->
  <rect x="2" y="5" width="40" height="40" rx="8" fill="url(#serkGradLight)" />
  <!-- Stylized Geometric S -->
  <path d="M28 15 C24 15, 16 16, 16 21 C16 27, 28 27, 28 32 C28 35, 22 36, 16 34" fill="none" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="28" cy="15" r="2" fill="#5DF2B5" />
  <circle cx="16" cy="34" r="2" fill="#5DF2B5" />
  <!-- Wordmark -->
  <text x="52" y="27" font-family="'Poppins', 'Inter', system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#FFFFFF" letter-spacing="1.5">SERK</text>
  <text x="53" y="41" font-family="'Poppins', 'Inter', system-ui, -apple-system, sans-serif" font-size="8.5" font-weight="600" fill="#9EB5AB" letter-spacing="2.8">TECHNOLOGIES GROUP</text>
</svg>'''

os.makedirs('site/wp-content/uploads/serk', exist_ok=True)
with open('site/wp-content/uploads/serk/serk-logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_dark)

with open('site/wp-content/uploads/serk/serk-logo-light.svg', 'w', encoding='utf-8') as f:
    f.write(svg_light)

# Generate crisp PNG
W, H = 840, 150
im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
draw = ImageDraw.Draw(im)

draw.rounded_rectangle([10, 15, 130, 135], radius=24, fill=(13, 70, 52, 255))
draw.line([(85, 45), (45, 45), (45, 75), (95, 75), (95, 105), (45, 105)], fill=(255, 255, 255, 255), width=10, joint='curve')
draw.ellipse([80, 40, 90, 50], fill=(93, 242, 181, 255))
draw.ellipse([40, 100, 50, 110], fill=(93, 242, 181, 255))

font_large = None
font_small = None
try:
    font_large = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 64)
    font_small = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 22)
except Exception:
    try:
        font_large = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 64)
        font_small = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 22)
    except Exception:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()

draw.text((160, 26), 'SERK', fill=(16, 21, 19, 255), font=font_large)
draw.text((164, 100), 'TECHNOLOGIES GROUP', fill=(91, 103, 97, 255), font=font_small)

im.save('site/wp-content/uploads/serk/serk-logo-wide.png')
print('Generated serk-logo.svg, serk-logo-light.svg, and serk-logo-wide.png')
