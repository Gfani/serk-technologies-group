'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Palette,
  FileText,
  Boxes,
  TrendingUp,
  Image as ImageIcon,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  // Skip auth check if currently on the login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    fetch('/api/admin/auth')
      .then((res) => {
        if (!res.ok) {
          router.push('/admin/login');
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        router.push('/admin/login');
      });
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#F4F7F5] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#0D4634] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold text-[#5B6761]">Validating Admin Session...</p>
        </div>
      </div>
    );
  }

  const navLinks = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Design Studio', href: '/admin/design-studio', icon: Palette },
    { label: 'Page & Text Editor', href: '/admin/pages', icon: FileText },
    { label: 'Projects & Platforms', href: '/admin/projects', icon: Boxes },
    { label: 'Ventures & Affiliates', href: '/admin/ventures', icon: TrendingUp },
    { label: 'Cloud Gallery', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Leads & Inquiries', href: '/admin/leads', icon: Inbox },
    { label: 'Settings & Backup', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#101513] text-white flex flex-col shrink-0 border-r border-white/10 select-none">
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#0D4634] flex items-center justify-center shrink-0">
            <Image
              src="/images/serk-logo-mark.png"
              alt="SERK Mark"
              width={22}
              height={22}
              className="object-contain"
            />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-white">SERK Admin</div>
            <div className="text-[10px] text-[#9AB4A9] uppercase tracking-wider">Enterprise CMS</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#0D4634] text-white shadow-sm'
                    : 'text-[#9AB4A9] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded text-xs text-[#9AB4A9] hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Site</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-[#DEE6E0] px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#5B6761]">
            <span>Console</span>
            <ChevronRight className="w-3 h-3 text-[#DEE6E0]" />
            <span className="font-semibold text-[#101513] capitalize">
              {pathname === '/admin' ? 'Overview' : pathname.replace('/admin/', '').replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Production Online</span>
            </span>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
