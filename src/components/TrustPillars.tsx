import React from 'react';
import { Building2, Plane, ShieldCheck, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';

export const TrustPillars: React.FC = () => {
  const { t, language } = useLanguage();
  const isNo = language === 'no';

  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16 space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-cinzel text-xl sm:text-2xl font-bold uppercase tracking-wider text-neutral-100">
          {t.pillars.sectionTitle}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          {t.pillars.sectionSubtitle}
        </p>
      </div>

      {/* Featured Distressed Inventory Allotments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: 7-Night Condos */}
        <div className="p-5 rounded-2xl bg-neutral-950/80 border border-amber-400/40 text-left backdrop-blur-md space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-400/30">
              {isNo ? '7 Netters Ukesopphold' : '7-Night Condo Stays'}
            </span>
            <span className="text-xs font-mono font-black text-amber-300">
              {isNo ? '3 490 NOK / Uke' : '$320 USD / Week'}
            </span>
          </div>
          <div>
            <h4 className="text-base font-bold text-neutral-100 flex items-center gap-2">
              <span>🏖️</span>
              <span>Atlas Signature Resorts</span>
            </h4>
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
              {isNo
                ? 'Hele ferieleiligheter (1–2 soverom med fullt kjøkken) for opptil 4–6 personer i Marbella, Tenerife, Algarve, Kreta og Toscana. Fast totalpris på 3 490 kr for alle 7 netter, uten per-person tillegg.'
                : 'Whole-condo accommodations (1-2 bedrooms, full kitchen, sleeps up to 4-6 guests) in Marbella, Tenerife, Algarve, Crete, and Tuscany. Flat 3,490 NOK ($320 USD) for the entire 7 nights.'}
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-neutral-400 pt-1 border-t border-neutral-800">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isNo ? '14 dagers angrefrist' : '14-Day Money Back'}
            </span>
            <span>•</span>
            <span>{isNo ? 'Spar opptil 12 000 kr' : 'Save $1,100+ vs OTAs'}</span>
          </div>
        </div>

        {/* Card 2: 0 kr Spa Escapes */}
        <div className="p-5 rounded-2xl bg-neutral-950/80 border border-rose-400/40 text-left backdrop-blur-md space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-400/20 text-rose-300 text-[10px] font-mono font-bold border border-rose-400/30">
              {isNo ? '0 kr Rompris' : '$0 Room Rate'}
            </span>
            <span className="text-xs font-mono font-black text-rose-300">
              {isNo ? '0 NOK Rom (500 pts)' : '$0 Room (500 pts)'}
            </span>
          </div>
          <div>
            <h4 className="text-base font-bold text-neutral-100 flex items-center gap-2">
              <span>🍷</span>
              <span>Atlas Gourmet &amp; Spa Escapes</span>
            </h4>
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
              {isNo
                ? 'Gratis hotellopphold for 2 personer på 3–4* boutique- og velværerhoteller i Dolomittene, Schwarzwald, Provence og Toscana. Du betaler kun hotellets faste, rimelige halvpensjonspris ved utsjekk.'
                : 'Complimentary lodging for 2 guests at 3-4* boutique and wellness hotels across the Alps, Dolomites, and Tuscany. Guests only pay the hotel\'s published fixed half-board at checkout.'}
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-neutral-400 pt-1 border-t border-neutral-800">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isNo ? 'Umiddelbar verdikupong' : 'Instant Digital Voucher'}
            </span>
            <span>•</span>
            <span>{isNo ? 'Spar over 6 700 kr' : 'Save $650+ vs Booking'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar 1: Hotels */}
        <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 backdrop-blur-md text-left hover:border-amber-400/40 transition">
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

        {/* Pillar 2: Duffel NDC Flights */}
        <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 backdrop-blur-md text-left hover:border-amber-400/40 transition">
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

        {/* Pillar 3: EU Travel Protection & EU261 */}
        <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 backdrop-blur-md text-left hover:border-amber-400/40 transition">
          <div className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-semibold text-neutral-100">
            {t.pillars.pillar3Title}
          </h4>
          <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
            {t.pillars.pillar3Desc}
          </p>
        </div>

        {/* Pillar 4: 4 Family Passes */}
        <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 backdrop-blur-md text-left hover:border-amber-400/40 transition">
          <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-semibold text-neutral-100">
            {t.pillars.pillar4Title}
          </h4>
          <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
            {t.pillars.pillar4Desc}
          </p>
        </div>
      </div>
    </section>
  );
};
