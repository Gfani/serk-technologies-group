'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Menu, X, ArrowRight } from 'lucide-react';
import { ThemeConfig } from '@/lib/types';

export default function Header({ theme }: { theme?: ThemeConfig }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isTwoRow = theme?.headerLayout !== 'ONE_ROW';

  return (
    <header className="sticky top-0 z-50 w-full font-sans shadow-sm">
      {/* ROW 1 (Utility bar) - Visible when two-row header is active */}
      {isTwoRow && (
        <div className="bg-[#F4F7F5] border-b border-[#DEE6E0] h-[36px] text-[12.5px] text-[#5B6761] transition-all">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
            {/* Left Nav */}
            <div className="hidden md:flex items-center space-x-6 font-medium">
              <Link href="/about" className="hover:text-[#0D4634] transition-colors">
                About Us
              </Link>
              <Link href="/partners" className="hover:text-[#0D4634] transition-colors">
                Partners
              </Link>
              <Link href="/gallery" className="hover:text-[#0D4634] transition-colors">
                Gallery
              </Link>
              <Link href="/insights" className="hover:text-[#0D4634] transition-colors">
                Insights
              </Link>
            </div>

            {/* Right Contact Info */}
            <div className="flex items-center space-x-5 ml-auto text-xs sm:text-[12.5px]">
              <a
                href="mailto:serktechgroup@gmail.com"
                className="flex items-center space-x-1.5 hover:text-[#0D4634] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#0D4634]" />
                <span className="hidden sm:inline">serktechgroup@gmail.com</span>
              </a>
              <span className="text-[#DEE6E0] hidden sm:inline">|</span>
              <a
                href="tel:+251999911192"
                className="flex items-center space-x-1.5 hover:text-[#0D4634] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#0D4634]" />
                <span>+251 999 911 192</span>
              </a>
              <span className="text-[#DEE6E0]">|</span>
              <Link
                href="/contact"
                className="font-semibold text-[#101513] hover:text-[#0D4634] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ROW 2 (Main Navigation) */}
      <div className="bg-[#FFFFFF] border-b border-[#DEE6E0] h-[68px]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-[38px] h-[38px] relative flex-shrink-0">
              <Image
                src="/images/serk-logo-mark.png"
                alt="SERK Group Icon"
                width={38}
                height={38}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-[17px] tracking-tight text-[#101513] group-hover:text-[#0D4634] transition-colors leading-none">
                SERK GROUP
              </span>
              <span className="text-[10px] font-semibold text-[#5B6761] tracking-wider uppercase mt-1">
                Deep Tech &amp; Sovereign Systems
              </span>
            </div>
          </Link>

          {/* Desktop Primary Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[14.5px] font-medium text-[#101513]">
            <Link href="/" className="hover:text-[#0D4634] transition-colors">
              Home
            </Link>
            {/* Products with Categories Dropdown */}
            <div className="relative group py-2">
              <Link
                href="/products"
                className="hover:text-[#0D4634] transition-colors flex items-center gap-1"
              >
                <span>Products</span>
                <svg
                  className="w-3 h-3 text-[#5B6761] group-hover:text-[#0D4634] transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>
              <div className="absolute top-full left-0 w-64 bg-white border border-[#DEE6E0] rounded-lg shadow-xl py-2 hidden group-hover:block transition-all z-50">
                <Link
                  href="/products#sector-intelligence"
                  className="block px-4 py-2 text-xs font-medium text-[#101513] hover:bg-[#F4F7F5] hover:text-[#0D4634]"
                >
                  Sector Intelligence (3)
                </Link>
                <Link
                  href="/products#ai-security"
                  className="block px-4 py-2 text-xs font-medium text-[#101513] hover:bg-[#F4F7F5] hover:text-[#0D4634]"
                >
                  AI &amp; Security Research (3)
                </Link>
                <Link
                  href="/products#enterprise-operations"
                  className="block px-4 py-2 text-xs font-medium text-[#101513] hover:bg-[#F4F7F5] hover:text-[#0D4634]"
                >
                  Enterprise &amp; Operations (4)
                </Link>
                <Link
                  href="/products#solutions"
                  className="block px-4 py-2 text-xs font-medium text-[#101513] hover:bg-[#F4F7F5] hover:text-[#0D4634]"
                >
                  Core Solutions &amp; Integrations (2)
                </Link>
                <Link
                  href="/products#ventures"
                  className="block px-4 py-2 text-xs font-medium text-[#101513] hover:bg-[#F4F7F5] hover:text-[#0D4634]"
                >
                  Digital Ventures (4)
                </Link>
                <Link
                  href="/products#affiliated"
                  className="block px-4 py-2 text-xs font-medium text-[#101513] hover:bg-[#F4F7F5] hover:text-[#0D4634]"
                >
                  Affiliated Businesses (4)
                </Link>
                <Link
                  href="/products#future-innovation"
                  className="block px-4 py-2 text-xs font-medium text-[#101513] hover:bg-[#F4F7F5] hover:text-[#0D4634]"
                >
                  Future Innovation &amp; Sovereign Tech (3)
                </Link>
              </div>
            </div>
            <Link href="/industries" className="hover:text-[#0D4634] transition-colors">
              Industries
            </Link>
            <Link href="/solutions" className="hover:text-[#0D4634] transition-colors">
              Services
            </Link>
            <Link href="/ventures" className="hover:text-[#0D4634] transition-colors">
              Ventures
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#0D4634] hover:bg-[#2D735A] text-white px-5 py-2.5 rounded text-[13.5px] font-semibold tracking-wide transition-all shadow-sm"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#101513] hover:text-[#0D4634] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#DEE6E0] px-6 py-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-4 text-[15px] font-medium text-[#101513]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0D4634]"
            >
              Home
            </Link>
            <div>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#0D4634] font-semibold flex items-center justify-between"
              >
                <span>Products &amp; Platforms (23)</span>
              </Link>
              <div className="pl-3 py-1 space-y-1 border-l-2 border-[#DEE6E0] ml-1 mt-1 text-xs text-[#5B6761]">
                <Link href="/products#sector-intelligence" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0D4634]">Sector Intelligence</Link>
                <Link href="/products#ai-security" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0D4634]">AI &amp; Security Research</Link>
                <Link href="/products#enterprise-operations" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0D4634]">Enterprise &amp; Operations</Link>
                <Link href="/products#solutions" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0D4634]">Core Solutions</Link>
                <Link href="/products#ventures" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0D4634]">Digital Ventures</Link>
                <Link href="/products#affiliated" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0D4634]">Affiliated Businesses</Link>
                <Link href="/products#future-innovation" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#0D4634]">Future Innovation</Link>
              </div>
            </div>
            <Link
              href="/industries"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0D4634]"
            >
              Industries
            </Link>
            <Link
              href="/solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0D4634]"
            >
              Services &amp; Solutions
            </Link>
            <Link
              href="/ventures"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0D4634]"
            >
              Digital Ventures
            </Link>
            <div className="border-t border-[#DEE6E0] pt-4 flex flex-col space-y-2 text-[13.5px] text-[#5B6761]">
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-1">
                About Us
              </Link>
              <Link href="/partners" onClick={() => setMobileMenuOpen(false)} className="py-1">
                Partners &amp; Clients
              </Link>
              <Link href="/gallery" onClick={() => setMobileMenuOpen(false)} className="py-1">
                Media Gallery
              </Link>
              <Link href="/insights" onClick={() => setMobileMenuOpen(false)} className="py-1">
                Insights
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-1">
                Contact &amp; Inquiries
              </Link>
            </div>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full text-center bg-[#0D4634] hover:bg-[#2D735A] text-white py-3 rounded text-[14px] font-semibold tracking-wide"
            >
              Discuss Your Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
