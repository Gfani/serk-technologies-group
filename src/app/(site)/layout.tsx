import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getThemeSettings } from '@/lib/db';
import { getSiteContent } from '@/lib/contentStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getThemeSettings();
  const content = getSiteContent();

  return (
    <div className="flex flex-col min-h-screen">
      <Header theme={theme} content={content} />
      <main className="flex-1">{children}</main>
      <Footer content={content} />
    </div>
  );
}
