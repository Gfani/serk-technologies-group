'use client';

import React, { useState } from 'react';
import { FileText, Save, Check } from 'lucide-react';

export default function AdminPagesEditor() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [saved, setSaved] = useState(false);

  // Editable text blocks state
  const [pageData, setPageData] = useState({
    heroTitle: 'We Engineer the Systems Behind Better Business.',
    heroSubtitle:
      'From your first digital system to intelligent enterprise operations, SERK Technologies Group designs and develops practical digital solutions for organizations ready to work smarter.',
    heroCtaLabel: 'Discuss Your Project',
    statsOne: '23+',
    statsTwo: '4',
    statsThree: '100%',
    whySerkHeading: 'Why Choose SERK Group?',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#101513]">Visual Page & Text Editor</h1>
          <p className="text-xs text-[#5B6761] mt-1">
            Edit live headings, paragraphs, and CTAs across public routes.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors flex items-center gap-1.5"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'Saved Changes' : 'Save Section'}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-semibold text-[#101513] mb-1.5">
            Select Page to Edit
          </label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 border border-[#DEE6E0] rounded text-xs"
          >
            <option value="home">Home Page (/)</option>
            <option value="about">About Us (/about)</option>
            <option value="products">Products &amp; Platforms (/products)</option>
            <option value="solutions">Solutions &amp; Services (/solutions)</option>
            <option value="industries">Industries (/industries)</option>
            <option value="ventures">Ventures (/ventures)</option>
            <option value="partners">Partners &amp; Clients (/partners)</option>
            <option value="gallery">Media Gallery (/gallery)</option>
            <option value="insights">Insights &amp; Articles (/insights)</option>
            <option value="contact">Contact (/contact)</option>
            <option value="privacy">Privacy Policy (/privacy)</option>
            <option value="terms">Terms of Service (/terms)</option>
          </select>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#DEE6E0]">
          <div>
            <label className="block text-xs font-semibold text-[#101513] mb-1">
              Hero Section Heading
            </label>
            <input
              type="text"
              value={pageData.heroTitle}
              onChange={(e) => setPageData({ ...pageData, heroTitle: e.target.value })}
              className="w-full px-3.5 py-2 border border-[#DEE6E0] rounded text-sm text-[#101513]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#101513] mb-1">
              Hero Section Paragraph
            </label>
            <textarea
              rows={3}
              value={pageData.heroSubtitle}
              onChange={(e) => setPageData({ ...pageData, heroSubtitle: e.target.value })}
              className="w-full px-3.5 py-2 border border-[#DEE6E0] rounded text-sm text-[#101513]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#101513] mb-1">
                Primary CTA Button Label
              </label>
              <input
                type="text"
                value={pageData.heroCtaLabel}
                onChange={(e) => setPageData({ ...pageData, heroCtaLabel: e.target.value })}
                className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#101513] mb-1">
                Value Section Heading
              </label>
              <input
                type="text"
                value={pageData.whySerkHeading}
                onChange={(e) => setPageData({ ...pageData, whySerkHeading: e.target.value })}
                className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
