import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { venturesData } from '@/lib/venturesData';
import MaturityBadge from '@/components/MaturityBadge';
import AnimatedHeaderBanner from '@/components/AnimatedHeaderBanner';

export function generateStaticParams() {
  return venturesData.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const v = venturesData.find((item) => item.slug === params.slug);
  if (!v) return { title: 'Venture Not Found' };
  return {
    title: `${v.name} | SERK Technologies Group`,
    description: v.summary,
  };
}

export default function VentureDetailPage({ params }: { params: { slug: string } }) {
  const v = venturesData.find((item) => item.slug === params.slug);
  if (!v) notFound();

  return (
    <div className="w-full bg-[#F4F7F5] min-h-screen">
      <AnimatedHeaderBanner title={v.name} />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-12 lg:py-16">
        <div className="mb-8">
          <Link
            href="/ventures"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0D4634] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Digital Ventures</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#DEE6E0] p-8 sm:p-12 mb-10 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5B6761] bg-[#F4F7F5] px-2.5 py-1 rounded">
                {v.market}
              </span>
              <MaturityBadge stage={v.maturity} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#101513]">{v.name}</h1>
            <p className="text-lg font-medium text-[#0D4634]">{v.tagline}</p>
            <p className="text-base text-[#5B6761] leading-relaxed">{v.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white rounded-xl border border-[#DEE6E0] p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#101513]">Operational Footprint</h2>
            <p className="text-sm text-[#5B6761] leading-relaxed">{v.status}</p>
          </div>

          <div className="lg:col-span-4 bg-[#0D4634] text-white rounded-xl p-8 space-y-4">
            <h3 className="text-lg font-bold">Partner With This Venture</h3>
            <p className="text-xs text-[#CDE5DC] leading-relaxed">
              Explore strategic supply partnerships, commercial integration, or investment.
            </p>
            <Link
              href={`/contact?interest=${encodeURIComponent(`Venture: ${v.name}`)}`}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded text-xs font-semibold text-[#101513] bg-[#E3AB72] hover:bg-[#d69d63] transition-colors"
            >
              <span>Connect with Venture Leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
