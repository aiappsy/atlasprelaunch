import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Clock,
  Users,
  Building,
  ArrowRight,
  Sparkles,
  Plane,
  Bed,
  ShieldCheck,
  CheckCircle2,
  Info,
  Layers,
  Lock,
  Gift,
  Check,
} from 'lucide-react';
import {
  CurrencyCode,
  StayTierId,
  FlightClass,
  STAY_TIERS,
  calculateSavings,
  CalculationResult,
  formatPerNightRate,
} from '../lib/calculatorModel';
import { useLanguage } from '../lib/i18n/LanguageContext';

export type CalculatorMode = 'package' | 'flights' | 'hotels';

interface DynamicSavingsCalculatorProps {
  onUnlockSavings: (savings: CalculationResult) => void;
  onCalculationTrigger?: () => void;
  initialMode?: CalculatorMode;
}

export const DynamicSavingsCalculator: React.FC<DynamicSavingsCalculatorProps> = ({
  onUnlockSavings,
  onCalculationTrigger,
  initialMode = 'package',
}) => {
  const { t, isNorwegian } = useLanguage();

  // Mode: Package (Both), Flights Only, Hotels Only
  const [mode, setMode] = useState<CalculatorMode>(initialMode);

  // Visitor inputs
  const [tripsPerYear, setTripsPerYear] = useState<number>(3);
  const [nightsPerTrip, setNightsPerTrip] = useState<number>(5);
  const [peopleTravelling, setPeopleTravelling] = useState<number>(2);
  const [tierId, setTierId] = useState<StayTierId>('premium');
  const [currency, setCurrency] = useState<CurrencyCode>(isNorwegian ? 'NOK' : 'USD');
  const [flightClass, setFlightClass] = useState<FlightClass>('economy');

  // Sync default currency when language changes
  useEffect(() => {
    if (isNorwegian && currency === 'USD') {
      setCurrency('NOK');
    } else if (!isNorwegian && currency === 'NOK') {
      setCurrency('USD');
    }
  }, [isNorwegian]);

  // Animation pulse state when calculating
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Derive includeFlights from active mode
  const includeFlights = mode === 'package' || mode === 'flights';

  // Perform calculation
  const result = calculateSavings({
    tripsPerYear,
    nightsPerTrip,
    peopleTravelling,
    tierId,
    currency,
    includeFlights,
    flightClass: includeFlights ? flightClass : 'none',
  });

  // Calculate annual membership fee in active currency (1 290 NOK equivalent)
  const annualMembershipFee = currency === 'NOK' ? 1290 : currency === 'EUR' ? 115 : currency === 'GBP' ? 99 : 125;
  const roiMultiplier = Math.max(1, Math.round(result.annualSavings / annualMembershipFee));

  // Trigger slight visual pulse when values change
  const handleInputChange = () => {
    setIsAnimating(true);
    if (onCalculationTrigger) onCalculationTrigger();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleModeSwitch = (newMode: CalculatorMode) => {
    setMode(newMode);
    handleInputChange();
  };

  // Quick preset options
  const tripPresets = [1, 2, 3, 4, 6];
  const nightPresets = [3, 5, 7, 14];
  const guestPresets = [
    { label: isNorwegian ? 'Alene (1)' : 'Solo (1)', val: 1 },
    { label: isNorwegian ? 'Par (2)' : 'Couple (2)', val: 2 },
    { label: isNorwegian ? 'Familie (4)' : 'Family (4)', val: 4 },
    { label: isNorwegian ? 'Gruppe (6)' : 'Group (6)', val: 6 },
  ];

  return (
    <div
      id="visual-savings-calculator"
      className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16 scroll-mt-24"
    >
      <div className="relative rounded-3xl border border-amber-400/40 bg-neutral-950/90 backdrop-blur-2xl p-5 sm:p-8 md:p-10 shadow-2xl shadow-black/90 overflow-hidden">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header & Currency Switcher */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono mb-2">
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {mode === 'flights'
                  ? (isNorwegian ? '✈️ Beregn flybesparelser' : '✈️ Flight Savings Calculator')
                  : mode === 'hotels'
                  ? (isNorwegian ? '🏨 Beregn hotellbesparelser' : '🏨 Hotel Savings Calculator')
                  : (isNorwegian ? '⚡ Beregn total reisebesparelse' : '⚡ Complete Travel Savings Calculator')}
              </span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase tracking-wide text-neutral-100">
              {mode === 'flights'
                ? (isNorwegian ? 'Dine årlige flybesparelser' : 'Your Annual Flight Savings')
                : mode === 'hotels'
                ? (isNorwegian ? 'Dine årlige hotellbesparelser' : 'Your Annual Hotel Savings')
                : (isNorwegian ? 'Hvor mye sparer du som Atlas-medlem?' : 'How Much Will You Save With Atlas?')}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              {mode === 'flights'
                ? (isNorwegian
                    ? 'Direkte flybilletter uten fordyrende GDS-bookinggebyrer, dyre billettpåslag eller ekstrakostnader på bagasje.'
                    : 'Direct airline tickets with zero legacy GDS booking surcharges, inflated retail markups, or baggage penalty fees.')
                : mode === 'hotels'
                ? (isNorwegian
                    ? 'Få tilgang til globale hotellgrossister opptil 45% under åpne priser hos Booking.com og Expedia.'
                    : 'Access global hotel bedbank wholesale inventories up to 45% below public Booking.com and Expedia prices.')
                : (isNorwegian
                    ? 'Juster reisevanene dine nedenfor for å se hva du sparer på fly og hoteller når alle kommersielle påslag kuttes til 0 kr.'
                    : 'Adjust your travel habits below to see what you save when all retail markups and middleman commissions are eliminated.')}
            </p>
          </div>

          {/* Clean Currency Switcher */}
          <div className="flex items-center gap-1.5 self-start md:self-auto bg-neutral-900/90 p-1.5 rounded-xl border border-neutral-800">
            <span className="text-[11px] font-mono text-neutral-400 pl-2 pr-1">
              {isNorwegian ? 'Valuta:' : 'Currency:'}
            </span>
            {(['NOK', 'EUR', 'USD', 'GBP'] as CurrencyCode[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCurrency(c);
                  handleInputChange();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition cursor-pointer ${
                  currency === c
                    ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20 font-bold'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Intuitive Mode Tabs: Pakkereise, Kun Hotell, Kun Fly */}
        <div className="pt-6 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-1.5 rounded-2xl bg-neutral-900/90 border border-neutral-800">
            {/* 1. Fly & Hotell (Unbundled wholesale components) */}
            <button
              type="button"
              onClick={() => handleModeSwitch('package')}
              className={`py-3 px-4 rounded-xl text-left transition cursor-pointer flex items-center gap-3 ${
                mode === 'package'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-neutral-950 shadow-lg shadow-amber-400/20 font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <div className={`p-2 rounded-lg ${mode === 'package' ? 'bg-neutral-950/15 text-neutral-950' : 'bg-neutral-800 text-amber-400'}`}>
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-semibold truncate">
                  {isNorwegian ? 'Fly & Hotell' : 'Flights & Hotels'}
                </div>
                <div className={`text-[10px] font-mono ${mode === 'package' ? 'text-neutral-900/80' : 'text-neutral-400'}`}>
                  {isNorwegian ? 'Samlet feriebesparelse (opptil 45%)' : 'Combined savings (up to 45%)'}
                </div>
              </div>
            </button>

            {/* 2. Kun Hotell */}
            <button
              type="button"
              onClick={() => handleModeSwitch('hotels')}
              className={`py-3 px-4 rounded-xl text-left transition cursor-pointer flex items-center gap-3 ${
                mode === 'hotels'
                  ? 'bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20 font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <div className={`p-2 rounded-lg ${mode === 'hotels' ? 'bg-neutral-950/15 text-neutral-950' : 'bg-neutral-800 text-amber-400'}`}>
                <Bed className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-semibold truncate">
                  {isNorwegian ? 'Kun Hotell' : 'Hotels Only'}
                </div>
                <div className={`text-[10px] font-mono ${mode === 'hotels' ? 'text-neutral-900/80' : 'text-neutral-400'}`}>
                  {isNorwegian ? 'Globale engrospriser (0 kr påslag)' : 'Wholesale net rates (0 markup)'}
                </div>
              </div>
            </button>

            {/* 3. Kun Fly */}
            <button
              type="button"
              onClick={() => handleModeSwitch('flights')}
              className={`py-3 px-4 rounded-xl text-left transition cursor-pointer flex items-center gap-3 ${
                mode === 'flights'
                  ? 'bg-sky-400 text-neutral-950 shadow-lg shadow-sky-400/20 font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <div className={`p-2 rounded-lg ${mode === 'flights' ? 'bg-neutral-950/15 text-neutral-950' : 'bg-neutral-800 text-sky-400'}`}>
                <Plane className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-semibold truncate">
                  {isNorwegian ? 'Kun Fly' : 'Flights Only'}
                </div>
                <div className={`text-[10px] font-mono ${mode === 'flights' ? 'text-neutral-900/80' : 'text-neutral-400'}`}>
                  {isNorwegian ? 'Direkte flybilletter uten gebyrer' : 'Direct airline tickets without fees'}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* HOTEL TIER CARDS (Visible in Package and Hotels mode) */}
        {mode !== 'flights' && (
          <div className="pt-2 pb-4">
            <label className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-300 block mb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-400" />
              <span>{isNorwegian ? 'Hotellkategori & standard:' : 'Hotel Category & Standard:'}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {STAY_TIERS.map((tier) => {
                const isSelected = tier.id === tierId;
                const formattedPublicRate = formatPerNightRate(tier.publicRateUSD, currency);
                const formattedWholesaleRate = formatPerNightRate(tier.wholesaleRateUSD, currency);

                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setTierId(tier.id);
                      handleInputChange();
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                      isSelected
                        ? 'bg-amber-400/15 border-amber-400/90 shadow-xl shadow-amber-400/15 ring-1 ring-amber-400/60 scale-[1.01]'
                        : 'bg-neutral-900/60 border-neutral-800/90 hover:border-neutral-700 text-neutral-300'
                    }`}
                  >
                    {/* Active Checkmark Pill */}
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs sm:text-sm font-bold text-neutral-100">
                          {isNorwegian ? tier.nameNo : tier.name}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          -{tier.savingsPct}%
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-snug line-clamp-2 mb-3">
                        {isNorwegian ? tier.subtitleNo : tier.subtitle}
                      </p>
                    </div>

                    {/* Dynamic Converted Rate in Active Currency */}
                    <div className="pt-2.5 border-t border-neutral-800 text-[11px] font-mono flex items-center justify-between">
                      <div className="text-neutral-500">
                        <span>{isNorwegian ? 'Offentlig' : 'Retail'}: </span>
                        <span className="line-through decoration-neutral-500">{formattedPublicRate}</span>
                      </div>
                      <div className="text-amber-300 font-bold text-xs">
                        <span>Atlas: {formattedWholesaleRate}</span>
                        <span className="text-[10px] text-neutral-400 font-normal">/{isNorwegian ? 'natt' : 'nt'}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* FLIGHT CABIN CLASS (Shown in Package and Flights mode) */}
        {includeFlights && (
          <div className="pt-2 pb-4">
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-sky-400/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-400/15 border border-sky-400/40 flex items-center justify-center text-sky-300 shrink-0">
                  <Plane className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <span className="text-sm font-bold text-neutral-100 flex items-center gap-2">
                    <span>{isNorwegian ? 'Kabin- og seteklasse:' : 'Flight Cabin Class:'}</span>
                    <span className="text-[11px] font-mono text-sky-300 bg-sky-400/10 border border-sky-400/30 px-2 py-0.5 rounded-full">
                      {isNorwegian ? 'Direkte flyavtaler' : 'Direct Airline Agreements'}
                    </span>
                  </span>
                  <span className="text-xs text-neutral-400">
                    {isNorwegian
                      ? 'Reis uten fordyrende bookinggebyrer, dyre billettpåslag og høye ekstragebyrer på bagasje.'
                      : 'Fly without legacy booking surcharges, airline retail markups, or baggage penalty fees.'}
                  </span>
                </div>
              </div>

              {/* Cabin Class Switcher */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setFlightClass('economy');
                    handleInputChange();
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                    flightClass === 'economy'
                      ? 'bg-sky-400 text-neutral-950 shadow-md shadow-sky-400/20'
                      : 'bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white'
                  }`}
                >
                  {isNorwegian ? 'Økonomiklasse (~15% spart)' : 'Economy Class (~15% Saved)'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFlightClass('business');
                    handleInputChange();
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                    flightClass === 'business'
                      ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                      : 'bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white'
                  }`}
                >
                  {isNorwegian ? 'Business Class (~24% spart)' : 'Business Class (~24% Saved)'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3 Intuitive Sliders / Preset Controls */}
        <div className={`grid grid-cols-1 ${mode === 'flights' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 pt-2 pb-6 border-b border-neutral-800`}>
          {/* 1. Travels / Trips per year */}
          <div className="bg-neutral-900/70 border border-neutral-800/90 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="trips-input" className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{isNorwegian ? 'Reiser i året:' : 'Trips per year:'}</span>
              </label>
              <span className="text-xs font-mono font-bold text-amber-300 px-3 py-1 rounded-lg bg-neutral-950 border border-amber-400/30">
                {tripsPerYear} {isNorwegian ? (tripsPerYear === 1 ? 'reise' : 'reiser') : (tripsPerYear === 1 ? 'trip' : 'trips')}
              </span>
            </div>

            {/* Quick 1-Click Preset Pills */}
            <div className="grid grid-cols-5 gap-1">
              {tripPresets.map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    setTripsPerYear(num);
                    handleInputChange();
                  }}
                  className={`text-xs font-mono py-1 rounded-lg cursor-pointer transition text-center ${
                    tripsPerYear === num
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow'
                      : 'bg-neutral-800/90 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700'
                  }`}
                >
                  {num}{num === 6 ? '+' : ''}
                </button>
              ))}
            </div>

            {/* Fine-Tuning Range Slider */}
            <input
              id="trips-input"
              type="range"
              min="1"
              max="12"
              step="1"
              value={tripsPerYear}
              onChange={(e) => {
                setTripsPerYear(Number(e.target.value));
                handleInputChange();
              }}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* 2. Nights per trip (Hidden in Flights Only mode) */}
          {mode !== 'flights' && (
            <div className="bg-neutral-900/70 border border-neutral-800/90 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="nights-input" className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isNorwegian ? 'Netter per tur:' : 'Nights per trip:'}</span>
                </label>
                <span className="text-xs font-mono font-bold text-amber-300 px-3 py-1 rounded-lg bg-neutral-950 border border-amber-400/30">
                  {nightsPerTrip} {isNorwegian ? 'netter' : 'nights'}
                </span>
              </div>

              {/* Quick 1-Click Preset Pills */}
              <div className="grid grid-cols-4 gap-1">
                {nightPresets.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setNightsPerTrip(num);
                      handleInputChange();
                    }}
                    className={`text-[11px] font-mono py-1 rounded-lg cursor-pointer transition text-center ${
                      nightsPerTrip === num
                        ? 'bg-amber-400 text-neutral-950 font-bold shadow'
                        : 'bg-neutral-800/90 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700'
                    }`}
                  >
                    {num === 3 ? (isNorwegian ? '3 (Helg)' : '3 (Wknd)') : num === 7 ? (isNorwegian ? '7 (1 uke)' : '7 (1 wk)') : `${num}n`}
                  </button>
                ))}
              </div>

              {/* Fine-Tuning Range Slider */}
              <input
                id="nights-input"
                type="range"
                min="2"
                max="21"
                step="1"
                value={nightsPerTrip}
                onChange={(e) => {
                  setNightsPerTrip(Number(e.target.value));
                  handleInputChange();
                }}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          )}

          {/* 3. People / Passengers Travelling */}
          <div className="bg-neutral-900/70 border border-neutral-800/90 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="people-input" className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>{includeFlights ? (isNorwegian ? 'Antall reisende:' : 'Travelers:') : (isNorwegian ? 'Gjester:' : 'Guests:')}</span>
              </label>
              <span className="text-xs font-mono font-bold text-amber-300 px-3 py-1 rounded-lg bg-neutral-950 border border-amber-400/30">
                {peopleTravelling} {isNorwegian ? (peopleTravelling === 1 ? 'person' : 'personer') : (peopleTravelling === 1 ? 'person' : 'people')}
              </span>
            </div>

            {/* Quick 1-Click Preset Pills */}
            <div className="grid grid-cols-4 gap-1">
              {guestPresets.map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => {
                    setPeopleTravelling(item.val);
                    handleInputChange();
                  }}
                  className={`text-[11px] font-mono py-1 rounded-lg cursor-pointer transition text-center truncate ${
                    peopleTravelling === item.val
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow'
                      : 'bg-neutral-800/90 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Fine-Tuning Range Slider */}
            <input
              id="people-input"
              type="range"
              min="1"
              max="8"
              step="1"
              value={peopleTravelling}
              onChange={(e) => {
                setPeopleTravelling(Number(e.target.value));
                handleInputChange();
              }}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>
        </div>

        {/* Calculation Visualizer & Result Presentation */}
        <div className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* Left Column: Clear Price Comparison Receipt */}
            <div className="md:col-span-6 flex flex-col justify-between p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-semibold mb-3">
                  {isNorwegian ? 'Prissammenligning' : 'Price Comparison'} ({mode !== 'flights' ? `${result.totalNights} ${isNorwegian ? 'hotellnetter' : 'hotel nights'}` : ''}{mode === 'package' ? ' + ' : ''}{includeFlights ? `${result.totalFlightTickets} ${isNorwegian ? 'flybilletter' : 'flight tickets'}` : ''}):
                </span>

                {/* Public Retail Cost Bar */}
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between mb-2.5">
                  <div>
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wide block">
                      {isNorwegian ? 'Offentlig pris (Booking.com / Expedia / Google Flights)' : 'Public Retail (Booking.com / Expedia / Google Flights)'}
                    </span>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-neutral-400 line-through decoration-red-400/80">
                      {result.formattedRetail}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-neutral-500 font-mono">
                    {isNorwegian
                      ? `Inkluderer ~${mode === 'flights' ? (flightClass === 'business' ? '24' : '15') : result.savingsPercentage}% påslag`
                      : `Includes ~${mode === 'flights' ? (flightClass === 'business' ? '24' : '15') : result.savingsPercentage}% markups`}
                  </div>
                </div>

                {/* Atlas Wholesale Cost Bar */}
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-amber-400/40 flex items-center justify-between shadow-lg shadow-black/40">
                  <div>
                    <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wide block font-semibold">
                      {isNorwegian ? 'Atlas Medlemspris (0 kr kommersielt påslag)' : 'Atlas Member Price (Pure 0-Markup Net Cost)'}
                    </span>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">
                      {result.formattedWholesale}
                    </div>
                  </div>
                  <div className="text-right text-xs font-mono text-amber-300 font-bold bg-amber-400/10 px-2 py-1 rounded border border-amber-400/30">
                    {isNorwegian ? 'Netto grossistpris' : 'Wholesale Net'}
                  </div>
                </div>
              </div>

              {/* Sub-breakdown if in package mode */}
              {mode === 'package' && (
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-neutral-300 flex items-center justify-between font-mono">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{isNorwegian ? 'Hotell spart:' : 'Hotels Saved:'}</span>
                    </div>
                    <span className="text-amber-300 font-bold">{result.formattedHotelSavings}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-neutral-300 flex items-center justify-between font-mono">
                    <div className="flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{isNorwegian ? 'Fly spart:' : 'Flights Saved:'}</span>
                    </div>
                    <span className="text-sky-300 font-bold">{result.formattedFlightSavings}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Heroic Annual Savings Callout with ROI Multiplier */}
            <div className="md:col-span-6 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-400/20 via-amber-400/10 to-neutral-950 border border-amber-400/60 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    {mode === 'flights'
                      ? (isNorwegian ? 'Årlig flybesparelse' : 'Annual Flight Savings')
                      : mode === 'hotels'
                      ? (isNorwegian ? 'Årlig hotellbesparelse' : 'Annual Hotel Savings')
                      : (isNorwegian ? 'Din årlige medlemsbesparelse' : 'Your Annual Member Savings')}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {isNorwegian ? 'Spar ~' : 'Save ~'}{mode === 'flights' ? (flightClass === 'business' ? '24' : '15') : result.savingsPercentage}% {isNorwegian ? 'Netto' : 'Net'}
                  </span>
                </div>

                <div
                  className={`text-4xl sm:text-5xl md:text-6xl font-cinzel font-bold text-amber-200 transition-all duration-300 ${
                    isAnimating ? 'scale-105 filter brightness-125' : 'scale-100'
                  }`}
                >
                  {mode === 'flights' ? result.formattedFlightSavings : mode === 'hotels' ? result.formattedHotelSavings : result.formattedSavings}
                </div>

                {/* 10x ROI Value Callout */}
                <div className="pt-2 space-y-1.5">
                  <div className="text-xs text-amber-300 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      {isNorwegian
                        ? `Medlemskapet koster 1 290 kr/år – din besparelse er ${roiMultiplier}x høyere enn kontingenten!`
                        : `Membership is ~${annualMembershipFee} ${currency}/yr – your savings deliver a ${roiMultiplier}x return!`}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-300 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      {isNorwegian
                        ? 'Founding Member-bonus: 3-dagers luksushotellopphold for 2 inkludert (verdi 5 400 kr).'
                        : 'Founding Member perk: Complimentary 3-day European hotel break for two (worth $520).'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct CTA Action Into Waitlist Modal */}
              <div className="relative z-10 pt-5 mt-4 border-t border-amber-400/30">
                <button
                  type="button"
                  onClick={() => onUnlockSavings(result)}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-neutral-950" />
                  <span>
                    {isNorwegian
                      ? 'Sikre Founding Member-plass & Gratis Opphold'
                      : 'Claim Founding Member Spot & Free Hotel Break'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* The Honest Breakdown Box: 4 Pillars of Savings */}
        <div className="mt-8 pt-6 border-t border-neutral-800 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <h4 className="text-xs sm:text-sm font-bold text-neutral-200">
              {isNorwegian ? 'Hvorfor sparer du så mye? (Full åpenhet om nettopriser)' : 'Why Do Members Save So Much? (Full Wholesale Transparency)'}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <span className="font-bold text-amber-300 block mb-1">
                {isNorwegian ? '1. Null provisjonspåslag' : '1. Zero Commission Markups'}
              </span>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                {isNorwegian
                  ? 'Offentlige portaler (Booking.com, Expedia) legger på 20%–45% i provisjon. Atlas selger rommene til ren nettopris.'
                  : 'Public booking portals add 20%–45% in retail markups. Atlas provides the rooms at direct institutional cost.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <span className="font-bold text-sky-300 block mb-1">
                {isNorwegian ? '2. Null GDS-bookinggebyrer' : '2. Zero GDS Booking Fees'}
              </span>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                {isNorwegian
                  ? 'Flyselskapene legger på 150–350 kr per billett på åpne sider. Atlas kobler seg rett på flyselskapenes direkte API.'
                  : 'Airlines add $15–$35 per ticket on public sites. Atlas connects straight to direct airline APIs without penalty surcharges.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <span className="font-bold text-emerald-300 block mb-1">
                {isNorwegian ? '3. Bagasje & seter til kostpris' : '3. At-Cost Luggage & Seats'}
              </span>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                {isNorwegian
                  ? 'Du betaler flyselskapets faktiske kostnad for innsjekket bagasje og setevalg – en besparelse på 300–700 kr per person.'
                  : 'You pay actual airline cost for checked bags and seat selection, saving $30–$70 per traveler on baggage alone.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <span className="font-bold text-neutral-200 block mb-1">
                {isNorwegian ? '4. 100% Fornøydgaranti' : '4. 100% Value Guarantee'}
              </span>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                {isNorwegian
                  ? 'Hvis du ikke sparer inn hele medlemskontingenten på din aller første reise, refunderer vi 100% av beløpet umiddelbart.'
                  : 'If you do not recoup your membership fee on your very first booking, we immediately refund 100% of your fee.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Parity & Member Exemption Briefing Card */}
      <div className="mt-6 rounded-3xl border border-amber-400/30 bg-neutral-950/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{isNorwegian ? 'Juridisk krav om prisparitet' : 'Rate Parity Legal Requirement'}</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-100">
              {isNorwegian ? 'Hvorfor sanntidspriser krever en gratis medlemskonto' : 'Why Real-Time Rates Require A Free Member Account'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              {isNorwegian
                ? 'I henhold til globale hotellkontrakter og prisparitetsregler (Rate Parity) er 5-stjerners hoteller og flyselskaper strengt forbudt å vise sine uannonserte grossistpriser og direkte nettopriser offentlig til ikke-medlemmer på det åpne nettet.'
                : 'Under global hotel contracts and retail Rate Parity rules, 5-star hotels and airlines are strictly forbidden from showing their wholesale bedbank and direct net prices publicly to non-members on the open web.'}
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              {isNorwegian
                ? 'I det øyeblikket du aktiverer din gratis medlemskonto og logger inn i vår lukkede medlemsportal, låser du opp 100% ubegrenset søk og bestilling på over 1,2 millioner luksushoteller og rutefly til ren grossistpris.'
                : 'The moment you activate your free founder spot and sign in behind our closed-loop member gate, you unlock 100% unrestricted live search and booking across 1.2M+ luxury properties and commercial flights at pure wholesale cost.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onUnlockSavings(result)}
            className="shrink-0 w-full md:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-400/20 transition-all scale-100 hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-neutral-950" />
            <span>{isNorwegian ? 'Sikre plass & Lås opp priser' : 'Claim Spot & Unlock Real Rates'}</span>
            <ArrowRight className="w-4 h-4 text-neutral-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
