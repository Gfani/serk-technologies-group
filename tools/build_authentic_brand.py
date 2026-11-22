import os, base64
from PIL import Image

BR = 'brand'
OUT = 'site/wp-content/uploads/serk'
os.makedirs(OUT, exist_ok=True)

dark = Image.open(os.path.join(BR, 'serk-logo-1.png')).convert('RGBA')
light = Image.open(os.path.join(BR, 'serk-logo-2.png')).convert('RGBA')

def bands(im):
    a = im.getchannel('A'); w, h = im.size
    rows = [a.crop((0, y, w, y + 1)).getbbox() is not None for y in range(h)]
    out, start = [], None
    for y, on in enumerate(rows + [False]):
        if on and start is None: start = y
        if not on and start is not None:
            if y - start > 12: out.append((start, y))
            start = None
    return out

def crop_band(im, band):
    w = im.size[0]
    c = im.crop((0, band[0], w, band[1]))
    return c.crop(c.getchannel('A').getbbox())

b_d = bands(dark)
mark_d, name_d, tag_d = crop_band(dark, b_d[0]), crop_band(dark, b_d[1]), crop_band(dark, b_d[2])

b_l = bands(light)
mark_l, name_l, tag_l = crop_band(light, b_l[0]), crop_band(light, b_l[1]), crop_band(light, b_l[2])

def make_lockup(mark, name):
    # Balanced horizontal lockup
    H = 140
    # Mark height = 96px
    mh = 96
    mw = int(mark.size[0] * mh / mark.size[1])
    m_res = mark.resize((mw, mh), Image.LANCZOS)
    
    # Name height = 62px
    nh = 62
    nw = int(name.size[0] * nh / name.size[1])
    n_res = name.resize((nw, nh), Image.LANCZOS)
    
    gap = 24
    pad = 10
    W = pad + mw + gap + nw + pad
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    canvas.alpha_composite(m_res, (pad, (H - mh) // 2))
    canvas.alpha_composite(n_res, (pad + mw + gap, (H - nh) // 2))
    
    bbox = canvas.getbbox()
    cropped = canvas.crop((max(0, bbox[0]-6), max(0, bbox[1]-6), min(W, bbox[2]+6), min(H, bbox[3]+6)))
    return cropped

lockup_dark = make_lockup(mark_d, name_d)
lockup_light = make_lockup(mark_l, name_l)

lockup_dark.save(os.path.join(OUT, 'serk-logo-wide.png'), optimize=True)
lockup_light.save(os.path.join(OUT, 'serk-logo-wide-light.png'), optimize=True)

# Also create SVG representations embedding the crisp PNG
def make_svg(png_path, svg_path):
    with open(png_path, 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('ascii')
    im = Image.open(png_path)
    w, h = im.size
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
  <image href="data:image/png;base64,{b64}" width="{w}" height="{h}" />
</svg>'''
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(svg)

make_svg(os.path.join(OUT, 'serk-logo-wide.png'), os.path.join(OUT, 'serk-logo.svg'))
make_svg(os.path.join(OUT, 'serk-logo-wide-light.png'), os.path.join(OUT, 'serk-logo-light.svg'))

# Full stacked logos
dark.save(os.path.join(OUT, 'serk-logo-full-dark.png'), optimize=True)
light.save(os.path.join(OUT, 'serk-logo-full-light.png'), optimize=True)

print(f"Generated authentic company logos: dark {lockup_dark.size}, light {lockup_light.size}")
