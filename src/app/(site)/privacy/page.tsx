import React from 'react';
import Link from 'next/link';
import AnimatedHeaderBanner from '@/components/AnimatedHeaderBanner';

export const metadata = {
  title: 'Privacy Policy | SERK Technologies Group',
  description: 'Data privacy principles, governance standards, and security commitments of SERK Technologies Group.',
};

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default function PrivacyPage() {
  return (
    <div className="w-full bg-white">
      <AnimatedHeaderBanner title="Privacy Policy" />
      <div className="max-w-[840px] mx-auto px-6 sm:px-8 py-8 lg:py-10">
        <p className="text-xs text-[#5B6761] mb-10 pb-4 border-b border-[#DEE6E0]">
          Last Updated: November 2026 · SERK Technologies Group Data Governance Directorate
        </p>

        <div className="prose prose-slate max-w-none text-[#5B6761] space-y-6 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#101513] mb-3">1. Overview & Commitment</h2>
            <p>
              SERK Technologies Group (“SERK”, “we”, “our”) is committed to protecting the privacy,
              security, and institutional sovereignty of information collected through our website,
              enterprise platforms, and customer engagement channels. As an engineering firm built on
              the principle of “Innovation with Integrity”, we strictly uphold data minimization and
              do not sell or monetize personal or institutional information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#101513] mb-3">2. Information We Collect</h2>
            <p>
              We only collect data necessary to fulfill technical inquiries, process demo requests,
              and support system deployments:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Contact Details:</strong> Name, work email address, phone/WhatsApp number,
                organization name, and industry vertical when submitted through our contact and demo
                forms.
              </li>
              <li>
                <strong>Project Scope:</strong> Briefs, operational descriptions, and technical
                specifications voluntarily provided during discovery consultations.
              </li>
              <li>
                <strong>Technical Telemetry:</strong> Anonymized server logs, browser type, and
                timestamp information for security monitoring and system performance auditing.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#101513] mb-3">3. Healthcare & Clinical Data Sovereignty</h2>
            <p>
              For enterprise deployments of our Hospital & Clinical Management System (HMS), SERK
              strictly enforces on-premise or sovereign private cloud data residency. Under no
              circumstances does SERK aggregate, mine, or transmit patient medical records or
              identifiable health telemetry outside the deploying medical facility.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#101513] mb-3">4. How We Use Information</h2>
            <p>
              Collected contact information is strictly utilized to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Respond directly to enterprise inquiries and demo requests.</li>
              <li>Coordinate architecture consultations and software evaluation trials.</li>
              <li>Maintain operational security, audit logs, and fraud prevention.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#101513] mb-3">5. Third-Party Service Providers</h2>
            <p>
              We select managed infrastructure providers meeting strict data security criteria:
              Neon (PostgreSQL database encryption at rest), Cloudinary (media CDN delivery), and
              Resend (encrypted transactional email delivery). We do not permit third-party ad
              trackers or surveillance pixels on this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#101513] mb-3">6. Contact & Data Subject Rights</h2>
            <p>
              You may request access to, correction of, or permanent deletion of your contact records
              at any time by emailing us at{' '}
              <a href="mailto:serktechgroup@gmail.com" className="text-[#0D4634] font-semibold underline">
                serktechgroup@gmail.com
              </a>.
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
