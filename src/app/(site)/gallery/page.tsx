import React from 'react';
import Image from 'next/image';
import { getGalleryMedia } from '@/lib/db';
import AnimatedHeaderBanner from '@/components/AnimatedHeaderBanner';

export const metadata = {
  title: 'Media Gallery | SERK Technologies Group',
  description:
    'Visual documentation of SERK engineering studios, structural field deployments, and software interface designs.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function GalleryPage() {
  const items = await getGalleryMedia();

  return (
    <div className="w-full bg-[#F4F7F5] min-h-screen">
      <AnimatedHeaderBanner title="Media Gallery" />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-8 lg:py-10">
        <div className="max-w-3xl mb-8">
          <p className="text-base sm:text-lg text-[#5B6761] leading-relaxed">
            Photographs and screenshots documenting our engineering environments, field operations,
            and interface design systems in action across Ethiopia.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#DEE6E0] overflow-hidden shadow-sm hover:border-[#0D4634] transition-all group flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full bg-[#DEE6E0] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.altText || item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-black/70 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  {item.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#101513] mb-1.5">{item.title}</h3>
                  {item.caption && (
                    <p className="text-xs text-[#5B6761] leading-relaxed">{item.caption}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
