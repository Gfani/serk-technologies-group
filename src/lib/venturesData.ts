export interface VentureItem {
  slug: string;
  name: string;
  tagline: string;
  maturity: 'CONCEPT' | 'RESEARCH_PROTOTYPE' | 'INTERNAL_ALPHA' | 'PILOT_PRIVATE_BETA' | 'PRODUCTION_AVAILABLE' | 'OPERATING_VENTURE';
  summary: string;
  market: string;
  status: string;
}

export const venturesData: VentureItem[] = [
  {
    slug: 'segar-venture',
    name: 'Segar',
    tagline: 'Modern Livestock & Meat Value-Chain Marketplace',
    maturity: 'OPERATING_VENTURE',
    summary:
      'Digital marketplace and quality grading system modernizing livestock sourcing, certified processing, and delivery for hospitality, institutional catering, and export.',
    market: 'Agricultural Commerce · Livestock & Meat Processing',
    status: 'Active operating commercial venture with verified regional supply chains.',
  },
  {
    slug: 'visit-tigray',
    name: 'Visit Tigray',
    tagline: 'Authentic Heritage, Tourism & Cultural Exploration',
    maturity: 'OPERATING_VENTURE',
    summary:
      'Destination storytelling platform, vetted tour operator booking, and cultural preservation guide showcasing historical rock-hewn churches, mountain landscapes, and hospitality.',
    market: 'Tourism, Heritage & Global Destination Travel',
    status: 'Live digital platform curating certified itineraries and hospitality guides.',
  },
  {
    slug: 'lo-africa',
    name: 'LO Africa',
    tagline: 'Continental Logistics & Supply Chain Aggregation',
    maturity: 'PILOT_PRIVATE_BETA',
    summary:
      'Freight coordination network connecting regional transport fleets, border crossing clearance documentation, and warehouse staging hubs.',
    market: 'Cross-Border Freight & Cargo Logistics',
    status: 'Private pilot undergoing freight trial routes across key trade corridors.',
  },
];
