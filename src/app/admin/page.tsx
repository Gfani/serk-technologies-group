import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getStoredProjects } from '@/lib/contentStore';
import {
  Boxes,
  Inbox,
  Palette,
  FileText,
  Image as ImageIcon,
  ArrowRight,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardOverview() {
  let projectCount = 23;
  let leadCount = 0;
  let galleryCount = 6;

  try {
    const projects = await getStoredProjects();
    projectCount = projects.length;
    leadCount = await prisma.lead.count();
    galleryCount = await prisma.galleryItem.count();
  } catch (err) {
    // In fallback mode
  }

  const categories = [
    { id: 'sector-intelligence', name: 'Sector Intelligence', count: 3, desc: 'Construction, Hospital & Clinic OS' },
    { id: 'ai-security', name: 'AI & Security Research', count: 3, desc: '5D Estimator, QUORUM & Sentinel AI' },
    { id: 'enterprise-operations', name: 'Enterprise & Operations', count: 4, desc: 'Office OS, Finance, POS & Materials' },
    { id: 'solutions', name: 'Core Solutions & Integrations', count: 2, desc: 'Automation Copilots & SERK Pay' },
    { id: 'ventures', name: 'Digital Ventures', count: 4, desc: 'Segar Ride, Delivery, LO Africa & Visit Tigray' },
    { id: 'affiliated', name: 'Affiliated Businesses', count: 4, desc: 'KaBUN, Yummy Bakery, Vision & Senselet' },
    { id: 'future-innovation', name: 'Future Innovation', count: 3, desc: 'Motors, Hardware Compute & Academy' },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-[#101513]">Executive Overview</h1>
        <p className="text-xs text-[#5B6761] mt-1">
          Complete content, platform, and inquiry management for SERK Technologies Group.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-[#DEE6E0] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5B6761] uppercase tracking-wider">
              Total Platforms
            </span>
            <div className="w-8 h-8 rounded bg-emerald-50 text-[#0D4634] flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#101513]">{projectCount}</div>
          <div className="text-[11px] text-[#5B6761] mt-1">Dossiers across 7 sectors</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DEE6E0] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5B6761] uppercase tracking-wider">
              Active Sectors
            </span>
            <div className="w-8 h-8 rounded bg-teal-50 text-teal-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#101513]">7</div>
          <div className="text-[11px] text-[#5B6761] mt-1">Website operational categories</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DEE6E0] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5B6761] uppercase tracking-wider">
              Inquiry Leads
            </span>
            <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#101513]">{leadCount}</div>
          <div className="text-[11px] text-[#5B6761] mt-1">Contact &amp; demo requests</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DEE6E0] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5B6761] uppercase tracking-wider">
              Media Gallery
            </span>
            <div className="w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#101513]">{galleryCount}</div>
          <div className="text-[11px] text-[#5B6761] mt-1">Photos &amp; system assets</div>
        </div>
      </div>

      {/* Website Sectors & Categories Navigation */}
      <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-[#101513]">Website Sectors &amp; Categories (7)</h2>
            <p className="text-xs text-[#5B6761] mt-0.5">
              All 23 platform dossiers are organized into these 7 public website categories.
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="text-xs font-semibold text-[#0D4634] hover:underline flex items-center gap-1"
          >
            <span>Manage All 23 Platforms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-lg bg-[#F4F7F5] border border-[#DEE6E0] hover:border-[#0D4634] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-xs font-bold text-[#101513]">{cat.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-[#DEE6E0] text-[#0D4634]">
                    {cat.count} Systems
                  </span>
                </div>
                <p className="text-[11px] text-[#5B6761] line-clamp-2">{cat.desc}</p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#DEE6E0]/60 flex items-center justify-between text-[11px]">
                <Link
                  href={`/admin/projects`}
                  className="font-semibold text-[#0D4634] hover:underline"
                >
                  Edit Platforms &rarr;
                </Link>
                <Link
                  href={`/products#${cat.id}`}
                  target="_blank"
                  className="text-[#5B6761] hover:text-[#101513] flex items-center gap-1"
                >
                  <span>View Public</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-[#0D4634]" />
              <h3 className="text-sm font-bold text-[#101513]">Universal Page &amp; Text Editor</h3>
            </div>
            <p className="text-xs text-[#5B6761] leading-relaxed mb-4">
              Edit any headline, paragraph, CTA button label, stats counter, mission, vision, or
              office contact detail across all pages of the website.
            </p>
          </div>
          <Link
            href="/admin/pages"
            className="inline-flex items-center text-xs font-bold text-[#0D4634] hover:text-[#2D735A] gap-1"
          >
            <span>Open Page &amp; Text Editor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Palette className="w-5 h-5 text-[#0D4634]" />
              <h3 className="text-sm font-bold text-[#101513]">Design Studio &amp; Theme Customizer</h3>
            </div>
            <p className="text-xs text-[#5B6761] leading-relaxed mb-4">
              Dynamically alter global brand colors, font families, button border-radius, and toggle
              between 1-row and 2-row sticky headers without touching code.
            </p>
          </div>
          <Link
            href="/admin/design-studio"
            className="inline-flex items-center text-xs font-bold text-[#0D4634] hover:text-[#2D735A] gap-1"
          >
            <span>Open Design Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
