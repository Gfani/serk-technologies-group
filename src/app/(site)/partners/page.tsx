import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Handshake, Building2, Stethoscope, Briefcase, CheckCircle2 } from 'lucide-react';
import AnimatedHeaderBanner from '@/components/AnimatedHeaderBanner';

export const metadata = {
  title: 'Partners & Clients Ecosystem | SERK Technologies Group',
  description:
    'Institutional clients, engineering partners, and deployment ecosystems working with SERK Technologies Group.',
};

export default function PartnersPage() {
  const partnerTypes = [
    {
      category: 'Healthcare & Clinical Networks',
      icon: Stethoscope,
      description:
        'Regional hospitals, private surgical clinics, and diagnostics centers running our clinical records and pharmacy modules.',
      deployment: 'Pilot & beta clinical deployments in Northern Ethiopia.',
    },
    {
      category: 'General Contractors & Structural Engineering',
      icon: Building2,
      description:
        'Tier-1 and Tier-2 contractors using our takeoff algorithms to audit Bill of Quantities (BOQ) and accelerate material procurement.',
      deployment: 'Commercial takeoff auditing for major structural projects.',
    },
    {
      category: 'Commercial Retailers & Wholesalers',
      icon: Briefcase,
      description:
        'Multi-location supermarkets, hardware suppliers, and hospitality venues leveraging unified cloud point-of-sale hardware and inventory sync.',
      deployment: 'Multi-branch terminals operating daily transactions.',
    },
  ];

  return (
    <div className="w-full bg-[#F4F7F5] min-h-screen">
      <AnimatedHeaderBanner title="Partners & Clients" />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-12 lg:py-16">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0D4634]">
            Collaborative Ecosystem
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#101513] mt-2 mb-4">
            Partners & Clients
          </h1>
          <p className="text-base sm:text-lg text-[#5B6761] leading-relaxed">
            We work shoulder-to-shoulder with progressive Ethiopian enterprises and institutions to
            co-design, stress-test, and deploy mission-critical software systems.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {partnerTypes.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#DEE6E0] p-8 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#101513] mb-3">{pt.category}</h3>
                  <p className="text-sm text-[#5B6761] leading-relaxed mb-6">{pt.description}</p>
                </div>
                <div className="p-3.5 rounded bg-[#F4F7F5] border border-[#DEE6E0] text-xs text-[#101513]">
                  <strong>Engagement:</strong> {pt.deployment}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="bg-white rounded-2xl border border-[#DEE6E0] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm">
          <Handshake className="w-10 h-10 text-[#0D4634] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#101513] mb-3">Join the SERK Enterprise Pilot Program</h2>
          <p className="text-sm text-[#5B6761] mb-6">
            We offer selected enterprise partners early deployment access, subsidized custom
            integrations, and direct architect-level engineering support.
          </p>
          <Link
            href="/contact?interest=Enterprise%20Pilot%20Program"
            className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors"
          >
            <span>Apply for Pilot Partnership</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
