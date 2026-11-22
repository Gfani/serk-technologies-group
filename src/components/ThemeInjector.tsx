'use client';

import { useEffect } from 'react';
import { ThemeConfig } from '@/lib/types';

export default function ThemeInjector({ theme }: { theme: ThemeConfig }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--surface-color', theme.surfaceColor);
    root.style.setProperty('--surface-alt-color', theme.surfaceAltColor);
    root.style.setProperty('--border-color', theme.borderColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--text-muted-color', theme.textMutedColor);
    root.style.setProperty('--border-radius', theme.borderRadius);
    root.style.setProperty('--font-heading', theme.fontHeading);
    root.style.setProperty('--font-body', theme.fontBody);
  }, [theme]);

  return (
    <style jsx global>{`
      :root {
        --primary-color: ${theme.primaryColor};
        --secondary-color: ${theme.secondaryColor};
        --accent-color: ${theme.accentColor};
        --surface-color: ${theme.surfaceColor};
        --surface-alt-color: ${theme.surfaceAltColor};
        --border-color: ${theme.borderColor};
        --text-color: ${theme.textColor};
        --text-muted-color: ${theme.textMutedColor};
        --border-radius: ${theme.borderRadius};
        --font-heading: ${theme.fontHeading};
        --font-body: ${theme.fontBody};
      }
    `}</style>
  );
}
