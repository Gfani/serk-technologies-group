import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { industriesData } from '@/lib/industriesData';

export function generateStaticParams() {
  return industriesData.map((ind) => ({ slug: ind.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const ind = industriesData.find((i) => i.slug === params.slug);
  if (!ind) return { title: 'Industry Not Found' };
  return {
    title: `${ind.name} | SERK Technologies Group`,
    description: ind.summary,
  };
}

export default function IndustryDetailPage({ params }: { params: { slug: string } }) {
  const ind = industriesData.find((i) => i.slug === params.slug);
  if (!ind) notFound();

  const Icon = ind.icon;

  return (
    <div className="w-full bg-[#F4F7F5] min-h-screen py-16 lg:py-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="mb-8">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0D4634] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Industries</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#DEE6E0] p-8 sm:p-12 mb-10 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#101513]">{ind.name}</h1>
            <p className="text-lg text-[#5B6761] leading-relaxed">{ind.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white rounded-xl border border-[#DEE6E0] p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#101513]">Key Operating Platforms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ind.platforms.map((platform, i) => (
                <div key={i} className="p-4 rounded-lg bg-[#F4F7F5] border border-[#DEE6E0]">
                  <CheckCircle2 className="w-4 h-4 text-[#0D4634] mb-2" />
                  <div className="text-sm font-bold text-[#101513]">{platform}</div>
                  <div className="text-xs text-[#5B6761] mt-1">Sovereign enterprise deployment</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#0D4634] text-white rounded-xl p-8 space-y-4">
            <h3 className="text-lg font-bold">Request Industry Demo</h3>
            <p className="text-xs text-[#CDE5DC] leading-relaxed">
              Experience a live walkthrough of the platforms engineered for this industry.
            </p>
            <Link
              href={`/contact?interest=${encodeURIComponent(ind.name)}`}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded text-xs font-semibold text-[#101513] bg-[#E3AB72] hover:bg-[#d69d63] transition-colors"
            >
              <span>Schedule Walkthrough</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
