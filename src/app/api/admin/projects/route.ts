import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { getStoredProjects, saveStoredProject, deleteStoredProject } from '@/lib/contentStore';

function triggerRevalidation() {
  try {
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath('/ventures');
    revalidatePath('/industries');
    revalidatePath('/gallery');
    revalidatePath('/solutions');
  } catch (err) {
    console.error('Revalidation error:', err);
  }
}

export async function GET() {
  const projects = await getStoredProjects();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const saved = await saveStoredProject(body);
    triggerRevalidation();
    return NextResponse.json({ success: true, project: saved }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const saved = await saveStoredProject(body);
    triggerRevalidation();
    return NextResponse.json({ success: true, project: saved });
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

    const ok = await deleteStoredProject(id);
    triggerRevalidation();
    return NextResponse.json({ success: ok });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
