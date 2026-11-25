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
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      }
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
    setEditingProject({ ...project, imageFit: project.imageFit || 'contain' });
    setImagePreview(project.imageUrl || null);
    setIsModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingProject({
      id: '',
      slug: '',
      name: '',
      category: 'sector-intelligence',
      maturity: 'PILOT_PRIVATE_BETA',
      summary: '',
      description: '',
      audience: '',
      capabilities: '',
      plannedCapabilities: '',
      imageUrl: null,
      imageFit: 'contain',
      publicCta: 'Request an Engineering Demo',
      ctaUrl: '/contact_us',
      isPublished: true,
      sortOrder: projects.length + 1,
    });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        if (editingProject) {
          setEditingProject({ ...editingProject, imageUrl: base64 });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (name: string) => {
    if (!editingProject) return;
    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setEditingProject({
      ...editingProject,
      name,
      slug: editingProject.id ? editingProject.slug : generatedSlug,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setSaving(true);
    try {
      const isUpdate = Boolean(editingProject.id);
      const method = isUpdate ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      if (res.ok) {
        setIsModalOpen(false);
        await fetchProjects();
      } else {
        const data = await res.json();
        alert(`Error: ${data.error || 'Failed to save item'}`);
      }
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project / venture?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchProjects();
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
      categoryFilter === 'ALL' ||
      p.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#101513]">Products, Ventures &amp; AI Creator</h1>
          <p className="text-xs text-[#5B6761] mt-1">
            Add or manage all 23 platforms and custom ventures. Changes sync immediately to the live public site.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="px-4 py-2 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Platform / Venture</span>
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#DEE6E0] space-y-3">
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
            { label: 'AI & Security Research', value: 'ai-security' },
            { label: 'Enterprise & Operations', value: 'enterprise-operations' },
            { label: 'Core Solutions & Integrations', value: 'solutions' },
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
              {filtered.map((project) => (
                <tr key={project.id || project.slug} className="hover:bg-[#F4F7F5]/50">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#101513]">{project.name}</div>
                    <div className="text-[11px] text-[#5B6761] truncate max-w-xs">{project.slug}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#5B6761] capitalize">
                    {project.category.replace(/-/g, ' ')}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 sm:p-8 border border-[#DEE6E0] my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#DEE6E0] mb-5">
              <h2 className="text-lg font-bold text-[#101513]">
                {editingProject.id ? 'Edit Platform / Venture Dossier' : 'New Platform / Venture Dossier'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#5B6761] hover:text-[#101513] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Platform / Venture Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. SERK Health OS"
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#E3AB72]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, slug: e.target.value })
                    }
                    placeholder="e.g. health-os"
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#E3AB72]"
                  />
                </div>
              </div>

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
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs bg-white text-[#101513] focus:outline-none focus:ring-1 focus:ring-[#E3AB72]"
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
                    value={editingProject.maturity}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        maturity: e.target.value as MaturityStage,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs bg-white text-[#101513] focus:outline-none focus:ring-1 focus:ring-[#E3AB72]"
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

              {/* Media Upload with Flexible Ratio & Display Mode */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="block text-xs font-semibold text-[#101513]">
                    Card Logo / Screenshot Image (No Forced Crop)
                  </label>
                  <div className="inline-flex rounded-lg border border-[#DEE6E0] bg-[#F4F7F5] p-0.5">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject({ ...editingProject, imageFit: 'contain' })
                      }
                      className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                        (editingProject.imageFit || 'contain') === 'contain'
                          ? 'bg-[#0D4634] text-white shadow-xs'
                          : 'text-[#5B6761] hover:text-[#101513]'
                      }`}
                    >
                      Fit / Logo (No Crop)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject({ ...editingProject, imageFit: 'cover' })
                      }
                      className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                        editingProject.imageFit === 'cover'
                          ? 'bg-[#0D4634] text-white shadow-xs'
                          : 'text-[#5B6761] hover:text-[#101513]'
                      }`}
                    >
                      Fill / Photo (Edge-to-Edge)
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {/* Flexible Live Card Preview */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      minHeight: '180px',
                      maxHeight: '220px',
                      padding:
                        (editingProject.imageFit || 'contain') === 'contain'
                          ? '18px 24px'
                          : '0px',
                    }}
                    className="w-full sm:w-1/2 bg-[#F7FAF8] border-2 border-dashed border-[#DEE6E0] hover:border-[#E3AB72] rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Live Card Preview"
                        style={
                          (editingProject.imageFit || 'contain') === 'contain'
                            ? {
                                maxWidth: '100%',
                                maxHeight: '184px',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain',
                                display: 'block',
                              }
                            : {
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                display: 'block',
                              }
                        }
                      />
                    ) : (
                      <div className="text-center space-y-1 text-[#5B6761] p-4">
                        <Upload className="w-6 h-6 mx-auto text-[#E3AB72]" />
                        <span className="text-xs font-medium block">Click or drop image</span>
                        <span className="text-[10px] text-gray-400 block">
                          Any ratio: wide logo, square icon, or screenshot
                        </span>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>

                  <div className="w-full sm:w-1/2 space-y-2">
                    <input
                      type="text"
                      placeholder="Or enter existing image URL (e.g. /images/serk-photo.jpg)"
                      value={editingProject.imageUrl || ''}
                      onChange={(e) => {
                        setEditingProject({ ...editingProject, imageUrl: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Image Alt Text / Audience (e.g. Segar Ride Logo)"
                      value={editingProject.audience || ''}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, audience: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                    />
                    <p className="text-[11px] text-[#5B6761] leading-tight">
                      <strong>Fit / Logo</strong> keeps 100% of your logo visible without cropping.{' '}
                      <strong>Fill / Photo</strong> fills edge-to-edge for photography.
                    </p>
                  </div>
                </div>
              </div>

              {/* Short Card Summary */}
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Short Card Summary (Displayed on grid cards) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.summary}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, summary: e.target.value })
                  }
                  placeholder="Clear 1-2 sentence description for the public directory card..."
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#E3AB72]"
                />
              </div>

              {/* Full Detailed Description */}
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Full Detailed Description (Dossier &amp; modal view)
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  placeholder="In-depth technical architecture, problem statement, and engineering scope..."
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#E3AB72]"
                />
              </div>

              {/* Key Capabilities */}
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
                  placeholder="BOQ takeoff from 2D &amp; 3D IFC models&#10;Interim payment certificates (IPC)&#10;Offline-first field synchronization"
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-[#E3AB72]"
                />
              </div>

              {/* CTA Customization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Custom CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={editingProject.publicCta || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, publicCta: e.target.value })
                    }
                    placeholder="e.g. Request an Engineering Demo"
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#E3AB72]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Custom CTA Link URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.ctaUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, ctaUrl: e.target.value })
                    }
                    placeholder="e.g. /products/health-os/ or /contact_us/?interest=health-os"
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#E3AB72]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#101513] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isPublished !== false}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, isPublished: e.target.checked })
                    }
                    className="rounded border-[#DEE6E0] text-[#0D4634] focus:ring-[#E3AB72]"
                  />
                  <span>Published on live site</span>
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
                  disabled={saving}
                  className="px-6 py-2 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors disabled:opacity-50"
                >
                  {saving ? 'Publishing...' : 'Save & Publish Live'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
