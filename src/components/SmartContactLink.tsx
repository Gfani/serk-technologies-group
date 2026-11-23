'use client';

import React, { useState, useEffect } from 'react';

interface Props {
  type: 'phone' | 'email';
  value: string; // e.g. "+251 999 911 192" or "serktechgroup@gmail.com"
  className?: string;
  children?: React.ReactNode;
}

export function showContactToast(message: string) {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent('serk-contact-toast', { detail: { message } });
  window.dispatchEvent(event);
}

export default function SmartContactLink({ type, value, className = '', children }: Props) {
  const cleanValue = type === 'phone' ? value.replace(/\s+/g, '') : value.trim();
  const href = type === 'phone' ? `tel:${cleanValue}` : `mailto:${cleanValue}`;

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Detect mobile device
    const isMobile =
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
      ('ontouchstart' in window && window.innerWidth <= 768);

    if (isMobile) {
      // Allow native phone dialer or email client on mobile
      return;
    }

    // On desktop / non-touch: prevent "Pick an app" browser popup
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      showContactToast(
        type === 'phone'
          ? `Copied ${value} to clipboard`
          : `Copied ${value} to clipboard`
      );
    } catch (err) {
      // Fallback
      showContactToast(`Copied ${value}`);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children || value}
    </a>
  );
}

/**
 * Toast Container for Smart Contact clicks
 */
export function SmartContactToast() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string }>;
      setToastMessage(customEvent.detail.message);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    };

    // Attach global delegated click listener for any standard tel: or mailto: links
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      const isMobile =
        /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
        ('ontouchstart' in window && window.innerWidth <= 768);

      if (!isMobile) {
        if (href.startsWith('tel:')) {
          e.preventDefault();
          const rawNum = href.replace('tel:', '');
          const formatted = rawNum.startsWith('+251999911192') ? '+251 999 911 192' : rawNum;
          navigator.clipboard.writeText(formatted);
          handleToast(new CustomEvent('serk-contact-toast', { detail: { message: `Copied ${formatted} to clipboard` } }));
        } else if (href.startsWith('mailto:')) {
          e.preventDefault();
          const email = href.replace('mailto:', '').split('?')[0];
          navigator.clipboard.writeText(email);
          handleToast(new CustomEvent('serk-contact-toast', { detail: { message: `Copied ${email} to clipboard` } }));
        }
      }
    };

    window.addEventListener('serk-contact-toast', handleToast);
    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      window.removeEventListener('serk-contact-toast', handleToast);
      document.removeEventListener('click', handleDocumentClick, true);
      clearTimeout(timer);
    };
  }, []);

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[99999] flex items-center gap-2 px-4 py-2.5 bg-[#0D4634] text-white text-xs font-semibold rounded-[6px] shadow-xl border border-[#2D735A] transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
      style={{
        backgroundColor: '#0D4634',
        color: '#FFFFFF',
        borderRadius: '6px',
        boxShadow: '0 8px 24px rgba(13, 70, 52, 0.35)',
      }}
    >
      <svg
        className="w-4 h-4 text-[#A1D9C5] flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span>{toastMessage}</span>
    </div>
  );
}
