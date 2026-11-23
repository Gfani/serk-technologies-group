import { prisma } from './prisma';
import { DEFAULT_THEME, ALL_PROJECTS } from './constants';
import { ThemeConfig, ProjectItem, PageItem } from './types';

export async function getThemeSettings(): Promise<ThemeConfig> {
  try {
    const settings = await prisma.themeSettings.findUnique({
      where: { id: 'default' },
    });
    if (settings) {
      return {
        ...settings,
        headerLayout: (settings.headerLayout as 'ONE_ROW' | 'TWO_ROW') || 'TWO_ROW',
      };
    }

    const siteSetting = await prisma.siteSetting.findUnique({
      where: { key: 'theme-settings' },
    });
    if (siteSetting && siteSetting.value) {
      const parsed = JSON.parse(siteSetting.value);
      return {
        ...DEFAULT_THEME,
        ...parsed,
        headerLayout: (parsed.headerLayout as 'ONE_ROW' | 'TWO_ROW') || 'TWO_ROW',
      };
    }
  } catch (err) {
    // Fallback to default theme if DB is uninitialized or uncontactable
  }
  return DEFAULT_THEME;
}

export async function getAllProjects(): Promise<ProjectItem[]> {
  try {
    const dbProjects = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (dbProjects && dbProjects.length > 0) {
      return dbProjects as unknown as ProjectItem[];
    }
  } catch (err) {
    // Fallback to constants
  }
  return ALL_PROJECTS.map((p, idx) => ({ ...p, id: `proj-${idx}` })) as ProjectItem[];
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    if (project) return project as unknown as ProjectItem;
  } catch (err) {
    // Fallback
  }
  const found = ALL_PROJECTS.find((p) => p.slug === slug);
  return found ? ({ ...found, id: `fallback-${slug}` } as ProjectItem) : null;
}

export async function getPageWithBlocks(slug: string): Promise<PageItem | null> {
  try {
    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        contentBlocks: {
          where: { isVisible: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
    if (page) return page as unknown as PageItem;
  } catch (err) {
    // Fallback
  }
  return null;
}

export async function getGalleryMedia(category?: string) {
  try {
    const items = await prisma.galleryItem.findMany({
      where: {
        isVisible: true,
        ...(category && category !== 'All' ? { category } : {}),
      },
      orderBy: { sortOrder: 'asc' },
    });
    if (items.length > 0) return items;
  } catch (err) {
    // Fallback
  }

  // Default gallery fallback from authentic project photos
  return [
    {
      id: 'g1',
      title: 'Engineering & Systems Architecture',
      caption: 'SERK core software engineers collaborating in modern development studio.',
      altText: 'SERK Engineering Team',
      imageUrl: '/images/serk-photo-engineering.jpg',
      category: 'Engineering',
      sortOrder: 1,
    },
    {
      id: 'g2',
      title: 'Construction Takeoff & Field Takeover',
      caption: 'Civil infrastructure and structural steel estimation for major national projects.',
      altText: 'Construction Site Engineering',
      imageUrl: '/images/serk-photo-construction.jpg',
      category: 'Construction',
      sortOrder: 2,
    },
    {
      id: 'g3',
      title: 'Clinical Hospital Management System',
      caption: 'Digital patient records, pharmacy integration, and clinical decision support.',
      altText: 'Clinical Health OS',
      imageUrl: '/images/serk-photo-health.jpg',
      category: 'Healthcare',
      sortOrder: 3,
    },
    {
      id: 'g4',
      title: 'Hospitality & Retail POS Counter',
      caption: 'High-speed touch order checkout and real-time inventory deduction.',
      altText: 'Retail POS Counter',
      imageUrl: '/images/serk-photo-pos.jpg',
      category: 'Hospitality',
      sortOrder: 4,
    },
    {
      id: 'g5',
      title: 'Urban Mobility & Fleet Telemetry',
      caption: 'Segar ride-hailing dispatch architecture and driver route mapping.',
      altText: 'Urban Mobility Dashboard',
      imageUrl: '/images/serk-photo-lobby.jpg',
      category: 'Ventures',
      sortOrder: 5,
    },
    {
      id: 'g6',
      title: 'Enterprise Architecture & Sovereign Cloud',
      caption: 'Commercial banking and multi-branch enterprise administration.',
      altText: 'Commercial Infrastructure',
      imageUrl: '/images/pill_tower.jpg',
      category: 'Enterprise',
      sortOrder: 6,
    },
  ];
}

export async function getAllBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    });
    if (posts.length > 0) return posts;
  } catch (err) {
    // Fallback
  }

  return [
    {
      id: 'p1',
      slug: 'what-should-a-business-website-actually-do',
      title: 'What Should a Business Website Actually Do?',
      excerpt: 'Beyond an online business card: how modern enterprise portals convert visitors into verified client conversations.',
      content: `A website is often an organization's most public employee. It operates 24 hours a day, explains your capabilities, and invites prospective partners to begin a dialogue. Yet many corporate websites fail because they prioritize visual noise over operational clarity. At SERK Technologies Group, we treat digital presence as a functional system. From instant loading speeds to clear service taxonomies and verified inquiry pipelines, an enterprise website must build institutional trust from the very first interaction.`,
      coverImage: '/images/serk-photo-lobby.jpg',
      author: 'SERK Architecture Team',
      category: 'Digital Presence',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'p2',
      slug: 'digital-construction-connecting-boq-procurement-and-cost',
      title: 'Digital Construction: Connecting BOQ, Procurement, and Actual Cost',
      excerpt: 'Why disconnected spreadsheets cause project overruns, and how unified project controls restore commercial predictability.',
      content: `In large-scale civil engineering and building projects, estimating, bill of quantities (BOQ), material purchasing, and site measurement frequently live in separate files. When revisions occur, price variations are lost and interim payment certificates (IPC) become contentious disputes. SERK Construction Intelligence OS bridges this divide by tying every requisition directly to its budget line item. When quantity takeoff is transparent, general contractors and quantity surveyors can audit variance before it impacts cash flow.`,
      coverImage: '/images/serk-photo-construction.jpg',
      author: 'Construction OS Research Unit',
      category: 'Construction Intelligence',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'p3',
      slug: 'five-questions-before-digitizing-a-hospital-or-clinic',
      title: 'Five Questions Before Digitizing a Hospital or Multi-Specialty Clinic',
      excerpt: 'Navigating clinical handoffs, patient records safety, offline operational resilience, and local medical workflows.',
      content: `Care is fundamentally a sequence of human handoffs: from triage registration to consultation, laboratory diagnostic orders, pharmacy dispensing, and discharge billing. Implementing hospital software requires deep operational empathy. A successful system cannot simply digitize paper bureaucracy; it must protect patient records, support local network fluctuations with offline caching, and keep clinicians focused on patients rather than repetitive screens.`,
      coverImage: '/images/serk-photo-health.jpg',
      author: 'Health OS Clinical Systems Team',
      category: 'Healthcare Technology',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'p4',
      slug: 'what-responsible-applied-ai-looks-like-in-daily-work',
      title: 'What Responsible Applied AI Looks Like in Daily Work',
      excerpt: 'Moving past marketing hype: why human approval gates, audit trails, and data provenance are non-negotiable for enterprise AI.',
      content: `Artificial intelligence is most valuable when it assists human experts rather than attempting unsupervised autonomy. Whether classifying invoices, summarizing clinical encounter notes, or detecting rate anomalies in construction estimates, AI systems must provide traceable citations and explicit human review gates. At SERK Group, our multi-model engineering framework (QUORUM) enforces strict verification boundaries: AI suggests, humans decide, and the system records the decision.`,
      coverImage: '/images/serk-photo-engineering.jpg',
      author: 'SERK AI Research Lab',
      category: 'Applied Intelligence',
      publishedAt: new Date().toISOString(),
    },
  ];
}
