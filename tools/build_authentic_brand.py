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

def recolor_alpha(im, rgb_color):
    '''Re-color all non-transparent pixels to rgb_color while preserving the exact anti-aliased alpha channel.'''
    r, g, b, a = im.split()
    solid = Image.new('RGB', im.size, rgb_color)
    sr, sg, sb = solid.split()
    return Image.merge('RGBA', (sr, sg, sb, a))

b_d = bands(dark)
mark_d = crop_band(dark, b_d[0])
name_d = crop_band(dark, b_d[1])

b_l = bands(light)
mark_l = crop_band(light, b_l[0])
name_l = crop_band(light, b_l[1])

# Recolor dark artwork to #101513 (Off-Black Ink token) to harmonize with white background & website headings
mark_d_themed = recolor_alpha(mark_d, (16, 21, 19))
name_d_themed = recolor_alpha(name_d, (16, 21, 19))

# Recolor light artwork to #FFFFFF (Pure White) for the dark forest footer
mark_l_themed = recolor_alpha(mark_l, (255, 255, 255))
name_l_themed = recolor_alpha(name_l, (255, 255, 255))

def make_lockup(mark, name, nh=36):
    # Master resolution height = 100px for the mark
    mh = 100
    mw = int(mark.size[0] * mh / mark.size[1])
    m_res = mark.resize((mw, mh), Image.LANCZOS)
    
    # Refined smaller wordmark (36px high = 36% of mark height)
    nw = int(name.size[0] * nh / name.size[1])
    n_res = name.resize((nw, nh), Image.LANCZOS)
    
    gap = 22
    pad_x = 8
    pad_y = 6
    W = pad_x + mw + gap + nw + pad_x
    H = pad_y + mh + pad_y
    
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    # Place mark vertically centered
    canvas.alpha_composite(m_res, (pad_x, pad_y))
    # Place name vertically centered to the mark's optical center
    canvas.alpha_composite(n_res, (pad_x + mw + gap, pad_y + (mh - nh) // 2))
    
    bbox = canvas.getbbox()
    # Add a clean 2px margin around tight bbox
    cropped = canvas.crop((max(0, bbox[0]-2), max(0, bbox[1]-2), min(W, bbox[2]+2), min(H, bbox[3]+2)))
    return cropped

lockup_dark = make_lockup(mark_d_themed, name_d_themed, nh=36)
lockup_light = make_lockup(mark_l_themed, name_l_themed, nh=36)

# Save high-res PNG lockups
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

print(f"Refined authentic company logos: dark {lockup_dark.size}, light {lockup_light.size}")
