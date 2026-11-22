'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Save,
  Check,
  Layers,
  Sparkles,
  Globe,
  Home,
  Info,
  PhoneCall,
  Briefcase,
  Compass,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export default function AdminUniversalContentEditor() {
  const [activeTab, setActiveTab] = useState<'categories' | 'pages' | 'header_footer'>('categories');
  const [selectedCategory, setSelectedCategory] = useState('sector-intelligence');
  const [selectedPage, setSelectedPage] = useState('home');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [content, setContent] = useState<any>({
    siteInfo: {
      name: 'SERK Technologies Group',
      tagline: 'Innovation with Integrity',
      email: 'serktechgroup@gmail.com',
      phone: '+251 999 911 192',
      address: 'Mekelle, Tigray, Ethiopia',
      jurisdiction: 'Sovereign Digital Systems',
      workingHours: 'Mon - Sat: 8:30 AM - 6:00 PM (EAT)',
      linkedinUrl: 'https://linkedin.com',
      telegramUrl: 'https://t.me/serktech',
    },
    header: {
      tagline: 'Deep Tech & Sovereign Systems',
      ctaLabel: 'Discuss Your Project',
      ctaUrl: '/contact_us/',
    },
    footer: {
      visitUsHeading: 'VISIT US',
      addressLine1: 'Mekelle, Tigray, Ethiopia',
      addressLine2: 'Sovereign Digital Systems',
      copyrightText: 'Copyright © 2026 SERK Technologies Group. All rights reserved.',
      tagline: 'Innovation with Integrity',
    },
    categories: {
      'sector-intelligence': {
        title: 'Sector Intelligence',
        subtitle: 'Specialized vertical platforms engineering decisions and workflows for construction and healthcare.',
        description: 'Domain-specific enterprise platforms designed around the unique regulatory and operational realities of African industry.',
        badge: 'Active Pilots',
      },
      'ai-security': {
        title: 'AI & Security Research',
        subtitle: 'Engineering foundations for governed multi-model intelligence, cybersecurity, and quantitative estimating.',
        description: 'Rigorous security architecture reviews, automated vulnerability discovery, and transparent multi-agent reasoning.',
        badge: 'Applied Research',
      },
      'enterprise-operations': {
        title: 'Enterprise & Operations',
        subtitle: 'Connected software environments that streamline core administrative, financial, sales, and supply chain operations.',
        description: 'High-velocity sales checkout, dual-calendar Gregorian/Ethiopian attendance, and multi-branch inventory tracking.',
        badge: 'Production Available',
      },
      'solutions': {
        title: 'Core Solutions & Integrations',
        subtitle: 'Purpose-built operational automation, workflow copilots, and financial infrastructure linking legacy systems.',
        description: 'Event-driven approval workflows, invoice optical data extraction, and Ethiopian banking gateway integrations.',
        badge: 'Engineered Solutions',
      },
      'ventures': {
        title: 'Digital Ventures',
        subtitle: 'Autonomous digital platforms exploring urban mobility, connected delivery, transparent commerce, and heritage tourism.',
        description: 'Mission-driven technology startups tackling everyday urban transport, regional logistics, and cultural preservation.',
        badge: 'Venture Studio',
      },
      'affiliated': {
        title: 'Affiliated & Associated Businesses',
        subtitle: 'Frontline enterprise proving grounds and leadership-associated companies providing real-world operational testing.',
        description: 'Real physical enterprises testing software under daily retail and jobsite conditions before broad commercial release.',
        badge: 'Operational Proving Grounds',
      },
      'future-innovation': {
        title: 'Future Innovation & Sovereign Tech',
        subtitle: 'Long-term industrial research, vehicle assembly concepts, clean energy accessories, and African developer talent development.',
        description: 'Building sustainable African manufacturing capability, sovereign compute infrastructure, and youth engineering apprenticeships.',
        badge: 'Long-Term Horizons',
      },
    },
    pages: {
      home: {
        heroTitle: 'We Engineer the Systems Behind Better Business.',
        heroSubtitle: 'From your first website to intelligent enterprise operations, SERK Technologies Group designs and develops practical digital solutions for organizations ready to work smarter. We combine software engineering, thoughtful design, responsible AI and deep attention to real-world workflows — starting in Ethiopia, built for a wider world.',
        heroCtaLabel: 'Discuss Your Project',
        heroCtaUrl: '/contact_us/',
        whySerkHeading: 'Why Choose Serk Group?',
        whySerkSubtitle: 'At Serk, we pair real industry know-how with practical AI. The result is software that feels made for you, because it is.',
        statsOneValue: '23+',
        statsOneLabel: 'Software Systems & Platforms',
        statsTwoValue: '4',
        statsTwoLabel: 'Key Industry Sectors',
        statsThreeValue: '100%',
        statsThreeLabel: 'Sovereign Engineering Ownership',
      },
      about: {
        title: 'Engineering Sovereign Technology for Heavy Enterprise',
        subtitle: 'SERK Technologies Group pairs real African industry know-how with practical software engineering, cloud architecture, and responsible AI.',
        mission: 'To engineer trustworthy, high-performing software systems that elevate African industry and empower organizations to operate autonomously.',
        vision: 'A self-reliant technological ecosystem where Ethiopian and African enterprises run on software built for their exact workflows.',
      },
      products: {
        title: 'SERK Products & Platforms',
        subtitle: 'SERK develops connected software platforms shaped around the demands of real industries, paired with honest maturity disclosures and practical engineering.',
      },
      services: {
        title: 'Solutions & Systems Architecture',
        subtitle: 'Custom enterprise software engineering, AI automation copilots, and cloud architecture built around the realities of your business.',
      },
      ventures: {
        title: 'Turning Technology Into Possibilities',
        subtitle: 'Through separate platforms and venture initiatives, our teams explore better mobility, connected delivery, digital tourism, and future industrial technology.',
      },
      contact: {
        title: "Let's Build Something That Works",
        subtitle: "Tell us about your organization's goals, existing bottlenecks, or platform needs. Our engineering leadership responds within 24 business hours.",
        officeAddress: 'Mekelle, Tigray, Ethiopia',
        email: 'serktechgroup@gmail.com',
        phone: '+251 999 911 192',
      },
    },
  });

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.categories) {
          setContent(data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert('Save error.');
      }
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const updateCategory = (key: string, field: string, val: string) => {
    setContent((prev: any) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [key]: {
          ...(prev.categories[key] || {}),
          [field]: val,
        },
      },
    }));
  };

  const updatePage = (pageKey: string, field: string, val: string) => {
    setContent((prev: any) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [pageKey]: {
          ...(prev.pages[pageKey] || {}),
          [field]: val,
        },
      },
    }));
  };

  const updateHeaderFooter = (section: 'header' | 'footer', field: string, val: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: val,
      },
    }));
  };

  const categoryList = [
    { id: 'sector-intelligence', name: 'Sector Intelligence', count: 3 },
    { id: 'ai-security', name: 'AI & Security Research', count: 3 },
    { id: 'enterprise-operations', name: 'Enterprise & Operations', count: 4 },
    { id: 'solutions', name: 'Core Solutions & Integrations', count: 2 },
    { id: 'ventures', name: 'Digital Ventures', count: 4 },
    { id: 'affiliated', name: 'Affiliated Businesses', count: 4 },
    { id: 'future-innovation', name: 'Future Innovation & Tech', count: 3 },
  ];

  const currentCat = content.categories?.[selectedCategory] || {};
  const currentPage = content.pages?.[selectedPage] || {};

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#101513]">Universal Content &amp; Category Editor</h1>
          <p className="text-xs text-[#5B6761] mt-1">
            Edit all 7 sectors, headings, value pillars, and pages across the entire website.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors flex items-center gap-1.5 shadow-sm"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : saved ? 'Saved Successfully' : 'Save Changes'}</span>
        </button>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>All text changes saved and synchronized across the website.</span>
        </div>
      )}

      {/* Main Mode Tabs */}
      <div className="flex border-b border-[#DEE6E0] space-x-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-3 flex items-center gap-2 transition-colors ${
            activeTab === 'categories'
              ? 'border-b-2 border-[#0D4634] text-[#0D4634]'
              : 'text-[#5B6761] hover:text-[#101513]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Website Sectors &amp; Categories (7)</span>
        </button>

        <button
          onClick={() => setActiveTab('pages')}
          className={`pb-3 flex items-center gap-2 transition-colors ${
            activeTab === 'pages'
              ? 'border-b-2 border-[#0D4634] text-[#0D4634]'
              : 'text-[#5B6761] hover:text-[#101513]'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Public Pages Content</span>
        </button>

        <button
          onClick={() => setActiveTab('header_footer')}
          className={`pb-3 flex items-center gap-2 transition-colors ${
            activeTab === 'header_footer'
              ? 'border-b-2 border-[#0D4634] text-[#0D4634]'
              : 'text-[#5B6761] hover:text-[#101513]'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Header, Footer &amp; Contact</span>
        </button>
      </div>

      {/* TAB 1: ALL 7 WEBSITE CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          {/* Category Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {categoryList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#0D4634] text-white shadow-sm'
                    : 'bg-white border border-[#DEE6E0] text-[#5B6761] hover:bg-[#F4F7F5]'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Category Edit Card */}
          <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#DEE6E0] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#101513]">{currentCat.title || selectedCategory}</h3>
                <p className="text-xs text-[#5B6761]">Configure public title, sector description, and badges for this category.</p>
              </div>
              <a
                href={`/products#${selectedCategory}`}
                target="_blank"
                className="text-xs font-semibold text-[#0D4634] hover:underline flex items-center gap-1"
              >
                <span>View on Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#101513] mb-1">Sector Display Name</label>
                <input
                  type="text"
                  value={currentCat.title || ''}
                  onChange={(e) => updateCategory(selectedCategory, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#101513] mb-1">Status / Maturity Badge</label>
                <input
                  type="text"
                  value={currentCat.badge || ''}
                  onChange={(e) => updateCategory(selectedCategory, 'badge', e.target.value)}
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
                  placeholder="e.g. Active Pilots, Operational Proving Ground"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-[#101513] mb-1">Headline Subtitle</label>
              <input
                type="text"
                value={currentCat.subtitle || ''}
                onChange={(e) => updateCategory(selectedCategory, 'subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
              />
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-[#101513] mb-1">Detailed Sector Description</label>
              <textarea
                rows={3}
                value={currentCat.description || ''}
                onChange={(e) => updateCategory(selectedCategory, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PUBLIC WEBSITE PAGES */}
      {activeTab === 'pages' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'home', name: 'Home Page (/)' },
              { id: 'about', name: 'About Us (/about_us/)' },
              { id: 'products', name: 'Products Catalog (/products/)' },
              { id: 'services', name: 'Solutions & Architecture (/services/)' },
              { id: 'ventures', name: 'Digital Ventures (/ventures/)' },
              { id: 'contact', name: 'Contact Us (/contact_us/)' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPage(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedPage === p.id
                    ? 'bg-[#0D4634] text-white shadow-sm'
                    : 'bg-white border border-[#DEE6E0] text-[#5B6761] hover:bg-[#F4F7F5]'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-[#101513] capitalize">{selectedPage} Page Content</h3>

            {selectedPage === 'home' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#101513] mb-1">Hero Section Headline</label>
                  <input
                    type="text"
                    value={currentPage.heroTitle || ''}
                    onChange={(e) => updatePage('home', 'heroTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#101513] mb-1">Hero Subtitle Paragraph</label>
                  <textarea
                    rows={3}
                    value={currentPage.heroSubtitle || ''}
                    onChange={(e) => updatePage('home', 'heroSubtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#101513] mb-1">Primary CTA Button Label</label>
                    <input
                      type="text"
                      value={currentPage.heroCtaLabel || ''}
                      onChange={(e) => updatePage('home', 'heroCtaLabel', e.target.value)}
                      className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#101513] mb-1">Why Choose SERK Headline</label>
                    <input
                      type="text"
                      value={currentPage.whySerkHeading || ''}
                      onChange={(e) => updatePage('home', 'whySerkHeading', e.target.value)}
                      className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block font-semibold text-[#101513] mb-1">Stat 1 Value &amp; Label</label>
                    <input
                      type="text"
                      value={currentPage.statsOneValue || ''}
                      onChange={(e) => updatePage('home', 'statsOneValue', e.target.value)}
                      className="w-full px-2 py-1.5 border border-[#DEE6E0] rounded text-xs mb-1"
                    />
                    <input
                      type="text"
                      value={currentPage.statsOneLabel || ''}
                      onChange={(e) => updatePage('home', 'statsOneLabel', e.target.value)}
                      className="w-full px-2 py-1.5 border border-[#DEE6E0] rounded text-[11px] text-[#5B6761]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#101513] mb-1">Stat 2 Value &amp; Label</label>
                    <input
                      type="text"
                      value={currentPage.statsTwoValue || ''}
                      onChange={(e) => updatePage('home', 'statsTwoValue', e.target.value)}
                      className="w-full px-2 py-1.5 border border-[#DEE6E0] rounded text-xs mb-1"
                    />
                    <input
                      type="text"
                      value={currentPage.statsTwoLabel || ''}
                      onChange={(e) => updatePage('home', 'statsTwoLabel', e.target.value)}
                      className="w-full px-2 py-1.5 border border-[#DEE6E0] rounded text-[11px] text-[#5B6761]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#101513] mb-1">Stat 3 Value &amp; Label</label>
                    <input
                      type="text"
                      value={currentPage.statsThreeValue || ''}
                      onChange={(e) => updatePage('home', 'statsThreeValue', e.target.value)}
                      className="w-full px-2 py-1.5 border border-[#DEE6E0] rounded text-xs mb-1"
                    />
                    <input
                      type="text"
                      value={currentPage.statsThreeLabel || ''}
                      onChange={(e) => updatePage('home', 'statsThreeLabel', e.target.value)}
                      className="w-full px-2 py-1.5 border border-[#DEE6E0] rounded text-[11px] text-[#5B6761]"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedPage === 'about' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#101513] mb-1">About Us Main Title</label>
                  <input
                    type="text"
                    value={currentPage.title || ''}
                    onChange={(e) => updatePage('about', 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#101513] mb-1">Corporate Mission</label>
                  <textarea
                    rows={2}
                    value={currentPage.mission || ''}
                    onChange={(e) => updatePage('about', 'mission', e.target.value)}
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#101513] mb-1">Corporate Vision</label>
                  <textarea
                    rows={2}
                    value={currentPage.vision || ''}
                    onChange={(e) => updatePage('about', 'vision', e.target.value)}
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
                  />
                </div>
              </div>
            )}

            {selectedPage !== 'home' && selectedPage !== 'about' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#101513] mb-1">Page Title</label>
                  <input
                    type="text"
                    value={currentPage.title || ''}
                    onChange={(e) => updatePage(selectedPage, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#101513] mb-1">Page Subtitle / Intro</label>
                  <textarea
                    rows={3}
                    value={currentPage.subtitle || ''}
                    onChange={(e) => updatePage(selectedPage, 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: HEADER, FOOTER & CONTACT COORDINATES */}
      {activeTab === 'header_footer' && (
        <div className="space-y-6">
          {/* Header Controls */}
          <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-4 text-xs">
            <h3 className="text-base font-bold text-[#101513] border-b border-[#DEE6E0] pb-2">Header Navigation Bar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#101513] mb-1">Header Sub-Tagline</label>
                <input
                  type="text"
                  value={content.header?.tagline || ''}
                  onChange={(e) => updateHeaderFooter('header', 'tagline', e.target.value)}
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#101513] mb-1">Primary CTA Button Text</label>
                <input
                  type="text"
                  value={content.header?.ctaLabel || ''}
                  onChange={(e) => updateHeaderFooter('header', 'ctaLabel', e.target.value)}
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                />
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-4 text-xs">
            <h3 className="text-base font-bold text-[#101513] border-b border-[#DEE6E0] pb-2">Footer &amp; Copyright</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#101513] mb-1">Column 1 Heading</label>
                <input
                  type="text"
                  value={content.footer?.visitUsHeading || ''}
                  onChange={(e) => updateHeaderFooter('footer', 'visitUsHeading', e.target.value)}
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#101513] mb-1">Copyright Tagline</label>
                <input
                  type="text"
                  value={content.footer?.tagline || ''}
                  onChange={(e) => updateHeaderFooter('footer', 'tagline', e.target.value)}
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-semibold text-[#101513] mb-1">Full Copyright Text</label>
                <input
                  type="text"
                  value={content.footer?.copyrightText || ''}
                  onChange={(e) => updateHeaderFooter('footer', 'copyrightText', e.target.value)}
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
