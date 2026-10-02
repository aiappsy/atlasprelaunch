import React, { useState, useEffect } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RateTicker } from './components/RateTicker';
import { DynamicSavingsCalculator } from './components/DynamicSavingsCalculator';
import { TrustPillars } from './components/TrustPillars';
import { WaitlistModal } from './components/WaitlistModal';
import { Footer } from './components/Footer';
import { CrmDashboard } from './components/crm/CrmDashboard';
import { CrmAuthGate } from './components/crm/CrmAuthGate';
import { FounderCertificateModal, FounderCertificateData } from './components/FounderCertificateModal';
import { PodcastPlayerModal } from './components/PodcastPlayerModal';
import { CalculationResult } from './lib/calculatorModel';

export default function App() {
  const [viewMode, setViewMode] = useState<'site' | 'crm'>('site');
  const [isCrmAuthenticated, setIsCrmAuthenticated] = useState<boolean>(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState<boolean>(false);
  const [isPodcastOpen, setIsPodcastOpen] = useState<boolean>(false);
  const [selectedSavings, setSelectedSavings] = useState<CalculationResult | null>(null);
  const [founderCertificateData, setFounderCertificateData] = useState<FounderCertificateData | null>(null);
  const [isCalculatingVideoPulse, setIsCalculatingVideoPulse] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);

  // Automatically stop playing video (and audio) whenever ANY button on the page is clicked
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const button = target.closest('button');
      if (button) {
        // If clicking the explicit video toggle or audio toggle button, do not auto-stop
        if (button.dataset.action === 'toggle-video' || button.dataset.action === 'toggle-audio') {
          return;
        }
        // Any other button clicked anywhere on the site -> automatically STOP the video
        setIsVideoPlaying(false);
      }
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);

  useEffect(() => {
    const isAuth = sessionStorage.getItem('atlas_crm_auth') === 'true';
    setIsCrmAuthenticated(isAuth);

    const checkHash = () => {
      if (window.location.hash === '#crm' || window.location.search.includes('crm')) {
        setViewMode('crm');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    // Keyboard shortcut: Alt+C or Ctrl+Shift+C
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'c') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c')) {
        e.preventDefault();
        setViewMode('crm');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleUnlockSavings = (savings: CalculationResult) => {
    setSelectedSavings(savings);
    setIsWaitlistOpen(true);
  };

  const handleCalculationTrigger = () => {
    setIsCalculatingVideoPulse(true);
    setTimeout(() => setIsCalculatingVideoPulse(false), 500);
  };

  const handleBackToSite = () => {
    setViewMode('site');
    if (window.location.hash === '#crm') {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleLockCrm = () => {
    sessionStorage.removeItem('atlas_crm_auth');
    setIsCrmAuthenticated(false);
    handleBackToSite();
  };

  // CRM Routing
  if (viewMode === 'crm') {
    if (!isCrmAuthenticated) {
      return (
        <CrmAuthGate
          onAuthenticated={() => setIsCrmAuthenticated(true)}
          onBackToSite={handleBackToSite}
        />
      );
    }
    return (
      <CrmDashboard
        onBackToSite={handleBackToSite}
        onLockCrm={handleLockCrm}
      />
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 text-neutral-100 flex flex-col justify-between overflow-x-hidden selection:bg-amber-400 selection:text-neutral-900">
      {/* Background Ambient Video Layer */}
      <BackgroundVideo
        isCalculating={isCalculatingVideoPulse}
        isPlaying={isVideoPlaying}
        onEnded={() => setIsVideoPlaying(false)}
      />

      {/* Header */}
      <Header
        onJoinWaitlist={() => {
          setIsVideoPlaying(false);
          setIsWaitlistOpen(true);
        }}
        onOpenPodcast={() => {
          setIsVideoPlaying(false);
          setIsPodcastOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center w-full">
        {/* Full-Screen Luxury Video Hero Opener */}
        <Hero
          isVideoPlaying={isVideoPlaying}
          onToggleVideo={() => setIsVideoPlaying((prev) => !prev)}
          onStopVideo={() => setIsVideoPlaying(false)}
          onOpenPodcast={() => {
            setIsVideoPlaying(false);
            setIsPodcastOpen(true);
          }}
          onJoinWaitlist={() => {
            setIsVideoPlaying(false);
            setIsWaitlistOpen(true);
          }}
          onExploreSavings={() => {
            setIsVideoPlaying(false);
            document.getElementById('visual-savings-calculator')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Real Rate Parity Arbitrage Audit Ticker (From Original Repo App) */}
        <RateTicker />

        {/* Dynamic & Visual Savings Calculator */}
        <DynamicSavingsCalculator
          onUnlockSavings={handleUnlockSavings}
          onCalculationTrigger={handleCalculationTrigger}
        />

        {/* Club Pillars */}
        <TrustPillars />
      </main>

      {/* Footer with Discreet Staff Lock Icon */}
      <Footer onOpenCrm={() => setViewMode('crm')} />

      {/* Early Access / Waitlist Lead Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        calculatedSavings={selectedSavings}
        onViewCertificate={(data) => setFounderCertificateData(data)}
      />

      {/* Official Founder Member Certificate Modal */}
      <FounderCertificateModal
        isOpen={!!founderCertificateData}
        onClose={() => setFounderCertificateData(null)}
        data={founderCertificateData}
      />

      {/* How It Works Podcast Deep Dive Player Modal */}
      <PodcastPlayerModal
        isOpen={isPodcastOpen}
        onClose={() => setIsPodcastOpen(false)}
        onOpenWaitlist={() => {
          setIsPodcastOpen(false);
          setIsWaitlistOpen(true);
        }}
        onPlaybackStart={() => setIsVideoPlaying(false)}
      />
    </div>
  );
}
