import React, { useState } from 'react';
import {
  X,
  Award,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Mail,
  QrCode,
  ShieldCheck,
  Building2,
  Users,
  Smartphone,
  CreditCard,
  Gift,
} from 'lucide-react';

export interface FounderCertificateData {
  fullName?: string;
  email: string;
  phone?: string;
  inviteCode: string;
  subscriberId?: string;
  modeledSavings?: string;
  totalNights?: number;
  issueDate?: string;
}

interface FounderCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FounderCertificateData | null;
}

export const FounderCertificateModal: React.FC<FounderCertificateModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [activeTab, setActiveTab] = useState<'certificate' | 'email'>('certificate');
  const [isCopied, setIsCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  if (!isOpen || !data) return null;

  const issueDateFormatted = data.issueDate
    ? new Date(data.issueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  const copyCode = () => {
    navigator.clipboard.writeText(data.inviteCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const printOrDownload = () => {
    window.print();
  };

  return (
    <div
      id="founder-certificate-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-amber-400/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-5 sm:px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-neutral-100 font-cinzel">
                  Founder Member Certificate
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  Issued
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">
                Issued to: <span className="text-amber-300">{data.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('certificate')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer font-semibold ${
                  activeTab === 'certificate'
                    ? 'bg-amber-400 text-neutral-950 shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Certificate Pass
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('email')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer font-semibold ${
                  activeTab === 'email'
                    ? 'bg-amber-400 text-neutral-950 shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Welcome Dispatch
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-100 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5 text-left">
          {activeTab === 'certificate' ? (
            /* ======================================================== */
            /* TAB 1: 3D HOLOGRAPHIC STYLE FOUNDER MEMBER CERTIFICATE  */
            /* ======================================================== */
            <div className="space-y-4">
              <div
                id="printable-founder-certificate"
                className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-neutral-900 via-amber-950/40 to-neutral-950 border-2 border-amber-400/60 shadow-2xl shadow-black/80"
              >
                {/* Holographic Ambient Shine Overlays */}
                <div className="absolute -right-24 -top-24 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

                {/* Certificate Top Header */}
                <div className="flex items-center justify-between relative z-10 mb-6 pb-4 border-b border-amber-400/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-300">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <span className="font-cinzel text-base sm:text-lg font-bold tracking-widest uppercase text-neutral-100 block">
                        Atlas Travel Club
                      </span>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
                        Official Founder Member Certificate
                      </span>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300">
                    VIP Founder Pass
                  </div>
                </div>

                {/* EMV Gold Chip & Sovereign Emblem */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="w-13 h-10 rounded-xl bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-200/60 shadow-inner flex items-center justify-around px-1.5">
                    <div className="w-full h-4 border-t border-b border-amber-900/50" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Closed-Loop Rate Parity Exempt</span>
                  </div>
                </div>

                {/* Founder Member Credentials Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10 mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block tracking-wider">
                      Founder Reference ID
                    </span>
                    <span className="font-mono text-base sm:text-lg font-bold tracking-wider text-amber-300">
                      {data.inviteCode}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block tracking-wider">
                      Certificate Holder
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-neutral-100 truncate block">
                      {data.fullName || data.email}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 block truncate">
                      {data.email} {data.phone ? `• ${data.phone}` : ''}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block tracking-wider">
                      Issue Date
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-neutral-300">
                      {issueDateFormatted}
                    </span>
                  </div>
                </div>

                {/* Guaranteed Founder Privileges Box */}
                <div className="relative z-10 p-4 rounded-2xl bg-neutral-950/80 border border-amber-400/30 space-y-2 mb-4">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-300 tracking-wider block">
                    Certified Founder Member Guarantees:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-neutral-200">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>50% Off Membership for Life</strong> (Locked)</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-200">
                      <Gift className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>5 Free Lifetime Draw</strong> Entry Active</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-200">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Direct B2B Net Bedbank Rates</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-200">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>4 Family Guest Passes Included</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Verification & Barcode Strip */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-400">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Registered in Atlas Sovereign Club Registry</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowQR(!showQR)}
                    className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-amber-300 hover:text-amber-200 cursor-pointer"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>{showQR ? 'Hide Voucher QR' : 'Show Voucher QR'}</span>
                  </button>
                </div>

                {/* QR Expansion */}
                {showQR && (
                  <div className="mt-4 p-4 bg-white rounded-2xl text-slate-900 text-center animate-in fade-in zoom-in-95 relative z-10">
                    <div className="w-32 h-32 mx-auto bg-slate-950 p-2 rounded-xl flex items-center justify-center">
                      <svg className="w-28 h-28 text-white" viewBox="0 0 100 100" fill="currentColor">
                        <rect x="10" y="10" width="25" height="25" fill="#fff" />
                        <rect x="15" y="15" width="15" height="15" fill="#000" />
                        <rect x="65" y="10" width="25" height="25" fill="#fff" />
                        <rect x="70" y="15" width="15" height="15" fill="#000" />
                        <rect x="10" y="65" width="25" height="25" fill="#fff" />
                        <rect x="15" y="70" width="15" height="15" fill="#000" />
                        <rect x="40" y="10" width="10" height="20" fill="#fff" />
                        <rect x="40" y="40" width="20" height="20" fill="#fff" />
                        <rect x="70" y="50" width="15" height="15" fill="#fff" />
                        <rect x="40" y="70" width="20" height="15" fill="#fff" />
                      </svg>
                    </div>
                    <p className="text-xs font-mono font-bold mt-2 text-slate-900">
                      {data.inviteCode}-FOUNDER-VERIFIED
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Valid for closed-loop B2B bedbank onboarding
                    </p>
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={copyCode}
                  className="flex-1 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopied ? 'Code Copied' : 'Copy Reference Code'}</span>
                </button>

                <button
                  type="button"
                  onClick={printOrDownload}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Print Certificate</span>
                </button>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* TAB 2: OFFICIAL WELCOME EMAIL DISPATCH (ORIGINAL REPO)   */
            /* ======================================================== */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="text-neutral-500">Dispatch Status:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Delivered to Member</span>
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500">From: </span>
                  <span className="text-neutral-200">Atlas Travel Club &lt;invitations@atlastravelclub.com&gt;</span>
                </div>
                <div>
                  <span className="text-neutral-500">To: </span>
                  <span className="text-neutral-200">{data.email}</span>
                </div>
                <div>
                  <span className="text-neutral-500">Subject: </span>
                  <span className="text-amber-300 font-semibold">
                    Welcome to Atlas Travel Club | Founder Member Early Access Confirmation
                  </span>
                </div>
              </div>

              {/* Email Content Body */}
              <div className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                <p>Hello,</p>
                <p>
                  Thank you for securing your position on the <strong>Atlas Travel Club</strong> early access waitlist.
                </p>
                <p>
                  As an initial Founder Member, your exclusive privileges are officially recorded:
                </p>

                <div className="p-4 rounded-xl bg-neutral-900 border border-amber-400/30 space-y-2 text-xs">
                  <div className="text-amber-300 font-bold font-mono">1. 50% Lifetime Membership Discount:</div>
                  <p className="text-neutral-300">
                    Your club membership is locked at half price for life upon launch.
                  </p>
                  <div className="text-amber-300 font-bold font-mono pt-1">2. Entry in 5 Free Lifetime Memberships Draw:</div>
                  <p className="text-neutral-300">
                    Your email is entered in the launch draw to win 100% free membership with zero annual dues permanently.
                  </p>
                  <div className="text-amber-300 font-bold font-mono pt-1">3. Founder Reference Code:</div>
                  <p className="font-mono text-base font-bold text-amber-400">{data.inviteCode}</p>
                </div>

                <p className="text-xs text-neutral-400">
                  We are finalizing direct B2B integrations with institutional bedbanks (Hotelbeds, WebBeds) to bring you wholesale net rates across 1M+ hotels and villas. You will be notified the moment member onboarding opens.
                </p>

                <div className="pt-2 text-xs text-neutral-400 font-mono">
                  Warm regards,<br />
                  <strong>The Atlas Membership Committee</strong><br />
                  atlastravelclub.com
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs">
          <span className="text-neutral-500 font-mono">
            Atlas Travel Club Sovereign Registry
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold cursor-pointer transition"
          >
            Close Certificate
          </button>
        </div>
      </div>
    </div>
  );
};
