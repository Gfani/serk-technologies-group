import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ALL_PROJECTS, DEFAULT_THEME } from '../src/lib/constants';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting SERK Technologies Group Database Seed ---');

  // 1. Seed Theme Settings
  console.log('1. Seeding default theme tokens...');
  await prisma.themeSettings.upsert({
    where: { id: 'default' },
    update: DEFAULT_THEME,
    create: DEFAULT_THEME,
  });

  // 2. Seed Default Admin User
  console.log('2. Seeding default admin user...');
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@serkgroup.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeThisStrongPassword2026!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      name: 'SERK Administrator',
    },
    create: {
      email: adminEmail,
      passwordHash,
      name: 'SERK Administrator',
      role: 'SUPER_ADMIN',
    },
  });

  // 3. Seed All 23 Projects and Ventures
  console.log('3. Seeding all 23 verified products & ventures...');
  for (const project of ALL_PROJECTS) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  // 4. Seed Core Pages and Content Blocks
  console.log('4. Seeding core pages and content blocks...');
  const pagesData = [
    {
      slug: 'home',
      title: 'SERK Technologies Group — Innovation with Integrity',
      metaDescription:
        'Ethiopian technology group engineering sovereign digital systems, AI-driven construction takeoff, clinical hospital software, and enterprise business platforms.',
      blocks: [
        {
          sectionKey: 'hero',
          heading: 'We Engineer the Systems Behind Better Business.',
          subheading: 'TECHNOLOGY BUILT FOR REAL WORK',
          bodyText:
            'From your first website to intelligent enterprise operations, SERK Technologies Group designs and develops practical digital solutions for organizations ready to work smarter. We combine software engineering, thoughtful design, responsible AI and deep attention to real-world workflows — starting in Ethiopia, built for a wider world.',
          ctaLabel: 'Discuss Your Project',
          ctaUrl: '/contact',
          imageUrl: '/images/serk-hero.svg',
          imageAlt: 'SERK Deep Tech & Sovereign Systems',
          sortOrder: 1,
        },
        {
          sectionKey: 'purpose',
          heading: 'Technology should simplify work, not complicate it.',
          subheading: 'OUR PURPOSE',
          bodyText:
            'Every organization has a different story. A clinic needs continuity of care. A restaurant needs speed and control. A contractor needs cost visibility. A manufacturer needs dependable information. We begin by understanding that reality, then create technology that helps people make better decisions every day.',
          ctaLabel: 'Explore Our Story',
          ctaUrl: '/about',
          sortOrder: 2,
        },
        {
          sectionKey: 'why_choose',
          heading: 'Why Choose Serk Group?',
          subheading: 'AT A GLANCE',
          bodyText:
            'At Serk, we pair real industry know-how with practical AI. The result is software that feels made for you, because it is. Here is why teams choose us: AI at the Core, Built for Your Industry, One Connected Family, and Tailored to You.',
          ctaLabel: 'Start a Project',
          ctaUrl: '/contact',
          imageUrl: '/images/serk-why-choose.jpg',
          imageAlt: 'SERK Group Enterprise Engineering Team',
          sortOrder: 3,
        },
      ],
    },
    {
      slug: 'about',
      title: 'About Us — SERK Technologies Group',
      metaDescription:
        'Our philosophy, mission, values and long-term ambition building African technology with international engineering standards.',
      blocks: [
        {
          sectionKey: 'hero',
          heading: 'Innovation with Integrity. Building Beyond Boundaries.',
          subheading: 'ABOUT SERK GROUP',
          bodyText:
            'SERK Technologies Group was conceived for a world where technology is no longer an optional department — it shapes how organizations serve people, manage resources and grow. We focus on the places where technology meets daily life: the patient record that should never be lost in a handoff, the business report that should not take a week, the construction estimate that should withstand scrutiny, the sales counter that should never become a bottleneck.',
          ctaLabel: 'Work With SERK',
          ctaUrl: '/contact',
          sortOrder: 1,
        },
      ],
    },
    {
      slug: 'solutions',
      title: 'Our Solutions — SERK Technologies Group',
      metaDescription:
        'Comprehensive services: custom software, enterprise systems, websites, applied AI, cybersecurity, and cloud architecture.',
      blocks: [
        {
          sectionKey: 'hero',
          heading: 'Technology for Every Stage of Your Business.',
          subheading: 'COMPREHENSIVE CAPABILITIES',
          bodyText:
            'Whether you need a strong website, a reliable sales system, a connected ERP or a complex industry platform, SERK builds around your process, your people and your goals. We do not start by selling you a larger system than you need. We begin with the work you need done well, then design a path that can grow with you.',
          ctaLabel: 'Discuss a Solution',
          ctaUrl: '/contact',
          sortOrder: 1,
        },
      ],
    },
  ];

  for (const pageItem of pagesData) {
    const page = await prisma.page.upsert({
      where: { slug: pageItem.slug },
      update: {
        title: pageItem.title,
        metaDescription: pageItem.metaDescription,
      },
      create: {
        slug: pageItem.slug,
        title: pageItem.title,
        metaDescription: pageItem.metaDescription,
      },
    });

    for (const block of pageItem.blocks) {
      const existing = await prisma.contentBlock.findFirst({
        where: { pageId: page.id, sectionKey: block.sectionKey },
      });
      if (existing) {
        await prisma.contentBlock.update({
          where: { id: existing.id },
          data: block,
        });
      } else {
        await prisma.contentBlock.create({
          data: {
            ...block,
            pageId: page.id,
          },
        });
      }
    }
  }

  // 5. Seed Gallery Items
  console.log('5. Seeding gallery items...');
  const galleryItems = [
    {
      title: 'Software Engineering Studio',
      caption: 'Core software architects designing sovereign application frameworks.',
      altText: 'SERK Software Engineering Team',
      imageUrl: '/images/serk-photo-engineering.jpg',
      category: 'Engineering',
      sortOrder: 1,
    },
    {
      title: 'Civil Construction & Quantity Takeoff',
      caption: 'Field takeoff telemetry and structural steel rebar management.',
      altText: 'Construction Site Rebar',
      imageUrl: '/images/serk-photo-construction.jpg',
      category: 'Construction',
      sortOrder: 2,
    },
    {
      title: 'Clinical Operations & Diagnostics',
      caption: 'Digital triage, inpatient beds, and clinical records flow.',
      altText: 'Clinical Doctor with Mobile Device',
      imageUrl: '/images/serk-photo-health.jpg',
      category: 'Healthcare',
      sortOrder: 3,
    },
    {
      title: 'Smart Hospitality & Café Counter',
      caption: 'Fast cashier sessions, kitchen orders, and inventory audits.',
      altText: 'Café Sales Counter',
      imageUrl: '/images/serk-photo-pos.jpg',
      category: 'Hospitality',
      sortOrder: 4,
    },
    {
      title: 'Mekelle Enterprise Innovation Center',
      caption: 'Modern high-rise development center overlooking city skyline.',
      altText: 'Modern Enterprise Workspace',
      imageUrl: '/images/pill_tower.jpg',
      category: 'Enterprise',
      sortOrder: 5,
    },
  ];

  for (const item of galleryItems) {
    const existing = await prisma.galleryItem.findFirst({
      where: { title: item.title },
    });
    if (existing) {
      await prisma.galleryItem.update({
        where: { id: existing.id },
        data: item,
      });
    } else {
      await prisma.galleryItem.create({ data: item });
    }
  }

  // 6. Seed Blog Posts
  console.log('6. Seeding insight articles...');
  const posts = [
    {
      slug: 'what-should-a-business-website-actually-do',
      title: 'What Should a Business Website Actually Do?',
      excerpt:
        'Beyond an online business card: how modern enterprise portals convert visitors into verified client conversations.',
      content:
        'A website is often an organization’s most public employee. It operates 24 hours a day, explains your capabilities, and invites prospective partners to begin a dialogue. Yet many corporate websites fail because they prioritize visual noise over operational clarity. At SERK Technologies Group, we treat digital presence as a functional system. From instant loading speeds to clear service taxonomies and verified inquiry pipelines, an enterprise website must build institutional trust from the very first interaction.',
      coverImage: '/images/serk-photo-lobby.jpg',
      author: 'SERK Architecture Team',
      category: 'Digital Presence',
      publishedAt: new Date(),
    },
    {
      slug: 'digital-construction-connecting-boq-procurement-and-cost',
      title: 'Digital Construction: Connecting BOQ, Procurement, and Actual Cost',
      excerpt:
        'Why disconnected spreadsheets cause project overruns, and how unified project controls restore commercial predictability.',
      content:
        'In large-scale civil engineering and building projects, estimating, bill of quantities (BOQ), material purchasing, and site measurement frequently live in separate files. When revisions occur, price variations are lost and interim payment certificates (IPC) become contentious disputes. SERK Construction Intelligence OS bridges this divide by tying every requisition directly to its budget line item. When quantity takeoff is transparent, general contractors and quantity surveyors can audit variance before it impacts cash flow.',
      coverImage: '/images/serk-photo-construction.jpg',
      author: 'Construction OS Research Unit',
      category: 'Construction Intelligence',
      publishedAt: new Date(),
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log('--- SERK Technologies Group Database Seed Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
