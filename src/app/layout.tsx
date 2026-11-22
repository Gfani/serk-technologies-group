import type { Metadata } from 'next';
import './globals.css';
import ThemeInjector from '@/components/ThemeInjector';
import { getThemeSettings } from '@/lib/db';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://serktechgroup.com'),
  title: 'SERK Technologies Group | Innovation with Integrity',
  description:
    'Sovereign digital systems, intelligent platforms, and enterprise engineering built for Ethiopia and a wider world.',
  keywords: [
    'SERK Technologies Group',
    'Software Engineering Ethiopia',
    'Enterprise ERP Tigray',
    'Hospital Management System',
    'Construction Estimator AI',
    'Retail POS Ethiopia',
  ],
  authors: [{ name: 'SERK Technologies Group' }],
  icons: {
    icon: '/images/serk-logo-mark.png',
    apple: '/images/serk-logo-mark.png',
  },
  openGraph: {
    title: 'SERK Technologies Group | Innovation with Integrity',
    description: 'We Engineer the Systems Behind Better Business.',
    url: 'https://serktechgroup.com',
    siteName: 'SERK Technologies Group',
    images: [
      {
        url: '/images/serk-photo-engineering.jpg',
        width: 1200,
        height: 630,
        alt: 'SERK Technologies Group Systems Engineering',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getThemeSettings();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@300;400;500;600;700;800&family=Quicksand:wght@400;500;600;700&family=Noto+Sans+Ethiopic:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-[#101513] antialiased selection:bg-[#0D4634] selection:text-white">
        <ThemeInjector theme={theme} />
        {children}
      </body>
    </html>
  );
}
