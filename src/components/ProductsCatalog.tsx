'use client';

import React, { useState } from 'react';
import { ProjectItem, MaturityStage } from '@/lib/types';
import ProductCard from './ProductCard';
import { Search, Filter } from 'lucide-react';

export default function ProductsCatalog({ projects }: { projects: ProjectItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMaturity, setSelectedMaturity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { label: 'All (23)', value: 'All' },
    { label: 'Sector Intelligence', value: 'sector-intelligence' },
    { label: 'AI & Security', value: 'ai-security' },
    { label: 'Enterprise & Operations', value: 'enterprise-operations' },
    { label: 'Core Solutions', value: 'solutions' },
    { label: 'Digital Ventures', value: 'ventures' },
    { label: 'Affiliated Businesses', value: 'affiliated' },
    { label: 'Future Innovation', value: 'future-innovation' },
  ];

  const maturityOptions: { label: string; value: string }[] = [
    { label: 'All Maturity Levels', value: 'All' },
    { label: 'Production Available', value: 'PRODUCTION_AVAILABLE' },
    { label: 'Pilot / Private Beta', value: 'PILOT_PRIVATE_BETA' },
    { label: 'Operating Venture', value: 'OPERATING_VENTURE' },
    { label: 'Internal Alpha', value: 'INTERNAL_ALPHA' },
    { label: 'Research / Prototype', value: 'RESEARCH_PROTOTYPE' },
    { label: 'Concept', value: 'CONCEPT' },
  ];

  const filtered = projects.filter((p) => {
    // Search query
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.audience && p.audience.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category
    const matchesCategory =
      selectedCategory === 'All' ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    // Maturity
    const matchesMaturity = selectedMaturity === 'All' || p.maturity === selectedMaturity;

    return matchesSearch && matchesCategory && matchesMaturity;
  });

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="bg-white p-5 rounded-xl border border-[#DEE6E0] shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Box */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-[#5B6761] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search platforms by name, capability, or industry (e.g., BOQ, Clinic, Tax)..."
              className="w-full pl-10 pr-4 py-2.5 border border-[#DEE6E0] rounded text-sm text-[#101513] focus:outline-none focus:ring-1 focus:ring-[#E3AB72] focus:border-[#E3AB72]"
            />
          </div>

          {/* Maturity Filter */}
          <div className="md:col-span-4 relative">
            <select
              value={selectedMaturity}
              onChange={(e) => setSelectedMaturity(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#DEE6E0] rounded text-sm text-[#101513] focus:outline-none focus:ring-1 focus:ring-[#E3AB72] focus:border-[#E3AB72]"
            >
              {maturityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#DEE6E0]">
          <span className="text-xs font-semibold text-[#5B6761] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#E3AB72]" /> Sector:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                selectedCategory === cat.value
                  ? 'bg-[rgba(227,171,114,0.15)] text-[#101513] border-[#E3AB72] font-semibold shadow-xs'
                  : 'bg-[#F4F7F5] text-[#5B6761] border-transparent hover:border-[#E3AB72] hover:text-[#101513]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#5B6761] px-1">
        <span>
          Showing <strong className="text-[#101513]">{filtered.length}</strong> of{' '}
          <strong className="text-[#101513]">{projects.length}</strong> system platforms
        </span>
        {(searchQuery || selectedCategory !== 'All' || selectedMaturity !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedMaturity('All');
            }}
            className="text-[#0D4634] hover:underline font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <ProductCard key={project.id || project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#DEE6E0] rounded-xl p-12 text-center">
          <p className="text-base text-[#101513] font-semibold mb-2">No systems match your criteria.</p>
          <p className="text-xs text-[#5B6761] mb-4">
            Try adjusting your search terms or clearing maturity filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedMaturity('All');
            }}
            className="px-4 py-2 rounded text-xs font-medium bg-[#0D4634] text-white hover:bg-[#2D735A]"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
