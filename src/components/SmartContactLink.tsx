'use client';

import React, { useState } from 'react';

interface Props {
  type: 'tel' | 'mailto';
  value: string;
  displayValue?: string;
  className?: string;
  children?: React.ReactNode;
  'aria-label'?: string;
}

export default function SmartContactLink({
  type,
  value,
  displayValue,
  className = '',
  children,
  'aria-label': ariaLabel,
}: Props) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cleanValue =
    type === 'tel'
      ? value.replace(/[^\d+]/g, '')
      : value.replace('mailto:', '').trim();

  const formattedDisplay = displayValue || value;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Detect mobile device
    const isMobileUA =
      typeof window !== 'undefined' &&
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const hasTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const isWide = typeof window !== 'undefined' && window.innerWidth > 768;

    const isDesktop = !isMobileUA && (isWide || !hasTouch);

    if (isDesktop) {
      e.preventDefault();
      const textToCopy =
        type === 'tel'
          ? (formattedDisplay.startsWith('+') ? formattedDisplay : `+${cleanValue}`)
          : cleanValue;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          triggerToast(`Copied ${textToCopy} to clipboard`);
        });
      } else {
        triggerToast(`Copied ${textToCopy} to clipboard`);
      }
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const href = type === 'tel' ? `tel:${cleanValue}` : `mailto:${cleanValue}`;

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        className={className}
        aria-label={ariaLabel || formattedDisplay}
      >
        {children || formattedDisplay}
      </a>

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-[999999] bg-[#0D4634] text-white px-5 py-3 rounded-[6px] shadow-2xl border border-[#E3AB72]/30 flex items-center gap-2 text-[13.5px] font-sans font-medium animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <svg
            className="w-4 h-4 text-[#E3AB72] flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
