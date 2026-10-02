import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Play, Shield, Award } from 'lucide-react';
import { heroAudio } from '../lib/heroAudio';

interface CinematicEntranceProps {
  onEnterWithSound: () => void;
  onEnterSilent: () => void;
}

export const CinematicEntrance: React.FC<CinematicEntranceProps> = ({
  onEnterWithSound,
  onEnterSilent,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  // If already entered in this session, don't show curtain
  useEffect(() => {
    const entered = sessionStorage.getItem('atlas_entered_experience');
    if (entered === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleSoundEntry = () => {
    sessionStorage.setItem('atlas_entered_experience', 'true');
    setIsFading(true);
    // Trigger sound inside the user gesture
    heroAudio.restart();
    onEnterWithSound();
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  const handleSilentEntry = () => {
    sessionStorage.setItem('atlas_entered_experience', 'true');
    setIsFading(true);
    onEnterSilent();
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-xl transition-opacity duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-neutral-950/95 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg bg-neutral-900/90 border border-amber-400/40 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/95 text-center space-y-6">
        {/* Crest */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400/20 via-neutral-900 to-neutral-950 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-xl shadow-amber-400/10">
          <Sparkles className="w-8 h-8 text-amber-300" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 block font-semibold">
            Private Sovereign Travel Registry
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold uppercase tracking-wider text-neutral-100">
            Atlas Travel Club
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed pt-1">
            Experience our 38-second cinematic overview with full voiceover & soundtrack explaining why public hotel rates are rigged.
          </p>
        </div>

        {/* Big Golden Entrance Button */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            data-action="toggle-audio"
            onClick={handleSoundEntry}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-sm uppercase tracking-wider shadow-2xl shadow-amber-500/30 transition-all scale-100 hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-3 animate-pulse"
          >
            <Volume2 className="w-5 h-5 text-neutral-950 shrink-0" />
            <span>Enter Experience With Sound</span>
            <span className="text-xs bg-neutral-950/20 px-2 py-0.5 rounded font-mono font-bold">0:38</span>
          </button>

          <button
            type="button"
            onClick={handleSilentEntry}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-neutral-200 transition cursor-pointer pt-1"
          >
            <VolumeX className="w-3.5 h-3.5" />
            <span>Continue in Silence</span>
          </button>
        </div>

        {/* Founder Guarantees Pill */}
        <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-center gap-3 text-[11px] font-mono text-neutral-400">
          <span className="text-amber-300">✓ 50% Off Lifetime Rate Lock</span>
          <span>•</span>
          <span className="text-emerald-400">✓ 5 Free Memberships Draw</span>
        </div>
      </div>
    </div>
  );
};
