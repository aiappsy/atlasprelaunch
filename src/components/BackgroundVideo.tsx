import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface BackgroundVideoProps {
  isCalculating?: boolean;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ isCalculating = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Reliable high-bandwidth luxury travel drone/resort clips (Pexels / royalty-free web stream)
  const videoSource = 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-hotel-pool-42861-large.mp4';
  const posterImage = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=80';

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85; // Slow, luxurious panning speed
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* High-res Static Poster / Fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${posterImage})` }}
      />

      {/* Cinematic Looping Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        onCanPlay={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-40' : 'opacity-0'
        } ${isCalculating ? 'scale-105 filter brightness-110' : 'scale-100'} transition-transform duration-700 ease-out`}
      >
        <source src={videoSource} type="video/mp4" />
      </video>

      {/* Multi-layered Dark Vignette Overlays for Maximum Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-neutral-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-neutral-950/90" />
      <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[1.5px]" />
    </div>
  );
};
