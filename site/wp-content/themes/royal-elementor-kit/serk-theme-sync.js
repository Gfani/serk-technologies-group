/**
 * SERK Technologies Group - Live Web Theme Sync
 * Ensures background colors, brand palettes, and theme choices saved in /admin immediately apply to public pages.
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

    var bg = theme.surfaceColor || '#FFFFFF';
    var cardBg = theme.surfaceAltColor || '#FFFFFF';
    var primary = theme.primaryColor || '#0D4634';
    var secondary = theme.secondaryColor || '#2D735A';
    var accent = theme.accentColor || '#E3AB72';
    var text = theme.textColor || '#101513';
    var textMuted = theme.textMutedColor || '#5B6761';
    var border = theme.borderColor || '#DEE6E0';
    var radius = theme.borderRadius || '8px';

    var isDark = isDarkColor(bg);

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
      '.elementor:not(.serk-keep-orig),',
      '.elementor-section:not(.serk-dark-sec):not([data-serk-keep-dark]):not(.elementor-element-8ebc8a5):not(.elementor-location-footer) {',
      '  background-color: var(--serk-theme-bg) !important;',
      '}',
      '.elementor-button, .serk-btn-primary, button.primary {',
      '  background-color: var(--serk-theme-primary) !important;',
      '  border-radius: var(--serk-theme-radius) !important;',
      '  transition: background-color 0.2s ease;',
      '}',
      '.elementor-button:hover, .serk-btn-primary:hover {',
      '  background-color: var(--serk-theme-secondary) !important;',
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
        '.elementor-heading-title, h1, h2, h3, h4, h5, h6 {',
        '  color: var(--serk-theme-text) !important;',
        '}',
        'p, .elementor-widget-text-editor, .elementor-icon-box-description {',
        '  color: var(--serk-theme-text-muted) !important;',
        '}',
        'div[style*="background: #FFFFFF"], div[style*="background:#FFFFFF"],',
        'div[style*="background: #ffffff"], div[style*="background:#ffffff"] {',
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
    }

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
