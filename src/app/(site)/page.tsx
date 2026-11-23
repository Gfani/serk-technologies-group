import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import MaturityBadge from '@/components/MaturityBadge';
import { getAllProjects } from '@/lib/db';

export const revalidate = 60;

export default async function HomePage() {
  const allProjects = await getAllProjects();

  return (
    <div className="w-full font-sans bg-white text-[#101513]">
      {/* ========================================================
          1. HERO SECTION (Exact port 8000 design with SVG capsules)
          ======================================================== */}
      <section className="relative w-full min-h-[85vh] serk-hero-bg flex flex-col lg:flex-row lg:items-center border-b border-[#DEE6E0] overflow-hidden">
        <div className="max-w-[1240px] w-full mx-auto px-6 sm:px-8 py-14 sm:py-16 lg:py-24">
          <div className="max-w-2xl lg:max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3AB72]/15 border border-[#E3AB72]/40 text-[#B26A25] text-xs font-semibold uppercase tracking-wider">
              <span>Sovereign Digital Systems</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#101513] font-serif leading-[1.18] sm:leading-[1.14] tracking-tight">
              We Engineer the Systems Behind Better Business.
            </h1>

            <p className="text-sm sm:text-base lg:text-[16.5px] text-[#5B6761] font-normal leading-relaxed">
              From your first website to intelligent enterprise operations, SERK Technologies
              Group designs and develops practical digital solutions for organizations ready to
              work smarter. We combine software engineering, thoughtful design, responsible AI and
              deep attention to real-world workflows — starting in Ethiopia, built for a wider world.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors shadow-sm text-center"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-sm font-semibold text-[#101513] bg-[#F4F7F5] hover:bg-[#DEE6E0] border border-[#DEE6E0] transition-colors text-center"
              >
                <span>Explore Platforms</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Fallback preview for smaller screens where SVG background shifts */}
        <div className="lg:hidden w-full px-6 pb-12 flex justify-center">
          <div className="relative aspect-[16/11] w-full max-w-[440px] rounded-2xl overflow-hidden border border-[#DEE6E0] shadow-lg bg-[#FAFCFA]">
            <Image
              src="/images/serk-hero.svg"
              alt="SERK Enterprise Architecture and Platforms"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          2. ABOUT US SECTION
          ======================================================== */}
      <section className="py-20 bg-white border-b border-[#DEE6E0]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D4634]">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#101513] mt-2 mb-4">
              We Build Software That Thinks Ahead
            </h2>
            <p className="text-base text-[#5B6761] leading-relaxed">
              Serk Group is a software company with one simple belief: every organisation deserves
              systems as smart as the people who run them. Starting in Ethiopia and building for a
              wider world, we design and deploy digital platforms, intelligent operations and custom
              software that solve real problems for real businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F4F7F5] p-8 rounded-xl border border-[#DEE6E0] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white border border-[#DEE6E0] flex items-center justify-center font-serif font-bold text-[#0D4634] mb-4">
                  01
                </div>
                <h3 className="text-lg font-bold font-serif text-[#101513] mb-2">
                  Real-World Engineering
                </h3>
                <p className="text-sm text-[#5B6761] leading-relaxed">
                  Software designed from site offices, clinics and retail counters — built for
                  real Ethiopian connectivity and heavy enterprise workflows.
                </p>
              </div>
            </div>

            <div className="bg-[#F4F7F5] p-8 rounded-xl border border-[#DEE6E0] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white border border-[#DEE6E0] flex items-center justify-center font-serif font-bold text-[#0D4634] mb-4">
                  02
                </div>
                <h3 className="text-lg font-bold font-serif text-[#101513] mb-2">
                  Responsible AI
                </h3>
                <p className="text-sm text-[#5B6761] leading-relaxed">
                  Machine intelligence that explains its answers, audits its outputs and respects
                  human clinical and engineering judgment.
                </p>
              </div>
            </div>

            <div className="bg-[#F4F7F5] p-8 rounded-xl border border-[#DEE6E0] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white border border-[#DEE6E0] flex items-center justify-center font-serif font-bold text-[#0D4634] mb-4">
                  03
                </div>
                <h3 className="text-lg font-bold font-serif text-[#101513] mb-2">
                  One Connected Future
                </h3>
                <p className="text-sm text-[#5B6761] leading-relaxed">
                  Systems built on shared database standards so every tool, POS terminal, and
                  accounting ledger synchronizes automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. OUR SOLUTIONS & SMART INDUSTRY PLATFORMS
          ======================================================== */}
      <section className="py-20 bg-[#F4F7F5] border-b border-[#DEE6E0]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D4634]">
              Our Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#101513] mt-2 mb-4">
              Smart Industry Platforms
            </h2>
            <p className="text-base text-[#5B6761] leading-relaxed">
              Serk Construction with its AI Estimator and the AI-assisted Serk Hospital Management
              System run your core operations from first click to audit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Platform 1: Construction & Estimator */}
            <div className="bg-white rounded-2xl border border-[#DEE6E0] p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0D4634] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    Construction Technology
                  </span>
                  <MaturityBadge stage="PRODUCTION_AVAILABLE" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#101513] mb-3">
                  Construction Takeoff & AI Estimator
                </h3>
                <p className="text-sm text-[#5B6761] leading-relaxed mb-6">
                  Turn architectural drawings and CAD files into complete Bills of Quantities (BOQ)
                  in Ethiopian Birr. Drastically reduce bidding cycles and eliminate structural
                  cost estimation errors.
                </p>
                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-xs text-[#101513]">
                    <CheckCircle2 className="w-4 h-4 text-[#0D4634]" />
                    <span>Automated concrete, rebar, and masonry takeoffs</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#101513]">
                    <CheckCircle2 className="w-4 h-4 text-[#0D4634]" />
                    <span>Real-time Ethiopian supplier price index sync</span>
                  </div>
                </div>
              </div>
              <Link
                href="/products/construction-estimator"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0D4634] hover:underline"
              >
                <span>Explore Construction OS</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Platform 2: Hospital Management System */}
            <div className="bg-white rounded-2xl border border-[#DEE6E0] p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    Healthcare Informatics
                  </span>
                  <MaturityBadge stage="PILOT_PRIVATE_BETA" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#101513] mb-3">
                  Hospital & Clinical Management System (HMS)
                </h3>
                <p className="text-sm text-[#5B6761] leading-relaxed mb-6">
                  Complete outpatient queues, encrypted electronic medical records (EMR), laboratory
                  results, pharmacy inventory, and ICD-11 coding with 100% private enterprise data residency.
                </p>
                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-xs text-[#101513]">
                    <CheckCircle2 className="w-4 h-4 text-[#0D4634]" />
                    <span>Zero foreign cloud dependency — on-premise encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#101513]">
                    <CheckCircle2 className="w-4 h-4 text-[#0D4634]" />
                    <span>Automated triage, billing, and pharmacy dispensing</span>
                  </div>
                </div>
              </div>
              <Link
                href="/products/hospital-management-system"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0D4634] hover:underline"
              >
                <span>Explore Hospital OS</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. WHY CHOOSE SERK GROUP? (Exact match of port 8000)
          ======================================================== */}
      <section className="py-20 bg-white border-b border-[#DEE6E0]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#101513] mb-3">
              Why Choose{' '}
              <span className="text-[#E3AB72] underline decoration-2 underline-offset-4">
                Serk Group
              </span>
              ?
            </h2>
            <p className="text-base text-[#5B6761] leading-relaxed">
              At Serk, we pair real industry know-how with practical AI. The result is software that
              feels made for you, because it is. Here&apos;s why teams choose us:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 4 Clean Cards with Circular Checkmarks */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-[#F4F7F5] p-6 rounded-xl border border-[#DEE6E0] shadow-sm">
                <div className="w-6 h-6 rounded-full bg-[#101513] text-white flex items-center justify-center mb-3">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <h3 className="text-base font-bold text-[#101513] mb-1.5">AI at the Core</h3>
                <p className="text-xs sm:text-[13px] text-[#5B6761] leading-relaxed">
                  Intelligence is built into every Serk product, not bolted on afterwards.
                </p>
              </div>

              <div className="bg-[#F4F7F5] p-6 rounded-xl border border-[#DEE6E0] shadow-sm">
                <div className="w-6 h-6 rounded-full bg-[#101513] text-white flex items-center justify-center mb-3">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <h3 className="text-base font-bold text-[#101513] mb-1.5">Built for Your Industry</h3>
                <p className="text-xs sm:text-[13px] text-[#5B6761] leading-relaxed">
                  Purpose-built for construction, healthcare, finance and retail teams.
                </p>
              </div>

              <div className="bg-[#F4F7F5] p-6 rounded-xl border border-[#DEE6E0] shadow-sm">
                <div className="w-6 h-6 rounded-full bg-[#101513] text-white flex items-center justify-center mb-3">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <h3 className="text-base font-bold text-[#101513] mb-1.5">One Connected Family</h3>
                <p className="text-xs sm:text-[13px] text-[#5B6761] leading-relaxed">
                  Systems that share data and work together as your business grows.
                </p>
              </div>

              <div className="bg-[#F4F7F5] p-6 rounded-xl border border-[#DEE6E0] shadow-sm">
                <div className="w-6 h-6 rounded-full bg-[#101513] text-white flex items-center justify-center mb-3">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <h3 className="text-base font-bold text-[#101513] mb-1.5">Tailored to You</h3>
                <p className="text-xs sm:text-[13px] text-[#5B6761] leading-relaxed">
                  We configure, integrate and automate around the way you already work.
                </p>
              </div>
            </div>

            {/* Right Photo Card with Gold Overlay Badge (The exact frame from port 8000) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[480px] h-[420px] relative rounded-[20px] overflow-hidden shadow-2xl border border-black/10">
                <Image
                  src="/images/serk-why-choose.jpg"
                  alt="SERK Technologies Group Engineering Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101513]/90 via-[#101513]/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="inline-flex items-center gap-2 bg-[#E3AB72]/20 border border-[#E3AB72]/40 px-3 py-1 rounded-full mb-2 w-max">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3AB72]"></span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E3AB72]">
                      Engineering &amp; Innovation
                    </span>
                  </div>
                  <h4 className="text-lg font-bold font-serif text-white mb-1 leading-snug">
                    Enterprise Digital Systems Built for Heavy Enterprise
                  </h4>
                  <p className="text-xs text-[#DEE6E0] leading-relaxed">
                    Pairing real African industry know-how with practical, mission-critical engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. MEET THE SERK FAMILY
          ======================================================== */}
      <section className="py-20 bg-[#F4F7F5] border-b border-[#DEE6E0]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#101513] mb-3">
              Meet the <span className="text-[#E3AB72]">Serk Family</span>
            </h2>
            <p className="text-base text-[#5B6761]">
              one family of AI-integrated systems, built to work together
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProjects.slice(0, 8).map((project) => (
              <div
                key={project.slug}
                className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm hover:border-[#0D4634] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-[#5B6761] uppercase tracking-wider bg-[#F4F7F5] px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                    <MaturityBadge stage={project.maturity} />
                  </div>
                  <h3 className="text-base font-bold font-serif text-[#101513] mb-2">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#5B6761] leading-relaxed mb-4 line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                <Link
                  href={`/products/${project.slug}`}
                  className="text-xs font-bold text-[#0D4634] hover:underline inline-flex items-center gap-1 pt-3 border-t border-[#DEE6E0]"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors"
            >
              <span>Explore All 23 Platform Dossiers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. SOME OF OUR CLIENTS
          ======================================================== */}
      <section className="py-16 bg-white border-b border-[#DEE6E0]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-2xl font-bold font-serif text-[#101513] mb-2">
            Some of Our <span className="text-[#E3AB72]">Clients</span>
          </h2>
          <p className="text-xs uppercase tracking-widest text-[#5B6761] font-semibold mb-10">
            we are honored to work with
          </p>

          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all">
            <div className="h-10 relative w-32">
              <Image src="/images/client-zoscales.png" alt="Zoscales" fill className="object-contain" />
            </div>
            <div className="h-10 relative w-32">
              <Image src="/images/client-innobiz.png" alt="Innobiz" fill className="object-contain" />
            </div>
            <div className="h-10 relative w-36">
              <Image src="/images/client-hibret-bank.png" alt="Hibret Bank" fill className="object-contain" />
            </div>
            <div className="h-10 relative w-28">
              <Image src="/images/client-sequa.png" alt="Sequa" fill className="object-contain" />
            </div>
            <div className="h-10 relative w-28">
              <Image src="/images/client-tebita.png" alt="Tebita" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. INSIGHTS SECTION
          ======================================================== */}
      <section className="py-20 bg-[#F4F7F5] border-b border-[#DEE6E0]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold font-serif text-[#101513] mb-3">Insights</h2>
            <p className="text-sm text-[#5B6761] leading-relaxed">
              Ideas, guides and product stories from the Serk Group team. See how AI and automation
              are changing the way construction firms, hospitals, finance teams and retailers
              operate in the real world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-[#DEE6E0] overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full bg-[#DEE6E0]">
                <Image
                  src="/images/serk-post-estimator.svg"
                  alt="Inside the Serk AI Estimator"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D4634] block mb-2">
                  Construction AI
                </span>
                <h3 className="text-base font-bold font-serif text-[#101513] mb-2 leading-snug">
                  From Drawing to Budget: Inside the Serk AI Estimator
                </h3>
                <p className="text-xs text-[#5B6761] leading-relaxed line-clamp-3">
                  Estimating used to mean long nights with spreadsheets. See how an AI estimator
                  turns drawings and quantities into a budget in minutes.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href="/insights"
                  className="text-xs font-bold text-[#0D4634] hover:underline inline-flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#DEE6E0] overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full bg-[#DEE6E0]">
                <Image
                  src="/images/serk-post-hospital.svg"
                  alt="AI Across the Patient Journey"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D4634] block mb-2">
                  Healthcare Systems
                </span>
                <h3 className="text-base font-bold font-serif text-[#101513] mb-2 leading-snug">
                  The Hospital That Runs on Insight: AI Across the Patient Journey
                </h3>
                <p className="text-xs text-[#5B6761] leading-relaxed line-clamp-3">
                  How modern clinics automate patient triage, ICD-11 coding, and lab orders while
                  safeguarding medical privacy.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href="/insights"
                  className="text-xs font-bold text-[#0D4634] hover:underline inline-flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#DEE6E0] overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full bg-[#DEE6E0]">
                <Image
                  src="/images/serk-post-finance.svg"
                  alt="What AI Changes in Finance"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D4634] block mb-2">
                  Enterprise Finance
                </span>
                <h3 className="text-base font-bold font-serif text-[#101513] mb-2 leading-snug">
                  Close the Books Faster: What AI Really Changes in Finance
                </h3>
                <p className="text-xs text-[#5B6761] leading-relaxed line-clamp-3">
                  How automated multi-branch reconciliation and tax audit synchronization replace
                  weeks of manual paper reconciliation.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href="/insights"
                  className="text-xs font-bold text-[#0D4634] hover:underline inline-flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. CALL TO ACTION BANNER
          ======================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="bg-[#101513] text-white rounded-2xl p-10 sm:p-14 text-center max-w-3xl mx-auto shadow-2xl">
            <h2 className="text-3xl font-bold font-serif mb-4">
              Ready to Upgrade Your Enterprise Workflows?
            </h2>
            <p className="text-sm text-[#CDE5DC] mb-8 max-w-xl mx-auto leading-relaxed">
              Schedule a technical discovery session with our engineering team to review system
              architecture, live software demos, and deployment timelines.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold text-[#101513] bg-[#E3AB72] hover:bg-[#d69d63] transition-colors shadow-sm"
              >
                <span>Request a System Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:serktechgroup@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
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
