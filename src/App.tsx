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
import { CalculationResult } from './lib/calculatorModel';

export default function App() {
  const [viewMode, setViewMode] = useState<'site' | 'crm'>('site');
  const [isCrmAuthenticated, setIsCrmAuthenticated] = useState<boolean>(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState<boolean>(false);
  const [isPodcastOpen, setIsPodcastOpen] = useState<boolean>(false);
  const [podcastTrack, setPodcastTrack] = useState<'summary' | 'deepdive'>('summary');
  const [calculatorMode, setCalculatorMode] = useState<CalculatorMode>('package');
  const [selectedSavings, setSelectedSavings] = useState<CalculationResult | null>(null);
  const [founderCertificateData, setFounderCertificateData] = useState<FounderCertificateData | null>(null);
  const [isCalculatingVideoPulse, setIsCalculatingVideoPulse] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Brian's studio voiceover
  useEffect(() => {
    const audio = new Audio('/audio/founder-voiceover.mp3?v=20261009_brian_v3');
    audio.preload = 'auto';
    audio.volume = 1.0;
    voiceAudioRef.current = audio;

    const handleEnded = () => {
      setIsVideoMuted(true);
      setIsVideoPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
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

  // Automatically pause hero video and voiceover when any modal opens
  useEffect(() => {
    if (isWaitlistOpen || isPodcastOpen || !!founderCertificateData) {
      handleStopVideo();
    }
  }, [isWaitlistOpen, isPodcastOpen, founderCertificateData]);

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
      if (voiceAudioRef.current) {
        voiceAudioRef.current.volume = 1.0;
        voiceAudioRef.current.play().catch(() => {});
      }
      setIsVideoMuted(false);
    } else {
      voiceAudioRef.current?.pause();
      setIsVideoMuted(true);
    }
  };

  const handleUnmuteAndRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      videoRef.current.play().catch(() => {});
    }
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current.currentTime = 0;
      voiceAudioRef.current.volume = 1.0;
      voiceAudioRef.current.play().catch((err) => {
        console.warn('Audio play error:', err);
      });
    }
    setIsVideoMuted(false);
    setIsVideoPlaying(true);
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
        />

        {/* Club Pillars */}
        <TrustPillars />
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
    </div>
  );
}
