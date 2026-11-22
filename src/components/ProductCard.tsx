import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '@/lib/types';
import MaturityBadge from './MaturityBadge';

export default function ProductCard({ project }: { project: ProjectItem }) {
  const capabilitiesList = project.capabilities
    ? project.capabilities.split('\n').filter(Boolean).slice(0, 3)
    : [];

  return (
    <div className="bg-white border border-[#DEE6E0] rounded-[8px] overflow-hidden flex flex-col hover:border-[#E3AB72] hover:shadow-lg transition-all duration-200">
      {/* Visual Header / Screenshot Frame */}
      {project.imageUrl && (
        <div className="w-full h-[200px] relative bg-[#F4F7F5] overflow-hidden border-b border-[#DEE6E0]">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Maturity Badge */}
          <div className="flex items-center justify-between mb-3">
            <MaturityBadge stage={project.maturity} />
            <span className="text-[11px] font-medium text-[#5B6761] uppercase tracking-wider">
              {project.category.replace('-', ' ')}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[18px] font-heading font-bold text-[#101513] mb-2 leading-snug">
            {project.name}
          </h3>

          {/* Summary */}
          <p className="text-[13.5px] text-[#5B6761] leading-relaxed mb-4 line-clamp-3">
            {project.summary}
          </p>

          {/* Key Capabilities Preview */}
          {capabilitiesList.length > 0 && (
            <div className="space-y-1.5 mb-5 pt-3 border-t border-[#DEE6E0]/60">
              {capabilitiesList.map((cap, i) => (
                <div key={i} className="flex items-start text-[12.5px] text-[#101513]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E3AB72] mr-2 flex-shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-[#DEE6E0] flex items-center justify-between">
          <Link
            href={`/products/${project.slug}`}
            className="text-[13px] font-semibold text-[#101513] hover:text-[#E3AB72] inline-flex items-center group transition-colors"
          >
            <span>Learn More &amp; Architecture</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform text-[#E3AB72]" />
          </Link>
          {project.publicCta && (
            <Link
              href={project.ctaUrl || '/contact'}
              className="text-xs bg-[#F4F7F5] hover:bg-[rgba(227,171,114,0.15)] hover:text-[#101513] hover:border-[#E3AB72] border border-transparent text-[#101513] px-3 py-1.5 rounded font-medium transition-colors"
            >
              {project.publicCta}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
