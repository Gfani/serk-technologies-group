import React from 'react';
import ProductsCatalog from '@/components/ProductsCatalog';
import { getAllProjects } from '@/lib/db';
import AnimatedHeaderBanner from '@/components/AnimatedHeaderBanner';

export const metadata = {
  title: 'Products & Platforms Directory | SERK Technologies Group',
  description:
    'Explore the 23 verified software platforms, clinical systems, and operating ventures engineered by SERK Technologies Group.',
};

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function ProductsPage() {
  const projects = await getAllProjects();

  return (
    <div className="w-full bg-[#F4F7F5] min-h-screen">
      <AnimatedHeaderBanner title="Products & Platforms" />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-8 lg:py-10">
        <div className="max-w-3xl mb-8">
          <p className="text-base sm:text-lg text-[#5B6761] leading-relaxed">
            All 23 software systems, clinical engines, financial platforms, and digital ventures
            engineered by SERK Technologies Group. Each dossier discloses its verified operational
            maturity stage and verified capabilities.
          </p>
        </div>

        <ProductsCatalog projects={projects} />
      </div>
    </div>
  );
}
