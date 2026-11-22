import { Building2, Stethoscope, Landmark, ShoppingBag } from 'lucide-react';

export const industriesData = [
  {
    slug: 'construction-engineering',
    name: 'Construction, Infrastructure & Real Estate',
    summary:
      'Replacing manual Excel Bill of Quantities with automated AI takeoffs, site progress tracking, and material logistics management.',
    icon: Building2,
    platforms: ['Construction Takeoff OS', 'Site Logistics Coordinator', 'Ethiopian BOQ Engine'],
    image: '/images/serk-photo-construction.jpg',
  },
  {
    slug: 'healthcare-clinical',
    name: 'Healthcare, Clinics & Hospital Networks',
    summary:
      'Digitizing patient registries, outpatient queues, lab orders, pharmacy dispensing, and ICD-11 coding with strict data privacy.',
    icon: Stethoscope,
    platforms: ['Hospital & Clinical Management System (HMS)', 'Clinic OS Light', 'Pharmacy Inventory Ledger'],
    image: '/images/serk-photo-engineering.jpg',
  },
  {
    slug: 'financial-services',
    name: 'Financial Services & Enterprise Audit',
    summary:
      'Automated reconciliation, tax compliance reporting, multi-branch audit verification, and fraud detection engines.',
    icon: Landmark,
    platforms: ['Finance & Enterprise Audit Engine', 'Tax Compliance Synchronizer', 'Multi-Branch Ledger'],
    image: '/images/serk-photo-construction.jpg',
  },
  {
    slug: 'retail-commerce',
    name: 'Retail, Hospitality & Supply Chain',
    summary:
      'Modern touch-screen POS terminals, real-time inventory synchronization, and supplier procurement networks.',
    icon: ShoppingBag,
    platforms: ['Smart Retail & Cloud POS', 'Hospitality POS & Table Manager', 'Supplier B2B Network'],
    image: '/images/serk-photo-engineering.jpg',
  },
];
