'use client';

import React, { useState, useEffect } from 'react';

interface Props {
  title: string;
}

export default function AnimatedHeaderBanner({ title }: Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const typingSpeed = 85;
    const pauseFull = 2400;
    const pauseEmpty = 550;

    if (!isDeleting) {
      if (displayedText.length < title.length) {
        timeout = setTimeout(() => {
          setDisplayedText(title.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseFull);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(title.substring(0, displayedText.length - 1));
        }, 45);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
        }, pauseEmpty);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, title]);

  return (
    <div className="w-full bg-white border-b border-[#DEE6E0] py-9 px-4 text-center">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#101513] tracking-tight inline-flex items-center justify-center">
          <span>{displayedText}</span>
          <span className="text-[#0D4634] font-light ml-1 animate-pulse">|</span>
        </h1>
      </div>
    </div>
  );
}
