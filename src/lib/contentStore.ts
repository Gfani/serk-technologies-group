import fs from 'fs';
import path from 'path';
import { prisma } from './prisma';
import { ALL_PROJECTS } from './constants';
import { ProjectItem } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const CONTENT_FILE = path.join(DATA_DIR, 'site-content.json');

export interface SiteContent {
  siteInfo: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    address: string;
    jurisdiction: string;
    workingHours: string;
    linkedinUrl: string;
    telegramUrl: string;
  };
  header: {
    tagline: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  footer: {
    visitUsHeading: string;
    addressLine1: string;
    addressLine2: string;
    copyrightText: string;
    tagline: string;
  };
  categories: Record<
    string,
    {
      title: string;
      subtitle: string;
      description: string;
      badge: string;
    }
  >;
  pages: {
    home: {
      heroTitle: string;
      heroSubtitle: string;
      heroCtaLabel: string;
      heroCtaUrl: string;
      whySerkHeading: string;
      whySerkSubtitle: string;
      statsOneValue: string;
      statsOneLabel: string;
      statsTwoValue: string;
      statsTwoLabel: string;
      statsThreeValue: string;
      statsThreeLabel: string;
    };
    about: {
      title: string;
      subtitle: string;
      mission: string;
      vision: string;
    };
    products: {
      title: string;
      subtitle: string;
    };
    services: {
      title: string;
      subtitle: string;
    };
    ventures: {
      title: string;
      subtitle: string;
    };
    contact: {
      title: string;
      subtitle: string;
      officeAddress: string;
      email: string;
      phone: string;
    };
  };
}

// Read site content
export function getSiteContent(): SiteContent {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading site content:', err);
  }
  return {
    siteInfo: {
      name: 'SERK Technologies Group',
      tagline: 'Innovation with Integrity',
      email: 'serktechgroup@gmail.com',
      phone: '+251 999 911 192',
      address: 'Mekelle, Tigray, Ethiopia',
      jurisdiction: 'Enterprise Technology & Systems',
      workingHours: 'Mon - Sat: 8:30 AM - 6:00 PM (EAT)',
      linkedinUrl: 'https://linkedin.com',
      telegramUrl: 'https://t.me/serktech',
    },
    header: {
      tagline: 'Deep Tech & Enterprise Systems',
      ctaLabel: 'Discuss Your Project',
      ctaUrl: '/contact_us/',
    },
    footer: {
      visitUsHeading: 'VISIT US',
      addressLine1: 'Mekelle, Tigray, Ethiopia',
      addressLine2: 'Enterprise Technology & Systems',
      copyrightText: 'Copyright © 2026 SERK Technologies Group. All rights reserved.',
      tagline: 'Innovation with Integrity',
    },
    categories: {},
    pages: {
      home: {
        heroTitle: 'We Engineer the Systems Behind Better Business.',
        heroSubtitle: 'From your first website to intelligent enterprise operations...',
        heroCtaLabel: 'Discuss Your Project',
        heroCtaUrl: '/contact_us/',
        whySerkHeading: 'Why Choose Serk Group?',
        whySerkSubtitle: 'At Serk, we pair real industry know-how with practical AI.',
        statsOneValue: '23+',
        statsOneLabel: 'Software Systems & Platforms',
        statsTwoValue: '4',
        statsTwoLabel: 'Key Industry Sectors',
        statsThreeValue: '100%',
        statsThreeLabel: 'Sovereign Engineering Ownership',
      },
      about: { title: '', subtitle: '', mission: '', vision: '' },
      products: { title: '', subtitle: '' },
      services: { title: '', subtitle: '' },
      ventures: { title: '', subtitle: '' },
      contact: { title: '', subtitle: '', officeAddress: '', email: '', phone: '' },
    },
  };
}

// Save site content
export function saveSiteContent(content: Partial<SiteContent>): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const current = getSiteContent();
    const merged = { ...current, ...content };
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(merged, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing site content:', err);
    return false;
  }
}

// Get all projects with local fallback
export async function getStoredProjects(): Promise<ProjectItem[]> {
  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    if (dbProjects && dbProjects.length > 0) {
      return dbProjects as unknown as ProjectItem[];
    }
  } catch (err) {
    // DB not reachable, proceed to local JSON store
  }

  if (fs.existsSync(PROJECTS_FILE)) {
    try {
      const raw = fs.readFileSync(PROJECTS_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      // fallback
    }
  }

  return ALL_PROJECTS.map((p, i) => ({ ...p, id: `proj-${String(i + 1).padStart(2, '0')}` })) as ProjectItem[];
}

// Save projects
export async function saveStoredProject(project: ProjectItem): Promise<ProjectItem> {
  let dbResult: ProjectItem | null = null;
  // 1. Try saving to Prisma if DB is up
  try {
    if (project.id && !project.id.startsWith('proj-')) {
      const updated = await prisma.project.update({
        where: { id: project.id },
        data: {
          slug: project.slug,
          name: project.name,
          category: project.category,
          maturity: project.maturity,
          summary: project.summary,
          description: project.description,
          audience: project.audience,
          capabilities: project.capabilities,
          plannedCapabilities: project.plannedCapabilities,
          imageUrl: project.imageUrl,
          publicCta: project.publicCta,
          ctaUrl: project.ctaUrl,
          isPublished: project.isPublished,
          sortOrder: project.sortOrder,
        },
      });
      dbResult = updated as unknown as ProjectItem;
    } else {
      const created = await prisma.project.create({
        data: {
          slug: project.slug,
          name: project.name,
          category: project.category,
          maturity: project.maturity,
          summary: project.summary,
          description: project.description || '',
          audience: project.audience,
          capabilities: project.capabilities,
          plannedCapabilities: project.plannedCapabilities,
          imageUrl: project.imageUrl,
          publicCta: project.publicCta,
          ctaUrl: project.ctaUrl,
          isPublished: project.isPublished !== undefined ? project.isPublished : true,
          sortOrder: project.sortOrder || 99,
        },
      });
      dbResult = created as unknown as ProjectItem;
    }
  } catch (err) {
    // DB fallback
  }

  // 2. Persist to local JSON file
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  let projectsList: ProjectItem[] = [];
  if (fs.existsSync(PROJECTS_FILE)) {
    try {
      projectsList = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf-8'));
    } catch (e) {
      projectsList = [];
    }
  }

  const existingIdx = projectsList.findIndex(
    (p) => (project.id && p.id === project.id) || p.slug === project.slug
  );

  const finalProject: ProjectItem = {
    ...project,
    id: dbResult?.id || project.id || `proj-${projectsList.length + 1}`,
  };

  if (existingIdx >= 0) {
    projectsList[existingIdx] = finalProject;
  } else {
    projectsList.push(finalProject);
  }

  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projectsList, null, 2), 'utf-8');
  return finalProject;
}

// Delete project
export async function deleteStoredProject(id: string): Promise<boolean> {
  try {
    await prisma.project.delete({ where: { id } });
  } catch (err) {
    // DB fallback
  }

  if (fs.existsSync(PROJECTS_FILE)) {
    try {
      const list: ProjectItem[] = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf-8'));
      const filtered = list.filter((p) => p.id !== id && p.slug !== id);
      fs.writeFileSync(PROJECTS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
      return true;
    } catch (e) {
      return false;
    }
  }
  return true;
}

