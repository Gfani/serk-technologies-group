import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getSiteContent, saveSiteContent } from '@/lib/contentStore';

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
    return NextResponse.json({ success: true, content: getSiteContent() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
