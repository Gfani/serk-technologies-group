import { NextRequest, NextResponse } from 'next/server';
import { createSession, destroySession, getSession, verifyPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_EMAIL || 'admin@serkgroup.com';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'SerkAdmin2026!';

    let authenticated = false;
    let userName = 'SERK Administrator';

    // 1. Try DB AdminUser if table exists
    try {
      const user = await prisma.adminUser.findUnique({ where: { email } });
      if (user && (await verifyPassword(password, user.passwordHash))) {
        authenticated = true;
        userName = user.name;
      }
    } catch (e) {
      // Fallback to env credentials
    }

    // 2. Check environment credentials
    if (!authenticated) {
      if (email.toLowerCase() === expectedEmail.toLowerCase() && password === expectedPassword) {
        authenticated = true;
      }
    }

    if (!authenticated) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    await createSession({ email, name: userName, role: 'SUPER_ADMIN' });

    return NextResponse.json({ success: true, message: 'Authentication successful.' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Authentication error.' }, { status: 500 });
  }
}

export async function DELETE() {
  destroySession();
  return NextResponse.json({ success: true, message: 'Session logged out.' });
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user: session });
}
