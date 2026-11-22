import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { solutionsData } from '@/lib/solutionsData';
import AnimatedHeaderBanner from '@/components/AnimatedHeaderBanner';

export function generateStaticParams() {
  return solutionsData.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const sol = solutionsData.find((s) => s.slug === params.slug);
  if (!sol) return { title: 'Solution Not Found' };
  return {
    title: `${sol.title} | SERK Technologies Group`,
    description: sol.summary,
  };
}

export default function SolutionDetailPage({ params }: { params: { slug: string } }) {
  const sol = solutionsData.find((s) => s.slug === params.slug);
  if (!sol) notFound();

  const Icon = sol.icon;

  return (
    <div className="w-full bg-[#F4F7F5] min-h-screen">
      <AnimatedHeaderBanner title={sol.title} />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-12 lg:py-16">
        <div className="mb-8">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0D4634] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Solutions & Services</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#DEE6E0] p-8 sm:p-12 mb-10 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#101513]">{sol.title}</h1>
            <p className="text-lg text-[#5B6761] leading-relaxed">{sol.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white rounded-xl border border-[#DEE6E0] p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#101513]">Core Capabilities & Standards</h2>
            <div className="space-y-4">
              {sol.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-[#F4F7F5] border border-[#DEE6E0]">
                  <CheckCircle2 className="w-5 h-5 text-[#0D4634] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-[#101513]">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0D4634] text-white rounded-xl p-8 space-y-4">
              <h3 className="text-lg font-bold">Engage Our Architects</h3>
              <p className="text-xs text-[#CDE5DC] leading-relaxed">
                Schedule a confidential technical discovery session with our engineering leads to
                evaluate your systems requirements.
              </p>
              <Link
                href={`/contact?interest=${encodeURIComponent(sol.title)}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded text-xs font-semibold text-[#101513] bg-[#E3AB72] hover:bg-[#d69d63] transition-colors"
              >
                <span>Request Discovery Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
