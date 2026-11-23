import React from 'react';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import AnimatedHeaderBanner from '@/components/AnimatedHeaderBanner';
import SmartContactLink from '@/components/SmartContactLink';

export const metadata = {
  title: 'Contact Us & Request a Demo | SERK Technologies Group',
  description:
    'Get in touch with SERK Technologies Group. Inquire about enterprise platforms, request system demos, or discuss custom software engineering.',
};

export default function ContactPage() {
  return (
    <div className="w-full">
      <AnimatedHeaderBanner title="Contact Us" />
      {/* 1. HERO */}
      <section className="bg-white border-b border-[#DEE6E0] py-8 sm:py-10">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-base sm:text-lg text-[#5B6761]">
              Whether you are an institution evaluating our Hospital OS, a contractor auditing BOQ
              estimates, or a founder seeking engineering partnership, our team is ready to assist.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FORM & CONTACT DETAILS */}
      <section className="py-20 bg-[#F4F7F5]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-xl border border-[#DEE6E0] shadow-sm">
              <h2 className="text-2xl font-bold text-[#101513] mb-2">Request Technical Discovery</h2>
              <p className="text-sm text-[#5B6761] mb-8">
                Fill in the details below. Our enterprise lead architect will review your
                requirements and reply within one business day.
              </p>
              <ContactForm />
            </div>

            {/* Right: Direct Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-xl border border-[#DEE6E0] shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#101513] border-b border-[#DEE6E0] pb-4">
                  Direct Communications
                </h3>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#5B6761] uppercase tracking-wider">
                      Email Inquiries
                    </div>
                    <SmartContactLink
                      type="mailto"
                      value="serktechgroup@gmail.com"
                      className="text-sm font-bold text-[#101513] hover:text-[#0D4634] transition-colors"
                    >
                      serktechgroup@gmail.com
                    </SmartContactLink>
                    <div className="text-xs text-[#5B6761] mt-0.5">
                      Direct inbox for pilots, bids, and technical requests
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#5B6761] uppercase tracking-wider">
                      Phone / WhatsApp / Telegram
                    </div>
                    <SmartContactLink
                      type="tel"
                      value="+251999911192"
                      displayValue="+251 999 911 192"
                      className="text-sm font-bold text-[#101513] hover:text-[#0D4634] transition-colors"
                    >
                      +251 999 911 192
                    </SmartContactLink>
                    <div className="text-xs text-[#5B6761] mt-0.5">
                      Direct messaging available during business hours
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#5B6761] uppercase tracking-wider">
                      Headquarters
                    </div>
                    <div className="text-sm font-bold text-[#101513]">
                      Mekelle, Tigray, Ethiopia
                    </div>
                    <div className="text-xs text-[#5B6761] mt-0.5">
                      Sovereign Digital Systems & Regional Engineering Hub
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#F4F7F5] text-[#0D4634] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#5B6761] uppercase tracking-wider">
                      Response Timeline
                    </div>
                    <div className="text-sm font-bold text-[#101513]">
                      Within 24 Hours
                    </div>
                    <div className="text-xs text-[#5B6761] mt-0.5">
                      Monday through Saturday (EAT timezone)
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Confidentiality Notice */}
              <div className="bg-[#0D4634] text-white p-6 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#E3AB72]" />
                  <span className="text-sm font-bold">Institutional Confidentiality</span>
                </div>
                <p className="text-xs text-[#CDE5DC] leading-relaxed">
                  All enterprise architectures, health record specifications, and proprietary
                  drawings shared with SERK Technologies Group are handled under strict NDA and
                  encrypted data sovereignty guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
