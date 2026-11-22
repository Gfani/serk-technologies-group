'use client';

import React, { useState, useEffect } from 'react';
import { ProjectItem, MaturityStage } from '@/lib/types';
import MaturityBadge from '@/components/MaturityBadge';
import { Boxes, Plus, Edit2, Trash2, CheckCircle2, XCircle, Search, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      category: 'Enterprise Software & AI',
      maturity: 'RESEARCH_PROTOTYPE',
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
      categoryFilter === 'ALL' ||
      p.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#101513]">Projects & Ventures Dossiers</h1>
          <p className="text-xs text-[#5B6761] mt-1">
            Manage the 23 verified software platforms, maturity stages, and capabilities.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="px-4 py-2 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Platform</span>
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
            { label: 'All (23)', value: 'ALL' },
            { label: 'Sector Intelligence', value: 'sector-intelligence' },
            { label: 'AI & Security', value: 'ai-security' },
            { label: 'Enterprise & Operations', value: 'enterprise-operations' },
            { label: 'Solutions', value: 'solutions' },
            { label: 'Ventures', value: 'ventures' },
            { label: 'Affiliated', value: 'affiliated' },
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
                  <td className="py-3.5 px-4 text-[#5B6761]">{project.category}</td>
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
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 border border-[#DEE6E0] my-8">
            <h2 className="text-lg font-bold text-[#101513] mb-4">
              {editingProject.id ? 'Edit Platform Dossier' : 'New Platform Dossier'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.name}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">Category</label>
                  <select
                    required
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs bg-white text-[#101513]"
                  >
                    <option value="sector-intelligence">Sector Intelligence</option>
                    <option value="ai-security">AI &amp; Security Research</option>
                    <option value="enterprise-operations">Enterprise &amp; Operations</option>
                    <option value="solutions">Core Solutions &amp; Integrations</option>
                    <option value="ventures">Digital Ventures</option>
                    <option value="affiliated">Affiliated Businesses</option>
                    <option value="future-innovation">Future Innovation &amp; Sovereign Tech</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#101513] mb-1">
                    Maturity Stage
                  </label>
                  <select
                    value={editingProject.maturity}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        maturity: e.target.value as MaturityStage,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                  >
                    <option value="CONCEPT">Concept</option>
                    <option value="RESEARCH_PROTOTYPE">Research / Prototype</option>
                    <option value="INTERNAL_ALPHA">Internal Alpha</option>
                    <option value="PILOT_PRIVATE_BETA">Pilot / Private Beta</option>
                    <option value="PRODUCTION_AVAILABLE">Production Available</option>
                    <option value="OPERATING_VENTURE">Operating Venture</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">Summary</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.summary}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, summary: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={editingProject.audience || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, audience: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Capabilities (Comma-separated)
                </label>
                <textarea
                  rows={2}
                  value={editingProject.capabilities || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, capabilities: e.target.value })
                  }
                  placeholder="BOQ export, Real-time sync, Multi-currency"
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                />
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
                  className="px-5 py-2 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A]"
                >
                  Save Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
