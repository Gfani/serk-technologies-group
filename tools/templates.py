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
      .serk-mobile-list li {{ margin: 0 0 10px !important; padding: 0 !important; list-style: none !important; }}
      .serk-mobile-list a {{ color: #101513; text-decoration: none !important; font-size: 15px; font-weight: 500; display: block; padding: 4px 0; }}
      .serk-mobile-contact {{ display: flex; flex-direction: column; gap: 8px; margin: 16px 0; font-size: 13px; color: #5B6761; }}
      .serk-mobile-contact a {{ color: #5B6761; text-decoration: none !important; }}
      .serk-btn-mobile {{ display: block !important; width: 100%; text-align: center; justify-content: center; margin-top: 12px; }}
    }}
  </style>
  <!-- Row 1: Top Utility Bar (36px, #F4F7F5, 1px solid #DEE6E0) -->
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
  <!-- Row 2: Main Navigation Bar (68px, #FFFFFF, 1px solid #DEE6E0) -->
  <div class="serk-main-nav">
    <div class="serk-header-container serk-main-nav-inner">
      <a href="/" class="serk-brand-link" aria-label="SERK Technologies Group Home">
        <img src="/wp-content/uploads/serk/serk-logo-wide.png?v=20261122-04" alt="SERK Technologies Group" class="serk-header-logo" width="200" height="38" style="height:38px;max-height:38px;width:auto;max-width:220px;display:block;object-fit:contain;">
      </a>
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
        <button class="serk-mobile-menu-toggle" id="serkMobileMenuToggle" aria-label="Toggle navigation menu" aria-expanded="false" onclick="var d=document.getElementById('serkMobileDrawer');if(d){{var isBlock=window.getComputedStyle(d).display==='block';d.style.display=isBlock?'none':'block';d.classList.toggle('open');}}">
          <span class="serk-hamburger-bar"></span>
          <span class="serk-hamburger-bar"></span>
          <span class="serk-hamburger-bar"></span>
        </button>
      </div>
    </div>
  </div>
  <!-- Mobile Drawer: Collapses cleanly into a single accordion drawer containing both tiers -->
  <div class="serk-mobile-drawer" id="serkMobileDrawer" style="display:none;">
    <div class="serk-mobile-section">
      <div class="serk-mobile-title">Core Navigation</div>
      <ul class="serk-mobile-list">
        <li><a href="/" style="{style_home}">Home</a></li>
        <li><a href="/products/" style="{style_prod}">Products</a></li>
        <li><a href="/industries/" style="{style_ind}">Industries</a></li>
        <li><a href="/services/" style="{style_serv}">Services</a></li>
        <li><a href="/ventures/" style="{style_vent}">Ventures</a></li>
      </ul>
    </div>
    <div class="serk-mobile-section" style="border-top:1px solid #DEE6E0;padding-top:16px;">
      <div class="serk-mobile-title">Company &amp; Resources</div>
      <ul class="serk-mobile-list">
        <li><a href="/about_us/">About Us</a></li>
        <li><a href="/partners/">Partners</a></li>
        <li><a href="/gallery/">Gallery</a></li>
        <li><a href="/insight/">Insights</a></li>
        <li><a href="/contact_us/">Contact Us</a></li>
      </ul>
      <div class="serk-mobile-contact">
        <a href="mailto:serktechgroup@gmail.com">serktechgroup@gmail.com</a>
        <a href="tel:+251999911192">+251 999 911 192</a>
      </div>
      <a href="/contact_us/" class="serk-btn-primary serk-btn-mobile">Discuss Your Project</a>
    </div>
  </div>
</header>
'''

def get_footer_html():
    return '''<!-- SERK Enterprise Global Footer (#101513) -->
<footer class="serk-global-footer" id="serk-global-footer" style="background-color: #101513; color: #FFFFFF; font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; padding: 64px 0 32px; border-top: 1px solid #222222;">
  <div class="serk-footer-container" style="max-width: 1240px; margin: 0 auto; padding: 0 24px;">
    <div class="serk-footer-grid" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr; gap: 40px; margin-bottom: 48px;">
      
      <!-- Col 1: Brand & Dossier -->
      <div class="serk-footer-col">
        <a href="/" class="serk-footer-logo-link" aria-label="SERK Technologies Group">
          <img src="/wp-content/uploads/serk/serk-logo-wide-light.png?v=20261122-04" alt="SERK Technologies Group" class="serk-footer-logo" width="200" height="38" style="height: 38px; max-height: 38px; width: auto; max-width: 220px; display: block; object-fit: contain; margin-bottom: 16px;">
        </a>
        <p style="color: #A0AAA5; font-size: 13.5px; line-height: 1.65; margin: 0 0 16px;">
          <strong>SERK Technologies Group</strong> ("Innovation with Integrity") engineers enterprise software, intelligent operating platforms, and practical applied AI for construction, healthcare, finance, and commerce across Ethiopia and the region.
        </p>
        <div style="font-size: 12.5px; color: #77827D;">
          Registered in Mekelle, Tigray, Ethiopia
        </div>
      </div>

      <!-- Col 2: Products -->
      <div class="serk-footer-col">
        <h4 style="color: #FFFFFF; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 18px;">Products</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 13.5px; line-height: 2;">
          <li><a href="/products/" style="color: #DEE6E0; text-decoration: none;">Construction OS</a></li>
          <li><a href="/products/" style="color: #DEE6E0; text-decoration: none;">Hospital Management</a></li>
          <li><a href="/products/" style="color: #DEE6E0; text-decoration: none;">Finance &amp; Audit Engine</a></li>
          <li><a href="/products/" style="color: #DEE6E0; text-decoration: none;">Smart Retail &amp; POS</a></li>
          <li><a href="/products/" style="color: #DEE6E0; text-decoration: none;">Platform Architecture</a></li>
        </ul>
      </div>

      <!-- Col 3: Industries & Services -->
      <div class="serk-footer-col">
        <h4 style="color: #FFFFFF; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 18px;">Solutions</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 13.5px; line-height: 2;">
          <li><a href="/industries/" style="color: #DEE6E0; text-decoration: none;">Construction &amp; Real Estate</a></li>
          <li><a href="/industries/" style="color: #DEE6E0; text-decoration: none;">Healthcare Delivery</a></li>
          <li><a href="/industries/" style="color: #DEE6E0; text-decoration: none;">Banking &amp; Financial Services</a></li>
          <li><a href="/services/" style="color: #DEE6E0; text-decoration: none;">System Architecture</a></li>
          <li><a href="/services/" style="color: #DEE6E0; text-decoration: none;">Cloud &amp; Security Engineering</a></li>
        </ul>
      </div>

      <!-- Col 4: Corporate -->
      <div class="serk-footer-col">
        <h4 style="color: #FFFFFF; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 18px;">Company</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 13.5px; line-height: 2;">
          <li><a href="/about_us/" style="color: #DEE6E0; text-decoration: none;">About Us</a></li>
          <li><a href="/ventures/" style="color: #DEE6E0; text-decoration: none;">Ventures &amp; Family</a></li>
          <li><a href="/partners/" style="color: #DEE6E0; text-decoration: none;">Partners</a></li>
          <li><a href="/insight/" style="color: #DEE6E0; text-decoration: none;">Insights &amp; Articles</a></li>
          <li><a href="/gallery/" style="color: #DEE6E0; text-decoration: none;">Corporate Gallery</a></li>
        </ul>
      </div>

      <!-- Col 5: Contact & Location -->
      <div class="serk-footer-col">
        <h4 style="color: #FFFFFF; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 18px;">Contact &amp; HQ</h4>
        <div style="font-size: 13px; color: #DEE6E0; line-height: 1.8; margin-bottom: 16px;">
          <div><strong>Headquarters:</strong> Mekelle, Tigray, Ethiopia</div>
          <div><strong>Email:</strong> <a href="mailto:serktechgroup@gmail.com" style="color: #FFFFFF; text-decoration: underline;">serktechgroup@gmail.com</a></div>
          <div><strong>Phone:</strong> <a href="tel:+251999911192" style="color: #FFFFFF; text-decoration: underline;">+251 999 911 192</a></div>
        </div>
        <a href="/contact_us/" style="display: inline-block; background-color: #222222; border: 1px solid #444444; color: #FFFFFF; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 12.5px; font-weight: 600;">Contact Engineering Team &rarr;</a>
      </div>

    </div>

    <!-- Bottom Bar: Legal & Copyright -->
    <div class="serk-footer-bottom" style="border-top: 1px solid #222222; padding-top: 24px; display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; color: #77827D; flex-wrap: wrap; gap: 12px;">
      <div>
        Copyright &copy; 2026 SERK Technologies Group. All rights reserved. &bull; <em>"Innovation with Integrity"</em>
      </div>
      <div style="display: flex; gap: 20px;">
        <a href="/privacy/" style="color: #A0AAA5; text-decoration: none;">Privacy Policy</a>
        <a href="/terms/" style="color: #A0AAA5; text-decoration: none;">Terms of Service</a>
        <a href="/contact_us/" style="color: #A0AAA5; text-decoration: none;">Security &amp; Compliance</a>
      </div>
    </div>
  </div>
</footer>
'''
