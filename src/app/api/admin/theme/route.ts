import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { DEFAULT_THEME } from '@/lib/constants';

export async function GET() {
  try {
    const theme = await prisma.themeSettings.findUnique({ where: { id: 'default' } });
    return NextResponse.json(theme || DEFAULT_THEME);
  } catch (err) {
    return NextResponse.json(DEFAULT_THEME);
  }
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const updated = await prisma.themeSettings.upsert({
      where: { id: 'default' },
      update: {
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        accentColor: data.accentColor,
        surfaceColor: data.surfaceColor,
        surfaceAltColor: data.surfaceAltColor,
        borderColor: data.borderColor,
        textColor: data.textColor,
        textMutedColor: data.textMutedColor,
        fontHeading: data.fontHeading,
        fontBody: data.fontBody,
        borderRadius: data.borderRadius,
        headerLayout: data.headerLayout || 'TWO_ROW',
      },
      create: {
        id: 'default',
        primaryColor: data.primaryColor || DEFAULT_THEME.primaryColor,
        secondaryColor: data.secondaryColor || DEFAULT_THEME.secondaryColor,
        accentColor: data.accentColor || DEFAULT_THEME.accentColor,
        surfaceColor: data.surfaceColor || DEFAULT_THEME.surfaceColor,
        surfaceAltColor: data.surfaceAltColor || DEFAULT_THEME.surfaceAltColor,
        borderColor: data.borderColor || DEFAULT_THEME.borderColor,
        textColor: data.textColor || DEFAULT_THEME.textColor,
        textMutedColor: data.textMutedColor || DEFAULT_THEME.textMutedColor,
        fontHeading: data.fontHeading || DEFAULT_THEME.fontHeading,
        fontBody: data.fontBody || DEFAULT_THEME.fontBody,
        borderRadius: data.borderRadius || DEFAULT_THEME.borderRadius,
        headerLayout: data.headerLayout || 'TWO_ROW',
      },
    });

    return NextResponse.json({ success: true, theme: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update theme.' }, { status: 500 });
  }
}
