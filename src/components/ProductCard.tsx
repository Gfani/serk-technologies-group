import React from 'react';
import Link from 'next/link';
import { ProjectItem } from '@/lib/types';

export default function ProductCard({ project }: { project: ProjectItem }) {
  const badgeMap: Record<string, { cls: string; text: string }> = {
    PRODUCTION_AVAILABLE: { cls: 'serk-badge-production', text: 'Production Available' },
    PILOT_PRIVATE_BETA: { cls: 'serk-badge-pilot', text: 'Pilot / Private Beta' },
    INTERNAL_ALPHA: { cls: 'serk-badge-alpha', text: 'Internal Alpha / Development' },
    RESEARCH_PROTOTYPE: { cls: 'serk-badge-alpha', text: 'Research & Prototype' },
    OPERATING_VENTURE: { cls: 'serk-badge-production', text: 'Operating Venture' },
    CONCEPT: { cls: 'serk-badge-alpha', text: 'Concept / Feasibility' },
  };

  const badge = badgeMap[project.maturity] || {
    cls: 'serk-badge-alpha',
    text: project.maturity.replace(/_/g, ' '),
  };

  const img = project.imageUrl || '/images/serk-photo-engineering.jpg';
  const ctaUrl = project.ctaUrl || `/products/${project.slug}/`;
  const ctaText = project.publicCta || 'Learn More';
  const isCover = project.imageFit === 'cover';

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #DEE6E0',
        borderRadius: '8px',
        padding: '26px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <div>
        <div
          style={{
            minHeight: '180px',
            maxHeight: '220px',
            width: '100%',
            overflow: 'hidden',
            borderRadius: '6px',
            marginBottom: '16px',
            background: '#F7FAF8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E2E8F0',
            padding: isCover ? '0' : '18px 24px',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={img}
            alt={project.name}
            style={
              isCover
                ? { width: '100%', height: '200px', objectFit: 'cover', display: 'block' }
                : {
                    maxWidth: '100%',
                    maxHeight: '184px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }
            }
          />
        </div>
        <span className={`serk-badge ${badge.cls}`}>
          <span>{badge.text}</span>
        </span>
        <h3
          style={{
            fontSize: '1.28rem',
            fontWeight: 600,
            color: '#101513',
            margin: '12px 0 8px 0',
            lineHeight: 1.3,
          }}
        >
          {project.name}
        </h3>
        <p
          style={{
            fontSize: '0.92rem',
            color: '#5B6761',
            lineHeight: 1.6,
            margin: '0 0 16px 0',
          }}
        >
          {project.summary}
        </p>
      </div>
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Link
          href={ctaUrl}
          className="elementor-button"
          style={{
            padding: '9px 16px',
            fontSize: '0.88rem',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          {ctaText}
        </Link>
        <Link
          href={`/contact_us/?interest=${project.slug}`}
          style={{
            color: '#0D4634',
            fontSize: '0.85rem',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          Inquire &rarr;
        </Link>
      </div>
    </div>
  );
}
