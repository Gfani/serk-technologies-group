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

    const allHtml = [...getAllHtmlFiles(htmlDirs[0]), ...getAllHtmlFiles(htmlDirs[1])];

    const phone = content.siteInfo?.phone;
    const email = content.siteInfo?.email;
    const heroTitle = content.pages?.home?.heroTitle;
    const heroSubtitle = content.pages?.home?.heroSubtitle;
    const headerLogoUrl = content.branding?.headerLogoUrl;
    const footerMarkUrl = content.branding?.footerMarkUrl;
    const brandAlt = content.branding?.brandAltText || content.branding?.companyName || 'SERK Technologies Group';

    for (const filePath of allHtml) {
      let html = fs.readFileSync(filePath, 'utf-8');
      let changed = false;

      // 1. Sync Header Logo across all pages
      if (headerLogoUrl) {
        // Pattern 1: class="serk-header-logo"
        if (html.includes('class="serk-header-logo"')) {
          const updated = html.replace(
            /<img[^>]*class="serk-header-logo"[^>]*>/i,
            `<img src="${headerLogoUrl}" alt="${brandAlt}" class="serk-header-logo" width="200" height="38" style="height:38px;max-height:38px;width:auto;max-width:220px;display:block;object-fit:contain;">`
          );
          if (updated !== html) {
            html = updated;
            changed = true;
          }
        } else if (html.includes('serk-logo-wide.png')) {
          const updated = html.replace(
            /\/wp-content\/uploads\/serk\/serk-logo-wide\.png[^\"]*/g,
            headerLogoUrl
          );
          if (updated !== html) {
            html = updated;
            changed = true;
          }
        }
      }

      // 2. Sync Footer Mark across all pages
      if (footerMarkUrl) {
        if (html.includes('class="serk-footer-mark-img"')) {
          const updated = html.replace(
            /<img[^>]*class="serk-footer-mark-img"[^>]*>/i,
            `<img src="${footerMarkUrl}" alt="${brandAlt}" class="serk-footer-mark-img" width="160" height="30" style="height:30px;max-height:30px;width:auto;display:block;object-fit:contain;margin-bottom:16px;">`
          );
          if (updated !== html) {
            html = updated;
            changed = true;
          }
        } else if (html.includes('serk-logo-mark.png')) {
          const updated = html.replace(
            /\/wp-content\/uploads\/serk\/serk-logo-mark\.png[^\"]*/g,
            footerMarkUrl
          );
          if (updated !== html) {
            html = updated;
            changed = true;
          }
        }
      }

      // 3. Update Phone if present
      if (phone) {
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        const updatedPhone = html
          .replace(/href="tel:[^"]*"/g, `href="tel:${cleanPhone}"`)
          .replace(/\+251\s*\d{3}\s*\d{3}\s*\d{3}/g, phone);
        if (updatedPhone !== html) {
          html = updatedPhone;
          changed = true;
        }
      }

      // 4. Update Email if present
      if (email) {
        const updatedEmail = html
          .replace(/href="mailto:[^"]*"/g, `href="mailto:${email}"`)
          .replace(/[a-zA-Z0-9._%+-]+@gmail\.com/g, email);
        if (updatedEmail !== html) {
          html = updatedEmail;
          changed = true;
        }
      }

      // 5. Homepage Specific Updates
      const isHome =
        filePath.endsWith('public\\index.html') ||
        filePath.endsWith('public/index.html') ||
        filePath.endsWith('site\\index.html') ||
        filePath.endsWith('site/index.html');

      if (isHome) {
        if (heroTitle) {
          const updated = html.replace(
            /<h1 class="elementor-heading-title elementor-size-default">[^<]*<\/h1>/g,
            `<h1 class="elementor-heading-title elementor-size-default">${heroTitle}</h1>`
          );
          if (updated !== html) {
            html = updated;
            changed = true;
          }
        }
        if (heroSubtitle) {
          const updated = html.replace(
            /(<div class="elementor-widget-container"><p>)From your first website to intelligent enterprise operations[^<]*(<\/p><\/div>)/g,
            `$1${heroSubtitle}$2`
          );
          if (updated !== html) {
            html = updated;
            changed = true;
          }
        }
      }

      // 6. About Us Page Updates
      const isAbout = filePath.includes('about_us');
      if (isAbout && content.pages?.about) {
        const abt = content.pages.about;
        if (abt.title) {
          html = html.replace(
            /<h1 class="elementor-heading-title elementor-size-default">Innovation with Integrity\. Building Beyond Boundaries\.<\/h1>/g,
            `<h1 class="elementor-heading-title elementor-size-default">${abt.title}</h1>`
          );
          changed = true;
        }
        if (abt.storyParagraph1) {
          html = html.replace(
            /<div class="elementor-widget-container"><p>Serk Group is a software company building AI-integrated systems[^<]*<\/p><\/div>/g,
            `<div class="elementor-widget-container"><p>${abt.storyParagraph1}</p></div>`
          );
          changed = true;
        }
        if (abt.mission) {
          html = html.replace(
            /(<h2[^>]*>Our Mission<\/h2>[\s\S]*?<div class="elementor-widget-container"><p[^>]*>)([\s\S]*?)(<\/p><\/div>)/i,
            `$1${abt.mission}$3`
          );
          changed = true;
        }
        if (abt.vision) {
          html = html.replace(
            /(<h2[^>]*>Our Vision<\/h2>[\s\S]*?<div class="elementor-widget-container"><p[^>]*>)([\s\S]*?)(<\/p><\/div>)/i,
            `$1${abt.vision}$3`
          );
          changed = true;
        }
      }

      // 7. Contact Us Page Updates
      const isContact = filePath.includes('contact_us');
      if (isContact && content.pages?.contact) {
        const cnt = content.pages.contact;
        if (cnt.title) {
          html = html.replace(
            /<h1 class="elementor-heading-title elementor-size-default">Let’s Build Something That Works\.<\/h1>/g,
            `<h1 class="elementor-heading-title elementor-size-default">${cnt.title}</h1>`
          );
          changed = true;
        }
        if (cnt.officeAddress) {
          html = html.replace(
            /(<h3 class="elementor-icon-box-title">[\s\S]*?Office Location[\s\S]*?<\/h3>[\s\S]*?<p class="elementor-icon-box-description">)[^<]*(<\/p>)/i,
            `$1${cnt.officeAddress}$2`
          );
          changed = true;
        }
      }

      // 8. Partners Page Updates
      const isPartners = filePath.includes('partners');
      if (isPartners && Array.isArray(content.partners) && content.partners.length > 0) {
        const publishedPartners = content.partners.filter((p: any) => p.isPublished !== false);
        const partnerCardsHtml = publishedPartners.map((p: any) => {
          const logo = p.logoUrl || '/wp-content/uploads/serk/client-zoscales.png';
          const cat = p.category || 'PARTNER';
          const collab = p.collabText || 'Active Portfolio Collaboration • Verified Partner';
          const website = p.websiteUrl && p.websiteUrl !== '#'
            ? `<a href="${p.websiteUrl}" target="_blank" rel="noopener noreferrer" style="color: #0D4634; font-weight: 600; text-decoration: none;">Visit Website &rarr;</a>`
            : '';

          return `    <!-- Partner: ${p.name} -->
    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 12px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
        <div>
            <div style="text-align: center; padding: 20px; background: #F8FAFC; border-radius: 8px; margin-bottom: 16px; min-height: 80px; display: flex; align-items: center; justify-content: center;">
                <img src="${logo}" alt="${p.alt || p.name}" style="max-height: 44px; max-width: 100%; object-fit: contain;">
            </div>
            <div style="margin-bottom: 8px;"><span class="serk-badge serk-badge-production"><span>${cat}</span></span></div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #101513; margin: 0 0 8px 0;">${p.name}</h3>
            <p style="font-size: 0.9rem; color: #5B6761; line-height: 1.6; margin: 0;">${p.description}</p>
        </div>
        <div style="margin-top: 16px; font-size: 0.82rem; color: #101513; font-weight: 600; border-top: 1px solid #F1F5F9; padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
            <span>${collab}</span>
            ${website}
        </div>
    </div>`;
        }).join('\n\n');

        const gridTag = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 48px;">';
        const gridStart = html.indexOf(gridTag);
        if (gridStart !== -1) {
          const gridEnd = html.indexOf('</div>\n\n</div>', gridStart);
          const fallbackEnd = html.indexOf('</div>\n</div>', gridStart);
          const actualEnd = gridEnd !== -1 ? gridEnd : fallbackEnd;

          if (actualEnd !== -1) {
            html = html.substring(0, gridStart + gridTag.length) + '\n' + partnerCardsHtml + '\n' + html.substring(actualEnd);
            changed = true;
          }
        }
      }

      // 9. Industries Page Updates
      const isIndustries = filePath.includes('industries');
      if (isIndustries && Array.isArray(content.industriesList) && content.industriesList.length > 0) {
        const publishedIndustries = content.industriesList.filter((ind: any) => ind.isPublished !== false);
        const industryCardsHtml = publishedIndustries.map((ind: any) => {
          const bulletsHtml = Array.isArray(ind.bullets) && ind.bullets.length > 0
            ? `<ul style="color: #5B6761; font-size: 0.95rem; line-height: 1.7; padding-left: 20px; margin-bottom: 24px;">\n${ind.bullets.map((b: string) => `                <li>${b}</li>`).join('\n')}\n            </ul>`
            : '';
          const imgHtml = ind.imageUrl
            ? `<div style="height: 180px; overflow: hidden; border-radius: 6px; margin-bottom: 20px;"><img src="${ind.imageUrl}" alt="${ind.name}" style="width: 100%; height: 100%; object-fit: cover;"></div>`
            : '';

          return `    <!-- Industry: ${ind.name} -->
    <div style="background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            ${imgHtml}
            <span style="font-size: 0.8rem; font-weight: 700; color: #101513; text-transform: uppercase;">${ind.category}</span>
            <h3 style="font-size: 1.45rem; font-weight: 700; color: #101513; margin: 8px 0 12px 0;">${ind.name}</h3>
            <p style="font-size: 1rem; color: #5B6761; line-height: 1.6; margin-bottom: 16px;">${ind.description}</p>
            ${bulletsHtml}
        </div>
        <div>
            <a href="${ind.ctaUrl || '/contact_us/'}" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">${ind.ctaLabel || 'Discuss Your Project'}</a>
        </div>
    </div>`;
        }).join('\n\n');

        const indGridTag = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;">';
        const indGridStart = html.indexOf(indGridTag);
        if (indGridStart !== -1) {
          const mainClose = html.indexOf('</div>\n    </div>\n</main>', indGridStart);
          const fallbackClose = html.indexOf('</div>\n</div>\n</main>', indGridStart);
          const actualClose = mainClose !== -1 ? mainClose : fallbackClose;
          if (actualClose !== -1) {
            html = html.substring(0, indGridStart + indGridTag.length) + '\n' + industryCardsHtml + '\n    ' + html.substring(actualClose);
            changed = true;
          }
        }
      }

      // 10. Services Page Updates
      const isServices = filePath.includes('services');
      if (isServices && content.pages?.services) {
        if (content.pages.services.title) {
          html = html.replace(
            /<h1 class="elementor-heading-title elementor-size-default">Technology for Every Stage of Your Business<\/h1>/g,
            `<h1 class="elementor-heading-title elementor-size-default">${content.pages.services.title}</h1>`
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
.elementor-heading-title, h1, h2, h3, h4, h5, h6 {
  color: var(--serk-theme-text) !important;
}
p, span, li {
  color: var(--serk-theme-text-muted) !important;
}
.wpr-advanced-text-preffix, .wpr-anim-text-inner {
  color: var(--serk-theme-text) !important;
}
.serk-cat-pill {
  background: var(--serk-theme-card-bg) !important;
  border-color: var(--serk-theme-border) !important;
  color: var(--serk-theme-text-muted) !important;
}
div[style*="background: #FFFFFF"], div[style*="background:#FFFFFF"], div[style*="background: #ffffff"] {
  background-color: var(--serk-theme-card-bg) !important;
  border-color: var(--serk-theme-border) !important;
}
main[style*="background: #FCFCFE"] {
  background-color: var(--serk-theme-bg) !important;
}
`
    : `/* ========================================================
   LIGHT THEME CONTRAST HARMONIZATION
   ======================================================== */
.serk-top-bar {
  background-color: #FFFFFF !important;
  border-bottom: 1px solid var(--serk-theme-border) !important;
}
.serk-top-bar a, .serk-top-bar .serk-sep, .serk-top-bar .serk-contact-link {
  color: var(--serk-theme-text-muted) !important;
}
.serk-top-bar a:hover {
  color: var(--serk-theme-primary) !important;
}
.serk-main-nav {
  background-color: #FFFFFF !important;
  border-bottom: 1px solid var(--serk-theme-border) !important;
}
.serk-nav-link {
  color: var(--serk-theme-text) !important;
}
.serk-nav-link:hover, .serk-nav-link.active {
  color: var(--serk-theme-primary) !important;
}
.elementor-heading-title, h1, h2, h3, h4, h5, h6 {
  color: var(--serk-theme-text) !important;
}
p, span:not(.serk-badge *), li {
  color: var(--serk-theme-text-muted) !important;
}
`
}

/* ========================================================
   STRICT PERMANENT ENTERPRISE DARK FOOTER PROTECTION
   Under NO circumstances may any theme alter the dark footer
   ======================================================== */
.elementor-element-5b611c4,
[data-id="5b611c4"],
.elementor-element-e959569,
[data-id="e959569"],
.serk-dark-sec,
[data-serk-keep-dark],
.elementor-element-8ebc8a5,
.elementor-location-footer,
.serk-footer-bottom,
.elementor-element-ec224c7,
.elementor-element-c49bbe5,
.serk-footer-col,
.serk-footer-col * {
  /* Footer elements remain permanently dark enterprise styling */
}
`;
}

export function syncThemeToHtml(theme: ThemeConfig): boolean {
  try {
    if (!theme) return false;
    const css = generateThemeCss(theme);

    const tokenCssPaths = [
      path.join(process.cwd(), 'public', 'wp-content', 'themes', 'royal-elementor-kit', 'serk-theme-tokens.css'),
      path.join(process.cwd(), 'site', 'wp-content', 'themes', 'royal-elementor-kit', 'serk-theme-tokens.css'),
    ];

    for (const cssPath of tokenCssPaths) {
      const dir = path.dirname(cssPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(cssPath, css, 'utf-8');
    }

    const htmlDirs = [
      path.join(process.cwd(), 'public'),
      path.join(process.cwd(), 'site'),
    ];

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

