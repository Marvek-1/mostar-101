
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';

interface MusicPlayerProps {
  audioUrl?: string;
  defaultVolume?: number;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  audioUrl = "https://p.scdn.co/mp3-preview/7c9d34c6a3cf4e4999cfdfbdb446ebc1a0b2194f", 
  defaultVolume = 0.2 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    // Attempt to play on component mount, but this may be blocked by browser policies
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.log("Autoplay blocked by browser policy, user interaction needed:", error);
          setIsPlaying(false);
        });
    }
    
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log("Play blocked:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const increaseVolume = () => {
    setVolume(prevVolume => Math.min(prevVolume + 0.2, 1));
  };

  const decreaseVolume = () => {
    setVolume(prevVolume => Math.max(prevVolume - 0.2, 0));
  };

  return (
    <div className="fixed flex items-center justify-center z-40 bottom-5 right-5 p-2 bg-mostar-dark/80 backdrop-blur-md border border-mostar-light-blue/30 rounded-full shadow-lg shadow-mostar-blue/20">
      <button 
        onClick={togglePlay}
        className="mr-2 p-2 rounded-full hover:bg-mostar-blue/20 text-mostar-light-blue transition-colors"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <span className="text-xs font-mono">◼</span>
        ) : (
          <span className="text-xs font-mono">▶</span>
        )}
      </button>
      
      <button 
        onClick={toggleMute}
        className="p-2 rounded-full hover:bg-mostar-blue/20 text-mostar-light-blue transition-colors"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : volume < 0.4 ? (
          <Volume1 className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </button>
      
      <div className="flex ml-1">
        <button 
          onClick={decreaseVolume}
          className="p-1 rounded-l hover:bg-mostar-blue/20 text-mostar-light-blue text-xs transition-colors border-r border-mostar-light-blue/30"
          aria-label="Decrease volume"
        >
          -
        </button>
        <button 
          onClick={increaseVolume}
          className="p-1 rounded-r hover:bg-mostar-blue/20 text-mostar-light-blue text-xs transition-colors"
          aria-label="Increase volume"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
