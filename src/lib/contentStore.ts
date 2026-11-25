import fs from 'fs';
import path from 'path';
import { prisma } from './prisma';
import { ALL_PROJECTS } from './constants';
import {
  ProjectItem,
  PartnerItem,
  ServiceItem,
  IndustryItem,
  InsightItem,
  BrandingConfig,
} from './types';
import { SiteContent, DEFAULT_SITE_CONTENT } from './siteContentDefaults';
import { syncProjectsToHtml, syncSiteContentToHtml } from './htmlSync';

export { DEFAULT_SITE_CONTENT };
export type { SiteContent };

const DATA_DIR = path.join(process.cwd(), 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const CONTENT_FILE = path.join(DATA_DIR, 'site-content.json');

// Helper: deep merge stored content with default content to ensure missing keys never crash
function mergeWithDefaults(parsed: any): SiteContent {
  return {
    ...DEFAULT_SITE_CONTENT,
    ...parsed,
    branding: {
      ...DEFAULT_SITE_CONTENT.branding,
      ...(parsed.branding || {}),
    },
    siteInfo: {
      ...DEFAULT_SITE_CONTENT.siteInfo,
      ...(parsed.siteInfo || {}),
    },
    header: {
      ...DEFAULT_SITE_CONTENT.header,
      ...(parsed.header || {}),
    },
    footer: {
      ...DEFAULT_SITE_CONTENT.footer,
      ...(parsed.footer || {}),
    },
    categories: {
      ...DEFAULT_SITE_CONTENT.categories,
      ...(parsed.categories || {}),
    },
    pages: {
      ...DEFAULT_SITE_CONTENT.pages,
      ...(parsed.pages || {}),
      home: { ...DEFAULT_SITE_CONTENT.pages.home, ...(parsed.pages?.home || {}) },
      about: { ...DEFAULT_SITE_CONTENT.pages.about, ...(parsed.pages?.about || {}) },
      products: { ...DEFAULT_SITE_CONTENT.pages.products, ...(parsed.pages?.products || {}) },
      services: { ...DEFAULT_SITE_CONTENT.pages.services, ...(parsed.pages?.services || {}) },
      ventures: { ...DEFAULT_SITE_CONTENT.pages.ventures, ...(parsed.pages?.ventures || {}) },
      industries: { ...DEFAULT_SITE_CONTENT.pages.industries, ...(parsed.pages?.industries || {}) },
      partners: { ...DEFAULT_SITE_CONTENT.pages.partners, ...(parsed.pages?.partners || {}) },
      insights: { ...DEFAULT_SITE_CONTENT.pages.insights, ...(parsed.pages?.insights || {}) },
      contact: { ...DEFAULT_SITE_CONTENT.pages.contact, ...(parsed.pages?.contact || {}) },
    },
    partners: Array.isArray(parsed.partners) && parsed.partners.length > 0 ? parsed.partners : DEFAULT_SITE_CONTENT.partners,
    servicesList: Array.isArray(parsed.servicesList) && parsed.servicesList.length > 0 ? parsed.servicesList : DEFAULT_SITE_CONTENT.servicesList,
    industriesList: Array.isArray(parsed.industriesList) && parsed.industriesList.length > 0 ? parsed.industriesList : DEFAULT_SITE_CONTENT.industriesList,
    insightsList: Array.isArray(parsed.insightsList) && parsed.insightsList.length > 0 ? parsed.insightsList : DEFAULT_SITE_CONTENT.insightsList,
  };
}

// Read site content from PostgreSQL with local JSON fallback
export async function getStoredSiteContent(): Promise<SiteContent> {
  // 1. Try reading from PostgreSQL SiteSetting
  try {
    const record = await prisma.siteSetting.findUnique({
      where: { key: 'site-content' },
    });
    if (record && record.value) {
      const parsed = JSON.parse(record.value);
      return mergeWithDefaults(parsed);
    }
  } catch (err) {
    // DB not reachable, fall back
  }

  // 2. Fall back to local file
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
      return mergeWithDefaults(JSON.parse(raw));
    }
  } catch (err) {
    console.error('Error reading site content:', err);
  }

  return DEFAULT_SITE_CONTENT;
}

// Synchronous wrapper for existing callers
export function getSiteContent(): SiteContent {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
      return mergeWithDefaults(JSON.parse(raw));
    }
  } catch (err) { }
  return DEFAULT_SITE_CONTENT;
}

// Save site content to PostgreSQL and local JSON + sync HTML
export async function saveStoredSiteContent(content: Partial<SiteContent>): Promise<SiteContent> {
  const current = await getStoredSiteContent();
  const merged: SiteContent = {
    ...current,
    ...content,
    branding: { ...current.branding, ...(content.branding || {}) },
    siteInfo: { ...current.siteInfo, ...(content.siteInfo || {}) },
    header: { ...current.header, ...(content.header || {}) },
    footer: { ...current.footer, ...(content.footer || {}) },
    categories: { ...current.categories, ...(content.categories || {}) },
    pages: {
      ...current.pages,
      ...(content.pages || {}),
      home: { ...current.pages.home, ...(content.pages?.home || {}) },
      about: { ...current.pages.about, ...(content.pages?.about || {}) },
      products: { ...current.pages.products, ...(content.pages?.products || {}) },
      services: { ...current.pages.services, ...(content.pages?.services || {}) },
      ventures: { ...current.pages.ventures, ...(content.pages?.ventures || {}) },
      industries: { ...current.pages.industries, ...(content.pages?.industries || {}) },
      partners: { ...current.pages.partners, ...(content.pages?.partners || {}) },
      insights: { ...current.pages.insights, ...(content.pages?.insights || {}) },
      contact: { ...current.pages.contact, ...(content.pages?.contact || {}) },
    },
    partners: content.partners ? content.partners : current.partners,
    servicesList: content.servicesList ? content.servicesList : current.servicesList,
    industriesList: content.industriesList ? content.industriesList : current.industriesList,
    insightsList: content.insightsList ? content.insightsList : current.insightsList,
  };

  const serialized = JSON.stringify(merged, null, 2);

  // 1. Save to PostgreSQL SiteSetting
  try {
    await prisma.siteSetting.upsert({
      where: { key: 'site-content' },
      update: { value: serialized },
      create: { key: 'site-content', value: serialized },
    });
  } catch (err) {
    console.warn('Could not save to PostgreSQL siteSetting:', err);
  }

  // 2. Save to local JSON file
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CONTENT_FILE, serialized, 'utf-8');
  } catch (err) {
    console.error('Error writing content file:', err);
  }

  // 3. Sync to HTML files
  try {
    syncSiteContentToHtml(merged);
  } catch (err) {
    console.error('Error in syncSiteContentToHtml:', err);
  }

  return merged;
}

// Backward compatible sync save wrapper
export function saveSiteContent(content: Partial<SiteContent>): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const current = getSiteContent();
    const merged = { ...current, ...content };
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(merged, null, 2), 'utf-8');
    syncSiteContentToHtml(merged);

    // Fire async DB save
    prisma.siteSetting
      .upsert({
        where: { key: 'site-content' },
        update: { value: JSON.stringify(merged) },
        create: { key: 'site-content', value: JSON.stringify(merged) },
      })
      .catch(() => { });

    return true;
  } catch (err) {
    console.error('Error writing site content:', err);
    return false;
  }
}

// Get all projects with PostgreSQL canonical persistence and initial seed
export async function getStoredProjects(): Promise<ProjectItem[]> {
  try {
    let initSetting: any = null;
    try {
      initSetting = await prisma.siteSetting.findUnique({
        where: { key: 'db_projects_initialized' },
      });
    } catch (e) { }

    if (initSetting) {
      // PostgreSQL is canonical: whatever is in DB is the truth (deleted stays deleted!)
      const dbProjects = await prisma.project.findMany({
        orderBy: { sortOrder: 'asc' },
      });
      return dbProjects as unknown as ProjectItem[];
    }

    // If not marked initialized, check if projects already exist in DB
    const existingCount = await prisma.project.count();
    if (existingCount > 0) {
      try {
        await prisma.siteSetting.upsert({
          where: { key: 'db_projects_initialized' },
          update: { value: 'true' },
          create: { key: 'db_projects_initialized', value: 'true' },
        });
      } catch (e) { }

      const dbProjects = await prisma.project.findMany({
        orderBy: { sortOrder: 'asc' },
      });
      return dbProjects as unknown as ProjectItem[];
    }

    // First run on clean database: seed all 23 projects into PostgreSQL once
    for (const p of ALL_PROJECTS) {
      await prisma.project.upsert({
        where: { slug: p.slug },
        update: {},
        create: p,
      });
    }

    try {
      await prisma.siteSetting.upsert({
        where: { key: 'db_projects_initialized' },
        update: { value: 'true' },
        create: { key: 'db_projects_initialized', value: 'true' },
      });
    } catch (e) { }

    const seeded = await prisma.project.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return seeded as unknown as ProjectItem[];
  } catch (err) {
    console.warn('Database error in getStoredProjects, falling back to local file/constants:', err);
  }

  // Fallback to local JSON or constants
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const raw = fs.readFileSync(PROJECTS_FILE, 'utf-8');
      const projects: ProjectItem[] = JSON.parse(raw);
      if (Array.isArray(projects) && projects.length > 0) {
        return projects;
      }
    }
  } catch (err) {
    console.error('Error reading projects.json:', err);
  }

  return ALL_PROJECTS.map((p, i) => ({
    ...p,
    id: `proj-${String(i + 1).padStart(2, '0')}`,
  })) as ProjectItem[];
}

// Save projects to PostgreSQL and sync to HTML
export async function saveStoredProjects(projects: ProjectItem[]): Promise<ProjectItem[]> {
  try {
    const existing = await prisma.project.findMany({ select: { id: true } });
    const existingIds = new Set(existing.map((e) => e.id));
    const newIds = new Set(projects.map((p) => p.id));

    // Delete projects removed by admin
    const toDelete = Array.from(existingIds).filter((id) => !newIds.has(id));
    if (toDelete.length > 0) {
      await prisma.project.deleteMany({
        where: { id: { in: toDelete } },
      });
    }

    // Upsert each project
    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];
      await prisma.project.upsert({
        where: { id: p.id },
        update: {
          slug: p.slug,
          name: p.name,
          category: p.category,
          maturity: p.maturity,
          summary: p.summary,
          description: p.description,
          audience: p.audience,
          capabilities: p.capabilities,
          imageUrl: p.imageUrl,
          imageFit: p.imageFit || 'contain',
          publicCta: p.publicCta,
          ctaUrl: p.ctaUrl,
          isPublished: p.isPublished,
          sortOrder: p.sortOrder !== undefined ? p.sortOrder : i,
        },
        create: {
          id: p.id,
          slug: p.slug,
          name: p.name,
          category: p.category,
          maturity: p.maturity,
          summary: p.summary,
          description: p.description,
          audience: p.audience,
          capabilities: p.capabilities,
          imageUrl: p.imageUrl,
          imageFit: p.imageFit || 'contain',
          publicCta: p.publicCta,
          ctaUrl: p.ctaUrl,
          isPublished: p.isPublished,
          sortOrder: p.sortOrder !== undefined ? p.sortOrder : i,
        },
      });
    }

    // Ensure database marked as initialized
    await prisma.siteSetting.upsert({
      where: { key: 'db_projects_initialized' },
      update: { value: 'true' },
      create: { key: 'db_projects_initialized', value: 'true' },
    });
  } catch (err) {
    console.warn('Could not save projects to PostgreSQL:', err);
  }

  // Backup to local file
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving projects file:', err);
  }

  // Sync to HTML files
  try {
    syncProjectsToHtml(projects);
  } catch (err) {
    console.error('Error syncing projects to HTML:', err);
  }

  return projects;
}

// Save a single project (create or update)
export async function saveStoredProject(project: Partial<ProjectItem>): Promise<ProjectItem> {
  const all = await getStoredProjects();
  let updatedList: ProjectItem[];

  const existingIdx = all.findIndex(
    (p) =>
      (project.id && p.id === project.id) ||
      (project.slug && p.slug === project.slug)
  );

  let finalProject: ProjectItem;

  if (existingIdx >= 0) {
    finalProject = { ...all[existingIdx], ...project } as ProjectItem;
    updatedList = [...all];
    updatedList[existingIdx] = finalProject;
  } else {
    finalProject = {
      id: project.id || `proj-${Date.now()}`,
      slug: project.slug || `project-${Date.now()}`,
      name: project.name || 'New Project',
      category: project.category || 'sector-intelligence',
      maturity: project.maturity || 'INTERNAL_ALPHA',
      summary: project.summary || '',
      description: project.description || '',
      audience: project.audience || '',
      capabilities: project.capabilities || '',
      plannedCapabilities: project.plannedCapabilities || '',
      imageUrl: project.imageUrl || '/images/serk-photo-engineering.jpg',
      imageFit: project.imageFit || 'contain',
      publicCta: project.publicCta || 'Learn More',
      ctaUrl: project.ctaUrl || `/products/${project.slug}/`,
      isPublished: project.isPublished !== false,
      sortOrder: project.sortOrder !== undefined ? project.sortOrder : all.length,
    };
    updatedList = [...all, finalProject];
  }

  await saveStoredProjects(updatedList);
  return finalProject;
}

// Delete a single project by ID or slug
export async function deleteStoredProject(id: string): Promise<boolean> {
  const all = await getStoredProjects();
  const filtered = all.filter((p) => p.id !== id && p.slug !== id);
  if (filtered.length !== all.length) {
    await saveStoredProjects(filtered);
  }
  return true;
}
