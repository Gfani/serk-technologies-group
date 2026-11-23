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

    root.style.setProperty('--serk-theme-bg', theme.surfaceColor);
    root.style.setProperty('--serk-theme-card-bg', theme.surfaceAltColor);
    root.style.setProperty('--serk-theme-primary', theme.primaryColor);
    root.style.setProperty('--serk-theme-secondary', theme.secondaryColor);
    root.style.setProperty('--serk-theme-accent', theme.accentColor);
    root.style.setProperty('--serk-theme-text', theme.textColor);
    root.style.setProperty('--serk-theme-text-muted', theme.textMutedColor);
    root.style.setProperty('--serk-theme-border', theme.borderColor);
    root.style.setProperty('--serk-theme-radius', theme.borderRadius);
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

        --serk-theme-bg: ${theme.surfaceColor};
        --serk-theme-card-bg: ${theme.surfaceAltColor};
        --serk-theme-primary: ${theme.primaryColor};
        --serk-theme-secondary: ${theme.secondaryColor};
        --serk-theme-accent: ${theme.accentColor};
        --serk-theme-text: ${theme.textColor};
        --serk-theme-text-muted: ${theme.textMutedColor};
        --serk-theme-border: ${theme.borderColor};
        --serk-theme-radius: ${theme.borderRadius};
      }
    `}</style>
  );
}
