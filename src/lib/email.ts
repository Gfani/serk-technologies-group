import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || 'serktechgroup@gmail.com';

export interface SendLeadEmailParams {
  fullName: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  industry?: string | null;
  service?: string | null;
  message: string;
  sourcePage?: string | null;
}

export async function sendLeadNotification(lead: SendLeadEmailParams) {
  if (!resend || !process.env.RESEND_API_KEY) {
    console.log('[Email Notification Skipped - No RESEND_API_KEY configured]');
    console.log('Lead Details:', lead);
    return { success: true, message: 'Logged to console' };
  }

  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #DEE6E0; border-radius: 8px;">
        <div style="border-bottom: 2px solid #0D4634; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #0D4634; margin: 0;">New Project Inquiry — SERK Technologies Group</h2>
          <p style="color: #5B6761; margin: 4px 0 0 0; font-size: 14px;">Incoming lead from ${lead.sourcePage || 'Website'}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #5B6761; width: 140px; font-weight: bold;">Full Name:</td>
            <td style="padding: 8px 0; color: #101513; font-weight: 600;">${lead.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #5B6761; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0; color: #0D4634;"><a href="mailto:${lead.email}" style="color: #0D4634; text-decoration: none;">${lead.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #5B6761; font-weight: bold;">Phone / WhatsApp:</td>
            <td style="padding: 8px 0; color: #101513;">${lead.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #5B6761; font-weight: bold;">Organization:</td>
            <td style="padding: 8px 0; color: #101513;">${lead.organization || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #5B6761; font-weight: bold;">Industry:</td>
            <td style="padding: 8px 0; color: #101513;">${lead.industry || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #5B6761; font-weight: bold;">Service / Interest:</td>
            <td style="padding: 8px 0; color: #101513;">${lead.service || 'General Inquiry'}</td>
          </tr>
        </table>

        <div style="background-color: #F4F7F5; padding: 16px; border-radius: 6px; border-left: 4px solid #0D4634; margin-bottom: 24px;">
          <h4 style="margin: 0 0 8px 0; color: #101513; font-size: 14px;">Project Description & Requirements:</h4>
          <p style="margin: 0; color: #101513; white-space: pre-wrap; font-size: 14.5px; line-height: 1.5;">${lead.message}</p>
        </div>

        <div style="border-top: 1px solid #DEE6E0; padding-top: 16px; font-size: 12px; color: #7D978C;">
          <p style="margin: 0;">SERK Technologies Group · Mekelle, Tigray, Ethiopia · Innovation with Integrity</p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'SERK Leads <onboarding@resend.dev>',
      to: [NOTIFICATION_EMAIL],
      subject: `[SERK Lead] ${lead.fullName} (${lead.organization || lead.industry || 'Inquiry'})`,
      html: htmlContent,
      replyTo: lead.email,
    });

    if (error) {
      console.error('Resend delivery error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Email send exception:', err);
    return { success: false, error: err };
  }
}
