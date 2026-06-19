import React from 'react';

export function NainixLogo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="logoBorderGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="100%" stopColor="#7a7a7a" />
        </linearGradient>
        <linearGradient id="logoCircleGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d3d3d" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      <g transform="rotate(-12 50 50)">
        <rect x="12" y="12" width="76" height="76" rx="12" stroke="url(#logoBorderGrad)" strokeWidth="5.5" fill="transparent" />
        <circle cx="50" cy="31" r="11.5" fill="url(#logoCircleGrad)" />
        <circle cx="69" cy="50" r="11.5" fill="url(#logoCircleGrad)" />
        <circle cx="50" cy="69" r="11.5" fill="url(#logoCircleGrad)" />
        <circle cx="31" cy="50" r="11.5" fill="url(#logoCircleGrad)" />
      </g>
    </svg>
  );
}
