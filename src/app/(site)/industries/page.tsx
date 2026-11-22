import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { industriesData } from '@/lib/industriesData';

export const metadata = {
  title: 'Industry Verticals | SERK Technologies Group',
  description:
    'Sovereign software solutions purpose-built for Construction, Healthcare, Financial Services, and Retail.',
};

export default function IndustriesPage() {
  return (
    <div className="w-full bg-[#F4F7F5] min-h-screen py-16 lg:py-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0D4634]">
            Specialized Verticals
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#101513] mt-2 mb-4">
            Industries We Serve
          </h1>
          <p className="text-base sm:text-lg text-[#5B6761] leading-relaxed">
            Generic software forces teams to twist their real operations to fit foreign workflows.
            SERK builds purpose-crafted software that natively mirrors how African industry works on
            the ground.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {industriesData.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.slug}
                className="bg-white rounded-xl border border-[#DEE6E0] overflow-hidden shadow-sm hover:border-[#0D4634] transition-all flex flex-col justify-between"
              >
                <div className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-[#101513] mb-3">{ind.name}</h2>
                  <p className="text-sm text-[#5B6761] leading-relaxed mb-6">{ind.summary}</p>
                  <div>
                    <h4 className="text-xs font-bold text-[#101513] uppercase tracking-wider mb-2">
                      Associated Platforms:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {ind.platforms.map((p, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded bg-[#F4F7F5] border border-[#DEE6E0] text-xs font-medium text-[#101513]"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-8 pt-0">
                  <Link
                    href={`/contact?interest=${encodeURIComponent(ind.name)}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#0D4634] hover:underline"
                  >
                    <span>Request industry consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
