import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Scale,
  PlaneTakeoff,
  Vault,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'guarantee' | 'wholesale' | 'passenger_rights' | 'escrow' | 'governance';
  onOpenRefundModal?: () => void;
}

export const ComplianceModal: React.FC<ComplianceModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'guarantee',
  onOpenRefundModal,
}) => {
  const { isNorwegian } = useLanguage();
  const [activeTab, setActiveTab] = useState<
    'guarantee' | 'wholesale' | 'passenger_rights' | 'escrow' | 'governance'
  >(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-cinzel font-bold text-neutral-100 flex items-center gap-2">
                {isNorwegian ? 'Atlas Retningslinjer & Etterlevelse' : 'Atlas Policies & Legal Compliance'}
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                HARD ROCK CAPITAL LTD (UK Company #16833237) • 71-75 Shelton Street, London
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 bg-neutral-900/30 overflow-x-auto text-xs font-mono">
          {[
            { id: 'guarantee', label: isNorwegian ? '100% Verdigaranti' : '100% Value Guarantee', icon: ShieldCheck },
            { id: 'wholesale', label: isNorwegian ? 'Engros & Prisparitet' : 'Wholesale Arbitrage', icon: Building2 },
            { id: 'passenger_rights', label: isNorwegian ? 'EU261 Passasjertrygghet' : 'EU261 Passenger Rights', icon: PlaneTakeoff },
            { id: 'escrow', label: isNorwegian ? 'Rewards Vault & Deponering' : 'Rewards Vault & Escrow', icon: Vault },
            { id: 'governance', label: isNorwegian ? 'Selskapsstyring & GDPR' : 'Corporate & GDPR', icon: Scale },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-3 px-4 border-b-2 transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-amber-400 text-amber-400 font-bold bg-amber-400/5'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-neutral-300 leading-relaxed font-sans">
          {/* TAB 1: VALUE GUARANTEE BLUEPRINT */}
          {activeTab === 'guarantee' && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/20 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold font-mono text-amber-300 uppercase tracking-wide mb-1">
                    {isNorwegian ? 'The Atlas Value Guarantee Blueprint' : 'The Atlas Value Guarantee Blueprint'}
                  </h3>
                  <p className="text-neutral-300 text-xs">
                    {isNorwegian
                      ? 'Hvis Atlas ikke sparer deg for mer enn årskontingenten din (1 290 NOK) på ditt aller første hotellopphold (2+ netter), ferieleilighet eller samlede årsreiser, refunderer vi 100% av kontingenten.'
                      : 'If Atlas does not save you more than your annual membership fee (€110 / 1 290 NOK) on your first hotel stay (2+ nights), resort condo, or cumulative annual travel, we refund 100% of your fee.'}
                  </p>
                </div>
                {onOpenRefundModal && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenRefundModal();
                    }}
                    className="shrink-0 px-3 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-mono font-bold rounded-lg transition text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isNorwegian ? 'Krev Garanti' : 'Claim Refund'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Track A: Første Overnatting</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] font-sans">
                    {isNorwegian
                      ? 'Gjelder hotellopphold på min. 2 sammenhengende netter (bookingverdi ≥ 1 700 kr) eller 7-netters ferieleilighet via RVC. 100% refusjon dersom besparelsen mot Booking.com/Expedia er under 1 290 kr.'
                      : 'Applies to hotel stays of min 2 consecutive nights (booking value ≥ €150) or 7-night resort condos. 100% refund if verified savings vs Booking.com/Expedia are under €110.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Track B: Samlet Årsrevisjon</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] font-sans">
                    {isNorwegian
                      ? 'Inkluderer alle flyreiser, korte 1-natts opphold og leiebiler over 12 måneder. Hvis samlet nettobesparelse etter 12 mnd ikke overstiger 1 290 kr, refunderes 100% av kontingenten.'
                      : 'Covers all flights, 1-night stays, and car rentals over 12 months. If total annual savings do not exceed €110, 100% of dues are refunded at year-end.'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2 text-xs">
                <h4 className="font-mono font-bold text-neutral-200 uppercase">
                  {isNorwegian ? 'Objektiv Sammenligningsstandard (Epler-mot-Epler)' : 'Apples-to-Apples Verification Standard'}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-neutral-400">
                  <li>{isNorwegian ? 'Sammenligningskilde: Offentlig tilgjengelig pris på Booking.com eller Expedia.' : 'Source: Publicly verifiable retail rate on Booking.com or Expedia.'}</li>
                  <li>{isNorwegian ? 'Identisk romkategori, sengekonfigurasjon og utsiktstype.' : 'Identical room category, bedding layout, and view tier.'}</li>
                  <li>{isNorwegian ? 'Identiske innsjekkings- og utsjekkingsdatoer.' : 'Identical check-in and check-out dates.'}</li>
                  <li>{isNorwegian ? 'Samme kanselleringsvilkår og måltidstype (f.eks. kun rom vs frokost inkludert).' : 'Identical cancellation policy and meal inclusions.'}</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400">
                <strong>{isNorwegian ? 'Behold dine fordeler:' : 'Keep Your Benefits:'}</strong>{' '}
                {isNorwegian
                  ? 'Medlemmer som benytter verdigarantien beholder sin utstedte Europeisk 3-dagers hotellkupong (verdi 5 400 kr) og alle opptjente poeng i Rewards Vault. Ingen gebyrer trekkes.'
                  : 'Members exeResort Allotment Networksing the guarantee retain their issued European 3-Day Hotel Break voucher (€480 value) and all earned Rewards Vault points. Zero exit penalties apply.'}
              </div>
            </div>
          )}

          {/* TAB 2: WHOLESALE & RATE PARITY */}
          {activeTab === 'wholesale' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold font-mono text-amber-300 uppercase">
                {isNorwegian ? 'Engrosmodell & Unntak fra Prisparitet' : 'Wholesale Arbitrage & Rate Parity Exemption'}
              </h3>
              <p>
                {isNorwegian
                  ? 'Hoteller over hele verden er bundet av såkalte "Rate Parity"-klausuler som forbyr dem å vise lavere priser på åpne nettsider enn på Booking.com eller Expedia. Nettotakstene forbeholdes lukkede distribusjonskanaler.'
                  : 'Hotels worldwide are bound by Most Favored Nation "Rate Parity" agreements prohibiting lower rates on public open websites than on Booking.com or Expedia. Wholesale net rates are restricted to closed distribution channels.'}
              </p>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                <span className="font-mono text-xs font-bold text-amber-400 block">
                  {isNorwegian ? 'Den Juridiske Unntaksregelen (Costco-Modellen)' : 'The Legal Exemption (Closed-User Groups)'}
                </span>
                <p className="text-neutral-400 text-xs">
                  {isNorwegian
                    ? 'I henhold til europeisk konkurranserett er betalte, lukkede medlemsklubber (Closed-User Groups) 100% juridisk unntatt fra prisparitet. Fordi Atlas krever en årlig medlemskontingent (1 290 kr), kan vi lovlig fjerne alle provisjoner og levere umaskerte B2B-engrospriser med 0 kr i påslag.'
                    : 'Under EU and UK competition law, paid closed-user groups are 100% legally exempt from retail rate parity. Because ATLAS operates behind a paid membership wall (€110/year), we are legally entitled to strip away retail markups and display raw B2B bedbank net rates with 0 kr markup.'}
                </p>
              </div>
              <p className="text-neutral-400 text-xs">
                {isNorwegian
                  ? 'Ingen pakkereiser eller insolvensfond: Atlas selger ikke pakketurer og er ikke tilknyttet reisegarantifond (RGF). Du kjøper uavhengige engrosallokeringer med offisielle digitale kuponger og 100% verdigaranti.'
                  : 'No Package Tours: ATLAS does not sell package holidays and is not affiliated with package travel insolvency funds (RGF). Members book independent wholesale inventory allotments with official digital vouchers and our 100% Value Guarantee.'}
              </p>
            </div>
          )}

          {/* TAB 3: EU261 PASSENGER RIGHTS */}
          {activeTab === 'passenger_rights' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold font-mono text-amber-300 uppercase">
                {isNorwegian ? 'EU261 / UK261 Lovpålagt Passasjertrygghet' : 'EU261 / UK261 Statutory Flight Compensation'}
              </h3>
              <p>
                {isNorwegian
                  ? 'I henhold til forordning EC 261/2004 har flypassasjerer lovfestet krav på skattefri kontanterstatning ved forsinkelser over 3 timer, kanselleringer eller overbooking:'
                  : 'Under Regulation EC 261/2004 and UK261, air passengers have statutory rights to non-taxable cash compensation for flight disruptions over 3 hours, cancellations, or denied boarding:'}
              </p>
              <div className="grid grid-cols-3 gap-3 font-mono text-center text-xs">
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="text-amber-400 font-bold text-base">€250</div>
                  <span className="text-neutral-500 text-[10px] block mt-1">&lt; 1 500 km</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="text-amber-400 font-bold text-base">€400</div>
                  <span className="text-neutral-500 text-[10px] block mt-1">1 500 – 3 500 km</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="text-amber-400 font-bold text-base">€600</div>
                  <span className="text-neutral-500 text-[10px] block mt-1">&gt; 3 500 km</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 text-xs">
                <strong>{isNorwegian ? 'Atlas 0% Gebyrløfte:' : 'Atlas 0% Commission Promise:'}</strong>{' '}
                {isNorwegian
                  ? 'Mens kommersielle klagebyråer (som AirHelp) tar 35%–50% av passasjerens erstatning i gebyr, beholder Atlas 0%. Hele erstatningsbeløpet utbetales 100% uavkortet til medlemmet.'
                  : 'While retail claim portals (like AirHelp) take 35% to 50% of the passenger\'s compensation as success fees, ATLAS retains 0%. 100% of the statutory compensation is wired directly to the member.'}
              </div>
            </div>
          )}

          {/* TAB 4: REWARDS VAULT & ESCROW */}
          {activeTab === 'escrow' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold font-mono text-amber-300 uppercase">
                {isNorwegian ? 'Rewards Vault & Likviditetsregel (Deponering)' : 'Rewards Vault & Escrow Liquidity Protocol'}
              </h3>
              <p>
                {isNorwegian
                  ? 'Cruiserederier (10%–16%) og luksushoteller utbetaler provisjoner til reisebyråer. Tradisjonelle byråer beholder disse pengene som overskudd. Atlas refunderer 100% av provisjonen direkte tilbake til medlemmet i Rewards Vault.'
                  : 'Cruise lines (10%–16%) and luxury hotels pay backend commissions to retail booking agents. Traditional agencies keep this as profit. ATLAS rebates 100% of these commissions directly to the member\'s Rewards Vault.'}
              </p>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                <span className="font-mono text-xs font-bold text-amber-400 block">
                  {isNorwegian ? 'Den 30–60 Dagers Likviditetsregelen (Cash Lag)' : 'The 30–60 Day Cash Settlement Lag Rule'}
                </span>
                <p className="text-neutral-400 text-xs">
                  {isNorwegian
                    ? 'Reiseprodusenter utbetaler ikke provisjon ved bestilling, men 30 til 60 dager ETTER at reisen er fysisk gjennomført (for å håndtere kanselleringer). Provisjonskreditter står derfor som 🟡 Venter (I deponering) ved bestilling, og overgår automatisk til 🟢 Disponibel saldo så snart midlene foreligger på bankkontoen til HARD ROCK CAPITAL LTD.'
                    : 'Travel suppliers do not wire commissions on the booking date; they pay 30 to 60 days AFTER travel is completed to account for cancellations. Rebates post as 🟡 Pending (In Escrow) upon booking, and transition to 🟢 Cleared / Spendable once funds physically settle into HARD ROCK CAPITAL LTD\'s bank account.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: GOVERNANCE & GDPR */}
          {activeTab === 'governance' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold font-mono text-neutral-200 uppercase">
                {isNorwegian ? 'Selskapsidentitet & Personvern (GDPR)' : 'Corporate Governance & Privacy (GDPR)'}
              </h3>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Legal Entity:</span>
                  <span className="font-bold text-amber-400">HARD ROCK CAPITAL LTD</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Company Reg. Number:</span>
                  <span className="text-neutral-200">16833237 (England & Wales)</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Registered Office:</span>
                  <span className="text-neutral-200">71-75 Shelton Street, London, WC2H 9JQ</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">Founder & Managing Director:</span>
                  <span className="text-neutral-200">Pål Juritzen</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">GDPR Compliance:</span>
                  <span className="text-neutral-300">Data Protection Act 2018 / UK GDPR</span>
                </div>
              </div>
              <p className="text-neutral-400 text-xs">
                {isNorwegian
                  ? 'Vi selger aldri medlemsdata til tredjeparter. All betalingsinformasjon behandles av PCI-DSS sertifiserte Stripe. Medlemmer kan til enhver tid be om innsyn eller sletting av personopplysninger.'
                  : 'We never sell member data to third parties. All payments are securely tokenized via PCI-DSS certified Stripe. Members may request data access or deletion at any time.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/60 flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-500">
            {isNorwegian ? 'Siste revisjon: 19. oktober 2026' : 'Last Revised: October 19, 2026'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition cursor-pointer font-bold"
          >
            {isNorwegian ? 'Lukk' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
