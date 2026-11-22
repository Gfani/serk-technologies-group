import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  Boxes,
  Inbox,
  Palette,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Database,
  Cloud,
  Mail,
  ArrowRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardOverview() {
  let projectCount = 23;
  let leadCount = 0;
  let galleryCount = 6;
  let dbStatus = 'Disconnected / Fallback';

  try {
    projectCount = await prisma.project.count();
    leadCount = await prisma.lead.count();
    galleryCount = await prisma.galleryItem.count();
    dbStatus = 'Connected (Neon PostgreSQL)';
  } catch (err) {
    // In fallback mode
  }

  const cloudinaryConfigured = Boolean(
    process.env.CLOUDINARY_URL || process.env.CLOUDINARY_CLOUD_NAME
  );
  const resendConfigured = Boolean(process.env.RESEND_API_KEY);

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-[#101513]">Executive Overview</h1>
        <p className="text-xs text-[#5B6761] mt-1">
          Real-time telemetry and management controls for SERK Technologies Group web applications.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
          <div className="text-[11px] text-[#5B6761] mt-1">Contact & Demo submissions</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DEE6E0] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5B6761] uppercase tracking-wider">
              Active Platforms
            </span>
            <div className="w-8 h-8 rounded bg-emerald-50 text-[#0D4634] flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#101513]">{projectCount}</div>
          <div className="text-[11px] text-[#5B6761] mt-1">Platforms, systems & ventures</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DEE6E0] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5B6761] uppercase tracking-wider">
              Cloud Media
            </span>
            <div className="w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#101513]">{galleryCount}</div>
          <div className="text-[11px] text-[#5B6761] mt-1">Photos & interface assets</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DEE6E0] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5B6761] uppercase tracking-wider">
              Deploy Environment
            </span>
            <div className="w-8 h-8 rounded bg-purple-50 text-purple-600 flex items-center justify-center">
              <Cloud className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm font-bold text-[#101513]">Render $0/mo</div>
          <div className="text-[11px] text-[#5B6761] mt-1">Neon + Cloudinary + Resend</div>
        </div>
      </div>

      {/* External Services Connectivity Status */}
      <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm">
        <h2 className="text-sm font-bold text-[#101513] mb-4">Cloud Services Health & Connectivity</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#F4F7F5] border border-[#DEE6E0] flex items-start gap-3">
            <Database className="w-5 h-5 text-[#0D4634] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#101513]">Neon PostgreSQL Database</div>
              <div className="text-[11px] text-[#5B6761] mt-0.5">{dbStatus}</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#F4F7F5] border border-[#DEE6E0] flex items-start gap-3">
            <Cloud className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#101513]">Cloudinary Media CDN</div>
              <div className="text-[11px] text-[#5B6761] mt-0.5">
                {cloudinaryConfigured ? 'Connected & Active' : 'Fallback (Local storage mode)'}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#F4F7F5] border border-[#DEE6E0] flex items-start gap-3">
            <Mail className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#101513]">Resend Lead Notifications</div>
              <div className="text-[11px] text-[#5B6761] mt-0.5">
                {resendConfigured ? 'Connected to serktechgroup@gmail.com' : 'Disabled (Key omitted)'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Palette className="w-5 h-5 text-[#0D4634]" />
              <h3 className="text-sm font-bold text-[#101513]">Design Studio & Theme Customizer</h3>
            </div>
            <p className="text-xs text-[#5B6761] leading-relaxed mb-4">
              Dynamically alter global brand colors, font families, button border-radius, and toggle
              between 1-row and 2-row sticky headers without touching code.
            </p>
          </div>
          <Link
            href="/admin/design-studio"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D4634] hover:underline"
          >
            <span>Open Design Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Boxes className="w-5 h-5 text-[#0D4634]" />
              <h3 className="text-sm font-bold text-[#101513]">Projects & Ventures Catalogue</h3>
            </div>
            <p className="text-xs text-[#5B6761] leading-relaxed mb-4">
              Manage the 23 verified software dossiers, update operational maturity stages, and
              configure audience specifications.
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D4634] hover:underline"
          >
            <span>Manage Platform Dossiers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
