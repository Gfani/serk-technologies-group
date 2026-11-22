import React from 'react';
import { MaturityStage } from '@/lib/types';
import { MATURITY_DEFINITIONS } from '@/lib/constants';

export default function MaturityBadge({ stage }: { stage: MaturityStage | string }) {
  const info = MATURITY_DEFINITIONS[stage as MaturityStage] || {
    label: stage,
    badgeClass: 'bg-gray-100 text-gray-800 border-gray-300',
    description: '',
  };

  return (
    <span
      title={info.description}
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold tracking-wide border uppercase ${info.badgeClass}`}
    >
      {info.label}
    </span>
  );
}
