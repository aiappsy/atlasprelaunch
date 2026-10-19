import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Building,
  Plane,
  Calendar,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';
import {
  submitRefundClaim,
  preValidateClaim,
  RefundTrack,
  RefundCategory,
  RefundClaimRecord,
  ANNUAL_FEE_EUR,
  ANNUAL_FEE_NOK,
} from '../lib/refundManagementService';

interface RefundClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBookingRef?: string;
}

export const RefundClaimModal: React.FC<RefundClaimModalProps> = ({
  isOpen,
  onClose,
  initialBookingRef = '',
}) => {
  const { isNorwegian } = useLanguage();
  const currency = isNorwegian ? 'NOK' : 'EUR';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [track, setTrack] = useState<RefundTrack>('track_a_lodging');
  const [category, setCategory] = useState<RefundCategory>('wholesale_hotel');
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [bookingRef, setBookingRef] = useState(initialBookingRef);
  const [destination, setDestination] = useState('');
  const [nights, setNights] = useState<number>(2);
  const [atlasPricePaid, setAtlasPricePaid] = useState<string>('320');
  const [publicRetailPrice, setPublicRetailPrice] = useState<string>('360');
  const [retailSource, setRetailSource] = useState('Booking.com');
  const [retailEvidenceUrl, setRetailEvidenceUrl] = useState('');
  const [comments, setComments] = useState('');
  const [submittedClaim, setSubmittedClaim] = useState<RefundClaimRecord | null>(null);

  if (!isOpen) return null;

  const currentCurrency = currency === 'NOK' ? 'NOK' : 'EUR';
  const annualFee = currentCurrency === 'NOK' ? ANNUAL_FEE_NOK : ANNUAL_FEE_EUR;
  const numAtlasPaid = parseFloat(atlasPricePaid) || 0;
  const numRetail = parseFloat(publicRetailPrice) || 0;

  // Real-time pre-validation preview
  const previewValidation = preValidateClaim({
    track,
    category,
    memberEmail: memberEmail || 'test@example.com',
    memberName: memberName || 'Valued Member',
    bookingRef: bookingRef || 'BK-PREVIEW',
    destination: destination || 'Hotel',
    nights: category === 'flight_only' ? 0 : nights,
    atlasPricePaid: numAtlasPaid,
    publicRetailPrice: numRetail,
    currency: currentCurrency,
    retailSource,
    retailEvidenceUrl,
    comments,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const record = submitRefundClaim({
      track,
      category,
      memberEmail,
      memberName,
      bookingRef,
      destination,
      nights: category === 'flight_only' ? 0 : nights,
      atlasPricePaid: numAtlasPaid,
      publicRetailPrice: numRetail,
      currency: currentCurrency,
      retailSource,
      retailEvidenceUrl,
      comments,
    });
    setSubmittedClaim(record);
    setStep(3);
  };

  const resetForm = () => {
    setStep(1);
    setSubmittedClaim(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-gradient-to-r from-neutral-900/80 via-neutral-950 to-neutral-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-cinzel font-bold text-neutral-100 flex items-center gap-2">
                {isNorwegian ? 'Atlas Verdigaranti Portal' : 'Atlas Value Guarantee Portal'}
                <span className="text-[10px] font-mono font-normal uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {isNorwegian ? '100% Penger Tilbake' : '100% Money-Back'}
                </span>
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                {isNorwegian
                  ? 'Automatisk refusjonshåndtering under Hard Rock Capital Ltd'
                  : 'Automated claim resolution governed by Hard Rock Capital Ltd'}
              </p>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {step < 3 && (
            /* Progress steps */
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 text-xs font-mono">
              <div
                className={`flex items-center gap-2 ${
                  step === 1 ? 'text-amber-400 font-semibold' : 'text-neutral-500'
                }`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>{isNorwegian ? 'Kravtype & Medlem' : 'Claim Type & Member'}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-700" />
              <div
                className={`flex items-center gap-2 ${
                  step === 2 ? 'text-amber-400 font-semibold' : 'text-neutral-500'
                }`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>{isNorwegian ? 'Prisbevis & Verifisering' : 'Price Evidence & Math'}</span>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              {/* Blueprint Track Selector */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                  {isNorwegian ? 'Velg Garanti-Spor (Blueprint)' : 'Select Guarantee Track (Blueprint)'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setTrack('track_a_lodging');
                      setCategory('wholesale_hotel');
                    }}
                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                      track === 'track_a_lodging'
                        ? 'bg-amber-400/10 border-amber-400/50 text-white'
                        : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold font-mono">
                        <Building className="w-4 h-4 text-amber-400" />
                        <span>Track A: Hotell & Ferieleilighet</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono">
                        Første Tur
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {isNorwegian
                        ? 'For min. 2 netter på hotell eller 7 netter ferieleilighet. Spar mer enn kontingenten på første tur, eller få 100% tilbake.'
                        : 'For min 2-night hotel stay or 7-night condo. Save more than the fee on trip one or get 100% back.'}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTrack('track_b_annual');
                      setCategory('annual_travel_audit');
                    }}
                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                      track === 'track_b_annual'
                        ? 'bg-amber-400/10 border-amber-400/50 text-white'
                        : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold font-mono">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <span>Track B: Samlet Årsreise</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                        Årsrevisjon
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {isNorwegian
                        ? 'Inkluderer alle fly, leiebiler og korte opphold gjennom 12 mnd. Refusjon dersom samlet årsbesparelse er under 1 290 kr.'
                        : 'Covers all flights, car rentals, and short stays over 12 months if total annual savings are under €110.'}
                    </p>
                  </button>
                </div>
              </div>

              {/* Sub-Category */}
              {track === 'track_a_lodging' && (
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                    {isNorwegian ? 'Reisetype' : 'Booking Category'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'wholesale_hotel', label: isNorwegian ? 'Hotell (2+ netter)' : 'Hotel (2+ nights)' },
                      { id: 'resort_condo', label: isNorwegian ? 'Resort Leilighet (7N)' : 'Resort Condo (7N)' },
                      { id: 'flight_only', label: isNorwegian ? 'Kun Flybillett' : 'Flight Only' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCategory(item.id as RefundCategory)}
                        className={`py-2 px-3 rounded-lg border text-xs font-mono transition cursor-pointer ${
                          category === item.id
                            ? 'bg-neutral-800 border-amber-400 text-white font-semibold'
                            : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  {category === 'flight_only' && (
                    <div className="mt-2 p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-300 text-xs flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />
                      <p>
                        {isNorwegian
                          ? 'Viktig Blueprint-regel: Fly har smale 8%–14% marginer. Flybesparelser akkumuleres trygt under Track B (Årsrevisjon), men kan ikke utløse 100% full refusjon på en enkeltstående billig flybillett.'
                          : 'Important Blueprint Rule: Flights operate on thin 8%–14% net margins. Flight savings accumulate under Track B (Annual Audit), but cannot trigger an immediate €110 refund on a single standalone economy ticket.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Member & Booking Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    {isNorwegian ? 'Fullt Navn' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Pål Juritzen"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    {isNorwegian ? 'E-postadresse' : 'Email Address'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    placeholder="pal@example.com"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    {isNorwegian ? 'Atlas Bookingreferanse' : 'Atlas Booking Reference'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingRef}
                    onChange={(e) => setBookingRef(e.target.value)}
                    placeholder="ATLAS-BK-8821"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    {isNorwegian ? 'Hotell / Destinasjon' : 'Hotel / Destination'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="The Clermont Hotel, London"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              {category === 'wholesale_hotel' && (
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    {isNorwegian ? 'Antall Netter (min. 2 netter for Track A)' : 'Number of Nights (min. 2 for Track A)'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={nights}
                    onChange={(e) => setNights(parseInt(e.target.value, 10) || 1)}
                    className="w-28 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white font-mono"
                  />
                </div>
              )}

              <button
                type="button"
                disabled={!memberName || !memberEmail || !bookingRef || !destination}
                onClick={() => setStep(2)}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-950 font-mono font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-400/10"
              >
                <span>{isNorwegian ? 'Neste: Prissammenligning' : 'Next: Price Comparison'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    {isNorwegian ? `Pris betalt hos Atlas (${currentCurrency})` : `Atlas Price Paid (${currentCurrency})`} *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={atlasPricePaid}
                    onChange={(e) => setAtlasPricePaid(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    {isNorwegian
                      ? `Offentlig butikkpris (${currentCurrency})`
                      : `Public Retail Price (${currentCurrency})`} *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={publicRetailPrice}
                    onChange={(e) => setPublicRetailPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    {isNorwegian ? 'Sammenligningskilde' : 'Comparison Source'} *
                  </label>
                  <select
                    value={retailSource}
                    onChange={(e) => setRetailSource(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white font-mono"
                  >
                    <option value="Booking.com">Booking.com</option>
                    <option value="Expedia">Expedia</option>
                    <option value="Hotels.com">Hotels.com</option>
                    <option value="Direct Hotel Website">Hotel Direct Website</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    {isNorwegian ? 'URL-lenke til tilsvarende rom' : 'URL Link to Identical Room'}
                  </label>
                  <input
                    type="url"
                    value={retailEvidenceUrl}
                    onChange={(e) => setRetailEvidenceUrl(e.target.value)}
                    placeholder="https://booking.com/hotel/..."
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white font-mono"
                  />
                </div>
              </div>

              {/* Dynamic Pre-Validation Card */}
              <div
                className={`p-4 rounded-xl border text-xs font-mono leading-relaxed flex items-start gap-3 ${
                  previewValidation.isEligible
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                }`}
              >
                {previewValidation.isEligible ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                    <span>
                      {previewValidation.isEligible
                        ? (isNorwegian ? 'Kvalifisert for 100% Verdigaranti' : 'Eligible for 100% Value Guarantee')
                        : (isNorwegian ? 'Validering under Blueprint' : 'Blueprint Validation Status')}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40">
                      {isNorwegian ? 'Beregnet besparelse:' : 'Calculated Savings:'} {previewValidation.calculatedSavings}{' '}
                      {currentCurrency}
                    </span>
                  </div>
                  <p>{previewValidation.statusReason}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  {isNorwegian ? 'Tilleggskommentarer (valgfritt)' : 'Additional Comments (Optional)'}
                </label>
                <textarea
                  rows={2}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder={
                    isNorwegian
                      ? 'F.eks. romtype eller datoer som bekrefter sammenligningen...'
                      : 'E.g., room category or dates confirming the apples-to-apples comparison...'
                  }
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs rounded-xl border border-neutral-800 transition cursor-pointer"
                >
                  {isNorwegian ? 'Tilbake' : 'Back'}
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-mono font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-400/10"
                >
                  <span>{isNorwegian ? 'Send Inn Krav om 100% Refusjon' : 'Submit 100% Refund Claim'}</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 3 && submittedClaim && (
            <div className="space-y-5 py-4 text-center animate-fade-in font-mono">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-cinzel font-bold text-white mb-1">
                  {isNorwegian ? 'Krav Mottatt & Forhåndsvalidert' : 'Claim Received & Pre-Validated'}
                </h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  {isNorwegian
                    ? 'Ditt krav om verdigaranti er registrert i henhold til The Atlas Value Guarantee Blueprint.'
                    : 'Your Value Guarantee claim has been logged in accordance with the Atlas Value Guarantee Blueprint.'}
                </p>
              </div>

              {/* Digital Certificate Receipt */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Claim Reference ID:</span>
                  <span className="font-bold text-amber-400">{submittedClaim.id}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Member:</span>
                  <span className="text-neutral-200">{submittedClaim.memberName} ({submittedClaim.memberEmail})</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Booking / Destination:</span>
                  <span className="text-neutral-200">{submittedClaim.destination} ({submittedClaim.bookingRef})</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Refund Amount Guaranteed:</span>
                  <span className="font-bold text-emerald-400">
                    {submittedClaim.annualFeePaid} {submittedClaim.currency} (100% of Annual Dues)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Governing SLA:</span>
                  <span className="text-neutral-300">Under 48 Hours via Hard Rock Capital Ltd</span>
                </div>
              </div>

              {/* Reassurance Notice */}
              <div className="p-3.5 rounded-xl bg-amber-400/5 border border-amber-400/20 text-[11px] text-amber-300/90 text-left leading-relaxed">
                <strong>{isNorwegian ? '100% Trygghet:' : '100% Peace of Mind:'}</strong>{' '}
                {isNorwegian
                  ? 'Du beholder din utstedte Connex 3-dagers hotellkupong (verdi 5 400 kr) og alle opptjente Rewards Vault-poeng. Refusjonen tilbakeføres direkte til ditt betalingskort.'
                  : 'You retain your issued Connex 3-Day European Hotel Voucher (worth €480) and all earned Rewards Vault points. The refund will be credited directly to your original payment card.'}
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-bold rounded-xl transition cursor-pointer"
              >
                {isNorwegian ? 'Lukk Vindu' : 'Close Window'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
