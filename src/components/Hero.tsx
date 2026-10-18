import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  Square,
  Volume2,
  VolumeX,
  Award,
  Gift,
  Plane,
  Bed,
  ShieldCheck,
} from 'lucide-react';
import { PerkExplainerTab } from './PerkExplainerModal';
import { useLanguage } from '../lib/i18n/LanguageContext';

interface HeroProps {
  onJoinWaitlist: () => void;
  onExploreSavings: () => void;
  onExploreFlights?: () => void;
  onExploreHotels?: () => void;
  onOpenPodcast?: () => void;
  onOpenPerkModal?: (tab: PerkExplainerTab) => void;
  isVideoPlaying?: boolean;
  isVideoMuted?: boolean;
  onToggleVideo?: () => void;
  onStopVideo?: () => void;
  onToggleMute?: () => void;
  onUnmuteAndRestart?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onJoinWaitlist,
  onExploreSavings,
  onExploreFlights,
  onExploreHotels,
  onOpenPodcast,
  onOpenPerkModal,
  isVideoPlaying = true,
  isVideoMuted = true,
  onToggleVideo,
  onStopVideo,
  onToggleMute,
  onUnmuteAndRestart,
}) => {
  const { t, isNorwegian } = useLanguage();

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-6 pb-12 overflow-hidden select-none bg-transparent">
      {/* Soft, Transparent Luxury Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-neutral-950/40 pointer-events-none" />

      {/* Top Floating Badge */}
      <div className="relative z-10 pt-2 animate-in fade-in duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-950/60 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-medium shadow-xl shadow-black/50">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{t.hero.topBadge}</span>
        </div>
      </div>

      {/* Center Hero: Translucent Minimalist Typography */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6 my-auto py-8">
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-100 leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          {t.hero.titleLine1} <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            {t.hero.titleLine2}
          </span>
        </h1>

        <p className="text-base sm:text-xl text-neutral-100 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] px-4">
          {t.hero.description}
        </p>


        {/* Primary Action Button Cluster: "See Your Savings" + "Claim Founder Spot" */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {/* Main Primary Button */}
          <button
            type="button"
            onClick={() => {
              onStopVideo?.();
              onExploreSavings();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-sm sm:text-base uppercase tracking-wider shadow-2xl shadow-amber-500/40 transition-all scale-100 hover:scale-105 cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Sparkles className="w-4 h-4 text-neutral-950" />
            <span>{t.hero.seeSavings}</span>
            <ArrowRight className="w-4 h-4 text-neutral-950" />
          </button>

          {/* Secondary Action: Join waiting list */}
          <button
            type="button"
            onClick={() => {
              onStopVideo?.();
              onJoinWaitlist();
            }}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-neutral-950/70 hover:bg-neutral-900 border border-amber-400/40 hover:border-amber-400 text-amber-300 font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md shadow-xl transition-all scale-100 hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>{t.hero.claimFounder}</span>
          </button>
        </div>

        {/* Zero-Risk Reassurance: Free to reserve, no card required */}
        <div className="pt-1 flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-amber-300 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] animate-in fade-in duration-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {isNorwegian
              ? 'Reserver din Founding Member-plass i dag – helt gratis, intet kredittkort nødvendig.'
              : 'Reserve your Founding Member spot today for free, no credit card necessary.'}
          </span>
        </div>

        {/* Scarcity Banner: 100 Founder Spots Available with Free Hotel Stay */}
        <div className="pt-2 space-y-2 animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold shadow-lg shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>
              {isNorwegian
                ? '🎁 Kun 100 plasser • Inkluderer gratis 3-dagers hotellopphold for 2 + 3 vinner all mat dekket!'
                : '🎁 Strictly 100 Spots • Includes Free 3-Day Hotel Break for 2 + 3 Win All Meals Included!'}
            </span>
          </div>

          {/* Scarcity / Waiting List Warning */}
          <p className="text-[11px] sm:text-xs text-amber-200/90 font-mono font-medium max-w-xl mx-auto px-2">
            {isNorwegian
              ? '⏳ Merk: Dersom du ikke fullfører og aktiverer ditt Founding Membership, overføres tilbudet og det gratis hotelloppholdet automatisk til neste person på ventelisten.'
              : '⏳ Note: If you do not activate your Founding Membership, this offer and your complimentary hotel stay will be forfeited and passed to the next person on the waitlist.'}
          </p>

          {/* Quick Explainer & Calculator Triggers */}
          {onOpenPerkModal && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => onOpenPerkModal('connex')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/30 hover:border-rose-400 text-rose-300 transition cursor-pointer"
              >
                <span>🍷</span>
                <span>{isNorwegian ? 'Connex: 0 kr Rompris (Kalkulator)' : 'Connex: $0 Room Rate (Calculator)'}</span>
                <span className="text-[10px] text-rose-400">↗</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenPerkModal('rvc')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 hover:border-amber-400 text-amber-300 transition cursor-pointer"
              >
                <span>🏖️</span>
                <span>{isNorwegian ? 'RVC: 7 Netter 3 490 kr (Kalkulator)' : 'RVC: 7-Night Condos $320 (Calculator)'}</span>
                <span className="text-[10px] text-amber-400">↗</span>
              </button>
            </div>
          )}
        </div>

        {/* Direct Action Tabs: Dedicated Flights vs Hotels Savings Jumpers */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={onExploreFlights || onExploreSavings}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-sky-400/50 hover:border-sky-300 text-xs font-mono text-sky-300 font-semibold transition-all cursor-pointer shadow-lg backdrop-blur-md group"
          >
            <Plane className="w-4 h-4 text-sky-400" />
            <span>{isNorwegian ? '✈️ Beregn flybesparelser (~15–24% netto)' : '✈️ Calculate Flight Savings (~15–24% Net)'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onExploreHotels || onExploreSavings}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-amber-400/50 hover:border-amber-300 text-xs font-mono text-amber-300 font-semibold transition-all cursor-pointer shadow-lg backdrop-blur-md group"
          >
            <Bed className="w-4 h-4 text-amber-400" />
            <span>{isNorwegian ? '🏨 Beregn hotellbesparelser (Opptil 45% netto)' : '🏨 Calculate Hotel Savings (Up to 45% Net)'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Video & Sound Controls Bar */}
        <div className="pt-3 flex items-center justify-center gap-2.5 flex-wrap">
          {/* Stop / Resume Video Button */}
          <button
            type="button"
            data-action="toggle-video"
            onClick={onToggleVideo}
            className="px-4 py-2 rounded-full border border-neutral-700 bg-neutral-950/70 hover:bg-neutral-900 text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-2 transition-all shadow-xl backdrop-blur-md cursor-pointer"
          >
            {isVideoPlaying ? (
              <>
                <Square className="w-3 h-3 fill-red-400 text-red-400" />
                <span className="font-semibold">{isNorwegian ? 'Stopp video' : 'Stop Video'}</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-amber-300 text-amber-300" />
                <span className="font-semibold text-amber-300">{isNorwegian ? 'Start video & lyd' : 'Play Video & Sound'}</span>
              </>
            )}
          </button>

          {/* Audio Controller Indicator */}
          <button
            type="button"
            data-action="toggle-audio"
            onClick={isVideoPlaying ? onToggleMute : onUnmuteAndRestart}
            className={`px-4 py-2 rounded-full border text-xs font-mono flex items-center gap-2.5 transition-all shadow-xl backdrop-blur-md cursor-pointer ${
              !isVideoMuted
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-emerald-400/20 ring-1 ring-emerald-400/50'
                : 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-amber-400/20 hover:bg-amber-500/30 animate-pulse'
            }`}
            title={!isVideoMuted ? (isNorwegian ? 'Demp lanseringsbriefing' : 'Mute Launch Briefing') : (isNorwegian ? 'Spill av lanseringsbriefing' : 'Play Launch Briefing')}
          >
            {!isVideoMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="font-semibold text-emerald-300">
                  {isNorwegian ? 'Lanseringsbriefing aktiv (ATLAS)' : 'Launch Briefing Active (ATLAS)'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                <span className="text-amber-300 font-bold">
                  {isNorwegian ? '🔊 Hør lanseringsintroduksjonen' : '🔊 Listen to Launch Briefing'}
                </span>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-400/25 px-1.5 py-0.5 rounded">
                  1:20
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Floating Bar: 2 Core Guarantees & Live Destination */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-300">
        {/* Left: Free Hotel Stay + 3 All-Inclusive Meals Winners */}
        <div className="flex items-center gap-3 bg-neutral-950/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-neutral-800/80 shadow-lg">
          <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Gift className="w-3.5 h-3.5" />
            {isNorwegian ? 'Gratis 3-dagers hotellopphold for 2' : 'Free 3-Day Hotel Break for 2'}
          </span>
          <span className="text-neutral-600">•</span>
          <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            {isNorwegian ? '3 vinnere får også maten gratis' : '3 Winners Get All Meals Free'}
          </span>
        </div>

        {/* Right: Live Luxury Destination Pill */}
        <div className="flex items-center gap-2 bg-neutral-950/60 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-neutral-800/80 text-[11px] shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-neutral-300 font-medium">White Dunes Luxury Suites • Paros</span>
          <span className="text-neutral-600">•</span>
          <span className="text-emerald-400 font-bold">{isNorwegian ? 'Spar 45% netto' : 'Save 45% Net'}</span>
        </div>
      </div>
    </section>
  );
};
