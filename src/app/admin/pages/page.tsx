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
  Plus,
  Trash2,
  Edit3,
  Upload,
  Image as ImageIcon,
  Building,
  Users,
  Lightbulb,
  Cpu,
  RefreshCw,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { DEFAULT_SITE_CONTENT, SiteContent } from '@/lib/siteContentDefaults';
import { PartnerItem, ServiceItem, IndustryItem, InsightItem } from '@/lib/types';

export default function AdminUniversalContentEditor() {
  const [activeTab, setActiveTab] = useState<
    'branding' | 'partners' | 'industries' | 'services' | 'insights' | 'pages' | 'categories'
  >('branding');
  const [selectedPage, setSelectedPage] = useState<'about' | 'contact' | 'home' | 'products' | 'services' | 'ventures'>('about');
  const [selectedCategory, setSelectedCategory] = useState('sector-intelligence');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState<string | null>(null);

  // Main content state
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);

  // New item modal/inline forms state
  const [newPartner, setNewPartner] = useState<Partial<PartnerItem>>({
    name: '',
    category: 'ENTERPRISE PARTNER',
    logoUrl: '/wp-content/uploads/serk/client-zoscales.png',
    imageFit: 'contain',
    description: '',
    websiteUrl: 'https://',
    collabText: 'Active Portfolio Collaboration • Verified Partner',
    isPublished: true,
  });
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);

  const [newIndustry, setNewIndustry] = useState<Partial<IndustryItem>>({
    name: '',
    category: 'Enterprise Sector',
    description: '',
    imageUrl: '/wp-content/uploads/serk/serk-photo-construction.jpg',
    bullets: ['Point 1', 'Point 2', 'Point 3'],
    ctaLabel: 'Discuss Your Project',
    ctaUrl: '/contact_us/',
    isPublished: true,
  });
  const [showAddIndustry, setShowAddIndustry] = useState(false);
  const [editingIndustryId, setEditingIndustryId] = useState<string | null>(null);

  const [newService, setNewService] = useState<Partial<ServiceItem>>({
    title: '',
    category: 'Software Architecture',
    description: '',
    imageUrl: '/wp-content/uploads/serk/serk-post-estimator.svg',
    bullets: ['Feature 1', 'Feature 2'],
    ctaLabel: 'Learn More',
    ctaUrl: '/contact_us/',
    isPublished: true,
  });
  const [showAddService, setShowAddService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const [newInsight, setNewInsight] = useState<Partial<InsightItem>>({
    title: '',
    slug: '',
    category: 'Software Engineering',
    date: 'November 2026',
    excerpt: '',
    coverImage: '/wp-content/uploads/serk/serk-post-estimator.svg',
    isPublished: true,
  });
  const [showAddInsight, setShowAddInsight] = useState(false);
  const [editingInsightId, setEditingInsightId] = useState<string | null>(null);

  // Fetch content on mount
  useEffect(() => {
    fetch('/api/admin/content', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.siteInfo) {
          setContent(data);
        }
      })
      .catch((err) => console.error('Failed to load site content:', err))
      .finally(() => setLoading(false));
  }, []);

  // Save handler
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error('Error saving content:', err);
    } finally {
      setSaving(false);
    }
  };

  // Image Upload Handler
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (url: string) => void,
    key: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(key);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'serk-technologies');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        onComplete(data.url);
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err: any) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploadingLogo(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-[#0D4634]" />
          <p className="text-sm font-medium text-[#5B6761]">Loading SERK Management Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header & Sticky Save Action Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#DEE6E0] -mx-6 -mt-6 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-[#E3AB72]/15 text-[#9A5B20] border border-[#E3AB72]/30">
              Universal Web Controller
            </span>
            <span className="text-xs text-[#5B6761]">• Instant Live Reflect</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-[#101513] tracking-tight mt-1">
            Site Content & Structure Editor
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#101513] bg-[#F8FAFC] border border-[#DEE6E0] rounded-lg hover:bg-[#F1F5F9] transition"
          >
            <Eye className="w-4 h-4 text-[#5B6761]" />
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#5B6761]" />
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className={`inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-lg transition shadow-sm ${
              saved
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-[#0D4634] hover:bg-[#2D735A]'
            } disabled:opacity-50`}
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving & Syncing Live...</span>
              </>
            ) : saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved & Live on Web!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Publish Live</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#DEE6E0]">
        {[
          { id: 'branding', label: 'Branding & Logos', icon: ImageIcon },
          { id: 'partners', label: 'Partners & Clients', icon: Users, badge: content.partners?.length || 0 },
          { id: 'industries', label: 'Industry Sectors', icon: Building, badge: content.industriesList?.length || 0 },
          { id: 'services', label: 'Services & Solutions', icon: Cpu, badge: content.servicesList?.length || 0 },
          { id: 'insights', label: 'Insights & Articles', icon: Lightbulb, badge: content.insightsList?.length || 0 },
          { id: 'pages', label: 'Page Narratives', icon: FileText },
          { id: 'categories', label: 'Category Pillars', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg whitespace-nowrap transition ${
                isActive
                  ? 'bg-[#101513] text-white shadow-xs'
                  : 'text-[#5B6761] hover:text-[#101513] hover:bg-[#F8FAFC]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#E3AB72]' : 'text-[#5B6761]'}`} />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-[#E3AB72] text-[#101513]' : 'bg-[#F1F5F9] text-[#5B6761]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================
          TAB 1: BRANDING & LOGOS
          ======================================================== */}
      {activeTab === 'branding' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#DEE6E0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#101513] mb-1 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#0D4634]" />
              Enterprise Branding & Official Logos
            </h2>
            <p className="text-sm text-[#5B6761] mb-6">
              Replace logos and brand assets across all header navigation bars, mobile menus, and enterprise footers instantly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Header Wide Logo */}
              <div className="border border-[#DEE6E0] rounded-xl p-5 bg-[#FCFCFE] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-[#101513] uppercase tracking-wider">
                      Header Primary Logo (Wide)
                    </label>
                    <span className="text-xs text-[#5B6761]">Appears on top nav</span>
                  </div>

                  {/* Preview Box */}
                  <div className="h-28 bg-white border border-[#DEE6E0] rounded-lg flex items-center justify-center p-4 mb-4 shadow-2xs">
                    {content.branding?.headerLogoUrl ? (
                      <img
                        src={content.branding.headerLogoUrl}
                        alt="Header Logo Preview"
                        className="max-h-12 max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs text-red-500">No logo specified</span>
                    )}
                  </div>

                  <label className="block text-xs font-medium text-[#5B6761] mb-1">
                    Image URL or Path
                  </label>
                  <input
                    type="text"
                    value={content.branding?.headerLogoUrl || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        branding: { ...content.branding, headerLogoUrl: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg mb-3 bg-white"
                    placeholder="/wp-content/uploads/serk/serk-logo-wide.png"
                  />
                </div>

                <div>
                  <label className="relative inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-semibold text-[#101513] bg-white border border-[#DEE6E0] rounded-lg hover:bg-[#F8FAFC] cursor-pointer transition shadow-2xs">
                    <Upload className="w-4 h-4 text-[#0D4634]" />
                    <span>
                      {uploadingLogo === 'header' ? 'Uploading to Cloudinary...' : 'Upload New Header Logo'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingLogo === 'header'}
                      onChange={(e) =>
                        handleImageUpload(
                          e,
                          (url) =>
                            setContent({
                              ...content,
                              branding: { ...content.branding, headerLogoUrl: url },
                            }),
                          'header'
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Footer Logo Mark */}
              <div className="border border-[#DEE6E0] rounded-xl p-5 bg-[#101513] text-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-[#E3AB72] uppercase tracking-wider">
                      Footer Emblem / Logo Mark
                    </label>
                    <span className="text-xs text-[#9AB4A9]">Appears on dark footer</span>
                  </div>

                  {/* Dark Preview Box */}
                  <div className="h-28 bg-[#0B0E0C] border border-[#23332A] rounded-lg flex items-center justify-center p-4 mb-4">
                    {content.branding?.footerMarkUrl ? (
                      <img
                        src={content.branding.footerMarkUrl}
                        alt="Footer Logo Preview"
                        className="max-h-12 max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs text-red-400">No logo specified</span>
                    )}
                  </div>

                  <label className="block text-xs font-medium text-[#9AB4A9] mb-1">
                    Image URL or Path
                  </label>
                  <input
                    type="text"
                    value={content.branding?.footerMarkUrl || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        branding: { ...content.branding, footerMarkUrl: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-[#23332A] rounded-lg mb-3 bg-[#151D19] text-white"
                    placeholder="/wp-content/uploads/serk/serk-logo-mark.png"
                  />
                </div>

                <div>
                  <label className="relative inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0D4634] border border-[#23332A] rounded-lg hover:bg-[#2D735A] cursor-pointer transition shadow-2xs">
                    <Upload className="w-4 h-4 text-[#E3AB72]" />
                    <span>
                      {uploadingLogo === 'footer' ? 'Uploading to Cloudinary...' : 'Upload New Footer Mark'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingLogo === 'footer'}
                      onChange={(e) =>
                        handleImageUpload(
                          e,
                          (url) =>
                            setContent({
                              ...content,
                              branding: { ...content.branding, footerMarkUrl: url },
                            }),
                          'footer'
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Brand Meta Text */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#DEE6E0]">
              <div>
                <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                  Company Official Name
                </label>
                <input
                  type="text"
                  value={content.branding?.companyName || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      branding: { ...content.branding, companyName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                  Brand Alt Text (SEO & Accessibility)
                </label>
                <input
                  type="text"
                  value={content.branding?.brandAltText || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      branding: { ...content.branding, brandAltText: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                  Brand Slogan / Tagline
                </label>
                <input
                  type="text"
                  value={content.branding?.tagline || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      branding: { ...content.branding, tagline: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: PARTNERS & CLIENTS
          ======================================================== */}
      {activeTab === 'partners' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-[#DEE6E0] shadow-2xs">
            <div>
              <h2 className="text-lg font-bold text-[#101513] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#0D4634]" />
                Institutional Partners & Clients ({content.partners?.length || 0})
              </h2>
              <p className="text-sm text-[#5B6761] mt-0.5">
                Manage all partner cards, strategic investors, banks, and ecosystem accelerators displayed on <code className="text-xs bg-[#F1F5F9] px-1 py-0.5 rounded">/partners</code>.
              </p>
            </div>

            <button
              onClick={() => {
                setShowAddPartner(true);
                setEditingPartnerId(null);
                setNewPartner({
                  id: `partner-${Date.now()}`,
                  name: '',
                  category: 'STRATEGIC COLLABORATION',
                  logoUrl: '/wp-content/uploads/serk/client-zoscales.png',
                  description: '',
                  websiteUrl: 'https://',
                  collabText: 'Active Portfolio Collaboration • Verified Partner',
                  isPublished: true,
                });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] rounded-lg transition shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Partner</span>
            </button>
          </div>

          {/* Add / Edit Partner Form Modal */}
          {showAddPartner && (
            <div className="bg-[#FCFCFE] p-6 rounded-xl border-2 border-[#E3AB72] shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#DEE6E0] pb-3">
                <h3 className="text-base font-bold text-[#101513]">
                  {editingPartnerId ? 'Edit Partner Details' : 'Add New Institutional Partner'}
                </h3>
                <button
                  onClick={() => setShowAddPartner(false)}
                  className="text-xs font-bold text-[#5B6761] hover:text-[#101513]"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Partner / Institution Name
                  </label>
                  <input
                    type="text"
                    value={newPartner.name || ''}
                    onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    placeholder="e.g. Ethiopian Airlines / Zoscales Partners"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Category Badge (e.g. PRIVATE EQUITY, FINANCIAL INSTITUTION)
                  </label>
                  <input
                    type="text"
                    value={newPartner.category || ''}
                    onChange={(e) => setNewPartner({ ...newPartner, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    placeholder="PRIVATE EQUITY & GROWTH"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Description & Narrative
                  </label>
                  <textarea
                    rows={2}
                    value={newPartner.description || ''}
                    onChange={(e) => setNewPartner({ ...newPartner, description: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    placeholder="Summary of institutional collaboration and technical scope."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Partner Logo URL or Upload
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newPartner.logoUrl || ''}
                      onChange={(e) => setNewPartner({ ...newPartner, logoUrl: e.target.value })}
                      className="flex-1 px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    />
                    <label className="px-3 py-2 bg-white border border-[#DEE6E0] rounded-lg cursor-pointer hover:bg-[#F1F5F9] text-xs font-bold flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5 text-[#0D4634]" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(
                            e,
                            (url) => setNewPartner({ ...newPartner, logoUrl: url }),
                            'partner'
                          )
                        }
                      />
                    </label>
                  </div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-[#5B6761]">Display Mode:</span>
                    <div className="inline-flex rounded border border-[#DEE6E0] bg-[#F4F7F5] p-0.5">
                      <button
                        type="button"
                        onClick={() => setNewPartner({ ...newPartner, imageFit: 'contain' })}
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          (newPartner.imageFit || 'contain') === 'contain'
                            ? 'bg-[#0D4634] text-white'
                            : 'text-[#5B6761]'
                        }`}
                      >
                        Fit / Logo
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewPartner({ ...newPartner, imageFit: 'cover' })}
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          newPartner.imageFit === 'cover'
                            ? 'bg-[#0D4634] text-white'
                            : 'text-[#5B6761]'
                        }`}
                      >
                        Fill / Photo
                      </button>
                    </div>
                  </div>
                  {newPartner.logoUrl && (
                    <div
                      style={{
                        minHeight: '100px',
                        maxHeight: '140px',
                        padding: (newPartner.imageFit || 'contain') === 'contain' ? '14px 18px' : '0px',
                      }}
                      className="bg-[#F7FAF8] border border-[#DEE6E0] rounded-lg flex items-center justify-center overflow-hidden"
                    >
                      <img
                        src={newPartner.logoUrl}
                        alt="Partner Preview"
                        style={
                          (newPartner.imageFit || 'contain') === 'contain'
                            ? { maxWidth: '100%', maxHeight: '112px', width: 'auto', height: 'auto', objectFit: 'contain' }
                            : { width: '100%', height: '120px', objectFit: 'cover' }
                        }
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Official Website URL
                  </label>
                  <input
                    type="text"
                    value={newPartner.websiteUrl || ''}
                    onChange={(e) => setNewPartner({ ...newPartner, websiteUrl: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Collaboration Footer Text
                  </label>
                  <input
                    type="text"
                    value={newPartner.collabText || ''}
                    onChange={(e) => setNewPartner({ ...newPartner, collabText: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    placeholder="Active Portfolio Collaboration • Verified Partner"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddPartner(false)}
                  className="px-4 py-2 text-sm font-semibold text-[#5B6761] hover:text-[#101513] bg-white border border-[#DEE6E0] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!newPartner.name) {
                      alert('Partner name is required');
                      return;
                    }
                    let updatedPartners = [...(content.partners || [])];
                    if (editingPartnerId) {
                      updatedPartners = updatedPartners.map((p) =>
                        p.id === editingPartnerId ? ({ ...p, ...newPartner } as PartnerItem) : p
                      );
                    } else {
                      updatedPartners.push({
                        id: `partner-${Date.now()}`,
                        name: newPartner.name || 'New Partner',
                        category: newPartner.category || 'PARTNER',
                        logoUrl: newPartner.logoUrl || '/wp-content/uploads/serk/client-zoscales.png',
                        description: newPartner.description || '',
                        websiteUrl: newPartner.websiteUrl || '#',
                        collabText: newPartner.collabText || 'Verified Partner',
                        isPublished: true,
                        sortOrder: updatedPartners.length + 1,
                      });
                    }
                    setContent({ ...content, partners: updatedPartners });
                    setShowAddPartner(false);
                    setEditingPartnerId(null);
                  }}
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] rounded-lg shadow-2xs"
                >
                  {editingPartnerId ? 'Update Partner' : 'Save Partner to List'}
                </button>
              </div>
            </div>
          )}

          {/* Partners Grid Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.partners?.map((partner, index) => (
              <div
                key={partner.id || index}
                className="bg-white border border-[#DEE6E0] rounded-xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition"
              >
                <div>
                  <div className="h-16 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex items-center justify-center p-3 mb-3">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="max-h-10 max-w-full object-contain"
                    />
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-[#E3AB72]/15 text-[#9A5B20] border border-[#E3AB72]/30 mb-2">
                    {partner.category}
                  </span>
                  <h3 className="text-base font-bold text-[#101513] mb-1">{partner.name}</h3>
                  <p className="text-xs text-[#5B6761] line-clamp-3 mb-3">{partner.description}</p>
                </div>

                <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#5B6761]">
                    {partner.websiteUrl && partner.websiteUrl !== '#' ? (
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0D4634] hover:underline"
                      >
                        Visit Site &rarr;
                      </a>
                    ) : (
                      'No Link'
                    )}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setNewPartner(partner);
                        setEditingPartnerId(partner.id);
                        setShowAddPartner(true);
                      }}
                      className="p-1.5 text-[#5B6761] hover:text-[#0D4634] hover:bg-[#F1F5F9] rounded-md transition"
                      title="Edit Partner"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove partner "${partner.name}"?`)) {
                          setContent({
                            ...content,
                            partners: content.partners.filter((p) => p.id !== partner.id),
                          });
                        }
                      }}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition"
                      title="Delete Partner"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: INDUSTRY SECTORS
          ======================================================== */}
      {activeTab === 'industries' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-[#DEE6E0] shadow-2xs">
            <div>
              <h2 className="text-lg font-bold text-[#101513] flex items-center gap-2">
                <Building className="w-5 h-5 text-[#0D4634]" />
                Industry Sectors ({content.industriesList?.length || 0})
              </h2>
              <p className="text-sm text-[#5B6761] mt-0.5">
                Specialized domain vertical solutions displayed on <code className="text-xs bg-[#F1F5F9] px-1 py-0.5 rounded">/industries</code> (Hotels, Hospitals, Contractors, etc.).
              </p>
            </div>

            <button
              onClick={() => {
                setShowAddIndustry(true);
                setEditingIndustryId(null);
                setNewIndustry({
                  id: `ind-${Date.now()}`,
                  name: '',
                  category: 'Industrial Sector',
                  description: '',
                  imageUrl: '/wp-content/uploads/serk/serk-photo-construction.jpg',
                  bullets: ['Feature 1', 'Feature 2', 'Feature 3'],
                  ctaLabel: 'Consult Specialist',
                  ctaUrl: '/contact_us/',
                  isPublished: true,
                });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] rounded-lg transition shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Industry</span>
            </button>
          </div>

          {/* Add / Edit Industry Modal */}
          {showAddIndustry && (
            <div className="bg-[#FCFCFE] p-6 rounded-xl border-2 border-[#E3AB72] shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#DEE6E0] pb-3">
                <h3 className="text-base font-bold text-[#101513]">
                  {editingIndustryId ? 'Edit Industry Sector' : 'Add New Industry Sector'}
                </h3>
                <button
                  onClick={() => setShowAddIndustry(false)}
                  className="text-xs font-bold text-[#5B6761] hover:text-[#101513]"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Industry Sector Title
                  </label>
                  <input
                    type="text"
                    value={newIndustry.name || ''}
                    onChange={(e) => setNewIndustry({ ...newIndustry, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    placeholder="Hotels, Resorts & Guesthouses"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Category Tag (e.g. Hospitality, Healthcare, Construction)
                  </label>
                  <input
                    type="text"
                    value={newIndustry.category || ''}
                    onChange={(e) => setNewIndustry({ ...newIndustry, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Description Paragraph
                  </label>
                  <textarea
                    rows={2}
                    value={newIndustry.description || ''}
                    onChange={(e) => setNewIndustry({ ...newIndustry, description: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Cover Photo URL or Upload
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newIndustry.imageUrl || ''}
                      onChange={(e) => setNewIndustry({ ...newIndustry, imageUrl: e.target.value })}
                      className="flex-1 px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    />
                    <label className="px-3 py-2 bg-white border border-[#DEE6E0] rounded-lg cursor-pointer hover:bg-[#F1F5F9] text-xs font-bold flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5 text-[#0D4634]" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(
                            e,
                            (url) => setNewIndustry({ ...newIndustry, imageUrl: url }),
                            'industry'
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    CTA Button Label & URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newIndustry.ctaLabel || 'Consult Specialist'}
                      onChange={(e) => setNewIndustry({ ...newIndustry, ctaLabel: e.target.value })}
                      className="w-1/2 px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      value={newIndustry.ctaUrl || '/contact_us/'}
                      onChange={(e) => setNewIndustry({ ...newIndustry, ctaUrl: e.target.value })}
                      className="w-1/2 px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Bullet Points (Enter one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={newIndustry.bullets?.join('\n') || ''}
                    onChange={(e) =>
                      setNewIndustry({
                        ...newIndustry,
                        bullets: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white font-mono text-xs"
                    placeholder="Direct booking engines and front-desk reservation management&#10;Restaurant & bar POS linked directly to room folio"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddIndustry(false)}
                  className="px-4 py-2 text-sm font-semibold text-[#5B6761] hover:text-[#101513] bg-white border border-[#DEE6E0] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!newIndustry.name) {
                      alert('Industry name is required');
                      return;
                    }
                    let updated = [...(content.industriesList || [])];
                    if (editingIndustryId) {
                      updated = updated.map((i) =>
                        i.id === editingIndustryId ? ({ ...i, ...newIndustry } as IndustryItem) : i
                      );
                    } else {
                      updated.push({
                        id: `ind-${Date.now()}`,
                        name: newIndustry.name || 'New Sector',
                        category: newIndustry.category || 'General',
                        description: newIndustry.description || '',
                        imageUrl: newIndustry.imageUrl || '',
                        bullets: newIndustry.bullets || [],
                        ctaLabel: newIndustry.ctaLabel || 'Consult Specialist',
                        ctaUrl: newIndustry.ctaUrl || '/contact_us/',
                        isPublished: true,
                        sortOrder: updated.length + 1,
                      });
                    }
                    setContent({ ...content, industriesList: updated });
                    setShowAddIndustry(false);
                    setEditingIndustryId(null);
                  }}
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] rounded-lg shadow-2xs"
                >
                  {editingIndustryId ? 'Update Sector' : 'Save Sector'}
                </button>
              </div>
            </div>
          )}

          {/* Industry Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.industriesList?.map((ind, idx) => (
              <div
                key={ind.id || idx}
                className="bg-white border border-[#DEE6E0] rounded-xl p-5 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  {ind.imageUrl && (
                    <div className="h-32 rounded-lg overflow-hidden mb-3 border border-[#DEE6E0]">
                      <img src={ind.imageUrl} alt={ind.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <span className="text-[11px] font-bold text-[#101513] uppercase tracking-wider block mb-1">
                    {ind.category}
                  </span>
                  <h3 className="text-base font-bold text-[#101513] mb-2">{ind.name}</h3>
                  <p className="text-xs text-[#5B6761] mb-3">{ind.description}</p>
                  <ul className="text-xs text-[#5B6761] space-y-1 mb-4 list-disc pl-4">
                    {ind.bullets?.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0D4634]">
                    CTA: {ind.ctaLabel}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setNewIndustry(ind);
                        setEditingIndustryId(ind.id);
                        setShowAddIndustry(true);
                      }}
                      className="p-1.5 text-[#5B6761] hover:text-[#0D4634] hover:bg-[#F1F5F9] rounded-md transition"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove industry "${ind.name}"?`)) {
                          setContent({
                            ...content,
                            industriesList: content.industriesList.filter((i) => i.id !== ind.id),
                          });
                        }
                      }}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: SERVICES & SOLUTIONS
          ======================================================== */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-[#DEE6E0] shadow-2xs">
            <div>
              <h2 className="text-lg font-bold text-[#101513] flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#0D4634]" />
                Services & Core Solutions ({content.servicesList?.length || 0})
              </h2>
              <p className="text-sm text-[#5B6761] mt-0.5">
                Manage all technological service offerings, engineering capabilities, and AI systems on <code className="text-xs bg-[#F1F5F9] px-1 py-0.5 rounded">/services</code>.
              </p>
            </div>

            <button
              onClick={() => {
                setShowAddService(true);
                setEditingServiceId(null);
                setNewService({
                  id: `srv-${Date.now()}`,
                  title: '',
                  category: 'Applied Software Systems',
                  description: '',
                  imageUrl: '/wp-content/uploads/serk/serk-post-estimator.svg',
                  bullets: ['Modular capability 1', 'Capability 2'],
                  ctaLabel: 'Learn More',
                  ctaUrl: '/contact_us/',
                  isPublished: true,
                });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] rounded-lg transition shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Service</span>
            </button>
          </div>

          {/* Add / Edit Service Modal */}
          {showAddService && (
            <div className="bg-[#FCFCFE] p-6 rounded-xl border-2 border-[#E3AB72] shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#DEE6E0] pb-3">
                <h3 className="text-base font-bold text-[#101513]">
                  {editingServiceId ? 'Edit Service Capability' : 'Add New Service Capability'}
                </h3>
                <button
                  onClick={() => setShowAddService(false)}
                  className="text-xs font-bold text-[#5B6761] hover:text-[#101513]"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Service Title
                  </label>
                  <input
                    type="text"
                    value={newService.title || ''}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    placeholder="AI Estimator & Quantity Extraction"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={newService.category || ''}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={newService.description || ''}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Graphic / Photo URL or Upload
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newService.imageUrl || ''}
                      onChange={(e) => setNewService({ ...newService, imageUrl: e.target.value })}
                      className="flex-1 px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    />
                    <label className="px-3 py-2 bg-white border border-[#DEE6E0] rounded-lg cursor-pointer hover:bg-[#F1F5F9] text-xs font-bold flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5 text-[#0D4634]" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(
                            e,
                            (url) => setNewService({ ...newService, imageUrl: url }),
                            'service'
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    CTA Button Label & URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newService.ctaLabel || 'Learn More'}
                      onChange={(e) => setNewService({ ...newService, ctaLabel: e.target.value })}
                      className="w-1/2 px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      value={newService.ctaUrl || '/contact_us/'}
                      onChange={(e) => setNewService({ ...newService, ctaUrl: e.target.value })}
                      className="w-1/2 px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Capabilities / Highlights (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={newService.bullets?.join('\n') || ''}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        bullets: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white font-mono text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddService(false)}
                  className="px-4 py-2 text-sm font-semibold text-[#5B6761] hover:text-[#101513] bg-white border border-[#DEE6E0] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!newService.title) {
                      alert('Service title is required');
                      return;
                    }
                    let updated = [...(content.servicesList || [])];
                    if (editingServiceId) {
                      updated = updated.map((s) =>
                        s.id === editingServiceId ? ({ ...s, ...newService } as ServiceItem) : s
                      );
                    } else {
                      updated.push({
                        id: `srv-${Date.now()}`,
                        title: newService.title || 'New Service',
                        category: newService.category || 'General',
                        description: newService.description || '',
                        imageUrl: newService.imageUrl || '',
                        bullets: newService.bullets || [],
                        ctaLabel: newService.ctaLabel || 'Learn More',
                        ctaUrl: newService.ctaUrl || '/contact_us/',
                        isPublished: true,
                        sortOrder: updated.length + 1,
                      });
                    }
                    setContent({ ...content, servicesList: updated });
                    setShowAddService(false);
                    setEditingServiceId(null);
                  }}
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] rounded-lg shadow-2xs"
                >
                  {editingServiceId ? 'Update Service' : 'Save Service'}
                </button>
              </div>
            </div>
          )}

          {/* Services List Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.servicesList?.map((srv, idx) => (
              <div
                key={srv.id || idx}
                className="bg-white border border-[#DEE6E0] rounded-xl p-5 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#101513] uppercase tracking-wider block mb-1">
                    {srv.category}
                  </span>
                  <h3 className="text-base font-bold text-[#101513] mb-2">{srv.title}</h3>
                  <p className="text-xs text-[#5B6761] mb-3">{srv.description}</p>
                  {srv.bullets && srv.bullets.length > 0 && (
                    <ul className="text-xs text-[#5B6761] space-y-1 mb-4 list-disc pl-4">
                      {srv.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0D4634]">{srv.ctaLabel}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setNewService(srv);
                        setEditingServiceId(srv.id);
                        setShowAddService(true);
                      }}
                      className="p-1.5 text-[#5B6761] hover:text-[#0D4634] hover:bg-[#F1F5F9] rounded-md transition"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove service "${srv.title}"?`)) {
                          setContent({
                            ...content,
                            servicesList: content.servicesList.filter((s) => s.id !== srv.id),
                          });
                        }
                      }}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: INSIGHTS & ARTICLES
          ======================================================== */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-[#DEE6E0] shadow-2xs">
            <div>
              <h2 className="text-lg font-bold text-[#101513] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#0D4634]" />
                Technical Insights & Articles ({content.insightsList?.length || 0})
              </h2>
              <p className="text-sm text-[#5B6761] mt-0.5">
                Perspectives, AI research, and architecture breakdowns published on <code className="text-xs bg-[#F1F5F9] px-1 py-0.5 rounded">/insight</code>.
              </p>
            </div>

            <button
              onClick={() => {
                setShowAddInsight(true);
                setEditingInsightId(null);
                setNewInsight({
                  id: `insight-${Date.now()}`,
                  title: '',
                  slug: '',
                  category: 'Architecture & Systems',
                  date: 'November 2026',
                  excerpt: '',
                  coverImage: '/wp-content/uploads/serk/serk-post-estimator.svg',
                  isPublished: true,
                });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] rounded-lg transition shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Insight</span>
            </button>
          </div>

          {/* Add / Edit Insight Modal */}
          {showAddInsight && (
            <div className="bg-[#FCFCFE] p-6 rounded-xl border-2 border-[#E3AB72] shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#DEE6E0] pb-3">
                <h3 className="text-base font-bold text-[#101513]">
                  {editingInsightId ? 'Edit Insight Article' : 'Publish New Insight Article'}
                </h3>
                <button
                  onClick={() => setShowAddInsight(false)}
                  className="text-xs font-bold text-[#5B6761] hover:text-[#101513]"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Article Title
                  </label>
                  <input
                    type="text"
                    value={newInsight.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setNewInsight({ ...newInsight, title, slug: newInsight.slug || slug });
                    }}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={newInsight.slug || ''}
                    onChange={(e) => setNewInsight({ ...newInsight, slug: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={newInsight.category || ''}
                    onChange={(e) => setNewInsight({ ...newInsight, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Publication Date
                  </label>
                  <input
                    type="text"
                    value={newInsight.date || ''}
                    onChange={(e) => setNewInsight({ ...newInsight, date: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Excerpt / Executive Summary
                  </label>
                  <textarea
                    rows={2}
                    value={newInsight.excerpt || ''}
                    onChange={(e) => setNewInsight({ ...newInsight, excerpt: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Cover Illustration / Diagram URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newInsight.coverImage || ''}
                      onChange={(e) => setNewInsight({ ...newInsight, coverImage: e.target.value })}
                      className="flex-1 px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                    />
                    <label className="px-3 py-2 bg-white border border-[#DEE6E0] rounded-lg cursor-pointer hover:bg-[#F1F5F9] text-xs font-bold flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5 text-[#0D4634]" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(
                            e,
                            (url) => setNewInsight({ ...newInsight, coverImage: url }),
                            'insight'
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddInsight(false)}
                  className="px-4 py-2 text-sm font-semibold text-[#5B6761] hover:text-[#101513] bg-white border border-[#DEE6E0] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!newInsight.title) {
                      alert('Insight title is required');
                      return;
                    }
                    let updated = [...(content.insightsList || [])];
                    if (editingInsightId) {
                      updated = updated.map((i) =>
                        i.id === editingInsightId ? ({ ...i, ...newInsight } as InsightItem) : i
                      );
                    } else {
                      updated.push({
                        id: `insight-${Date.now()}`,
                        title: newInsight.title || 'New Insight',
                        slug: newInsight.slug || 'new-insight',
                        category: newInsight.category || 'General',
                        date: newInsight.date || 'November 2026',
                        excerpt: newInsight.excerpt || '',
                        coverImage: newInsight.coverImage || '',
                        isPublished: true,
                        sortOrder: updated.length + 1,
                      });
                    }
                    setContent({ ...content, insightsList: updated });
                    setShowAddInsight(false);
                    setEditingInsightId(null);
                  }}
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] rounded-lg shadow-2xs"
                >
                  {editingInsightId ? 'Update Insight' : 'Save Insight'}
                </button>
              </div>
            </div>
          )}

          {/* Insights Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.insightsList?.map((ins, idx) => (
              <div
                key={ins.id || idx}
                className="bg-white border border-[#DEE6E0] rounded-xl p-5 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="h-28 bg-[#F8FAFC] border border-[#DEE6E0] rounded-lg flex items-center justify-center overflow-hidden mb-3">
                    <img src={ins.coverImage} alt={ins.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#5B6761] mb-1">
                    <span className="font-bold text-[#9A5B20]">{ins.category}</span>
                    <span>{ins.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#101513] mb-2">{ins.title}</h3>
                  <p className="text-xs text-[#5B6761] line-clamp-3 mb-3">{ins.excerpt}</p>
                </div>

                <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-xs text-[#0D4634] font-medium font-mono">/{ins.slug}/</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setNewInsight(ins);
                        setEditingInsightId(ins.id);
                        setShowAddInsight(true);
                      }}
                      className="p-1.5 text-[#5B6761] hover:text-[#0D4634] hover:bg-[#F1F5F9] rounded-md transition"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove article "${ins.title}"?`)) {
                          setContent({
                            ...content,
                            insightsList: content.insightsList.filter((i) => i.id !== ins.id),
                          });
                        }
                      }}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 6: PAGE NARRATIVES & COPYWRITING
          ======================================================== */}
      {activeTab === 'pages' && (
        <div className="space-y-6">
          {/* Sub Navigation Bar for Pages */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#DEE6E0]">
            {[
              { id: 'about', label: 'About Us' },
              { id: 'contact', label: 'Contact Us' },
              { id: 'home', label: 'Homepage Hero & Stats' },
              { id: 'products', label: 'Products Header' },
              { id: 'services', label: 'Services Header' },
              { id: 'ventures', label: 'Ventures Header' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPage(p.id as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${
                  selectedPage === p.id
                    ? 'bg-[#E3AB72]/20 text-[#9A5B20] border border-[#E3AB72]'
                    : 'text-[#5B6761] hover:text-[#101513] bg-white border border-[#DEE6E0]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Subpage: ABOUT US */}
          {selectedPage === 'about' && (
            <div className="bg-white p-6 rounded-xl border border-[#DEE6E0] shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-[#101513]">About Us Page Content (/about_us)</h2>

              <div>
                <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                  Main Hero Title (H1)
                </label>
                <input
                  type="text"
                  value={content.pages?.about?.title || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      pages: {
                        ...content.pages,
                        about: { ...content.pages.about, title: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                  Story Narrative Paragraph 1
                </label>
                <textarea
                  rows={3}
                  value={content.pages?.about?.storyParagraph1 || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      pages: {
                        ...content.pages,
                        about: { ...content.pages.about, storyParagraph1: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Our Mission Statement
                  </label>
                  <textarea
                    rows={4}
                    value={content.pages?.about?.mission || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        pages: {
                          ...content.pages,
                          about: { ...content.pages.about, mission: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Our Vision Statement
                  </label>
                  <textarea
                    rows={4}
                    value={content.pages?.about?.vision || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        pages: {
                          ...content.pages,
                          about: { ...content.pages.about, vision: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Subpage: CONTACT US */}
          {selectedPage === 'contact' && (
            <div className="bg-white p-6 rounded-xl border border-[#DEE6E0] shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-[#101513]">Contact Us Page & Direct Channels (/contact_us)</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Contact Headline (H1)
                  </label>
                  <input
                    type="text"
                    value={content.pages?.contact?.title || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        pages: {
                          ...content.pages,
                          contact: { ...content.pages.contact, title: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Office Location / Address
                  </label>
                  <input
                    type="text"
                    value={content.pages?.contact?.officeAddress || content.siteInfo.address}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteInfo: { ...content.siteInfo, address: e.target.value },
                        pages: {
                          ...content.pages,
                          contact: { ...content.pages.contact, officeAddress: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Office Phone Number
                  </label>
                  <input
                    type="text"
                    value={content.siteInfo.phone}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteInfo: { ...content.siteInfo, phone: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Company Email
                  </label>
                  <input
                    type="text"
                    value={content.siteInfo.email}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteInfo: { ...content.siteInfo, email: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Subpage: HOMEPAGE */}
          {selectedPage === 'home' && (
            <div className="bg-white p-6 rounded-xl border border-[#DEE6E0] shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-[#101513]">Homepage Hero & Impact Metrics (/)</h2>

              <div>
                <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                  Hero Headline (H1)
                </label>
                <input
                  type="text"
                  value={content.pages?.home?.heroTitle || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      pages: {
                        ...content.pages,
                        home: { ...content.pages.home, heroTitle: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  value={content.pages?.home?.heroSubtitle || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      pages: {
                        ...content.pages,
                        home: { ...content.pages.home, heroSubtitle: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#DEE6E0]">
                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Stat 1 (Value & Label)
                  </label>
                  <input
                    type="text"
                    value={content.pages?.home?.statsOneValue || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        pages: {
                          ...content.pages,
                          home: { ...content.pages.home, statsOneValue: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 text-sm font-bold border border-[#DEE6E0] rounded-lg mb-1"
                  />
                  <input
                    type="text"
                    value={content.pages?.home?.statsOneLabel || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        pages: {
                          ...content.pages,
                          home: { ...content.pages.home, statsOneLabel: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-[#DEE6E0] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Stat 2 (Value & Label)
                  </label>
                  <input
                    type="text"
                    value={content.pages?.home?.statsTwoValue || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        pages: {
                          ...content.pages,
                          home: { ...content.pages.home, statsTwoValue: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 text-sm font-bold border border-[#DEE6E0] rounded-lg mb-1"
                  />
                  <input
                    type="text"
                    value={content.pages?.home?.statsTwoLabel || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        pages: {
                          ...content.pages,
                          home: { ...content.pages.home, statsTwoLabel: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-[#DEE6E0] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                    Stat 3 (Value & Label)
                  </label>
                  <input
                    type="text"
                    value={content.pages?.home?.statsThreeValue || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        pages: {
                          ...content.pages,
                          home: { ...content.pages.home, statsThreeValue: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 text-sm font-bold border border-[#DEE6E0] rounded-lg mb-1"
                  />
                  <input
                    type="text"
                    value={content.pages?.home?.statsThreeLabel || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        pages: {
                          ...content.pages,
                          home: { ...content.pages.home, statsThreeLabel: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-[#DEE6E0] rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Subpages: Products / Services / Ventures */}
          {(selectedPage === 'products' || selectedPage === 'services' || selectedPage === 'ventures') && (
            <div className="bg-white p-6 rounded-xl border border-[#DEE6E0] shadow-2xs space-y-4">
              <h2 className="text-lg font-bold text-[#101513] capitalize">{selectedPage} Page Headers</h2>
              <div>
                <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                  Page Title (H1)
                </label>
                <input
                  type="text"
                  value={content.pages?.[selectedPage]?.title || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      pages: {
                        ...content.pages,
                        [selectedPage]: { ...content.pages[selectedPage], title: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                  Intro Subtitle
                </label>
                <textarea
                  rows={2}
                  value={content.pages?.[selectedPage]?.subtitle || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      pages: {
                        ...content.pages,
                        [selectedPage]: { ...content.pages[selectedPage], subtitle: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 7: CATEGORY PILLARS
          ======================================================== */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#DEE6E0] shadow-2xs">
            <h2 className="text-lg font-bold text-[#101513] mb-4">Core Architectural Pillars</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                {Object.keys(content.categories || {}).map((catKey) => {
                  const cat = content.categories[catKey];
                  return (
                    <button
                      key={catKey}
                      onClick={() => setSelectedCategory(catKey)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition flex items-center justify-between ${
                        selectedCategory === catKey
                          ? 'bg-[#101513] text-white'
                          : 'text-[#5B6761] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <span className="truncate">{cat.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  );
                })}
              </div>

              <div className="md:col-span-3 border border-[#DEE6E0] rounded-lg p-5 bg-[#FCFCFE] space-y-4">
                {content.categories?.[selectedCategory] && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                        Category Title
                      </label>
                      <input
                        type="text"
                        value={content.categories[selectedCategory].title}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            categories: {
                              ...content.categories,
                              [selectedCategory]: {
                                ...content.categories[selectedCategory],
                                title: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={content.categories[selectedCategory].subtitle}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            categories: {
                              ...content.categories,
                              [selectedCategory]: {
                                ...content.categories[selectedCategory],
                                subtitle: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#101513] uppercase tracking-wider mb-1">
                        Detailed Description
                      </label>
                      <textarea
                        rows={3}
                        value={content.categories[selectedCategory].description}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            categories: {
                              ...content.categories,
                              [selectedCategory]: {
                                ...content.categories[selectedCategory],
                                description: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-[#DEE6E0] rounded-lg bg-white"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
