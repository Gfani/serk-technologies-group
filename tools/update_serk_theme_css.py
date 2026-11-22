with open('public/wp-content/themes/royal-elementor-kit/serk-theme.css', 'r', encoding='utf-8') as f:
    css = f.read()

append_block = """

/* ==========================================================================
   SERK ORANGE BRAND SYSTEM & ANIMATED PAGE HEADERS
   ========================================================================== */

/* Universal Animated Page Header Banner */
.serk-page-header-banner {
  width: 100%;
  background: #FFFFFF;
  padding: 44px 20px 22px 20px;
  text-align: center;
  border-bottom: 1px solid #DEE6E0;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

.serk-page-header-banner .wpr-advanced-text,
.serk-page-header-container .wpr-advanced-text {
  margin: 0 !important;
  padding: 0 !important;
  text-align: center !important;
}

/* Master Animated Text in Brand Orange (#E3AB72) */
.wpr-anim-text,
.wpr-anim-text b,
.wpr-anim-text-inner b,
.serk-page-header-banner .wpr-anim-text b,
.serk-page-header-banner h2,
.serk-page-header-banner h3 {
  color: #E3AB72 !important;
  font-family: var(--serk-font-serif, 'Playfair Display', Georgia, serif) !important;
  font-size: 52px !important;
  font-weight: 700 !important;
  letter-spacing: -0.5px !important;
  line-height: 1.2 !important;
  display: inline-block !important;
}

/* Blinking Cursor in Brand Orange */
.wpr-anim-text-cursor {
  color: #E3AB72 !important;
  font-family: var(--serk-font-serif, 'Playfair Display', Georgia, serif) !important;
  font-size: 52px !important;
  font-weight: 300 !important;
  margin-left: 2px !important;
  display: inline-block !important;
  animation: serkCursorPulse 0.8s infinite !important;
  vertical-align: baseline !important;
}

@keyframes serkCursorPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@media (max-width: 768px) {
  .wpr-anim-text,
  .wpr-anim-text b,
  .wpr-anim-text-inner b,
  .serk-page-header-banner .wpr-anim-text b,
  .serk-page-header-banner h2,
  .serk-page-header-banner h3,
  .wpr-anim-text-cursor {
    font-size: 32px !important;
  }
  .serk-page-header-banner {
    padding: 28px 16px 14px 16px;
  }
}

/* ==========================================================================
   APPLY THE ORANGE BRAND SYSTEM ACROSS ALL PAGES
   ========================================================================== */

/* 1. Brand Highlighted Text & SVG Underlines */
.wpr-highlighted-text,
.wpr-highlighted-text-inner {
  color: #E3AB72 !important;
  font-weight: 600 !important;
}

.wpr-highlighted-text svg path {
  stroke: #E3AB72 !important;
  stroke-width: 9 !important;
}

/* 2. Navigation Brand Orange Accents */
.serk-menu > li.active > a,
.serk-menu > li > a:hover {
  color: #E3AB72 !important;
}

.serk-top-bar a:hover {
  color: #E3AB72 !important;
}

.serk-sub-menu a:hover {
  color: #E3AB72 !important;
  background-color: rgba(227, 171, 114, 0.08) !important;
}

/* 3. Category Filter Tabs / Pills on Products Page */
.serk-cat-pill.active,
.serk-cat-pill:hover {
  background-color: rgba(227, 171, 114, 0.12) !important;
  color: #101513 !important;
  border-color: #E3AB72 !important;
}

/* 4. Feature Icons & Checkmark Badges */
.elementor-icon-list-icon svg,
.elementor-icon-list-icon i {
  color: #E3AB72 !important;
  fill: #E3AB72 !important;
}

/* 5. Maturity Governance Badges in Warm Brand Amber */
.serk-maturity-badge {
  background: rgba(227, 171, 114, 0.12) !important;
  color: #B26A25 !important;
  border: 1px solid rgba(227, 171, 114, 0.35) !important;
  font-weight: 600 !important;
}

/* 6. Form Focus Rings */
input:focus, textarea:focus, select:focus {
  border-color: #E3AB72 !important;
  outline-color: #E3AB72 !important;
  box-shadow: 0 0 0 3px rgba(227, 171, 114, 0.2) !important;
}

/* 7. Button Accents */
.serk-cta-btn:hover {
  box-shadow: 0 0 0 2px #E3AB72, 0 4px 14px rgba(227, 171, 114, 0.28) !important;
}
"""

if 'SERK ORANGE BRAND SYSTEM' not in css:
    with open('public/wp-content/themes/royal-elementor-kit/serk-theme.css', 'w', encoding='utf-8') as f:
        f.write(css + append_block)

    with open('site/wp-content/themes/royal-elementor-kit/serk-theme.css', 'w', encoding='utf-8') as f:
        f.write(css + append_block)
    print("Successfully appended orange brand system to serk-theme.css")
else:
    print("Already present in serk-theme.css")
