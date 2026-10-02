import React, { useState } from 'react';
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
  ShieldCheck,
  Award,
} from 'lucide-react';
import { CalculationResult } from '../lib/calculatorModel';
import { registerSubscriber } from '../lib/firebase';
import { addNewLeadFromRegistration } from '../lib/crmService';
import { dispatchFounderWelcomeEmail } from '../lib/emailService';
import { FounderCertificateData } from './FounderCertificateModal';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatedSavings?: CalculationResult | null;
  onViewCertificate?: (data: FounderCertificateData) => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  calculatedSavings,
  onViewCertificate,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappSameAsPhone, setWhatsappSameAsPhone] = useState(true);
  const [whatsapp, setWhatsapp] = useState('');
  const [messenger, setMessenger] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'call' | 'sms' | 'email' | 'messenger'>('whatsapp');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    fullName: string;
    email: string;
    phone: string;
    inviteCode: string;
  } | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!phone.trim() || phone.trim().length < 6) {
      setErrorMessage('Please enter a valid cell phone / mobile number.');
      return;
    }

    const resolvedWhatsapp = whatsappSameAsPhone ? phone.trim() : whatsapp.trim() || phone.trim();

    setIsSubmitting(true);
    try {
      const tierDesc = calculatedSavings
        ? `${calculatedSavings.totalNights} Nights ($${calculatedSavings.formattedSavings} saved/yr)`
        : 'Founder Member (50% Off Lifetime)';

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

      // Dispatch official Founder Member Welcome Email via Google Gmail SMTP backend
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
    } catch (err: unknown) {
      console.error('Waitlist submission error:', err);
      setErrorMessage(
        err instanceof Error && !err.message.includes('{')
          ? err.message
          : 'Unable to register subscription. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
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
                Founder Member Registration
              </h3>
              <span className="text-[11px] text-amber-300 font-mono">
                50% Off Lifetime + 5 Free Lifetime Draws
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
          {submissionResult ? (
            /* Success confirmation */
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-neutral-100">
                    Founder Privilege Reserved!
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Welcome, <strong className="text-amber-300">{submissionResult.fullName}</strong>. Your priority position is officially registered.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs text-neutral-400 block font-mono">Your Founder Reference Code:</span>
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
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-neutral-300 space-y-1">
                <div className="font-bold text-amber-300">Certified Guarantees:</div>
                <div className="text-[11px] text-neutral-400">
                  ✓ 50% discount on membership locked for life<br />
                  ✓ Entered in the launch draw for 1 of 5 Free Lifetime Memberships<br />
                  ✓ Confirmation logged for {submissionResult.email} ({submissionResult.phone})
                </div>
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
                  <span>View Official Founder Certificate</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              {calculatedSavings && (
                <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300 block font-semibold">
                      Your Modeled Annual Savings
                    </span>
                    <span className="text-lg sm:text-xl font-cinzel font-bold text-amber-200">
                      {calculatedSavings.formattedSavings} / year
                    </span>
                  </div>
                  <div className="text-right text-xs font-mono text-neutral-300">
                    {calculatedSavings.totalNights} Nights • {calculatedSavings.savingsPercentage}% Off
                  </div>
                </div>
              )}

              {/* Founder Guarantees Banner */}
              <div className="p-3 rounded-2xl bg-neutral-950/90 border border-amber-400/40 text-xs text-neutral-300 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Guaranteed Founder Member Privileges:</span>
                </div>
                <div className="text-[11px] text-neutral-300 pl-1 space-y-0.5 font-mono">
                  <div>✓ <strong>50% Off Membership for Life</strong></div>
                  <div>✓ <strong>5 Free Lifetime Memberships</strong> random launch draw entry</div>
                </div>
              </div>

              {/* 1. Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Full Name: *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alexander Vance"
                    required
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-amber-400 text-neutral-100 placeholder-neutral-500 text-xs sm:text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* 2. Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Email Address: *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
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
                    Cell Phone / Mobile: *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
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
                    <span>WhatsApp is the same as cell phone number</span>
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
                      placeholder="Custom WhatsApp Number (+country code)"
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-amber-400 text-neutral-100 placeholder-neutral-500 text-xs sm:text-sm outline-none transition"
                    />
                  </div>
                )}
              </div>

              {/* 4. Facebook Messenger (Optional) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Facebook Messenger / Username: <span className="text-neutral-500 lowercase">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <MessageSquare className="w-4 h-4 text-sky-400" />
                  </div>
                  <input
                    type="text"
                    value={messenger}
                    onChange={(e) => setMessenger(e.target.value)}
                    placeholder="m.me/yourname or Messenger handle"
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 focus:border-amber-400 text-neutral-100 placeholder-neutral-500 text-xs sm:text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* 5. Preferred Contact Method */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Preferred Contact Channel:
                </label>
                <div className="grid grid-cols-5 gap-1.5 text-center">
                  {[
                    { id: 'whatsapp', label: 'WhatsApp' },
                    { id: 'call', label: 'Call' },
                    { id: 'sms', label: 'SMS' },
                    { id: 'email', label: 'Email' },
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
                  <span>Reserving Founder Member Spot...</span>
                ) : (
                  <>
                    <span>Confirm Founder Member Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                <span>We respect your privacy. Strictly for Founder onboarding and B2B rate audits.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
