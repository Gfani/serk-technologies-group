import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { DEFAULT_THEME, ALL_PROJECTS } from '@/lib/constants';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const theme = await prisma.themeSettings.findUnique({ where: { id: 'default' } });
    const pages = await prisma.page.findMany({ include: { contentBlocks: true } });
    const projects = await prisma.project.findMany();
    const gallery = await prisma.galleryItem.findMany();
    const posts = await prisma.blogPost.findMany();
    const leads = await prisma.lead.findMany();

    const backupData = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      theme: theme || DEFAULT_THEME,
      pages,
      projects: projects.length > 0 ? projects : ALL_PROJECTS,
      gallery,
      posts,
      leads,
    };

    return new NextResponse(JSON.stringify(backupData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="serk-backup-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const backup = await req.json();

    if (backup.theme) {
      await prisma.themeSettings.upsert({
        where: { id: 'default' },
        update: backup.theme,
        create: { ...backup.theme, id: 'default' },
      });
    }

    if (Array.isArray(backup.projects)) {
      for (const p of backup.projects) {
        const { id, createdAt, updatedAt, ...rest } = p;
        await prisma.project.upsert({
          where: { slug: p.slug },
          update: rest,
          create: { ...rest, slug: p.slug },
        });
      }
    }

    return NextResponse.json({ success: true, message: 'Database state restored successfully.' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
