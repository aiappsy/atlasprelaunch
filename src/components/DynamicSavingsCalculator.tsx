import React, { useState } from 'react';
import {
  Calculator,
  Users,
  Building,
  ArrowRight,
  Sparkles,
  Plane,
  Bed,
  ShieldCheck,
  Gift,
  Palmtree,
  Utensils,
  Plus,
  Minus,
  Check,
} from 'lucide-react';
import {
  CurrencyCode,
  CURRENCIES,
  CalculationResult,
  formatCurrencyValue,
} from '../lib/calculatorModel';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { PerkExplainerTab } from './PerkExplainerModal';

export type CalculatorMode = 'package' | 'flights' | 'hotels';
export type TravelProfileId = 'couple' | 'family' | 'globetrotter' | 'custom';

interface DynamicSavingsCalculatorProps {
  onUnlockSavings: (savings: CalculationResult) => void;
  onCalculationTrigger?: () => void;
  onOpenPerkModal?: (tab: PerkExplainerTab) => void;
  initialMode?: string;
}

export const DynamicSavingsCalculator: React.FC<DynamicSavingsCalculatorProps> = ({
  onUnlockSavings,
  onCalculationTrigger,
  onOpenPerkModal,
}) => {
  const { isNorwegian } = useLanguage();
  const [currency, setCurrency] = useState<CurrencyCode>(isNorwegian ? 'NOK' : 'USD');
  const [profile, setProfile] = useState<TravelProfileId>('family');

  // Custom adjustments (when user clicks custom or fine-tunes)
  const [tripsPerYear, setTripsPerYear] = useState<number>(3);
  const [peopleTravelling, setPeopleTravelling] = useState<number>(4);
  const [includeFlights, setIncludeFlights] = useState<boolean>(true);
  const [includeRvcResort, setIncludeRvcResort] = useState<boolean>(true);

  // Switch profiles
  const handleSelectProfile = (selected: TravelProfileId) => {
    setProfile(selected);
    if (selected === 'couple') {
      setTripsPerYear(2);
      setPeopleTravelling(2);
      setIncludeFlights(true);
      setIncludeRvcResort(false);
    } else if (selected === 'family') {
      setTripsPerYear(3);
      setPeopleTravelling(4);
      setIncludeFlights(true);
      setIncludeRvcResort(true);
    } else if (selected === 'globetrotter') {
      setTripsPerYear(5);
      setPeopleTravelling(2);
      setIncludeFlights(true);
      setIncludeRvcResort(false);
    }
    onCalculationTrigger?.();
  };

  // Rates calculation in USD
  const curr = CURRENCIES[currency];

  // Base calculation math:
  // 1. Hotel component: Average 4-star room is $320 retail vs $230 wholesale net (saves $90/night)
  const nightsPerTrip = profile === 'family' ? 6 : profile === 'globetrotter' ? 5 : 4;
  const totalNights = tripsPerYear * nightsPerTrip;
  const roomCount = peopleTravelling <= 2 ? 1 : peopleTravelling <= 4 ? 2 : 3;
  
  const baseHotelRetailUSD = totalNights * 320 * (roomCount * 0.9);
  const baseHotelWholesaleUSD = totalNights * 230 * (roomCount * 0.9);

  // 2. Flight component: $450 retail vs $380 Duffel NDC net (saves $70/ticket)
  const totalFlights = includeFlights ? tripsPerYear * peopleTravelling : 0;
  const flightRetailUSD = totalFlights * 450;
  const flightWholesaleUSD = totalFlights * 380;

  // 3. RVC 7-night family resort suite: $1,800 retail vs $320 flat rate (saves $1,480)
  const rvcRetailUSD = includeRvcResort ? 1800 : 0;
  const rvcWholesaleUSD = includeRvcResort ? 320 : 0;

  // Combined totals
  const totalRetailUSD = baseHotelRetailUSD + flightRetailUSD + rvcRetailUSD;
  const totalWholesaleUSD = baseHotelWholesaleUSD + flightWholesaleUSD + rvcWholesaleUSD;
  const totalSavingsUSD = totalRetailUSD - totalWholesaleUSD;

  // Converted to active currency
  const totalRetail = totalRetailUSD * curr.rateFromUSD;
  const totalWholesale = totalWholesaleUSD * curr.rateFromUSD;
  const totalSavings = totalSavingsUSD * curr.rateFromUSD;
  const savingsPct = Math.round((totalSavings / Math.max(1, totalRetail)) * 100);

  // Format strings
  const formattedRetail = formatCurrencyValue(totalRetail, currency);
  const formattedWholesale = formatCurrencyValue(totalWholesale, currency);
  const formattedSavings = formatCurrencyValue(totalSavings, currency);

  // ROI vs membership fee (1 290 NOK)
  const annualMembershipFee = currency === 'NOK' ? 1290 : currency === 'EUR' ? 115 : currency === 'GBP' ? 99 : 125;
  const roiMultiplier = Math.max(1, Math.round(totalSavings / annualMembershipFee));

  // Build result object for waitlist modal
  const calculationResult: CalculationResult = {
    totalNights,
    totalFlightTickets: totalFlights,
    roomMultiplier: roomCount,
    retailTotal: totalRetail,
    wholesaleTotal: totalWholesale,
    hotelSavings: (baseHotelRetailUSD - baseHotelWholesaleUSD + (rvcRetailUSD - rvcWholesaleUSD)) * curr.rateFromUSD,
    flightSavings: (flightRetailUSD - flightWholesaleUSD) * curr.rateFromUSD,
    annualSavings: totalSavings,
    savingsPercentage: savingsPct,
    equivalentNights: Math.round(totalSavingsUSD / 230),
    equivalentFlights: Math.max(1, Math.floor(totalSavingsUSD / 380)),
    formattedRetail,
    formattedWholesale,
    formattedSavings,
    formattedHotelSavings: formatCurrencyValue((baseHotelRetailUSD - baseHotelWholesaleUSD) * curr.rateFromUSD, currency),
    formattedFlightSavings: formatCurrencyValue((flightRetailUSD - flightWholesaleUSD) * curr.rateFromUSD, currency),
  };

  return (
    <div
      id="visual-savings-calculator"
      className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16 scroll-mt-24"
    >
      <div className="relative rounded-3xl border border-amber-400/40 bg-neutral-950/90 backdrop-blur-2xl p-5 sm:p-8 md:p-10 shadow-2xl shadow-black/90 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header & Currency */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono mb-2">
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>{isNorwegian ? 'ENKEL REISEKALKULATOR' : 'INSTANT TRAVEL CALCULATOR'}</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase tracking-wide text-neutral-100">
              {isNorwegian ? 'Hvor mye sparer du med ATLAS?' : 'How Much Will You Save With Atlas?'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              {isNorwegian
                ? 'Velg din reiseprofil med ett klikk for å se din årlige besparelse når kommersielle provisjoner kuttes til 0 kr.'
                : 'Select your typical travel profile in 1 click to calculate your annual savings when retail commissions are eliminated.'}
            </p>
          </div>

          {/* Clean Currency Selector */}
          <div className="flex items-center gap-1.5 self-start md:self-auto bg-neutral-900/90 p-1.5 rounded-xl border border-neutral-800">
            <span className="text-[11px] font-mono text-neutral-400 pl-2 pr-1">
              {isNorwegian ? 'Valuta:' : 'Currency:'}
            </span>
            {(['NOK', 'EUR', 'USD', 'GBP'] as CurrencyCode[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition cursor-pointer ${
                  currency === c
                    ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20 font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 1: 3 ONE-CLICK LIFESTYLE PROFILES */}
        <div className="pt-6 pb-4">
          <label className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-300 block mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span>{isNorwegian ? '1. Velg din reisetype (1 klikk):' : '1. Choose your travel profile (1 click):'}</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Profile 1: Par / Weekend */}
            <button
              type="button"
              onClick={() => handleSelectProfile('couple')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                profile === 'couple'
                  ? 'bg-amber-400/15 border-amber-400/90 shadow-xl shadow-amber-400/15 ring-1 ring-amber-400/60'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 text-neutral-300'
              }`}
            >
              {profile === 'couple' && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
              <div className="text-xl mb-1.5">🥂</div>
              <div className="text-sm font-bold text-neutral-100">{isNorwegian ? 'Par & Weekend' : 'Couples & Weekends'}</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">
                {isNorwegian ? '2 personer • 2 reiser i året' : '2 guests • 2 trips/year'}
              </div>
              <div className="text-[10px] font-mono text-amber-300 font-bold mt-2 pt-2 border-t border-neutral-800">
                {isNorwegian ? '4-stjerners hoteller + fly' : '4-star hotels + flights'}
              </div>
            </button>

            {/* Profile 2: Familieferie (POPULAR) */}
            <button
              type="button"
              onClick={() => handleSelectProfile('family')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                profile === 'family'
                  ? 'bg-amber-400/15 border-amber-400/90 shadow-xl shadow-amber-400/15 ring-1 ring-amber-400/60'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 text-neutral-300'
              }`}
            >
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold border border-emerald-500/30">
                {isNorwegian ? 'MEST POPULÆR' : 'MOST POPULAR'}
              </div>
              {profile === 'family' && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
              <div className="text-xl mb-1.5">👨‍👩‍👧‍👦</div>
              <div className="text-sm font-bold text-neutral-100">{isNorwegian ? 'Familie (4 personer)' : 'Family (4 Guests)'}</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">
                {isNorwegian ? '1 sommeruke (RVC) + høsttur' : '1 summer resort + fall getaway'}
              </div>
              <div className="text-[10px] font-mono text-emerald-300 font-bold mt-2 pt-2 border-t border-neutral-800">
                {isNorwegian ? 'Maksimal ukesbesparelse' : 'Maximum family yield'}
              </div>
            </button>

            {/* Profile 3: Globetrotter */}
            <button
              type="button"
              onClick={() => handleSelectProfile('globetrotter')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                profile === 'globetrotter'
                  ? 'bg-amber-400/15 border-amber-400/90 shadow-xl shadow-amber-400/15 ring-1 ring-amber-400/60'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 text-neutral-300'
              }`}
            >
              {profile === 'globetrotter' && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
              <div className="text-xl mb-1.5">✈️</div>
              <div className="text-sm font-bold text-neutral-100">{isNorwegian ? 'Globetrotter & Luksus' : 'Globetrotter Luxury'}</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">
                {isNorwegian ? '2 personer • 5 reiser i året' : '2 guests • 5 trips/year'}
              </div>
              <div className="text-[10px] font-mono text-sky-300 font-bold mt-2 pt-2 border-t border-neutral-800">
                {isNorwegian ? '5-stjerners hoteller + fly' : '5-star resorts + flights'}
              </div>
            </button>
          </div>
        </div>

        {/* STEP 2: SIMPLE ADJUSTMENT CONTROLS */}
        <div className="pt-2 pb-5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 bg-neutral-900/40 p-3.5 rounded-2xl">
          {/* Quick Stepper: Trips */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-300 font-medium">
              {isNorwegian ? 'Reiser i året:' : 'Trips/year:'}
            </span>
            <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-800 rounded-xl p-1">
              <button
                type="button"
                onClick={() => {
                  setTripsPerYear((prev) => Math.max(1, prev - 1));
                  setProfile('custom');
                }}
                className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center cursor-pointer transition"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-mono font-bold text-amber-300">
                {tripsPerYear}
              </span>
              <button
                type="button"
                onClick={() => {
                  setTripsPerYear((prev) => Math.min(10, prev + 1));
                  setProfile('custom');
                }}
                className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center cursor-pointer transition"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Stepper: Persons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-300 font-medium">
              {isNorwegian ? 'Reisende:' : 'Guests:'}
            </span>
            <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-800 rounded-xl p-1">
              <button
                type="button"
                onClick={() => {
                  setPeopleTravelling((prev) => Math.max(1, prev - 1));
                  setProfile('custom');
                }}
                className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center cursor-pointer transition"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-mono font-bold text-amber-300">
                {peopleTravelling}
              </span>
              <button
                type="button"
                onClick={() => {
                  setPeopleTravelling((prev) => Math.min(8, prev + 1));
                  setProfile('custom');
                }}
                className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center cursor-pointer transition"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Simple Toggles */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIncludeFlights(!includeFlights);
                setProfile('custom');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer flex items-center gap-1.5 ${
                includeFlights
                  ? 'bg-sky-400/20 border border-sky-400 text-sky-300 font-bold'
                  : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
              }`}
            >
              <Plane className="w-3 h-3" />
              <span>{isNorwegian ? 'Inkluder fly' : 'Include flights'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIncludeRvcResort(!includeRvcResort);
                setProfile('custom');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer flex items-center gap-1.5 ${
                includeRvcResort
                  ? 'bg-emerald-400/20 border border-emerald-400 text-emerald-300 font-bold'
                  : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
              }`}
            >
              <Palmtree className="w-3 h-3" />
              <span>{isNorwegian ? '1 RVC leilighetsuke' : '1 RVC resort week'}</span>
            </button>
          </div>
        </div>

        {/* STEP 3: THE LIVE COMPARISON & RESULTS */}
        <div className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* Left: The Simple Price Receipt */}
            <div className="md:col-span-6 flex flex-col justify-between p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-semibold mb-2">
                  {isNorwegian ? 'Prissammenligning for dine reiser:' : 'Price Comparison for Your Travel:'}
                </span>

                {/* Public Retail Price */}
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wide block">
                      {isNorwegian ? 'Pris på Booking.com & åpne sider' : 'Price on Booking.com & Public Sites'}
                    </span>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-neutral-400 line-through decoration-red-400/80">
                      {formattedRetail}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-neutral-500 font-mono">
                    {isNorwegian ? 'Inkluderer 20%–45% påslag' : 'Includes 20%–45% markups'}
                  </div>
                </div>

                {/* Atlas Member Wholesale Price */}
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-amber-400/40 flex items-center justify-between shadow-lg shadow-black/40">
                  <div>
                    <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wide block font-semibold">
                      {isNorwegian ? 'Din pris som ATLAS-medlem' : 'Your ATLAS Member Price'}
                    </span>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">
                      {formattedWholesale}
                    </div>
                  </div>
                  <div className="text-right text-xs font-mono text-amber-300 font-bold bg-amber-400/10 px-2 py-1 rounded border border-amber-400/30">
                    {isNorwegian ? '0 kr påslag (Nettopris)' : '0 markup (Net)'}
                  </div>
                </div>
              </div>

              {/* Informative Note */}
              <div className="text-[11px] text-neutral-400 leading-relaxed font-light">
                {isNorwegian
                  ? 'Beregnet på rå engrospriser. Hoteller og fly aktiveres for live-booking ved offisiell lansering 4. januar 2027.'
                  : 'Modeled on raw wholesale rates. Live hotel and airline inventory activates at official launch on Jan 4, 2027.'}
              </div>
            </div>

            {/* Right: The Big Value Callout */}
            <div className="md:col-span-6 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-400/20 via-amber-400/10 to-neutral-950 border border-amber-400/60 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    {isNorwegian ? 'Din årlige nettobesparelse' : 'Your Annual Net Savings'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {isNorwegian ? 'Spar ~' : 'Save ~'}{savingsPct}% {isNorwegian ? 'Netto' : 'Net'}
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-bold text-amber-200">
                  {formattedSavings}
                </div>

                {/* 10x ROI Benchmark */}
                <div className="pt-2 space-y-1.5">
                  <div className="text-xs text-amber-300 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      {isNorwegian
                        ? `Medlemskapet koster 1 290 kr/år – din besparelse betaler kontingenten ${roiMultiplier}x tilbake!`
                        : `Membership is ~${annualMembershipFee} ${currency}/yr – your savings deliver a ${roiMultiplier}x return!`}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-300 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      {isNorwegian
                        ? 'Founding Member-gave: Gratis 3-dagers luksushotellopphold for 2 (verdi 5 400 kr) inkludert.'
                        : 'Founder perk: Complimentary 3-day luxury hotel break for two (worth $520) included.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="relative z-10 pt-5 mt-4 border-t border-amber-400/30">
                <button
                  type="button"
                  onClick={() => onUnlockSavings(calculationResult)}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-neutral-950" />
                  <span>
                    {isNorwegian
                      ? 'Reserver Founding-plass & Gratis Hotellopphold'
                      : 'Reserve Founder Spot & Free Hotel Break'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="pt-2.5 flex items-center justify-center gap-1.5 text-xs font-mono text-emerald-300 font-semibold text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {isNorwegian
                      ? 'Reserver din Founding Member-plass i dag – helt gratis, intet kredittkort nødvendig.'
                      : 'Reserve your Founding Member spot today for free, no credit card necessary.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TWO PROMINENT PRELAUNCH PERKS: CONNEX & RVC WITH DIRECT CALCULATORS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
        {/* Card 1: Connex 3 Dager Gratis Hotell */}
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-amber-400/50 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 text-xs font-mono">
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>{isNorwegian ? 'Founding Member Velkomstgave' : 'Founder Welcome Gift'}</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-100">
              {isNorwegian ? 'Connex: 3 Dager Gratis Hotell for 2' : 'Connex: 3-Day Free Hotel Break for 2'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              {isNorwegian
                ? 'Når du sikrer deg et av de 100 første medlemskapene, spanderer ATLAS et 3-dagers hotellopphold for to i Europa (Holiday Plus). Rommet er 100% gratis (0 kr). Du betaler kun hotellets lokale mat (frokost & middag) ved utsjekk.'
                : 'When you claim 1 of the first 100 founder spots, ATLAS covers a 3-day European hotel break for two. The room is 100% free ($0)—you only pay the hotel’s local gourmet half-board at checkout.'}
            </p>

            <div className="p-3.5 rounded-xl bg-neutral-950 border border-amber-400/30 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-neutral-400 block text-[11px]">{isNorwegian ? 'Rompris:' : 'Room rate:'}</span>
                <span className="text-emerald-400 font-bold text-base">{isNorwegian ? '0 kr (100% Gratis)' : '$0 (100% Free)'}</span>
              </div>
              <div className="text-right">
                <span className="text-neutral-400 block text-[11px]">{isNorwegian ? 'Normalverdi:' : 'Regular value:'}</span>
                <span className="text-amber-300 font-bold text-base">{isNorwegian ? '~5 400 kr' : '~$520'}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenPerkModal?.('connex')}
            className="mt-5 w-full py-3.5 px-4 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/60 text-amber-200 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Utensils className="w-4 h-4 text-amber-400" />
            <span>{isNorwegian ? 'Beregn matpris & se hoteller' : 'Calculate meal price & view hotels'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 2: RVC 7 Netter Ferieleilighet */}
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-emerald-400/50 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/40 text-emerald-300 text-xs font-mono">
              <Palmtree className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isNorwegian ? 'Fast Medlemsfordel for Familien' : 'Signature Family Perk'}</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-100">
              {isNorwegian ? 'RVC: 7 Netter Ferieleilighet (4–6 pers)' : 'RVC: 7-Night Family Resort Suites'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              {isNorwegian
                ? 'Romslige ferieleiligheter med stue, separat soverom og kjøkken i Spania (Tenerife/Marbella), Hellas (Kreta), Italia (Toscana) og Portugal (Algarve). Én fast pris for hele uken for hele familien!'
                : 'Spacious condominium suites with living rooms, separate bedrooms, and kitchens in Spain, Greece, Italy, and Portugal. One flat price for the entire week for up to 6 guests!'}
            </p>

            <div className="p-3.5 rounded-xl bg-neutral-950 border border-emerald-400/30 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-neutral-400 block text-[11px]">{isNorwegian ? 'Fast totalpris (7 netter):' : 'Fixed total price (7 nights):'}</span>
                <span className="text-emerald-400 font-bold text-base">{isNorwegian ? '3 490 kr totalt' : '$320 total'}</span>
              </div>
              <div className="text-right">
                <span className="text-neutral-400 block text-[11px]">{isNorwegian ? 'Du sparer vs Booking:' : 'You save vs Booking:'}</span>
                <span className="text-amber-300 font-bold text-base">{isNorwegian ? '~14 500 kr' : '~$1,400+'}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenPerkModal?.('rvc')}
            className="mt-5 w-full py-3.5 px-4 rounded-xl bg-emerald-400/15 hover:bg-emerald-400/25 border border-emerald-400/60 text-emerald-200 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Palmtree className="w-4 h-4 text-emerald-400" />
            <span>{isNorwegian ? 'Beregn ukesbesparelse for familien' : 'Calculate family weekly savings'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
