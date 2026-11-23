import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getStoredSiteContent, saveStoredSiteContent } from '@/lib/contentStore';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const content = await getStoredSiteContent();
  return NextResponse.json(content, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const saved = await saveStoredSiteContent(body);

    try {
      revalidatePath('/', 'layout');
    } catch (e) {}

    return NextResponse.json({ success: true, content: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
