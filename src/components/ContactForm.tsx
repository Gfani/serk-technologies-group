'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm({
  defaultInterest = 'General Enterprise Inquiry',
}: {
  defaultInterest?: string;
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    industry: 'Technology & Enterprise',
    interest: defaultInterest,
    inquiryType: 'DEMO_REQUEST',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        industry: 'Technology & Enterprise',
        interest: defaultInterest,
        inquiryType: 'DEMO_REQUEST',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred. Please contact us directly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-[#0D4634] mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#101513] mb-2">Inquiry Received</h3>
        <p className="text-[#5B6761] max-w-md mx-auto mb-6 text-sm">
          Thank you for reaching out to SERK Technologies Group. Our enterprise solutions team has
          logged your request and will review your requirements within one business day.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded text-sm font-medium bg-[#0D4634] text-white hover:bg-[#2D735A] transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded flex items-center gap-3 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#101513] uppercase tracking-wider mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Abebe Bikila"
            className="w-full px-3.5 py-2.5 border border-[#DEE6E0] rounded bg-white text-sm text-[#101513] focus:outline-none focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#101513] uppercase tracking-wider mb-1.5">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="abebe@enterprise.com"
            className="w-full px-3.5 py-2.5 border border-[#DEE6E0] rounded bg-white text-sm text-[#101513] focus:outline-none focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#101513] uppercase tracking-wider mb-1.5">
            Phone / WhatsApp Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+251 9XX XXX XXX"
            className="w-full px-3.5 py-2.5 border border-[#DEE6E0] rounded bg-white text-sm text-[#101513] focus:outline-none focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#101513] uppercase tracking-wider mb-1.5">
            Organization / Company
          </label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="Enterprise or Institution Name"
            className="w-full px-3.5 py-2.5 border border-[#DEE6E0] rounded bg-white text-sm text-[#101513] focus:outline-none focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#101513] uppercase tracking-wider mb-1.5">
            Primary Interest
          </label>
          <select
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 border border-[#DEE6E0] rounded bg-white text-sm text-[#101513] focus:outline-none focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
          >
            <option value="General Enterprise Inquiry">General Enterprise Inquiry</option>
            <option value="Hospital & Clinical Management System (HMS)">Hospital & Clinical Management System (HMS)</option>
            <option value="Construction BOQ & AI Estimator">Construction BOQ & AI Estimator</option>
            <option value="Finance & Enterprise Audit Engine">Finance & Enterprise Audit Engine</option>
            <option value="Smart Retail & Cloud POS">Smart Retail & Cloud POS</option>
            <option value="Custom Enterprise Software Architecture">Custom Enterprise Software Architecture</option>
            <option value="Venture Partnership & Incubation">Venture Partnership & Incubation</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#101513] uppercase tracking-wider mb-1.5">
            Inquiry Nature
          </label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 border border-[#DEE6E0] rounded bg-white text-sm text-[#101513] focus:outline-none focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
          >
            <option value="DEMO_REQUEST">Request a Live System Demo</option>
            <option value="PROJECT_DISCOVERY">Schedule Technical Discovery</option>
            <option value="PARTNERSHIP">Partnership / Ecosystem</option>
            <option value="GENERAL">General Information</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#101513] uppercase tracking-wider mb-1.5">
          Project Requirements & Scope <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly describe your team's current challenges, timeline, and operational objectives..."
          className="w-full px-3.5 py-2.5 border border-[#DEE6E0] rounded bg-white text-sm text-[#101513] focus:outline-none focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded font-medium text-sm text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors disabled:opacity-60"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Request...</span>
          </>
        ) : (
          <>
            <span>Submit Enterprise Inquiry</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
