import os, re

path = 'site/index.html'
h = open(path, encoding='utf-8').read()

# Locate from start of elementor-1158 (the page content) down to section llen1mo (clients carousel)
idx_page_start = h.find('class="elementor elementor-1158"')
if idx_page_start == -1:
    idx_page_start = h.find('data-elementor-type="wp-page"')
start_pos = h.find('<section', idx_page_start)

# Find where section llen1mo begins
end_pos = h.find('data-id="llen1mo"')
if end_pos != -1:
    end_pos = h.rfind('<section', 0, end_pos)
else:
    end_pos = h.find('id="blog"')
    end_pos = h.rfind('<section', 0, end_pos)

hero_and_solutions_html = '''
<!-- ========================================================
     1. HERO SECTION (Actionable, High-Contrast, Real UI Preview)
     ======================================================== -->
<section class="serk-hero-section" style="background: #FFFFFF; border-bottom: 1px solid #DEE6E0; padding: 72px 0 84px 0;">
  <div class="serk-container" style="max-width: 1240px; margin: 0 auto; padding: 0 24px;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 48px; align-items: center;">
      <!-- Hero Left: Content & CTAs -->
      <div>
        <div style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; background: #F4F7F5; border: 1px solid #DEE6E0; border-radius: 4px; font-size: 11.5px; font-weight: 700; color: #0D4634; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 20px;">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #0D4634;"></span>
          TECHNOLOGY BUILT FOR REAL WORK
        </div>
        <h1 style="font-size: 3rem; font-weight: 700; line-height: 1.15; color: #101513; margin: 0 0 20px 0; letter-spacing: -0.025em;">
          We Engineer the Systems Behind Better Business.
        </h1>
        <p style="font-size: 1.12rem; line-height: 1.7; color: #5B6761; margin: 0 0 32px 0;">
          From your first website to intelligent enterprise operations, SERK Technologies Group designs and develops practical digital solutions for organizations ready to work smarter. We combine software engineering, thoughtful design, responsible AI and deep attention to real-world workflows — starting in Ethiopia, built for a wider world.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 14px; align-items: center;">
          <a href="/contact_us/" class="serk-btn-primary" style="padding: 13px 28px; font-size: 15px;">Discuss Your Project</a>
          <a href="#solutions" class="serk-btn-secondary" style="padding: 13px 28px; font-size: 15px;">Explore Our Solutions</a>
        </div>
        <!-- Micro-trust line -->
        <div style="margin-top: 36px; padding-top: 24px; border-top: 1px solid #DEE6E0; display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; font-size: 12.5px; color: #5B6761; font-weight: 600;">
          <span>Custom Software</span>
          <span style="color: #DEE6E0;">·</span>
          <span>Enterprise Systems</span>
          <span style="color: #DEE6E0;">·</span>
          <span>Digital Presence</span>
          <span style="color: #DEE6E0;">·</span>
          <span>Applied AI</span>
          <span style="color: #DEE6E0;">·</span>
          <span>Cloud &amp; Security</span>
        </div>
      </div>

      <!-- Hero Right: Realistic Sharp-Framed UI Preview (SERK Construction Intelligence OS) -->
      <div>
        <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; box-shadow: 0 16px 36px rgba(16, 21, 19, 0.08); overflow: hidden;">
          <!-- Window Title Bar -->
          <div style="height: 38px; background: #F4F7F5; border-bottom: 1px solid #DEE6E0; display: flex; align-items: center; justify-content: space-between; padding: 0 16px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #DEE6E0; display: inline-block;"></span>
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #DEE6E0; display: inline-block;"></span>
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #DEE6E0; display: inline-block;"></span>
              <span style="font-size: 12px; font-weight: 600; color: #101513; margin-left: 8px;">SERK Construction OS — BOQ &amp; Cost Control</span>
            </div>
            <span style="display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 4px; font-size: 10.5px; font-weight: 700; background: #EAF3EF; color: #0D4634; border: 1px solid #B8D5C8;">
              <span style="width: 5px; height: 5px; border-radius: 50%; background: #0D4634;"></span> LIVE SYNC
            </span>
          </div>

          <!-- KPI Metric Row -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); border-bottom: 1px solid #DEE6E0; background: #FFFFFF;">
            <div style="padding: 12px 16px; border-right: 1px solid #DEE6E0; border-bottom: 1px solid #DEE6E0;">
              <div style="font-size: 11px; font-weight: 600; color: #5B6761; margin-bottom: 2px;">Baseline Contract</div>
              <div style="font-size: 15px; font-weight: 700; color: #101513;">ETB 142.85M</div>
              <div style="font-size: 10.5px; color: #5B6761;">Approved Tender</div>
            </div>
            <div style="padding: 12px 16px; border-bottom: 1px solid #DEE6E0;">
              <div style="font-size: 11px; font-weight: 600; color: #5B6761; margin-bottom: 2px;">Committed Cost</div>
              <div style="font-size: 15px; font-weight: 700; color: #0D4634;">ETB 89.42M</div>
              <div style="font-size: 10.5px; color: #0D4634;">62.6% Expended</div>
            </div>
            <div style="padding: 12px 16px; border-right: 1px solid #DEE6E0;">
              <div style="font-size: 11px; font-weight: 600; color: #5B6761; margin-bottom: 2px;">Variance Forecast</div>
              <div style="font-size: 15px; font-weight: 700; color: #2D735A;">-3.2% Favorable</div>
              <div style="font-size: 10.5px; color: #2D735A;">ETB 138.2M Projected</div>
            </div>
            <div style="padding: 12px 16px;">
              <div style="font-size: 11px; font-weight: 600; color: #5B6761; margin-bottom: 2px;">Takeoff Audit</div>
              <div style="font-size: 15px; font-weight: 700; color: #101513;">34 / 34 Reqs</div>
              <div style="font-size: 10.5px; color: #5B6761;">Zero Open Discrepancies</div>
            </div>
          </div>

          <!-- BOQ Line Items Table -->
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left;">
              <thead>
                <tr style="background: #F4F7F5; border-bottom: 1px solid #DEE6E0; color: #5B6761; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                  <th style="padding: 9px 12px;">WBS</th>
                  <th style="padding: 9px 12px;">Item Description</th>
                  <th style="padding: 9px 12px;">Unit</th>
                  <th style="padding: 9px 12px;">Rate (ETB)</th>
                  <th style="padding: 9px 12px;">Total (ETB)</th>
                  <th style="padding: 9px 12px;">Status</th>
                </tr>
              </thead>
              <tbody style="color: #101513;">
                <tr style="border-bottom: 1px solid #F0F4F2;">
                  <td style="padding: 9px 12px; font-weight: 600;">01.02</td>
                  <td style="padding: 9px 12px;">Substructure C-30 Concrete</td>
                  <td style="padding: 9px 12px; color: #5B6761;">m³</td>
                  <td style="padding: 9px 12px;">14,800.00</td>
                  <td style="padding: 9px 12px; font-weight: 700; color: #0D4634;">21,460,000.00</td>
                  <td style="padding: 9px 12px;"><span class="serk-badge serk-badge-production">Verified</span></td>
                </tr>
                <tr style="border-bottom: 1px solid #F0F4F2; background: #FAFCFA;">
                  <td style="padding: 9px 12px; font-weight: 600;">02.04</td>
                  <td style="padding: 9px 12px;">High-Yield Rebar Grade 60</td>
                  <td style="padding: 9px 12px; color: #5B6761;">Ton</td>
                  <td style="padding: 9px 12px;">165,000.00</td>
                  <td style="padding: 9px 12px; font-weight: 700; color: #0D4634;">47,091,000.00</td>
                  <td style="padding: 9px 12px;"><span class="serk-badge serk-badge-production">Locked</span></td>
                </tr>
                <tr style="border-bottom: 1px solid #F0F4F2;">
                  <td style="padding: 9px 12px; font-weight: 600;">03.01</td>
                  <td style="padding: 9px 12px;">Precast Block Formwork</td>
                  <td style="padding: 9px 12px; color: #5B6761;">m²</td>
                  <td style="padding: 9px 12px;">2,450.00</td>
                  <td style="padding: 9px 12px; font-weight: 700; color: #0D4634;">11,809,000.00</td>
                  <td style="padding: 9px 12px;"><span class="serk-badge serk-badge-pilot">In Progress</span></td>
                </tr>
                <tr>
                  <td style="padding: 9px 12px; font-weight: 600;">04.12</td>
                  <td style="padding: 9px 12px;">MEP Conduiting First Fix</td>
                  <td style="padding: 9px 12px; color: #5B6761;">Lot</td>
                  <td style="padding: 9px 12px;">8,240,000.00</td>
                  <td style="padding: 9px 12px; font-weight: 700; color: #0D4634;">8,240,000.00</td>
                  <td style="padding: 9px 12px;"><span class="serk-badge serk-badge-production">Verified</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Bottom Audit Status Bar -->
          <div style="background: #F4F7F5; border-top: 1px solid #DEE6E0; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #5B6761;">
            <div>
              <strong>Audit:</strong> SHA256:7A2F &bull; <strong>Approval:</strong> Solomon G. (Lead QS) &bull; 09:42 EAT
            </div>
            <div style="font-weight: 700; color: #101513;">
              ETB 88,600,000.00
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========================================================
     2. "OUR SOLUTIONS" CARDS (Clean White/Mist, 1px Borders)
     ======================================================== -->
<section id="solutions" style="padding: 88px 0; background: #F4F7F5; border-bottom: 1px solid #DEE6E0;">
  <div style="max-width: 1240px; margin: 0 auto; padding: 0 24px;">
    <div style="max-width: 760px; margin-bottom: 44px;">
      <span style="display: inline-block; font-size: 11.5px; font-weight: 700; color: #0D4634; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">PRODUCT ECOSYSTEM</span>
      <h2 style="font-size: 2.4rem; font-weight: 700; color: #101513; margin: 0 0 14px 0; letter-spacing: -0.02em;">
        Developing Connected Platforms for Complex Problems
      </h2>
      <p style="font-size: 1.05rem; line-height: 1.65; color: #5B6761; margin: 0;">
        From single-counter retail checkouts to multi-hospital clinical coordination and multi-million Birr construction tenders, SERK platforms are engineered for high-availability operational reality.
      </p>
    </div>

    <!-- 6 Clean Solution Cards -->
    <div class="serk-solutions-grid">
      <!-- Card 1 -->
      <div class="serk-solution-card">
        <div class="serk-card-preview">
          <img src="/wp-content/uploads/serk/serk-svc-construction.svg" alt="SERK Construction Intelligence OS">
        </div>
        <div class="serk-card-content">
          <div>
            <span class="serk-badge serk-badge-production">Production Available</span>
            <h3 class="serk-card-title">Construction Intelligence OS</h3>
            <p class="serk-card-desc">End-to-end site management, BOQ takeoff automation, subcontractor tracking, and real-time ETB cost variance intelligence.</p>
          </div>
          <div style="margin-top: 14px;">
            <a href="/products/#construction" class="serk-card-link">Explore Platform &rarr;</a>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="serk-solution-card">
        <div class="serk-card-preview">
          <img src="/wp-content/uploads/serk/serk-svc-hospital.svg" alt="SERK Health OS">
        </div>
        <div class="serk-card-content">
          <div>
            <span class="serk-badge serk-badge-pilot">Pilot Program</span>
            <h3 class="serk-card-title">Health OS &amp; Hospital Management</h3>
            <p class="serk-card-desc">Unified clinical workflows connecting patient triage, electronic health records (EHR), pharmacy dispensing, and laboratory orders.</p>
          </div>
          <div style="margin-top: 14px;">
            <a href="/products/#hms" class="serk-card-link">Explore Platform &rarr;</a>
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="serk-solution-card">
        <div class="serk-card-preview">
          <img src="/wp-content/uploads/serk/serk-svc-business.svg" alt="SERK Connected Finance">
        </div>
        <div class="serk-card-content">
          <div>
            <span class="serk-badge serk-badge-pilot">Pilot Program</span>
            <h3 class="serk-card-title">Connected Finance &amp; Ledgers</h3>
            <p class="serk-card-desc">Connected general ledgers, automated multi-bank reconciliation, transaction anomaly cues, and closed-loop audit trails.</p>
          </div>
          <div style="margin-top: 14px;">
            <a href="/products/#finance" class="serk-card-link">Explore Platform &rarr;</a>
          </div>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="serk-solution-card">
        <div class="serk-card-preview">
          <img src="/wp-content/uploads/serk/serk-photo-pos.jpg" alt="SERK POS Retail" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="serk-card-content">
          <div>
            <span class="serk-badge serk-badge-production">Production Available</span>
            <h3 class="serk-card-title">POS &amp; Retail Intelligence</h3>
            <p class="serk-card-desc">High-speed counter checkout, recipe-level inventory depletion, multi-branch synchronization, and end-of-day cash reconciliation.</p>
          </div>
          <div style="margin-top: 14px;">
            <a href="/products/#pos" class="serk-card-link">Explore Platform &rarr;</a>
          </div>
        </div>
      </div>

      <!-- Card 5 -->
      <div class="serk-solution-card">
        <div class="serk-card-preview">
          <img src="/wp-content/uploads/serk/serk-photo-lobby.jpg" alt="SERK Office OS" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="serk-card-content">
          <div>
            <span class="serk-badge serk-badge-alpha">In Development</span>
            <h3 class="serk-card-title">Office OS &amp; Administration</h3>
            <p class="serk-card-desc">Unified workplace operations integrating Gregorian &amp; Ethiopian calendars, biometric attendance, payroll, and asset custody.</p>
          </div>
          <div style="margin-top: 14px;">
            <a href="/products/#office" class="serk-card-link">Explore Platform &rarr;</a>
          </div>
        </div>
      </div>

      <!-- Card 6 -->
      <div class="serk-solution-card">
        <div class="serk-card-preview">
          <img src="/wp-content/uploads/serk/serk-post-automation.svg" alt="SERK Workflow Automation">
        </div>
        <div class="serk-card-content">
          <div>
            <span class="serk-badge serk-badge-production">Production Available</span>
            <h3 class="serk-card-title">Workflow Automation &amp; APIs</h3>
            <p class="serk-card-desc">Purpose-built integrations, document extraction pipelines, and deterministic automation workflows with mandatory human approvals.</p>
          </div>
          <div style="margin-top: 14px;">
            <a href="/services/" class="serk-card-link">Explore Platform &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========================================================
     3. "WHY CHOOSE SERK" - 3 ARCHITECTURAL PILLARS
     ======================================================== -->
<section style="padding: 88px 0; background: #FFFFFF; border-bottom: 1px solid #DEE6E0;">
  <div style="max-width: 1240px; margin: 0 auto; padding: 0 24px;">
    <div style="max-width: 760px; margin-bottom: 44px;">
      <span style="display: inline-block; font-size: 11.5px; font-weight: 700; color: #0D4634; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">ENGINEERING FOUNDATIONS</span>
      <h2 style="font-size: 2.4rem; font-weight: 700; color: #101513; margin: 0 0 14px 0; letter-spacing: -0.02em;">
        Why Organizations Build With SERK Group
      </h2>
      <p style="font-size: 1.05rem; line-height: 1.65; color: #5B6761; margin: 0;">
        We replace generic AI hype and brittle templates with three battle-tested architectural pillars designed for high-stakes operational environments.
      </p>
    </div>

    <!-- 3 Sharp Architectural Pillars -->
    <div class="serk-pillars-grid">
      <!-- Pillar 1 -->
      <div class="serk-pillar-card">
        <div class="serk-pillar-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>
        </div>
        <h3 class="serk-pillar-title">Offline-Resilient Architecture</h3>
        <p style="font-size: 12.5px; font-weight: 600; color: #0D4634; margin: 0 0 10px 0;">Engineered for real-world regional connectivity.</p>
        <p class="serk-pillar-desc">
          Systems maintain full local transaction integrity during fiber cuts and power fluctuations, queuing operations cryptographically and synchronizing bi-directionally when connectivity restores. No halted sales, stranded clinical queues, or stalled jobsites.
        </p>
      </div>

      <!-- Pillar 2 -->
      <div class="serk-pillar-card">
        <div class="serk-pillar-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <h3 class="serk-pillar-title">End-to-End Auditability</h3>
        <p style="font-size: 12.5px; font-weight: 600; color: #0D4634; margin: 0 0 10px 0;">Every BOQ, invoice, and clinical handoff traced.</p>
        <p class="serk-pillar-desc">
          Immutable revision trails record the actor, timestamp, input parameters, and authorization level for every critical action. Eliminates unexplainable variances in construction budgets, financial statements, and healthcare records.
        </p>
      </div>

      <!-- Pillar 3 -->
      <div class="serk-pillar-card">
        <div class="serk-pillar-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>
        </div>
        <h3 class="serk-pillar-title">Human-in-the-Loop AI</h3>
        <p style="font-size: 12.5px; font-weight: 600; color: #0D4634; margin: 0 0 10px 0;">Practical automation with explicit operator approval.</p>
        <p class="serk-pillar-desc">
          Automation handles data collation, rate lookup, classification, and anomaly flagging—while final decisions remain under human command. No unsupervised black-box decisions in clinical care, payments, or structural estimations.
        </p>
      </div>
    </div>
  </div>
</section>
'''

h_new = h[:start_pos] + hero_and_solutions_html + h[end_pos:]
open(path, 'w', encoding='utf-8').write(h_new)
print("Home page sections rebuilt successfully!")
