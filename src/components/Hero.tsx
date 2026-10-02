import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Award,
  CheckCircle2,
  Gift,
} from 'lucide-react';

interface HeroProps {
  onJoinWaitlist: () => void;
  onExploreSavings: () => void;
  isVideoPlaying?: boolean;
  onToggleVideo?: () => void;
  onStopVideo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onJoinWaitlist,
  onExploreSavings,
  isVideoPlaying = true,
  onToggleVideo,
  onStopVideo,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioBlockedByBrowser, setAudioBlockedByBrowser] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  // Synchronize video element and audio with isVideoPlaying
  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        if (voiceRef.current) voiceRef.current.pause();
        if (musicRef.current) musicRef.current.pause();
        setIsPlayingAudio(false);
      }
    }
  }, [isVideoPlaying]);

  // Initialize and automatically start Voiceover + Background Music
  useEffect(() => {
    const voice = new Audio('/audio/founder-voiceover.mp3');
    const music = new Audio('/audio/luxury-ambient-music.wav');

    voice.preload = 'auto';
    music.preload = 'auto';
    voice.volume = 1.0; // Clear, commanding human voiceover
    music.volume = 0.35; // Rich ambient cinematic music underneath

    voiceRef.current = voice;
    musicRef.current = music;

    const handleTimeUpdate = () => {
      if (voice.duration) {
        setAudioProgress((voice.currentTime / voice.duration) * 100);
      }
    };

    const handleEnded = () => {
      // Voiceover ended: slowly fade out music over 4 seconds
      if (musicRef.current) {
        let vol = musicRef.current.volume;
        const fadeInterval = setInterval(() => {
          if (musicRef.current && vol > 0.02) {
            vol -= 0.03;
            musicRef.current.volume = Math.max(0, vol);
          } else {
            clearInterval(fadeInterval);
            if (musicRef.current) {
              musicRef.current.pause();
              musicRef.current.currentTime = 0;
              musicRef.current.volume = 0.35;
            }
            setIsPlayingAudio(false);
            setAudioProgress(0);
          }
        }, 300);
      }
    };

    voice.addEventListener('timeupdate', handleTimeUpdate);
    voice.addEventListener('ended', handleEnded);

    // Function to trigger voiceover and music
    const startAudioPlay = () => {
      if (!voiceRef.current || !musicRef.current) return;
      const p1 = voiceRef.current.play();
      const p2 = musicRef.current.play();

      Promise.all([p1, p2])
        .then(() => {
          setIsPlayingAudio(true);
          setAudioBlockedByBrowser(false);
        })
        .catch(() => {
          // Browser prevented unprompted autoplay without user interaction
          setAudioBlockedByBrowser(true);
        });
    };

    // 1. Attempt immediate automatic play when entering the site!
    startAudioPlay();

    // 2. If browser blocked unprompted autoplay, automatically trigger on the very first user interaction
    const handleFirstGesture = () => {
      startAudioPlay();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });

    return () => {
      voice.removeEventListener('timeupdate', handleTimeUpdate);
      voice.removeEventListener('ended', handleEnded);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      voice.pause();
      music.pause();
    };
  }, []);

  const toggleSoundExperience = () => {
    if (!voiceRef.current || !musicRef.current) return;

    if (isPlayingAudio) {
      voiceRef.current.pause();
      musicRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      voiceRef.current.currentTime = 0;
      musicRef.current.currentTime = 0;
      voiceRef.current.volume = 1.0;
      musicRef.current.volume = 0.35;

      voiceRef.current.play().catch(() => {});
      musicRef.current.play().catch(() => {});
      setIsPlayingAudio(true);
      setAudioBlockedByBrowser(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-6 pb-12 overflow-hidden select-none">
      {/* Real Local 100% Guaranteed Luxury Travel Resort Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover scale-105 transition-all duration-1000 ${
            isVideoPlaying ? 'opacity-85' : 'opacity-70 filter brightness-90 saturate-75'
          }`}
        >
          <source src="/video/luxury-hotel-commercial.mp4" type="video/mp4" />
          <source src="/video/luxury-palms-pool.mp4" type="video/mp4" />
        </video>

        {/* Soft, Transparent Luxury Vignette — The Luxury Resort Is 100% Visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-neutral-950/40 pointer-events-none" />
      </div>

      {/* Top Floating Badge */}
      <div className="relative z-10 pt-2 animate-in fade-in duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-950/60 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-medium shadow-xl shadow-black/50">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Direct Wholesale Hotel Rates • Zero Middleman Fees</span>
        </div>
      </div>

      {/* Center Hero: Translucent Minimalist Typography — Video Visible Right Through Text */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6 my-auto py-8">
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-100 leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          Sovereign Travel. <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Half Price For Life.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-neutral-100 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] px-4">
          Booking.com and Expedia charge up to 45% markups just to pay for TV ads. Atlas cuts out the middlemen and gives you the secret wholesale hotel rate directly.
        </p>

        {/* Primary Action Button Cluster: "See Your Savings" + "Claim Founder Spot" */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {/* Main Primary Button: Glides straight to calculator */}
          <button
            type="button"
            onClick={() => {
              onStopVideo?.();
              onExploreSavings();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-sm sm:text-base uppercase tracking-wider shadow-2xl shadow-amber-500/40 transition-all scale-100 hover:scale-105 cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Sparkles className="w-4 h-4 text-neutral-950" />
            <span>See Your Savings (Calculator)</span>
            <ArrowRight className="w-4 h-4 text-neutral-950" />
          </button>

          {/* Secondary Action: Join waiting list */}
          <button
            type="button"
            onClick={() => {
              onStopVideo?.();
              onJoinWaitlist();
            }}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-neutral-950/70 hover:bg-neutral-900/90 border border-amber-400/50 hover:border-amber-400 text-neutral-100 font-semibold text-sm sm:text-base transition-all shadow-xl shadow-black/80 backdrop-blur-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Lock In Half Price (Founder Spot)</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Media Controls Cluster: Stop/Play Video + Audio Voiceover & Music */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5">
          {/* Stop / Play Video Button */}
          <button
            type="button"
            data-action="toggle-video"
            onClick={onToggleVideo}
            className={`px-4 py-2 rounded-full border text-xs font-mono flex items-center gap-2 transition-all shadow-xl backdrop-blur-md cursor-pointer ${
              isVideoPlaying
                ? 'bg-neutral-950/80 border-neutral-700/80 text-neutral-300 hover:border-red-400/80 hover:text-red-300 hover:bg-neutral-900'
                : 'bg-amber-400/25 border-amber-400 text-amber-300 shadow-amber-400/25 font-bold animate-pulse'
            }`}
            title={isVideoPlaying ? 'Stop playing background video' : 'Resume background video'}
          >
            {isVideoPlaying ? (
              <>
                <Square className="w-3 h-3 fill-red-400 text-red-400" />
                <span className="font-semibold">Stop Video</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-amber-300 text-amber-300" />
                <span className="font-semibold text-amber-300">Play Video</span>
              </>
            )}
          </button>

          {/* Audio Controller Indicator */}
          <button
            type="button"
            data-action="toggle-audio"
            onClick={toggleSoundExperience}
            className={`px-4 py-2 rounded-full border text-xs font-mono flex items-center gap-2.5 transition-all shadow-xl backdrop-blur-md cursor-pointer ${
              isPlayingAudio
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-emerald-400/20'
                : 'bg-neutral-950/70 border-neutral-700 text-neutral-300 hover:border-amber-400/60 hover:text-white'
            }`}
            title="Toggle Voiceover and Background Music"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="font-semibold text-emerald-300">Voiceover & Music Active</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </>
            ) : (
              <>
                {audioBlockedByBrowser ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                    <span className="text-amber-300 font-bold">Tap To Unmute Voiceover & Music</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-amber-300 text-amber-300" />
                    <span>Play Voiceover & Music</span>
                  </>
                )}
                <span className="text-[10px] text-amber-400 font-bold bg-amber-400/15 px-1.5 py-0.5 rounded">0:24</span>
              </>
            )}
          </button>
        </div>

        {/* Audio Progress Bar */}
        {isPlayingAudio && (
          <div className="max-w-xs mx-auto h-1 bg-neutral-950/60 rounded-full overflow-hidden border border-neutral-800">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-200"
              style={{ width: `${audioProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Bottom Floating Bar: 2 Core Guarantees & Live Destination */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-300">
        {/* Left: 50% Lifetime + 5 Free Draws */}
        <div className="flex items-center gap-3 bg-neutral-950/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-neutral-800/80 shadow-lg">
          <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Award className="w-3.5 h-3.5" />
            50% Off Membership For Life
          </span>
          <span className="text-neutral-600">•</span>
          <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
            <Gift className="w-3.5 h-3.5" />
            5 Free Lifetime Memberships Draw
          </span>
        </div>

        {/* Right: Live Luxury Destination Pill */}
        <div className="flex items-center gap-2 bg-neutral-950/60 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-neutral-800/80 text-[11px] shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-neutral-300 font-medium">White Dunes Luxury Suites • Paros</span>
          <span className="text-neutral-600">•</span>
          <span className="text-emerald-400 font-bold">Save 45% Net</span>
        </div>
      </div>
    </section>
  );
};
