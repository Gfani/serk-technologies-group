'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ProjectItem, MaturityStage } from '@/lib/types';
import MaturityBadge from '@/components/MaturityBadge';
import {
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Search,
  ExternalLink,
  Upload,
  X,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminVenturesPage() {
  const [ventures, setVentures] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'ventures' | 'affiliated'>('ALL');
  const [editingVenture, setEditingVenture] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchVentures = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      const data: ProjectItem[] = await res.json();
      const filtered = data.filter(
        (p) => p.category === 'ventures' || p.category === 'affiliated'
      );
      setVentures(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVentures();
  }, []);

  const handleOpenNew = () => {
    setEditingVenture({
      id: '',
      slug: '',
      name: '',
      category: 'ventures',
      maturity: 'OPERATING_VENTURE',
      summary: '',
      description: '',
      audience: 'East Africa & Regional Markets',
      capabilities: '',
      plannedCapabilities: '',
      imageUrl: null,
      publicCta: 'Explore Venture Partnership',
      ctaUrl: '/contact',
      isPublished: true,
      sortOrder: ventures.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ProjectItem) => {
    setEditingVenture({ ...item });
    setIsModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    if (!editingVenture) return;
    const updates: Partial<ProjectItem> = { name };
    if (!editingVenture.id || !editingVenture.slug) {
      updates.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    setEditingVenture({ ...editingVenture, ...updates });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingVenture) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditingVenture({
        ...editingVenture,
        imageUrl: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVenture) return;

    try {
      const method = editingVenture.id && !editingVenture.id.startsWith('proj-') ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingVenture),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchVentures();
      } else {
        const data = await res.json();
        alert(`Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this commercial venture?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchVentures();
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  const filtered = ventures.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.summary.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'ALL' || v.category === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#101513]">Digital Ventures &amp; Affiliated Entities</h1>
          <p className="text-xs text-[#5B6761] mt-1">
            Manage incubated ventures (Segar, Visit Tigray, LO Africa) and affiliated business operations.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="px-4 py-2 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Venture</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-xl border border-[#DEE6E0] space-y-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[#5B6761]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ventures..."
            className="w-full text-xs text-[#101513] focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-[#DEE6E0]">
          <span className="text-[11px] font-semibold text-[#5B6761] mr-1">Classification:</span>
          {[
            { label: 'All Ventures & Affiliates', value: 'ALL' },
            { label: 'Digital Ventures', value: 'ventures' },
            { label: 'Affiliated Businesses', value: 'affiliated' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setTypeFilter(tab.value as any)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                typeFilter === tab.value
                  ? 'bg-[#0D4634] text-white'
                  : 'bg-[#F4F7F5] text-[#5B6761] hover:bg-[#DEE6E0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ventures Table */}
      <div className="bg-white rounded-xl border border-[#DEE6E0] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4F7F5] border-b border-[#DEE6E0] text-[#5B6761] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Venture Entity</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Maturity Status</th>
                <th className="py-3 px-4 text-center">Live Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DEE6E0]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#5B6761]">
                    Loading ventures...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#5B6761]">
                    No ventures found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id || item.slug} className="hover:bg-[#F4F7F5]/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#101513]">{item.name}</div>
                      <div className="text-[11px] text-[#5B6761] truncate max-w-xs">{item.slug}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#5B6761]">
                      {item.category === 'ventures' ? 'Digital Venture' : 'Affiliated Entity'}
                    </td>
                    <td className="py-3.5 px-4">
                      <MaturityBadge stage={item.maturity} />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {item.isPublished ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-400 inline" />
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Link
                        href="/ventures"
                        target="_blank"
                        className="p-1 text-[#5B6761] hover:text-[#101513] inline-block"
                        title="View public page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1 text-[#0D4634] hover:text-[#2D735A] inline-block"
                        title="Edit venture"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-red-600 hover:text-red-700 inline-block"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && editingVenture && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 sm:p-8 border border-[#DEE6E0] my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#DEE6E0]">
              <h2 className="text-lg font-bold text-[#101513]">
                {editingVenture.id ? 'Edit Commercial Venture' : 'New Commercial Venture'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#5B6761] hover:text-[#101513]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Classification *
                  </label>
                  <select
                    value={editingVenture.category}
                    onChange={(e) =>
                      setEditingVenture({ ...editingVenture, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs bg-white text-[#101513]"
                  >
                    <option value="ventures">Digital Venture</option>
                    <option value="affiliated">Affiliated Business Entity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Maturity / Operating Status *
                  </label>
                  <select
                    value={editingVenture.maturity}
                    onChange={(e) =>
                      setEditingVenture({
                        ...editingVenture,
                        maturity: e.target.value as MaturityStage,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs bg-white text-[#101513]"
                  >
                    <option value="OPERATING_VENTURE">Operating Venture</option>
                    <option value="PRODUCTION_AVAILABLE">Production Available</option>
                    <option value="PILOT_PRIVATE_BETA">Pilot / Private Beta</option>
                    <option value="INTERNAL_ALPHA">Internal Alpha</option>
                    <option value="RESEARCH_PROTOTYPE">Research / Prototype</option>
                    <option value="CONCEPT">Concept</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Venture Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingVenture.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingVenture.slug}
                    onChange={(e) =>
                      setEditingVenture({ ...editingVenture, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Card Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingVenture.summary}
                  onChange={(e) =>
                    setEditingVenture({ ...editingVenture, summary: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Target Market / Audience
                </label>
                <input
                  type="text"
                  value={editingVenture.audience || ''}
                  onChange={(e) =>
                    setEditingVenture({ ...editingVenture, audience: e.target.value })
                  }
                  placeholder="e.g. Ethiopian Commercial Real Estate, Pan-African Trade"
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                />
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Venture Screenshot / Logo
                </label>
                <div className="border border-dashed border-[#DEE6E0] rounded-xl p-4 bg-[#F4F7F5] flex flex-col items-center justify-center text-center">
                  {editingVenture.imageUrl ? (
                    <div className="w-full max-w-xs space-y-2">
                      <div className="relative aspect-[16/10] w-full rounded overflow-hidden border border-[#DEE6E0]">
                        <img
                          src={editingVenture.imageUrl}
                          alt={editingVenture.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingVenture({ ...editingVenture, imageUrl: null })
                        }
                        className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded text-xs"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="py-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-1.5 bg-[#0D4634] text-white rounded text-xs font-medium hover:bg-[#2D735A]"
                      >
                        Upload Venture Image
                      </button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#DEE6E0]">
                <input
                  type="checkbox"
                  id="vPublished"
                  checked={editingVenture.isPublished}
                  onChange={(e) =>
                    setEditingVenture({
                      ...editingVenture,
                      isPublished: e.target.checked,
                    })
                  }
                  className="rounded text-[#0D4634] focus:ring-[#0D4634] h-4 w-4"
                />
                <label htmlFor="vPublished" className="text-xs font-semibold text-[#101513]">
                  Publish live on public /ventures directory
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#DEE6E0]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#DEE6E0] rounded text-xs font-medium text-[#5B6761] hover:bg-[#F4F7F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] shadow-sm"
                >
                  Save Venture Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
