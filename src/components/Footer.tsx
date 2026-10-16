import React from 'react';
import { Compass, Lock } from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';

interface FooterProps {
  onOpenCrm?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCrm }) => {
  const { isNorwegian } = useLanguage();

  return (
    <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 border-t border-neutral-900/80 text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <Compass className="w-4 h-4 text-amber-400" />
        <span className="font-cinzel tracking-wider text-neutral-200 uppercase font-semibold">
          Atlas Travel Club
        </span>
        <span className="text-neutral-600">|</span>
        <span className="font-mono text-[11px] text-neutral-500">
          {isNorwegian ? 'Forhåndslansering' : 'Prelaunch Portal'}
        </span>
      </div>

      <div className="flex items-center gap-4 text-neutral-500 text-[11px] font-mono">
        <span>{isNorwegian ? 'B2B Netto engrospriser' : 'B2B Bedbank Net Rates'}</span>
        <span>•</span>
        <span>{isNorwegian ? 'Unntatt prisparitet' : 'Rate Parity Exempt'}</span>
        <span>•</span>
        <span>{isNorwegian ? 'Lukket medlemskrets' : 'Closed-Loop Membership'}</span>
      </div>

      <div className="flex items-center gap-2 text-right text-[11px] text-neutral-600 font-mono">
        <span>
          {isNorwegian
            ? '© 2026 HARD ROCK CAPITAL LTD (Org.nr. 16833237 England & Wales). 71-75 Shelton Street, London, WC2H 9JQ. Alle rettigheter reservert.'
            : '© 2026 HARD ROCK CAPITAL LTD (Reg. #16833237 England & Wales). 71-75 Shelton Street, London, WC2H 9JQ. All rights reserved.'}
        </span>
        {onOpenCrm && (
          <button
            type="button"
            onClick={onOpenCrm}
            className="text-neutral-800 hover:text-neutral-500 transition p-1 cursor-pointer"
            title={isNorwegian ? 'Intern personalinnlogging' : 'Internal Staff Access'}
          >
            <Lock className="w-3 h-3" />
          </button>
        )}
      </div>
    </footer>
  );
};
