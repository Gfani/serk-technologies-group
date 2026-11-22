#!/usr/bin/env python3
"""Build header / footer / favicon images from the real Serk Group logo files.
usage: gen_brand.py <brand_dir> <output_dir>
Nothing is redrawn: the mark and the wordmark are cropped from the supplied artwork.
Proportions are balanced: mark is prominent, wordmark is sleek and refined (36% of mark height).
"""
import sys, os, base64
from PIL import Image, ImageDraw

BR, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
dark = Image.open(os.path.join(BR, 'serk-logo-1.png')).convert('RGBA')
light = Image.open(os.path.join(BR, 'serk-logo-2.png')).convert('RGBA')

def bands(im):
    """Split the stacked logo into horizontal bands (mark, name, tagline) using the alpha channel."""
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

def recolor_alpha(im, rgb_color):
    """Re-color all non-transparent pixels to rgb_color while preserving the exact anti-aliased alpha channel."""
    r, g, b, a = im.split()
    solid = Image.new('RGB', im.size, rgb_color)
    sr, sg, sb = solid.split()
    return Image.merge('RGBA', (sr, sg, sb, a))

b = bands(dark)
mark_d, name_d = crop_band(dark, b[0]), crop_band(dark, b[1])
b_l = bands(light)
mark_l, name_l = crop_band(light, b_l[0]), crop_band(light, b_l[1])

# Recolor to brand tokens: #101513 (Off-Black Ink) for white background, #FFFFFF (White) for dark background
mark_d_themed = recolor_alpha(mark_d, (16, 21, 19))
name_d_themed = recolor_alpha(name_d, (16, 21, 19))
mark_l_themed = recolor_alpha(mark_l, (255, 255, 255))
name_l_themed = recolor_alpha(name_l, (255, 255, 255))

def make_lockup(mark, name, nh=36):
    mh = 100
    mw = int(mark.size[0] * mh / mark.size[1])
    m_res = mark.resize((mw, mh), Image.LANCZOS)
    
    nw = int(name.size[0] * nh / name.size[1])
    n_res = name.resize((nw, nh), Image.LANCZOS)
    
    gap = 22
    pad_x, pad_y = 8, 6
    W = pad_x + mw + gap + nw + pad_x
    H = pad_y + mh + pad_y
    
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    canvas.alpha_composite(m_res, (pad_x, pad_y))
    canvas.alpha_composite(n_res, (pad_x + mw + gap, pad_y + (mh - nh) // 2))
    
    bbox = canvas.getbbox()
    return canvas.crop((max(0, bbox[0]-2), max(0, bbox[1]-2), min(W, bbox[2]+2), min(H, bbox[3]+2)))

lockup_dark = make_lockup(mark_d_themed, name_d_themed, nh=36)
lockup_light = make_lockup(mark_l_themed, name_l_themed, nh=36)

lockup_dark.save(os.path.join(OUT, 'serk-logo-wide.png'), optimize=True)
lockup_light.save(os.path.join(OUT, 'serk-logo-wide-light.png'), optimize=True)

# SVG representations
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

# Mark for square slots
S = 360
sq = Image.new('RGBA', (S, int(S * 178 / 183)), (0, 0, 0, 0))
mw = int(S * 0.9); ml = mark_l.resize((mw, int(mark_l.size[1] * mw / mark_l.size[0])), Image.LANCZOS)
sq.alpha_composite(ml, ((S - mw) // 2, (sq.size[1] - ml.size[1]) // 2))
sq.save(os.path.join(OUT, 'serk-logo-mark.png'), optimize=True)

# Favicons
F = 512
fav = Image.new('RGBA', (F, F), (0, 0, 0, 0))
ImageDraw.Draw(fav).rounded_rectangle((0, 0, F - 1, F - 1), radius=112, fill=(17, 17, 17, 255))
fw = int(F * 0.66); fm = mark_l.resize((fw, int(mark_l.size[1] * fw / mark_l.size[0])), Image.LANCZOS)
fav.alpha_composite(fm, ((F - fw) // 2, (F - fm.size[1]) // 2))
fav.save(os.path.join(OUT, 'serk-favicon.png'), optimize=True)
for s in (32, 180, 192, 270):
    fav.resize((s, s), Image.LANCZOS).save(os.path.join(OUT, 'serk-favicon-%d.png' % s), optimize=True)

dark.save(os.path.join(OUT, 'serk-logo-full-dark.png'), optimize=True)
light.save(os.path.join(OUT, 'serk-logo-full-light.png'), optimize=True)
print('Brand images generated successfully.')
