/**
 * SERK Technologies Group - Live Web Theme Sync
 * Ensures background colors, brand palettes, and theme choices saved in /admin immediately apply to public pages
 * with strict high-contrast compatibility and 100% preservation of the original dark footer.
 */
(function () {
  function isDarkColor(hexColor) {
    if (!hexColor || typeof hexColor !== 'string' || hexColor.charAt(0) !== '#') return false;
    var hex = hexColor.replace('#', '');
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    if (hex.length !== 6) return false;
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    var brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  }

  function applyTheme(theme) {
    if (!theme || typeof theme !== 'object') return;

    try {
      localStorage.setItem('serk_active_theme', JSON.stringify(theme));
    } catch (e) {}

    var isDark = isDarkColor(theme.surfaceColor || '#FFFFFF');
    var bg = theme.surfaceColor || '#FFFFFF';
    var cardBg = theme.surfaceAltColor || (isDark ? '#151D19' : '#FFFFFF');
    var border = theme.borderColor || (isDark ? '#23332A' : '#DEE6E0');
    var text = theme.textColor || (isDark ? '#F0F4F2' : '#101513');
    var textMuted = theme.textMutedColor || (isDark ? '#9AB4A9' : '#5B6761');
    var primary = theme.primaryColor || '#0D4634';
    var secondary = theme.secondaryColor || '#2D735A';
    var accent = theme.accentColor || '#E3AB72';
    var radius = theme.borderRadius || '8px';

    var styleEl = document.getElementById('serk-dynamic-theme-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'serk-dynamic-theme-style';
      var head = document.head || document.getElementsByTagName('head')[0];
      if (head) {
        head.appendChild(styleEl);
      } else {
        document.documentElement.appendChild(styleEl);
      }
    }

    var css = [
      ':root {',
      '  --serk-theme-bg: ' + bg + ' !important;',
      '  --serk-theme-card-bg: ' + cardBg + ' !important;',
      '  --serk-theme-primary: ' + primary + ' !important;',
      '  --serk-theme-secondary: ' + secondary + ' !important;',
      '  --serk-theme-accent: ' + accent + ' !important;',
      '  --serk-theme-text: ' + text + ' !important;',
      '  --serk-theme-text-muted: ' + textMuted + ' !important;',
      '  --serk-theme-border: ' + border + ' !important;',
      '  --serk-theme-radius: ' + radius + ' !important;',
      '}',
      'html, body {',
      '  background-color: var(--serk-theme-bg) !important;',
      '  color: var(--serk-theme-text) !important;',
      '}',
      '.elementor:not(.elementor-1175):not([data-elementor-id="1175"]):not(.serk-global-footer) {',
      '  background-color: var(--serk-theme-bg) !important;',
      '}',
      '.elementor-section:not(.elementor-element-5b611c4):not(.elementor-element-e959569):not([data-id="5b611c4"]):not([data-id="e959569"]):not(.serk-dark-sec):not([data-serk-keep-dark]):not(.elementor-element-8ebc8a5):not(.elementor-location-footer):not(.serk-footer-bottom):not(.elementor-element-ec224c7):not(.elementor-element-c49bbe5) {',
      '  background-color: var(--serk-theme-bg) !important;',
      '}',
      '.elementor-button, .serk-btn-primary, button.primary, .serk-btn-mobile {',
      '  background-color: var(--serk-theme-primary) !important;',
      '  color: #FFFFFF !important;',
      '  border-radius: var(--serk-theme-radius) !important;',
      '  border-color: var(--serk-theme-primary) !important;',
      '  transition: background-color 0.2s ease, border-color 0.2s ease !important;',
      '}',
      '.elementor-button *, .serk-btn-primary * {',
      '  color: #FFFFFF !important;',
      '}',
      '.elementor-button:hover, .serk-btn-primary:hover, button.primary:hover {',
      '  background-color: var(--serk-theme-secondary) !important;',
      '  border-color: var(--serk-theme-secondary) !important;',
      '  color: #FFFFFF !important;',
      '}',
      '.serk-cat-pill {',
      '  border-radius: var(--serk-theme-radius) !important;',
      '  transition: all 0.2s ease;',
      '}',
      '.serk-cat-pill.active {',
      '  background-color: rgba(227, 171, 114, 0.15) !important;',
      '  border-color: var(--serk-theme-accent) !important;',
      '  color: var(--serk-theme-text) !important;',
      '}',
      '.serk-cat-pill:hover {',
      '  border-color: var(--serk-theme-accent) !important;',
      '}',
    ];

    if (isDark) {
      css.push(
        '/* Dark Theme Navigation & Header */',
        '.serk-top-bar {',
        '  background-color: var(--serk-theme-card-bg) !important;',
        '  border-bottom: 1px solid var(--serk-theme-border) !important;',
        '}',
        '.serk-top-bar a, .serk-top-bar .serk-sep, .serk-top-bar .serk-contact-link {',
        '  color: var(--serk-theme-text-muted) !important;',
        '}',
        '.serk-top-bar a:hover {',
        '  color: var(--serk-theme-text) !important;',
        '}',
        '.serk-main-nav {',
        '  background-color: var(--serk-theme-bg) !important;',
        '  border-bottom: 1px solid var(--serk-theme-border) !important;',
        '}',
        '.serk-nav-link {',
        '  color: var(--serk-theme-text) !important;',
        '}',
        '.serk-nav-link:hover, .serk-nav-link.active {',
        '  color: var(--serk-theme-accent) !important;',
        '}',
        '.serk-nav-link.active::after {',
        '  background-color: var(--serk-theme-accent) !important;',
        '}',
        '.serk-sub-menu {',
        '  background-color: var(--serk-theme-card-bg) !important;',
        '  border: 1px solid var(--serk-theme-border) !important;',
        '}',
        '.serk-sub-menu a {',
        '  color: var(--serk-theme-text) !important;',
        '}',
        '.serk-sub-menu a:hover {',
        '  background-color: rgba(227, 171, 114, 0.12) !important;',
        '  color: var(--serk-theme-accent) !important;',
        '}',
        '.serk-mobile-menu-toggle {',
        '  border-color: var(--serk-theme-border) !important;',
        '}',
        '.serk-hamburger-bar {',
        '  background-color: var(--serk-theme-text) !important;',
        '}',
        '.serk-mobile-drawer {',
        '  background-color: var(--serk-theme-card-bg) !important;',
        '  border-bottom: 1px solid var(--serk-theme-border) !important;',
        '}',
        '.serk-mobile-drawer a {',
        '  color: var(--serk-theme-text) !important;',
        '}',
        '/* Dark Theme Content & Cards */',
        '.elementor:not(.elementor-1175) .elementor-heading-title,',
        '.elementor:not(.elementor-1175) h1,',
        '.elementor:not(.elementor-1175) h2,',
        '.elementor:not(.elementor-1175) h3,',
        '.elementor:not(.elementor-1175) h4:not(.serk-footer-heading),',
        '.elementor:not(.elementor-1175) h5,',
        '.elementor:not(.elementor-1175) h6,',
        '.wpr-grid-item-title a {',
        '  color: var(--serk-theme-text) !important;',
        '}',
        '.elementor:not(.elementor-1175) p:not(.serk-footer-address):not(.serk-copyright-left),',
        '.elementor-widget-text-editor,',
        '.elementor-icon-box-description,',
        '.wpr-grid-item-excerpt p {',
        '  color: var(--serk-theme-text-muted) !important;',
        '}',
        'div[style*="background: #FFFFFF"], div[style*="background:#FFFFFF"],',
        'div[style*="background: #ffffff"], div[style*="background:#ffffff"],',
        '.wpr-grid-item-inner {',
        '  background-color: var(--serk-theme-card-bg) !important;',
        '  border-color: var(--serk-theme-border) !important;',
        '}',
        'div[style*="border: 1px solid #DEE6E0"] {',
        '  border-color: var(--serk-theme-border) !important;',
        '}',
        '.serk-cat-pill {',
        '  background-color: var(--serk-theme-card-bg) !important;',
        '  color: var(--serk-theme-text) !important;',
        '  border-color: var(--serk-theme-border) !important;',
        '}'
      );
    } else {
      css.push(
        '/* Light Theme Navigation & Header */',
        '.serk-top-bar {',
        '  background-color: var(--serk-theme-card-bg, #F4F7F5) !important;',
        '  border-bottom: 1px solid var(--serk-theme-border, #DEE6E0) !important;',
        '}',
        '.serk-top-bar a, .serk-top-bar .serk-sep, .serk-top-bar .serk-contact-link {',
        '  color: var(--serk-theme-text-muted, #5B6761) !important;',
        '}',
        '.serk-top-bar a:hover {',
        '  color: var(--serk-theme-text, #101513) !important;',
        '}',
        '.serk-main-nav {',
        '  background-color: var(--serk-theme-bg, #FFFFFF) !important;',
        '  border-bottom: 1px solid var(--serk-theme-border, #DEE6E0) !important;',
        '}',
        '.serk-nav-link {',
        '  color: var(--serk-theme-text, #101513) !important;',
        '}',
        '.serk-nav-link:hover, .serk-nav-link.active {',
        '  color: var(--serk-theme-primary, #0D4634) !important;',
        '}',
        '.serk-nav-link.active::after {',
        '  background-color: var(--serk-theme-primary, #0D4634) !important;',
        '}',
        '.elementor:not(.elementor-1175):not(.serk-dark-sec):not(.elementor-element-8ebc8a5) .elementor-heading-title,',
        '.elementor:not(.elementor-1175):not(.serk-dark-sec):not(.elementor-element-8ebc8a5) h1,',
        '.elementor:not(.elementor-1175):not(.serk-dark-sec):not(.elementor-element-8ebc8a5) h2,',
        '.elementor:not(.elementor-1175):not(.serk-dark-sec):not(.elementor-element-8ebc8a5) h3,',
        '.elementor:not(.elementor-1175):not(.serk-dark-sec):not(.elementor-element-8ebc8a5) h4:not(.serk-footer-heading),',
        '.wpr-grid-item-title a {',
        '  color: var(--serk-theme-text, #101513) !important;',
        '}',
        '.elementor:not(.elementor-1175):not(.serk-dark-sec):not(.elementor-element-8ebc8a5) p:not(.serk-footer-address):not(.serk-copyright-left),',
        '.wpr-grid-item-excerpt p {',
        '  color: var(--serk-theme-text-muted, #5B6761) !important;',
        '}'
      );
    }

    // Always protect Dedicated Dark Sections
    css.push(
      '/* Dedicated Dark Sections Protection */',
      '.serk-dark-sec, .elementor-element-8ebc8a5, .elementor-element-ec224c7, .elementor-element-c49bbe5 {',
      '  background-color: #101513 !important;',
      '  background: #101513 !important;',
      '}',
      '.serk-dark-sec h1, .serk-dark-sec h2, .serk-dark-sec h3, .serk-dark-sec h4,',
      '.elementor-element-8ebc8a5 h2, .elementor-element-8ebc8a5 .elementor-heading-title,',
      '.elementor-element-ec224c7 .elementor-heading-title, .elementor-element-c49bbe5 .elementor-heading-title {',
      '  color: #FFFFFF !important;',
      '}',
      '.serk-dark-sec p, .elementor-element-8ebc8a5 p, .elementor-element-ec224c7 p, .elementor-element-c49bbe5 p,',
      '[data-id="2055672"] p, [data-id="3e5f206"] p {',
      '  color: #DEE6E0 !important;',
      '}'
    );

    // Always protect Original Enterprise Footer
    css.push(
      '/* Original Enterprise Footer Strict Protection */',
      '.elementor-1175, div[data-elementor-id="1175"], .elementor-element-5b611c4, section[data-id="5b611c4"], .serk-global-footer {',
      '  background-color: #101513 !important;',
      '  background: #101513 !important;',
      '  color: #DEE6E0 !important;',
      '}',
      '.elementor-element-e959569, section[data-id="e959569"], .serk-footer-bottom {',
      '  background-color: #000000 !important;',
      '  background: #000000 !important;',
      '  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;',
      '}',
      '.elementor-1175 h4, .elementor-1175 .serk-footer-heading, .elementor-element-5b611c4 h4, .elementor-element-5b611c4 .elementor-heading-title, .serk-global-footer h4 {',
      '  color: #FFFFFF !important;',
      '  font-family: var(--serk-font-sans, "Poppins", sans-serif) !important;',
      '}',
      '.elementor-1175 .serk-footer-heading-visitus, .elementor-element-5b611c4 .serk-footer-heading-visitus {',
      '  color: #E3AB72 !important;',
      '}',
      '.elementor-1175 .serk-footer-address, .elementor-element-5b611c4 .serk-footer-address, .elementor-1175 p, .elementor-element-5b611c4 p {',
      '  color: #9AB4A9 !important;',
      '}',
      '.elementor-1175 .serk-footer-link, .elementor-element-5b611c4 .serk-footer-link, .elementor-1175 a:not(.serk-footer-social-btn), .elementor-element-5b611c4 a:not(.serk-footer-social-btn) {',
      '  color: #CDE5DC !important;',
      '  text-decoration: none !important;',
      '}',
      '.elementor-1175 .serk-footer-link:hover, .elementor-element-5b611c4 .serk-footer-link:hover, .elementor-1175 a:not(.serk-footer-social-btn):hover, .elementor-element-5b611c4 a:not(.serk-footer-social-btn):hover {',
      '  color: #FFFFFF !important;',
      '}',
      '.serk-footer-social-btn {',
      '  background-color: rgba(227, 171, 114, 0.08) !important;',
      '  border: 1px solid #E3AB72 !important;',
      '  color: #E3AB72 !important;',
      '}',
      '.serk-footer-social-btn:hover {',
      '  background-color: #E3AB72 !important;',
      '  color: #101513 !important;',
      '}',
      '.serk-copyright-left, .elementor-element-e959569 p {',
      '  color: #9AB4A9 !important;',
      '}',
      '.serk-copyright-tagline {',
      '  color: #E3AB72 !important;',
      '}',
      '.serk-copyright-link, .elementor-element-e959569 a {',
      '  color: #7D978C !important;',
      '}',
      '.serk-copyright-link:hover, .elementor-element-e959569 a:hover {',
      '  color: #FFFFFF !important;',
      '}',
      '.serk-copyright-sep {',
      '  color: rgba(255, 255, 255, 0.2) !important;',
      '}'
    );

    styleEl.textContent = css.join('\n');

    if (isDark) {
      document.documentElement.classList.add('serk-dark-theme');
      if (document.body) document.body.classList.add('serk-dark-theme');
    } else {
      document.documentElement.classList.remove('serk-dark-theme');
      if (document.body) document.body.classList.remove('serk-dark-theme');
    }
  }

  // 1. Immediately apply cached theme on startup (0ms latency)
  try {
    var cached = localStorage.getItem('serk_active_theme');
    if (cached) {
      applyTheme(JSON.parse(cached));
    }
  } catch (e) {}

  // 2. Fetch active theme from database
  if (typeof fetch === 'function') {
    fetch('/api/admin/theme', { cache: 'no-store' })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data && data.surfaceColor) {
          applyTheme(data);
        }
      })
      .catch(function () {});
  }

  // 3. React to live updates across windows and events
  window.addEventListener('storage', function (e) {
    if (e.key === 'serk_active_theme' && e.newValue) {
      try {
        applyTheme(JSON.parse(e.newValue));
      } catch (err) {}
    }
  });

  window.addEventListener('serk:theme:updated', function (e) {
    if (e.detail) {
      applyTheme(e.detail);
    }
  });
})();
