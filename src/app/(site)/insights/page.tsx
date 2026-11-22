import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowRight, Calendar, User } from 'lucide-react';
import AnimatedHeaderBanner from '@/components/AnimatedHeaderBanner';

export const metadata = {
  title: 'Engineering Insights & Articles | SERK Technologies Group',
  description:
    'Technical case studies, software architecture essays, and industry perspectives from the SERK engineering team.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InsightsPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    });
  } catch (err) {
    // Fallback default articles
  }

  if (posts.length === 0) {
    posts = [
      {
        id: 'post-1',
        slug: 'engineering-resilient-systems-ethiopia',
        title: 'Architecting Offline-First Enterprise Software for African Infrastructure',
        excerpt:
          'How SERK designs database synchronisation, local transaction queues, and failover architectures that withstand power fluctuations and connectivity disruptions.',
        author: 'SERK Systems Architecture Team',
        category: 'Engineering Architecture',
        publishedAt: new Date().toISOString(),
      },
      {
        id: 'post-2',
        slug: 'responsible-clinical-ai-governance',
        title: 'Responsible Clinical AI: Protecting Patient Data Sovereignty in Hospital ERPs',
        excerpt:
          'Why hospital systems must avoid black-box cloud dependencies and how sovereign on-premise encryption guarantees medical record privacy.',
        author: 'Health Informatics Lead',
        category: 'Healthcare & Ethics',
        publishedAt: new Date().toISOString(),
      },
      {
        id: 'post-3',
        slug: 'modernizing-construction-boq-in-etb',
        title: 'Eliminating the 30% Cost Discrepancy in Ethiopian Construction Takeoffs',
        excerpt:
          'A technical breakdown of how computerized BOQ estimation algorithms streamline structural steel and concrete bids in Ethiopian Birr.',
        author: 'Construction Technology Group',
        category: 'Construction Tech',
        publishedAt: new Date().toISOString(),
      },
    ];
  }

  return (
    <div className="w-full bg-[#F4F7F5] min-h-screen">
      <AnimatedHeaderBanner title="Insights & Perspectives" />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-8 lg:py-10">
        <div className="max-w-3xl mb-8">
          <p className="text-base sm:text-lg text-[#5B6761] leading-relaxed">
            In-depth perspectives, architectural whitepapers, and operational lessons from our work
            building sovereign digital systems across Ethiopia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm hover:border-[#0D4634] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#0D4634] bg-[#F4F7F5] px-2.5 py-1 rounded mb-4">
                  {post.category}
                </span>
                <h2 className="text-lg font-bold text-[#101513] mb-3 leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5B6761] leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#DEE6E0] flex items-center justify-between text-xs text-[#5B6761]">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#0D4634]" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1 text-[#0D4634] font-semibold">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
