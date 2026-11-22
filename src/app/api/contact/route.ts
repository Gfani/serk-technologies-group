import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendLeadNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, organization, industry, interest, inquiryType, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Attempt to persist in PostgreSQL (Neon)
    let leadId = `lead-${Date.now()}`;
    try {
      const saved = await prisma.lead.create({
        data: {
          fullName,
          email,
          phone: phone || null,
          organization: organization || null,
          industry: industry || null,
          service: interest || 'General Enterprise Inquiry',
          sourcePage: inquiryType || 'Website Contact / Demo Form',
          message,
        },
      });
      leadId = saved.id;
    } catch (dbErr) {
      console.warn('Prisma lead creation warning (Neon DB may not be configured yet):', dbErr);
    }

    // Send Resend email notification
    await sendLeadNotification({
      fullName,
      email,
      phone,
      organization,
      industry,
      service: interest,
      message,
      sourcePage: 'Website Contact / Demo Form',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been received. Our team will contact you shortly.',
        leadId,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error processing request.' },
      { status: 500 }
    );
  }
}
