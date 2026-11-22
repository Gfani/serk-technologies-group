#!/usr/bin/env python3
"""Rebuild site/ as the Serk Group site from the untouched copy in original/.

usage: build.py            (run from anywhere)
Layout, styles and scripts are left exactly as they are; only words, images,
links between articles and page titles change. Re-running is safe: site/ is
recreated from original/ every time.
"""
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIG, SITE, BRAND = (os.path.join(ROOT, d) for d in ('original', 'site', 'brand'))
IMG = '/wp-content/uploads/serk/'
TODAY = 'November 19, 2026'
problems = []

# ------------------------------------------------------------------ helpers
VOID = {'img', 'br', 'hr', 'input', 'meta', 'link', 'source'}


def element_span(h, open_start):
    """(inner_start, inner_end, outer_end) of the element whose tag opens at open_start."""
    m = re.compile(r'<([a-zA-Z0-9]+)\b[^>]*>').match(h, open_start)
    tag = m.group(1)
    inner_start = m.end()
    depth = 1
    for t in re.compile(r'<(/?)%s\b[^>]*>' % tag).finditer(h, inner_start):
        if t.group(1):
            depth -= 1
            if depth == 0:
                return inner_start, t.start(), t.end()
        elif not t.group(0).endswith('/>'):
            depth += 1
    raise ValueError('unbalanced <%s>' % tag)


def widget(h, data_id):
    """Outer span (start, inner_start, inner_end, end) of the element with this data-id, or None."""
    i = h.find('data-id="%s"' % data_id)
    if i < 0:
        return None
    s = h.rfind('<', 0, i)
    a, b, c = element_span(h, s)
    return s, a, b, c


def nth_class(h, lo, hi, cls, n):
    """Start offset of the n-th tag inside h[lo:hi] whose class list contains cls."""
    pat = re.compile(r'<[a-zA-Z0-9]+\b[^>]*\bclass="([^"]*)"[^>]*>')
    k = 0
    for m in pat.finditer(h, lo, hi):
        if cls in m.group(1).split():
            if k == n:
                return m.start()
            k += 1
    return None


def set_class(h, data_id, cls, values):
    """Inside widget data_id, set the inner HTML of successive elements with class cls."""
    for n, val in enumerate(values):
        w = widget(h, data_id)
        if not w:
            return h, 0
        p = nth_class(h, w[0], w[3], cls, n)
        if p is None:
            problems.append('class %s #%d not found in widget %s' % (cls, n, data_id))
            continue
        a, b, _ = element_span(h, p)
        h = h[:a] + val + h[b:]
    return h, 1


def in_widget(h, data_id, fn):
    w = widget(h, data_id)
    if not w:
        return h, 0
    new = fn(h[w[0]:w[3]])
    return h[:w[0]] + new + h[w[3]:], 1


# ------------------------------------------------------------------ content
POSTS = [
    dict(id=2403, old='capital-markets-charting-a-course-for-ethiopian-banks-in-the-new-financial-era',
         slug='from-drawing-to-budget-inside-the-serk-ai-estimator', img='serk-post-estimator.svg',
         title='From Drawing to Budget: Inside the Serk AI Estimator',
         excerpt='Estimating used to mean long nights with spreadsheets. See how an AI estimator turns drawings and quantities into a budget you can defend.',
         body=[
             ('p', 'Every construction project starts with the same question: what will it cost? For years the honest answer was “give us a few days”. Estimators measured drawings by hand, copied quantities into spreadsheets and hunted for the latest rates. The work was slow, and one missed line could follow a project all the way to handover.'),
             ('h', 'What changes when AI does the heavy lifting'),
             ('p', 'The AI Estimator inside Serk Construction is built to take that weight off your team. It helps turn drawings and quantities into a structured, priced estimate, keeps every rate and assumption visible, and lets your estimator spend time on judgement instead of data entry.'),
             ('l', ['Quantities and prices stay linked, so a design change updates the budget instead of breaking it.',
                    'Every figure can be traced back to its source, which makes reviews and approvals faster.',
                    'The estimate flows straight into the project budget, so site and office work from the same numbers.']),
             ('h', 'Your people stay in charge'),
             ('p', 'AI does not replace an experienced estimator. It gives them a head start and a second pair of eyes. The estimator still decides what is reasonable for this site, this client and this season. The difference is that the first draft arrives in minutes, not days.'),
             ('h', 'From estimate to delivery'),
             ('p', 'Because the estimator lives inside Serk Construction, the story does not end at tender. The same numbers drive procurement, progress tracking and cost reports, so you can see early when a project is drifting and act while it is still cheap to fix.'),
             ('p', 'If your estimates still live in scattered spreadsheets, talk to us. We would love to show you what a smarter starting point looks like.')]),
    dict(id=2378, old='digital-banking-and-capital-markets-ethiopias-next-leap-in-financial-inclusion',
         slug='the-hospital-that-runs-on-insight', img='serk-post-hospital.svg',
         title='The Hospital That Runs on Insight: AI Across the Patient Journey',
         excerpt='From the front desk to discharge, an AI-assisted hospital system keeps care moving and gives staff their time back.',
         body=[
             ('p', 'A hospital is hundreds of small hand-offs: registration to triage, doctor to lab, pharmacy to billing. When each step lives in a different notebook or screen, patients wait and staff spend their day chasing information.'),
             ('h', 'One record, every department'),
             ('p', 'Serk Hospital Management System brings those steps into one place. A patient is registered once, and the same record follows them through consultation, tests, treatment, pharmacy and payment. Nobody retypes, and nobody has to ask the patient the same question twice.'),
             ('h', 'Where the AI helps'),
             ('l', ['Summaries that give clinicians the picture at a glance before they walk into the room.',
                    'Reminders and alerts that surface what needs attention now, from pending results to low stock.',
                    'Dashboards that show managers how beds, queues and revenue are really moving.']),
             ('h', 'Built for the people on the ward'),
             ('p', 'Good hospital software should feel like a helpful colleague, not another form to fill in. We design every screen with the nurses, doctors, pharmacists and cashiers who use it, so the system fits the way care is actually delivered.'),
             ('p', 'The result is simple to describe: less time on screens, more time with patients, and decisions made with facts instead of guesswork.')]),
    dict(id=2301, old='unlocking-ethiopias-capital-markets-strategic-insights-and-lessons-for-local-banks',
         slug='close-the-books-faster-what-ai-changes-in-finance', img='serk-post-finance.svg',
         title='Close the Books Faster: What AI Really Changes in Finance',
         excerpt='Month-end does not have to hurt. Here is how AI-integrated finance turns checking, matching and reporting into a calm routine.',
         body=[
             ('p', 'Ask any finance team about month-end and you will hear the same story: late nights, missing documents and a report that is out of date the moment it is finished. The problem is rarely the people. It is the amount of manual checking between them and the answer.'),
             ('h', 'Let the system do the checking'),
             ('p', 'Serk Finance puts AI to work on the repetitive parts of accounting. It helps match and categorise transactions, points out entries that look unusual, and keeps your reports current as the day goes on.'),
             ('l', ['Invoices, payments and journals in one connected ledger.',
                    'Flags for anything that needs a human eye, before it becomes a problem.',
                    'Clear, plain-language explanations of what moved and why.']),
             ('h', 'Numbers people can act on'),
             ('p', 'A good finance system does more than keep records. It tells managers where cash is going, which customers are late and what next month is likely to look like, while there is still time to do something about it.'),
             ('h', 'Connected to the rest of the business'),
             ('p', 'Because Serk Finance works alongside our construction, hospital and POS systems, sales and costs arrive already organised. Your accountants review and approve, instead of collecting and retyping.'),
             ('p', 'Faster closes are nice. Confident decisions are the real prize.')]),
    dict(id=1173, old='is-ethio-telecoms-ipo-valuation-justified',
         slug='every-sale-tells-a-story-getting-more-from-your-pos', img='serk-post-pos.svg',
         title='Every Sale Tells a Story: Getting More from Your POS',
         excerpt='A point of sale should do more than print receipts. Used well, it becomes the smartest pair of eyes in your shop.',
         body=[
             ('p', 'Every time a customer pays, your business learns something: what sells, when it sells and what is about to run out. Most of that knowledge is lost if the till only prints a receipt.'),
             ('h', 'Speed at the counter'),
             ('p', 'First, a POS has to be fast and dependable. Serk POS is designed for busy counters in cafés, shops and multi-branch businesses, with a simple screen that new staff can learn in minutes.'),
             ('h', 'Insight behind the counter'),
             ('l', ['Live stock levels, so you reorder before the shelf is empty.',
                    'Sales by item, hour and branch, so you staff and stock for real demand.',
                    'Clean daily summaries that make cash-up quick and disputes rare.']),
             ('h', 'Part of something bigger'),
             ('p', 'When your POS talks to your finance system, every sale is already in the books. Add automation and routine jobs, such as end-of-day reports or low-stock messages, happen on their own.'),
             ('p', 'The best POS is the one your team forgets about because it simply works, and the one you remember when it tells you something useful about tomorrow.')]),
    dict(id=1172, old='ipos-listing-requirements-the-view-from-two-corners-of-the-world',
         slug='automate-the-boring-amplify-the-brilliant', img='serk-post-automation.svg',
         title='Automate the Boring, Amplify the Brilliant',
         excerpt='Automation is not about replacing people. It is about giving your best people their best hours back.',
         body=[
             ('p', 'Look closely at any working day and you will find hours spent on tasks nobody was hired to do: copying data between systems, sending reminders, preparing the same report again. They are necessary, and they are exactly the kind of work software should take over.'),
             ('h', 'Start with the hand-offs'),
             ('p', 'The best place to begin is wherever work waits for someone to pass it on. An approval that sits in an inbox. A report that depends on one person remembering. A stock alert that arrives too late. Each of these can become a simple, reliable automated flow.'),
             ('h', 'What good automation looks like'),
             ('l', ['It is visible: everyone can see what ran, when and why.',
                    'It is forgiving: when something unusual happens, it asks a person instead of guessing.',
                    'It grows with you: a small flow today becomes the backbone of a process tomorrow.']),
             ('h', 'People first'),
             ('p', 'At Serk Group we build automation around your team, not the other way round. We map how the work really flows, automate the repetitive steps and leave the decisions that need experience where they belong.'),
             ('p', 'The reward is not just saved time. It is a team with the energy to do the thoughtful, creative work that moves a business forward.')]),
    dict(id=1171, old='flinstone-last-of-the-stone-age-ipos',
         slug='ai-integrated-vs-ai-added-later', img='serk-post-ai-native.svg',
         title='AI-Integrated vs. AI Added Later: Why It Matters',
         excerpt='Plenty of software now has an AI button. Far fewer products are designed around intelligence from the first line of code.',
         body=[
             ('p', 'Almost every business tool now advertises AI. Often that means a chat window added to the corner of an old screen. It can be handy, but it sits beside your work instead of inside it.'),
             ('h', 'What “integrated” really means'),
             ('p', 'In an AI-integrated system, intelligence is part of the everyday flow. It sees the same data you see, at the moment you need it, and helps with the next step without being asked.'),
             ('l', ['In construction, it is an estimate that updates itself as the scope changes.',
                    'In a hospital, it is a summary waiting for the doctor before the consultation.',
                    'In finance, it is an unusual entry flagged the day it is posted, not at year-end.']),
             ('h', 'Why bolt-on AI falls short'),
             ('p', 'An assistant that cannot see your whole process can only answer narrow questions. It also adds one more place to look. Built-in intelligence removes steps instead of adding them.'),
             ('h', 'How to tell the difference'),
             ('p', 'Ask a simple question when you evaluate any product: if the AI were switched off, would people notice in their daily work? If the honest answer is no, it was probably added later.'),
             ('p', 'Every Serk system is designed with AI at its core, because that is where it does the most good.')]),
    dict(id=1170, old='ethiopian-coffee-export-performance-and-global-trends',
         slug='one-family-of-systems-the-case-for-connected-software', img='serk-post-platform.svg',
         title='One Family of Systems: The Case for Connected Software',
         excerpt='Separate tools create separate versions of the truth. A connected family of systems gives everyone the same picture.',
         body=[
             ('p', 'Most organisations do not choose to run on disconnected software. It happens one purchase at a time: a finance package here, a sales tool there, a spreadsheet to join them. Before long, people spend more time reconciling systems than using them.'),
             ('h', 'The hidden cost of gaps'),
             ('p', 'Every gap between two systems is a place where data is retyped, delayed or lost. Managers end up comparing reports that never quite agree, and good decisions wait for someone to work out which number is right.'),
             ('h', 'What a connected family gives you'),
             ('l', ['One version of the truth, from the site or ward all the way to the boardroom.',
                    'Less training, because every Serk product feels familiar.',
                    'Automation that can cross departments, not stop at the edge of one tool.']),
             ('h', 'Start where it hurts most'),
             ('p', 'You do not need to change everything at once. Many of our customers begin with the system that solves their biggest daily headache, then add the next when they are ready. Because the products are built to work together, each addition makes the others more useful.'),
             ('p', 'Construction, healthcare, finance, retail and automation: different industries, one connected way to work.')]),
    dict(id=1165, old='the-opportunities-in-the-transport-sector-in-ethiopia',
         slug='five-questions-before-you-buy-business-software', img='serk-post-buying.svg',
         title='Five Questions to Ask Before You Buy Business Software',
         excerpt='Choosing new software is a big decision. These five questions will help you see past the demo and pick a partner that lasts.',
         body=[
             ('p', 'A polished demo can make any product look perfect. The real test comes months later, when your team is using it every day. These five questions help you find out early what that will feel like.'),
             ('h', '1. Does it fit the way we actually work?'),
             ('p', 'Bring a real, messy example from your own business and ask to see it handled. Software should adapt to your process, not force you to pretend it is simpler than it is.'),
             ('h', '2. Who will help us when we are stuck?'),
             ('p', 'Ask how onboarding, training and support work, and who you will be talking to. A capable team behind the product matters as much as the product.'),
             ('h', '3. Where is the AI, and what does it do for us?'),
             ('p', 'Look for intelligence that removes steps from daily work. A feature you have to remember to open is easy to forget.'),
             ('h', '4. Will it talk to our other systems?'),
             ('p', 'Every tool that stands alone creates double entry. Check how data moves in and out, and what can be automated between systems.'),
             ('h', '5. Can it grow with us?'),
             ('p', 'Think about more users, more branches and more products. The right choice still fits when your business is twice the size.'),
             ('p', 'At Serk Group we are happy to be asked all five. Good questions lead to good partnerships.')]),
]

TEAM = [  # widget id, image, name, role, optional description
    ('0c9e75a', 'serk-team-ai.svg', 'AI &amp; Data', 'The Brains', 'Models, data pipelines and smart assistants that sit inside every Serk product, turning everyday records into estimates, forecasts and timely nudges.'),
    ('2fcade9', 'serk-team-product.svg', 'Product Engineering', 'The Builders', 'Designers and engineers who turn real-world workflows into fast, reliable software that people actually enjoy using.'),
    ('8bf6a84', 'serk-team-cloud.svg', 'Cloud &amp; Security', 'The Guardians', 'Infrastructure, backups and access controls that keep your systems available and your data protected around the clock.'),
    ('5569ee4', 'serk-team-success.svg', 'Customer Success', 'The Partners', 'Onboarding, training and support specialists who stay with your team from first setup to confident everyday use.'),
    ('db49a0e', 'serk-team-construction.svg', 'Serk Construction', 'Project &amp; Site Control', None),
    ('6c8f5bb', 'serk-team-estimator.svg', 'AI Estimator', 'Takeoff &amp; Cost Intelligence', None),
    ('c454167', 'serk-team-hospital.svg', 'Serk HMS', 'Hospital Management', None),
    ('de4a614', 'serk-team-finance.svg', 'Serk Finance', 'Accounting &amp; Reporting', None),
    ('73e6217', 'serk-team-pos.svg', 'Serk POS', 'Sales &amp; Inventory', None),
    ('d97fa7a', 'serk-team-automation.svg', 'Serk Automation', 'Workflows &amp; Bots', None),
    ('6996c9c', 'serk-team-design.svg', 'Experience Design', 'UX &amp; Interface', None),
    ('1f8edeb', 'serk-team-quality.svg', 'Quality Assurance', 'Testing &amp; Reliability', None),
    ('7e6a1cb', 'serk-team-integrations.svg', 'Integrations', 'APIs &amp; Data Exchange', None),
    ('e8fbe09', 'serk-team-support.svg', 'Support Desk', 'Help &amp; Training', None),
]

BADGES = ['construction', 'estimator', 'hms', 'finance', 'pos', 'automation', 'mobility', 'delivery', 'heritage']
BADGE_ALT = {'construction': 'Serk Construction', 'estimator': 'Serk AI Estimator', 'hms': 'Serk Hospital Management System',
             'finance': 'Serk Finance', 'pos': 'Serk POS', 'automation': 'Serk Automation',
             'mobility': 'Segar Ride Mobility', 'delivery': 'Segar Express Delivery', 'heritage': 'Visit Tigray Tourism'}

# image URL prefixes (any size variant) -> new file
IMAGES = [
    (r'2023/06/Zuri-Dark-nobg', 'serk-logo-wide.png'),
    (r'2023/06/Dark_Green_Modern_Initial_LogoNEWWW-removebg-preview-Copy', 'serk-logo-mark.png'),
    (r'2023/06/Light-Zuri', 'serk-logo-mark.png'),
    (r'2025/05/cropped-Zuri_icon_LE_upscale_balanced_x4-removebg-preview-1-32x32', 'serk-favicon-32.png'),
    (r'2025/05/cropped-Zuri_icon_LE_upscale_balanced_x4-removebg-preview-1-180x180', 'serk-favicon-180.png'),
    (r'2025/05/cropped-Zuri_icon_LE_upscale_balanced_x4-removebg-preview-1-192x192', 'serk-favicon-192.png'),
    (r'2025/05/cropped-Zuri_icon_LE_upscale_balanced_x4-removebg-preview-1', 'serk-favicon-270.png'),
    (r'2025/03/Strategic-Plan-Zuri-fromhgfgjhgvjhgv', 'serk-hero.svg'),
    (r'2025/03/IMG_7903-2-scaled-cropped', 'serk-about-home-1.svg'),
    (r'2025/03/Green-Minimalist-Fashion-Photo-Collage-Instagram-Post', 'serk-about-home-2.svg'),
    (r'2025/03/IMG_8025-removebg-preview', 'serk-promo-platforms.svg'),
    (r'2025/04/Clean-Eco-Friendly-Sponsorship-Proposal-1', 'serk-promo-engines.svg'),
    (r'2025/03/pexels-artempodrez-7232829-scaled', 'serk-bg-soft.svg'),
    (r'2025/03/photo_2022-11-14_11-43-48', 'serk-why.svg'),
    (r'2025/03/placeholder-\d+', 'serk-pattern.svg'),
    (r'2026/07/614e7366-6327-47f6-85f3-2bb6f1f07a94', 'serk-photo-lobby.jpg'),
    (r'2025/04/IMG_2991', 'serk-platforms.svg'),
    (r'2025/04/24', 'serk-photo-engineering.jpg'),
    (r'2026/07/hero-white-1', 'serk-bg-soft.svg'),
    (r'2025/04/pexels-cottonbro-4273432-scaled-1', 'serk-vision.svg'),
    (r'2025/04/wmremove-transformed-1', 'serk-mission.svg'),
    (r'2025/04/Screenshot-2025-04-14-112949', 'serk-svc-construction.svg'),
    (r'2025/11/capital-market2', 'serk-svc-hospital.svg'),
    (r'2025/04/fghghhghgh', 'serk-svc-business.svg'),
    (r'2025/07/hjhgfgvhvhf-Templates', 'serk-post-estimator.svg'),
    (r'2025/06/hgytfh', 'serk-post-hospital.svg'),
    (r'2025/06/hjklkjh', 'serk-post-hospital.svg'),
    (r'2025/06/nhjkllkjjjhhh', 'serk-post-hospital.svg'),
    (r'2025/05/b_213_800x445_b54872073c', 'serk-post-finance.svg'),
    (r'2023/06/wmremove-transformed-3', 'serk-post-pos.svg'),
    (r'2023/06/471168748_904624725187949_8915704757879766986_n', 'serk-post-automation.svg'),
    (r'2023/06/IMG_7029_20250108124423_original_image_1', 'serk-post-ai-native.svg'),
    (r'2023/06/Coffee-and-Cocoa4', 'serk-post-platform.svg'),
    (r'2023/06/pexels-chanaka-318741-906494-2', 'serk-post-buying.svg'),
]

INSIGHT_INTRO = ('<p>Ideas, guides and product stories from the Serk Group team. See how AI and automation are changing the way '
                 'construction firms, hospitals, finance teams and retailers get work done.</p>')

SIDEBAR_ABOUT = ('<p>Serk Group builds AI-integrated software for construction, healthcare, finance and retail. Our systems think '
                 'ahead, cut the busywork and help your team do its best work.</p>')
SIDEBAR_LIST = ['Serk Construction + AI Estimator', 'Serk Hospital Management System', 'Serk Finance', 'Serk POS',
                'Serk Automation']

SIDEBAR_LIST4 = SIDEBAR_LIST[:3] + ['Serk POS &amp; Automation']

# (kind, ...) rules; every rule must hit at least once somewhere
RULES = [
    # ---------------- header / footer (all pages)
    ('H', 'e1f0665', 'Follow Us'),
    ('H', 'fa6ef4b', 'Solutions'),
    ('H', '8c3ad61', 'Our Solutions'),
    ('H', '824414e', 'Construction &amp; AI Estimator'),
    ('H', 'ef0a19c', 'Hospital Management System'),
    ('H', '45258b1', 'Finance, POS &amp; Automation'),
    ('W', 'bbc634c', '<p>Copyright © Serk Group 2026 · Innovation with Integrity · <a href="/privacy/" style="color: inherit; text-decoration: underline;">Privacy Policy</a> · <a href="/terms/" style="color: inherit; text-decoration: underline;">Terms of Service</a></p>'),
    # ---------------- home
    ('H1', '9d25fef', 'We Engineer the Systems Behind Better Business.'),
    ('W', 'c154a22', '<p>From your first website to intelligent enterprise operations, SERK Technologies Group designs and develops '
                     'practical digital solutions for organizations ready to work smarter. We combine software engineering, thoughtful '
                     'design, responsible AI and deep attention to real-world workflows — starting in Ethiopia, built for a wider world.</p>'),
    ('H', '5f1264c', 'We Build Software That Thinks Ahead'),
    ('W', '97923a4', '<p>Serk Group is a software company with one simple belief: every organisation deserves systems as smart as the '
                     'people who use them. Our family of intelligent business products covers construction management and estimating, hospital '
                     'management, finance, point of sale and automation, all designed to work beautifully together…</p>'),
    ('F', '436951c', lambda s: s.replace('Our Services', 'Our Solutions')),
    ('C', '71007435', 'wpr-promo-box-title', ['<span style="color: #FFFFFF !important;">Smart Industry Platforms</span>']),
    ('C', '71007435', 'wpr-promo-box-description', ['<p style="color: #CDE5DC !important;">Serk Construction with its AI Estimator and the AI-assisted Serk Hospital '
                                                     'Management System run your core operations from first click to final report.</p>']),
    ('C', '71007435', 'wpr-promo-box-btn-text', ['Explore Platforms']),
    ('F', '71007435', lambda s: re.sub(r'(<a class="wpr-promo-box-btn"[^>]*href=")[^"]*', r'\1/products/', s)),
    ('C', '106fa9c', 'wpr-promo-box-title', ['<span style="color: #FFFFFF !important;">Finance, POS &amp; Automation</span>']),
    ('C', '106fa9c', 'wpr-promo-box-description', ['<p style="color: #CDE5DC !important;">Serk Finance, Serk POS and our automation tools keep money, sales and routine work '
                                                    'flowing, so nothing waits on paperwork.</p>']),
    ('C', '106fa9c', 'wpr-promo-box-btn-text', ['Explore Solutions']),
    ('F', '106fa9c', lambda s: re.sub(r'(<a class="wpr-promo-box-btn"[^>]*href=")[^"]*', r'\1/products/', s)),
    ('F', 'c9c0fd0', lambda s: s.replace('Zuri Capital', 'Serk Group')),
    ('W', '08620b3', '<p>At Serk, we pair real industry know-how with practical AI. The result is software that feels made for you, '
                     'because it is. Here’s why teams choose us:</p>'),
    ('C', '4bf2b96', 'elementor-icon-box-title', ['<span>AI at the Core</span>']),
    ('C', '4bf2b96', 'elementor-icon-box-description', ['Intelligence is built into every Serk product, not bolted on afterwards.']),
    ('C', '13f4215', 'elementor-icon-box-title', ['<span>Built for Your Industry</span>']),
    ('C', '13f4215', 'elementor-icon-box-description', ['Purpose-built for construction, healthcare, finance and retail teams.']),
    ('C', 'd0e80e2', 'elementor-icon-box-title', ['<span>One Connected Family</span>']),
    ('C', 'd0e80e2', 'elementor-icon-box-description', ['Systems that share data and work together as your business grows.']),
    ('C', '327ae75', 'elementor-icon-box-title', ['<span>Tailored to You</span>']),
    ('C', '327ae75', 'elementor-icon-box-description', ['We configure, integrate and automate around the way you already work.']),
    ('F', '20e2d6f', lambda s: s.replace('Some of Our', 'Meet the').replace('Clients', 'Serk Family')),
    ('W', '212ab0a', '<p>one family of AI-integrated systems, built to work together</p>'),
    ('W', '96fa6a1', INSIGHT_INTRO),
    # ---------------- about
    ('H', '7dcfe24', 'Our Vision'),
    ('H1', 'f383be9', 'Innovation with Integrity. Building Beyond Boundaries.'),
    ('W', '3fe221c', '<p>Serk Group is a software company building AI-integrated systems for the industries that keep the world running. '
                     'We design, build and support products for construction, healthcare, finance and retail, and we connect them with '
                     'automation so your data, your people and your decisions move together.</p>'),
    ('C', '6d56c95', 'wpr-sub-label', ['Step 01 ', 'Step 02 ', 'Step 03 ']),
    ('C', '6d56c95', 'wpr-title', ['Understand the Work', 'Build with AI Inside', 'Connect and Keep Improving']),
    ('C', '6d56c95', 'wpr-description', [
        '<p>We start on the ground with the estimators, nurses, accountants and cashiers who do the job every day, and map how work really flows.</p>',
        '<p>We design each system around that reality and put AI where it removes effort: estimating, forecasting, checking, reminding and reporting.</p>',
        '<p>We link your systems, automate the hand-offs between them and keep refining with your team long after go-live.</p>']),
    ('F', 'dddc8ab', lambda s: s.replace('<b>Services</b>', '<b>Solutions</b>')),
    ('H', '10d2df3', 'Smart Industry Platforms'),
    ('W', '523c7f2', '<p>Serk Construction, with its built-in AI Estimator, and the AI-assisted Serk Hospital Management System run '
                     'complex operations end to end, from the first drawing or patient visit to the final report.</p>'),
    ('H', 'a058d4f', 'Finance, POS &amp; Automation'),
    ('W', '0a08eb4', '<p>Serk Finance, Serk POS and our automation tools keep money, sales and everyday tasks moving on their own, with '
                     'clear numbers you can trust.</p>'),
    ('F', '5af07bf', lambda s: s.replace('<b>Board</b>', '<b>What Powers Us</b>')),
    ('F', 'c9344a4', lambda s: s.replace('<b>Meet Our Team</b>', '<b>Meet Our Teams</b>')),
    ('W', '2055672', '<p>A world where every organisation, large or small, runs on software that works as hard and thinks as clearly as '
                     'its best people.</p>'),
    ('W', '3e5f206', '<p>To build AI-integrated systems that take the busywork out of construction, healthcare, finance and retail, so '
                     'teams can spend their time on the work that truly needs them.</p>'),
    ('C', '7275f4da', 'elementor-icon-box-description', ['We build honestly, protect your data and say what we mean.']),
    ('C', '21336e5f', 'elementor-icon-box-title', ['<span>Customer First</span>']),
    ('C', '21336e5f', 'elementor-icon-box-description', ['Every feature starts with a real problem from a real team.']),
    ('C', 'd53349c', 'elementor-icon-box-title', ['<span>Simplicity</span>']),
    ('C', 'd53349c', 'elementor-icon-box-description', ['Powerful software should feel easy. We sweat the details so you don’t have to.']),
    ('C', '4483b3b3', 'elementor-icon-box-title', ['<span>Always Improving</span>']),
    ('C', '4483b3b3', 'elementor-icon-box-description', ['We ship, listen and refine, so your systems get smarter over time.']),
    # ---------------- services
    ('F', 'a819db5', lambda s: s.replace('<b>Services</b>', '<b>Solutions</b>')),
    ('H1', '7eb5a1b4', 'Technology for Every Stage of Your Business'),
    ('W', '21f29907', '<p>AI-integrated construction management that keeps every project on time and on budget, with an estimator that '
                      'prices work as fast as you can scope it. You get:</p>'),
    ('C', '5e30334e', 'wpr-feature-list-url', ['AI Estimator', 'Project &amp; Site Control', 'Cost, Procurement &amp; Reporting']),
    ('C', '5e30334e', 'wpr-feature-list-description', [
        'Turn drawings and quantities into clear, priced estimates in a fraction of the usual time, with rates and assumptions you can trace.',
        'Plan the work, track progress and keep site, office and management on the same page every day.',
        'Follow every budget line from purchase to payment and see where each project really stands.']),
    ('H', '68ec5dc', 'Serk Hospital Management System'),
    ('W', '6b91f76', '<p>An AI-assisted hospital management system that connects every desk, ward and department, so care teams '
                     'spend less time on screens and more time with patients. It covers:</p>'),
    ('C', '5e2986b', 'wpr-feature-list-url', ['Patient Registration &amp; Records', 'Clinical Workflows', 'Lab, Pharmacy &amp; Inventory',
                                             'Billing &amp; Insurance', 'AI Assistance &amp; Insights']),
    ('C', '5e2986b', 'wpr-feature-list-description', [
        'One complete, secure record for every patient, from first visit to follow-up.',
        'Appointments, consultations, orders and results flow smoothly between doctors, nurses and departments.',
        'Requests, results, dispensing and stock stay in sync, with alerts before shortages happen.',
        'Accurate bills, clean claims and clear revenue reporting without the manual chasing.',
        'Smart summaries, reminders and dashboards help staff act sooner and managers plan better.']),
    ('H', '8cd8ff7', 'Serk Finance, POS &amp; Automation'),
    ('W', '11c9e3d', '<p>The engines behind a well-run business: finance that keeps itself in order, sales that never queue and '
                     'automation that handles the routine. Together they give you:</p>'),
    ('C', '572ff79', 'wpr-feature-list-url', ['AI-Integrated Finance', 'POS Systems', 'Workflow Automation', 'Integrations &amp; Custom Builds']),
    ('C', '572ff79', 'wpr-feature-list-description', [
        'Accounting, invoicing and reporting with AI that flags what needs attention and explains the numbers.',
        'Fast, reliable checkout with live stock and sales insight for cafés, shops and multi-branch chains.',
        'Approvals, reminders, data entry and reports that run on their own, around the clock.',
        'We connect Serk systems to the tools you already use and tailor them to your process.']),
    # ---------------- blog sidebars (post, blog and archive templates)
    ('W', '681bb76', SIDEBAR_ABOUT), ('W', '24042fd', SIDEBAR_ABOUT), ('W', '5f3caf5', SIDEBAR_ABOUT),
    ('H', 'b293126', 'Solutions'), ('H', 'b0025ae', 'Solutions'), ('H', 'cb7fc66', 'Solutions'),
    ('C', '0fb9080', 'wpr-pl-title', SIDEBAR_LIST4),
    ('C', 'a212390', 'wpr-pl-title', SIDEBAR_LIST4),
    ('F', 'a212390', lambda s: s.replace('/elementor-1892/', '/services/')),
    ('C', '4c654a3', 'wpr-pl-title', SIDEBAR_LIST),
    ('C', '6b4dabb', 'wpr-promo-box-title', ['<span>Talk to Serk</span>']),
    ('C', '6b4dabb', 'wpr-promo-box-description', ['<p>See how our AI-integrated systems can work for your team.</p>']),
    ('C', '6b4dabb', 'wpr-promo-box-btn-text', ['Contact Us']),
    ('F', '6b4dabb', lambda s: re.sub(r'(<a class="wpr-promo-box-btn"[^>]*href=")[^"]*', r'\1/contact_us/', s)),
    # ---------------- insight / contact
    ('W', '5e37edf', INSIGHT_INTRO),
    ('W', '4782b482', '<p>Tell us what you’re building, running or struggling with. Whether you need one Serk system or the whole family, '
                      'our team will show you how AI and automation can make it simpler.</p>'),
    ('H1', '21de704', 'Let’s Build Something That Works.'),
    ('C', '64302edd', 'elementor-icon-box-description', ['<a href="mailto:serktechgroup@gmail.com">serktechgroup@gmail.com</a>']),
    ('C', '6c25246a', 'elementor-icon-box-description', ['<a href="tel:+251999911192">+251 999 911 192</a>']),
    ('C', '3bfe5666', 'elementor-icon-box-description', ['Mekelle, Tigray, Ethiopia']),
    ('F', 'ec8e6d4', lambda s: re.sub(r'maps\?q=[^&"]*', 'maps?q=Mekelle%2C%20Tigray%2C%20Ethiopia', s).replace('z=15', 'z=13')
                                .replace('KAS tower, Addis Ababa, Ethiopia', 'Mekelle, Tigray, Ethiopia')),
]

TITLES = {  # file -> <title>
    'index.html': 'SERK Technologies Group | Innovation with Integrity',
    'about_us/index.html': 'About Us | SERK Technologies Group',
    'services/index.html': 'Solutions &amp; Software Platforms | SERK Technologies Group',
    'products/index.html': 'Products &amp; Software Platforms | SERK Technologies Group',
    'industries/index.html': 'Industries &amp; Sectors | SERK Technologies Group',
    'ventures/index.html': 'Ventures &amp; Innovation Labs | SERK Technologies Group',
    'gallery/index.html': 'Media &amp; Visual Gallery | SERK Technologies Group',
    'partners/index.html': 'Partners &amp; Clients Ecosystem | SERK Technologies Group',
    'privacy/index.html': 'Privacy Policy &amp; Data Stewardship | SERK Technologies Group',
    'terms/index.html': 'Terms of Service &amp; Governance | SERK Technologies Group',
    'insight/index.html': 'Insights &amp; Product Stories | SERK Technologies Group',
    'contact_us/index.html': 'Contact Us | SERK Technologies Group',
    'blog-landing-page-business-v1/index.html': 'Blog &amp; Knowledge Base | SERK Technologies Group',
    'category/latest/index.html': 'Latest Updates | SERK Technologies Group',
    'page/2/index.html': 'SERK Technologies Group | Insights, page 2',
    'page/3/index.html': 'SERK Technologies Group | Insights, page 3',
    '404.html': 'Page Not Found | SERK Technologies Group',
}

DESCRIPTIONS = {
    'index.html': 'SERK Technologies Group designs and develops practical digital solutions, AI-integrated business software, enterprise ERP, and digital platforms in Ethiopia and beyond.',
    'about_us/index.html': 'About SERK Technologies Group: Innovation with Integrity. Engineering intelligent systems, enterprise software, and digital platforms from Mekelle, Tigray, Ethiopia.',
    'services/index.html': 'Explore SERK Technologies Group software solutions: Construction Intelligence OS, Hospital Management Systems, Finance, POS, and custom AI automation.',
    'products/index.html': 'Explore SERK Technologies Group software products: Office OS, Construction OS, Health OS, Finance, POS, and AI security systems with transparent maturity disclosures.',
    'industries/index.html': 'Tailored industry operating software by SERK Technologies Group for Hospitality, Healthcare, Construction, Building Materials, Manufacturing, and Real Estate.',
    'ventures/index.html': 'Venture ecosystem, mobility platforms, and engineering labs powered by SERK Technologies Group, including Segar Ride, Segar Delivery, and Visit Tigray.',
    'gallery/index.html': 'Visual lookbook inside SERK Technologies Group: our headquarters in Mekelle, engineering studios, healthcare technology deployments, and infrastructure operations.',
    'partners/index.html': 'SERK Technologies Group client and partner ecosystem: collaborating with enterprises, financial institutions, healthcare providers, and industrial leaders across Ethiopia.',
    'privacy/index.html': 'SERK Technologies Group Privacy Policy: Institutional data stewardship, zero commercial data rental, and strict enterprise security standards.',
    'terms/index.html': 'SERK Technologies Group Terms of Service: Commercial engagement standards, software maturity disclosures, intellectual property rights, and SLA governance.',
    'insight/index.html': 'Ideas, guides and product stories from the SERK Technologies Group engineering and product teams.',
    'contact_us/index.html': 'Contact SERK Technologies Group in Mekelle, Ethiopia. Discuss your project, request a software demo, or explore technology partnerships.',
    'blog-landing-page-business-v1/index.html': 'Articles and updates on enterprise technology, AI, and digital transformation from SERK Technologies Group.',
    'category/latest/index.html': 'Latest insights and industry updates from SERK Technologies Group.',
    '404.html': 'Page not found - SERK Technologies Group.',
}


# ------------------------------------------------------------------ transforms
def article_html(p):
    out = []
    for kind, val in p['body']:
        if kind == 'p':
            out.append('<p>%s</p>' % val)
        elif kind == 'h':
            out.append('<h3>%s</h3>' % val)
        else:
            out.append('<ul>%s</ul>' % ''.join('<li>%s</li>' % x for x in val))
    return ('\n<div class="elementor-element elementor-widget elementor-widget-text-editor" data-element_type="widget" '
            'data-widget_type="text-editor.default">\n<div class="elementor-widget-container">\n%s\n</div>\n</div>\n' % '\n'.join(out))


def fix_grid_items(h):
    """Rewrite every post card (title, date, excerpt, image alt) from the POSTS table."""
    by_id = {p['id']: p for p in POSTS}
    out, pos = [], 0
    for m in re.finditer(r'<article class="wpr-grid-item[^"]*\bpost-(\d+)\b[^"]*">', h):
        end = h.find('</article>', m.end())
        p = by_id.get(int(m.group(1)))
        if not p or end < 0:
            continue
        a = h[m.start():end]
        a = re.sub(r'(<h\d class="wpr-grid-item-title[^>]*>.*?<a [^>]*>)(.*?)(</a>)', lambda x: x.group(1) + p['title'] + x.group(3), a, count=1, flags=re.S)
        a = re.sub(r'(<div class="wpr-grid-item-date[^>]*>\s*<div class="inner-block">\s*<span>)[^<]*', lambda x: x.group(1) + TODAY, a, count=1)
        a = re.sub(r'(<div class="wpr-grid-item-excerpt[^>]*>\s*<div class="inner-block">\s*<p>)(.*?)(</p>)',
                   lambda x: x.group(1) + p['excerpt'] + x.group(3), a, count=1, flags=re.S)
        a = re.sub(r'alt="[^"]*"', 'alt="%s"' % p['title'].replace('"', '&quot;'), a)
        out.append(h[pos:m.start()] + a)
        pos = end
    return ''.join(out) + h[pos:]


def fix_images(text):
    for pat, new in IMAGES:
        text = re.sub(r'/wp-content/uploads/%s(?:-scaled)?(?:-\d+x\d+)?(?:-\d)?\.(?:png|jpe?g|webp|svg)' % pat, IMG + new, text)
    return text


def fix_carousel(s):
    n = [0]

    def repl(m):
        b = BADGES[n[0] % len(BADGES)]
        n[0] += 1
        tag = re.sub(r'src="[^"]*"', 'src="%sserk-badge-%s.svg"' % (IMG, b), m.group(0))
        tag = re.sub(r'\s(?:srcset|sizes)="[^"]*"', '', tag)
        return re.sub(r'alt="[^"]*"', 'alt="%s"' % BADGE_ALT[b], tag)
    return re.sub(r'<img\b[^>]*>', repl, s)



NAV_ITEMS = [
    ('Home', '/'),
    ('About Us', '/about_us/'),
    ('Services', '/services/'),
    ('Insights', '/insight/'),
    ('Contact Us', '/contact_us/'),
]

def fix_header_nav(h, rel):
    w = widget(h, '0eb8db5')
    if not w:
        return h
    d_items, m_items = [], []
    for title, href in NAV_ITEMS:
        is_cur = False
        if href == '/' and rel == 'index.html':
            is_cur = True
        elif href != '/' and (rel.startswith(href.strip('/')) or (href == '/insight/' and ('category/' in rel or 'page/' in rel or any(p['slug'] in rel for p in POSTS)))):
            is_cur = True
        cur_cls = ' current-menu-item page_item current_page_item' if is_cur else ''
        cur_aria = ' aria-current="page"' if is_cur else ''
        d_items.append('<li class="menu-item menu-item-type-post_type menu-item-object-page%s"><a href="%s"%s class="wpr-menu-item wpr-pointer-item">%s</a></li>'
                       % (cur_cls, href, cur_aria, title))
        m_items.append('<li class="menu-item menu-item-type-post_type menu-item-object-page%s"><a href="%s"%s class="wpr-mobile-menu-item">%s</a></li>'
                       % (cur_cls, href, cur_aria, title))
    d_html = '<ul id="menu-1-0eb8db5" class="wpr-nav-menu">\n' + '\n'.join(d_items) + '\n</ul>'
    m_html = '<ul id="mobile-menu-2-0eb8db5" class="wpr-mobile-nav-menu">\n' + '\n'.join(m_items) + '\n</ul>'
    sub = h[w[0]:w[3]]
    sub = re.sub(r'<ul id="menu-1-0eb8db5"[^>]*>.*?</ul>', d_html, sub, count=1, flags=re.S)
    sub = re.sub(r'<ul id="mobile-menu-2-0eb8db5"[^>]*>.*?</ul>', m_html, sub, count=1, flags=re.S)
    return h[:w[0]] + sub + h[w[3]:]


FOOTER_EXPLORE_LINKS = [
    ('Products', '/products/'),
    ('Industries', '/industries/'),
    ('Ventures', '/ventures/'),
    ('Partners & Clients', '/partners/'),
    ('Media Gallery', '/gallery/'),
    ('About Us', '/about_us/'),
    ('Contact Us', '/contact_us/'),
    ('Privacy Policy', '/privacy/'),
    ('Terms of Service', '/terms/'),
]

FOOTER_SOLUTION_LINKS = [
    ('Construction & AI Estimator', '/products/#construction'),
    ('Hospital Management System', '/products/#hms'),
    ('Finance, POS & Automation', '/products/#finance'),
]

def fix_footer_nav(h):
    # 1. Update Column 2 (Explore - 3bf3c57) to horizontal layout with white header
    w2 = widget(h, '3bf3c57')
    if w2:
        explore_links_html = '\n\t\t\t\t'.join(
            f'<a href="{href}" class="serk-footer-link">{title}</a>'
            for title, href in FOOTER_EXPLORE_LINKS
        )
        col2_wrap = f'''<div class="elementor-widget-wrap elementor-element-populated" style="padding: 10px 14px;">
\t\t\t<div class="elementor-element elementor-element-c12ecba elementor-widget elementor-widget-heading" data-id="c12ecba" data-element_type="widget" data-widget_type="heading.default" style="margin-bottom: 12px;">
\t\t\t\t<div class="elementor-widget-container"><h2 class="elementor-heading-title elementor-size-default" style="color: #FFFFFF !important; font-size: 1.08rem; font-weight: 700; margin: 0; letter-spacing: 0.04em; text-transform: uppercase;">Explore</h2></div>
\t\t\t</div>
\t\t\t<div class="serk-footer-links-horizontal">
\t\t\t\t{explore_links_html}
\t\t\t</div>
\t\t</div>'''
        h = h[:w2[1]] + '\n\t\t\t' + col2_wrap + '\n\t\t' + h[w2[2]:]

    # 2. Update Column 3 (Our Solutions - 7e0acc4) to horizontal layout with white header
    w3 = widget(h, '7e0acc4')
    if w3:
        sol_links_html = '\n\t\t\t\t'.join(
            f'<a href="{href}" class="serk-footer-link">{title}</a>'
            for title, href in FOOTER_SOLUTION_LINKS
        )
        col3_wrap = f'''<div class="elementor-widget-wrap elementor-element-populated" style="padding: 10px 14px;">
\t\t\t<div class="elementor-element elementor-element-8c3ad61 elementor-widget elementor-widget-heading" data-id="8c3ad61" data-element_type="widget" data-widget_type="heading.default" style="margin-bottom: 12px;">
\t\t\t\t<div class="elementor-widget-container"><h2 class="elementor-heading-title elementor-size-default" style="color: #FFFFFF !important; font-size: 1.08rem; font-weight: 700; margin: 0; letter-spacing: 0.04em; text-transform: uppercase;">Our Solutions</h2></div>
\t\t\t</div>
\t\t\t<div class="serk-footer-links-horizontal">
\t\t\t\t{sol_links_html}
\t\t\t</div>
\t\t</div>'''
        h = h[:w3[1]] + '\n\t\t\t' + col3_wrap + '\n\t\t' + h[w3[2]:]

    # 3. Update Column 1 (Follow Us - e1f0665) header to white
    w1_h = widget(h, 'e1f0665')
    if w1_h:
        follow_wrap = '<div class="elementor-widget-container"><h2 class="elementor-heading-title elementor-size-default" style="color: #FFFFFF !important; font-size: 1.08rem; font-weight: 700; margin: 0 0 12px 0; letter-spacing: 0.04em; text-transform: uppercase;">Follow Us</h2></div>'
        h = h[:w1_h[1]] + follow_wrap + h[w1_h[2]:]

    return h


def fix_contact_page(h):
    w = widget(h, 'b245f67')
    if not w:
        return h

    form_html = """<div class="elementor-widget-container">
\t<div class="elementor-shortcode serk-contact-form-wrap">
\t\t<p style="font-size: 1rem; color: #5B6761; margin: 0 0 24px 0; line-height: 1.65;">Tell us about your business, your operational challenge, or the software platform you want to bring to life. Whether you need one specialized tool or a connected enterprise environment, our engineering team in Mekelle will help you scope a practical next step.</p>
\t\t<form id="serk-lead-form" class="serk-form" onsubmit="return handleSerkLeadSubmit(event);" novalidate>
\t\t\t<!-- Row 1: Name and Org -->
\t\t\t<div class="serk-form-grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
\t\t\t\t<div class="serk-form-group">
\t\t\t\t\t<label for="serk-lead-name">Full Name <span style="color: #0D4634;">*</span></label>
\t\t\t\t\t<input type="text" id="serk-lead-name" name="name" required placeholder="e.g. Dr. Almaz, Yohannes Tesfay">
\t\t\t\t</div>
\t\t\t\t<div class="serk-form-group">
\t\t\t\t\t<label for="serk-lead-org">Company / Organization <span style="color: #0D4634;">*</span></label>
\t\t\t\t\t<input type="text" id="serk-lead-org" name="organization" required placeholder="e.g. Mekelle General Clinic, Apex Construction">
\t\t\t\t</div>
\t\t\t</div>

\t\t\t<!-- Row 2: Email and Phone -->
\t\t\t<div class="serk-form-grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
\t\t\t\t<div class="serk-form-group">
\t\t\t\t\t<label for="serk-lead-email">Work Email <span style="color: #0D4634;">*</span></label>
\t\t\t\t\t<input type="email" id="serk-lead-email" name="email" required placeholder="name@company.com">
\t\t\t\t</div>
\t\t\t\t<div class="serk-form-group">
\t\t\t\t\t<label for="serk-lead-phone">Phone / WhatsApp <span style="color: #0D4634;">*</span></label>
\t\t\t\t\t<input type="tel" id="serk-lead-phone" name="phone" required placeholder="+251 9... / WhatsApp">
\t\t\t\t</div>
\t\t\t</div>

\t\t\t<!-- Row 3: Area of Interest -->
\t\t\t<div class="serk-form-group" style="margin-bottom: 16px;">
\t\t\t\t<label for="serk-lead-service">Area of Interest / Platform <span style="color: #0D4634;">*</span></label>
\t\t\t\t<select id="serk-lead-service" name="service" required>
\t\t\t\t\t<option value="" disabled selected>-- Select an operational area or software solution --</option>
\t\t\t\t\t<optgroup label="Software Platforms &amp; Demos">
\t\t\t\t\t\t<option value="POS &amp; Retail Systems">SERK POS &amp; Retail Systems (Cafés, Restaurants, Stores)</option>
\t\t\t\t\t\t<option value="Construction Intelligence OS">Construction Intelligence OS &amp; AI Estimator</option>
\t\t\t\t\t\t<option value="Hospital &amp; Clinic OS">SERK Health OS / Dental &amp; Specialty Clinic OS</option>
\t\t\t\t\t\t<option value="Finance &amp; Ledgers">SERK Finance &amp; Accounting Automation</option>
\t\t\t\t\t\t<option value="Workplace OS">SERK Office OS (Workplace, Attendance &amp; HR)</option>
\t\t\t\t\t\t<option value="Materials Operations">SERK Materials (Suppliers &amp; Distribution)</option>
\t\t\t\t\t</optgroup>
\t\t\t\t\t<optgroup label="Custom Engineering &amp; AI">
\t\t\t\t\t\t<option value="Enterprise ERP / Custom Software">Custom Enterprise ERP &amp; Software Development</option>
\t\t\t\t\t\t<option value="Corporate Website">Corporate Website &amp; Digital Presence</option>
\t\t\t\t\t\t<option value="AI &amp; Cybersecurity">Applied AI, Automation &amp; Cybersecurity Review</option>
\t\t\t\t\t</optgroup>
\t\t\t\t\t<optgroup label="Ventures &amp; Strategic Partnerships">
\t\t\t\t\t\t<option value="Segar Mobility &amp; Logistics">Segar Ride &amp; Delivery Partnerships</option>
\t\t\t\t\t\t<option value="Visit Tigray Initiative">Visit Tigray Tourism &amp; Cultural Heritage</option>
\t\t\t\t\t\t<option value="Partnership / Advisory">Technology Partnership / Strategic Alliance</option>
\t\t\t\t\t\t<option value="Careers">Careers &amp; Engineering Internships</option>
\t\t\t\t\t\t<option value="Other">Other Inquiries</option>
\t\t\t\t\t</optgroup>
\t\t\t\t</select>
\t\t\t</div>

\t\t\t<!-- Row 4: Message -->
\t\t\t<div class="serk-form-group" style="margin-bottom: 16px;">
\t\t\t\t<label for="serk-lead-message">Project Overview / Requirements <span style="color: #0D4634;">*</span></label>
\t\t\t\t<textarea id="serk-lead-message" name="message" rows="4" required placeholder="Describe your current setup, project scope, team size, or what you'd like to achieve..."></textarea>
\t\t\t</div>

\t\t\t<!-- Row 5: Preferred Channel and Timeline -->
\t\t\t<div class="serk-form-grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
\t\t\t\t<div class="serk-form-group">
\t\t\t\t\t<label for="serk-lead-channel">Preferred Follow-up</label>
\t\t\t\t\t<select id="serk-lead-channel" name="preferred_channel">
\t\t\t\t\t\t<option value="Email" selected>Email Response</option>
\t\t\t\t\t\t<option value="WhatsApp">WhatsApp Message</option>
\t\t\t\t\t\t<option value="Phone Call">Direct Phone Call</option>
\t\t\t\t\t</select>
\t\t\t\t</div>
\t\t\t\t<div class="serk-form-group">
\t\t\t\t\t<label for="serk-lead-timeline">Implementation Timeline</label>
\t\t\t\t\t<select id="serk-lead-timeline" name="timeline">
\t\t\t\t\t\t<option value="Immediate (1-2 weeks)" selected>Immediate (1–2 weeks)</option>
\t\t\t\t\t\t<option value="Next 1-3 months">Next 1–3 months</option>
\t\t\t\t\t\t<option value="Planning &amp; Feasibility">Planning &amp; Feasibility</option>
\t\t\t\t\t</select>
\t\t\t\t</div>
\t\t\t</div>

\t\t\t<!-- Honeypot -->
\t\t\t<div style="position: absolute; left: -9999px; display: none;" aria-hidden="true">
\t\t\t\t<input type="text" name="website_url" id="serk-hp" tabindex="-1" autocomplete="off">
\t\t\t</div>

\t\t\t<!-- Row 6: Consent -->
\t\t\t<div style="margin-bottom: 22px;">
\t\t\t\t<label style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.85rem; color: #5B6761; cursor: pointer; line-height: 1.5;">
\t\t\t\t\t<input type="checkbox" id="serk-lead-consent" name="consent" required checked style="margin-top: 3px; accent-color: #0D4634;">
\t\t\t\t\t<span>I agree to the processing of this inquiry in accordance with the <a href="/privacy/" target="_blank" style="color: #0D4634; text-decoration: underline;">SERK Privacy Policy</a> (Zero data rental; information used strictly for this consultation).</span>
\t\t\t\t</label>
\t\t\t</div>

\t\t\t<!-- Error container -->
\t\t\t<div id="serk-form-error" style="display: none; background: #FDE8E8; border: 1px solid #F8B4B4; color: #9B1C1C; padding: 12px 16px; border-radius: 6px; margin-bottom: 18px; font-size: 0.9rem;"></div>

\t\t\t<!-- Submit Button & Direct Fallback -->
\t\t\t<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px;">
\t\t\t\t<button type="submit" id="serk-submit-btn" class="elementor-button" style="padding: 14px 28px; font-size: 1rem; font-weight: 600; cursor: pointer;">
\t\t\t\t\tSend Project Inquiry
\t\t\t\t</button>
\t\t\t\t<span style="font-size: 0.85rem; color: #5B6761;">
\t\t\t\t\tOr message directly: <a href="https://wa.me/251999911192?text=Hello%20SERK%20Technologies%20Group%2C%20I%20would%20like%20to%20discuss%20a%20project" target="_blank" style="color: #0D4634; font-weight: 600; text-decoration: underline;">WhatsApp</a> &middot; <a href="mailto:serktechgroup@gmail.com" style="color: #0D4634; font-weight: 600; text-decoration: underline;">Email</a>
\t\t\t\t</span>
\t\t\t</div>
\t\t</form>

\t\t<!-- Success Card Container (hidden by default) -->
\t\t<div id="serk-success-box" style="display: none; background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 36px; text-align: center; box-shadow: 0 4px 16px rgba(16, 21, 19, 0.05);">
\t\t\t<div style="width: 56px; height: 56px; border-radius: 50%; background: #0D4634; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
\t\t\t\t<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
\t\t\t</div>
\t\t\t<h3 style="font-size: 1.6rem; font-weight: 700; color: #101513; margin: 0 0 8px 0;">Inquiry Confirmed</h3>
\t\t\t<p style="font-size: 0.95rem; color: #0D4634; font-weight: 600; margin: 0 0 16px 0;">Reference: <span id="serk-ref-display"></span></p>
\t\t\t<p id="serk-success-msg" style="color: #5B6761; font-size: 1rem; line-height: 1.65; max-width: 540px; margin: 0 auto 24px auto;"></p>
\t\t\t
\t\t\t<div style="background: #F4F7F5; border: 1px solid #DEE6E0; border-radius: 6px; padding: 18px; max-width: 540px; margin: 0 auto 24px auto; text-align: left;">
\t\t\t\t<p style="margin: 0 0 8px 0; font-size: 0.9rem; font-weight: 600; color: #101513;">Need an urgent response or immediate walkthrough?</p>
\t\t\t\t<p style="margin: 0; font-size: 0.85rem; color: #5B6761; line-height: 1.5;">
\t\t\t\t\tDirect Line: <a href="tel:+251999911192" style="color: #0D4634; font-weight: 600;">+251 999 911 192</a><br>
\t\t\t\t\tDirect Desk: <a href="mailto:serktechgroup@gmail.com" style="color: #0D4634; font-weight: 600;">serktechgroup@gmail.com</a><br>
\t\t\t\t\tLocation: Mekelle, Tigray, Ethiopia (Mon–Sat, 8:30–18:00 EAT)
\t\t\t\t</p>
\t\t\t</div>

\t\t\t<div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
\t\t\t\t<a id="serk-wa-direct-btn" href="#" target="_blank" class="elementor-button" style="padding: 10px 20px; font-size: 0.9rem; text-decoration: none; display: inline-block;">
\t\t\t\t\tContinue on WhatsApp
\t\t\t\t</a>
\t\t\t\t<button type="button" onclick="location.reload();" class="elementor-button btn-secondary" style="padding: 10px 20px; font-size: 0.9rem; cursor: pointer;">
\t\t\t\t\tSubmit Another Inquiry
\t\t\t\t</button>
\t\t\t</div>
\t\t</div>

\t\t<!-- Trust Indicators Below Form -->
\t\t<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 32px; padding-top: 24px; border-top: 1px solid #DEE6E0;">
\t\t\t<div style="display: flex; align-items: flex-start; gap: 10px;">
\t\t\t\t<div style="color: #0D4634; font-size: 1.1rem; line-height: 1;">&#10003;</div>
\t\t\t\t<div>
\t\t\t\t\t<h4 style="margin: 0; font-size: 0.9rem; font-weight: 600; color: #101513;">1 Business Day Response</h4>
\t\t\t\t\t<p style="margin: 2px 0 0 0; font-size: 0.8rem; color: #5B6761;">Direct review by our solutions team in Mekelle.</p>
\t\t\t\t</div>
\t\t\t</div>
\t\t\t<div style="display: flex; align-items: flex-start; gap: 10px;">
\t\t\t\t<div style="color: #0D4634; font-size: 1.1rem; line-height: 1;">&#10003;</div>
\t\t\t\t<div>
\t\t\t\t\t<h4 style="margin: 0; font-size: 0.9rem; font-weight: 600; color: #101513;">Strict Confidentiality</h4>
\t\t\t\t\t<p style="margin: 2px 0 0 0; font-size: 0.8rem; color: #5B6761;">Zero data rental. Strict enterprise privacy.</p>
\t\t\t\t</div>
\t\t\t</div>
\t\t\t<div style="display: flex; align-items: flex-start; gap: 10px;">
\t\t\t\t<div style="color: #0D4634; font-size: 1.1rem; line-height: 1;">&#10003;</div>
\t\t\t\t<div>
\t\t\t\t\t<h4 style="margin: 0; font-size: 0.9rem; font-weight: 600; color: #101513;">Practical Guidance</h4>
\t\t\t\t\t<p style="margin: 2px 0 0 0; font-size: 0.8rem; color: #5B6761;">Technical scoping &amp; genuine operational fit.</p>
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>
\t</div>

\t<script>
\tdocument.addEventListener('DOMContentLoaded', function() {
\t\tvar params = new URLSearchParams(window.location.search);
\t\tvar interest = params.get('interest');
\t\tif (interest) {
\t\t\tvar sel = document.getElementById('serk-lead-service');
\t\t\tif (sel) {
\t\t\t\tinterest = interest.toLowerCase();
\t\t\t\tfor (var i = 0; i < sel.options.length; i++) {
\t\t\t\t\tvar optVal = sel.options[i].value.toLowerCase();
\t\t\t\t\tif ((interest === 'pos' && optVal.indexOf('pos') !== -1) ||
\t\t\t\t\t\t(interest === 'construction' && optVal.indexOf('construction') !== -1) ||
\t\t\t\t\t\t(interest === 'health' && (optVal.indexOf('health') !== -1 || optVal.indexOf('clinic') !== -1)) ||
\t\t\t\t\t\t(interest === 'finance' && optVal.indexOf('finance') !== -1) ||
\t\t\t\t\t\t(interest === 'office' && optVal.indexOf('office') !== -1) ||
\t\t\t\t\t\t(interest === 'materials' && optVal.indexOf('material') !== -1) ||
\t\t\t\t\t\t(interest === 'ai' && optVal.indexOf('ai') !== -1) ||
\t\t\t\t\t\t(interest === 'mobility' && optVal.indexOf('segar') !== -1) ||
\t\t\t\t\t\t(interest === 'tourism' && optVal.indexOf('visit') !== -1) ||
\t\t\t\t\t\t(interest === 'careers' && optVal.indexOf('career') !== -1) ||
\t\t\t\t\t\t(interest === 'realestate' && optVal.indexOf('erp') !== -1)) {
\t\t\t\t\t\tsel.selectedIndex = i;
\t\t\t\t\t\tbreak;
\t\t\t\t\t}
\t\t\t\t}
\t\t\t}
\t\t}
\t});

\tfunction handleSerkLeadSubmit(e) {
\t\te.preventDefault();
\t\tvar errBox = document.getElementById('serk-form-error');
\t\terrBox.style.display = 'none';
\t\terrBox.innerHTML = '';

\t\tvar hp = document.getElementById('serk-hp').value;
\t\tif (hp) {
\t\t\tconsole.warn('Spam submission detected.');
\t\t\treturn false;
\t\t}

\t\tvar name = document.getElementById('serk-lead-name').value.trim();
\t\tvar org = document.getElementById('serk-lead-org').value.trim();
\t\tvar email = document.getElementById('serk-lead-email').value.trim();
\t\tvar phone = document.getElementById('serk-lead-phone').value.trim();
\t\tvar service = document.getElementById('serk-lead-service').value;
\t\tvar message = document.getElementById('serk-lead-message').value.trim();
\t\tvar channel = document.getElementById('serk-lead-channel').value;
\t\tvar timeline = document.getElementById('serk-lead-timeline').value;
\t\tvar consent = document.getElementById('serk-lead-consent').checked;

\t\tif (!name || !org || !email || !phone || !service || !message) {
\t\t\terrBox.innerHTML = 'Please fill out all required fields before submitting.';
\t\t\terrBox.style.display = 'block';
\t\t\treturn false;
\t\t}

\t\tif (!consent) {
\t\t\terrBox.innerHTML = 'Please confirm consent to process this consultation inquiry.';
\t\t\terrBox.style.display = 'block';
\t\t\treturn false;
\t\t}

\t\tvar btn = document.getElementById('serk-submit-btn');
\t\tbtn.disabled = true;
\t\tbtn.innerText = 'Transmitting Inquiry...';

\t\tvar refId = 'SERK-INQ-' + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + Math.floor(1000 + Math.random() * 9000);

\t\tvar leadRecord = {
\t\t\treference: refId,
\t\t\ttimestamp: new Date().toISOString(),
\t\t\tname: name,
\t\t\torganization: org,
\t\t\temail: email,
\t\t\tphone: phone,
\t\t\tservice: service,
\t\t\tmessage: message,
\t\t\tpreferred_channel: channel,
\t\t\ttimeline: timeline
\t\t};

\t\ttry {
\t\t\tvar stored = JSON.parse(localStorage.getItem('serk_leads') || '[]');
\t\t\tstored.push(leadRecord);
\t\t\tlocalStorage.setItem('serk_leads', JSON.stringify(stored));
\t\t} catch(err) {
\t\t\tconsole.error('Storage error:', err);
\t\t}

\t\tsetTimeout(function() {
\t\t\tdocument.getElementById('serk-lead-form').style.display = 'none';
\t\t\tdocument.getElementById('serk-ref-display').innerText = refId;
\t\t\tdocument.getElementById('serk-success-msg').innerHTML = 'Thank you, <strong>' + escapeHtml(name) + '</strong> (' + escapeHtml(org) + '). Your request regarding <strong>' + escapeHtml(service) + '</strong> has been received by our engineering and solutions desk in Mekelle. We will reach out via <strong>' + escapeHtml(channel) + '</strong> within 1 business day.';
\t\t\t
\t\t\tvar waText = encodeURIComponent('Hello SERK Technologies Group, I just submitted an inquiry (' + refId + ') for ' + service + ' on behalf of ' + org + '. Looking forward to connecting.');
\t\t\tdocument.getElementById('serk-wa-direct-btn').href = 'https://wa.me/251999911192?text=' + waText;

\t\t\tdocument.getElementById('serk-success-box').style.display = 'block';
\t\t}, 400);

\t\treturn false;
\t}

\tfunction escapeHtml(text) {
\t\tvar div = document.createElement('div');
\t\tdiv.appendChild(document.createTextNode(text));
\t\treturn div.innerHTML;
\t}
\t</script>
</div>"""
    h = h[:w[1]] + form_html + h[w[2]:]

    w_map = widget(h, 'ec8e6d4')
    if w_map:
        channel_card = """
\t\t<div class="elementor-element elementor-widget" data-element_type="widget" data-widget_type="html.default">
\t\t\t<div class="elementor-widget-container" style="margin-top: 24px; background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 24px;">
\t\t\t\t<h3 style="font-size: 1.15rem; font-weight: 700; color: #101513; margin: 0 0 14px 0;">Direct Engagement Channels</h3>
\t\t\t\t<div style="margin-bottom: 12px;">
\t\t\t\t\t<span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #0D4634; display: block; margin-bottom: 2px;">Headquarters &amp; Engineering</span>
\t\t\t\t\t<span style="color: #5B6761; font-size: 0.95rem;">Mekelle, Tigray, Ethiopia</span>
\t\t\t\t</div>
\t\t\t\t<div style="margin-bottom: 12px;">
\t\t\t\t\t<span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #0D4634; display: block; margin-bottom: 2px;">Direct Phone &amp; WhatsApp</span>
\t\t\t\t\t<a href="tel:+251999911192" style="color: #101513; font-weight: 600; font-size: 0.95rem; text-decoration: none;">+251 999 911 192</a>
\t\t\t\t\t<span style="display: block; font-size: 0.8rem; color: #5B6761; margin-top: 2px;">Available Mon &ndash; Sat, 8:30 &ndash; 18:00 (EAT)</span>
\t\t\t\t</div>
\t\t\t\t<div style="margin-bottom: 16px;">
\t\t\t\t\t<span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #0D4634; display: block; margin-bottom: 2px;">Official Group Email</span>
\t\t\t\t\t<a href="mailto:serktechgroup@gmail.com" style="color: #0D4634; font-weight: 600; font-size: 0.95rem; text-decoration: underline;">serktechgroup@gmail.com</a>
\t\t\t\t</div>
\t\t\t\t<a href="https://wa.me/251999911192?text=Hello%20SERK%20Technologies%20Group%2C%20I%20would%20like%20to%20discuss%20a%20project" target="_blank" class="elementor-button" style="display: block; text-align: center; padding: 10px 18px; text-decoration: none; font-size: 0.9rem;">
\t\t\t\t\tChat Directly on WhatsApp
\t\t\t\t</a>
\t\t\t</div>
\t\t</div>"""
        h = h[:w_map[3]] + channel_card + h[w_map[3]:]
    return h

def fix_team(h):
    hit = 0
    for wid, img, name, role, desc in TEAM:
        if not widget(h, wid):
            continue
        hit += 1
        h, _ = in_widget(h, wid, lambda s: re.sub(r'<img\b[^>]*>', '<img decoding="async" src="%s%s" alt="%s">' % (IMG, img, name), s, count=1))
        h, _ = set_class(h, wid, 'wpr-member-name', [name])
        h, _ = set_class(h, wid, 'wpr-member-job', [role])
        if desc:
            h, _ = set_class(h, wid, 'wpr-member-description', [desc])
        # the cards linked to personal profiles; those links do not apply any more
        h, _ = in_widget(h, wid, lambda s: re.sub(r'<div class="wpr-member-social-media">.*?</div>\s*(?=</div>)', '', s, count=1, flags=re.S))
    return h, hit


def apply_rules(h, hits):
    for i, r in enumerate(RULES):
        kind, wid = r[0], r[1]
        if kind == 'H1':
            w = widget(h, wid)
            if not w:
                continue
            def repl_h1(m):
                return '<h1%s>%s</h1>' % (m.group(1), r[2])
            new_sub, n = re.subn(r'<h\d\b([^>]*class="[^"]*elementor-heading-title[^"]*"[^>]*)>.*?</h\d>', repl_h1, h[w[0]:w[3]], count=1, flags=re.S)
            if n > 0:
                h = h[:w[0]] + new_sub + h[w[3]:]
                hits[i] += 1
        elif kind == 'H':
            w = widget(h, wid)
            if not w:
                continue
            p = nth_class(h, w[0], w[3], 'elementor-heading-title', 0)
            a, b, _ = element_span(h, p)
            inner = h[a:b]
            if '<a ' in inner:  # keep the link, change only its text
                inner = re.sub(r'(<a\b[^>]*>).*?(</a>)', lambda x: x.group(1) + r[2] + x.group(2), inner, count=1, flags=re.S)
            else:
                inner = r[2]
            h = h[:a] + inner + h[b:]
            hits[i] += 1
        elif kind == 'W':
            h, n = set_class(h, wid, 'elementor-widget-container', [r[2]])
            hits[i] += n
        elif kind == 'C':
            h, n = set_class(h, wid, r[2], r[3])
            hits[i] += n
        elif kind == 'F':
            w = widget(h, wid)
            if not w:
                continue
            old = h[w[0]:w[3]]
            new = r[2](old)
            if new != old:
                hits[i] += 1
            h = h[:w[0]] + new + h[w[3]:]
    return h


def main():
    # ensure generated primary pages in original/ are up-to-date
    subprocess.check_call([sys.executable, '-I', os.path.join(ROOT, 'tools', 'create_pages.py')], stdout=subprocess.DEVNULL)

    # empty the folder instead of deleting it, so a running local server keeps working
    os.makedirs(SITE, exist_ok=True)
    for name in os.listdir(SITE):
        p = os.path.join(SITE, name)
        shutil.rmtree(p) if os.path.isdir(p) else os.remove(p)
    shutil.copytree(ORIG, SITE, dirs_exist_ok=True)
    out_img = os.path.join(SITE, IMG.strip('/'))
    subprocess.check_call([sys.executable, '-I', os.path.join(ROOT, 'tools', 'gen_images.py'), ORIG, out_img], stdout=subprocess.DEVNULL)
    subprocess.check_call([sys.executable, '-I', os.path.join(ROOT, 'tools', 'gen_brand.py'), BRAND, out_img], stdout=subprocess.DEVNULL)

    # article folders get their new addresses
    for p in POSTS:
        os.rename(os.path.join(SITE, p['old']), os.path.join(SITE, p['slug']))

    pages = []
    for root, _, files in os.walk(SITE):
        if os.sep + 'wp-' in root:
            continue
        pages += [os.path.join(root, f) for f in files if f.endswith('.html')]
    hits = [0] * len(RULES)
    team_hits = 0
    for path in sorted(pages):
        rel = os.path.relpath(path, SITE).replace('\\', '/')
        h = open(path, encoding='utf-8').read()

        # Remove unmeasured template counter badges section (data-id="2nda6q4") on About page
        if rel == 'about_us/index.html':
            cw = widget(h, '2nda6q4')
            if cw:
                h = h[:cw[0]] + h[cw[3]:]
            # Ensure Our Vision & Our Mission headings are crisp white on dark background
            h = re.sub(r'(data-id="ec224c7"[\s\S]*?<h2 class="elementor-heading-title[^"]*)"([^>]*>)\s*Our Vision\s*</h2>',
                       r'\1" style="color: #FFFFFF !important; font-family: \'Playfair Display\', Georgia, serif;"\2Our Vision</h2>', h)
            h = re.sub(r'(data-id="c49bbe5"[\s\S]*?<h2 class="elementor-heading-title[^"]*)"([^>]*>)\s*Our Mission\s*</h2>',
                       r'\1" style="color: #FFFFFF !important; font-family: \'Playfair Display\', Georgia, serif;"\2Our Mission</h2>', h)
            # Ensure body text is clean readable mist
            h = re.sub(r'(data-id="2055672"[\s\S]*?<p)>', r'\1 style="color: #DEE6E0 !important; font-size: 1.05rem; line-height: 1.7;">', h)
            h = re.sub(r'(data-id="3e5f206"[\s\S]*?<p)>', r'\1 style="color: #DEE6E0 !important; font-size: 1.05rem; line-height: 1.7;">', h)
        if rel == 'contact_us/index.html':
            h = fix_contact_page(h)

        if rel == 'index.html':
            lw = widget(h, 'llen1mo')
            if lw:
                clients_sec = '''
<section class="elementor-section elementor-top-section elementor-element elementor-section-boxed" style="padding: 70px 20px; background: #FFFFFF; border-top: 1px solid #DEE6E0;">
    <div class="elementor-container" style="max-width: 1200px; margin: 0 auto; text-align: center;">
        <div style="margin-bottom: 24px;">
            <h3 class="wpr-advanced-text" style="font-size: 2.2rem; font-weight: 700; color: #101513; margin: 0 0 10px 0; font-family: 'SerkPop', Poppins, sans-serif;">
                <span class="wpr-advanced-text-preffix">Some of Our </span>
                <span class="wpr-highlighted-text" style="position: relative; display: inline-block;">
                    <span class="wpr-highlighted-text-inner" style="color: #9A5B20;">Clients</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" class="wpr-highlight-underline-zigzag" preserveAspectRatio="none" style="position: absolute; left: 0; bottom: -8px; width: 100%; height: 10px; fill: none; stroke: #9A5B20; stroke-width: 8;">
                        <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.3-197.1,9"></path>
                    </svg>
                </span>
            </h3>
            <p style="font-size: 1rem; color: #5B6761; margin: 0; text-transform: lowercase; font-family: 'SerkPop', Poppins, sans-serif;">we are honored to work with</p>
        </div>
        
        <!-- Logo Slider / Carousel Wrapper with Left & Right Chevrons -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; margin: 30px 0 16px 0;">
            <div style="cursor: pointer; padding: 12px; color: #101513; font-size: 1.6rem; font-weight: 700; user-select: none;" title="Previous Partners">&#10094;</div>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 32px; flex-grow: 1;">
                <div style="flex: 1 1 140px; max-width: 190px; display: flex; justify-content: center; align-items: center; padding: 6px;"><img src="/wp-content/uploads/serk/client-zoscales.png" alt="Zoscales Partners" style="max-height: 44px; max-width: 100%; object-fit: contain;"></div>
                <div style="flex: 1 1 140px; max-width: 190px; display: flex; justify-content: center; align-items: center; padding: 6px;"><img src="/wp-content/uploads/serk/client-innobiz.png" alt="innobiz-K Ethiopia" style="max-height: 44px; max-width: 100%; object-fit: contain;"></div>
                <div style="flex: 1 1 140px; max-width: 190px; display: flex; justify-content: center; align-items: center; padding: 6px;"><img src="/wp-content/uploads/serk/client-hibret-bank.png" alt="Hibret Bank" style="max-height: 52px; max-width: 100%; object-fit: contain;"></div>
                <div style="flex: 1 1 140px; max-width: 190px; display: flex; justify-content: center; align-items: center; padding: 6px;"><img src="/wp-content/uploads/serk/client-sequa.png" alt="sequa" style="max-height: 44px; max-width: 100%; object-fit: contain;"></div>
                <div style="flex: 1 1 140px; max-width: 190px; display: flex; justify-content: center; align-items: center; padding: 6px;"><img src="/wp-content/uploads/serk/client-tebita.png" alt="Tebita Ambulance" style="max-height: 48px; max-width: 100%; object-fit: contain;"></div>
            </div>
            <div style="cursor: pointer; padding: 12px; color: #101513; font-size: 1.6rem; font-weight: 700; user-select: none;" title="Next Partners">&#10095;</div>
        </div>
        <div style="margin-top: 14px;">
            <span style="font-size: 0.8rem; color: #8C9891; letter-spacing: 0.05em;">[ Active Client &amp; Partner Engagements · <a href="/partners/" style="color: #0D4634; font-weight: 600; text-decoration: underline;">Explore Partner Network &rarr;</a> ]</span>
        </div>
    </div>
</section>
'''
                h = h[:lw[3]] + clients_sec + h[lw[3]:]

        # WEB-014: Remove broken/unmoderated WordPress comment section on insight articles

        comment_w = widget(h, 'f6f094f')
        if comment_w:
            h = h[:comment_w[0]] + h[comment_w[3]:]

        h = apply_rules(h, hits)
        h = fix_header_nav(h, rel)
        h = fix_footer_nav(h)
        h, th = fix_team(h)
        team_hits += th
        h, _ = in_widget(h, 'fc0b37c', fix_carousel)
        h = fix_grid_items(h)
        for p in POSTS:
            if rel == p['slug'] + '/index.html':
                i = h.find('data-elementor-type="wp-post" data-elementor-id="%d"' % p['id'])
                a, b, _ = element_span(h, h.rfind('<', 0, i))
                h = h[:a] + article_html(p) + h[b:]
                h = re.sub(r'(<h1 class="wpr-post-title">).*?(</h1>)', lambda x: x.group(1) + p['title'] + x.group(2), h, count=1, flags=re.S)
                h = re.sub(r'(<li class="wpr-post-info-date"><span>)[^<]*', lambda x: x.group(1) + TODAY, h, count=1)
                h = re.sub(r'<title>.*?</title>', '<title>%s | SERK Technologies Group</title>' % p['title'], h, count=1, flags=re.S)
            h = h.replace(p['old'], p['slug'])
        if rel in TITLES:
            h = re.sub(r'<title>.*?</title>', '<title>%s</title>' % TITLES[rel], h, count=1, flags=re.S)

        # Ensure SEO meta description and OpenGraph tags are present
        page_title = TITLES.get(rel, 'SERK Technologies Group')
        page_desc = DESCRIPTIONS.get(rel, 'SERK Technologies Group — Innovation with Integrity. Software, intelligent systems and digital platforms.')
        for p in POSTS:
            if rel == p['slug'] + '/index.html':
                page_title = '%s | SERK Technologies Group' % p['title']
                page_desc = p['excerpt']
                break
        meta_block = (
            '\n\t<meta name="description" content="%s">'
            '\n\t<meta property="og:site_name" content="SERK Technologies Group">'
            '\n\t<meta property="og:type" content="%s">'
            '\n\t<meta property="og:title" content="%s">'
            '\n\t<meta property="og:description" content="%s">'
            '\n\t<meta property="og:url" content="/%s">'
            % (page_desc.replace('"', '&quot;'),
               'article' if any(p['slug'] in rel for p in POSTS) else 'website',
               page_title.replace('"', '&quot;'),
               page_desc.replace('"', '&quot;'),
               '' if rel == 'index.html' else rel.replace('/index.html', '/'))
        )
        if '<meta name="description"' not in h:
            h = re.sub(r'(<meta charset="UTF-8">)', r'\1' + meta_block, h, count=1)

        # Inject SERK Master Design System Stylesheet with cache-busting version
        if 'serk-theme-css' not in h:
            h = h.replace('</head>', '\t<link rel="stylesheet" id="serk-theme-css" href="/wp-content/themes/royal-elementor-kit/serk-theme.css?v=20261122-serk03">\n</head>')
        else:
            h = re.sub(r'href="[^"]*serk-theme\.css[^"]*"', 'href="/wp-content/themes/royal-elementor-kit/serk-theme.css?v=20261122-serk03"', h)

        h = fix_images(h)

        # Anti-blowout logo attributes: ensure wide logo has explicit dimensions
        h = re.sub(r'(<img[^>]*src="[^"]*serk-logo-wide\.png"[^>]*)>',
                   r'\1 width="160" height="31" style="max-width: 160px; height: auto; display: block;" alt="SERK Technologies Group">', h)
        # the footer LinkedIn icon and feed links pointed at the previous owner
        h = re.sub(r'<link rel="alternate"[^>]*(?:rss|oembed)[^>]*>\s*', '', h)
        h = h.replace(' &raquo; Feed', 'SERK Technologies Group Feed')

        # Global phone, email, and location cleanup across all pages
        h = re.sub(r'href="tel:[^"]*"', 'href="tel:+251999911192"', h)
        h = h.replace('tel:123456789', 'tel:+251999911192')
        h = h.replace('+251 000 000 000', '+251 999 911 192')
        h = h.replace('+251-912-012-146', '+251 999 911 192')
        h = h.replace('+251-913-862-466', '+251 999 911 192')
        h = h.replace('hello@your-domain.com', 'serktechgroup@gmail.com')
        h = h.replace('info@zuriadvisors.com', 'serktechgroup@gmail.com')
        h = h.replace('Your office address, Addis Ababa, Ethiopia', 'Mekelle, Tigray, Ethiopia')
        h = h.replace('Kas Tower, 11th floor, Wengelawit, Addis Ababa, Ethiopia', 'Mekelle, Tigray, Ethiopia')
        h = h.replace('KAS tower, Addis Ababa, Ethiopia', 'Mekelle, Tigray, Ethiopia')
        for old, new in (('Zuri Capital Advisors', 'SERK Technologies Group'),
                         ('Zuri Capital', 'SERK Group'),
                         ('Zuri', 'SERK'),
                         ('info@zuriadvisors.com', 'serktechgroup@gmail.com')):
            h = h.replace(old, new)
        open(path, 'w', encoding='utf-8').write(h)

    for root, _, files in os.walk(os.path.join(SITE, 'wp-content/uploads/elementor/css')):
        for f in files:
            p = os.path.join(root, f)
            c = open(p, encoding='utf-8').read()
            c2 = fix_images(c)
            if c2 != c:
                open(p, 'w', encoding='utf-8').write(c2)

    # drop the previous owner's photos, logos and documents from the working copy
    up = os.path.join(SITE, 'wp-content/uploads')
    for d in os.listdir(up):
        if re.fullmatch(r'20\d\d', d):
            shutil.rmtree(os.path.join(up, d))

    for i, n in enumerate(hits):
        if n == 0:
            problems.append('rule never matched: %s %s' % (RULES[i][0], RULES[i][1]))
    if team_hits != len(TEAM):
        problems.append('team cards updated: %d of %d' % (team_hits, len(TEAM)))

    # anything still pointing at a removed upload, or still naming the old brand?
    left, words = set(), {}
    for path in pages:
        h = open(path, encoding='utf-8').read()
        left |= set(re.findall(r'/wp-content/uploads/20\d\d/[^"\'\s)\\,]+', h))
        body = re.sub(r'<(script|style)\b.*?</\1>', ' ', h, flags=re.S)
        body = re.sub(r'<[^>]+>', ' ', body)
        for wd in re.findall(r'(?i)\b(zuri\w*|capital markets?|ECMA|IPO\w*|advisory|investing)\b', body):
            words.setdefault(wd.lower(), set()).add(os.path.relpath(path, SITE))
    for u in sorted(left):
        problems.append('still references ' + u)
    for wd, fs in sorted(words.items()):
        problems.append('old wording "%s" in %s' % (wd, ', '.join(sorted(fs))[:120]))
    print('pages rewritten: %d' % len(pages))
    print('problems: %d' % len(problems))
    for p in problems:
        print('  -', p)


main()
