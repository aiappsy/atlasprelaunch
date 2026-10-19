import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Building2,
  Utensils,
  Award,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Calculator,
  Palmtree,
  Users,
  Bed,
  Wine,
  Info,
  Clock,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';

export type PerkExplainerTab = 'connex' | 'rvc';

interface PerkExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PerkExplainerTab;
  onClaimSpot: () => void;
}

export const PerkExplainerModal: React.FC<PerkExplainerModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'connex',
  onClaimSpot,
}) => {
  const { isNorwegian } = useLanguage();
  const [activeTab, setActiveTab] = useState<PerkExplainerTab>(initialTab);

  // Sync initial tab when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Connex Calculator State
  const [connexNights, setConnexNights] = useState<number>(2);
  const [connexRegion, setConnexRegion] = useState<string>('dolomites');

  // RVC Calculator State
  const [rvcDestination, setRvcDestination] = useState<string>('marbella');
  const [rvcGuests, setRvcGuests] = useState<number>(4);

  if (!isOpen) return null;

  // Connex destinations & half-board daily rates per guest (EUR converted to NOK @ 11.8)
  const connexDestinations: Record<string, { nameNo: string; nameEn: string; country: string; mealPriceEur: number; otaNightlyNok: number }> = {
    dolomites: {
      nameNo: 'Dolomittene (Sør-Tyrol)',
      nameEn: 'Dolomites (South Tyrol)',
      country: 'Italia',
      mealPriceEur: 42,
      otaNightlyNok: 2700,
    },
    tuscany: {
      nameNo: 'Chianti & Val d\'Orcia',
      nameEn: 'Tuscany (Chianti)',
      country: 'Italia',
      mealPriceEur: 45,
      otaNightlyNok: 2950,
    },
    blackforest: {
      nameNo: 'Schwarzwald & Titisee',
      nameEn: 'Black Forest & Titisee',
      country: 'Tyskland',
      mealPriceEur: 38,
      otaNightlyNok: 2400,
    },
    salzburg: {
      nameNo: 'Salzburgerland & Zell am See',
      nameEn: 'Salzburg & Alps',
      country: 'Østerrike',
      mealPriceEur: 44,
      otaNightlyNok: 2800,
    },
    garda: {
      nameNo: 'Gardasjøen (Lake Garda)',
      nameEn: 'Lake Garda & Bardolino',
      country: 'Italia',
      mealPriceEur: 40,
      otaNightlyNok: 2600,
    },
  };

  const selectedConnex = connexDestinations[connexRegion] || connexDestinations.dolomites;
  const eurToNok = 11.8;
  const connexPublicOtaTotal = selectedConnex.otaNightlyNok * connexNights;
  const connexAtlasRoomCost = 0;
  const connexMealTotalNok = Math.round(selectedConnex.mealPriceEur * 2 * connexNights * eurToNok);
  const connexNetSavingsNok = connexPublicOtaTotal - connexMealTotalNok;

  const connexPublicOtaEur = Math.round(connexPublicOtaTotal / eurToNok);
  const connexMealTotalEur = Math.round(selectedConnex.mealPriceEur * 2 * connexNights);
  const connexNetSavingsEur = connexPublicOtaEur - connexMealTotalEur;

  // RVC destinations data
  const rvcDestinations: Record<string, { nameNo: string; nameEn: string; otaWeeklyNok: number; typicalResort: string }> = {
    marbella: {
      nameNo: 'Marbella / Costa del Sol (Spania)',
      nameEn: 'Marbella / Costa del Sol (Spain)',
      otaWeeklyNok: 18500,
      typicalResort: 'Crown Resorts Club Marbella / Macdonald Leila',
    },
    tenerife: {
      nameNo: 'Tenerife / Kanariøyene (Spania)',
      nameEn: 'Tenerife / Canary Islands (Spain)',
      otaWeeklyNok: 17200,
      typicalResort: 'Sunset Harbour Club / Royal Sunset Beach',
    },
    algarve: {
      nameNo: 'Algarve / Albufeira (Portugal)',
      nameEn: 'Algarve / Albufeira (Portugal)',
      otaWeeklyNok: 19800,
      typicalResort: 'Clube Praia da Oura / Four Seasons Vilamoura',
    },
    crete: {
      nameNo: 'Kreta / Chania (Hellas)',
      nameEn: 'Crete / Chania (Greece)',
      otaWeeklyNok: 16500,
      typicalResort: 'Grand Leoniki Residence / Village Heights',
    },
    tuscany: {
      nameNo: 'Toscana / Firenze-regionen (Italia)',
      nameEn: 'Tuscany / Florence Countryside (Italy)',
      otaWeeklyNok: 21000,
      typicalResort: 'Borgo di Colleoli Resort / Fattoria Belvedere',
    },
    mallorca: {
      nameNo: 'Mallorca / Alcúdia (Spania)',
      nameEn: 'Mallorca / Alcudia (Spain)',
      otaWeeklyNok: 17900,
      typicalResort: 'Club Cala de Mar / Viva Menorca',
    },
  };

  const selectedRvc = rvcDestinations[rvcDestination] || rvcDestinations.marbella;
  const rvcAtlasFlatPrice = 3490;
  const rvcNetSavingsNok = selectedRvc.otaWeeklyNok - rvcAtlasFlatPrice;
  const rvcPerPersonPerNight = Math.round(rvcAtlasFlatPrice / (rvcGuests * 7));

  const rvcAtlasFlatPriceEur = 299;
  const rvcPublicOtaEur = Math.round(selectedRvc.otaWeeklyNok / eurToNok);
  const rvcNetSavingsEur = rvcPublicOtaEur - rvcAtlasFlatPriceEur;
  const rvcPerPersonPerNightEur = Math.round(rvcAtlasFlatPriceEur / (rvcGuests * 7));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-amber-400/35 rounded-3xl shadow-2xl shadow-black/90 p-5 sm:p-7 text-neutral-100 my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1 bg-neutral-900/90 rounded-2xl border border-neutral-800/80 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('connex')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'connex'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Wine className="w-4 h-4" />
            <span>{isNorwegian ? 'Connex: 0 kr Rompris' : 'Connex: €0 Room Rate'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rvc')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'rvc'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Palmtree className="w-4 h-4" />
            <span>{isNorwegian ? 'RVC: 7 Netter (fra 3 490 kr)' : 'RVC: 7 Nights (from €299)'}</span>
          </button>
        </div>

        {/* TAB 1: CONNEX HOTEL BREAKS */}
        {activeTab === 'connex' && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-mono font-bold mb-2">
                <span>{isNorwegian ? '🎁 Founding Member Gave (Inkludert for de 100 første)' : '🎁 Founding Member Gift (Included for First 100)'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white flex items-center gap-2">
                <span>🍷</span>
                <span>{isNorwegian ? 'Atlas Gourmet & Spa Escapes' : 'Atlas Gourmet & Spa Escapes'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                {isNorwegian
                  ? 'Gjennom Connex (Holiday Plus) fyller utvalgte 3–4* superior velværerhoteller i Europa ledig kapasitet. Rommet er 100% dekket av ATLAS (verdi 5 400 kr / ca. €480). Du betaler kun hotellets obligatoriske gourmet-halvpensjon (frokost + fleretters middag) direkte ved utsjekk.'
                  : 'Through Connex (Holiday Plus), curated 3-4* boutique retreats across Europe fill surplus capacity. The room is 100% sponsored by ATLAS (€480 value). Guests only pay the hotel\'s published half-board (breakfast + multi-course dinner) directly at checkout.'}
              </p>
            </div>

            {/* Golden Ticket 3-Winner Highlight */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-amber-500/15 border border-amber-400/50 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-amber-200 block">
                  {isNorwegian ? '🌟 Golden Ticket: 3 av 100 vinner OGSÅ all mat dekket!' : '🌟 Golden Ticket: 3 of 100 win ALL meals covered!'}
                </span>
                <span className="text-neutral-300">
                  {isNorwegian
                    ? 'Blant de 100 første Founding-medlemmene trekker vi 3 vinnere som får sin gourmet-halvpensjon 100% refundert av ATLAS. Da er hele oppholdet 100% gratis!'
                    : 'Among the first 100 Founding Members, 3 will win their half-board gourmet dining 100% covered by ATLAS. A totally free luxury getaway!'}
                </span>
              </div>
            </div>

            {/* Interactive Calculator Section */}
            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>{isNorwegian ? 'Beregn Besparelse & Matkostnad' : 'Calculate Savings & Meal Cost'}</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  {isNorwegian ? '2 personer (Dobbeltrom)' : '2 Guests (Double Room)'}
                </span>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1 font-mono text-[11px]">
                    {isNorwegian ? 'Velg Destinasjon / Hotellregion:' : 'Select Destination / Region:'}
                  </label>
                  <select
                    value={connexRegion}
                    onChange={(e) => setConnexRegion(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs focus:border-amber-400 outline-none"
                  >
                    {Object.entries(connexDestinations).map(([key, dest]) => (
                      <option key={key} value={key}>
                        {isNorwegian ? dest.nameNo : dest.nameEn} (€{dest.mealPriceEur}/{isNorwegian ? 'dag' : 'day'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-mono text-[11px]">
                    {isNorwegian ? 'Antall Netter:' : 'Length of Stay:'}
                  </label>
                  <div className="flex gap-2">
                    {[2, 3, 4].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setConnexNights(n)}
                        className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold border transition ${
                          connexNights === n
                            ? 'bg-amber-400 text-neutral-950 border-amber-400'
                            : 'bg-neutral-950 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                        }`}
                      >
                        {n} {isNorwegian ? 'netter' : 'nights'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Calculation Output */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-amber-400/20 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between items-center text-neutral-400">
                  <span>{isNorwegian ? 'Pris på Booking.com (Rom m/ mat):' : 'Public Price on Booking.com (Room + meals):'}</span>
                  <span className="line-through text-neutral-500">
                    {isNorwegian ? `${connexPublicOtaTotal.toLocaleString('no-NO')} kr` : `€${connexPublicOtaEur.toLocaleString('en-US')}`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-neutral-300">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isNorwegian ? 'ATLAS Rompris:' : 'ATLAS Room Rate:'}</span>
                  </span>
                  <span className="text-emerald-400 font-black text-sm">{isNorwegian ? '0 NOK (GAVE)' : '€0 (SPONSORED)'}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span>{isNorwegian ? 'Obligatorisk Gourmet-halvpensjon (2 personer):' : 'Fixed Gourmet Half-Board (2 guests):'}</span>
                  <span className="text-amber-300 font-semibold">
                    {isNorwegian ? `${connexMealTotalNok.toLocaleString('no-NO')} kr` : `€${connexMealTotalEur.toLocaleString('en-US')}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-sm">
                  <span className="font-bold text-neutral-100">{isNorwegian ? 'Din Netto Besparelse:' : 'Your Net Savings:'}</span>
                  <span className="font-black text-emerald-400 text-base">
                    {isNorwegian ? `+${connexNetSavingsNok.toLocaleString('no-NO')} kr spart!` : `+€${connexNetSavingsEur.toLocaleString('en-US')} saved!`}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  {isNorwegian
                    ? 'Kupongen dekker 100% av romprisen (0 kr). Hotellenes faste gourmet-halvpensjon (frokostbuffet og fleretters middag) betales direkte til hotellet ved utsjekk. Gjelder på over 1 500 boutique- og velværerhoteller i Europa.'
                    : 'The voucher covers 100% of the room rate (€0). The published gourmet half-board (breakfast buffet & multi-course dinner) is paid directly to the hotel upon checkout. Valid across 1,500+ boutique & wellness hotels across Europe.'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RVC / PANORAMA 7-NIGHT CONDOS */}
        {activeTab === 'rvc' && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold mb-2">
                <span>{isNorwegian ? '🏖️ Clearance-priser fra kun 3 490 kr' : '🏖️ Clearance Rates from €299'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white flex items-center gap-2">
                <span>🏖️</span>
                <span>{isNorwegian ? 'Atlas Signature Resorts (RVC / Panorama)' : 'Atlas Signature Resorts'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                {isNorwegian
                  ? 'Gjennom overskuddsallokeringer fra RCI / Panorama får ATLAS-medlemmer tilgang til romslige ferieleiligheter (fra studio til 1- og 2-roms suiter med kjøkken og stue) for 2–6 personer til restplasspriser fra kun 3 490 kr for alle 7 nettene.'
                  : 'Through liquidation allotments via the RCI / Panorama network, ATLAS members unlock spacious vacation condos (studios, 1- and 2-bedroom suites with kitchens and living areas) sleeping 2 to 6 guests at clearance rates starting from €299 for the entire week.'}
              </p>
            </div>

            {/* Core RVC Perks Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                <span className="text-[10px] text-neutral-400 block">{isNorwegian ? '7 Netter (fra-pris)' : '7 Nights (From)'}</span>
                <span className="text-base font-bold text-amber-300">{isNorwegian ? 'Fra 3 490 NOK' : 'From €299'}</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                <span className="text-[10px] text-neutral-400 block">{isNorwegian ? 'Plass til' : 'Capacity'}</span>
                <span className="text-base font-bold text-emerald-400">{isNorwegian ? '2–6 Personer' : '2–6 Guests'}</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] text-neutral-400 block">{isNorwegian ? 'Trygghet' : 'Peace of Mind'}</span>
                <span className="text-xs font-bold text-sky-300 mt-0.5 block">{isNorwegian ? '14 dagers angrefrist' : '14-Day Money-Back'}</span>
              </div>
            </div>

            {/* Interactive RVC Calculator */}
            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>{isNorwegian ? 'Beregn Feriebesparelse' : 'Calculate Holiday Savings'}</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  {isNorwegian ? '7 sammenhengende netter' : '7 Consecutive Nights'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1 font-mono text-[11px]">
                    {isNorwegian ? 'Velg Feriedestinasjon:' : 'Select Holiday Destination:'}
                  </label>
                  <select
                    value={rvcDestination}
                    onChange={(e) => setRvcDestination(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs focus:border-amber-400 outline-none"
                  >
                    {Object.entries(rvcDestinations).map(([key, dest]) => (
                      <option key={key} value={key}>
                        {isNorwegian ? dest.nameNo : dest.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-mono text-[11px]">
                    {isNorwegian ? 'Antall Gjester i Leiligheten:' : 'Guests in Condo:'}
                  </label>
                  <div className="flex gap-2">
                    {[2, 4, 6].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setRvcGuests(g)}
                        className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold border transition ${
                          rvcGuests === g
                            ? 'bg-amber-400 text-neutral-950 border-amber-400'
                            : 'bg-neutral-950 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                        }`}
                      >
                        {g} {isNorwegian ? 'gjester' : 'guests'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* RVC Calculation Summary */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-amber-400/20 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between items-center text-neutral-400">
                  <span>{isNorwegian ? 'Pris på Booking.com / Airbnb for leilighet:' : 'Public Booking.com / Airbnb Price:'}</span>
                  <span className="line-through text-neutral-500">
                    {isNorwegian ? `${selectedRvc.otaWeeklyNok.toLocaleString('no-NO')} kr` : `€${rvcPublicOtaEur.toLocaleString('en-US')}`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-neutral-300">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isNorwegian ? 'ATLAS Restplasspris (7 netter):' : 'ATLAS Clearance Rate (7 nights):'}</span>
                  </span>
                  <span className="text-emerald-400 font-black text-sm">{isNorwegian ? 'Fra 3 490 NOK' : 'From €299'}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span>{isNorwegian ? `Pris per person per natt (${rvcGuests} personer):` : `Cost per guest per night (${rvcGuests} guests):`}</span>
                  <span className="text-sky-300 font-semibold">
                    {isNorwegian ? `${rvcPerPersonPerNight} kr / natt` : `€${rvcPerPersonPerNightEur} / night`}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-sm">
                  <span className="font-bold text-neutral-100">{isNorwegian ? 'Din Netto Familiebesparelse:' : 'Your Net Family Savings:'}</span>
                  <span className="font-black text-emerald-400 text-base">
                    {isNorwegian ? `+${rvcNetSavingsNok.toLocaleString('no-NO')} kr spart!` : `+€${rvcNetSavingsEur.toLocaleString('en-US')} saved!`}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">
                  {isNorwegian ? 'Eksempelresort:' : 'Featured Resort:'} <strong className="text-neutral-300">{selectedRvc.typicalResort}</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Bottom CTA */}
        <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[11px] font-mono text-neutral-400 block">
              {isNorwegian ? 'Kun 100 Founding Member-plasser' : 'Only 100 Founder Spots Available'}
            </span>
            <span className="text-xs font-bold text-amber-300">
              {isNorwegian ? '1 290 kr / år • 100% Fornøydgaranti' : '€110 / year (1 290 NOK) • 100% Value Guarantee'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onClaimSpot();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-neutral-950" />
            <span>{isNorwegian ? 'Sikre Founding-plass Nå' : 'Claim Founder Spot Now'}</span>
            <ArrowRight className="w-4 h-4 text-neutral-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
