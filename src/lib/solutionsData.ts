import { Code2, Cpu, Database, Network } from 'lucide-react';

export const solutionsData = [
  {
    slug: 'custom-software-engineering',
    title: 'Custom Enterprise Software Engineering',
    summary:
      'High-reliability web, mobile, and desktop systems architected for heavy workloads, multi-currency accounting, and offline resilience.',
    icon: Code2,
    capabilities: [
      'Clean modular architecture with zero vendor lock-in',
      'Robust offline-first data sync for regional low-connectivity',
      'High-performance PostgreSQL and distributed databases',
      'Multi-currency and Ethiopian Birr tax ledger compliance',
    ],
  },
  {
    slug: 'intelligent-systems-ai',
    title: 'Intelligent Systems & Applied AI',
    summary:
      'Pragmatic, transparent machine learning models designed to automate high-volume paperwork, clinical categorization, and construction takeoff.',
    icon: Cpu,
    capabilities: [
      'Document parsing and Bill of Quantities extraction',
      'Clinical diagnosis registry support (ICD-11)',
      'Human-in-the-loop decision auditing',
      'Secure on-premise model inference',
    ],
  },
  {
    slug: 'enterprise-data-infrastructure',
    title: 'Enterprise Data Infrastructure & Sovereignty',
    summary:
      'Secure, self-hosted or private cloud database architectures that preserve data sovereignty and safeguard institutional assets.',
    icon: Database,
    capabilities: [
      'Encrypted backup and recovery automation',
      'Strict role-based access control (RBAC)',
      'Database migration from legacy paper or Excel registries',
      'Real-time disaster recovery replication',
    ],
  },
  {
    slug: 'systems-integration-erp',
    title: 'Systems Integration & Custom ERP',
    summary:
      'Unifying fragmented operational departments into one cohesive management dashboard with real-time auditability.',
    icon: Network,
    capabilities: [
      'Procurement, inventory, and point-of-sale unification',
      'Automated bank API and mobile money integrations',
      'Custom management reporting and KPI dashboards',
      'Staff training and change management protocols',
    ],
  },
];
