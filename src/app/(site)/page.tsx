import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Cpu, Layers, Sliders, CheckCircle2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getAllProjects } from '@/lib/db';

export const revalidate = 60;

export default async function HomePage() {
  const allProjects = await getAllProjects();
  // Filter 6 highlight projects for the homepage
  const highlightSlugs = [
    'construction-estimator',
    'hospital-management-system',
    'finance-audit-engine',
    'smart-retail-pos',
    'segar-venture',
    'visit-tigray',
  ];
  const featured = allProjects.filter((p) => highlightSlugs.includes(p.slug));
  const displayProjects = featured.length >= 4 ? featured : allProjects.slice(0, 6);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-white border-b border-[#DEE6E0] pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F7F5] border border-[#DEE6E0] text-xs font-semibold text-[#0D4634]">
                <span className="w-2 h-2 rounded-full bg-[#0D4634] animate-pulse"></span>
                <span>Sovereign Enterprise Engineering · Ethiopia</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#101513] leading-[1.12] tracking-tight">
                We Engineer the Systems <br className="hidden sm:inline" />
                <span className="text-[#0D4634]">Behind Better Business.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#5B6761] leading-relaxed max-w-2xl">
                From your first digital system to intelligent enterprise operations, SERK
                Technologies Group designs and develops practical digital solutions for organizations
                ready to work smarter. We combine software engineering, thoughtful design, responsible
                AI, and deep attention to real-world workflows — starting in Ethiopia, built for a
                wider world.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-all shadow-sm"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded text-sm font-semibold text-[#101513] bg-[#F4F7F5] hover:bg-[#DEE6E0] border border-[#DEE6E0] transition-all"
                >
                  <span>Explore Platforms (23)</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-[#DEE6E0] grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl font-bold text-[#101513]">23+</div>
                  <div className="text-xs text-[#5B6761]">Products & Ventures</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#101513]">4</div>
                  <div className="text-xs text-[#5B6761]">Core Industries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0D4634]">100%</div>
                  <div className="text-xs text-[#5B6761]">Sovereign Engineering</div>
                </div>
              </div>
            </div>

            {/* Right Visual: Real Photo & Interface Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[460px] rounded-2xl overflow-hidden border border-[#DEE6E0] bg-[#F4F7F5] shadow-xl p-4 sm:p-6">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 border border-[#DEE6E0]">
                  <Image
                    src="/images/serk-photo-engineering.jpg"
                    alt="SERK Technologies Engineering Studio"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-medium text-white/90">
                      Engineering Hub · Mekelle, Tigray
                    </span>
                  </div>
                </div>

                {/* Micro-preview overlay cards */}
                <div className="space-y-3">
                  <div className="bg-white p-3.5 rounded-lg border border-[#DEE6E0] flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-emerald-50 text-[#0D4634] flex items-center justify-center font-bold text-xs">
                        BOQ
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#101513]">Construction Takeoff OS</div>
                        <div className="text-[11px] text-[#5B6761]">Bill of Quantities in ETB</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Verified
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-[#DEE6E0] flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                        HMS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#101513]">Clinical Health Engine</div>
                        <div className="text-[11px] text-[#5B6761]">ICD-11 Encrypted Registry</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Private Beta
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION / WHY CHOOSE SERK GROUP */}
      <section className="py-20 bg-[#F4F7F5] border-b border-[#DEE6E0]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#101513] mb-4">
              Why Choose <span className="text-[#0D4634]">SERK Group?</span>
            </h2>
            <p className="text-sm sm:text-base text-[#5B6761]">
              At SERK, we pair real industry know-how with practical AI. The result is software that
              feels made for you, because it is. Here is why enterprise teams choose us:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 4 Value Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-[#DEE6E0] shadow-sm hover:border-[#0D4634] transition-colors">
                <div className="w-10 h-10 rounded bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#101513] mb-2">AI at the Core</h3>
                <p className="text-sm text-[#5B6761] leading-relaxed">
                  Intelligence is built into every SERK product from day one — not bolted on
                  afterwards as an afterthought.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#DEE6E0] shadow-sm hover:border-[#0D4634] transition-colors">
                <div className="w-10 h-10 rounded bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#101513] mb-2">Built for Your Industry</h3>
                <p className="text-sm text-[#5B6761] leading-relaxed">
                  Purpose-built for construction, healthcare, finance, logistics, and retail teams
                  facing complex operational workflows.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#DEE6E0] shadow-sm hover:border-[#0D4634] transition-colors">
                <div className="w-10 h-10 rounded bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#101513] mb-2">One Connected Family</h3>
                <p className="text-sm text-[#5B6761] leading-relaxed">
                  Unified systems that seamlessly share data, sync ledgers, and scale together as your
                  enterprise expands.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#DEE6E0] shadow-sm hover:border-[#0D4634] transition-colors">
                <div className="w-10 h-10 rounded bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center mb-4">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#101513] mb-2">Tailored to You</h3>
                <p className="text-sm text-[#5B6761] leading-relaxed">
                  We configure, integrate, and automate around the way your staff already works,
                  ensuring immediate adoption.
                </p>
              </div>
            </div>

            {/* Right Photo Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-[#DEE6E0] shadow-md aspect-[4/3]">
                <Image
                  src="/images/serk-photo-construction.jpg"
                  alt="Construction and Enterprise Field Engineering"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#E3AB72] mb-1">
                    Industry In Action
                  </span>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Tested on Structural Sites, Clinics & Modern Retail
                  </h4>
                  <p className="text-xs text-white/80">
                    Engineered to withstand bandwidth constraints, offline field operations, and
                    rigorous auditing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP PLATFORMS SHOWCASE */}
      <section className="py-20 bg-white border-b border-[#DEE6E0]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0D4634]">
                Enterprise Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#101513] mt-1">
                Featured Software & Operating Ventures
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D4634] hover:text-[#2D735A]"
            >
              <span>View all 23 dossiers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project) => (
              <ProductCard key={project.id || project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. PHILOSOPHY & INTEGRITY */}
      <section className="py-20 bg-[#101513] text-white">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#E3AB72]">
                Our Guiding Standard
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                Innovation with Integrity. <br />
                <span className="text-[#9AB4A9]">Building Beyond Boundaries.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#CDE5DC] leading-relaxed">
                SERK Technologies Group was conceived for a world where technology is no longer an
                optional department — it shapes how organizations serve people, manage resources, and
                grow. We focus on the places where technology meets daily life: the patient record that
                should never be lost, the business ledger that should not take a week to reconcile, and
                the construction estimate that must withstand scrutiny.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-[#101513] bg-[#E3AB72] hover:bg-[#d69d63] transition-colors"
                >
                  <span>Read About Our Principles</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <CheckCircle2 className="w-5 h-5 text-[#E3AB72] mb-3" />
                <h4 className="text-sm font-bold text-white mb-1.5">Responsible AI</h4>
                <p className="text-xs text-[#9AB4A9] leading-relaxed">
                  AI that assists human decision-making and keeps transparency paramount.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <CheckCircle2 className="w-5 h-5 text-[#E3AB72] mb-3" />
                <h4 className="text-sm font-bold text-white mb-1.5">Local Resilience</h4>
                <p className="text-xs text-[#9AB4A9] leading-relaxed">
                  Offline-first sync capabilities designed for real African infrastructure.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <CheckCircle2 className="w-5 h-5 text-[#E3AB72] mb-3" />
                <h4 className="text-sm font-bold text-white mb-1.5">Strict Data Sovereignty</h4>
                <p className="text-xs text-[#9AB4A9] leading-relaxed">
                  Zero foreign lock-in; institutional data remains under client control.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <CheckCircle2 className="w-5 h-5 text-[#E3AB72] mb-3" />
                <h4 className="text-sm font-bold text-white mb-1.5">Long-Term Maintenance</h4>
                <p className="text-xs text-[#9AB4A9] leading-relaxed">
                  Clean modular architectures designed to survive far beyond the initial demo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="bg-[#F4F7F5] border border-[#DEE6E0] rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-sm">
            <h2 className="text-3xl font-bold text-[#101513] mb-4">
              Ready to Upgrade Your Enterprise Workflows?
            </h2>
            <p className="text-sm sm:text-base text-[#5B6761] mb-8 max-w-xl mx-auto">
              Schedule a technical discovery session with our engineering team to review system
              architecture, live software demos, and deployment timelines.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors"
              >
                <span>Request a System Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:serktechgroup@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-3 rounded text-sm font-semibold text-[#101513] bg-white border border-[#DEE6E0] hover:bg-[#DEE6E0] transition-colors"
              >
                <span>Email serktechgroup@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
