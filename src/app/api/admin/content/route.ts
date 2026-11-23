import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { getSiteContent, saveSiteContent } from '@/lib/contentStore';

function triggerRevalidation() {
  try {
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath('/ventures');
    revalidatePath('/industries');
    revalidatePath('/gallery');
    revalidatePath('/about');
    revalidatePath('/contact');
  } catch (err) {
    console.error('Revalidation error:', err);
  }
}

export async function GET() {
  const content = getSiteContent();
  return NextResponse.json(content);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const success = saveSiteContent(body);
    if (!success) {
      return NextResponse.json({ error: 'Failed to write content' }, { status: 500 });
    }
    triggerRevalidation();
    return NextResponse.json({ success: true, content: getSiteContent() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
