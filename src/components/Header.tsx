import React from 'react';
import { Compass, Sparkles, Headphones, Globe } from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';

interface HeaderProps {
  onJoinWaitlist: () => void;
  onOpenPodcast?: () => void;
  onOpenCrm?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onJoinWaitlist, onOpenPodcast }) => {
  const { language, setLanguage, t } = useLanguage();

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
              {t.header.prelaunchBadge}
            </span>
          </div>
          <span className="text-[11px] tracking-wider text-neutral-400 font-mono hidden sm:block">
            {t.header.brandSubtitle}
          </span>
        </div>
      </div>

      {/* Live Engine Indicator, How It Works Podcast, Language Switcher & Top CTA */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Switcher Pill */}
        <div className="flex items-center rounded-xl bg-neutral-950/80 border border-neutral-800/90 p-0.5 text-xs font-mono backdrop-blur-md shadow-md">
          <button
            type="button"
            onClick={() => setLanguage('no')}
            className={`px-2.5 py-1 rounded-lg transition font-bold text-[11px] cursor-pointer flex items-center gap-1 ${
              language === 'no'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Norsk (bokmål)"
          >
            <span>🇳🇴</span>
            <span>NO</span>
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded-lg transition font-bold text-[11px] cursor-pointer flex items-center gap-1 ${
              language === 'en'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="English"
          >
            <span>🇬🇧</span>
            <span>EN</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono bg-neutral-900/80 border border-neutral-800 backdrop-blur-md text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t.header.b2bActive}</span>
        </div>

        {/* How It Works Podcast Button */}
        <button
          type="button"
          data-action="open-podcast"
          onClick={onOpenPodcast}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-amber-400/40 hover:border-amber-400 bg-neutral-950/70 hover:bg-neutral-900/90 text-neutral-200 hover:text-amber-300 font-medium text-xs tracking-wide transition shadow-sm backdrop-blur-md cursor-pointer group"
          title={t.header.howItWorks}
        >
          <Headphones className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>{t.header.howItWorks}</span>
          <span className="hidden md:inline-block text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-400/15 text-amber-300 border border-amber-400/25">
            {t.header.podcastBadge}
          </span>
        </button>

        <button
          type="button"
          onClick={onJoinWaitlist}
          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-semibold text-xs tracking-wide shadow-md shadow-amber-500/20 transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.header.getEarlyAccess}</span>
        </button>
      </div>
    </header>
  );
};
