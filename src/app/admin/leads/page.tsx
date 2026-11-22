'use client';

import React, { useState, useEffect } from 'react';
import { LeadItem } from '@/lib/types';
import { Inbox, Download, Mail, Phone, Building, Calendar, CheckCircle, Clock, Archive } from 'lucide-react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus as any } : l))
        );
      }
    } catch (err) {
      alert('Status update failed.');
    }
  };

  const filtered = leads.filter((l) =>
    filterStatus === 'ALL' ? true : l.status === filterStatus
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#101513]">Inquiry Leads & Demo Requests</h1>
          <p className="text-xs text-[#5B6761] mt-1">
            Review incoming leads, update engagement status, and export to CSV.
          </p>
        </div>
        <a
          href="/api/admin/leads?format=csv"
          download
          className="px-4 py-2 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export All Leads (CSV)</span>
        </a>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-[#DEE6E0] pb-2">
        {['ALL', 'NEW', 'CONTACTED', 'ARCHIVED'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterStatus === st
                ? 'bg-[#0D4634] text-white'
                : 'text-[#5B6761] hover:bg-white'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm hover:border-[#0D4634] transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DEE6E0] pb-3">
                <div>
                  <h3 className="text-base font-bold text-[#101513]">{lead.fullName}</h3>
                  <div className="text-xs text-[#0D4634] font-semibold">{lead.service || lead.interest || 'General Inquiry'}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                      lead.status === 'NEW'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : lead.status === 'CONTACTED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {lead.status}
                  </span>

                  <select
                    value={lead.status}
                    onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                    className="px-2 py-1 text-xs border border-[#DEE6E0] rounded bg-white text-[#101513]"
                  >
                    <option value="NEW">Mark New</option>
                    <option value="CONTACTED">Mark Contacted</option>
                    <option value="ARCHIVED">Archive</option>
                  </select>
                </div>
              </div>

              {/* Lead Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#5B6761]">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0D4634]" />
                  <a href={`mailto:${lead.email}`} className="text-[#101513] hover:underline font-medium">
                    {lead.email}
                  </a>
                </div>
                {lead.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#0D4634]" />
                    <span>{lead.phone}</span>
                  </div>
                )}
                {lead.organization && (
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#0D4634]" />
                    <span>{lead.organization}</span>
                  </div>
                )}
              </div>

              {/* Message Box */}
              <div className="p-3.5 bg-[#F4F7F5] rounded-lg border border-[#DEE6E0] text-xs text-[#101513] leading-relaxed">
                <strong className="block text-[11px] text-[#5B6761] uppercase tracking-wider mb-1">
                  Scope & Requirements:
                </strong>
                {lead.message}
              </div>

              <div className="text-[10px] text-[#5B6761] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Received {new Date(lead.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl border border-[#DEE6E0] p-12 text-center text-[#5B6761] text-xs">
            No leads currently found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
