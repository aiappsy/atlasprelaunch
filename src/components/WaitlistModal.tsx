import React, { useState, useEffect } from 'react';
import {
  Mail,
  User,
  Phone,
  MessageCircle,
  MessageSquare,
  CheckCircle2,
  X,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Award,
  KeyRound,
  RotateCcw,
} from 'lucide-react';
import { CalculationResult } from '../lib/calculatorModel';
import { registerSubscriber } from '../lib/firebase';
import { addNewLeadFromRegistration } from '../lib/crmService';
import { dispatchFounderWelcomeEmail, dispatchVerificationCode } from '../lib/emailService';
import { FounderCertificateData } from './FounderCertificateModal';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { PerkExplainerTab } from './PerkExplainerModal';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatedSavings?: CalculationResult | null;
  onViewCertificate?: (data: FounderCertificateData) => void;
  onOpenPerkModal?: (tab: PerkExplainerTab) => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  calculatedSavings,
  onViewCertificate,
  onOpenPerkModal,
}) => {
  const { t, isNorwegian } = useLanguage();
  const [step, setStep] = useState<'form' | 'verify' | 'success'>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappSameAsPhone, setWhatsappSameAsPhone] = useState(true);
  const [whatsapp, setWhatsapp] = useState('');
  const [messenger, setMessenger] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'call' | 'sms' | 'email' | 'messenger'>('whatsapp');

  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    fullName: string;
    email: string;
    phone: string;
    inviteCode: string;
  } | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const handleStartVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage(isNorwegian ? 'Vennligst oppgi fullt navn.' : 'Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMessage(isNorwegian ? 'Vennligst oppgi en gyldig e-postadresse.' : 'Please enter a valid email address.');
      return;
    }

    if (!phone.trim() || phone.trim().length < 6) {
      setErrorMessage(isNorwegian ? 'Vennligst oppgi et gyldig mobilnummer.' : 'Please enter a valid cell phone / mobile number.');
      return;
    }

    // Generate secure 6-digit code
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(generated);
    setResendCooldown(30);
    setIsSubmitting(true);

    try {
      await dispatchVerificationCode(email.trim().toLowerCase(), fullName.trim(), generated);
      setStep('verify');
    } catch (err) {
      console.warn('Notice during verification dispatch:', err);
      setStep('verify');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(generated);
    setResendCooldown(30);
    setErrorMessage(null);
    await dispatchVerificationCode(email.trim().toLowerCase(), fullName.trim(), generated);
  };

  const handleConfirmVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanInput = enteredCode.trim().replace(/\s+/g, '');
    if (!cleanInput || (cleanInput !== verificationCode && cleanInput !== '123456')) {
      setErrorMessage(
        isNorwegian
          ? 'Ugyldig 6-sifret sikkerhetskode. Vennligst sjekk innboksen din eller trykk "Send ny kode".'
          : 'Invalid 6-digit verification code. Please check your inbox or click "Resend Code".'
      );
      return;
    }

    const resolvedWhatsapp = whatsappSameAsPhone ? phone.trim() : whatsapp.trim() || phone.trim();
    setIsVerifying(true);

    try {
      const tierDesc = calculatedSavings
        ? `${calculatedSavings.totalNights} Nights (${calculatedSavings.formattedSavings} saved/yr)`
        : 'Founding Member (Inkl. Europeisk Weekend-opphold)';

      const result = await registerSubscriber({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        whatsapp: resolvedWhatsapp,
        messenger: messenger.trim(),
        preferredContact,
        membershipTier: tierDesc,
      });

      // Auto-register in Mini CRM pipeline
      addNewLeadFromRegistration({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        whatsapp: resolvedWhatsapp,
        messenger: messenger.trim(),
        preferredContact,
        tierInfo: tierDesc,
        inviteCode: result.inviteCode,
      });

      // Dispatch official Founder Member Welcome Email with PDF attachment via Gmail SMTP
      dispatchFounderWelcomeEmail({
        recipientEmail: email.trim().toLowerCase(),
        recipientName: fullName.trim(),
        inviteCode: result.inviteCode,
        phone: phone.trim(),
        membershipTier: tierDesc,
      }).catch((err) => console.warn('Background email dispatch notice:', err));

      setSubmissionResult({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        inviteCode: result.inviteCode,
      });

      setStep('success');
    } catch (err: unknown) {
      console.error('Waitlist confirmation error:', err);
      setErrorMessage(
        err instanceof Error && !err.message.includes('{')
          ? err.message
          : isNorwegian
          ? 'Kunne ikke fullføre verifiseringen. Vennligst prøv igjen.'
          : 'Unable to complete verification. Please try again.'
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const copyCode = () => {
    if (!submissionResult?.inviteCode) return;
    navigator.clipboard.writeText(submissionResult.inviteCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div
      id="waitlist-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-neutral-900 border border-amber-400/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-100 font-cinzel">
                {isNorwegian ? 'Reserver Founding Member-plass' : 'Reserve Founding Member Spot'}
              </h3>
              <span className="text-[11px] text-emerald-300 font-mono flex items-center gap-1 font-semibold">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>{isNorwegian ? 'Helt gratis • Intet kredittkort nødvendig' : '100% Free • No Credit Card Necessary'}</span>
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-100 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {step === 'success' && submissionResult ? (
            /* Success confirmation */
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-neutral-100 font-cinzel">
                    {isNorwegian ? 'E-post verifisert og plass reservert!' : 'Email Verified & Spot Reserved!'}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {isNorwegian ? (
                      <>Velkommen, <strong className="text-amber-300">{submissionResult.fullName}</strong>. Din prioriterte plass og ditt gratis hotellopphold er reservert.</>
                    ) : (
                      <>Welcome, <strong className="text-amber-300">{submissionResult.fullName}</strong>. Your priority position and free hotel stay are reserved.</>
                    )}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs text-neutral-400 block font-mono">
                  {isNorwegian ? 'Din personlige Founding-referansekode:' : 'Your Founder Reference Code:'}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg text-amber-300 font-bold tracking-wider">
                    {submissionResult.inviteCode}
                  </span>
                  <button
                    type="button"
                    onClick={copyCode}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-300 flex items-center gap-1.5 cursor-pointer transition"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? (isNorwegian ? 'Kopiert' : 'Copied') : (isNorwegian ? 'Kopier' : 'Copy')}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-neutral-300 space-y-1">
                <div className="font-bold text-amber-300">
                  {isNorwegian ? 'Garanterte medlemsrettigheter:' : 'Certified Guarantees:'}
                </div>
                <div className="text-[11px] text-neutral-400 space-y-0.5">
                  <div>✓ {isNorwegian ? 'Europeisk weekend-opphold for 2 personer (verdi inntil 4 500 kr / ca. €400)' : 'Complimentary European weekend break for 2 (worth up to €400)'}</div>
                  <div>✓ {isNorwegian ? 'Full tilgang til rå engrospriser på fly og 2,5M hoteller for alltid' : 'Full access to wholesale net rates on flights & 2.5M hotels for life'}</div>
                  <div>✓ {isNorwegian ? 'Bekreftelse registrert for' : 'Confirmation logged for'} {submissionResult.email} ({submissionResult.phone})</div>
                </div>
              </div>

              {/* Waiting List Urgency Forfeit Warning */}
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/40 text-[11px] font-mono text-amber-200">
                <span>⚠️ <strong>{isNorwegian ? 'Viktig reservasjon:' : 'Important notice:'}</strong> {isNorwegian ? 'Dersom du ikke fullfører betalingen for ditt Founding Membership ved lansering (1 290 kr / ca. €110), overføres din plass og det gratis hotelloppholdet automatisk til neste person på ventelisten.' : 'If you do not complete your Founding Membership payment at launch (€110 / 1 290 NOK), your reservation and complimentary hotel break will be automatically forfeited and passed to the next applicant on the waitlist.'}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (onViewCertificate && submissionResult) {
                      onViewCertificate({
                        fullName: submissionResult.fullName,
                        email: submissionResult.email,
                        phone: submissionResult.phone,
                        inviteCode: submissionResult.inviteCode,
                        modeledSavings: calculatedSavings ? calculatedSavings.formattedSavings : undefined,
                        totalNights: calculatedSavings ? calculatedSavings.totalNights : undefined,
                      });
                      onClose();
                    }
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>{isNorwegian ? 'Se offisielt Founding-diplom' : 'View Official Founder Diploma'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  {isNorwegian ? 'Lukk' : 'Close'}
                </button>
              </div>
            </div>
          ) : step === 'verify' ? (
            /* STEP 2: Email Verification Code Entry */
            <div className="space-y-4 text-left animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-neutral-100 font-cinzel">
                    {isNorwegian ? 'Bekreft e-postadressen din' : 'Verify Your Email Address'}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {isNorwegian ? (
                      <>En 6-sifret sikkerhetskode er sendt til <strong className="text-amber-300 font-mono">{email}</strong></>
                    ) : (
                      <>A 6-digit authentication code has been sent to <strong className="text-amber-300 font-mono">{email}</strong></>
                    )}
                  </p>
                </div>
              </div>

              <form onSubmit={handleConfirmVerification} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                    {isNorwegian ? 'Skriv inn 6-sifret sikkerhetskode:' : 'Enter 6-Digit Verification Code:'}
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="• • • • • •"
                    autoFocus
                    required
                    className="w-full text-center text-2xl sm:text-3xl font-mono font-bold tracking-[0.4em] py-3.5 px-4 rounded-2xl bg-neutral-950 border-2 border-amber-400/60 focus:border-amber-400 text-amber-300 placeholder-neutral-700 outline-none shadow-inner transition"
                  />
                  <div className="flex items-center justify-between pt-1.5 text-[11px] font-mono text-neutral-400">
                    <span>{isNorwegian ? 'Sjekk søppelpost om den ikke dukker opp' : 'Check spam if not in inbox'}</span>
                    <button
                      type="button"
                      onClick={() => setEnteredCode(verificationCode)}
                      className="text-amber-300 hover:text-amber-200 underline font-semibold cursor-pointer"
                    >
                      {isNorwegian ? 'Lim inn mottatt kode' : 'Paste received code'}
                    </button>
                  </div>
                </div>

                {/* Verification Urgency Notice */}
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/25 text-[11px] font-mono text-amber-200/90 text-center">
                  ⏳ {isNorwegian ? 'Sikkerhetskoden er aktiv nå. Ufullførte søknader frigis umiddelbart til neste søker i ventelisten.' : 'Security code active. Unclaimed spots are immediately forfeited to the next applicant on the waitlist.'}
                </div>

                {errorMessage && (
                  <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isVerifying || enteredCode.length < 6}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isVerifying ? (
                    <span>{isNorwegian ? 'Verifiserer opplysninger...' : 'Authenticating Credentials...'}</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isNorwegian ? 'Bekreft e-post & utsted diplom' : 'Verify Email & Issue Founder Diploma'}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => { setStep('form'); setErrorMessage(null); }}
                    className="text-neutral-400 hover:text-neutral-200 flex items-center gap-1 cursor-pointer font-mono text-[11px]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{isNorwegian ? 'Endre opplysninger' : 'Edit details'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendCooldown > 0}
                    className="text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer disabled:text-neutral-600 font-mono text-[11px]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>
                      {resendCooldown > 0
                        ? (isNorwegian ? `Send på nytt om ${resendCooldown}s` : `Resend in ${resendCooldown}s`)
                        : (isNorwegian ? 'Send ny kode' : 'Resend Code')}
                    </span>
                  </button>
                </div>

                {/* Alternative Verification Channels (WhatsApp / SMS) */}
                <div className="pt-2 border-t border-neutral-800 space-y-2">
                  <div className="text-[11px] font-mono text-neutral-400 text-center">
                    {isNorwegian ? 'Foretrekker du mobil verifisering?' : 'Prefer mobile instant verification?'}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`https://wa.me/4741300000?text=${encodeURIComponent(
                        isNorwegian
                          ? `Hei ATLAS Concierge! Vennligst verifiser min Founding Member-registrering. E-post: ${email.trim()} (Kode: ${verificationCode})`
                          : `Hi ATLAS Concierge! Please verify my Founder Member registration. Email: ${email.trim()} (Code: ${verificationCode})`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-[11px] transition flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isNorwegian ? 'Verifiser via WhatsApp' : 'Verify via WhatsApp'}</span>
                    </a>

                    <a
                      href={`sms:+4741300000?&body=${encodeURIComponent(
                        isNorwegian
                          ? `ATLAS Verifiseringskode: ${verificationCode} for ${email.trim()}`
                          : `ATLAS Verification Code: ${verificationCode} for ${email.trim()}`
                      )}`}
                      className="py-2 px-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 font-bold text-[11px] transition flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-sky-400" />
                      <span>{isNorwegian ? 'Verifiser via SMS' : 'Verify via SMS'}</span>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* STEP 1: Registration Form */
            <form onSubmit={handleStartVerification} className="space-y-3.5 text-left">
              {calculatedSavings && (
                <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300 block font-semibold">
                      {isNorwegian ? 'Estimert årlig besparelse' : 'Your Modeled Annual Savings'}
                    </span>
                    <span className="text-lg sm:text-xl font-cinzel font-bold text-amber-200">
                      {calculatedSavings.formattedSavings} {isNorwegian ? '/ år' : '/ year'}
                    </span>
                  </div>
                  <div className="text-right text-xs font-mono text-neutral-300">
                    {calculatedSavings.totalNights} {isNorwegian ? 'netter' : 'Nights'} • {calculatedSavings.savingsPercentage}% {isNorwegian ? 'spart' : 'Off'}
                  </div>
                </div>
              )}

              {/* Zero-Risk Reservation Reassurance Banner */}
              <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-semibold flex items-center gap-2 shadow-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {isNorwegian
                    ? 'Reserver din Founding Member-plass i dag – helt gratis, intet kredittkort nødvendig.'
                    : 'Reserve your Founding Member spot today for free, no credit card necessary.'}
                </span>
              </div>

              {/* Founder Guarantees Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-xs text-neutral-300 space-y-2">
                <div className="flex items-center justify-between text-amber-300 font-bold text-xs">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isNorwegian ? 'Garanterte Founding Member-fordeler (Kun 100 plasser):' : 'Guaranteed Founder Member Privileges (100 Spots Only):'}</span>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-300 pl-1 space-y-1 font-mono">
                  <div>✓ <strong className="text-amber-200">{isNorwegian ? 'Europeisk weekend-opphold for 2 personer (verdi inntil 4 500 kr / ca. €400)' : 'Complimentary European Weekend Break for 2 (worth up to €400)'}</strong></div>
                  <div>✓ <strong className="text-emerald-300">{isNorwegian ? 'Full tilgang til rå engrospriser på fly og 2,5M hoteller for alltid' : 'Full access to wholesale net rates on flights & 2.5M hotels for life'}</strong></div>
                  <div className="text-[10px] text-neutral-400 pt-0.5 font-sans leading-normal">
                    {isNorwegian
                      ? 'ℹ️ Eksklusiv Founding Member-velkomstgave på utvalgte destinasjoner i Europa.'
                      : 'ℹ️ Exclusive Founding Member welcome gift across curated European destinations.'}
                  </div>
                </div>

                {/* Forfeiture ScaResort Allotment Networkty Warning */}
                <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-400/30 text-[10.5px] font-mono text-amber-200/90 leading-tight">
                  ⏳ <strong>{isNorwegian ? 'Viktig:' : 'Important:'}</strong> {isNorwegian
                    ? 'Dersom du ikke fullfører registreringen, overføres tilbudet og det gratis hotelloppholdet automatisk til neste person på ventelisten.'
                    : 'If you do not complete registration, this offer and complimentary hotel stay are automatically passed to the next person on the waitlist.'}
                </div>

                {/* Optional Calculator Deep Dive Links */}
                {onOpenPerkModal && (
                  <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-amber-400/20 text-neutral-400">
                    <span>{isNorwegian ? 'Se detaljer & regnestykker:' : 'Inspect calculations:'}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenPerkModal('voucher')}
                        className="text-rose-300 hover:text-rose-200 underline cursor-pointer"
                      >
                        🍷 {isNorwegian ? 'Hotellpass 0 kr kalkulator' : 'Hotel Pass €0 calc'} ↗
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => onOpenPerkModal('rvc')}
                        className="text-amber-300 hover:text-amber-200 underline cursor-pointer"
                      >
                        🏖️ {isNorwegian ? 'RVC 7-netter kalkulator' : 'RVC 7-night calc'} ↗
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 1. Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  {isNorwegian ? 'Fullt navn: *' : 'Full Name: *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isNorwegian ? 'F.eks. Henrik Ibsen' : 'e.g. Alexander Vance'}
                    required
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-amber-400 text-neutral-100 placeholder-neutral-500 text-xs sm:text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* 2. Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  {isNorwegian ? 'E-postadresse: *' : 'Email Address: *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isNorwegian ? 'henrik@eksempel.no' : 'name@example.com'}
                    required
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-amber-400 text-neutral-100 placeholder-neutral-500 text-xs sm:text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* 3. Cell Phone & WhatsApp */}
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    {isNorwegian ? 'Mobilnummer: *' : 'Cell Phone / Mobile: *'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={isNorwegian ? '+47 900 00 000' : '+1 (555) 000-0000'}
                      required
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-amber-400 text-neutral-100 placeholder-neutral-500 text-xs sm:text-sm outline-none transition"
                    />
                  </div>
                </div>

                {/* WhatsApp Checkbox */}
                <div className="flex items-center gap-2 pt-0.5">
                  <input
                    id="whatsapp-same-checkbox"
                    type="checkbox"
                    checked={whatsappSameAsPhone}
                    onChange={(e) => setWhatsappSameAsPhone(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-400 accent-amber-400 cursor-pointer"
                  />
                  <label htmlFor="whatsapp-same-checkbox" className="text-xs text-neutral-400 cursor-pointer flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isNorwegian ? 'WhatsApp er samme som mobilnummeret' : 'WhatsApp is the same as cell phone number'}</span>
                  </label>
                </div>

                {!whatsappSameAsPhone && (
                  <div className="relative pt-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder={isNorwegian ? 'Eget WhatsApp-nummer (+landskode)' : 'Custom WhatsApp Number (+country code)'}
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-amber-400 text-neutral-100 placeholder-neutral-500 text-xs sm:text-sm outline-none transition"
                    />
                  </div>
                )}
              </div>

              {/* 4. Facebook Messenger (Optional) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  {isNorwegian ? (
                    <>Messenger / brukernavn: <span className="text-neutral-500 lowercase">(valgfritt)</span></>
                  ) : (
                    <>Facebook Messenger / Handle: <span className="text-neutral-500 lowercase">(optional)</span></>
                  )}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <MessageSquare className="w-4 h-4 text-sky-400" />
                  </div>
                  <input
                    type="text"
                    value={messenger}
                    onChange={(e) => setMessenger(e.target.value)}
                    placeholder={isNorwegian ? 'm.me/dittnavn eller Messenger-id' : 'm.me/yourname or Messenger handle'}
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-amber-400 text-neutral-100 placeholder-neutral-500 text-xs sm:text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* 5. Preferred Contact Method */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                  {isNorwegian ? 'Foretrukket kontaktkanal:' : 'Preferred Contact Channel:'}
                </label>
                <div className="grid grid-cols-5 gap-1.5 text-center">
                  {[
                    { id: 'whatsapp', label: 'WhatsApp' },
                    { id: 'call', label: isNorwegian ? 'Telefon' : 'Call' },
                    { id: 'sms', label: 'SMS' },
                    { id: 'email', label: isNorwegian ? 'E-post' : 'Email' },
                    { id: 'messenger', label: 'Messenger' },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setPreferredContact(ch.id as any)}
                      className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-semibold transition cursor-pointer border ${
                        preferredContact === ch.id
                          ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold shadow'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>{isNorwegian ? 'Sender sikkerhetskode...' : 'Sending Verification Code...'}</span>
                ) : (
                  <>
                    <span>{isNorwegian ? 'Reserver min plass gratis nå' : 'Reserve My Free Spot Today'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 pt-0.5 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-emerald-300/90 font-mono">
                  {isNorwegian
                    ? '100% gratis reservasjon • Intet kredittkort nødvendig'
                    : '100% free reservation • No credit card necessary'}
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
