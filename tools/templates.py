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

    style_home = 'color:#0D4634;font-weight:700;' if is_home else ''
    style_prod = 'color:#0D4634;font-weight:700;' if is_prod else ''
    style_ind = 'color:#0D4634;font-weight:700;' if is_ind else ''
    style_serv = 'color:#0D4634;font-weight:700;' if is_serv else ''
    style_vent = 'color:#0D4634;font-weight:700;' if is_vent else ''

    return f'''<!-- SERK Structured 2-Row Global Header -->
<header class="serk-header" id="serk-global-header">
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
        <img src="/wp-content/uploads/serk/serk-logo-wide.png" alt="SERK Technologies Group" class="serk-header-logo">
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
        <button class="serk-mobile-menu-toggle" id="serkMobileMenuToggle" aria-label="Toggle navigation menu" aria-expanded="false" onclick="var d=document.getElementById('serkMobileDrawer');if(d){{d.classList.toggle('open');}}">
          <span class="serk-hamburger-bar"></span>
          <span class="serk-hamburger-bar"></span>
          <span class="serk-hamburger-bar"></span>
        </button>
      </div>
    </div>
  </div>
  <!-- Mobile Drawer: Collapses cleanly into a single accordion drawer containing both tiers -->
  <div class="serk-mobile-drawer" id="serkMobileDrawer">
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
    return '''<!-- SERK Enterprise Dark Forest/Ink Footer (#082E22) -->
<footer class="serk-global-footer" id="serk-global-footer">
  <div class="serk-footer-container">
    <div class="serk-footer-grid">
      <!-- Col 1: Brand & Contact -->
      <div class="serk-footer-col serk-footer-brand-col">
        <a href="/" class="serk-footer-logo-link" aria-label="SERK Technologies Group">
          <img src="/wp-content/uploads/serk/serk-logo-wide.png" alt="SERK Technologies Group" class="serk-footer-logo" style="filter: brightness(0) invert(1); max-height: 38px;">
        </a>
        <p class="serk-footer-tagline">Innovation with Integrity</p>
        <p class="serk-footer-desc">
          Engineering software, intelligent business systems, and digital platforms built for real-world reliability from Ethiopia for a wider world.
        </p>
        <div class="serk-footer-contact-info">
          <div class="serk-footer-contact-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Mekelle, Tigray, Ethiopia</span>
          </div>
          <div class="serk-footer-contact-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <a href="mailto:serktechgroup@gmail.com">serktechgroup@gmail.com</a>
          </div>
          <div class="serk-footer-contact-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <a href="tel:+251999911192">+251 999 911 192</a>
          </div>
        </div>
      </div>

      <!-- Col 2: Core Platforms -->
      <div class="serk-footer-col">
        <h4 class="serk-footer-heading">Software Platforms</h4>
        <ul class="serk-footer-links">
          <li><a href="/products/#construction">Construction Intelligence OS</a></li>
          <li><a href="/products/#estimator">SERK AI Estimator (BOQ)</a></li>
          <li><a href="/products/#hms">Health OS &amp; Hospital Management</a></li>
          <li><a href="/products/#finance">SERK Connected Finance</a></li>
          <li><a href="/products/#pos">Retail &amp; Hospitality POS</a></li>
          <li><a href="/products/#office">SERK Office OS</a></li>
        </ul>
      </div>

      <!-- Col 3: Navigation & Company -->
      <div class="serk-footer-col">
        <h4 class="serk-footer-heading">Navigation</h4>
        <ul class="serk-footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/products/">Products Overview</a></li>
          <li><a href="/industries/">Industries Served</a></li>
          <li><a href="/services/">Custom Services</a></li>
          <li><a href="/ventures/">Ventures &amp; Innovation</a></li>
          <li><a href="/about_us/">About Us</a></li>
          <li><a href="/partners/">Partners &amp; Clients</a></li>
          <li><a href="/gallery/">Media Gallery</a></li>
          <li><a href="/insight/">Insights &amp; Articles</a></li>
        </ul>
      </div>

      <!-- Col 4: Action & Legal -->
      <div class="serk-footer-col">
        <h4 class="serk-footer-heading">Start a Conversation</h4>
        <p class="serk-footer-cta-text">
          Planning a modernization project, new platform, or enterprise deployment?
        </p>
        <a href="/contact_us/" class="serk-btn-primary serk-footer-btn">Discuss Your Project</a>
        <div class="serk-footer-social">
          <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" class="serk-social-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.2a1.62 1.62 0 1 0 1.62 1.62 1.62 1.62 0 0 0-1.62-1.62Z"/></svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Legal Bar -->
    <div class="serk-footer-bottom">
      <div class="serk-footer-bottom-inner">
        <p class="serk-copyright">Copyright &copy; 2026 SERK Technologies Group. All rights reserved.</p>
        <div class="serk-footer-legal-links">
          <a href="/privacy/">Privacy Policy</a>
          <span class="serk-sep">·</span>
          <a href="/terms/">Terms of Service</a>
          <span class="serk-sep">·</span>
          <a href="/contact_us/">Contact Us</a>
        </div>
      </div>
    </div>
  </div>
</footer>
'''
