#!/usr/bin/env python3
"""Generate the Serk Group image set (original SVG artwork) for the local site.

usage: gen_images.py <original_site_dir> <output_dir>
Fonts are embedded from the site's own self-hosted Poppins files so the
artwork renders the same everywhere, including inside <img> tags.
"""
import base64
import math
import os
import sys

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

P, P2, PLUM, INK = '#0D4634', '#082E22', '#162B23', '#101513'
TAN, TAN2, LAV, MINT, TEAL = '#2D735A', '#458B72', '#F4F7F5', '#CDE5DC', '#0D4634'
WHITE, GREY, LINE, NIGHT = '#FFFFFF', '#5B6761', '#DEE6E0', '#101513'
GREEN, RED = '#2D735A', '#D9534F'

FONT_FILES = {
    300: 'poppins-pxibyp8kv8jhgfvrldz8z1xlfq.woff2',
    500: 'poppins-pxibyp8kv8jhgfvrlgt9z1xlfq.woff2',
    600: 'poppins-pxibyp8kv8jhgfvrlej6z1xlfq.woff2',
    700: 'poppins-pxibyp8kv8jhgfvrlcz7z1xlfq.woff2',
}
_font_cache = {}


def font_css(weights):
    css = ''
    for w in weights:
        if w not in _font_cache:
            p = os.path.join(SRC, 'wp-content/uploads/elementor/google-fonts/fonts', FONT_FILES[w])
            _font_cache[w] = base64.b64encode(open(p, 'rb').read()).decode()
        css += ("@font-face{font-family:'SerkPop';font-weight:%d;"
                "src:url(data:font/woff2;base64,%s) format('woff2');}" % (w, _font_cache[w]))
    return css + "text{font-family:'SerkPop',Poppins,'Segoe UI',Helvetica,Arial,sans-serif}"


DEFS = ('<filter id="sh" x="-20%" y="-20%" width="140%" height="150%">'
        '<feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#101513" flood-opacity=".12"/></filter>'
        '<filter id="shs" x="-20%" y="-20%" width="140%" height="150%">'
        '<feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#101513" flood-opacity=".08"/></filter>'
        '<linearGradient id="gp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2D735A"/>'
        '<stop offset="1" stop-color="#0D4634"/></linearGradient>'
        '<linearGradient id="gn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1A2D25"/>'
        '<stop offset="1" stop-color="#101513"/></linearGradient>'
        '<linearGradient id="gt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8F2EC"/>'
        '<stop offset="1" stop-color="#DEE6E0"/></linearGradient>'
        '<linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/>'
        '<stop offset="1" stop-color="#F4F7F5"/></linearGradient>')


def save(name, w, h, body, weights=(500, 600), bg=None, extra_defs=''):
    s = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="%d" height="%d">'
         '<defs><style>%s</style>%s%s</defs>' % (w, h, w, h, font_css(weights) if weights else '', DEFS, extra_defs))
    if bg:
        s += '<rect width="%d" height="%d" fill="%s"/>' % (w, h, bg)
    s += body + '</svg>'
    open(os.path.join(OUT, name), 'w', encoding='utf-8').write(s)


# ---------- primitives ----------
def rr(x, y, w, h, r, fill, extra=''):
    return '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f" fill="%s" %s/>' % (x, y, w, h, r, fill, extra)


def tx(x, y, s, size, weight=500, fill=INK, anchor='start', extra=''):
    return ('<text x="%.1f" y="%.1f" font-size="%.1f" font-weight="%d" fill="%s" text-anchor="%s" %s>%s</text>'
            % (x, y, size, weight, fill, anchor, extra, s))


def circ(cx, cy, r, fill, extra=''):
    return '<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s" %s/>' % (cx, cy, r, fill, extra)


def sparkle(cx, cy, s, fill=TAN):
    # Diamond sparkles removed per user design instruction
    return ''


def bars(x, y, w, h, vals, c1=P, c2=TAN2, gap=0.35):
    n = len(vals)
    bw = w / n
    o = ''
    for i, v in enumerate(vals):
        bh = h * v
        o += rr(x + i * bw + bw * gap / 2, y + h - bh, bw * (1 - gap), bh, bw * 0.16, c1 if i % 2 == 0 else c2)
    return o


def line(x, y, w, h, vals, color=P, fill=None, sw=4, dots=False):
    n = len(vals)
    pts = [(x + i * w / (n - 1), y + h - h * v) for i, v in enumerate(vals)]
    d = 'M%.1f %.1f' % pts[0]
    for i in range(1, n):
        (x0, y0), (x1, y1) = pts[i - 1], pts[i]
        mx = (x0 + x1) / 2
        d += ' C%.1f %.1f %.1f %.1f %.1f %.1f' % (mx, y0, mx, y1, x1, y1)
    o = ''
    if fill:
        o += '<path d="%s L%.1f %.1f L%.1f %.1f Z" fill="%s"/>' % (d, x + w, y + h, x, y + h, fill)
    o += '<path d="%s" fill="none" stroke="%s" stroke-width="%s" stroke-linecap="round"/>' % (d, color, sw)
    if dots:
        for px, py in pts[1::2]:
            o += circ(px, py, sw * 1.5, WHITE, 'stroke="%s" stroke-width="%s"' % (color, sw * 0.8))
    return o


def donut(cx, cy, r, parts, sw):
    o = ''
    c = 2 * math.pi * r
    off = 0
    for frac, col in parts:
        o += ('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="none" stroke="%s" stroke-width="%.1f" '
              'stroke-dasharray="%.1f %.1f" stroke-dashoffset="%.1f" transform="rotate(-90 %.1f %.1f)"/>'
              % (cx, cy, r, col, sw, c * frac - 3, c, -off, cx, cy))
        off += c * frac
    return o


def skel(x, y, w, h=8, fill=LINE):
    return rr(x, y, w, h, h / 2, fill)


def card(x, y, w, h, r=18, fill=WHITE, shadow='sh'):
    return rr(x, y, w, h, r, fill, 'filter="url(#%s)"' % shadow)


def window(x, y, w, h, title, accent=P, dark=False):
    bg = '#2B2030' if dark else WHITE
    bar = '#3A2C3A' if dark else '#F7F7FB'
    fg = '#EDE6EE' if dark else INK
    o = card(x, y, w, h, 20, bg)
    o += '<path d="M%.1f %.1f h%.1f a20 20 0 0 1 20 20 v28 h%.1f v-28 a20 20 0 0 1 20 -20z" fill="%s"/>' % (
        x + 20, y, w - 40, -w, bar)
    for i, c in enumerate(('#F26D6D', '#F5C26B', '#63C78A')):
        o += circ(x + 26 + i * 20, y + 24, 6, c)
    o += tx(x + w / 2, y + 30, title, 15, 600, fg, 'middle')
    o += rr(x + w - 86, y + 14, 64, 20, 10, accent) + sparkle(x + w - 72, y + 24, 6, WHITE) + tx(
        x + w - 48, y + 29, 'AI', 12, 700, WHITE, 'middle')
    return o


def stat(x, y, w, h, label, value, color=P, dark=False):
    o = rr(x, y, w, h, 14, '#352838' if dark else '#F7F7FB')
    o += rr(x + 14, y + 14, 30, 30, 9, color)
    o += tx(x + 54, y + 28, label, 12, 500, '#B9AFC0' if dark else GREY)
    o += tx(x + 54, y + 48, value, 17, 700, WHITE if dark else INK)
    o += skel(x + 14, y + h - 18, w - 28, 6, '#46384A' if dark else LINE) + rr(x + 14, y + h - 18, (w - 28) * 0.62, 6, 3, color)
    return o


# ---------- product glyphs (drawn in a 100x100 box) ----------
def glyph(kind, x, y, s, c=WHITE, c2=TAN):
    k = s / 100.0
    st = 'fill="none" stroke="%s" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"' % c
    g = {
        'construction': '<path d="M16 86V40l26-16v62M42 86V48h40v38M10 86h80" %s/>'
                        '<path d="M28 46v0M28 60v0M28 74v0M56 60h12M56 74h12" %s/>' % (st, st),
        'estimator': '<path d="M18 18h46l18 18v46H18z M64 18v18h18" %s/><path d="M30 50h26M30 64h38M30 78h18" %s/>' % (st, st),
        'hospital': '<rect x="14" y="14" width="72" height="72" rx="16" %s/><path d="M50 32v36M32 50h36" %s/>' % (st, st),
        'finance': '<path d="M16 84h70M24 84V58M42 84V44M60 84V52M78 84V30" %s/><path d="M18 40l22-14 18 9 24-20" %s/>' % (st, st),
        'pos': '<path d="M28 12h44v76l-8-7-7 7-7-7-7 7-7-7-8 7z" %s/><path d="M38 32h24M38 46h24M38 60h14" %s/>' % (st, st),
        'automation': '<circle cx="22" cy="50" r="10" %s/><circle cx="78" cy="24" r="10" %s/><circle cx="78" cy="76" r="10" %s/>'
                      '<path d="M32 50C56 50 48 24 68 24M32 50C56 50 48 76 68 76" %s/>' % (st, st, st, st),
        'ai': '<rect x="26" y="26" width="48" height="48" rx="10" %s/>'
              '<path d="M40 12v14M60 12v14M40 74v14M60 74v14M12 40h14M12 60h14M74 40h14M74 60h14" %s/>' % (st, st),
        'cloud': '<path d="M30 74h42a16 16 0 0 0 2-32 24 24 0 0 0-46 6 13 13 0 0 0 2 26z" %s/>' % st,
        'shield': '<path d="M50 12l30 10v24c0 20-13 33-30 42-17-9-30-22-30-42V22z" %s/><path d="M38 50l9 9 16-18" %s/>' % (st, st),
        'support': '<path d="M20 58V48a30 30 0 0 1 60 0v10" %s/><rect x="12" y="54" width="16" height="24" rx="7" %s/>'
                   '<rect x="72" y="54" width="16" height="24" rx="7" %s/><path d="M80 78c0 8-8 12-22 12" %s/>' % (st, st, st, st),
        'design': '<path d="M18 82l8-26 40-40 18 18-40 40z M58 24l18 18" %s/>' % st,
        'quality': '<circle cx="50" cy="50" r="36" %s/><path d="M34 51l11 11 21-24" %s/>' % (st, st),
        'integrations': '<path d="M38 14v20M62 14v20M28 34h44v14a22 22 0 0 1-44 0zM50 70v18" %s/>' % st,
        'data': '<ellipse cx="50" cy="24" rx="30" ry="11" %s/><path d="M20 24v26c0 6 13 11 30 11s30-5 30-11V24M20 50v26c0 6 13 11 30 11s30-5 30-11V50" %s/>' % (st, st),
        'product': '<path d="M50 12l34 18v40L50 88 16 70V30z M16 30l34 18 34-18M50 48v40" %s/>' % st,
        'success': '<path d="M50 84S16 64 16 40a18 18 0 0 1 34-9 18 18 0 0 1 34 9c0 24-34 44-34 44z" %s/>' % st,
        'mobility': '<path d="M14 62h72v12a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V62z" %s/><path d="M22 62l10-24h36l10 24" %s/><circle cx="32" cy="68" r="6" fill="%s"/><circle cx="68" cy="68" r="6" fill="%s"/>' % (st, st, c, c),
        'delivery': '<path d="M20 30h60v46a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6V30z" %s/><path d="M14 30h72M50 30v52M34 18h32v12H34z" %s/>' % (st, st),
        'heritage': '<path d="M42 16a8 8 0 0 1 16 0l4 62h16v10H22V78h16l4-62z" %s/><path d="M42 32h16M41 46h18M40 60h20" %s/>' % (st, st),
    }[kind]
    extra = ''
    if kind in ('estimator', 'ai', 'automation'):
        extra = sparkle(50 if kind == 'ai' else 78, 50 if kind == 'ai' else (70 if kind == 'estimator' else 50),
                        11 if kind == 'ai' else 9, c2) if kind != 'automation' else ''
    return '<g transform="translate(%.1f %.1f) scale(%.4f)">%s%s</g>' % (x, y, k, g, extra)


# ---------- themed panels ----------
def panel_blueprint(x, y, w, h):
    o = rr(x, y, w, h, 14, '#EEF0FF')
    step = w / 12.0
    for i in range(1, 12):
        o += '<path d="M%.1f %.1f v%.1f" stroke="#DADCFB" stroke-width="1"/>' % (x + i * step, y, h)
    for j in range(1, int(h / step) + 1):
        o += '<path d="M%.1f %.1f h%.1f" stroke="#DADCFB" stroke-width="1"/>' % (x, y + j * step, w)
    a, b = x + w * 0.12, y + h * 0.16
    pw, ph = w * 0.76, h * 0.66
    o += ('<path d="M%.1f %.1f h%.1f v%.1f h%.1f v%.1f h%.1f z" fill="#FFFFFF" fill-opacity=".7" stroke="%s" stroke-width="4" stroke-linejoin="round"/>'
          % (a, b, pw, ph * 0.6, -pw * 0.4, ph * 0.4, -pw * 0.6, P))
    o += '<path d="M%.1f %.1f v%.1f M%.1f %.1f h%.1f" stroke="%s" stroke-width="3" stroke-dasharray="7 6"/>' % (
        a + pw * 0.34, b, ph * 0.56, a, b + ph * 0.56, pw * 0.34, P)
    o += '<path d="M%.1f %.1f h%.1f" stroke="%s" stroke-width="2"/>' % (a, b + ph + 16, pw * 0.6, TAN)
    o += circ(a, b + ph + 16, 4, TAN) + circ(a + pw * 0.6, b + ph + 16, 4, TAN)
    o += rr(a + pw * 0.22, b + ph + 4, 64, 24, 12, TAN) + tx(a + pw * 0.22 + 32, b + ph + 21, '12.4 m', 12, 600, WHITE, 'middle')
    return o


def panel_estimate(x, y, w, h, dark=False):
    fg = WHITE if dark else INK
    o = rr(x, y, w, h, 14, '#352838' if dark else '#F7F7FB')
    o += sparkle(x + 24, y + 26, 9, TAN) + tx(x + 42, y + 31, 'AI Estimate', 14, 600, fg)
    rows = [('Concrete', 0.55), ('Rebar', 0.42), ('Formwork', 0.5), ('Finishes', 0.36), ('Labour', 0.46)]
    ry = y + 52
    step = (h - 110) / len(rows)
    for i, (lab, f) in enumerate(rows):
        o += tx(x + 18, ry + 5, lab, 12, 500, '#B9AFC0' if dark else '#6B7280')
        o += skel(x + 100, ry - 3, (w - 190) * 1.0, 8, '#46384A' if dark else LINE)
        o += rr(x + 100, ry - 3, (w - 190) * f, 8, 4, P if i % 2 == 0 else TAN)
        o += rr(x + w - 76, ry - 9, 58, 20, 10, '#46384A' if dark else WHITE) + skel(x + w - 66, ry - 3, 38, 8, '#8B7F92' if dark else '#C9CCD6')
        ry += step
    o += rr(x + 14, y + h - 46, w - 28, 32, 10, P) + tx(x + 28, y + h - 25, 'Total', 13, 600, WHITE) + skel(
        x + w - 110, y + h - 34, 82, 9, '#CFCDF9')
    return o


def panel_vitals(x, y, w, h):
    o = rr(x, y, w, h, 14, '#FFF6EE')
    o += tx(x + 18, y + 30, 'Patient flow', 14, 600, INK)
    o += rr(x + w - 84, y + 14, 66, 22, 11, GREEN) + tx(x + w - 51, y + 30, 'Live', 12, 600, WHITE, 'middle')
    yy = y + h * 0.62
    d = 'M%.1f %.1f' % (x + 16, yy)
    seg = (w - 32) / 12.0
    pat = [0, 0, -0.1, 0.1, -0.55, 0.5, -0.12, 0, 0, -0.08, 0.08, -0.4, 0]
    for i in range(1, 13):
        d += ' L%.1f %.1f' % (x + 16 + i * seg, yy + pat[i] * h * 0.6)
    o += '<path d="%s" fill="none" stroke="%s" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>' % (d, RED)
    return o


def panel_beds(x, y, w, h, cols=6, rows=3):
    o = rr(x, y, w, h, 14, '#F7F7FB') + tx(x + 18, y + 30, 'Ward occupancy', 14, 600, INK)
    gw = (w - 36) / cols
    gh = (h - 62) / rows
    fill = [P, P, TAN, P, LINE, P, TAN, P, P, LINE, P, P, P, LINE, TAN, P, P, LINE]
    for r in range(rows):
        for c in range(cols):
            o += rr(x + 18 + c * gw + 4, y + 46 + r * gh + 4, gw - 8, gh - 8, 8, fill[(r * cols + c) % len(fill)])
    return o


def panel_patients(x, y, w, h, n=4):
    o = rr(x, y, w, h, 14, '#F7F7FB') + tx(x + 18, y + 30, 'Today', 14, 600, INK)
    step = (h - 54) / n
    cols = [P, TAN, TEAL, PLUM]
    tags = [GREEN, TAN, P, GREEN]
    for i in range(n):
        yy = y + 50 + i * step
        o += circ(x + 32, yy + step / 2 - 4, 13, cols[i % 4]) + skel(x + 56, yy + step / 2 - 12, w * 0.34, 8, '#C9CCD6') + skel(
            x + 56, yy + step / 2 + 2, w * 0.22, 7)
        o += rr(x + w - 82, yy + step / 2 - 14, 64, 20, 10, tags[i % 4], 'fill-opacity=".9"')
    return o


def panel_ledger(x, y, w, h, n=5, dark=False):
    o = rr(x, y, w, h, 14, '#352838' if dark else '#F7F7FB') + tx(x + 18, y + 30, 'Ledger', 14, 600, WHITE if dark else INK)
    step = (h - 54) / n
    for i in range(n):
        yy = y + 54 + i * step
        up = i % 3 != 1
        o += rr(x + 18, yy - 2, 22, 22, 7, GREEN if up else RED, 'fill-opacity=".18"')
        o += '<path d="M%.1f %.1f l6 %s6 6 %s-6" fill="none" stroke="%s" stroke-width="2.5" stroke-linecap="round"/>' % (
            x + 23, yy + (12 if up else 6), '-' if up else '', '' if up else '-', GREEN if up else RED)
        o += skel(x + 52, yy + 2, w * 0.36, 8, '#8B7F92' if dark else '#C9CCD6') + skel(x + 52, yy + 15, w * 0.2, 6, '#46384A' if dark else LINE)
        o += rr(x + w - 86, yy, 68, 18, 9, GREEN if up else RED, 'fill-opacity=".85"')
    return o


def panel_tiles(x, y, w, h, cols=3, rows=2):
    o = rr(x, y, w, h, 14, '#F7F7FB')
    gw = (w - 28) / cols
    gh = (h - 28) / rows
    cs = [TAN2, '#CFCDF9', MINT, '#F6C9C7', '#CFE7F7', TAN2]
    for r in range(rows):
        for c in range(cols):
            bx, by = x + 14 + c * gw + 5, y + 14 + r * gh + 5
            o += rr(bx, by, gw - 10, gh - 10, 12, WHITE, 'filter="url(#shs)"')
            o += rr(bx + 10, by + 10, gw - 30, (gh - 10) * 0.46, 9, cs[(r * cols + c) % 6])
            o += skel(bx + 10, by + (gh - 10) * 0.68, (gw - 30) * 0.8, 7, '#C9CCD6') + skel(bx + 10, by + (gh - 10) * 0.82, (gw - 30) * 0.45, 7, P)
    return o


def panel_receipt(x, y, w, h):
    o = rr(x, y, w, h, 14, WHITE, 'filter="url(#shs)"') + tx(x + 18, y + 32, 'Order #128', 14, 600, INK)
    n = 4
    step = (h - 120) / n
    for i in range(n):
        yy = y + 56 + i * step
        o += skel(x + 18, yy, w * 0.44, 8, '#C9CCD6') + skel(x + w - 70, yy, 52, 8)
    o += '<path d="M%.1f %.1f h%.1f" stroke="%s" stroke-width="2" stroke-dasharray="5 5"/>' % (x + 18, y + h - 64, w - 36, LINE)
    o += rr(x + 14, y + h - 50, w - 28, 36, 11, P) + tx(x + w / 2, y + h - 27, 'Charge', 14, 600, WHITE, 'middle')
    return o


def panel_flow(x, y, w, h, dark=False):
    o = rr(x, y, w, h, 14, '#352838' if dark else '#F7F7FB')
    nodes = [(0.14, 0.5, P, 'Trigger'), (0.42, 0.26, TAN, 'Check'), (0.42, 0.74, TEAL, 'Notify'), (0.74, 0.5, P, 'Done')]
    pts = [(x + w * a, y + h * b) for a, b, _, _ in nodes]
    sc = '#8B7F92' if dark else '#C9CCD6'

    def curve(p, q):
        mx = (p[0] + q[0]) / 2
        return '<path d="M%.1f %.1f C%.1f %.1f %.1f %.1f %.1f %.1f" fill="none" stroke="%s" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/>' % (
            p[0], p[1], mx, p[1], mx, q[1], q[0], q[1], sc)
    o += curve(pts[0], pts[1]) + curve(pts[0], pts[2]) + curve(pts[1], pts[3]) + curve(pts[2], pts[3])
    for (px, py), (_, _, col, lab) in zip(pts, nodes):
        o += rr(px - 44, py - 20, 88, 40, 20, col, 'filter="url(#shs)"') + tx(px, py + 5, lab, 13, 600, WHITE, 'middle')
    o += sparkle(pts[3][0] + 58, pts[3][1] - 30, 10, TAN)
    return o


def panel_chart(x, y, w, h, label='Revenue', dark=False, color=P):
    o = rr(x, y, w, h, 14, '#352838' if dark else '#F7F7FB') + tx(x + 18, y + 30, label, 14, 600, WHITE if dark else INK)
    o += line(x + 18, y + 46, w - 36, h - 70, [0.2, 0.34, 0.3, 0.52, 0.46, 0.7, 0.64, 0.9], color,
              (color + '22'), 4, True)
    return o


def panel_bars(x, y, w, h, label='This month', dark=False):
    o = rr(x, y, w, h, 14, '#352838' if dark else '#F7F7FB') + tx(x + 18, y + 30, label, 14, 600, WHITE if dark else INK)
    o += bars(x + 18, y + 46, w - 36, h - 64, [0.42, 0.6, 0.5, 0.78, 0.64, 0.92, 0.7], P, TAN2)
    return o


def panel_donut(x, y, w, h, label='Mix', dark=False):
    o = rr(x, y, w, h, 14, '#352838' if dark else '#F7F7FB') + tx(x + 18, y + 30, label, 14, 600, WHITE if dark else INK)
    r = min(w, h - 40) * 0.3
    o += donut(x + w / 2, y + 24 + (h - 24) / 2, r, [(0.46, P), (0.3, TAN), (0.24, TEAL)], r * 0.42)
    return o


SCENES = {
    'construction': ('Serk Construction', [('Projects', '24'), ('On budget', '92%'), ('Tasks', '318')]),
    'hospital': ('Serk HMS', [('Patients', '1,240'), ('Beds', '86%'), ('Lab', '312')]),
    'finance': ('Serk Finance', [('Revenue', '+18%'), ('Invoices', '642'), ('Cash', 'Healthy')]),
    'pos': ('Serk POS', [('Sales', '1,096'), ('Avg. ticket', '+7%'), ('Stock', 'OK')]),
    'automation': ('Serk Automation', [('Flows', '48'), ('Runs', '9.2k'), ('Saved', '310h')]),
}


def scene(kind, x, y, w, h, dark=False):
    title, stats = SCENES[kind]
    o = window(x, y, w, h, title, P, dark)
    pad = 18
    ix, iy, iw, ih = x + pad, y + 62, w - 2 * pad, h - 62 - pad
    sh = 76
    sw_ = (iw - 2 * 12) / 3
    cols = [P, TAN, TEAL]
    for i, (lab, val) in enumerate(stats):
        o += stat(ix + i * (sw_ + 12), iy, sw_, sh, lab, val, cols[i], dark)
    by, bh = iy + sh + 14, ih - sh - 14
    lw = iw * 0.56
    rw = iw - lw - 14
    if kind == 'construction':
        o += panel_blueprint(ix, by, lw, bh) + panel_estimate(ix + lw + 14, by, rw, bh, dark)
    elif kind == 'hospital':
        o += panel_vitals(ix, by, lw, bh * 0.46) + panel_beds(ix, by + bh * 0.46 + 14, lw, bh * 0.54 - 14)
        o += panel_patients(ix + lw + 14, by, rw, bh)
    elif kind == 'finance':
        o += panel_chart(ix, by, lw, bh * 0.56, 'Cash flow', dark) + panel_bars(ix, by + bh * 0.56 + 14, lw, bh * 0.44 - 14, 'Income vs. spend', dark)
        o += panel_ledger(ix + lw + 14, by, rw, bh, 5, dark)
    elif kind == 'pos':
        o += panel_tiles(ix, by, lw, bh) + panel_receipt(ix + lw + 14, by, rw, bh)
    else:
        o += panel_flow(ix, by, iw, bh * 0.6, dark)
        o += panel_bars(ix, by + bh * 0.6 + 14, iw * 0.5 - 7, bh * 0.4 - 14, 'Tasks automated', dark)
        o += panel_donut(ix + iw * 0.5 + 7, by + bh * 0.6 + 14, iw * 0.5 - 7, bh * 0.4 - 14, 'Time saved', dark)
    return o


def backdrop(w, h, tone='light'):
    """Soft decorative background in the site's palette."""
    if tone == 'light':
        o = '<rect width="%d" height="%d" fill="url(#gl)"/>' % (w, h)
        o += circ(w * 0.86, h * 0.14, min(w, h) * 0.3, MINT, 'fill-opacity=".45"')
        o += circ(w * 0.1, h * 0.9, min(w, h) * 0.26, TAN2, 'fill-opacity=".35"')
        o += circ(w * 0.92, h * 0.86, min(w, h) * 0.16, '#CDE5DC', 'fill-opacity=".5"')
    elif tone == 'tan':
        o = '<rect width="%d" height="%d" fill="#F4F7F5"/>' % (w, h)
        o += circ(w * 0.14, h * 0.16, min(w, h) * 0.28, TAN2, 'fill-opacity=".5"')
        o += circ(w * 0.9, h * 0.84, min(w, h) * 0.3, '#CDE5DC', 'fill-opacity=".5"')
    else:
        o = '<rect width="%d" height="%d" fill="url(#gn)"/>' % (w, h)
        o += circ(w * 0.84, h * 0.2, min(w, h) * 0.3, P, 'fill-opacity=".35"')
        o += circ(w * 0.12, h * 0.86, min(w, h) * 0.26, TAN, 'fill-opacity=".22"')
    for i in range(6):
        for j in range(4):
            o += circ(w * 0.05 + i * 22, h * 0.08 + j * 22, 2.4, P if tone != 'dark' else WHITE, 'fill-opacity=".25"')
    return o


def chip(x, y, label, kind, fill=WHITE, fg=INK, col=P):
    wd = 62 + len(label) * 9.2
    o = rr(x, y, wd, 46, 23, fill, 'filter="url(#shs)"')
    o += circ(x + 23, y + 23, 16, col) + glyph(kind, x + 12, y + 12, 22, WHITE, WHITE)
    o += tx(x + 48, y + 29, label, 15, 600, fg)
    return o


# ================= brand =================
def brand():
    # wide boxed wordmark (header), 3:1 like the original
    b = ('<rect x="14" y="54" width="752" height="152" rx="6" fill="none" stroke="%s" stroke-width="5"/>' % PLUM
         + tx(52, 172, 'SERK', 124, 700, PLUM, 'start', 'letter-spacing="2"')
         + tx(404, 172, 'Group', 124, 300, PLUM))
    save('serk-logo-wide.svg', 780, 260, b, (300, 700))
    # square monogram for the dark footer
    m = (rr(40, 28, 280, 280, 64, 'none', 'stroke="%s" stroke-width="14"' % TAN2)
         + tx(180, 252, 'S', 250, 700, TAN2, 'middle'))
    save('serk-logo-mark.svg', 360, 336, m, (700,))
    f = rr(0, 0, 512, 512, 116, 'url(#gp)') + tx(256, 392, 'S', 380, 700, WHITE, 'middle') 
    save('serk-favicon.svg', 512, 512, f, (700,))


# ================= hero =================
def hero():
    w, h = 1920, 1080
    o = '<rect width="1920" height="1080" fill="#FCFCFE"/>'
    for i in range(-6, 16):
        o += '<path d="M%d -40 l-760 1160" stroke="#F6F6FA" stroke-width="64"/>' % (i * 190)
    clip = ''

    def pill(i, x, y, pw, ph, fill):
        return rr(x, y, pw, ph, pw / 2, fill)
    o += '<g transform="translate(-90 0)">'
    o += pill(0, 1392, 190, 368, 620, MINT) + pill(1, 1662, 360, 204, 424, PLUM)
    o += pill(2, 1058, 544, 242, 452, '#E6ECEF') + pill(3, 1140, 632, 160, 370, TEAL) + pill(4, 1362, 396, 198, 700, TAN2)
    # big pill: light dashboard
    clip += '<clipPath id="c1"><rect x="1198" y="278" width="284" height="644" rx="142"/></clipPath>'
    clip += '<clipPath id="c2"><rect x="1528" y="552" width="216" height="466" rx="108"/></clipPath>'
    a = '<g clip-path="url(#c1)"><rect x="1198" y="278" width="284" height="644" fill="#FFFFFF"/>'
    a += '<rect x="1198" y="278" width="284" height="150" fill="url(#gp)"/>'
    a += sparkle(1262, 356, 16, TAN2) + tx(1286, 366, 'Serk AI', 26, 700, WHITE)
    a += tx(1340, 400, 'one platform', 15, 500, '#DAD8FB', 'middle')
    a += rr(1222, 448, 236, 74, 16, '#F7F7FB') + tx(1240, 478, 'Estimate ready', 15, 600, INK) + skel(1240, 494, 150, 8, '#C9CCD6') + circ(
        1428, 484, 16, GREEN) + '<path d="M1420 484l6 6 10-12" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>'
    a += rr(1222, 536, 236, 150, 16, '#F7F7FB') + tx(1240, 566, 'Performance', 15, 600, INK) + bars(1238, 580, 204, 92,
                                                                                               [0.4, 0.62, 0.5, 0.8, 0.66, 0.95], P, TAN2)
    a += rr(1222, 700, 236, 118, 16, '#F7F7FB') + tx(1240, 730, 'Patients today', 15, 600, INK) + line(
        1238, 742, 204, 60, [0.2, 0.5, 0.36, 0.7, 0.55, 0.9], RED, None, 4)
    a += rr(1222, 832, 236, 60, 16, '#F7F7FB') + skel(1240, 852, 120, 8, '#C9CCD6') + skel(1240, 868, 80, 7)
    a += '</g>'
    b = '<g clip-path="url(#c2)"><rect x="1528" y="552" width="216" height="466" fill="url(#gn)"/>'
    b += tx(1636, 640, 'Live', 15, 600, '#B9AFC0', 'middle') + tx(1636, 682, '+18%', 40, 700, WHITE, 'middle')
    b += line(1548, 706, 176, 96, [0.15, 0.3, 0.24, 0.5, 0.42, 0.72, 0.6, 0.94], TAN, '#E3AB7230', 4, True)
    b += bars(1556, 826, 160, 96, [0.5, 0.74, 0.44, 0.9, 0.62], P, TAN2)
    b += '</g>'
    o += a + b
    o += sparkle(1508, 250, 22, TAN) + sparkle(1810, 300, 12, P) + sparkle(1120, 500, 12, P)
    o += '</g>'
    save('serk-hero.svg', w, h, o, (500, 600, 700), None, clip)


# ================= section artwork =================
def portrait(name, kind, tone, chips, w=820, h=1024):
    o = backdrop(w, h, tone)
    o += scene(kind, 60, (h - 644) / 2, w - 120, 600, tone == 'dark')
    cy = (h - 644) / 2 + 656
    cx = 60
    for lab, k in chips:
        o += chip(cx, cy, lab, k)
        cx += 78 + len(lab) * 9.2
    o += sparkle(w - 120, 120, 26, TAN) + sparkle(120, 130, 12, P)
    save(name, w, h, o)


def landscape(name, kind, tone='light', w=1100, h=820, kind2=None):
    o = backdrop(w, h, tone)
    if kind2:
        o += scene(kind2, w * 0.36, h * 0.2, w * 0.58, h * 0.62, True)
        o += scene(kind, w * 0.06, h * 0.1, w * 0.62, h * 0.66, False)
    else:
        o += scene(kind, w * 0.08, h * 0.1, w * 0.84, h * 0.76, tone == 'dark')
    o += sparkle(w * 0.93, h * 0.1, 22, TAN)
    save(name, w, h, o)


def sections():
    portrait('serk-about-home-1.svg', 'construction', 'light', [('AI Estimator', 'estimator'), ('Site control', 'construction')])
    portrait('serk-about-home-2.svg', 'hospital', 'tan', [('Serk HMS', 'hospital'), ('AI insights', 'ai')])
    portrait('serk-about-main.svg', 'automation', 'light', [('Automation', 'automation'), ('Serk AI', 'ai')], 1086, 1448)
    landscape('serk-platforms.svg', 'construction', 'light', 1280, 1100, 'hospital')
    landscape('serk-engines.svg', 'pos', 'tan', 1056, 816, 'finance')
    landscape('serk-svc-construction.svg', 'construction', 'light', 1080, 800)
    landscape('serk-svc-hospital.svg', 'hospital', 'tan', 1624, 1215)
    landscape('serk-svc-business.svg', 'finance', 'light', 1056, 816, 'automation')
    # promo boxes (text sits on top of a dark overlay)
    landscape('serk-promo-platforms.svg', 'construction', 'dark', 1000, 1000, 'hospital')
    landscape('serk-promo-engines.svg', 'finance', 'dark', 1000, 1000, 'pos')
    # wide section backgrounds
    for name, tone, (w, h) in (('serk-bg-soft.svg', 'light', (1920, 1280)), ('serk-bg-tan.svg', 'tan', (1920, 1280))):
        save(name, w, h, backdrop(w, h, tone), ())
    w, h = 1242, 1280
    o = backdrop(w, h, 'dark') + scene('automation', 110, 190, 1022, 780, True)
    o += chip(110, 1030, 'AI inside', 'ai') + chip(330, 1030, 'Automation', 'automation') + chip(566, 1030, 'Secure', 'shield')
    save('serk-why.svg', w, h, o)
    w, h = 1200, 1600
    save('serk-vision.svg', w, h, backdrop(w, h, 'dark'), ())
    o = backdrop(w, h, 'dark')
    for i, (kind, col) in enumerate((('construction', P), ('hospital', TEAL), ('finance', TAN), ('pos', P), ('automation', TAN))):
        cx = 200 + i * 200
        o += circ(cx, 800, 74, col) + glyph(kind, cx - 40, 760, 80, WHITE, TAN2)
    save('serk-mission.svg', w, h, o, ())
    o = backdrop(1200, 800, 'light')
    save('serk-pattern.svg', 1200, 800, o, ())


# ================= product badges (carousel) =================
def badges():
    items = [('construction', 'Construction', 'construction'), ('estimator', 'AI Estimator', 'estimator'),
             ('hms', 'Hospital', 'hospital'), ('finance', 'Finance', 'finance'), ('pos', 'POS', 'pos'),
             ('automation', 'Automation', 'automation'), ('mobility', 'Segar Ride', 'mobility'),
             ('delivery', 'Segar Express', 'delivery'), ('heritage', 'Visit Tigray', 'heritage')]
    for slug, label, kind in items:
        o = rr(40, 40, 160, 160, 40, 'url(#gp)') + glyph(kind, 72, 72, 96, WHITE, TAN2)
        o += tx(232, 112, 'SERK', 46, 700, PLUM, 'start', 'letter-spacing="3"')
        o += tx(232, 168, label, 46, 300, PLUM)
        save('serk-badge-%s.svg' % slug, 640, 240, o, (300, 700))


# ================= team tiles =================
def team():
    items = [('ai', 'ai', P), ('product', 'product', PLUM), ('cloud', 'cloud', TEAL), ('success', 'success', TAN),
             ('construction', 'construction', P), ('estimator', 'estimator', TAN), ('hospital', 'hospital', TEAL),
             ('finance', 'finance', PLUM), ('pos', 'pos', P), ('automation', 'automation', TAN),
             ('design', 'design', TEAL), ('quality', 'quality', PLUM), ('integrations', 'integrations', P),
             ('support', 'support', TAN)]
    for slug, kind, col in items:
        o = '<rect width="500" height="500" fill="#F4F7F5"/>'
        o += circ(250, 250, 190, col, 'fill-opacity=".14"') + circ(250, 250, 132, col)
        o += glyph(kind, 180, 180, 140, WHITE, TAN2 if col != TAN else WHITE)
        o += sparkle(400, 108, 20, TAN if col != TAN else P) + circ(96, 396, 14, col, 'fill-opacity=".35"')
        save('serk-team-%s.svg' % slug, 500, 500, o, ())


# ================= article covers =================
def posts():
    items = [('estimator', 'construction', 'light', 'AI Estimator'), ('hospital', 'hospital', 'tan', 'Serk HMS'),
             ('finance', 'finance', 'light', 'Serk Finance'), ('pos', 'pos', 'tan', 'Serk POS'),
             ('automation', 'automation', 'dark', 'Automation'), ('ai-native', 'finance', 'dark', 'AI inside'),
             ('platform', 'construction', 'tan', 'One platform'), ('buying', 'pos', 'light', 'Buyer guide')]
    for slug, kind, tone, lab in items:
        w, h = 1600, 900
        o = backdrop(w, h, tone)
        o += scene(kind, 420, 110, 1050, 680, tone == 'dark')
        o += card(120, 250, 380, 400, 28, 'url(#gp)')
        gk = {'AI Estimator': 'estimator', 'Serk HMS': 'hospital', 'Serk Finance': 'finance', 'Serk POS': 'pos',
              'Automation': 'automation', 'AI inside': 'ai', 'One platform': 'product', 'Buyer guide': 'quality'}[lab]
        o += glyph(gk, 230, 300, 160, WHITE, TAN2)
        o += tx(310, 540, lab, 40, 700, WHITE, 'middle') + tx(310, 590, 'SERK Technologies Group Insights', 20, 500, '#CDE5DC', 'middle')
        save('serk-post-%s.svg' % slug, w, h, o, (500, 600, 700))


hero(); sections(); badges(); team(); posts()
n = sorted(os.listdir(OUT))
print(len(n), 'images,', sum(os.path.getsize(os.path.join(OUT, f)) for f in n) // 1024, 'KB')
