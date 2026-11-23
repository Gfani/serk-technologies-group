'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ProjectItem, MaturityStage } from '@/lib/types';
import MaturityBadge from '@/components/MaturityBadge';
import {
  Boxes,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Search,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject({ ...project });
    setIsModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingProject({
      id: '',
      slug: '',
      name: '',
      category: 'sector-intelligence',
      maturity: 'PRODUCTION_AVAILABLE',
      summary: '',
      description: '',
      audience: '',
      capabilities: '',
      plannedCapabilities: '',
      imageUrl: null,
      publicCta: 'Request Platform Demo',
      ctaUrl: '/contact',
      isPublished: true,
      sortOrder: projects.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    if (!editingProject) return;
    const updates: Partial<ProjectItem> = { name };
    // Auto-generate slug if it was empty or matching previous name slug
    if (!editingProject.id || !editingProject.slug) {
      updates.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    setEditingProject({ ...editingProject, ...updates });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditingProject({
        ...editingProject,
        imageUrl: reader.result as string,
      });
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const method = editingProject.id && !editingProject.id.startsWith('proj-') ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchProjects();
      } else {
        const data = await res.json();
        alert(`Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project dossier?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProjects();
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'ALL' || p.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#101513]">Projects &amp; Ventures Dossiers</h1>
          <p className="text-xs text-[#5B6761] mt-1">
            Manage all software systems, AI initiatives, digital ventures, and industry solutions with instant live publishing.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="px-4 py-2 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Platform</span>
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#DEE6E0] space-y-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[#5B6761]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search platforms by name, sector or capability..."
            className="w-full text-xs text-[#101513] focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#DEE6E0]">
          <span className="text-[11px] font-semibold text-[#5B6761] mr-1">Filter Sector:</span>
          {[
            { label: 'All', value: 'ALL' },
            { label: 'Sector Intelligence', value: 'sector-intelligence' },
            { label: 'AI & Security', value: 'ai-security' },
            { label: 'Enterprise & Operations', value: 'enterprise-operations' },
            { label: 'Core Solutions', value: 'solutions' },
            { label: 'Digital Ventures', value: 'ventures' },
            { label: 'Affiliated Businesses', value: 'affiliated' },
            { label: 'Future Innovation', value: 'future-innovation' },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategoryFilter(cat.value)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                categoryFilter === cat.value
                  ? 'bg-[#0D4634] text-white'
                  : 'bg-[#F4F7F5] text-[#5B6761] hover:bg-[#DEE6E0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-[#DEE6E0] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4F7F5] border-b border-[#DEE6E0] text-[#5B6761] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Platform Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Maturity Stage</th>
                <th className="py-3 px-4 text-center">Published</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DEE6E0]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#5B6761]">
                    Loading platform dossiers...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#5B6761]">
                    No platforms match your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((project) => (
                  <tr key={project.id || project.slug} className="hover:bg-[#F4F7F5]/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#101513]">{project.name}</div>
                      <div className="text-[11px] text-[#5B6761] truncate max-w-xs">{project.slug}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#5B6761] capitalize">
                      {project.category.replace('-', ' ')}
                    </td>
                    <td className="py-3.5 px-4">
                      <MaturityBadge stage={project.maturity} />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {project.isPublished ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-400 inline" />
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Link
                        href={`/products/${project.slug}`}
                        target="_blank"
                        className="p-1 text-[#5B6761] hover:text-[#101513] inline-block"
                        title="View public page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="p-1 text-[#0D4634] hover:text-[#2D735A] inline-block"
                        title="Edit project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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

      {/* Edit / Create Comprehensive Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 sm:p-8 border border-[#DEE6E0] my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#DEE6E0]">
              <h2 className="text-lg font-bold text-[#101513]">
                {editingProject.id ? 'Edit Platform Dossier' : 'Create New Project / Venture / AI Initiative'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#5B6761] hover:text-[#101513]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Classification & Maturity Stage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Classification / Category *
                  </label>
                  <select
                    required
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs bg-white text-[#101513] focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
                  >
                    <option value="sector-intelligence">Sector Intelligence</option>
                    <option value="ai-security">AI &amp; Security Research</option>
                    <option value="enterprise-operations">Enterprise &amp; Operations</option>
                    <option value="solutions">Core Solutions &amp; Integrations</option>
                    <option value="ventures">Digital Ventures</option>
                    <option value="affiliated">Affiliated Businesses</option>
                    <option value="future-innovation">Future Innovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Maturity Stage Badge *
                  </label>
                  <select
                    required
                    value={editingProject.maturity}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        maturity: e.target.value as MaturityStage,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs bg-white text-[#101513] focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
                  >
                    <option value="PRODUCTION_AVAILABLE">Production Available</option>
                    <option value="PILOT_PRIVATE_BETA">Pilot / Private Beta</option>
                    <option value="INTERNAL_ALPHA">Internal Alpha</option>
                    <option value="RESEARCH_PROTOTYPE">Research / Prototype</option>
                    <option value="CONCEPT">Concept</option>
                    <option value="OPERATING_VENTURE">Operating Venture</option>
                  </select>
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Platform / Initiative Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. HealthOS Clinical ERP"
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513] focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, slug: e.target.value })
                    }
                    placeholder="healthos-clinical-erp"
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513] focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
                  />
                </div>
              </div>

              {/* Short Summary (for grid cards) */}
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Short Card Summary (Displayed on Grid Cards) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.summary}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, summary: e.target.value })
                  }
                  placeholder="Concise 1-2 sentence overview for directory cards..."
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513] focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
                />
              </div>

              {/* Full Detailed Description (for modal / detail view) */}
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Full Detailed Description (Architecture &amp; Mission)
                </label>
                <textarea
                  rows={4}
                  value={editingProject.description || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  placeholder="Detailed technical overview, problem statement, and deployment architecture..."
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513] focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
                />
              </div>

              {/* Key Capabilities Bullet Points */}
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Key Capabilities / Feature Bullet Points (One per line)
                </label>
                <textarea
                  rows={3}
                  value={editingProject.capabilities || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, capabilities: e.target.value })
                  }
                  placeholder="Clinical record encryption&#10;Offline synchronization&#10;Pharmacy &amp; lab inventory tracking"
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs font-mono text-[#101513] focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
                />
                <span className="text-[11px] text-[#5B6761]">
                  Enter each feature on a new line. The first 3 items render on cards.
                </span>
              </div>

              {/* Target Audience & Planned Capabilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Target Audience / Industry Tags
                  </label>
                  <input
                    type="text"
                    value={editingProject.audience || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, audience: e.target.value })
                    }
                    placeholder="e.g. Tier-1 Hospitals, Regional Clinics"
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513] focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Planned Capabilities (Roadmap)
                  </label>
                  <input
                    type="text"
                    value={editingProject.plannedCapabilities || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        plannedCapabilities: e.target.value,
                      })
                    }
                    placeholder="e.g. Telemedicine portal, Regional lab integration"
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513] focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
                  />
                </div>
              </div>

              {/* Custom CTA Label & Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Custom CTA Label
                  </label>
                  <input
                    type="text"
                    value={editingProject.publicCta || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, publicCta: e.target.value })
                    }
                    placeholder="e.g. Request Platform Demo"
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513] focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    CTA Destination Link
                  </label>
                  <input
                    type="text"
                    value={editingProject.ctaUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, ctaUrl: e.target.value })
                    }
                    placeholder="e.g. /contact or https://..."
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs text-[#101513] focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
                  />
                </div>
              </div>

              {/* Media Upload (Drag-and-Drop / File with 16:10 Frame Preview) */}
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Platform Screenshot / Image (Aspect Ratio 16:10)
                </label>
                <div className="border border-dashed border-[#DEE6E0] rounded-xl p-4 bg-[#F4F7F5] flex flex-col items-center justify-center text-center">
                  {editingProject.imageUrl ? (
                    <div className="w-full max-w-md space-y-3">
                      <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-[#DEE6E0] bg-white shadow-sm">
                        <img
                          src={editingProject.imageUrl}
                          alt={editingProject.name || 'Platform preview'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1 bg-white border border-[#DEE6E0] rounded text-xs font-medium text-[#101513] hover:bg-[#DEE6E0]"
                        >
                          Replace Image
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setEditingProject({ ...editingProject, imageUrl: null })
                          }
                          className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded text-xs font-medium hover:bg-red-100"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 py-4">
                      <div className="w-12 h-12 rounded-full bg-white border border-[#DEE6E0] flex items-center justify-center mx-auto text-[#0D4634]">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-semibold text-[#101513]">
                        Upload platform screenshot
                      </div>
                      <p className="text-[11px] text-[#5B6761]">
                        PNG, JPG, or WebP (framed at 16:10 aspect ratio)
                      </p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-1.5 bg-[#0D4634] text-white rounded text-xs font-medium hover:bg-[#2D735A] transition-colors"
                      >
                        Select Image File
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
                <div className="mt-2">
                  <input
                    type="text"
                    value={editingProject.imageUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, imageUrl: e.target.value })
                    }
                    placeholder="Or enter direct image URL (https://...)"
                    className="w-full px-3 py-1.5 border border-[#DEE6E0] rounded text-xs text-[#5B6761] focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
                  />
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#DEE6E0]">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={editingProject.isPublished}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      isPublished: e.target.checked,
                    })
                  }
                  className="rounded text-[#0D4634] focus:ring-[#0D4634] h-4 w-4"
                />
                <label htmlFor="isPublished" className="text-xs font-semibold text-[#101513]">
                  Publish immediately on live web directory
                </label>
              </div>

              {/* Actions */}
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
                  className="px-6 py-2 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] shadow-sm transition-colors"
                >
                  Save &amp; Publish Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
