import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ALL_PROJECTS } from '@/lib/constants';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    if (projects.length > 0) return NextResponse.json(projects);
  } catch (err) {
    // fallback
  }
  return NextResponse.json(ALL_PROJECTS.map((p, i) => ({ ...p, id: `proj-${i}` })));
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const project = await prisma.project.create({
      data: {
        slug: body.slug,
        name: body.name,
        category: body.category,
        maturity: body.maturity,
        summary: body.summary,
        description: body.description || null,
        audience: body.audience || null,
        capabilities: body.capabilities || null,
        plannedCapabilities: body.plannedCapabilities || null,
        imageUrl: body.imageUrl || null,
        publicCta: body.publicCta || 'Request Platform Demo',
        ctaUrl: body.ctaUrl || '/contact',
        isPublished: body.isPublished ?? true,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, ...data } = body;
    const updated = await prisma.project.update({
      where: { id },
      data,
    });
    return NextResponse.json({ success: true, project: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
