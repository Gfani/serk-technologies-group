#!/usr/bin/env python3
"""Generate the new primary pages (Products, Industries, Ventures, Privacy, Terms)
using the authentic Elementor shell from original/services/index.html.
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIG = os.path.join(ROOT, 'original')
TEMPLATE_PATH = os.path.join(ORIG, 'services', 'index.html')

template = open(TEMPLATE_PATH, encoding='utf-8').read()

# Locate header end and footer start
start_marker = '<div data-elementor-type="wpr-theme-builder"'
footer_marker = '<div data-elementor-type="wp-post" data-elementor-id="1175"'

idx_start = template.find(start_marker)
idx_footer = template.find(footer_marker)

header_part = template[:idx_start]
footer_part = template[idx_footer:]

def make_shell(title, h1_text, eyebrow, lead_p, body_sections):
    content_html = f'''
<div data-elementor-type="wp-page" class="elementor elementor-custom-page">
    <!-- Hero Section -->
    <section class="elementor-section elementor-top-section elementor-section-boxed" style="padding: 100px 20px 60px 20px; background: #FFFFFF; border-bottom: 1px solid #DEE6E0;">
        <div class="elementor-container" style="max-width: 1200px; margin: 0 auto;">
            <div style="max-width: 840px;">
                <span style="display: inline-block; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em; color: #0D4634; text-transform: uppercase; margin-bottom: 14px;">{eyebrow}</span>
                <h1 class="elementor-heading-title" style="font-size: 2.8rem; font-weight: 700; line-height: 1.15; color: #101513; margin: 0 0 20px 0; letter-spacing: -0.02em;">{h1_text}</h1>
                <p style="font-size: 1.15rem; line-height: 1.7; color: #5B6761; margin: 0 0 24px 0;">{lead_p}</p>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <main style="padding: 60px 20px 100px 20px; background: #FCFCFE;">
        <div style="max-width: 1200px; margin: 0 auto;">
            {body_sections}
        </div>
    </main>
</div>
'''
    full_html = header_part + content_html + footer_part
    full_html = re.sub(r'<title>.*?</title>', f'<title>{title} | SERK Technologies Group</title>', full_html, count=1, flags=re.S)
    return full_html


# -------------------------------------------------------------
# 1. PRODUCTS OVERVIEW
# -------------------------------------------------------------
products_body = '''
<!-- Group 1: Enterprise & Operations -->
<div style="margin-bottom: 60px;">
    <div style="border-bottom: 2px solid #0D4634; padding-bottom: 12px; margin-bottom: 30px;">
        <h2 style="font-size: 1.8rem; font-weight: 700; color: #101513; margin: 0;">Enterprise &amp; Operations</h2>
        <p style="color: #5B6761; margin: 4px 0 0 0;">Connected systems that streamline daily operations, records, sales, and supplies.</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 24px;">
        <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="height: 160px; overflow: hidden; border-radius: 6px; margin-bottom: 16px;">
                    <img src="/wp-content/uploads/serk/serk-photo-lobby.jpg" alt="SERK Workplace OS" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <span class="serk-badge serk-badge-alpha"><span>Internal Alpha / Development</span></span>
                <h3 style="font-size: 1.35rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0;">SERK Office OS</h3>
                <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Unified workplace operating system connecting attendance, Gregorian &amp; Ethiopian calendars, payroll, asset registers, and project task boards.</p>
            </div>
            <div style="margin-top: 20px;">
                <a href="/contact_us/?interest=office" class="elementor-button" style="padding: 10px 18px; font-size: 0.9rem; text-decoration: none; display: inline-block;">Discuss Workplace OS</a>
            </div>
        </div>
        <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="height: 160px; overflow: hidden; border-radius: 6px; margin-bottom: 16px; background: #F8FAFC; display: flex; align-items: center; justify-content: center; border: 1px solid #E2E8F0;">
                    <img src="/wp-content/uploads/serk/serk-svc-business.svg" alt="SERK Connected Finance Ledgers" style="max-height: 130px; width: auto;">
                </div>
                <span class="serk-badge serk-badge-pilot"><span>Pilot / Private Beta</span></span>
                <h3 style="font-size: 1.35rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0;">SERK Finance</h3>
                <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Connected ledgers, automated transaction matching, and anomaly cues with transparent verification for calm, accurate month-end closes.</p>
            </div>
            <div style="margin-top: 20px;">
                <a href="/contact_us/?interest=finance" class="elementor-button" style="padding: 10px 18px; font-size: 0.9rem; text-decoration: none; display: inline-block;">Plan Finance Digitization</a>
            </div>
        </div>
        <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="height: 160px; overflow: hidden; border-radius: 6px; margin-bottom: 16px;">
                    <img src="/wp-content/uploads/serk/serk-photo-pos.jpg" alt="SERK POS in Retail &amp; Hospitality" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <span class="serk-badge serk-badge-production"><span>Production Available</span></span>
                <h3 style="font-size: 1.35rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0;">SERK POS &amp; Retail</h3>
                <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Fast, reliable checkout for counters, live inventory depletion, recipe cost intelligence, and multi-branch management for shops and restaurants.</p>
            </div>
            <div style="margin-top: 20px;">
                <a href="/contact_us/?interest=pos" class="elementor-button" style="padding: 10px 18px; font-size: 0.9rem; text-decoration: none; display: inline-block;">Request a POS Walkthrough</a>
            </div>
        </div>
        <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="height: 160px; overflow: hidden; border-radius: 6px; margin-bottom: 16px; background: #F8FAFC; display: flex; align-items: center; justify-content: center; border: 1px solid #E2E8F0;">
                    <img src="/wp-content/uploads/serk/serk-platforms.svg" alt="SERK Materials Supply Chain" style="max-height: 130px; width: auto;">
                </div>
                <span class="serk-badge serk-badge-alpha"><span>Internal Alpha / Development</span></span>
                <h3 style="font-size: 1.35rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0;">SERK Materials</h3>
                <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Supply-chain and building material operations: unit/grade catalogues, supplier RFQs, multi-branch stock, and contractor credit limits.</p>
            </div>
            <div style="margin-top: 20px;">
                <a href="/contact_us/?interest=materials" class="elementor-button" style="padding: 10px 18px; font-size: 0.9rem; text-decoration: none; display: inline-block;">Modernize Materials Supply</a>
            </div>
        </div>
    </div>
</div>

<!-- Group 2: Sector Intelligence -->
<div style="margin-bottom: 60px;">
    <div style="border-bottom: 2px solid #0D4634; padding-bottom: 12px; margin-bottom: 30px;">
        <h2 style="font-size: 1.8rem; font-weight: 700; color: #101513; margin: 0;">Sector Intelligence</h2>
        <p style="color: #5B6761; margin: 4px 0 0 0;">Domain-specific platforms engineering decisions for healthcare and construction.</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 24px;">
        <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="height: 160px; overflow: hidden; border-radius: 6px; margin-bottom: 16px;">
                    <img src="/wp-content/uploads/serk/serk-photo-construction.jpg" alt="Construction Intelligence on Active Sites" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <span class="serk-badge serk-badge-pilot"><span>Pilot / Private Beta</span></span>
                <h3 style="font-size: 1.35rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0;">Construction Intelligence OS</h3>
                <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Unified construction management connecting drawing takeoff, priced BOQs, site progress, subcontractor procurement, and payment certificates.</p>
            </div>
            <div style="margin-top: 20px;">
                <a href="/contact_us/?interest=construction" class="elementor-button" style="padding: 10px 18px; font-size: 0.9rem; text-decoration: none; display: inline-block;">Explore Construction OS</a>
            </div>
        </div>
        <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="height: 160px; overflow: hidden; border-radius: 6px; margin-bottom: 16px;">
                    <img src="/wp-content/uploads/serk/serk-photo-engineering.jpg" alt="5D Engineering R&amp;D Studio" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <span class="serk-badge serk-badge-alpha"><span>Research &amp; Innovation</span></span>
                <h3 style="font-size: 1.35rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0;">5D Engineering Lab</h3>
                <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Specialist estimating R&amp;D exploring model-assisted takeoff, IFC/BIM quantity mapping, and auditable rate analysis libraries.</p>
            </div>
            <div style="margin-top: 20px;">
                <a href="/contact_us/?interest=construction" class="elementor-button" style="padding: 10px 18px; font-size: 0.9rem; text-decoration: none; display: inline-block;">See Estimating Research</a>
            </div>
        </div>
        <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="height: 160px; overflow: hidden; border-radius: 6px; margin-bottom: 16px;">
                    <img src="/wp-content/uploads/serk/serk-photo-health.jpg" alt="Healthcare Management &amp; Patient Encounters" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <span class="serk-badge serk-badge-pilot"><span>Pilot / Private Beta</span></span>
                <h3 style="font-size: 1.35rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0;">SERK Health OS</h3>
                <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Comprehensive hospital management coordinating patient registration, clinical encounters, lab sample workflows, pharmacy, and billing.</p>
            </div>
            <div style="margin-top: 20px;">
                <a href="/contact_us/?interest=health" class="elementor-button" style="padding: 10px 18px; font-size: 0.9rem; text-decoration: none; display: inline-block;">Discuss Health OS</a>
            </div>
        </div>
        <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="height: 160px; overflow: hidden; border-radius: 6px; margin-bottom: 16px; background: #F8FAFC; display: flex; align-items: center; justify-content: center; border: 1px solid #E2E8F0;">
                    <img src="/wp-content/uploads/serk/serk-svc-hospital.svg" alt="SERK Modular Clinic Software" style="max-height: 130px; width: auto;">
                </div>
                <span class="serk-badge serk-badge-pilot"><span>Pilot / Private Beta</span></span>
                <h3 style="font-size: 1.35rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0;">SERK Clinic OS</h3>
                <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Modular practice management designed for dental and multi-specialty clinics: tooth charting, procedure plans, clinical images, and recall prompts.</p>
            </div>
            <div style="margin-top: 20px;">
                <a href="/contact_us/?interest=health" class="elementor-button" style="padding: 10px 18px; font-size: 0.9rem; text-decoration: none; display: inline-block;">Book Clinic Demo</a>
            </div>
        </div>
    </div>
</div>

<!-- Group 3: AI & Security Research -->
<div>
    <div style="border-bottom: 2px solid #0D4634; padding-bottom: 12px; margin-bottom: 30px;">
        <h2 style="font-size: 1.8rem; font-weight: 700; color: #101513; margin: 0;">AI &amp; Security Research</h2>
        <p style="color: #5B6761; margin: 4px 0 0 0;">Engineering foundations for multi-model governance, cybersecurity, and controlled automation.</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 24px;">
        <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <span class="serk-badge serk-badge-alpha"><span>Research &amp; Innovation</span></span>
                <h3 style="font-size: 1.35rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0;">SERK QUORUM</h3>
                <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Multi-AI engineering and orchestration framework: model routing, citation provenance, and structured decision records with humans in the loop.</p>
            </div>
            <div style="margin-top: 20px;">
                <a href="/contact_us/?interest=ai" class="elementor-button" style="padding: 10px 18px; font-size: 0.9rem; text-decoration: none; display: inline-block;">Explore QUORUM</a>
            </div>
        </div>
        <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <span class="serk-badge serk-badge-alpha"><span>Research &amp; Innovation</span></span>
                <h3 style="font-size: 1.35rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0;">SERK Sentinel AI &amp; Cyber Labs</h3>
                <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Security architecture review, API hardening, threat modeling, and defensive observability for cloud systems and AI application boundaries.</p>
            </div>
            <div style="margin-top: 20px;">
                <a href="/contact_us/?interest=ai" class="elementor-button" style="padding: 10px 18px; font-size: 0.9rem; text-decoration: none; display: inline-block;">Discuss Security Readiness</a>
            </div>
        </div>
    </div>
</div>
'''

# -------------------------------------------------------------
# 2. INDUSTRIES OVERVIEW
# -------------------------------------------------------------
industries_body = '''
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;">
    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <div style="height: 180px; overflow: hidden; border-radius: 6px; margin-bottom: 20px;">
                <img src="/wp-content/uploads/serk/serk-photo-lobby.jpg" alt="Hospitality &amp; Hotel Operations" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #0D4634; text-transform: uppercase;">Hospitality</span>
            <h3 style="font-size: 1.45rem; font-weight: 700; color: #101513; margin: 8px 0 12px 0;">Hotels, Resorts &amp; Guesthouses</h3>
            <p style="font-size: 1rem; color: #5B6761; line-height: 1.6; margin-bottom: 16px;">Better guest journeys. Better control behind the scenes. From online room reservation and front desk check-in to restaurant billing and automated daily summaries.</p>
            <ul style="color: #5B6761; font-size: 0.95rem; line-height: 1.7; padding-left: 20px; margin-bottom: 24px;">
                <li>Direct booking engines and front-desk reservation management</li>
                <li>Restaurant &amp; bar POS linked directly to room folio</li>
                <li>Housekeeping dispatch and maintenance status tracking</li>
            </ul>
        </div>
        <div>
            <a href="/contact_us/?interest=pos" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">Consult Hotel Specialist</a>
        </div>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <div style="height: 180px; overflow: hidden; border-radius: 6px; margin-bottom: 20px;">
                <img src="/wp-content/uploads/serk/serk-photo-health.jpg" alt="Healthcare &amp; Hospital Operations" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #0D4634; text-transform: uppercase;">Healthcare</span>
            <h3 style="font-size: 1.45rem; font-weight: 700; color: #101513; margin: 8px 0 12px 0;">Hospitals &amp; Multi-Specialty Clinics</h3>
            <p style="font-size: 1rem; color: #5B6761; line-height: 1.6; margin-bottom: 16px;">One connected journey — from first appointment to follow-up. Eliminating paper fragmentation while protecting clinical records and patient safety.</p>
            <ul style="color: #5B6761; font-size: 0.95rem; line-height: 1.7; padding-left: 20px; margin-bottom: 24px;">
                <li>Patient registration, queue management, and triage history</li>
                <li>Doctor consultations, e-prescriptions, and lab investigation sync</li>
                <li>Pharmacy stock control and multi-tier billing reconciliation</li>
            </ul>
        </div>
        <div>
            <a href="/contact_us/?interest=health" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">Talk to Healthcare Specialist</a>
        </div>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <div style="height: 180px; overflow: hidden; border-radius: 6px; margin-bottom: 20px;">
                <img src="/wp-content/uploads/serk/serk-photo-pos.jpg" alt="Cafés &amp; Food Service POS" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #0D4634; text-transform: uppercase;">Food Service</span>
            <h3 style="font-size: 1.45rem; font-weight: 700; color: #101513; margin: 8px 0 12px 0;">Cafés, Restaurants &amp; Bakeries</h3>
            <p style="font-size: 1rem; color: #5B6761; line-height: 1.6; margin-bottom: 16px;">From the first order to the last daily report. Designed for the real pressure of busy sales counters and production kitchens.</p>
            <ul style="color: #5B6761; font-size: 0.95rem; line-height: 1.7; padding-left: 20px; margin-bottom: 24px;">
                <li>Fast counter POS with kitchen display &amp; ticket printing</li>
                <li>Recipe BOM costing and live ingredient stock depletion</li>
                <li>Central store to branch replenishment and end-of-day cash reconciliation</li>
            </ul>
        </div>
        <div>
            <a href="/contact_us/?interest=pos" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">Get a Food Service Demo</a>
        </div>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <div style="height: 180px; overflow: hidden; border-radius: 6px; margin-bottom: 20px;">
                <img src="/wp-content/uploads/serk/serk-photo-construction.jpg" alt="Contractors &amp; Civil Engineering" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #0D4634; text-transform: uppercase;">Construction</span>
            <h3 style="font-size: 1.45rem; font-weight: 700; color: #101513; margin: 8px 0 12px 0;">Contractors &amp; Engineering Firms</h3>
            <p style="font-size: 1rem; color: #5B6761; line-height: 1.6; margin-bottom: 16px;">Know the cost, the progress and the next decision. Connecting estimating, project budgets, procurement, and payment certificates.</p>
            <ul style="color: #5B6761; font-size: 0.95rem; line-height: 1.7; padding-left: 20px; margin-bottom: 24px;">
                <li>Rapid tender estimating with traceable rate build-ups</li>
                <li>Subcontractor contracts, material requisitions, and purchase orders</li>
                <li>Interim Payment Certificates (IPC) linked directly to actual cost</li>
            </ul>
        </div>
        <div>
            <a href="/contact_us/?interest=construction" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">Explore Construction Systems</a>
        </div>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <div style="height: 180px; overflow: hidden; border-radius: 6px; margin-bottom: 20px;">
                <img src="/wp-content/uploads/serk/serk-photo-engineering.jpg" alt="Materials Distribution Operations" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #0D4634; text-transform: uppercase;">Distribution</span>
            <h3 style="font-size: 1.45rem; font-weight: 700; color: #101513; margin: 8px 0 12px 0;">Building Material Suppliers &amp; Yards</h3>
            <p style="font-size: 1rem; color: #5B6761; line-height: 1.6; margin-bottom: 16px;">Every item accounted for, from supplier to site. Managing units, branches, price fluctuations, customer credit, and deliveries.</p>
            <ul style="color: #5B6761; font-size: 0.95rem; line-height: 1.7; padding-left: 20px; margin-bottom: 24px;">
                <li>Multi-location warehouse stock visibility</li>
                <li>Quotation-to-invoice workflows with contractor credit limits</li>
                <li>Delivery dispatch coordination and status logging</li>
            </ul>
        </div>
        <div>
            <a href="/contact_us/?interest=materials" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">Modernize Materials Operations</a>
        </div>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <div style="height: 180px; overflow: hidden; border-radius: 6px; margin-bottom: 20px; background: #F8FAFC; display: flex; align-items: center; justify-content: center; border: 1px solid #E2E8F0;">
                <img src="/wp-content/uploads/serk/serk-why.svg" alt="Real Estate Property Management" style="max-height: 140px; width: auto;">
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #0D4634; text-transform: uppercase;">Property</span>
            <h3 style="font-size: 1.45rem; font-weight: 700; color: #101513; margin: 8px 0 12px 0;">Real Estate &amp; Property Enterprises</h3>
            <p style="font-size: 1rem; color: #5B6761; line-height: 1.6; margin-bottom: 16px;">Clear visibility across properties, people and payments. Managing units, tenant leases, receivables, and maintenance in one place.</p>
            <ul style="color: #5B6761; font-size: 0.95rem; line-height: 1.7; padding-left: 20px; margin-bottom: 24px;">
                <li>Unit inventory, leasing schedules, and tenant CRM</li>
                <li>Payment plan tracking, collection alerts, and bank receipts</li>
                <li>Maintenance requests and property portfolio analytics</li>
            </ul>
        </div>
        <div>
            <a href="/contact_us/?interest=realestate" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">Discuss Real Estate Systems</a>
        </div>
    </div>
</div>
'''

# -------------------------------------------------------------
# 3. VENTURES OVERVIEW
# -------------------------------------------------------------
ventures_body = '''
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;">
    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <span class="serk-badge serk-badge-pilot"><span>Pilot Launch Preparation · Mekelle</span></span>
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #101513; margin: 12px 0 8px 0;">Segar Ride</h3>
            <p style="font-size: 0.85rem; font-weight: 600; color: #0D4634; text-transform: uppercase; margin-bottom: 14px;">Intelligent Urban Mobility</p>
            <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Designed around accessible, accountable urban transport. Connecting passenger ride requests with trusted driver networks across Mekelle, with clear pricing, live routing, and verifiable receipts.</p>
        </div>
        <div style="margin-top: 24px;">
            <a href="/contact_us/?interest=mobility" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">Discover Segar Mobility</a>
        </div>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <span class="serk-badge serk-badge-alpha"><span>Platform Development</span></span>
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #101513; margin: 12px 0 8px 0;">Segar Delivery &amp; Express</h3>
            <p style="font-size: 0.85rem; font-weight: 600; color: #0D4634; text-transform: uppercase; margin-bottom: 14px;">Commercial &amp; Urban Logistics</p>
            <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Moving packages as reliably as people. Connecting merchants, restaurants, and retail stores with motorcycle and vehicle couriers, real-time milestones, and digital proof of delivery.</p>
        </div>
        <div style="margin-top: 24px;">
            <a href="/contact_us/?interest=mobility" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">Explore Delivery Partnerships</a>
        </div>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <span class="serk-badge serk-badge-alpha"><span>Heritage Technology Initiative</span></span>
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #101513; margin: 12px 0 8px 0;">Visit Tigray</h3>
            <p style="font-size: 0.85rem; font-weight: 600; color: #0D4634; text-transform: uppercase; margin-bottom: 14px;">Digital Tourism &amp; Cultural Heritage</p>
            <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Promoting heritage discovery, site itineraries, and authentic storytelling. Connecting travelers with regional destinations, historical knowledge, and licensed local guides.</p>
        </div>
        <div style="margin-top: 24px;">
            <a href="/contact_us/?interest=tourism" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">Explore the Initiative</a>
        </div>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <span class="serk-badge serk-badge-pilot" style="color: #9A5B20; border-color: rgba(154, 91, 32, 0.3);"><span>Regulatory &amp; Legal Approval Gate</span></span>
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #101513; margin: 12px 0 8px 0;">LO Africa</h3>
            <p style="font-size: 0.85rem; font-weight: 600; color: #0D4634; text-transform: uppercase; margin-bottom: 14px;">Digital Commerce Platform</p>
            <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">A consumer lowest-unique-bid platform concept based on transparent mechanics, participant account controls, and audited outcomes. Maintained under regulatory review prior to commercial release.</p>
        </div>
        <div style="margin-top: 24px;">
            <a href="/contact_us/?interest=other" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">Learn About the Platform</a>
        </div>
    </div>

    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <span class="serk-badge serk-badge-alpha"><span>Strategic Concept &amp; Feasibility</span></span>
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #101513; margin: 12px 0 8px 0;">Future Hardware &amp; Mobility</h3>
            <p style="font-size: 0.85rem; font-weight: 600; color: #0D4634; text-transform: uppercase; margin-bottom: 14px;">Industrial &amp; Clean Energy Research</p>
            <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">Exploring energy accessories, battery storage, and technical feasibility studies for regional vehicle assembly and hardware innovation.</p>
        </div>
        <div style="margin-top: 24px;">
            <a href="/contact_us/?interest=other" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">Industrial Inquiries</a>
        </div>
    </div>
</div>
'''

# -------------------------------------------------------------
# 4. PRIVACY POLICY
# -------------------------------------------------------------
privacy_body = '''
<div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 40px; max-width: 900px; margin: 0 auto;">
    <h2 style="font-size: 1.6rem; font-weight: 700; color: #101513; margin-top: 0;">1. Introduction &amp; Commitment</h2>
    <p style="color: #5B6761; line-height: 1.7;">SERK Technologies Group (&ldquo;SERK&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting the privacy of our visitors and clients. In line with our guiding principle of <em>Innovation with Integrity</em>, we operate on a principle of data minimization: we collect only what is strictly necessary to communicate with you, process inquiries, and deliver software services.</p>

    <h2 style="font-size: 1.6rem; font-weight: 700; color: #101513; margin-top: 32px;">2. Information We Collect</h2>
    <p style="color: #5B6761; line-height: 1.7;">When you contact us or request a demonstration through this website, we may collect:</p>
    <ul style="color: #5B6761; line-height: 1.7; padding-left: 20px;">
        <li>Your name and business/organization name</li>
        <li>Your corporate email address and telephone/WhatsApp contact</li>
        <li>Your industry, software interests, and project description</li>
    </ul>

    <h2 style="font-size: 1.6rem; font-weight: 700; color: #101513; margin-top: 32px;">3. How We Use Your Data</h2>
    <p style="color: #5B6761; line-height: 1.7;">Information submitted through this website is used solely to respond to your inquiry, prepare tailored project proposals, provide technical demonstrations, or consider recruitment applications. We never sell, rent, or trade your contact information to third parties.</p>

    <h2 style="font-size: 1.6rem; font-weight: 700; color: #101513; margin-top: 32px;">4. Healthcare &amp; Client Data Safeguards</h2>
    <p style="color: #5B6761; line-height: 1.7;">For our sector platforms such as SERK Health OS, no actual patient data or protected health information is ever processed, stored, or demonstrated on public web servers. Demonstration environments use strictly synthetic, sanitized datasets.</p>

    <h2 style="font-size: 1.6rem; font-weight: 700; color: #101513; margin-top: 32px;">5. Contacting Our Data Stewardship Team</h2>
    <p style="color: #5B6761; line-height: 1.7;">If you have any questions regarding your information or wish to request data correction or deletion, please contact us at:<br>
    <strong>Email:</strong> <a href="mailto:serktechgroup@gmail.com" style="color: #0D4634;">serktechgroup@gmail.com</a><br>
    <strong>Location:</strong> Mekelle, Tigray, Ethiopia</p>
</div>
'''

# -------------------------------------------------------------
# 5. TERMS OF SERVICE
# -------------------------------------------------------------
terms_body = '''
<div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 40px; max-width: 900px; margin: 0 auto;">
    <h2 style="font-size: 1.6rem; font-weight: 700; color: #101513; margin-top: 0;">1. Purpose of This Website</h2>
    <p style="color: #5B6761; line-height: 1.7;">This website is maintained by SERK Technologies Group to provide information about our software platforms, engineering capabilities, digital ventures, and career opportunities. By accessing this site, you agree to these terms.</p>

    <h2 style="font-size: 1.6rem; font-weight: 700; color: #101513; margin-top: 32px;">2. Product Maturity &amp; Capability Disclosures</h2>
    <p style="color: #5B6761; line-height: 1.7;">In accordance with our content governance standards, each platform or venture is labeled with its current maturity stage (Production Available, Pilot/Private Beta, Internal Alpha, or Research &amp; Innovation). Descriptions of planned features represent engineering roadmaps, not completed contractual guarantees.</p>

    <h2 style="font-size: 1.6rem; font-weight: 700; color: #101513; margin-top: 32px;">3. Intellectual Property</h2>
    <p style="color: #5B6761; line-height: 1.7;">All software names, brand logos, vector artwork, documentation, and interface designs published on this website are the intellectual property of SERK Technologies Group and its respective ventures, unless otherwise noted.</p>

    <h2 style="font-size: 1.6rem; font-weight: 700; color: #101513; margin-top: 32px;">4. Engagement &amp; Commercial Proposals</h2>
    <p style="color: #5B6761; line-height: 1.7;">Information on this website does not constitute a binding commercial quotation. Formal implementation scopes, service level agreements (SLAs), and software licensing terms are confirmed exclusively through signed project agreements.</p>

    <h2 style="font-size: 1.6rem; font-weight: 700; color: #101513; margin-top: 32px;">5. Governing Law &amp; Contact</h2>
    <p style="color: #5B6761; line-height: 1.7;">These terms are governed by applicable laws in Ethiopia. For legal inquiries or commercial partnership terms, please contact:<br>
    <strong>Email:</strong> <a href="mailto:serktechgroup@gmail.com" style="color: #0D4634;">serktechgroup@gmail.com</a><br>
    <strong>Office:</strong> Mekelle, Tigray, Ethiopia</p>
</div>
'''


# -------------------------------------------------------------
# 6. MEDIA & VISUAL GALLERY
# -------------------------------------------------------------
gallery_body = '''
<!-- Media Notice Banner -->
<div style="background: #F8FAFC; border: 1px solid #DEE6E0; border-radius: 10px; padding: 24px 30px; margin-bottom: 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
    <div>
        <span style="font-size: 0.8rem; font-weight: 700; color: #0D4634; letter-spacing: 0.08em; text-transform: uppercase;">Corporate Visual Archive · Status Notice</span>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: #101513; margin: 6px 0 4px 0;">Media Slots Reserved for Client Uploads</h3>
        <p style="font-size: 0.92rem; color: #5B6761; margin: 0; max-width: 800px; line-height: 1.6;">Official photography slots are reserved below for upcoming company facilities, engineering workspaces, healthcare and civil deployments. As official media assets are received from the client, they will be cataloged directly into these verified positions.</p>
    </div>
    <div>
        <a href="/contact_us/?interest=other" class="elementor-button" style="padding: 10px 20px; font-size: 0.88rem; text-decoration: none; display: inline-block;">Submit Media Asset</a>
    </div>
</div>

<!-- Parallelogram Category Filter Tabs -->
<div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 40px; justify-content: center;">
    <span class="serk-filter-btn active"><span>All Archive Slots (8 Reserved)</span></span>
    <span class="serk-filter-btn"><span>Headquarters</span></span>
    <span class="serk-filter-btn"><span>Engineering Studios</span></span>
    <span class="serk-filter-btn"><span>Clinical Health</span></span>
    <span class="serk-filter-btn"><span>Civil Infrastructure</span></span>
    <span class="serk-filter-btn"><span>Retail &amp; POS</span></span>
</div>

<!-- Reserved Image Upload Slots Grid -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px; margin-bottom: 60px;">
    <!-- Slot 1: Lobby -->
    <div style="background: #FFFFFF; border: 2px dashed #CBD5E1; border-radius: 12px; padding: 36px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 280px;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: #F1F5F9; color: #0D4634; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 14px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D4634" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </div>
        <div>
            <span class="serk-badge serk-badge-alpha" style="margin-bottom: 10px;"><span>RESERVED · SLOT 01</span></span>
            <h4 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin: 0 0 8px 0;">SERK Headquarters &amp; Reception</h4>
            <p style="font-size: 0.88rem; color: #64748B; margin: 0; line-height: 1.5;">Reserved for official corporate lobby photography in Mekelle, Tigray, Ethiopia.</p>
        </div>
        <div style="margin-top: 18px; font-size: 0.8rem; color: #94A3B8; font-style: italic;">[ Awaiting Client Media Upload ]</div>
    </div>

    <!-- Slot 2: Engineering -->
    <div style="background: #FFFFFF; border: 2px dashed #CBD5E1; border-radius: 12px; padding: 36px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 280px;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: #F1F5F9; color: #0D4634; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 14px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D4634" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </div>
        <div>
            <span class="serk-badge serk-badge-alpha" style="margin-bottom: 10px;"><span>RESERVED · SLOT 02</span></span>
            <h4 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin: 0 0 8px 0;">Software &amp; AI Engineering Studio</h4>
            <p style="font-size: 0.88rem; color: #64748B; margin: 0; line-height: 1.5;">Reserved for software engineering team collaboration and development workspace photography.</p>
        </div>
        <div style="margin-top: 18px; font-size: 0.8rem; color: #94A3B8; font-style: italic;">[ Awaiting Client Media Upload ]</div>
    </div>

    <!-- Slot 3: Healthcare -->
    <div style="background: #FFFFFF; border: 2px dashed #CBD5E1; border-radius: 12px; padding: 36px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 280px;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: #F1F5F9; color: #0D4634; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 14px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D4634" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        <div>
            <span class="serk-badge serk-badge-alpha" style="margin-bottom: 10px;"><span>RESERVED · SLOT 03</span></span>
            <h4 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin: 0 0 8px 0;">Hospital Ward &amp; Clinic Deployment</h4>
            <p style="font-size: 0.88rem; color: #64748B; margin: 0; line-height: 1.5;">Reserved for live SERK Health OS deployment at regional partner hospital and clinics.</p>
        </div>
        <div style="margin-top: 18px; font-size: 0.8rem; color: #94A3B8; font-style: italic;">[ Awaiting Client Media Upload ]</div>
    </div>

    <!-- Slot 4: Construction -->
    <div style="background: #FFFFFF; border: 2px dashed #CBD5E1; border-radius: 12px; padding: 36px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 280px;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: #F1F5F9; color: #0D4634; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 14px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D4634" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        </div>
        <div>
            <span class="serk-badge serk-badge-alpha" style="margin-bottom: 10px;"><span>RESERVED · SLOT 04</span></span>
            <h4 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin: 0 0 8px 0;">Active Commercial Construction Site</h4>
            <p style="font-size: 0.88rem; color: #64748B; margin: 0; line-height: 1.5;">Reserved for site engineers utilizing Construction Intelligence OS on active building sites.</p>
        </div>
        <div style="margin-top: 18px; font-size: 0.8rem; color: #94A3B8; font-style: italic;">[ Awaiting Client Media Upload ]</div>
    </div>

    <!-- Slot 5: POS -->
    <div style="background: #FFFFFF; border: 2px dashed #CBD5E1; border-radius: 12px; padding: 36px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 280px;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: #F1F5F9; color: #0D4634; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 14px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D4634" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        </div>
        <div>
            <span class="serk-badge serk-badge-alpha" style="margin-bottom: 10px;"><span>RESERVED · SLOT 05</span></span>
            <h4 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin: 0 0 8px 0;">Retail &amp; Hospitality POS Counter</h4>
            <p style="font-size: 0.88rem; color: #64748B; margin: 0; line-height: 1.5;">Reserved for live POS register counter and café operations in retail environments.</p>
        </div>
        <div style="margin-top: 18px; font-size: 0.8rem; color: #94A3B8; font-style: italic;">[ Awaiting Client Media Upload ]</div>
    </div>

    <!-- Slot 6: Materials -->
    <div style="background: #FFFFFF; border: 2px dashed #CBD5E1; border-radius: 12px; padding: 36px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 280px;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: #F1F5F9; color: #0D4634; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 14px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D4634" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        </div>
        <div>
            <span class="serk-badge serk-badge-alpha" style="margin-bottom: 10px;"><span>RESERVED · SLOT 06</span></span>
            <h4 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin: 0 0 8px 0;">Materials Warehouse &amp; Logistics Hub</h4>
            <p style="font-size: 0.88rem; color: #64748B; margin: 0; line-height: 1.5;">Reserved for central building materials warehouse stock and distribution fleet photography.</p>
        </div>
        <div style="margin-top: 18px; font-size: 0.8rem; color: #94A3B8; font-style: italic;">[ Awaiting Client Media Upload ]</div>
    </div>

    <!-- Slot 7: Academy -->
    <div style="background: #FFFFFF; border: 2px dashed #CBD5E1; border-radius: 12px; padding: 36px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 280px;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: #F1F5F9; color: #0D4634; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 14px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D4634" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        </div>
        <div>
            <span class="serk-badge serk-badge-alpha" style="margin-bottom: 10px;"><span>RESERVED · SLOT 07</span></span>
            <h4 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin: 0 0 8px 0;">SERK Academy &amp; Workshops</h4>
            <p style="font-size: 0.88rem; color: #64748B; margin: 0; line-height: 1.5;">Reserved for developer training cohorts, internships, and university technical hackathons.</p>
        </div>
        <div style="margin-top: 18px; font-size: 0.8rem; color: #94A3B8; font-style: italic;">[ Awaiting Client Media Upload ]</div>
    </div>

    <!-- Slot 8: Summit -->
    <div style="background: #FFFFFF; border: 2px dashed #CBD5E1; border-radius: 12px; padding: 36px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 280px;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: #F1F5F9; color: #0D4634; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 14px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D4634" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div>
            <span class="serk-badge serk-badge-alpha" style="margin-bottom: 10px;"><span>RESERVED · SLOT 08</span></span>
            <h4 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin: 0 0 8px 0;">Client Summits &amp; Strategic Alliances</h4>
            <p style="font-size: 0.88rem; color: #64748B; margin: 0; line-height: 1.5;">Reserved for enterprise leadership summits, partner MoUs, and community technology showcases.</p>
        </div>
        <div style="margin-top: 18px; font-size: 0.8rem; color: #94A3B8; font-style: italic;">[ Awaiting Client Media Upload ]</div>
    </div>
</div>
'''


# -------------------------------------------------------------
# 7. PARTNERS & CLIENTS ECOSYSTEM
# -------------------------------------------------------------
partners_body = '''
<!-- Section Intro: Exactly like user request and uploaded image -->
<div style="text-align: center; max-width: 800px; margin: 0 auto 50px auto;">
    <h2 class="wpr-advanced-text" style="font-size: 2.4rem; font-weight: 700; color: #101513; margin: 0 0 10px 0;">
        <span class="wpr-advanced-text-preffix">Some of Our </span>
        <span class="wpr-highlighted-text" style="color: #9A5B20;">Clients &amp; Partners</span>
    </h2>
    <p style="font-size: 1.1rem; color: #5B6761; margin: 0;">we are honored to work with leading institutions, enterprises, and regional innovators</p>
</div>

<!-- Active Clients & Strategic Partners (Confirmed from Portfolio) -->
<div style="margin-bottom: 24px; text-align: left;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <span class="serk-badge serk-badge-production"><span>CONFIRMED ALLIANCES</span></span>
        <span style="font-size: 0.88rem; color: #5B6761; font-weight: 500;">Active institutions &amp; commercial partners</span>
    </div>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 48px;">
    <!-- Partner 1: Zoscales Partners -->
    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 12px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
        <div>
            <div style="text-align: center; padding: 20px; background: #F8FAFC; border-radius: 8px; margin-bottom: 16px; min-height: 80px; display: flex; align-items: center; justify-content: center;">
                <img src="/wp-content/uploads/serk/client-zoscales.png" alt="Zoscales Partners" style="max-height: 44px; max-width: 100%; object-fit: contain;">
            </div>
            <div style="margin-bottom: 8px;"><span class="serk-badge serk-badge-production"><span>PRIVATE EQUITY &amp; GROWTH</span></span></div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #101513; margin: 0 0 8px 0;">Zoscales Partners</h3>
            <p style="font-size: 0.9rem; color: #5B6761; line-height: 1.6; margin: 0;">Institutional private equity firm backing scalable, impactful enterprises across East Africa with robust governance.</p>
        </div>
        <div style="margin-top: 16px; font-size: 0.82rem; color: #0D4634; font-weight: 600; border-top: 1px solid #F1F5F9; padding-top: 12px;">Active Portfolio Collaboration &bull; Verified Partner</div>
    </div>

    <!-- Partner 2: innobiz-K Ethiopia -->
    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 12px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
        <div>
            <div style="text-align: center; padding: 20px; background: #F8FAFC; border-radius: 8px; margin-bottom: 16px; min-height: 80px; display: flex; align-items: center; justify-content: center;">
                <img src="/wp-content/uploads/serk/client-innobiz.png" alt="innobiz-K Ethiopia" style="max-height: 44px; max-width: 100%; object-fit: contain;">
            </div>
            <div style="margin-bottom: 8px;"><span class="serk-badge serk-badge-production"><span>INCUBATION &amp; INNOVATION</span></span></div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #101513; margin: 0 0 8px 0;">innobiz-K Ethiopia</h3>
            <p style="font-size: 0.9rem; color: #5B6761; line-height: 1.6; margin: 0;">Leading innovation center and accelerator hub driving high-growth tech ventures and entrepreneurship development.</p>
        </div>
        <div style="margin-top: 16px; font-size: 0.82rem; color: #0D4634; font-weight: 600; border-top: 1px solid #F1F5F9; padding-top: 12px;">Technology Acceleration &bull; Verified Partner</div>
    </div>

    <!-- Partner 3: Hibret Bank -->
    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 12px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
        <div>
            <div style="text-align: center; padding: 20px; background: #F8FAFC; border-radius: 8px; margin-bottom: 16px; min-height: 80px; display: flex; align-items: center; justify-content: center;">
                <img src="/wp-content/uploads/serk/client-hibret-bank.png" alt="Hibret Bank" style="max-height: 52px; max-width: 100%; object-fit: contain;">
            </div>
            <div style="margin-bottom: 8px;"><span class="serk-badge serk-badge-production"><span>COMMERCIAL BANKING</span></span></div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #101513; margin: 0 0 8px 0;">Hibret Bank (ሕብረት ባንክ)</h3>
            <p style="font-size: 0.9rem; color: #5B6761; line-height: 1.6; margin: 0;">Premier commercial bank delivering trusted digital financial services, corporate payment channels, and financial ecosystem integrations.</p>
        </div>
        <div style="margin-top: 16px; font-size: 0.82rem; color: #0D4634; font-weight: 600; border-top: 1px solid #F1F5F9; padding-top: 12px;">Financial Integration &bull; Verified Partner</div>
    </div>

    <!-- Partner 4: sequa -->
    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 12px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
        <div>
            <div style="text-align: center; padding: 20px; background: #F8FAFC; border-radius: 8px; margin-bottom: 16px; min-height: 80px; display: flex; align-items: center; justify-content: center;">
                <img src="/wp-content/uploads/serk/client-sequa.png" alt="sequa" style="max-height: 44px; max-width: 100%; object-fit: contain;">
            </div>
            <div style="margin-bottom: 8px;"><span class="serk-badge serk-badge-production"><span>DEVELOPMENT COOPERATION</span></span></div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #101513; margin: 0 0 8px 0;">sequa gGmbH</h3>
            <p style="font-size: 0.9rem; color: #5B6761; line-height: 1.6; margin: 0;">Global development organization executing private sector enhancement and technical capacity programs internationally.</p>
        </div>
        <div style="margin-top: 16px; font-size: 0.82rem; color: #0D4634; font-weight: 600; border-top: 1px solid #F1F5F9; padding-top: 12px;">Institutional Partnership &bull; Verified Partner</div>
    </div>

    <!-- Partner 5: Tebita Ambulance -->
    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 12px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
        <div>
            <div style="text-align: center; padding: 20px; background: #F8FAFC; border-radius: 8px; margin-bottom: 16px; min-height: 80px; display: flex; align-items: center; justify-content: center;">
                <img src="/wp-content/uploads/serk/client-tebita.png" alt="Tebita Ambulance" style="max-height: 48px; max-width: 100%; object-fit: contain;">
            </div>
            <div style="margin-bottom: 8px;"><span class="serk-badge serk-badge-production"><span>EMERGENCY HEALTHCARE</span></span></div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #101513; margin: 0 0 8px 0;">Tebita Ambulance (ቴቢታ)</h3>
            <p style="font-size: 0.9rem; color: #5B6761; line-height: 1.6; margin: 0;">Pioneer emergency medical service provider operating pre-hospital response, medical transport, and clinical operations.</p>
        </div>
        <div style="margin-top: 16px; font-size: 0.82rem; color: #0D4634; font-weight: 600; border-top: 1px solid #F1F5F9; padding-top: 12px;">Clinical Operations &bull; Verified Partner</div>
    </div>
</div>

<!-- Reserved Partner Integration Slots -->
<div style="margin-bottom: 20px; text-align: left;">
    <div style="display: flex; align-items: center; gap: 12px;">
        <span class="serk-badge serk-badge-alpha"><span>INCOMING PARTNERSHIPS</span></span>
        <span style="font-size: 0.88rem; color: #8C9891;">Slots reserved for enterprise co-development &amp; integration</span>
    </div>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 60px;">
    <!-- Reserved 1 -->
    <div style="background: #FFFFFF; border: 2px dashed #CBD5E1; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <div style="text-align: center; padding: 16px; background: #F8FAFC; border-radius: 8px; margin-bottom: 16px;">
                <img src="/wp-content/uploads/serk/serk-client-placeholder-1.svg" alt="Enterprise Client Placeholder" style="max-width: 100%; height: auto;">
            </div>
            <h3 style="font-size: 1.15rem; font-weight: 600; color: #101513; margin: 0 0 6px 0;">Enterprise ERP &amp; Public Systems</h3>
            <p style="font-size: 0.9rem; color: #5B6761; line-height: 1.6; margin: 0;">Co-development and enterprise deployment for large-scale operations, workplace systems, and cloud integration.</p>
        </div>
        <div style="margin-top: 14px; font-size: 0.8rem; color: #8C9891; border-top: 1px solid #F1F5F9; padding-top: 10px;">[ Reserved Slot &bull; Awaiting Client Brand Kit ]</div>
    </div>

    <!-- Reserved 2 -->
    <div style="background: #FFFFFF; border: 2px dashed #CBD5E1; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <div style="text-align: center; padding: 16px; background: #F8FAFC; border-radius: 8px; margin-bottom: 16px;">
                <img src="/wp-content/uploads/serk/serk-client-placeholder-4.svg" alt="Industrial Construction Placeholder" style="max-width: 100%; height: auto;">
            </div>
            <h3 style="font-size: 1.15rem; font-weight: 600; color: #101513; margin: 0 0 6px 0;">Construction &amp; Civil Engineering Contractors</h3>
            <p style="font-size: 0.9rem; color: #5B6761; line-height: 1.6; margin: 0;">Connecting BIM quantity takeoffs, Bill of Quantities rate analysis, site labor, and materials supply tracking.</p>
        </div>
        <div style="margin-top: 14px; font-size: 0.8rem; color: #8C9891; border-top: 1px solid #F1F5F9; padding-top: 10px;">[ Reserved Slot &bull; Awaiting Client Brand Kit ]</div>
    </div>

    <!-- Reserved 3 -->
    <div style="background: #FFFFFF; border: 2px dashed #CBD5E1; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <div style="text-align: center; padding: 16px; background: #F8FAFC; border-radius: 8px; margin-bottom: 16px;">
                <img src="/wp-content/uploads/serk/serk-client-placeholder-5.svg" alt="Retail &amp; Hospitality Placeholder" style="max-width: 100%; height: auto;">
            </div>
            <h3 style="font-size: 1.15rem; font-weight: 600; color: #101513; margin: 0 0 6px 0;">Hospitality, Cafés &amp; Multi-Branch Retail</h3>
            <p style="font-size: 0.9rem; color: #5B6761; line-height: 1.6; margin: 0;">Multi-terminal SERK POS systems, recipe ingredient deduction, kitchen display integrations, and daily financial closeouts.</p>
        </div>
        <div style="margin-top: 14px; font-size: 0.8rem; color: #8C9891; border-top: 1px solid #F1F5F9; padding-top: 10px;">[ Reserved Slot &bull; Awaiting Client Brand Kit ]</div>
    </div>
</div>
<!-- Partnership Call to Action Banner -->
<div style="background: #0D4634; border-radius: 12px; padding: 48px 36px; text-align: center; color: #FFFFFF;">
    <h3 style="font-size: 1.8rem; font-weight: 700; margin: 0 0 12px 0; color: #FFFFFF !important;">Partner with SERK Technologies Group</h3>
    <p style="font-size: 1.05rem; color: #CDE5DC !important; max-width: 680px; margin: 0 auto 24px auto; line-height: 1.6;">Whether you are an enterprise seeking custom system engineering, an institution modernizing workflows, or a commercial partner, let's engineer what's next together.</p>
    <a href="/contact_us/?interest=partnership" class="elementor-button" style="background: #FFFFFF !important; color: #0D4634 !important; font-weight: 600; padding: 14px 28px; border-radius: 6px; text-decoration: none; display: inline-block;">Discuss a Strategic Partnership</a>
</div>
'''

pages_to_create = [
    ('products/index.html', 'Products & Platforms', 'SERK Products & Platforms', 'INNOVATION ECOSYSTEM',
     'SERK develops connected software platforms shaped around the demands of real industries, paired with honest maturity disclosures and practical engineering.',
     products_body),
    ('industries/index.html', 'Industry Solutions', 'Built Around Your Industry', 'OPERATIONAL SOLUTIONS',
     'Purpose-built workflows for hospitality, healthcare, construction, retail, food service, distribution, and real estate.',
     industries_body),
    ('ventures/index.html', 'Digital Ventures', 'Turning Technology Into Possibilities', 'GROWTH & VENTURES',
     'Beyond enterprise software, SERK explores platforms and ventures that transform mobility, logistics, digital heritage, and emerging commerce.',
     ventures_body),
    ('gallery/index.html', 'Media & Visual Gallery', 'Media & Visual Gallery', 'MEDIA & VISUAL ARCHIVE',
     'Inside SERK Technologies Group: our headquarters in Mekelle, engineering studios, healthcare technology deployments, and infrastructure operations.',
     gallery_body),
    ('partners/index.html', 'Partners & Clients', 'Some of Our Clients & Partners', 'ECOSYSTEM COLLABORATION',
     'We are honored to collaborate with leading enterprises, healthcare institutions, financial partners, and industrial builders.',
     partners_body),
    ('privacy/index.html', 'Privacy Policy', 'Privacy Policy', 'LEGAL & GOVERNANCE',
     'Innovation with Integrity means responsible, transparent data stewardship.',
     privacy_body),
    ('terms/index.html', 'Terms of Service', 'Terms of Service', 'LEGAL & GOVERNANCE',
     'Legal terms and publication standards governing the use of the SERK corporate platform.',
     terms_body),
]

for rel, title, h1, eyebrow, lead, body in pages_to_create:
    dest = os.path.join(ORIG, rel)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    html = make_shell(title, h1, eyebrow, lead, body)
    open(dest, 'w', encoding='utf-8').write(html)
    print('Generated', dest)
