import React, { useState, useRef, useEffect } from 'react';
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  X,
  Sparkles,
  ArrowRight,
  Clock,
  Radio,
  CheckCircle2,
} from 'lucide-react';

interface Chapter {
  time: number;
  label: string;
  desc: string;
}

const CHAPTERS: Chapter[] = [
  { time: 0, label: '00:00 — The Retail Rate Illusion', desc: 'Why public travel platforms artificially inflate room prices' },
  { time: 75, label: '01:15 — The Secret Bedbank Channel', desc: 'How luxury five-star hotels clear unbooked premium inventory' },
  { time: 150, label: '02:30 — Rate Parity Legal Loophole', desc: 'Why closed-loop private clubs are legally exempt from retail prices' },
  { time: 225, label: '03:45 — Zero-Markup Membership', desc: 'Passing 100% of wholesale net savings directly to private members' },
  { time: 270, label: '04:30 — The Founder Advantage', desc: 'Locking in half-price lifetime access and free membership draws' },
];

const SPEED_OPTIONS = [1.0, 1.25, 1.5, 2.0];

interface PodcastPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWaitlist: () => void;
  onPlaybackStart?: () => void;
}

export const PodcastPlayerModal: React.FC<PodcastPlayerModalProps> = ({
  isOpen,
  onClose,
  onOpenWaitlist,
  onPlaybackStart,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio('/audio/how-private-clubs-get-wholesale-hotel-rates.m4a');
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // When modal is opened, if it was minimized, un-minimize
  useEffect(() => {
    if (isOpen) {
      setIsMinimized(false);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      onPlaybackStart?.();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  const seekTo = (seconds: number) => {
    if (!audioRef.current) return;
    const target = Math.max(0, Math.min(seconds, duration || 9999));
    audioRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const skipSeconds = (delta: number) => {
    if (!audioRef.current) return;
    seekTo(audioRef.current.currentTime + delta);
  };

  const changeSpeed = () => {
    if (!audioRef.current) return;
    const nextIdx = (SPEED_OPTIONS.indexOf(playbackRate) + 1) % SPEED_OPTIONS.length;
    const newSpeed = SPEED_OPTIONS[nextIdx];
    audioRef.current.playbackRate = newSpeed;
    setPlaybackRate(newSpeed);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    audioRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Don't render anything if closed and not playing in minimized dock
  if (!isOpen && !isMinimized && !isPlaying) {
    return null;
  }

  // --- MINIMIZED FLOATING DOCK (Visitors can listen while using the calculator) ---
  if (isMinimized || (!isOpen && isPlaying)) {
    return (
      <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-neutral-950/95 border border-amber-400/40 shadow-2xl shadow-black/90 backdrop-blur-xl max-w-sm">
          <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-neutral-100 truncate">
              How Private Clubs Get Wholesale Hotel Rates
            </p>
            <p className="text-[11px] font-mono text-neutral-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              data-action="toggle-audio"
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 flex items-center justify-center transition cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMinimized(false);
              }}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition cursor-pointer"
              title="Expand Player"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (audioRef.current) audioRef.current.pause();
                setIsPlaying(false);
                setIsMinimized(false);
                onClose();
              }}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition cursor-pointer"
              title="Close & Stop"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- FULL MODAL PLAYER ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-neutral-900/95 border border-amber-400/30 shadow-2xl shadow-black/95 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-widest text-amber-300 font-semibold">
              Atlas Insider Briefing • How It Works
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsMinimized(true);
                onClose();
              }}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title="Minimize player to bottom bar while browsing"
            >
              <Minimize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Minimize Dock</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (audioRef.current) audioRef.current.pause();
                setIsPlaying(false);
                onClose();
              }}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
              title="Close player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Hero Audio Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Vinyl / Cover Art */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-amber-400/20 via-neutral-900 to-neutral-950 border border-amber-400/40 p-3 flex flex-col justify-between items-center text-center shadow-xl shadow-black/80 shrink-0">
              <Headphones className="w-10 h-10 text-amber-300 mt-2" />
              <div className="w-full">
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold block">
                  NotebookLM
                </span>
                <span className="text-[9px] text-neutral-400 block font-mono">Deep Dive Audio</span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[11px] font-mono">
                <Sparkles className="w-3 h-3" />
                <span>Two-Host Audio Overview • 5 Min</span>
              </div>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-100 leading-snug">
                How Private Clubs Get Wholesale Hotel Rates
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                An unscripted conversational breakdown of closed-loop club economics, secret wholesale bedbanks, and how Atlas passes pure net pricing to private members.
              </p>
            </div>
          </div>

          {/* Interactive Waveform / Scrubber Bar */}
          <div className="space-y-2 bg-neutral-950/70 p-4 rounded-2xl border border-neutral-800">
            {/* Scrubber slider */}
            <div className="relative w-full h-3 flex items-center cursor-pointer group">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400 group-hover:h-2 transition-all"
              />
            </div>

            {/* Time Indicators */}
            <div className="flex justify-between text-xs font-mono text-neutral-400">
              <span>{formatTime(currentTime)}</span>
              <span className="text-amber-300/80">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Core Transport Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-2">
            {/* Left: Speed Selector */}
            <button
              type="button"
              onClick={changeSpeed}
              className="px-3 py-1.5 rounded-xl border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-800 text-xs font-mono font-semibold text-neutral-200 transition cursor-pointer"
              title="Change Playback Speed"
            >
              {playbackRate}x Speed
            </button>

            {/* Center: Rewind, Play/Pause, Fast Forward */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => skipSeconds(-15)}
                className="p-2.5 rounded-full text-neutral-300 hover:text-amber-300 hover:bg-neutral-800 transition cursor-pointer"
                title="Rewind 15 seconds"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                type="button"
                data-action="toggle-audio"
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold flex items-center justify-center shadow-xl shadow-amber-500/30 transition transform active:scale-95 cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-neutral-950" />
                ) : (
                  <Play className="w-6 h-6 fill-neutral-950 ml-1" />
                )}
              </button>

              <button
                type="button"
                onClick={() => skipSeconds(15)}
                className="p-2.5 rounded-full text-neutral-300 hover:text-amber-300 hover:bg-neutral-800 transition cursor-pointer"
                title="Forward 15 seconds"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>

            {/* Right: Volume & Mute */}
            <button
              type="button"
              onClick={toggleMute}
              className="p-2 rounded-xl border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white transition cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Jump to Chapters */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Key Discussion Chapters (Click to Jump)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CHAPTERS.map((ch) => {
                const isActive = currentTime >= ch.time && currentTime < (ch.time + 180);
                return (
                  <button
                    key={ch.time}
                    type="button"
                    onClick={() => {
                      seekTo(ch.time);
                      if (!isPlaying && audioRef.current) {
                        onPlaybackStart?.();
                        audioRef.current.play().then(() => setIsPlaying(true));
                      }
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'border-amber-400 bg-amber-400/10 text-amber-200'
                        : 'border-neutral-800 hover:border-neutral-700 bg-neutral-950/40 hover:bg-neutral-800/60 text-neutral-300'
                    }`}
                  >
                    <p className="text-xs font-semibold text-neutral-100 flex items-center gap-1.5">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                      <span>{ch.label}</span>
                    </p>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">{ch.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Founder Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400/15 via-neutral-900 to-neutral-950 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-amber-300">Ready to unlock wholesale rates?</p>
              <p className="text-[11px] text-neutral-400">Lock in your lifetime membership at 50% discount.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenWaitlist();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Lock In Half Price</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
