import React, { useState, useEffect } from 'react';

interface BackgroundVideoProps {
  isCalculating?: boolean;
  isPlaying?: boolean;
  isMuted?: boolean;
  onMuteChange?: (muted: boolean) => void;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  onEnded?: () => void;
}

interface LuxuryDestination {
  name: string;
  location: string;
  image: string;
  tag: string;
}

const LUXURY_DESTINATIONS: LuxuryDestination[] = [
  {
    name: 'Overwater Lagoon Villas',
    location: 'Baa Atoll, Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2560&q=85',
    tag: 'Save 38% Net',
  },
  {
    name: 'Cliffside Infinity Retreat',
    location: 'Amalfi Coast, Italy',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2560&q=85',
    tag: 'Save 42% Net',
  },
  {
    name: 'Private Sanctuary Pool Villa',
    location: 'Uluwatu, Bali',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2560&q=85',
    tag: 'Save 45% Net',
  },
  {
    name: 'Grand Palace View Suite',
    location: 'Place Vendôme, Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2560&q=85',
    tag: 'Save 35% Net',
  },
];

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  isCalculating = false,
  isPlaying = true,
  isMuted = true,
  onMuteChange,
  videoRef,
  onEnded,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  // Synchronize playback
  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;
    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying, videoRef]);

  // Synchronize mute state
  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;
    if (video.muted !== isMuted) {
      video.muted = isMuted;
      video.volume = 1.0;
    }
  }, [isMuted, videoRef]);

  // Background ambient video is kept muted so browsers never block it
  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, [videoRef]);

  // Rotate luxury destinations every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % LUXURY_DESTINATIONS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentDest = LUXURY_DESTINATIONS[activeIdx];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* 100% Crisp 4K Cinematic Background Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        loop
        className={`absolute inset-0 w-full h-full object-cover scale-100 transition-all duration-1000 opacity-90 ${
          isCalculating ? 'scale-105 filter brightness-110' : ''
        } ${!isPlaying ? 'filter brightness-80' : ''}`}
      >
        <source src="/video/luxury-hotel-commercial.mp4?v=20261009_v3" type="video/mp4" />
        <source src="/video/luxury-ocean-drone.mp4" type="video/mp4" />
      </video>

      {/* Rotating High-Res 4K Luxury Resort Imagery Overlay */}
      {LUXURY_DESTINATIONS.map((dest, idx) => (
        <div
          key={dest.name}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            idx === activeIdx ? 'opacity-30' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${dest.image})` }}
        />
      ))}

      {/* Subtle translucent vignette so text is readable while turquoise waters and luxury pools remain vivid */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-neutral-950/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-neutral-950/40 pointer-events-none" />

      {/* Subtle Live Destination Pill at Bottom Left */}
      <div className="absolute bottom-5 left-6 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-950/80 border border-neutral-800 text-[11px] font-mono text-neutral-300 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-amber-300 font-semibold">{currentDest.name}</span>
        <span className="text-neutral-500">•</span>
        <span className="text-neutral-400">{currentDest.location}</span>
        <span className="text-emerald-400 font-bold bg-emerald-500/15 px-1.5 py-0.2 rounded border border-emerald-500/30">
          {currentDest.tag}
        </span>
      </div>
    </div>
  );
};
