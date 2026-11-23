import fs from 'fs';
import path from 'path';
import { ProjectItem, ThemeConfig } from './types';

const CATEGORIES_ORDER = [
  {
    id: 'sector-intelligence',
    title: 'Sector Intelligence',
    subtitle: 'Specialized vertical platforms engineering decisions and workflows for construction and healthcare.',
  },
  {
    id: 'ai-security',
    title: 'AI & Security Research',
    subtitle: 'Engineering foundations for governed multi-model intelligence, cybersecurity, and quantitative estimating.',
  },
  {
    id: 'enterprise-operations',
    title: 'Enterprise & Operations',
    subtitle: 'Connected software environments that streamline core administrative, financial, sales, and supply chain operations.',
  },
  {
    id: 'solutions',
    title: 'Core Solutions & Integrations',
    subtitle: 'Purpose-built operational automation, workflow copilots, and financial infrastructure linking legacy systems.',
  },
  {
    id: 'ventures',
    title: 'Digital Ventures',
    subtitle: 'Autonomous digital platforms exploring urban mobility, connected delivery, transparent commerce, and heritage tourism.',
  },
  {
    id: 'affiliated',
    title: 'Affiliated & Associated Businesses',
    subtitle: 'Frontline enterprise proving grounds and leadership-associated companies providing real-world operational testing.',
  },
  {
    id: 'future-innovation',
    title: 'Future Innovation & Sovereign Tech',
    subtitle: 'Long-term industrial research, vehicle assembly concepts, clean energy accessories, and African developer talent development.',
  },
];

const MATURITY_BADGES: Record<string, { cls: string; text: string }> = {
  PRODUCTION_AVAILABLE: { cls: 'serk-badge-production', text: 'Production Available' },
  PILOT_PRIVATE_BETA: { cls: 'serk-badge-pilot', text: 'Pilot / Private Beta' },
  INTERNAL_ALPHA: { cls: 'serk-badge-alpha', text: 'Internal Alpha / Development' },
  RESEARCH_PROTOTYPE: { cls: 'serk-badge-alpha', text: 'Research & Prototype' },
  OPERATING_VENTURE: { cls: 'serk-badge-production', text: 'Operating Venture' },
  CONCEPT: { cls: 'serk-badge-alpha', text: 'Concept / Feasibility' },
};

export function syncProjectsToHtml(projects: ProjectItem[]): boolean {
  try {
    const published = projects.filter((p) => p.isPublished !== false);

    // 1. Generate Products Page Content
    const navPills: string[] = [];
    const sectionsHtml: string[] = [];

    for (const cat of CATEGORIES_ORDER) {
      const catProjects = published.filter(
        (p) =>
          p.category === cat.id ||
          p.category.toLowerCase().replace(/[\s&_]+/g, '-') === cat.id
      );

      const count = catProjects.length;
      navPills.push(
        `<a href="#${cat.id}" class="serk-cat-pill">${cat.title} <span style="opacity:0.65;font-size:11px;">(${count})</span></a>`
      );

      const cardsHtml = catProjects.map((p) => {
        const badge = MATURITY_BADGES[p.maturity] || {
          cls: 'serk-badge-alpha',
          text: p.maturity.replace(/_/g, ' '),
        };
        const img = p.imageUrl || '/images/serk-photo-engineering.jpg';
        const ctaUrl = p.ctaUrl || `/products/${p.slug}/`;
        const ctaText = p.publicCta || 'Learn More';

        return `        <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 26px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: transform 0.2s ease, box-shadow 0.2s ease;">
            <div>
                <div style="height: 160px; overflow: hidden; border-radius: 6px; margin-bottom: 16px; background: #F8FAFC; display: flex; align-items: center; justify-content: center; border: 1px solid #E2E8F0;">
                    <img src="${img}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <span class="serk-badge ${badge.cls}"><span>${badge.text}</span></span>
                <h3 style="font-size: 1.28rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0; line-height: 1.3;">${p.name}</h3>
                <p style="font-size: 0.92rem; color: #5B6761; line-height: 1.6; margin: 0 0 16px 0;">${p.summary}</p>
            </div>
            <div style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
                <a href="${ctaUrl}" class="elementor-button" style="padding: 9px 16px; font-size: 0.88rem; text-decoration: none; display: inline-block;">${ctaText}</a>
                <a href="/contact_us/?interest=${p.slug}" style="color: #0D4634; font-size: 0.85rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">Inquire &rarr;</a>
            </div>
        </div>`;
      });

      const cardsGrid = cardsHtml.join('\n');
      const section = `<!-- Category Section: ${cat.title} (${cat.id}) -->
<div id="${cat.id}" style="margin-bottom: 70px; scroll-margin-top: 160px;">
    <div style="border-bottom: 2px solid #101513; padding-bottom: 14px; margin-bottom: 28px; display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <h2 style="font-size: 1.75rem; font-weight: 700; color: #101513; margin: 0;">${cat.title}</h2>
            <span style="font-size: 0.85rem; font-weight: 600; color: #5B6761; background: #F4F7F5; padding: 3px 10px; border-radius: 20px; border: 1px solid #DEE6E0;">${count} Platforms</span>
        </div>
        <p style="color: #5B6761; margin: 0; font-size: 0.98rem; line-height: 1.5;">${cat.subtitle}</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
${cardsGrid}
    </div>
</div>`;
      sectionsHtml.push(section);
    }

    const newMainContent = `    <!-- Main Content -->
    <main style="padding: 40px 20px 100px 20px; background: #FCFCFE;">
        <div style="max-width: 1200px; margin: 0 auto;">

            <!-- Sticky Category Jump Navigation Bar -->
            <nav class="serk-category-nav" style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 14px 18px; margin-bottom: 48px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; position: sticky; top: 76px; z-index: 40; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
                <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #5B6761; letter-spacing: 0.06em; margin-right: 6px;">Categories:</span>
  ${navPills.join('\n  ')}
            </nav>

${sectionsHtml.join('\n\n')}

        </div>
    </main>`;

    // Update public/products/index.html and site/products/index.html
    const productPaths = [
      path.join(process.cwd(), 'public', 'products', 'index.html'),
      path.join(process.cwd(), 'site', 'products', 'index.html'),
    ];

    for (const pPath of productPaths) {
      if (fs.existsSync(pPath)) {
        let html = fs.readFileSync(pPath, 'utf-8');
        const mainStart = html.indexOf('<!-- Main Content -->');
        const mainEnd = html.indexOf('</main>', mainStart);
        if (mainStart !== -1 && mainEnd !== -1) {
          html = html.substring(0, mainStart) + newMainContent + html.substring(mainEnd + 7);
          fs.writeFileSync(pPath, html, 'utf-8');
        }
      }
    }

    // 2. Generate Ventures Page Content
    const ventureProjects = published.filter(
      (p) =>
        p.category === 'ventures' ||
        p.category.toLowerCase().includes('venture')
    );

    const ventureCards = ventureProjects.map((p) => {
      const badge = MATURITY_BADGES[p.maturity] || {
        cls: 'serk-badge-alpha',
        text: p.maturity.replace(/_/g, ' '),
      };
      const ctaUrl = p.ctaUrl || `/contact_us/?interest=${p.slug}`;
      const ctaText = p.publicCta || 'Discover Venture';
      const subtitle = p.audience || 'Digital Venture';

      return `    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <span class="serk-badge ${badge.cls}"><span>${badge.text}</span></span>
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #101513; margin: 12px 0 8px 0;">${p.name}</h3>
            <p style="font-size: 0.85rem; font-weight: 600; color: #101513; text-transform: uppercase; margin-bottom: 14px;">${subtitle}</p>
            <p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">${p.summary}</p>
        </div>
        <div style="margin-top: 24px;">
            <a href="${ctaUrl}" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">${ctaText}</a>
        </div>
    </div>`;
    });

    const venturesGridHtml = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;">\n${ventureCards.join('\n\n')}\n</div>`;

    const venturePaths = [
      path.join(process.cwd(), 'public', 'ventures', 'index.html'),
      path.join(process.cwd(), 'site', 'ventures', 'index.html'),
    ];

    for (const vPath of venturePaths) {
      if (fs.existsSync(vPath)) {
        let html = fs.readFileSync(vPath, 'utf-8');
        const gridStart = html.indexOf('<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))');
        if (gridStart !== -1) {
          const mainClose = html.indexOf('</div>\n        </div>\n    </main>', gridStart);
          if (mainClose !== -1) {
            html = html.substring(0, gridStart) + venturesGridHtml + '\n        </div>\n    </main>' + html.substring(mainClose + 30);
            fs.writeFileSync(vPath, html, 'utf-8');
          }
        }
      }
    }

    return true;
  } catch (err) {
    console.error('Error syncing projects to HTML:', err);
    return false;
  }
}

export function syncGalleryToHtml(
  items: Array<{
    title: string;
    caption?: string | null;
    altText?: string | null;
    category?: string | null;
    imageUrl: string;
  }>
): boolean {
  try {
    if (!items || items.length === 0) return true;

    const cardsHtml = items.map((item, idx) => {
      const cat = item.category || 'General';
      const slotNum = String(idx + 1).padStart(2, '0');
      return `    <!-- Gallery Item: ${item.title} -->
    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: transform 0.2s ease;">
        <div style="height: 220px; overflow: hidden; background: #F8FAFC; border-bottom: 1px solid #DEE6E0;">
            <img src="${item.imageUrl}" alt="${item.altText || item.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="padding: 22px;">
            <span class="serk-badge serk-badge-production" style="margin-bottom: 10px;"><span>${cat.toUpperCase()} · ${slotNum}</span></span>
            <h4 style="font-size: 1.15rem; font-weight: 700; color: #101513; margin: 0 0 8px 0;">${item.title}</h4>
            <p style="font-size: 0.88rem; color: #5B6761; margin: 0; line-height: 1.5;">${item.caption || ''}</p>
        </div>
    </div>`;
    });

    const galleryGridHtml = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px; margin-bottom: 60px;">\n${cardsHtml.join('\n\n')}\n</div>`;

    const galleryPaths = [
      path.join(process.cwd(), 'public', 'gallery', 'index.html'),
      path.join(process.cwd(), 'site', 'gallery', 'index.html'),
    ];

    for (const gPath of galleryPaths) {
      if (fs.existsSync(gPath)) {
        let html = fs.readFileSync(gPath, 'utf-8');
        const gridStart = html.indexOf('<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px; margin-bottom: 60px;">');
        if (gridStart !== -1) {
          const mainClose = html.indexOf('</div>\n\n        </div>\n    </main>', gridStart);
          if (mainClose !== -1) {
            html = html.substring(0, gridStart) + galleryGridHtml + '\n        </div>\n    </main>' + html.substring(mainClose + 33);
            fs.writeFileSync(gPath, html, 'utf-8');
          }
        }
      }
    }

    return true;
  } catch (err) {
    console.error('Error syncing gallery to HTML:', err);
    return false;
  }
}

export function syncSiteContentToHtml(content: any): boolean {
  try {
    if (!content) return true;

    const htmlDirs = [
      path.join(process.cwd(), 'public'),
      path.join(process.cwd(), 'site'),
    ];

    function getAllHtmlFiles(dir: string): string[] {
      let results: string[] = [];
      if (!fs.existsSync(dir)) return results;
      const list = fs.readdirSync(dir);
      for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          results = results.concat(getAllHtmlFiles(fullPath));
        } else if (file.endsWith('.html')) {
          results.push(fullPath);
        }
      }
      return results;
    }

    const allHtml = [...getAllHtmlFiles(htmlDirs[0]), ...getAllHtmlFiles(htmlDirs[1])];

    const phone = content.siteInfo?.phone;
    const email = content.siteInfo?.email;
    const heroTitle = content.pages?.home?.heroTitle;
    const heroSubtitle = content.pages?.home?.heroSubtitle;

    for (const filePath of allHtml) {
      let html = fs.readFileSync(filePath, 'utf-8');
      let changed = false;

      // Update phone if present
      if (phone) {
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        html = html.replace(/href="tel:[^"]*"/g, `href="tel:${cleanPhone}"`);
        html = html.replace(/\+251\s*\d{3}\s*\d{3}\s*\d{3}/g, phone);
        changed = true;
      }

      // Update email if present
      if (email) {
        html = html.replace(/href="mailto:[^"]*"/g, `href="mailto:${email}"`);
        html = html.replace(/[a-zA-Z0-9._%+-]+@gmail\.com/g, email);
        changed = true;
      }

      // If homepage, update hero title and subtitle
      if (filePath.endsWith('public\\index.html') || filePath.endsWith('public/index.html') || filePath.endsWith('site\\index.html') || filePath.endsWith('site/index.html')) {
        if (heroTitle) {
          html = html.replace(
            /<h1 class="elementor-heading-title elementor-size-default">[^<]*<\/h1>/g,
            `<h1 class="elementor-heading-title elementor-size-default">${heroTitle}</h1>`
          );
          changed = true;
        }
        if (heroSubtitle) {
          html = html.replace(
            /(<div class="elementor-widget-container"><p>)From your first website to intelligent enterprise operations[^<]*(<\/p><\/div>)/g,
            `$1${heroSubtitle}$2`
          );
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(filePath, html, 'utf-8');
      }
    }
    return true;
  } catch (err) {
    console.error('Error syncing site content to HTML:', err);
    return false;
  }
}

export function isDarkColor(hexColor: string): boolean {
  if (!hexColor || !hexColor.startsWith('#')) return false;
  let hex = hexColor.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  if (hex.length !== 6) return false;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

export function generateThemeCss(theme: ThemeConfig): string {
  const isDark = isDarkColor(theme.surfaceColor || '#FFFFFF');
  const bg = theme.surfaceColor || '#FFFFFF';
  const cardBg = theme.surfaceAltColor || (isDark ? '#151D19' : '#FFFFFF');
  const border = theme.borderColor || (isDark ? '#23332A' : '#DEE6E0');
  const text = theme.textColor || (isDark ? '#F0F4F2' : '#101513');
  const textMuted = theme.textMutedColor || (isDark ? '#9AB4A9' : '#5B6761');
  const primary = theme.primaryColor || '#0D4634';
  const secondary = theme.secondaryColor || '#2D735A';
  const accent = theme.accentColor || '#E3AB72';
  const radius = theme.borderRadius || '8px';

  return `/* ==========================================================================
   SERK TECHNOLOGIES GROUP - Active Dynamic Theme Tokens
   Auto-synced from Admin Design Studio
   ========================================================================== */

:root {
  --serk-theme-bg: ${bg};
  --serk-theme-card-bg: ${cardBg};
  --serk-theme-primary: ${primary};
  --serk-theme-secondary: ${secondary};
  --serk-theme-accent: ${accent};
  --serk-theme-text: ${text};
  --serk-theme-text-muted: ${textMuted};
  --serk-theme-border: ${border};
  --serk-theme-radius: ${radius};
}

/* Base Body & Global Background */
html, body {
  background-color: var(--serk-theme-bg) !important;
  color: var(--serk-theme-text) !important;
}

/* Elementor Section Canvas (EXCLUDING Footer & Dedicated Dark Sections) */
.elementor:not(.elementor-1175):not([data-elementor-id="1175"]):not(.serk-global-footer) {
  background-color: var(--serk-theme-bg) !important;
}

.elementor-section:not(.elementor-element-5b611c4):not(.elementor-element-e959569):not([data-id="5b611c4"]):not([data-id="e959569"]):not(.serk-dark-sec):not([data-serk-keep-dark]):not(.elementor-element-8ebc8a5):not(.elementor-location-footer):not(.serk-footer-bottom):not(.elementor-element-ec224c7):not(.elementor-element-c49bbe5) {
  background-color: var(--serk-theme-bg) !important;
}

/* Primary Action Buttons (Always Pure White Text #FFFFFF for high contrast) */
.elementor-button, .serk-btn-primary, button.primary, .serk-btn-mobile {
  background-color: var(--serk-theme-primary) !important;
  color: #FFFFFF !important;
  border-radius: var(--serk-theme-radius) !important;
  border-color: var(--serk-theme-primary) !important;
  transition: background-color 0.2s ease, border-color 0.2s ease !important;
}
.elementor-button *, .serk-btn-primary * {
  color: #FFFFFF !important;
}
.elementor-button:hover, .serk-btn-primary:hover, button.primary:hover {
  background-color: var(--serk-theme-secondary) !important;
  border-color: var(--serk-theme-secondary) !important;
  color: #FFFFFF !important;
}

/* Category Filter Pills & Badges */
.serk-cat-pill {
  border-radius: var(--serk-theme-radius) !important;
  transition: all 0.2s ease;
}
.serk-cat-pill.active {
  background-color: rgba(227, 171, 114, 0.15) !important;
  border-color: var(--serk-theme-accent) !important;
  color: var(--serk-theme-text) !important;
}
.serk-cat-pill:hover {
  border-color: var(--serk-theme-accent) !important;
}

/* Header & Text Contrast Adaptation */
${
  isDark
    ? `/* ========================================================
   DARK THEME CONTRAST HARMONIZATION
   ======================================================== */
.serk-top-bar {
  background-color: var(--serk-theme-card-bg) !important;
  border-bottom: 1px solid var(--serk-theme-border) !important;
}
.serk-top-bar a, .serk-top-bar .serk-sep, .serk-top-bar .serk-contact-link {
  color: var(--serk-theme-text-muted) !important;
}
.serk-top-bar a:hover {
  color: var(--serk-theme-text) !important;
}
.serk-main-nav {
  background-color: var(--serk-theme-bg) !important;
  border-bottom: 1px solid var(--serk-theme-border) !important;
}
.serk-nav-link {
  color: var(--serk-theme-text) !important;
}
.serk-nav-link:hover, .serk-nav-link.active {
  color: var(--serk-theme-accent) !important;
}
.serk-nav-link.active::after {
  background-color: var(--serk-theme-accent) !important;
}
.serk-sub-menu {
  background-color: var(--serk-theme-card-bg) !important;
  border: 1px solid var(--serk-theme-border) !important;
}
.serk-sub-menu a {
  color: var(--serk-theme-text) !important;
}
.serk-sub-menu a:hover {
  background-color: rgba(227, 171, 114, 0.12) !important;
  color: var(--serk-theme-accent) !important;
}
.serk-mobile-menu-toggle {
  border-color: var(--serk-theme-border) !important;
}
.serk-hamburger-bar {
  background-color: var(--serk-theme-text) !important;
}
.serk-mobile-drawer {
  background-color: var(--serk-theme-card-bg) !important;
  border-bottom: 1px solid var(--serk-theme-border) !important;
}
.serk-mobile-drawer a {
  color: var(--serk-theme-text) !important;
}

/* Headings & Excerpts in Dark Theme */
.elementor:not(.elementor-1175) .elementor-heading-title,
.elementor:not(.elementor-1175) h1,
.elementor:not(.elementor-1175) h2,
.elementor:not(.elementor-1175) h3,
.elementor:not(.elementor-1175) h4:not(.serk-footer-heading),
.elementor:not(.elementor-1175) h5,
.elementor:not(.elementor-1175) h6,
.wpr-grid-item-title a {
  color: var(--serk-theme-text) !important;
}

.elementor:not(.elementor-1175) p:not(.serk-footer-address):not(.serk-copyright-left),
.elementor-widget-text-editor,
.elementor-icon-box-description,
.wpr-grid-item-excerpt p {
  color: var(--serk-theme-text-muted) !important;
}

/* Cards & Surfaces in Dark Theme */
div[style*="background: #FFFFFF"],
div[style*="background:#FFFFFF"],
div[style*="background: #ffffff"],
div[style*="background:#ffffff"],
.wpr-grid-item-inner {
  background-color: var(--serk-theme-card-bg) !important;
  border-color: var(--serk-theme-border) !important;
}
div[style*="border: 1px solid #DEE6E0"] {
  border-color: var(--serk-theme-border) !important;
}
.serk-cat-pill {
  background-color: var(--serk-theme-card-bg) !important;
  color: var(--serk-theme-text) !important;
  border-color: var(--serk-theme-border) !important;
}
`
    : `/* ========================================================
   LIGHT THEME CONTRAST HARMONIZATION
   ======================================================== */
.serk-top-bar {
  background-color: var(--serk-theme-card-bg, #F4F7F5) !important;
  border-bottom: 1px solid var(--serk-theme-border, #DEE6E0) !important;
}
.serk-top-bar a, .serk-top-bar .serk-sep, .serk-top-bar .serk-contact-link {
  color: var(--serk-theme-text-muted, #5B6761) !important;
}
.serk-top-bar a:hover {
  color: var(--serk-theme-text, #101513) !important;
}
.serk-main-nav {
  background-color: var(--serk-theme-bg, #FFFFFF) !important;
  border-bottom: 1px solid var(--serk-theme-border, #DEE6E0) !important;
}
.serk-nav-link {
  color: var(--serk-theme-text, #101513) !important;
}
.serk-nav-link:hover, .serk-nav-link.active {
  color: var(--serk-theme-primary, #0D4634) !important;
}
.serk-nav-link.active::after {
  background-color: var(--serk-theme-primary, #0D4634) !important;
}

/* Light Theme Headings & Text */
.elementor:not(.elementor-1175):not(.serk-dark-sec):not(.elementor-element-8ebc8a5) .elementor-heading-title,
.elementor:not(.elementor-1175):not(.serk-dark-sec):not(.elementor-element-8ebc8a5) h1,
.elementor:not(.elementor-1175):not(.serk-dark-sec):not(.elementor-element-8ebc8a5) h2,
.elementor:not(.elementor-1175):not(.serk-dark-sec):not(.elementor-element-8ebc8a5) h3,
.elementor:not(.elementor-1175):not(.serk-dark-sec):not(.elementor-element-8ebc8a5) h4:not(.serk-footer-heading),
.wpr-grid-item-title a {
  color: var(--serk-theme-text, #101513) !important;
}

.elementor:not(.elementor-1175):not(.serk-dark-sec):not(.elementor-element-8ebc8a5) p:not(.serk-footer-address):not(.serk-copyright-left),
.wpr-grid-item-excerpt p {
  color: var(--serk-theme-text-muted, #5B6761) !important;
}
`
}

/* ========================================================
   DEDICATED DARK SECTIONS (Permanently Dark on ALL themes)
   ======================================================== */
.serk-dark-sec,
.elementor-element-8ebc8a5,
.elementor-element-ec224c7,
.elementor-element-c49bbe5 {
  background-color: #101513 !important;
  background: #101513 !important;
}
.serk-dark-sec h1, .serk-dark-sec h2, .serk-dark-sec h3, .serk-dark-sec h4,
.elementor-element-8ebc8a5 h2,
.elementor-element-8ebc8a5 .elementor-heading-title,
.elementor-element-ec224c7 .elementor-heading-title,
.elementor-element-c49bbe5 .elementor-heading-title {
  color: #FFFFFF !important;
}
.serk-dark-sec p,
.elementor-element-8ebc8a5 p,
.elementor-element-ec224c7 p,
.elementor-element-c49bbe5 p,
[data-id="2055672"] p,
[data-id="3e5f206"] p {
  color: #DEE6E0 !important;
}

/* ========================================================
   ORIGINAL ENTERPRISE FOOTER (Strict Protection: Always Dark #101513 / #000000)
   ======================================================== */
.elementor-1175,
div[data-elementor-id="1175"],
.elementor-element-5b611c4,
section[data-id="5b611c4"],
.serk-global-footer {
  background-color: #101513 !important;
  background: #101513 !important;
  color: #DEE6E0 !important;
}

.elementor-element-e959569,
section[data-id="e959569"],
.serk-footer-bottom {
  background-color: #000000 !important;
  background: #000000 !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
}

/* Footer Headings */
.elementor-1175 h4,
.elementor-1175 .serk-footer-heading,
.elementor-element-5b611c4 h4,
.elementor-element-5b611c4 .elementor-heading-title,
.serk-global-footer h4 {
  color: #FFFFFF !important;
  font-family: var(--serk-font-sans, 'Poppins', sans-serif) !important;
}

.elementor-1175 .serk-footer-heading-visitus,
.elementor-element-5b611c4 .serk-footer-heading-visitus {
  color: #E3AB72 !important;
}

/* Footer Body Copy */
.elementor-1175 .serk-footer-address,
.elementor-element-5b611c4 .serk-footer-address,
.elementor-1175 p,
.elementor-element-5b611c4 p {
  color: #9AB4A9 !important;
}

/* Footer Links */
.elementor-1175 .serk-footer-link,
.elementor-element-5b611c4 .serk-footer-link,
.elementor-1175 a:not(.serk-footer-social-btn),
.elementor-element-5b611c4 a:not(.serk-footer-social-btn) {
  color: #CDE5DC !important;
  text-decoration: none !important;
}
.elementor-1175 .serk-footer-link:hover,
.elementor-element-5b611c4 .serk-footer-link:hover,
.elementor-1175 a:not(.serk-footer-social-btn):hover,
.elementor-element-5b611c4 a:not(.serk-footer-social-btn):hover {
  color: #FFFFFF !important;
}

/* Footer Social Icon */
.serk-footer-social-btn {
  background-color: rgba(227, 171, 114, 0.08) !important;
  border: 1px solid #E3AB72 !important;
  color: #E3AB72 !important;
}
.serk-footer-social-btn:hover {
  background-color: #E3AB72 !important;
  color: #101513 !important;
}

/* Copyright Bar Items */
.serk-copyright-left,
.elementor-element-e959569 p {
  color: #9AB4A9 !important;
}
.serk-copyright-tagline {
  color: #E3AB72 !important;
}
.serk-copyright-link,
.elementor-element-e959569 a {
  color: #7D978C !important;
}
.serk-copyright-link:hover,
.elementor-element-e959569 a:hover {
  color: #FFFFFF !important;
}
.serk-copyright-sep {
  color: rgba(255, 255, 255, 0.2) !important;
}
`;
}

export function syncThemeToHtml(theme: ThemeConfig): boolean {
  try {
    if (!theme) return false;

    const css = generateThemeCss(theme);

    // Write CSS files
    const tokenCssPaths = [
      path.join(process.cwd(), 'public', 'wp-content', 'themes', 'royal-elementor-kit', 'serk-theme-tokens.css'),
      path.join(process.cwd(), 'site', 'wp-content', 'themes', 'royal-elementor-kit', 'serk-theme-tokens.css'),
    ];

    for (const cssPath of tokenCssPaths) {
      const dir = path.dirname(cssPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(cssPath, css, 'utf-8');
    }

    // Ensure link and script are injected in all HTML files
    const htmlDirs = [
      path.join(process.cwd(), 'public'),
      path.join(process.cwd(), 'site'),
    ];

    function getAllHtmlFiles(dir: string): string[] {
      let results: string[] = [];
      if (!fs.existsSync(dir)) return results;
      const list = fs.readdirSync(dir);
      for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          results = results.concat(getAllHtmlFiles(fullPath));
        } else if (file.endsWith('.html')) {
          results.push(fullPath);
        }
      }
      return results;
    }

    const allHtml = [...getAllHtmlFiles(htmlDirs[0]), ...getAllHtmlFiles(htmlDirs[1])];

    const linkTag = '<link rel="stylesheet" id="serk-theme-tokens-css" href="/wp-content/themes/royal-elementor-kit/serk-theme-tokens.css">';
    const scriptTag = '<script src="/wp-content/themes/royal-elementor-kit/serk-theme-sync.js"></script>';

    for (const filePath of allHtml) {
      let html = fs.readFileSync(filePath, 'utf-8');
      let changed = false;

      if (!html.includes('serk-theme-tokens.css')) {
        if (html.includes('</head>')) {
          html = html.replace('</head>', `\t${linkTag}\n</head>`);
          changed = true;
        }
      }

      if (!html.includes('serk-theme-sync.js')) {
        if (html.includes('</head>')) {
          html = html.replace('</head>', `\t${scriptTag}\n</head>`);
          changed = true;
        } else if (html.includes('</body>')) {
          html = html.replace('</body>', `\t${scriptTag}\n</body>`);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(filePath, html, 'utf-8');
      }
    }

    return true;
  } catch (err) {
    console.error('Error syncing theme to HTML:', err);
    return false;
  }
}
