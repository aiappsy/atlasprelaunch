import React from 'react';
import {
  Building2,
  Plane,
  ShieldCheck,
  Palmtree,
  Sparkles,
  CheckCircle2,
  Gift,
  Coins,
  Anchor,
  ArrowRight,
  Utensils,
} from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { PerkExplainerTab } from './PerkExplainerModal';

interface TrustPillarsProps {
  onOpenPerkModal?: (tab: PerkExplainerTab) => void;
}

export const TrustPillars: React.FC<TrustPillarsProps> = ({ onOpenPerkModal }) => {
  const { t, language } = useLanguage();
  const isNo = language === 'no';

  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16 space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>{isNo ? 'OFFISIELT LEVERANDØRNETTVERK' : 'OFFICIAL SUPPLIER NETWORK'}</span>
        </div>
        <h3 className="font-cinzel text-xl sm:text-2xl font-bold uppercase tracking-wider text-neutral-100">
          {t.pillars.sectionTitle}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl mx-auto">
          {t.pillars.sectionSubtitle}
        </p>
      </div>

      {/* Featured 2 Flagship Allotments (Hotellpass & RVC with Direct Calculators) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Hotellpass 0 kr Rompris */}
        <div className="p-5 rounded-2xl bg-neutral-950/80 border border-rose-400/40 text-left backdrop-blur-md space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-400/20 text-rose-300 text-[10px] font-mono font-bold border border-rose-400/30">
              {isNo ? 'Founding Member Velkomstgave' : 'Founder Welcome Gift'}
            </span>
            <span className="text-xs font-mono font-black text-rose-300">
              {isNo ? 'Verdi inntil 4 500 kr' : 'Worth up to €400'}
            </span>
          </div>
          <div>
            <h4 className="text-base font-bold text-neutral-100 flex items-center gap-2">
              <Gift className="w-4 h-4 text-rose-400" />
              <span>{t.pillars.pillar3Title}</span>
            </h4>
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
              {t.pillars.pillar3Desc}
            </p>
          </div>
          <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-800">
            <span className="flex items-center gap-1 text-rose-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              {isNo ? 'Eksklusiv Founding-gave' : 'Exclusive Founder Gift'}
            </span>
            {onOpenPerkModal && (
              <button
                type="button"
                onClick={() => onOpenPerkModal('voucher')}
                className="inline-flex items-center gap-1 text-rose-300 hover:text-rose-200 font-mono font-bold text-[11px] underline decoration-rose-400/40 hover:decoration-rose-300 cursor-pointer"
              >
                <span>{isNo ? 'Se detaljer om oppholdet →' : 'View stay details →'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Card 2: RVC 7-Night Condos */}
        <div className="p-5 rounded-2xl bg-neutral-950/80 border border-emerald-400/40 text-left backdrop-blur-md space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-400/30">
              {isNo ? 'Fast Medlemsfordel for Familien' : 'Signature Family Perk'}
            </span>
            <span className="text-xs font-mono font-black text-emerald-300">
              {isNo ? 'Fra 3 490 kr / Uke' : 'From €299 / Week (fra 3 490 kr)'}
            </span>
          </div>
          <div>
            <h4 className="text-base font-bold text-neutral-100 flex items-center gap-2">
              <Palmtree className="w-4 h-4 text-emerald-400" />
              <span>{t.pillars.pillar4Title}</span>
            </h4>
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
              {t.pillars.pillar4Desc}
            </p>
          </div>
          <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-800">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isNo ? 'Spar opptil 16 000 kr vs Booking' : 'Save €1,350+ vs OTAs'}
            </span>
            {onOpenPerkModal && (
              <button
                type="button"
                onClick={() => onOpenPerkModal('rvc')}
                className="inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-mono font-bold text-[11px] underline decoration-emerald-400/40 hover:decoration-emerald-300 cursor-pointer"
              >
                <span>{isNo ? 'Beregn ukesbesparelse →' : 'Calculate savings →'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3 Core CommeResort Allotment Networkal Pillars: RateHawk/WebBeds, Duffel Flights, Rewards Vault Cruise */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: RateHawk & WebBeds Hotels */}
        <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 backdrop-blur-md text-left hover:border-amber-400/40 transition flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-neutral-100">
              {t.pillars.pillar1Title}
            </h4>
            <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
              {t.pillars.pillar1Desc}
            </p>
          </div>
          <div className="mt-4 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-amber-300 font-bold">
            <span>{isNo ? '0 kr påslag (Rå nettopris)' : '0 markup (Raw wholesale)'}</span>
            <span className="text-neutral-500 font-normal">20%–45% spar</span>
          </div>
        </div>

        {/* Pillar 2: Duffel NDC Flights */}
        <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 backdrop-blur-md text-left hover:border-sky-400/40 transition flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-300 mb-3">
              <Plane className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-neutral-100">
              {t.pillars.pillar2Title}
            </h4>
            <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
              {t.pillars.pillar2Desc}
            </p>
          </div>
          <div className="mt-4 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-sky-300 font-bold">
            <span>{isNo ? 'Null GDS-gebyrer' : 'Zero GDS fees'}</span>
            <span className="text-neutral-500 font-normal">Bagasje til kostpris</span>
          </div>
        </div>

        {/* Pillar 3: Rewards Vault (100% Cruise Rebate) */}
        <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 backdrop-blur-md text-left hover:border-indigo-400/40 transition flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-indigo-400/10 border border-indigo-400/30 flex items-center justify-center text-indigo-300 mb-3">
              <Anchor className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-neutral-100">
              {t.pillars.pillar5Title}
            </h4>
            <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
              {t.pillars.pillar5Desc}
            </p>
          </div>
          <div className="mt-4 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-indigo-300 font-bold">
            <span>{isNo ? '100% Provisjon til deg' : '100% Commission to you'}</span>
            <span className="text-neutral-500 font-normal">10%–16% spart</span>
          </div>
        </div>
      </div>
    </section>
  );
};
