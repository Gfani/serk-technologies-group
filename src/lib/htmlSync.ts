import fs from 'fs';
import path from 'path';
import { ProjectItem } from './types';

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
