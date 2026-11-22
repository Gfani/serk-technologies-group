#!/usr/bin/env python3
"""Build header / footer / favicon images from the real Serk Group logo files.
usage: gen_brand.py <brand_dir> <output_dir>
Nothing is redrawn: the mark and the wordmark are cropped from the supplied artwork.
"""
import sys, os
from PIL import Image
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

b = bands(dark)
print('bands', b)
mark_d, name_d = crop_band(dark, b[0]), crop_band(dark, b[1])
mark_l = crop_band(light, bands(light)[0])

# header: horizontal lockup, 3:1 like the slot it fills
H = 520; W = H * 3
canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
mh = int(H * 0.70); m = mark_d.resize((int(mark_d.size[0] * mh / mark_d.size[1]), mh), Image.LANCZOS)
gap = int(H * 0.16)
nw = W - m.size[0] - gap - 2 * int(H * 0.06)
n = name_d.resize((nw, int(name_d.size[1] * nw / name_d.size[0])), Image.LANCZOS)
x0 = int(H * 0.06)
canvas.alpha_composite(m, (x0, (H - mh) // 2))
canvas.alpha_composite(n, (x0 + m.size[0] + gap, (H - n.size[1]) // 2))
canvas.save(os.path.join(OUT, 'serk-logo-wide.png'), optimize=True)

# footer (dark background): light mark, square-ish slot
S = 360
sq = Image.new('RGBA', (S, int(S * 178 / 183)), (0, 0, 0, 0))
mw = int(S * 0.9); ml = mark_l.resize((mw, int(mark_l.size[1] * mw / mark_l.size[0])), Image.LANCZOS)
sq.alpha_composite(ml, ((S - mw) // 2, (sq.size[1] - ml.size[1]) // 2))
sq.save(os.path.join(OUT, 'serk-logo-mark.png'), optimize=True)

# favicon: light mark on a black rounded tile
from PIL import ImageDraw
F = 512
fav = Image.new('RGBA', (F, F), (0, 0, 0, 0))
ImageDraw.Draw(fav).rounded_rectangle((0, 0, F - 1, F - 1), radius=112, fill=(17, 17, 17, 255))
fw = int(F * 0.66); fm = mark_l.resize((fw, int(mark_l.size[1] * fw / mark_l.size[0])), Image.LANCZOS)
fav.alpha_composite(fm, ((F - fw) // 2, (F - fm.size[1]) // 2))
fav.save(os.path.join(OUT, 'serk-favicon.png'), optimize=True)
for s in (32, 180, 192, 270):
    fav.resize((s, s), Image.LANCZOS).save(os.path.join(OUT, 'serk-favicon-%d.png' % s), optimize=True)
# full stacked logo, both colours, for anyone who needs it later
dark.save(os.path.join(OUT, 'serk-logo-full-dark.png'), optimize=True)
light.save(os.path.join(OUT, 'serk-logo-full-light.png'), optimize=True)
print('brand images written')
