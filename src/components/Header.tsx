import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface HeaderProps {
  onJoinWaitlist: () => void;
  onOpenCrm?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onJoinWaitlist }) => {
  return (
    <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-amber-400/40 bg-neutral-950/70 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-lg shadow-black/50">
          <Compass className="w-5 h-5 text-amber-300 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-cinzel tracking-[0.2em] text-lg sm:text-xl font-bold uppercase text-neutral-100">
              Atlas
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-semibold tracking-widest px-2 py-0.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300">
              Prelaunch
            </span>
          </div>
          <span className="text-[11px] tracking-wider text-neutral-400 font-mono hidden sm:block">
            Private Closed-Loop Bedbank Wholesale
          </span>
        </div>
      </div>

      {/* Live Engine Indicator & Top CTA */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-neutral-900/80 border border-neutral-800 backdrop-blur-md text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>B2B Net Rates Active</span>
        </div>

        <button
          type="button"
          onClick={onJoinWaitlist}
          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-semibold text-xs tracking-wide shadow-md shadow-amber-500/20 transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get Early Access</span>
        </button>
      </div>
    </header>
  );
};
