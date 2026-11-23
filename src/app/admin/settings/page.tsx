'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Download, Upload, CheckCircle2, Save, Building, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function AdminSettingsPage() {
  const [restoring, setRestoring] = useState(false);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [siteInfo, setSiteInfo] = useState({
    name: 'SERK Technologies Group',
    tagline: 'Innovation with Integrity',
    email: 'serktechgroup@gmail.com',
    phone: '+251 999 911 192',
    address: 'Mekelle, Tigray, Ethiopia',
    jurisdiction: 'Sovereign Digital Systems',
    workingHours: 'Mon - Sat: 8:30 AM - 6:00 PM (EAT)',
    linkedinUrl: 'https://linkedin.com',
    telegramUrl: 'https://t.me/serktech',
  });

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.siteInfo) {
          setSiteInfo((prev) => ({ ...prev, ...data.siteInfo }));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteInfo }),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert('Failed to save settings.');
      }
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm('Restoring will overwrite current site records. Proceed?')) return;

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
        <h1 className="text-2xl font-bold text-[#101513]">Site Settings &amp; Data Resilience</h1>
        <p className="text-xs text-[#5B6761] mt-1">
          Manage general organization profile, contact coordinates, and export full JSON backups.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-xs text-emerald-800 font-semibold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Organization profile and contact settings saved successfully.</span>
        </div>
      )}

      {restoreSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-xs text-emerald-800 font-semibold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Website records successfully restored from JSON backup archive.</span>
        </div>
      )}

      {/* Organization Settings Form */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#DEE6E0] pb-4">
          <div className="flex items-center gap-2.5">
            <Building className="w-5 h-5 text-[#0D4634]" />
            <h2 className="text-sm font-bold text-[#101513]">Organization Profile &amp; Contact Coordinates</h2>
          </div>
          <button
            type="submit"
            disabled={savingSettings}
            className="px-4 py-2 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savingSettings ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-[#101513] mb-1">Company / Group Name</label>
            <input
              type="text"
              value={siteInfo.name}
              onChange={(e) => setSiteInfo({ ...siteInfo, name: e.target.value })}
              className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#101513] mb-1">Official Tagline</label>
            <input
              type="text"
              value={siteInfo.tagline}
              onChange={(e) => setSiteInfo({ ...siteInfo, tagline: e.target.value })}
              className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#101513] mb-1">Primary Inquiries Email</label>
            <input
              type="email"
              value={siteInfo.email}
              onChange={(e) => setSiteInfo({ ...siteInfo, email: e.target.value })}
              className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#101513] mb-1">Official Phone Line</label>
            <input
              type="text"
              value={siteInfo.phone}
              onChange={(e) => setSiteInfo({ ...siteInfo, phone: e.target.value })}
              className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#101513] mb-1">Head Office Location</label>
            <input
              type="text"
              value={siteInfo.address}
              onChange={(e) => setSiteInfo({ ...siteInfo, address: e.target.value })}
              className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#101513] mb-1">Operating Jurisdiction</label>
            <input
              type="text"
              value={siteInfo.jurisdiction}
              onChange={(e) => setSiteInfo({ ...siteInfo, jurisdiction: e.target.value })}
              className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#101513] mb-1">Office Working Hours</label>
            <input
              type="text"
              value={siteInfo.workingHours}
              onChange={(e) => setSiteInfo({ ...siteInfo, workingHours: e.target.value })}
              className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#101513] mb-1">Official LinkedIn URL</label>
            <input
              type="text"
              value={siteInfo.linkedinUrl}
              onChange={(e) => setSiteInfo({ ...siteInfo, linkedinUrl: e.target.value })}
              className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
            />
          </div>
        </div>
      </form>

      {/* Render 24/7 Keep-Alive & Anti-Sleep Engine */}
      <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#DEE6E0] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base font-bold text-[#101513]">Render 24/7 Keep-Alive & Anti-Sleep Engine</h3>
          </div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
            Active • 10-Min Wake Cycle
          </span>
        </div>

        <p className="text-xs text-[#5B6761] leading-relaxed">
          Render's free tier spins down web instances after 15 minutes of inactivity. This system keeps your application warm 24/7 through dual-layer keep-alive mechanisms:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-lg bg-[#F4F7F5] border border-[#DEE6E0] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#101513]">1. In-App Auto-Pinger</span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Enabled</span>
            </div>
            <p className="text-[11px] text-[#5B6761] leading-relaxed">
              Internal timer automatically pings <code className="text-[#0D4634] font-semibold">/api/health</code> every 10 minutes to reset Render's 15-minute inactivity counter before sleep can trigger.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F4F7F5] border border-[#DEE6E0] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#101513]">2. GitHub Actions Scheduled Ping</span>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Scheduled</span>
            </div>
            <p className="text-[11px] text-[#5B6761] leading-relaxed">
              External cloud worker curls your live domain every 12 minutes. If the instance ever spins down during maintenance, this external ping automatically wakes it up immediately.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-lg border border-[#E3AB72]/40 bg-[#E3AB72]/10 text-xs text-[#101513] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B26A25] flex-shrink-0" />
            <span>Target Endpoint: <strong>https://serk-technologies-group.onrender.com/api/health</strong></span>
          </div>
          <a
            href="/api/health"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-[#0D4634] underline hover:text-[#2D735A]"
          >
            Test Health Endpoint &rarr;
          </a>
        </div>
      </div>

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
              Download complete snapshot of theme tokens, all 23 dossiers across the 7 categories, media metadata, and inquiries into a single portable `.json` file.
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
              Upload a previously exported JSON backup to repopulate all website content and platform records instantly.
            </p>
          </div>

          <label className="w-full py-2.5 rounded text-xs font-semibold text-[#101513] bg-[#F4F7F5] hover:bg-[#DEE6E0] border border-[#DEE6E0] transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{restoring ? 'Restoring Content...' : 'Upload Backup JSON'}</span>
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
    </div>
  );
}
