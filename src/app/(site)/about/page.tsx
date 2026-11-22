import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, HeartHandshake, Compass, Users } from 'lucide-react';

export const metadata = {
  title: 'About Us | SERK Technologies Group',
  description:
    'Innovation with Integrity. Building Beyond Boundaries. Discover the mission, engineering philosophy, and values of SERK Technologies Group.',
};

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* 1. HERO */}
      <section className="bg-white border-b border-[#DEE6E0] py-16 lg:py-24">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D4634]">
              About SERK Technologies Group
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#101513] mt-2 mb-6 leading-tight">
              Innovation with Integrity. <br />
              <span className="text-[#0D4634]">Building Beyond Boundaries.</span>
            </h1>
            <p className="text-lg text-[#5B6761] leading-relaxed">
              SERK Technologies Group was conceived for a world where technology is no longer an
              optional department — it shapes how organizations serve people, manage resources, and
              grow. We focus on the places where software meets daily reality: the patient record that
              should never be lost, the business ledger that should not take a week, the construction
              estimate that must withstand scrutiny, and the sales counter that should never become a
              bottleneck.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY & STORY */}
      <section className="py-20 bg-[#F4F7F5] border-b border-[#DEE6E0]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl font-bold text-[#101513]">Our Philosophy</h2>
              <p className="text-sm sm:text-base text-[#5B6761] leading-relaxed">
                We believe advanced technology should feel natural. A powerful system should reveal its
                complexity only when the operator needs it. AI should improve human judgment, not hide
                institutional responsibility. Data should help organizations understand their work
                without compromising the citizens and patients who trust them.
              </p>
              <p className="text-sm sm:text-base text-[#5B6761] leading-relaxed">
                Good engineering should survive far beyond its initial demonstration. That is why our
                platforms are designed for resilience in real operating environments: capable of
                operating with intermittent connectivity, structured around robust database schemas,
                and built with zero dependency on black-box foreign vendors.
              </p>

              <div className="pt-2">
                <h3 className="text-xl font-bold text-[#101513] mb-3">Our African Ambition</h3>
                <p className="text-sm sm:text-base text-[#5B6761] leading-relaxed">
                  We are building from Ethiopia toward an ecosystem of useful African technology —
                  informed by local contexts, governed by international software engineering
                  standards, and capable of competing globally.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-[#DEE6E0] shadow-xl aspect-[4/3]">
                <Image
                  src="/images/serk-photo-engineering.jpg"
                  alt="SERK Engineering Team in Mekelle, Tigray"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-xs font-semibold text-[#E3AB72] uppercase tracking-wider">
                      Engineering Hub
                    </span>
                    <h4 className="text-lg font-bold text-white">Mekelle, Tigray, Ethiopia</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE PILLARS */}
      <section className="py-20 bg-white border-b border-[#DEE6E0]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D4634]">
              Values We Live By
            </span>
            <h2 className="text-3xl font-bold text-[#101513] mt-2">The Four SERK Guiding Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-lg border border-[#DEE6E0] bg-[#F4F7F5]">
              <Shield className="w-8 h-8 text-[#0D4634] mb-4" />
              <h3 className="text-lg font-bold text-[#101513] mb-2">Uncompromising Integrity</h3>
              <p className="text-sm text-[#5B6761] leading-relaxed">
                We never make speculative claims about AI or overstate system readiness. Every product
                maturity stage is transparently documented.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#DEE6E0] bg-[#F4F7F5]">
              <Compass className="w-8 h-8 text-[#0D4634] mb-4" />
              <h3 className="text-lg font-bold text-[#101513] mb-2">Operational Reality</h3>
              <p className="text-sm text-[#5B6761] leading-relaxed">
                We test software against real-world power outages, slow networks, multi-currency
                ledgers, and complex bureaucratic regulations.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#DEE6E0] bg-[#F4F7F5]">
              <HeartHandshake className="w-8 h-8 text-[#0D4634] mb-4" />
              <h3 className="text-lg font-bold text-[#101513] mb-2">Human Centricity</h3>
              <p className="text-sm text-[#5B6761] leading-relaxed">
                Software should make physicians, site managers, and cashiers faster and more
                confident, not burden them with bureaucratic friction.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#DEE6E0] bg-[#F4F7F5]">
              <Users className="w-8 h-8 text-[#0D4634] mb-4" />
              <h3 className="text-lg font-bold text-[#101513] mb-2">Sovereign Knowledge</h3>
              <p className="text-sm text-[#5B6761] leading-relaxed">
                We build long-term domestic engineering capabilities, training African engineers and
                keeping digital sovereignty within the continent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-20 bg-[#F4F7F5]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-[#101513] mb-4">Partner with Our Engineering Team</h2>
          <p className="text-[#5B6761] mb-8">
            Whether you need custom enterprise system architecture or want to deploy one of our
            industry platforms, we would be glad to discuss your roadmap.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
