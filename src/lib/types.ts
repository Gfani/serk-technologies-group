export type MaturityStage =
  | 'CONCEPT'
  | 'RESEARCH_PROTOTYPE'
  | 'INTERNAL_ALPHA'
  | 'PILOT_PRIVATE_BETA'
  | 'PRODUCTION_AVAILABLE'
  | 'OPERATING_VENTURE';

export interface ThemeConfig {
  id: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  surfaceColor: string;
  surfaceAltColor: string;
  borderColor: string;
  textColor: string;
  textMutedColor: string;
  fontHeading: string;
  fontBody: string;
  borderRadius: string;
  headerLayout: 'ONE_ROW' | 'TWO_ROW';
}

export type ImageFitMode = 'contain' | 'cover';

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  maturity: MaturityStage;
  summary: string;
  description?: string | null;
  audience?: string | null;
  capabilities?: string | null;
  plannedCapabilities?: string | null;
  imageUrl?: string | null;
  imageFit?: ImageFitMode;
  publicCta?: string | null;
  ctaUrl?: string | null;
  isPublished: boolean;
  sortOrder: number;
}

export interface ContentBlockItem {
  id: string;
  pageId: string;
  sectionKey: string;
  heading?: string | null;
  subheading?: string | null;
  bodyText?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  isVisible: boolean;
  sortOrder: number;
  metadata?: any;
}

export interface PageItem {
  id: string;
  slug: string;
  title: string;
  metaDescription?: string | null;
  isPublished: boolean;
  contentBlocks?: ContentBlockItem[];
}

export interface GalleryMediaItem {
  id: string;
  title: string;
  caption?: string | null;
  altText: string;
  imageUrl: string;
  imageFit?: ImageFitMode;
  cloudinaryPublicId?: string | null;
  category: string;
  isVisible: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  author: string;
  category: string;
  isPublished: boolean;
  publishedAt: string;
}

export interface LeadItem {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  industry?: string | null;
  service?: string | null;
  interest?: string | null;
  inquiryType?: string | null;
  message: string;
  sourcePage?: string | null;
  status: 'NEW' | 'CONTACTED' | 'PROPOSAL_SENT' | 'CLOSED' | 'ARCHIVED';
  ipAddress?: string | null;
  notes?: string | null;
  createdAt: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
  imageFit?: ImageFitMode | null;
  alt?: string;
  description: string;
  websiteUrl?: string;
  collabText?: string;
  isPublished?: boolean;
  sortOrder?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  category?: string;
  description: string;
  imageUrl?: string;
  bullets?: string[];
  ctaLabel?: string;
  ctaUrl?: string;
  isPublished?: boolean;
  sortOrder?: number;
}

export interface IndustryItem {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl?: string;
  bullets: string[];
  ctaLabel?: string;
  ctaUrl?: string;
  isPublished?: boolean;
  sortOrder?: number;
}

export interface InsightItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  category?: string;
  date?: string;
  isPublished?: boolean;
  sortOrder?: number;
}

export interface BrandingConfig {
  headerLogoUrl: string;
  footerMarkUrl: string;
  brandAltText: string;
  companyName: string;
  tagline: string;
}
