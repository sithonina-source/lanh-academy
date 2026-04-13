'use client';

import React, { useState, useEffect } from 'react';

interface CountdownProps {
  endsAt: string; // ISO String
}

export default function Countdown({ endsAt }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const targetDate = new Date(endsAt).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [endsAt]);

  if (!timeLeft) return null;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#F0F8E8', border: '1px solid rgba(140, 198, 63, 0.4)', padding: '6px 10px', borderRadius: '6px', marginTop: '8px', maxWidth: '100%' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2D7A1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <span style={{ color: '#2D7A1F', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        Còn {timeLeft.days > 0 ? `${timeLeft.days} ngày ` : ''}
        {String(timeLeft.hours).padStart(2, '0')} giờ {String(timeLeft.minutes).padStart(2, '0')} phút
      </span>
    </div>
  );
}
