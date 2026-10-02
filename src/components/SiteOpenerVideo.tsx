import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Compass,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface SiteOpenerVideoProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimSpot: () => void;
  onExploreSavings: () => void;
}

interface ScriptBeat {
  startSec: number;
  endSec: number;
  badge: string;
  headline: string;
  subtext: string;
}

const SCRIPT_BEATS: ScriptBeat[] = [
  {
    startSec: 0,
    endSec: 4.5,
    badge: 'STOP OVERPAYING RETAIL',
    headline: 'Stop Funding Commercial Travel Portals With Your Wealth',
    subtext: 'Public booking portals add heavy commission markups to pay for TV ads and celebrity campaigns.',
  },
  {
    startSec: 4.5,
    endSec: 10.5,
    badge: 'THE TWO-TIER PRICING REALITY',
    headline: 'Every 5-Star Hotel Has Two Prices: Retail vs Institutional Net',
    subtext: 'The inflated public rate on Booking.com and Expedia... versus the private wholesale rate reserved for insiders.',
  },
  {
    startSec: 10.5,
    endSec: 16.5,
    badge: 'RATE PARITY EXEMPT ARBITRAGE',
    headline: 'Direct B2B Bedbank Net Rates — Save Up To 45% Net',
    subtext: 'Atlas connects you straight to Hotelbeds & WebBeds inventory. 100% exempt from Rate Parity contracts.',
  },
  {
    startSec: 16.5,
    endSec: 21.0,
    badge: 'PRELAUNCH FOUNDER PRIVILEGE',
    headline: 'Lock In Your Membership At Half Price For Life',
    subtext: 'Guaranteed 50% discount locked in permanently for all prelaunch waitlist members. Never pay full price.',
  },
  {
    startSec: 21.0,
    endSec: 28.0,
    badge: 'LIFETIME LOTTERY ALLOCATION',
    headline: 'Win 1 of 5 Free Lifetime Memberships (Zero Dues Forever)',
    subtext: '5 lucky founder members will be selected in our launch draw for free lifetime membership with zero annual fees.',
  },
];

export const SiteOpenerVideo: React.FC<SiteOpenerVideoProps> = ({
  isOpen,
  onClose,
  onClaimSpot,
  onExploreSavings,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStartedAudio, setHasStartedAudio] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentSec, setCurrentSec] = useState<number>(0);
  const [activeBeatIndex, setActiveBeatIndex] = useState<number>(0);

  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialize and handle playback
  useEffect(() => {
    if (!isOpen) {
      stopAllAudio();
      return;
    }

    // Prepare voiceover audio element
    const audio = new Audio('/audio/founder-voiceover.mp3');
    audio.preload = 'auto';
    voiceAudioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentSec(audio.currentTime);
      }
    };

    const handleEnded = () => {
      // Voiceover ended: fade out music smoothly over 4 seconds
      fadeOutMusic(4);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      stopAllAudio();
    };
  }, [isOpen]);

  // Track active storyboard beat
  useEffect(() => {
    const idx = SCRIPT_BEATS.findIndex(
      (b) => currentSec >= b.startSec && currentSec < b.endSec
    );
    if (idx !== -1 && idx !== activeBeatIndex) {
      setActiveBeatIndex(idx);
    }
  }, [currentSec, activeBeatIndex]);

  // Start combined Voiceover + Cinematic Ambient Background Music
  const startFullAudioExperience = async () => {
    try {
      // 1. Initialize Web Audio API for ambient cinematic music
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx && !audioCtxRef.current) {
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Master gain for music
        const musicGain = ctx.createGain();
        musicGain.gain.setValueAtTime(0.06, ctx.currentTime); // Sits under the voice
        musicGain.connect(ctx.destination);
        musicGainRef.current = musicGain;

        // Cinematic Warm Ambient Chord (F#m9 / Dmaj7 harmony)
        const chordFreqs = [73.42, 110.0, 146.83, 220.0, 277.18, 329.63, 440.0];
        chordFreqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Gentle undulating harmonic filter
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.15 + idx * 0.04, ctx.currentTime);
          lfoGain.gain.setValueAtTime(0.015, ctx.currentTime);
          lfo.connect(lfoGain.gain);
          lfo.start();

          gain.gain.setValueAtTime(0.035 / chordFreqs.length, ctx.currentTime);
          osc.connect(gain);
          gain.connect(musicGain);
          osc.start();
        });
      }

      // 2. Play voiceover
      if (voiceAudioRef.current) {
        voiceAudioRef.current.currentTime = 0;
        voiceAudioRef.current.volume = 1.0;
        await voiceAudioRef.current.play();
      }

      setIsPlaying(true);
      setHasStartedAudio(true);
    } catch {
      // Audio autoplay policy handled
      setHasStartedAudio(true);
      setIsPlaying(true);
    }
  };

  const fadeOutMusic = (durationSec = 4) => {
    if (musicGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      musicGainRef.current.gain.linearRampToValueAtTime(0.0001, now + durationSec);
      setTimeout(() => {
        stopAllAudio();
      }, durationSec * 1000);
    }
  };

  const stopAllAudio = () => {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current.currentTime = 0;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch {
        // ignore
      }
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleMute = () => {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.muted = !isMuted;
    }
    if (musicGainRef.current && audioCtxRef.current) {
      if (!isMuted) {
        musicGainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      } else {
        musicGainRef.current.gain.setValueAtTime(0.06, audioCtxRef.current.currentTime);
      }
    }
    setIsMuted(!isMuted);
  };

  if (!isOpen) return null;

  const currentBeat = SCRIPT_BEATS[activeBeatIndex] || SCRIPT_BEATS[0];
  const progressPct = Math.min(100, (currentSec / 26) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl overflow-hidden select-none animate-in fade-in duration-300">
      {/* Background 4K Cinematic Luxury Drone Video Stream */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <iframe
          className="w-full h-full object-cover scale-110 pointer-events-none opacity-45"
          src="https://www.youtube-nocookie.com/embed/LXb3EKWsInQ?autoplay=1&mute=1&controls=0&loop=1&playlist=LXb3EKWsInQ&modestbranding=1&rel=0&showinfo=0"
          title="Atlas 4K Opener"
          allow="autoplay; encrypted-media"
        />
        {/* Layered Obsidian & Amber Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-neutral-950/95" />
      </div>

      {/* Top Header Bar inside Opener */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-amber-400/50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-lg shadow-black/80">
            <Compass className="w-5 h-5 text-amber-300 animate-spin-slow" />
          </div>
          <div>
            <span className="font-cinzel text-lg font-bold tracking-[0.2em] text-neutral-100 uppercase">
              Atlas
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 ml-2 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
              Private Prelaunch
            </span>
          </div>
        </div>

        {/* Controls: Audio Toggle & Skip/Enter Club */}
        <div className="flex items-center gap-3">
          {hasStartedAudio && (
            <button
              type="button"
              onClick={toggleMute}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 flex items-center gap-2 transition cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              <span>{isMuted ? 'Unmute' : 'Voiceover & Music Active'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-neutral-100 transition cursor-pointer flex items-center gap-1.5"
          >
            <span>Skip to Club</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Center Stage: Sales-Driven Visual Storyboard & CTA */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
        {/* Play with Sound Starter Overlay (Prominently unblocks browser audio autoplay) */}
        {!hasStartedAudio ? (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Private B2B Wholesale Bedbanks • Rate Parity Exempt</span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold text-neutral-100 leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              Sovereign Travel. <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent">
                Never Pay Retail Markups Again.
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
              Every luxury hotel in the world has two prices: the public retail price on Booking.com... and the insider wholesale rate. Experience the arbitrage.
            </p>

            {/* Giant Play with Voiceover & Music Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={startFullAudioExperience}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-sm sm:text-base uppercase tracking-wider shadow-2xl shadow-amber-500/40 transition-all scale-100 hover:scale-105 cursor-pointer flex items-center justify-center gap-3 group"
              >
                <div className="w-7 h-7 rounded-full bg-neutral-950 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-amber-300 text-amber-300 ml-0.5" />
                </div>
                <span>Play With Voiceover & Music</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-sm font-semibold transition cursor-pointer"
              >
                Enter Site Directly
              </button>
            </div>
          </div>
        ) : (
          /* Active Playing Opener: Hard-Hitting Sales Beats synced with Voiceover */
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Active Beat Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-black/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentBeat.badge}</span>
            </div>

            {/* Active Selling Headline */}
            <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold text-neutral-100 leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] max-w-4xl mx-auto">
              {currentBeat.headline}
            </h1>

            {/* Active Spoken Sentence in Quotes */}
            <p className="text-base sm:text-xl text-neutral-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] italic">
              "{currentBeat.subtext}"
            </p>

            {/* Timeline Progress Bar */}
            <div className="max-w-md mx-auto h-1.5 bg-neutral-900/90 rounded-full overflow-hidden border border-neutral-800">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 transition-all duration-200 ease-linear"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Irresistible Call To Action Cluster (SELL, SELL, SELL) */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  stopAllAudio();
                  onClose();
                  onClaimSpot();
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-sm uppercase tracking-wider shadow-2xl shadow-amber-500/40 transition-all scale-100 hover:scale-105 cursor-pointer flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-neutral-950" />
                <span>Lock In 50% Off For Life (Join Waiting List)</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </button>

              <button
                type="button"
                onClick={() => {
                  stopAllAudio();
                  onClose();
                  onExploreSavings();
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 border border-amber-400/40 text-neutral-100 font-semibold text-sm transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Calculate Your Savings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Urgency & Guarantee Seals */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Award className="w-3.5 h-3.5" />
                5 Free Lifetime Memberships Draw
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Save Up To 45% Net
              </span>
              <span>•</span>
              <span>Rate Parity Exempt</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar with Chapters */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-4 bg-neutral-950/80 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-500 font-mono">
        <div className="flex items-center gap-2">
          <span>Atlas Sovereign Travel</span>
          <span>•</span>
          <span>B2B Bedbank Net Rates</span>
        </div>
        <div>
          <span>Founder Member Allocation: Active</span>
        </div>
      </div>
    </div>
  );
};
