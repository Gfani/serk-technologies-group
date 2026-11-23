import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MaturityBadge from '@/components/MaturityBadge';
import { venturesData } from '@/lib/venturesData';
import AnimatedHeaderBanner from '@/components/AnimatedHeaderBanner';
import { getAllProjects } from '@/lib/db';
import { MaturityStage } from '@/lib/types';

export const metadata = {
  title: 'Digital Ventures & Incubations | SERK Technologies Group',
  description:
    'Commercial digital ventures incubated and engineered by SERK Technologies Group: Segar, Visit Tigray, LO Africa.',
};

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function VenturesPage() {
  const allProjects = await getAllProjects();
  const dbVentures = allProjects.filter(
    (p) => p.category === 'ventures' || p.category === 'affiliated'
  );

  // Merge dbVentures with venturesData by slug
  const ventureMap = new Map();
  venturesData.forEach((v) => ventureMap.set(v.slug, v));
  dbVentures.forEach((p) => {
    if (ventureMap.has(p.slug)) {
      const existing = ventureMap.get(p.slug);
      ventureMap.set(p.slug, {
        ...existing,
        name: p.name,
        summary: p.summary,
        maturity: p.maturity,
      });
    } else {
      ventureMap.set(p.slug, {
        slug: p.slug,
        name: p.name,
        tagline: p.category === 'affiliated' ? 'Affiliated Business Entity' : 'Digital Commerce Venture',
        market: p.audience || 'East Africa & Global Markets',
        maturity: p.maturity as MaturityStage,
        summary: p.summary,
        status: p.maturity.replace('_', ' '),
        focusAreas: p.capabilities ? p.capabilities.split('\n') : [],
      });
    }
  });

  const mergedVentures = Array.from(ventureMap.values());

  return (
    <div className="w-full bg-[#F4F7F5] min-h-screen">
      <AnimatedHeaderBanner title="Digital Ventures" />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-8 lg:py-10">
        <div className="max-w-3xl mb-8">
          <p className="text-base sm:text-lg text-[#5B6761] leading-relaxed">
            Beyond client software engineering, SERK conceives, funds, and scales digital
            enterprises that unlock structural economic value in vital African sectors.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {mergedVentures.map((venture) => (
            <div
              key={venture.slug}
              className="bg-white rounded-2xl border border-[#DEE6E0] p-8 sm:p-10 shadow-sm hover:border-[#0D4634] transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#5B6761] bg-[#F4F7F5] px-2.5 py-1 rounded">
                      {venture.market}
                    </span>
                    <MaturityBadge stage={venture.maturity} />
                  </div>

                  <h2 className="text-3xl font-bold text-[#101513]">{venture.name}</h2>
                  <div className="text-sm font-semibold text-[#0D4634]">{venture.tagline}</div>

                  <p className="text-sm sm:text-base text-[#5B6761] leading-relaxed">
                    {venture.summary}
                  </p>

                  <div className="p-3.5 rounded-lg bg-[#F4F7F5] border border-[#DEE6E0] text-xs text-[#101513]">
                    <strong>Operational Status:</strong> {venture.status}
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#F4F7F5] rounded-xl p-6 border border-[#DEE6E0] space-y-4">
                  <h3 className="text-sm font-bold text-[#101513]">Venture Partnership</h3>
                  <p className="text-xs text-[#5B6761] leading-relaxed">
                    Interested in supply partnership, institutional procurement, or co-investment?
                  </p>
                  <Link
                    href={`/contact?interest=${encodeURIComponent(`Venture: ${venture.name}`)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors"
                  >
                    <span>Connect with Venture Leads</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
