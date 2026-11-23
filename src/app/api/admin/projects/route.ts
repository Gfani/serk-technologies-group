import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getStoredProjects, saveStoredProject, deleteStoredProject } from '@/lib/contentStore';
import { syncProjectsToHtml } from '@/lib/htmlSync';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const projects = await getStoredProjects();
  return NextResponse.json(projects, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();

    // If a base64 image was uploaded, store it
    if (body.imageUrl && typeof body.imageUrl === 'string' && body.imageUrl.startsWith('data:image/')) {
      try {
        const uploadRes = await uploadImageToCloudinary(body.imageUrl, 'serk-projects');
        body.imageUrl = uploadRes.secure_url;
      } catch (uploadErr) {
        console.warn('Cloudinary upload warning, saving local URI:', uploadErr);
      }
    }

    const saved = await saveStoredProject(body);

    // Sync to static and live HTML
    const allProjects = await getStoredProjects();
    syncProjectsToHtml(allProjects);

    // Revalidate Next.js cache
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/products');
      revalidatePath('/ventures');
    } catch (e) {}

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

    // If a base64 image was uploaded, store it
    if (body.imageUrl && typeof body.imageUrl === 'string' && body.imageUrl.startsWith('data:image/')) {
      try {
        const uploadRes = await uploadImageToCloudinary(body.imageUrl, 'serk-projects');
        body.imageUrl = uploadRes.secure_url;
      } catch (uploadErr) {
        console.warn('Cloudinary upload warning, saving local URI:', uploadErr);
      }
    }

    const saved = await saveStoredProject(body);

    // Sync to static and live HTML
    const allProjects = await getStoredProjects();
    syncProjectsToHtml(allProjects);

    // Revalidate Next.js cache
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/products');
      revalidatePath('/ventures');
    } catch (e) {}

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

    // Sync to static and live HTML
    const allProjects = await getStoredProjects();
    syncProjectsToHtml(allProjects);

    // Revalidate Next.js cache
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/products');
      revalidatePath('/ventures');
    } catch (e) {}

    return NextResponse.json({ success: ok });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
