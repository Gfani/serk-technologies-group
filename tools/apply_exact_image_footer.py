import os
import glob
import re

# 1. New HTML snippet for elementor-1175 footer
NEW_FOOTER_HTML = """<div data-elementor-type="wp-post" data-elementor-id="1175" class="elementor elementor-1175">
  <section class="elementor-section elementor-top-section elementor-element elementor-element-5b611c4 elementor-section-boxed elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no" data-id="5b611c4" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" style="background-color: #101513; padding: 64px 0; margin-top: 0; margin-bottom: 0;">
    <div class="serk-footer-container" style="display: grid; grid-template-columns: 1fr 1fr 1fr 1.4fr; gap: 48px; max-width: 1200px; margin: 0 auto; padding: 0 32px; box-sizing: border-box;">
      
      <!-- Column 1: Brand & Visit Us -->
      <div class="serk-footer-col serk-footer-col-brand" style="display: flex; flex-direction: column; align-items: flex-start;">
        <a href="/" class="serk-footer-mark-link" aria-label="SERK Technologies Group" style="display: block; position: static; margin-bottom: 20px; line-height: 1;">
          <img src="/wp-content/uploads/serk/serk-logo-mark.png?v=20261122-footer06" alt="SERK Group" width="44" height="44" class="serk-footer-mark-img" style="width: 44px; height: 44px; max-width: 44px; max-height: 44px; display: block; position: static; object-fit: contain;">
        </a>
        <h4 class="serk-footer-heading serk-footer-heading-visitus" style="color: #E3AB72 !important; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: 0.05em; text-transform: uppercase; line-height: 1.2;">VISIT US</h4>
        <p class="serk-footer-address" style="color: #9AB4A9; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 13px; line-height: 1.5; margin: 0 0 16px 0;">Mekelle, Tigray, Ethiopia<br>Sovereign Digital Systems</p>
        <div class="serk-footer-socials" style="display: flex; align-items: center; position: static;">
          <a class="serk-footer-social-btn" target="_blank" href="https://linkedin.com" rel="noopener noreferrer" aria-label="LinkedIn" style="display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 4px; border: 1px solid #E3AB72; background-color: rgba(227, 171, 114, 0.08); color: #E3AB72; text-decoration: none; transition: all 0.2s ease;">
            <svg class="e-font-icon-svg e-fab-linkedin" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" style="width: 15px; height: 15px; fill: currentColor;"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
          </a>
        </div>
      </div>

      <!-- Column 2: EXPLORE (5 items) -->
      <div class="serk-footer-col serk-footer-col-explore" style="display: flex; flex-direction: column;">
        <h4 class="serk-footer-heading" style="color: #FFFFFF !important; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 700; margin: 0 0 18px 0; letter-spacing: 0.05em; text-transform: uppercase; line-height: 1.2;">EXPLORE</h4>
        <nav class="serk-footer-nav" aria-label="Explore Navigation" style="margin: 0; padding: 0;">
          <ul class="serk-footer-list" style="display: flex; flex-direction: column; gap: 12px; list-style: none !important; margin: 0 !important; padding: 0 !important;">
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Home</a></li>
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/products/" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Products</a></li>
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/industries/" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Industries</a></li>
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/services/" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Services</a></li>
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/ventures/" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Ventures</a></li>
          </ul>
        </nav>
      </div>

      <!-- Column 3: COMPANY (5 items) -->
      <div class="serk-footer-col serk-footer-col-company" style="display: flex; flex-direction: column;">
        <h4 class="serk-footer-heading" style="color: #FFFFFF !important; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 700; margin: 0 0 18px 0; letter-spacing: 0.05em; text-transform: uppercase; line-height: 1.2;">COMPANY</h4>
        <nav class="serk-footer-nav" aria-label="Company Information" style="margin: 0; padding: 0;">
          <ul class="serk-footer-list" style="display: flex; flex-direction: column; gap: 12px; list-style: none !important; margin: 0 !important; padding: 0 !important;">
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/about_us/" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">About Us</a></li>
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/partners/" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Partners &amp; Clients</a></li>
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/gallery/" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Media Gallery</a></li>
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/insight/" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Insights</a></li>
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/contact_us/" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Contact Us</a></li>
          </ul>
        </nav>
      </div>

      <!-- Column 4: PLATFORMS (5 items) -->
      <div class="serk-footer-col serk-footer-col-platforms" style="display: flex; flex-direction: column;">
        <h4 class="serk-footer-heading" style="color: #FFFFFF !important; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 700; margin: 0 0 18px 0; letter-spacing: 0.05em; text-transform: uppercase; line-height: 1.2;">PLATFORMS</h4>
        <nav class="serk-footer-nav" aria-label="Enterprise Platforms" style="margin: 0; padding: 0;">
          <ul class="serk-footer-list" style="display: flex; flex-direction: column; gap: 12px; list-style: none !important; margin: 0 !important; padding: 0 !important;">
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/products/#construction" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Construction &amp; AI Estimator</a></li>
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/products/#hms" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Hospital Management System</a></li>
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/products/#finance" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Finance &amp; Audit Engine</a></li>
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/products/#pos" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Smart Retail &amp; POS</a></li>
            <li style="list-style: none !important; margin: 0 !important; padding: 0 !important;"><a href="/services/" class="serk-footer-link" style="color: #CDE5DC; font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 14px; font-weight: 400; text-decoration: none; line-height: 1.45; display: inline-block;">Systems Architecture</a></li>
          </ul>
        </nav>
      </div>

    </div>
  </section>

  <!-- Full-Width Bottom Copyright Bar (Edge-to-Edge Flush, #000000 Pure Black, 18px 0) -->
  <section class="elementor-section elementor-top-section elementor-element elementor-element-e959569 elementor-section-boxed elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no" data-id="e959569" data-element_type="section" style="width: 100%; margin: 0; padding: 18px 0; background-color: #000000; border-top: 1px solid rgba(255, 255, 255, 0.08); box-sizing: border-box;">
    <div class="serk-copyright-inner" style="max-width: 1200px; margin: 0 auto; padding: 0 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; box-sizing: border-box;">
      <div class="serk-copyright-left" style="font-family: var(--serk-font-sans, 'Poppins', sans-serif); font-size: 13px; color: #9AB4A9; line-height: 1.4; margin: 0;">
        Copyright &copy; 2026 SERK Technologies Group. All rights reserved. &middot; <span class="serk-copyright-tagline" style="color: #E3AB72;">Innovation with Integrity</span>
      </div>
      <div class="serk-copyright-right" style="display: flex; align-items: center; gap: 12px; font-size: 12px; color: #7D978C; margin: 0;">
        <a href="/privacy/" class="serk-copyright-link" style="color: #7D978C; text-decoration: none; font-size: 12px; font-family: var(--serk-font-sans, 'Poppins', sans-serif); transition: color 0.2s ease;">Privacy Policy</a>
        <span class="serk-copyright-sep" style="color: rgba(255, 255, 255, 0.2); user-select: none;">·</span>
        <a href="/terms/" class="serk-copyright-link" style="color: #7D978C; text-decoration: none; font-size: 12px; font-family: var(--serk-font-sans, 'Poppins', sans-serif); transition: color 0.2s ease;">Terms of Service</a>
        <span class="serk-copyright-sep" style="color: rgba(255, 255, 255, 0.2); user-select: none;">·</span>
        <a href="/contact_us/" class="serk-copyright-link" style="color: #7D978C; text-decoration: none; font-size: 12px; font-family: var(--serk-font-sans, 'Poppins', sans-serif); transition: color 0.2s ease;">Security &amp; Compliance</a>
      </div>
    </div>
  </section>

  <!-- Back to top button (kept subtle) -->
  <section class="elementor-section elementor-top-section elementor-element elementor-element-ff04cb5 elementor-section-boxed elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no" data-id="ff04cb5" data-element_type="section">
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

</div>"""

# Pattern to match the entire <div data-elementor-type="wp-post" data-elementor-id="1175" ...> ... </div>
FOOTER_REGEX = re.compile(
    r'<div\s+data-elementor-type="wp-post"\s+data-elementor-id="1175"[^>]*>.*?<!-- Back to top button[^<]*-->.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</section>\s*</div>',
    re.DOTALL
)

# Simpler fallback regex: from data-elementor-id="1175" opening div to the closing </div> before <script or </body
ALT_FOOTER_REGEX = re.compile(
    r'<div\s+data-elementor-type="wp-post"\s+data-elementor-id="1175"[^>]*>.*?</div>\s*(?=<script|</body>)',
    re.DOTALL
)

files = sorted(set(glob.glob('public/**/*.html', recursive=True) + glob.glob('site/**/*.html', recursive=True)))
updated_count = 0

for fpath in files:
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()

    new_content = None
    if FOOTER_REGEX.search(content):
        new_content = FOOTER_REGEX.sub(NEW_FOOTER_HTML, content, count=1)
    elif ALT_FOOTER_REGEX.search(content):
        new_content = ALT_FOOTER_REGEX.sub(NEW_FOOTER_HTML, content, count=1)
    else:
        print(f"WARNING: Regex did not match in {fpath}")
        continue

    if new_content and new_content != content:
        with open(fpath, 'w', encoding='utf-8') as fp:
            fp.write(new_content)
        updated_count += 1

print(f"Successfully updated footer in {updated_count} / {len(files)} HTML files.")
