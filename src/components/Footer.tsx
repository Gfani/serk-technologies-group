import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-[#101513] text-white font-sans">
      {/* Main 4-Column Balanced Grid */}
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Column 1: Brand & Visit Us */}
          <div className="flex flex-col">
            <Link href="/" className="inline-block w-[44px] h-[44px] mb-6">
              <Image
                src="/images/serk-logo-mark.png"
                alt="SERK Technologies Group Monogram"
                width={44}
                height={44}
                className="object-contain"
              />
            </Link>
            <h4 className="text-[14px] font-bold text-[#E3AB72] uppercase tracking-wider mb-2">
              VISIT US
            </h4>
            <p className="text-[13px] text-[#9AB4A9] leading-relaxed mb-4">
              Mekelle, Tigray, Ethiopia
              <br />
              Sovereign Digital Systems
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded border border-[#E3AB72] text-[#E3AB72] flex items-center justify-center hover:bg-[#E3AB72] hover:text-[#101513] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

          {/* Column 2: Explore (5 items) */}
          <div className="flex flex-col">
            <h4 className="text-[14.5px] font-bold text-white uppercase tracking-wider mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-[13.5px] text-[#CDE5DC]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/ventures" className="hover:text-white transition-colors">
                  Ventures
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (5 items) */}
          <div className="flex flex-col">
            <h4 className="text-[14.5px] font-bold text-white uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-[13.5px] text-[#CDE5DC]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-white transition-colors">
                  Partners &amp; Clients
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Media Gallery
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platforms (5 items) */}
          <div className="flex flex-col">
            <h4 className="text-[14.5px] font-bold text-white uppercase tracking-wider mb-5">
              Platforms
            </h4>
            <ul className="space-y-3 text-[13.5px] text-[#CDE5DC]">
              <li>
                <Link
                  href="/products/construction-intelligence-os"
                  className="hover:text-white transition-colors"
                >
                  Construction &amp; AI Estimator
                </Link>
              </li>
              <li>
                <Link href="/products/health-os" className="hover:text-white transition-colors">
                  Hospital Management System
                </Link>
              </li>
              <li>
                <Link href="/products/finance" className="hover:text-white transition-colors">
                  Finance &amp; Audit Engine
                </Link>
              </li>
              <li>
                <Link href="/products/pos-hospitality" className="hover:text-white transition-colors">
                  Smart Retail &amp; POS
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors">
                  Systems Architecture
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full-Width Flush Copyright Bar */}
      <div className="w-full bg-[#000000] border-t border-white/10 py-5">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
          <p className="text-[#9AB4A9]">
            Copyright &copy; {new Date().getFullYear()} SERK Technologies Group. All rights
            reserved. <span className="text-[#E3AB72]">&middot; Innovation with Integrity</span>
          </p>
          <div className="flex items-center space-x-4 text-[11.5px] text-[#7D978C]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>&middot;</span>
            <span className="hover:text-white transition-colors cursor-default">
              Security &amp; Compliance
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
