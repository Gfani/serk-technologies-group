import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | SERK Technologies Group',
  description: 'Enterprise engagement terms, intellectual property standards, and service agreements of SERK Technologies Group.',
};

export default function TermsPage() {
  return (
    <div className="w-full bg-white py-16 lg:py-24">
      <div className="max-w-[840px] mx-auto px-6 sm:px-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0D4634]">
          Legal & Governance
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#101513] mt-2 mb-4">Terms of Service</h1>
        <p className="text-xs text-[#5B6761] mb-10 pb-4 border-b border-[#DEE6E0]">
          Last Updated: November 2026 · SERK Technologies Group
        </p>

        <div className="prose prose-slate max-w-none text-[#5B6761] space-y-6 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#101513] mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing the website and digital platforms operated by SERK Technologies Group
              (“SERK”, “we”, “our”), you agree to comply with and be bound by these Terms of Service.
              If you are engaging on behalf of a corporation or medical institution, you represent
              that you have authority to bind that entity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#101513] mb-3">2. Product Maturity & Governance Disclosures</h2>
            <p>
              In accordance with our “Innovation with Integrity” charter, all software platforms and
              dossiers on this site are labelled with their verified operational maturity stage
              (Concept, Research/Prototype, Internal Alpha, Pilot/Private Beta, Production Available,
              or Operating Venture). Capabilities listed as “Planned” or “Roadmap” are aspirational
              engineering milestones and do not constitute binding commercial warranties until
              formalized in an enterprise Service Level Agreement (SLA).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#101513] mb-3">3. Intellectual Property Rights</h2>
            <p>
              All software architectures, proprietary algorithms, database schemas, visual assets,
              and brand marks displayed on this website are the intellectual property of SERK
              Technologies Group and its affiliated ventures. Unauthorized scraping, reproduction, or
              reverse-engineering without prior written authorization is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#101513] mb-3">4. Enterprise Engagements</h2>
            <p>
              Custom software development, system deployment, on-premise installation, and maintenance
              services are executed under dedicated bilateral Enterprise Service Contracts. In the
              event of any inconsistency between these public website terms and a signed master
              services contract, the signed contract shall prevail.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#101513] mb-3">5. Inquiries & Legal Notices</h2>
            <p>
              Formal legal communications and inquiry notices should be addressed in writing to:
              <br />
              <strong>SERK Technologies Group</strong>
              <br />
              Email:{' '}
              <a href="mailto:serktechgroup@gmail.com" className="text-[#0D4634] font-semibold underline">
                serktechgroup@gmail.com
              </a>
              <br />
              Mekelle, Tigray, Ethiopia
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[#DEE6E0]">
          <Link href="/" className="text-sm font-semibold text-[#0D4634] hover:underline">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
