'use client';

import React, { useState } from 'react';
import { Settings, Download, Upload, Shield, Database, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [restoring, setRestoring] = useState(false);
  const [restoreSuccess, setRestoreSuccess] = useState(false);

  const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm('Restoring will overwrite current database records. Proceed?')) return;

    setRestoring(true);
    setRestoreSuccess(false);

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      const res = await fetch('/api/admin/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json),
      });

      if (res.ok) {
        setRestoreSuccess(true);
        setTimeout(() => setRestoreSuccess(false), 4000);
      } else {
        alert('Restore error.');
      }
    } catch (err: any) {
      alert(`Invalid backup JSON: ${err.message}`);
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#101513]">System Settings & Data Resilience</h1>
        <p className="text-xs text-[#5B6761] mt-1">
          One-Click full database JSON backup, restoration, and external cloud persistence.
        </p>
      </div>

      {restoreSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-xs text-emerald-800 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Database successfully restored from JSON backup archive.</span>
        </div>
      )}

      {/* Backup & Restore Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center mb-4">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#101513] mb-2">Export Full JSON Backup</h3>
            <p className="text-xs text-[#5B6761] leading-relaxed">
              Download complete snapshot of theme tokens, all 23 dossiers, media metadata, blog
              articles, and leads into a single portable `.json` file.
            </p>
          </div>
          <a
            href="/api/admin/backup"
            download
            className="w-full py-2.5 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Backup JSON</span>
          </a>
        </div>

        {/* Restore Card */}
        <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center mb-4">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#101513] mb-2">Restore from Backup</h3>
            <p className="text-xs text-[#5B6761] leading-relaxed">
              Upload a previously exported JSON backup to repopulate Neon PostgreSQL after disaster
              recovery or staging replication.
            </p>
          </div>

          <label className="w-full py-2.5 rounded text-xs font-semibold text-[#101513] bg-[#F4F7F5] hover:bg-[#DEE6E0] border border-[#DEE6E0] transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{restoring ? 'Restoring DB...' : 'Upload Backup JSON'}</span>
            <input
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleRestore}
              disabled={restoring}
            />
          </label>
        </div>
      </div>

      {/* Deployment & Environment Variables Guide */}
      <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#101513]">Production Configuration Keys</h3>
        <p className="text-xs text-[#5B6761]">
          Required environment variables configured in Render Dashboard:
        </p>

        <div className="space-y-2 text-xs font-mono">
          <div className="p-2.5 bg-[#F4F7F5] rounded border border-[#DEE6E0] flex justify-between">
            <span className="text-[#0D4634] font-bold">DATABASE_URL</span>
            <span className="text-[#5B6761]">postgresql://...@...neon.tech/neondb?sslmode=require</span>
          </div>
          <div className="p-2.5 bg-[#F4F7F5] rounded border border-[#DEE6E0] flex justify-between">
            <span className="text-[#0D4634] font-bold">CLOUDINARY_URL</span>
            <span className="text-[#5B6761]">cloudinary://api_key:api_secret@cloud_name</span>
          </div>
          <div className="p-2.5 bg-[#F4F7F5] rounded border border-[#DEE6E0] flex justify-between">
            <span className="text-[#0D4634] font-bold">RESEND_API_KEY</span>
            <span className="text-[#5B6761]">re_... (notifies serktechgroup@gmail.com)</span>
          </div>
          <div className="p-2.5 bg-[#F4F7F5] rounded border border-[#DEE6E0] flex justify-between">
            <span className="text-[#0D4634] font-bold">ADMIN_EMAIL / ADMIN_PASSWORD</span>
            <span className="text-[#5B6761]">admin@serkgroup.com / ••••••••</span>
          </div>
        </div>
      </div>
    </div>
  );
}
