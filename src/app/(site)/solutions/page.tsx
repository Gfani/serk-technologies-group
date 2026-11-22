import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { solutionsData } from '@/lib/solutionsData';
import AnimatedHeaderBanner from '@/components/AnimatedHeaderBanner';

export const metadata = {
  title: 'Enterprise Solutions & Services | SERK Technologies Group',
  description:
    'Custom enterprise software engineering, AI-assisted operational workflows, sovereign cloud infrastructure, and systems integration.',
};

export default function SolutionsPage() {
  return (
    <div className="w-full bg-[#F4F7F5] min-h-screen">
      <AnimatedHeaderBanner title="Solutions & Services" />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-12 lg:py-16">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0D4634]">
            Engineering Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#101513] mt-2 mb-4">
            Enterprise Solutions & Services
          </h1>
          <p className="text-base sm:text-lg text-[#5B6761] leading-relaxed">
            We partner with growing companies, healthcare providers, construction contractors, and
            financial institutions to replace fragile spreadsheets and disjointed tools with unified,
            battle-tested software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {solutionsData.map((sol) => {
            const Icon = sol.icon;
            return (
              <div
                key={sol.slug}
                className="bg-white rounded-xl border border-[#DEE6E0] p-8 shadow-sm hover:border-[#0D4634] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-[#101513] mb-3">{sol.title}</h2>
                  <p className="text-sm text-[#5B6761] leading-relaxed mb-6">{sol.summary}</p>
                  <div className="space-y-2.5 mb-8">
                    {sol.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#101513]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D4634] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/contact?interest=${encodeURIComponent(sol.title)}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#0D4634] hover:underline"
                >
                  <span>Inquire about this capability</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
