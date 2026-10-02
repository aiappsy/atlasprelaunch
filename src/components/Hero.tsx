import React from 'react';
import { Sparkles, Gift, Award, ShieldCheck, ArrowRight, CheckCircle2, Play } from 'lucide-react';

interface HeroProps {
  onJoinWaitlist: () => void;
  onOpenVideo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinWaitlist, onOpenVideo }) => {
  return (
    <section className="relative z-10 pt-4 pb-8 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* Exclusivity / Launch Concept Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/95 border border-amber-400/50 text-amber-200 text-xs sm:text-sm font-medium backdrop-blur-md shadow-lg shadow-black/40 mb-5">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="font-semibold">Bypass Up To 45% Public Retail Markups • Rate Parity Exempt</span>
      </div>

      {/* High-Conviction Hero Headline */}
      <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-100 leading-[1.12] mb-5 drop-shadow-lg">
        Sovereign Travel. <br />
        <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent">
          Never Pay Retail Markups Again.
        </span>
      </h1>

      {/* Conviction-Driven Value Proposition */}
      <p className="text-sm sm:text-lg text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed mb-6">
        Every luxury hotel and villa worldwide has two prices: the inflated retail price shown to the public on Booking.com and Expedia to subsidize TV ads... and the private wholesale rate reserved for institutional insiders. ATLAS is <strong>100% exempt from Rate Parity contracts</strong>, connecting members directly to institutional bedbanks (Hotelbeds, WebBeds) at net wholesale pricing—<strong>saving you up to 45% net</strong> on every single journey.
      </p>

      {/* Primary Action Button Cluster: Claim Spot + Watch 4K Opener */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
        <button
          type="button"
          onClick={onJoinWaitlist}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-neutral-950" />
          <span>Lock In Half Price For Life (Join Waiting List)</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {onOpenVideo && (
          <button
            type="button"
            onClick={onOpenVideo}
            className="px-5 py-3.5 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 border border-amber-400/40 hover:border-amber-400 text-neutral-100 font-semibold text-xs sm:text-sm transition shadow-lg shadow-black/50 cursor-pointer flex items-center gap-2.5 group"
          >
            <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
              <Play className="w-3 h-3 fill-amber-300 text-amber-300 ml-0.5" />
            </div>
            <span>Play Opener (Voiceover & Music)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30">
              4K
            </span>
          </button>
        )}
      </div>

      {/* ========================================================= */}
      {/* EXCLUSIVE FOUNDER MEMBER BENEFIT BANNER (HIGH CONVICTION) */}
      {/* ========================================================= */}
      <div className="w-full max-w-3xl mx-auto mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-neutral-900/90 to-amber-500/20 border-2 border-amber-400/70 shadow-2xl shadow-amber-500/10 backdrop-blur-xl text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-400/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shrink-0 shadow-lg">
              <Award className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded border border-amber-400/30">
                Limited Prelaunch Allocation
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-neutral-100 mt-1">
                Founder Member Early Access Privilege
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {onOpenVideo && (
              <button
                type="button"
                onClick={onOpenVideo}
                className="px-3.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
                title="Play Video Opener"
              >
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Opener</span>
              </button>
            )}

            <button
              type="button"
              onClick={onJoinWaitlist}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 transition cursor-pointer flex items-center gap-2 shrink-0"
            >
              <span>Claim Spot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2 Core Founder Member Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {/* Guarantee 1: Half Price for Life */}
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-100">
                Lock In Half Price for Life
              </h4>
              <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
                Every member joining the prelaunch waiting list permanently locks in a 50% lifetime discount on club membership. Never pay full price.
              </p>
            </div>
          </div>

          {/* Guarantee 2: 5 Free Lifetime Memberships */}
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-amber-200">
                Win 1 of 5 Free Lifetime Memberships
              </h4>
              <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
                5 lucky founder members on the waiting list will be selected in a random launch draw to receive 100% free lifetime membership with zero annual dues forever.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Micro-Row */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-neutral-400 font-mono">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          Zero Retail Markup
        </span>
        <span className="hidden sm:inline text-neutral-700">•</span>
        <span>100% Rate Parity Exempt</span>
        <span className="hidden sm:inline text-neutral-700">•</span>
        <span>Hotelbeds & WebBeds Settlement</span>
        <span className="hidden sm:inline text-neutral-700">•</span>
        <span>4 Family Passes Included</span>
      </div>
    </section>
  );
};
