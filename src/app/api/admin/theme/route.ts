import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { DEFAULT_THEME } from '@/lib/constants';
import { syncThemeToHtml } from '@/lib/htmlSync';
import { ThemeConfig } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const theme = await prisma.themeSettings.findUnique({ where: { id: 'default' } });
    if (theme) {
      return NextResponse.json(theme, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    }

    const setting = await prisma.siteSetting.findUnique({ where: { key: 'theme-settings' } });
    if (setting && setting.value) {
      return NextResponse.json(JSON.parse(setting.value), {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    }
  } catch (err) {
    // Return fallback on DB read error
  }

  return NextResponse.json(DEFAULT_THEME, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
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

    // Also persist to siteSetting so it survives any future schema changes
    try {
      await prisma.siteSetting.upsert({
        where: { key: 'theme-settings' },
        update: { value: JSON.stringify(updated) },
        create: { key: 'theme-settings', value: JSON.stringify(updated) },
      });
    } catch (sErr) {}

    // Immediately write theme tokens to disk and update HTML files
    syncThemeToHtml(updated as unknown as ThemeConfig);

    // Invalidate App Router cache
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, theme: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update theme.' }, { status: 500 });
  }
}
