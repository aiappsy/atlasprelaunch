import React, { useState, useEffect, useRef } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DynamicSavingsCalculator, CalculatorMode } from './components/DynamicSavingsCalculator';
import { TrustPillars } from './components/TrustPillars';
import { WaitlistModal } from './components/WaitlistModal';
import { Footer } from './components/Footer';
import { CrmDashboard } from './components/crm/CrmDashboard';
import { CrmAuthGate } from './components/crm/CrmAuthGate';
import { FounderCertificateModal, FounderCertificateData } from './components/FounderCertificateModal';
import { PodcastPlayerModal } from './components/PodcastPlayerModal';
import { PrelaunchConcierge } from './components/PrelaunchConcierge';
import { PerkExplainerModal, PerkExplainerTab } from './components/PerkExplainerModal';
import { CalculationResult } from './lib/calculatorModel';

export default function App() {
  const [viewMode, setViewMode] = useState<'site' | 'crm'>('site');
  const [isCrmAuthenticated, setIsCrmAuthenticated] = useState<boolean>(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState<boolean>(false);
  const [isPodcastOpen, setIsPodcastOpen] = useState<boolean>(false);
  const [podcastTrack, setPodcastTrack] = useState<'summary' | 'deepdive'>('summary');
  const [isPerkExplainerOpen, setIsPerkExplainerOpen] = useState<boolean>(false);
  const [perkExplainerTab, setPerkExplainerTab] = useState<PerkExplainerTab>('connex');
  const [calculatorMode, setCalculatorMode] = useState<CalculatorMode>('package');
  const [selectedSavings, setSelectedSavings] = useState<CalculationResult | null>(null);
  const [founderCertificateData, setFounderCertificateData] = useState<FounderCertificateData | null>(null);
  const [isCalculatingVideoPulse, setIsCalculatingVideoPulse] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Brian's studio voiceover with iOS Safari & Chrome WebKit resilience
  useEffect(() => {
    const handleEnded = () => {
      setIsVideoMuted(true);
      setIsVideoPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };

    const audioEl = voiceAudioRef.current;
    if (audioEl) {
      audioEl.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audioEl) {
        audioEl.removeEventListener('ended', handleEnded);
        audioEl.pause();
      }
    };
  }, []);

  const handleStopVideo = () => {
    voiceAudioRef.current?.pause();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoPlaying(false);
    setIsVideoMuted(true);
  };

  const handleOpenPerkModal = (tab: PerkExplainerTab) => {
    handleStopVideo();
    setPerkExplainerTab(tab);
    setIsPerkExplainerOpen(true);
  };

  // Automatically pause hero video and voiceover when any modal opens
  useEffect(() => {
    if (isWaitlistOpen || isPodcastOpen || isPerkExplainerOpen || !!founderCertificateData) {
      handleStopVideo();
    }
  }, [isWaitlistOpen, isPodcastOpen, isPerkExplainerOpen, founderCertificateData]);

  useEffect(() => {
    const isAuth = sessionStorage.getItem('atlas_crm_auth') === 'true';
    setIsCrmAuthenticated(isAuth);

    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        path === '/admin' ||
        path.startsWith('/admin/') ||
        hash === '#admin' ||
        hash === '#/admin' ||
        hash === '#crm' ||
        search.includes('admin') ||
        search.includes('crm')
      ) {
        setViewMode('crm');
      } else {
        setViewMode('site');
      }
    };
    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);

    // Keyboard shortcut: Alt+C or Ctrl+Shift+C
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'c') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c')) {
        e.preventDefault();
        window.history.pushState(null, '', '/admin');
        setViewMode('crm');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }
    if (isVideoPlaying) {
      voiceAudioRef.current?.pause();
      videoRef.current?.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current?.play().catch(() => {});
      if (!isVideoMuted && voiceAudioRef.current) {
        voiceAudioRef.current.play().catch(() => {});
      }
      setIsVideoPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }
    if (isVideoMuted) {
      const audioEl = voiceAudioRef.current;
      if (audioEl) {
        audioEl.muted = false;
        audioEl.volume = 1.0;
        const playPromise = audioEl.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('iOS audio playback interaction required:', err);
          });
        }
      }
      setIsVideoMuted(false);
    } else {
      voiceAudioRef.current?.pause();
      setIsVideoMuted(true);
    }
  };

  const handleUnmuteAndRestart = () => {
    // 1. Ensure ambient video is silently looping in background
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      videoRef.current.play().catch(() => {});
    }

    // 2. Play voiceover via DOM audio element with direct touch unlock
    const audioEl = voiceAudioRef.current;
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
      audioEl.muted = false;
      audioEl.volume = 1.0;

      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoMuted(false);
            setIsVideoPlaying(true);
          })
          .catch((err) => {
            console.warn('iOS play blocked or failed:', err);
            // Fallback retry
            audioEl.load();
            audioEl.play().catch(() => {});
            setIsVideoMuted(false);
            setIsVideoPlaying(true);
          });
      } else {
        setIsVideoMuted(false);
        setIsVideoPlaying(true);
      }
    } else {
      setIsVideoMuted(false);
      setIsVideoPlaying(true);
    }
  };

  const handleExploreSavings = () => {
    const el = document.getElementById('visual-savings-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: rect.top + scrollTop - 40,
        behavior: 'smooth',
      });
    }
  };

  const handleUnlockSavings = (savings: CalculationResult) => {
    handleStopVideo();
    setSelectedSavings(savings);
    setIsWaitlistOpen(true);
  };

  const handleCalculationTrigger = () => {
    setIsCalculatingVideoPulse(true);
    setTimeout(() => setIsCalculatingVideoPulse(false), 500);
  };

  const handleBackToSite = () => {
    setViewMode('site');
    if (window.location.pathname.startsWith('/admin') || window.location.hash.includes('admin') || window.location.hash.includes('crm')) {
      window.history.pushState(null, '', '/');
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
      {/* Unified Background Commercial Video with Built-in Studio Voiceover & Music */}
      <BackgroundVideo
        videoRef={videoRef}
        isCalculating={isCalculatingVideoPulse}
        isPlaying={isVideoPlaying}
        isMuted={isVideoMuted}
        onMuteChange={(muted) => setIsVideoMuted(muted)}
        onEnded={handleStopVideo}
      />

      {/* Header */}
      <Header
        onJoinWaitlist={() => {
          handleStopVideo();
          setIsWaitlistOpen(true);
        }}
        onOpenPodcast={() => {
          handleStopVideo();
          setPodcastTrack('summary');
          setIsPodcastOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center w-full">
        {/* Full-Screen Luxury Video Hero Opener */}
        <Hero
          isVideoPlaying={isVideoPlaying}
          isVideoMuted={isVideoMuted}
          onToggleVideo={handleToggleVideo}
          onStopVideo={handleStopVideo}
          onToggleMute={handleToggleMute}
          onUnmuteAndRestart={handleUnmuteAndRestart}
          onOpenPerkModal={handleOpenPerkModal}
          onOpenPodcast={() => {
            handleStopVideo();
            setPodcastTrack('summary');
            setIsPodcastOpen(true);
          }}
          onJoinWaitlist={() => {
            handleStopVideo();
            setIsWaitlistOpen(true);
          }}
          onExploreSavings={() => {
            setCalculatorMode('package');
            handleExploreSavings();
          }}
          onExploreFlights={() => {
            setCalculatorMode('flights');
            handleExploreSavings();
          }}
          onExploreHotels={() => {
            setCalculatorMode('hotels');
            handleExploreSavings();
          }}
        />

        {/* Dynamic & Visual Savings Calculator (Immediate Access with 3 Modes) */}
        <DynamicSavingsCalculator
          key={calculatorMode}
          initialMode={calculatorMode}
          onUnlockSavings={handleUnlockSavings}
          onCalculationTrigger={handleCalculationTrigger}
          onOpenPerkModal={handleOpenPerkModal}
        />

        {/* Club Pillars */}
        <TrustPillars onOpenPerkModal={handleOpenPerkModal} />
      </main>

      {/* Footer with Discreet Staff Lock Icon */}
      <Footer onOpenCrm={() => {
        window.history.pushState(null, '', '/admin');
        setViewMode('crm');
      }} />

      {/* Early Access / Waitlist Lead Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        calculatedSavings={selectedSavings}
        onViewCertificate={(data) => setFounderCertificateData(data)}
        onOpenPerkModal={handleOpenPerkModal}
      />

      {/* Interactive Connex & RVC Explainer & Calculator Modal */}
      <PerkExplainerModal
        isOpen={isPerkExplainerOpen}
        initialTab={perkExplainerTab}
        onClose={() => setIsPerkExplainerOpen(false)}
        onClaimSpot={() => {
          setIsPerkExplainerOpen(false);
          setIsWaitlistOpen(true);
        }}
      />

      {/* Official Founder Member Certificate Modal */}
      <FounderCertificateModal
        isOpen={!!founderCertificateData}
        onClose={() => setFounderCertificateData(null)}
        data={founderCertificateData}
        onOpenPodcast={(track) => {
          setPodcastTrack(track);
          setIsPodcastOpen(true);
        }}
      />

      {/* How It Works Podcast Deep Dive Player Modal */}
      <PodcastPlayerModal
        isOpen={isPodcastOpen}
        onClose={() => setIsPodcastOpen(false)}
        initialTrack={podcastTrack}
        onOpenWaitlist={() => {
          setIsPodcastOpen(false);
          setIsWaitlistOpen(true);
        }}
        onPlaybackStart={() => setIsVideoPlaying(false)}
      />

      {/* Prelaunch AI Concierge (Aura) */}
      {viewMode === 'site' && (
        <PrelaunchConcierge
          onJoinWaitlist={() => setIsWaitlistOpen(true)}
          onOpenPodcast={(track) => {
            setPodcastTrack(track);
            setIsPodcastOpen(true);
          }}
          onOpenCalculator={() => {
            document.getElementById('visual-savings-calculator')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Hidden Master Studio Audio Element (Rendered in DOM with playsInline for iOS Chrome/Safari) */}
      <audio
        ref={voiceAudioRef}
        src="/audio/founder-voiceover.mp3?v=20261009_brian_v3"
        preload="auto"
        playsInline
        className="hidden"
      />
    </div>
  );
}
