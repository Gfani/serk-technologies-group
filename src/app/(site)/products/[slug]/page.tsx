import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProjectBySlug, getAllProjects } from '@/lib/db';
import MaturityBadge from '@/components/MaturityBadge';
import AnimatedHeaderBanner from '@/components/AnimatedHeaderBanner';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Product Not Found' };
  return {
    title: `${project.name} | SERK Technologies Group`,
    description: project.summary,
  };
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const capabilitiesList = project.capabilities
    ? project.capabilities.split(',').map((c) => c.trim()).filter(Boolean)
    : [];

  const plannedList = project.plannedCapabilities
    ? project.plannedCapabilities.split(',').map((c) => c.trim()).filter(Boolean)
    : [];

  return (
    <div className="w-full bg-[#F4F7F5] min-h-screen">
      <AnimatedHeaderBanner title="Products & Platforms" />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-12 lg:py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0D4634] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products & Platforms Directory</span>
          </Link>
        </div>

        {/* Header Hero Card */}
        <div className="bg-white rounded-2xl border border-[#DEE6E0] p-8 sm:p-12 mb-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5B6761] bg-[#F4F7F5] px-2.5 py-1 rounded">
                  {project.category}
                </span>
                <MaturityBadge stage={project.maturity} />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101513]">
                {project.name}
              </h1>

              <p className="text-lg text-[#5B6761] leading-relaxed">
                {project.summary}
              </p>

              {project.audience && (
                <div className="pt-2 text-xs text-[#5B6761]">
                  <strong className="text-[#101513]">Primary Audience & Operators:</strong>{' '}
                  {project.audience}
                </div>
              )}
            </div>

            <div className="lg:col-span-4 bg-[#F4F7F5] border border-[#DEE6E0] rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#101513]">Deployment & Trial</h3>
              <p className="text-xs text-[#5B6761] leading-relaxed">
                Schedule a technical discovery session or request sandbox credentials for this
                platform.
              </p>
              <Link
                href={`/contact?interest=${encodeURIComponent(project.name)}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors"
              >
                <span>{project.publicCta || 'Request Platform Demo'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Dossier Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Full Description & Capabilities */}
          <div className="lg:col-span-8 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl border border-[#DEE6E0] p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#101513] mb-4">System Overview</h2>
              <div className="text-sm sm:text-base text-[#5B6761] leading-relaxed space-y-4">
                <p>
                  {project.description ||
                    `${project.name} is engineered to address high-friction workflows with sovereign software architecture. Built from the ground up to ensure seamless multi-platform responsiveness, rigorous data integrity, and adherence to international industry compliance.`}
                </p>
              </div>
            </div>

            {/* Current Capabilities */}
            {capabilitiesList.length > 0 && (
              <div className="bg-white rounded-xl border border-[#DEE6E0] p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#101513] mb-4">
                  Verified Operational Capabilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {capabilitiesList.map((cap, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-[#F4F7F5] border border-[#DEE6E0]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0D4634] shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-[#101513]">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Planned Capabilities */}
            {plannedList.length > 0 && (
              <div className="bg-white rounded-xl border border-[#DEE6E0] p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#101513] mb-2">
                  Engineering Roadmap & Planned Features
                </h2>
                <p className="text-xs text-[#5B6761] mb-6">
                  Features currently under active development in our engineering pipeline.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {plannedList.map((plan, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/50 border border-amber-200/60"
                    >
                      <Cpu className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-amber-900">{plan}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Governance & Specifications */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#101513] border-b border-[#DEE6E0] pb-3">
                Governance &amp; Compliance
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#5B6761] block">Maturity Status:</span>
                  <span className="font-bold text-[#101513]">{project.maturity}</span>
                </div>
                <div>
                  <span className="text-[#5B6761] block">Deployment Mode:</span>
                  <span className="font-bold text-[#101513]">
                    On-Premise / Private Cloud / Hybrid
                  </span>
                </div>
                <div>
                  <span className="text-[#5B6761] block">Database Engine:</span>
                  <span className="font-bold text-[#101513]">PostgreSQL / Encrypted Ledger</span>
                </div>
                <div>
                  <span className="text-[#5B6761] block">Codebase Ownership:</span>
                  <span className="font-bold text-[#101513]">100% SERK Enterprise IP</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0D4634] text-white rounded-xl p-6 space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#A1D9C5]" />
              <h4 className="text-sm font-bold">Audit &amp; Compliance Support</h4>
              <p className="text-xs text-[#CDE5DC] leading-relaxed">
                Full documentation, data migration utilities, and staff onboarding workshops are
                provided for all pilot enterprise deployments.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:underline pt-2"
              >
                <span>Inquire about pilot terms</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
