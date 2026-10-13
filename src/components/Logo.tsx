import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  showTagline = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Dynamic S Intertwined Skill Exchange Symbol */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 shadow-md p-1.5 shrink-0 border border-indigo-500/20`}
      >
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          {/* Upper curve (electric cyan/blue) with exchange arrow */}
          <path
            d="M44 14C32 14 20 20 20 30C20 36 28 38 36 40C46 42 48 48 44 54"
            stroke="url(#synecta-cyan)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M41 10L47 14L41 18"
            stroke="url(#synecta-cyan)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Lower curve (warm amber/orange) with return exchange arrow */}
          <path
            d="M20 50C32 50 44 44 44 34C44 28 36 26 28 24C18 22 16 16 20 10"
            stroke="url(#synecta-orange)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M23 54L17 50L23 46"
            stroke="url(#synecta-orange)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <defs>
            <linearGradient id="synecta-cyan" x1="20" y1="10" x2="48" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
            <linearGradient id="synecta-orange" x1="44" y1="54" x2="16" y2="10" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight text-slate-900 ${textSizes[size]}`}
              style={{ letterSpacing: '-0.03em' }}
            >
              SYNECTA
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              PROTOTYPE
            </span>
          </div>
          {showTagline && (
            <span className="text-[11px] font-medium text-slate-500 tracking-normal mt-1">
              Connect Skills. Create Opportunities.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
