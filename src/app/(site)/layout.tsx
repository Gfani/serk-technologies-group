import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getThemeSettings } from '@/lib/db';

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getThemeSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <Header theme={theme} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
