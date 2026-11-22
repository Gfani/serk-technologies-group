import re

def get_header_html(active_page="home"):
    is_home = active_page == "home"
    is_prod = active_page == "products"
    is_ind = active_page == "industries"
    is_serv = active_page == "services"
    is_vent = active_page == "ventures"

    cls_home = 'active' if is_home else ''
    cls_prod = 'active' if is_prod else ''
    cls_ind = 'active' if is_ind else ''
    cls_serv = 'active' if is_serv else ''
    cls_vent = 'active' if is_vent else ''

    style_home = 'color:#101513;font-weight:700;' if is_home else ''
    style_prod = 'color:#101513;font-weight:700;' if is_prod else ''
    style_ind = 'color:#101513;font-weight:700;' if is_ind else ''
    style_serv = 'color:#101513;font-weight:700;' if is_serv else ''
    style_vent = 'color:#101513;font-weight:700;' if is_vent else ''

    return f'''<!-- SERK Structured 2-Row Global Header -->
<header class="serk-header" id="serk-global-header">
  <style id="serk-critical-header-css">
    .serk-header {{ position: sticky; top: 0; left: 0; width: 100%; z-index: 9999; background: #FFFFFF; box-shadow: 0 1px 3px rgba(16,21,19,0.06); font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }}
    .serk-header * {{ box-sizing: border-box; }}
    .serk-header-container {{ max-width: 1240px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }}
    .serk-top-bar {{ height: 36px; background-color: #F4F7F5; border-bottom: 1px solid #DEE6E0; font-size: 12.5px; color: #5B6761; line-height: 36px; }}
    .serk-top-bar-inner {{ height: 100%; display: flex; align-items: center; justify-content: space-between; }}
    .serk-top-bar-left, .serk-top-bar-right {{ display: flex; align-items: center; gap: 12px; }}
    .serk-top-bar a {{ color: #5B6761; text-decoration: none; font-size: 12.5px; font-weight: 500; display: inline-flex; align-items: center; }}
    .serk-top-bar a:hover {{ color: #101513; }}
    .serk-sep {{ color: #DEE6E0; font-size: 13px; user-select: none; }}
    .serk-main-nav {{ height: 68px; background-color: #FFFFFF; border-bottom: 1px solid #DEE6E0; }}
    .serk-main-nav-inner {{ height: 100%; display: flex; align-items: center; justify-content: space-between; }}
    .serk-brand-link {{ display: flex; align-items: center; text-decoration: none; }}
    .serk-header-logo {{ height: 38px; max-height: 38px; width: auto; max-width: 220px; display: block; object-fit: contain; }}
    .serk-nav-desktop {{ display: flex; align-items: center; }}
    .serk-menu {{ display: flex; align-items: center; list-style: none !important; margin: 0 !important; padding: 0 !important; gap: 28px; }}
    .serk-menu li {{ list-style: none !important; margin: 0 !important; padding: 0 !important; display: inline-block; }}
    .serk-nav-link {{ font-size: 14.5px; font-weight: 600; color: #101513; text-decoration: none !important; padding: 8px 0; position: relative; transition: color 0.2s; }}
    .serk-nav-link:hover, .serk-nav-link.active {{ color: #101513; }}
    .serk-nav-link.active::after {{ content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background-color: #101513; border-radius: 2px; }}
    .serk-header-cta-wrap {{ display: flex; align-items: center; gap: 16px; }}
    .serk-btn-primary {{ background-color: #101513 !important; color: #FFFFFF !important; font-size: 13.5px; font-weight: 600; padding: 10px 20px; border-radius: 6px; text-decoration: none !important; display: inline-flex; align-items: center; border: 1px solid #101513; transition: all 0.2s; }}
    .serk-btn-primary:hover {{ background-color: #333333 !important; border-color: #333333; color: #FFFFFF !important; }}
    .serk-mobile-menu-toggle {{ display: none; background: none; border: 1px solid #DEE6E0; border-radius: 6px; padding: 8px 10px; cursor: pointer; flex-direction: column; gap: 4px; }}
    .serk-hamburger-bar {{ width: 18px; height: 2px; background-color: #101513; border-radius: 2px; display: block; }}
    .serk-mobile-drawer {{ display: none; }}
    @media (max-width: 900px) {{
      .serk-top-bar {{ display: none !important; }}
      .serk-nav-desktop {{ display: none !important; }}
      .serk-header-cta-wrap .serk-btn-primary {{ display: none !important; }}
      .serk-mobile-menu-toggle {{ display: flex !important; }}
      .serk-mobile-drawer {{ background-color: #FFFFFF; border-bottom: 1px solid #DEE6E0; padding: 16px 20px 24px; }}
      .serk-mobile-drawer.open {{ display: block !important; }}
      .serk-mobile-title {{ font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #5B6761; margin-bottom: 12px; }}
      .serk-mobile-list {{ list-style: none !important; margin: 0 0 16px !important; padding: 0 !important; }}
      .serk-mobile-list li {{ margin-bottom: 10px; }}
      .serk-mobile-list a {{ color: #101513; text-decoration: none !important; font-size: 15px; font-weight: 600; }}
      .serk-mobile-contact {{ display: flex; flex-direction: column; gap: 8px; margin: 16px 0; font-size: 13.5px; }}
      .serk-mobile-contact a {{ color: #5B6761; text-decoration: none !important; }}
    }}
  </style>

  <!-- Row 1: Top Utility Bar (36px, #F4F7F5) -->
  <div class="serk-top-bar">
    <div class="serk-header-container serk-top-bar-inner">
      <div class="serk-top-bar-left">
        <a href="/about_us/">About Us</a>
        <span class="serk-sep">·</span>
        <a href="/partners/">Partners</a>
        <span class="serk-sep">·</span>
        <a href="/gallery/">Gallery</a>
        <span class="serk-sep">·</span>
        <a href="/insight/">Insights</a>
      </div>
      <div class="serk-top-bar-right">
        <a href="mailto:serktechgroup@gmail.com" class="serk-contact-link" aria-label="Email SERK Group">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:5px;vertical-align:-1px"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          serktechgroup@gmail.com
        </a>
        <span class="serk-sep">·</span>
        <a href="tel:+251999911192" class="serk-contact-link" aria-label="Call SERK Group">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:5px;vertical-align:-1px"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          +251 999 911 192
        </a>
        <span class="serk-sep">·</span>
        <a href="/contact_us/">Contact Us</a>
      </div>
    </div>
  </div>

  <!-- Row 2: Main Navigation Bar (68px, #FFFFFF) -->
  <div class="serk-main-nav">
    <div class="serk-header-container serk-main-nav-inner">
      <div class="serk-brand-col">
        <a href="/" class="serk-brand-link" aria-label="SERK Technologies Group Home">
          <img src="/wp-content/uploads/serk/serk-logo-wide.png?v=20261122-04" alt="SERK Technologies Group" class="serk-header-logo" width="200" height="38" style="height:38px;max-height:38px;width:auto;max-width:220px;display:block;object-fit:contain;">
        </a>
      </div>
      <nav class="serk-nav-desktop" aria-label="Main Navigation">
        <ul class="serk-menu">
          <li><a href="/" class="serk-nav-link {cls_home}">Home</a></li>
          <li><a href="/products/" class="serk-nav-link {cls_prod}">Products</a></li>
          <li><a href="/industries/" class="serk-nav-link {cls_ind}">Industries</a></li>
          <li><a href="/services/" class="serk-nav-link {cls_serv}">Services</a></li>
          <li><a href="/ventures/" class="serk-nav-link {cls_vent}">Ventures</a></li>
        </ul>
      </nav>
      <div class="serk-header-cta-wrap">
        <a href="/contact_us/" class="serk-btn-primary">Discuss Your Project</a>
        <button class="serk-mobile-menu-toggle" id="serkMobileMenuToggle" aria-label="Toggle navigation menu">
          <span class="serk-hamburger-bar"></span>
          <span class="serk-hamburger-bar"></span>
          <span class="serk-hamburger-bar"></span>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Drawer -->
  <div class="serk-mobile-drawer" id="serkMobileDrawer">
    <div class="serk-mobile-title">Core Navigation</div>
    <ul class="serk-mobile-list">
      <li><a href="/" style="{style_home}">Home</a></li>
      <li><a href="/products/" style="{style_prod}">Products</a></li>
      <li><a href="/industries/" style="{style_ind}">Industries</a></li>
      <li><a href="/services/" style="{style_serv}">Services</a></li>
      <li><a href="/ventures/" style="{style_vent}">Ventures</a></li>
    </ul>
    <div class="serk-mobile-title">Company &amp; Resources</div>
    <ul class="serk-mobile-list">
      <li><a href="/about_us/">About Us</a></li>
      <li><a href="/partners/">Partners</a></li>
      <li><a href="/gallery/">Gallery</a></li>
      <li><a href="/insight/">Insights</a></li>
      <li><a href="/contact_us/">Contact Us</a></li>
    </ul>
    <div class="serk-mobile-contact">
      <a href="mailto:serktechgroup@gmail.com">Email: serktechgroup@gmail.com</a>
      <a href="tel:+251999911192">Phone: +251 999 911 192</a>
    </div>
    <a href="/contact_us/" class="serk-btn-primary" style="display:block; text-align:center; margin-top:12px;">Discuss Your Project</a>
  </div>
</header>
<script id="serk-header-script">
(function() {{
  var btn = document.getElementById('serkMobileMenuToggle');
  var drawer = document.getElementById('serkMobileDrawer');
  if (btn && drawer) {{
    btn.onclick = function() {{
      drawer.classList.toggle('open');
    }};
  }}
}})();
</script>
'''

def get_footer_html():
    """Returns the single authoritative Elementor 1175 footer with vertical lists and 5-horizontal alignment."""
    return '''<!-- SERK Enterprise Elementor Footer (1175) -->
<div data-elementor-type="wp-post" data-elementor-id="1175" class="elementor elementor-1175">
  <section class="elementor-section elementor-top-section elementor-element elementor-element-5b611c4 elementor-section-boxed elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no" data-id="5b611c4" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
    <div class="elementor-container elementor-column-gap-default">
      
      <!-- Col 1: Brand & Follow Us -->
      <div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-5384061" data-id="5384061" data-element_type="column">
        <div class="elementor-widget-wrap elementor-element-populated">
          <div class="elementor-element elementor-element-a0f8035 wpr-logo-position-left elementor-widget elementor-widget-wpr-logo" data-id="a0f8035" data-element_type="widget" data-widget_type="wpr-logo.default">
            <div class="elementor-widget-container">
              <div class="wpr-logo elementor-clearfix">
                <a class="wpr-logo-url" rel="home" aria-label="SERK Technologies Group" href="/">
                  <img src="/wp-content/uploads/serk/serk-logo-wide-light.png?v=20261122-04" alt="SERK Technologies Group" style="height: 36px; max-height: 36px; width: auto; max-width: 180px; display: block; object-fit: contain; margin-bottom: 16px;">
                </a>
              </div>
            </div>
          </div>
          <div class="elementor-element elementor-element-e1f0665 elementor-widget elementor-widget-heading" data-id="e1f0665" data-element_type="widget" data-widget_type="heading.default">
            <div class="elementor-widget-container">
              <h2 class="elementor-heading-title elementor-size-default" style="color: #FFFFFF !important; font-size: 0.95rem; font-weight: 700; margin: 0 0 12px 0; letter-spacing: 0.06em; text-transform: uppercase;">Follow Us</h2>
            </div>
          </div>
          <div class="elementor-element elementor-element-29ffb24 e-grid-align-left elementor-shape-rounded elementor-grid-0 elementor-widget elementor-widget-social-icons" data-id="29ffb24" data-element_type="widget" data-widget_type="social-icons.default">
            <div class="elementor-widget-container">
              <div class="elementor-social-icons-wrapper elementor-grid">
                <span class="elementor-grid-item">
                  <a class="elementor-icon elementor-social-icon elementor-social-icon-linkedin elementor-animation-grow" target="_blank" href="https://linkedin.com" rel="noopener noreferrer" aria-label="LinkedIn">
                    <span class="elementor-screen-only">Linkedin</span>
                    <svg class="e-font-icon-svg e-fab-linkedin" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" style="width: 18px; height: 18px; fill: currentColor;"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div style="margin-top: 18px; font-size: 13px; color: #8C9891; line-height: 1.6;">
            <div>Mekelle, Tigray, Ethiopia</div>
            <div><a href="mailto:serktechgroup@gmail.com" style="color: #A0AAA5; text-decoration: none;">serktechgroup@gmail.com</a></div>
            <div><a href="tel:+251999911192" style="color: #A0AAA5; text-decoration: none;">+251 999 911 192</a></div>
          </div>
        </div>
      </div>

      <!-- Col 2: Explore (Vertical list, 5 vertically + 5 aligned horizontally next to it) -->
      <div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-3bf3c57" data-id="3bf3c57" data-element_type="column">
        <div class="elementor-widget-wrap elementor-element-populated">
          <div class="elementor-element elementor-element-c12ecba elementor-widget elementor-widget-heading" data-id="c12ecba" data-element_type="widget" data-widget_type="heading.default">
            <div class="elementor-widget-container">
              <h2 class="elementor-heading-title elementor-size-default" style="color: #FFFFFF !important; font-size: 0.95rem; font-weight: 700; margin: 0 0 16px 0; letter-spacing: 0.06em; text-transform: uppercase;">Explore</h2>
            </div>
          </div>
          <div class="serk-footer-grid-split" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 28px;">
            <div class="serk-footer-col-vertical" style="display: flex; flex-direction: column; gap: 10px;">
              <a href="/products/" class="serk-footer-link">Products</a>
              <a href="/industries/" class="serk-footer-link">Industries</a>
              <a href="/ventures/" class="serk-footer-link">Ventures</a>
              <a href="/partners/" class="serk-footer-link">Partners &amp; Clients</a>
              <a href="/gallery/" class="serk-footer-link">Media Gallery</a>
            </div>
            <div class="serk-footer-col-vertical" style="display: flex; flex-direction: column; gap: 10px;">
              <a href="/about_us/" class="serk-footer-link">About Us</a>
              <a href="/insight/" class="serk-footer-link">Insights</a>
              <a href="/contact_us/" class="serk-footer-link">Contact Us</a>
              <a href="/privacy/" class="serk-footer-link">Privacy Policy</a>
              <a href="/terms/" class="serk-footer-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Col 3: Our Solutions (Vertical list) -->
      <div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-7e0acc4" data-id="7e0acc4" data-element_type="column">
        <div class="elementor-widget-wrap elementor-element-populated">
          <div class="elementor-element elementor-element-8c3ad61 elementor-widget elementor-widget-heading" data-id="8c3ad61" data-element_type="widget" data-widget_type="heading.default">
            <div class="elementor-widget-container">
              <h2 class="elementor-heading-title elementor-size-default" style="color: #FFFFFF !important; font-size: 0.95rem; font-weight: 700; margin: 0 0 16px 0; letter-spacing: 0.06em; text-transform: uppercase;">Our Solutions</h2>
            </div>
          </div>
          <div class="serk-footer-col-vertical" style="display: flex; flex-direction: column; gap: 10px;">
            <a href="/products/#construction" class="serk-footer-link">Construction &amp; AI Estimator</a>
            <a href="/products/#hms" class="serk-footer-link">Hospital Management System</a>
            <a href="/products/#finance" class="serk-footer-link">Finance &amp; Audit Engine</a>
            <a href="/products/#pos" class="serk-footer-link">Smart Retail &amp; POS</a>
            <a href="/services/" class="serk-footer-link">Systems Architecture</a>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- Bottom Bar: Copyright & Legal -->
  <section class="elementor-section elementor-top-section elementor-element elementor-element-e959569 elementor-section-boxed elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no" data-id="e959569" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
    <div class="elementor-container elementor-column-gap-default">
      <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-342506e" data-id="342506e" data-element_type="column">
        <div class="elementor-widget-wrap elementor-element-populated">
          <div class="elementor-element elementor-element-bbc634c elementor-widget elementor-widget-text-editor" data-id="bbc634c" data-element_type="widget" data-widget_type="text-editor.default">
            <div class="elementor-widget-container">
              <p style="text-align: center; margin: 0; font-size: 0.85rem; color: #8C9891;">
                Copyright &copy; 2026 SERK Technologies Group. All rights reserved. &bull; <em>"Innovation with Integrity"</em> &bull; <a href="/privacy/" style="color: #DEE6E0; text-decoration: underline;">Privacy Policy</a> &bull; <a href="/terms/" style="color: #DEE6E0; text-decoration: underline;">Terms of Service</a> &bull; <a href="/contact_us/" style="color: #DEE6E0; text-decoration: underline;">Security &amp; Compliance</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Back to top button -->
  <section class="elementor-section elementor-top-section elementor-element elementor-element-ff04cb5 elementor-section-boxed elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no" data-id="ff04cb5" data-element_type="section">
    <div class="elementor-container elementor-column-gap-no">
      <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-6cf942f" data-id="6cf942f" data-element_type="column">
        <div class="elementor-widget-wrap elementor-element-populated">
          <div class="elementor-element elementor-element-6fdf44e wpr-stt-btn-align-fixed wpr-stt-btn-align-fixed-right elementor-widget elementor-widget-wpr-back-to-top" data-id="6fdf44e" data-element_type="widget" data-widget_type="wpr-back-to-top.default">
            <div class="elementor-widget-container">
              <div class="wpr-stt-wrapper"><div class='wpr-stt-btn' data-settings='{&quot;animation&quot;:&quot;fade&quot;,&quot;animationOffset&quot;:&quot;0&quot;,&quot;animationDuration&quot;:&quot;200&quot;,&quot;fixed&quot;:&quot;fixed&quot;,&quot;scrolAnim&quot;:&quot;800&quot;}'><span class="wpr-stt-icon"><svg class="e-font-icon-svg e-fas-chevron-up" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path></svg></span></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Phone call floating button -->
  <section class="elementor-section elementor-top-section elementor-element elementor-element-b48140f elementor-section-boxed elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no" data-id="b48140f" data-element_type="section">
    <div class="elementor-container elementor-column-gap-no">
      <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-ae61e22" data-id="ae61e22" data-element_type="column">
        <div class="elementor-widget-wrap elementor-element-populated">
          <div class="elementor-element elementor-element-c53e6ea wpr-pc-btn-align-fixed wpr-pc-btn-align-fixed-right elementor-widget elementor-widget-wpr-phone-call" data-id="c53e6ea" data-element_type="widget" data-widget_type="wpr-phone-call.default">
            <div class="elementor-widget-container">
              <div class="wpr-pc-wrapper"><a href="tel:+251999911192" class="wpr-pc-btn" aria-label="Direct Phone Line"><div class="wpr-pc-content"><span class="wpr-pc-btn-icon"><svg class="e-font-icon-svg e-fas-phone" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path></svg></span></div></a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</div>
'''
