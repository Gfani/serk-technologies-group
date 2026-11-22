'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#101513] flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-[#DEE6E0]">
        <div className="text-center mb-8">
          <div className="inline-block w-12 h-12 bg-[#0D4634] rounded-xl p-2.5 mb-4 shadow-sm">
            <Image
              src="/images/serk-logo-mark.png"
              alt="SERK Technologies Group"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#101513]">SERK Admin Console</h1>
          <p className="text-xs text-[#5B6761] mt-1">
            Enterprise Content Management & Design Studio
          </p>
        </div>

        {status === 'error' && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#101513] mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#5B6761] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@serkgroup.com"
                className="w-full pl-9 pr-3.5 py-2.5 border border-[#DEE6E0] rounded text-sm text-[#101513] focus:outline-none focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#101513] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#5B6761] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 border border-[#DEE6E0] rounded text-sm text-[#101513] focus:outline-none focus:ring-1 focus:ring-[#0D4634] focus:border-[#0D4634]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 rounded text-sm font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#DEE6E0] text-center">
          <p className="text-[11px] text-[#5B6761]">
            Authorized personnel only · Protected by HTTP-only session tokens
          </p>
        </div>
      </div>
    </div>
  );
}
