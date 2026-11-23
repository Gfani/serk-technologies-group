import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeInjector from '@/components/ThemeInjector';
import { getThemeSettings } from '@/lib/db';

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getThemeSettings();

  return (
    <div
      className="flex flex-col min-h-screen transition-colors duration-200"
      style={{
        backgroundColor: theme.surfaceColor || '#FFFFFF',
        color: theme.textColor || '#101513',
      }}
    >
      <ThemeInjector theme={theme} />
      <Header theme={theme} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
