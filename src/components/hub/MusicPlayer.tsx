
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Volume1, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface MusicPlayerProps {
  audioUrl?: string;
  defaultVolume?: number;
  systemState?: 'overlord' | 'assessor' | 'oracle' | 'judge' | 'executor' | 'network';
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  audioUrl, 
  defaultVolume = 0.25,
  systemState = 'overlord',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);
  const [isMuted, setIsMuted] = useState(false);
  const [trackName, setTrackName] = useState('Initializing Grid Audio…');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // === Contextual Tracks for Each System Layer ===
  const soundMap: Record<string, { name: string; url: string }> = {
    overlord: {
      name: 'Overlord Ambient (System Core)',
      url: 'https://cdn.pixabay.com/download/audio/2023/05/07/audio_73b9bb77e1.mp3',
    },
    assessor: {
      name: 'Assessor Pulse (Signal Analysis)',
      url: 'https://cdn.pixabay.com/download/audio/2023/05/17/audio_9e7d2d47e7.mp3',
    },
    oracle: {
      name: 'Oracle Ether (Doctrine Layer)',
      url: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_0cfc4c1ab1.mp3',
    },
    judge: {
      name: 'Judge Drone (Verdict Engine)',
      url: 'https://cdn.pixabay.com/download/audio/2023/02/18/audio_6b8c4b2c23.mp3',
    },
    executor: {
      name: 'Executor March (Action Layer)',
      url: 'https://cdn.pixabay.com/download/audio/2022/03/22/audio_255b8a3cc5.mp3',
    },
    network: {
      name: 'Neural Net Sync (Global Grid)',
      url: 'https://cdn.pixabay.com/download/audio/2022/02/17/audio_5a1711eb31.mp3',
    },
  };

  // Choose track by systemState
  const selectedTrack = soundMap[systemState] || soundMap['overlord'];

  useEffect(() => {
    setTrackName(selectedTrack.name);
    audioRef.current = new Audio(selectedTrack.url);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          toast(`Now playing: ${selectedTrack.name}`, {
            icon: <Zap className="h-5 w-5 text-mostar-cyan" />,
            style: { background: 'rgba(10,14,23,0.9)', border: '1px solid rgba(0,255,255,0.3)', color: '#00ffff' },
          });
        })
        .catch(() => {
          setIsPlaying(false);
          toast('🔇 Autoplay blocked. Click play to activate audio.');
        });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [systemState]);

  // Smooth volume transitions
  useEffect(() => {
    if (audioRef.current) {
      const targetVolume = isMuted ? 0 : volume;
      const step = (targetVolume - audioRef.current.volume) / 10;
      let frame = 0;
      const smoothAdjust = setInterval(() => {
        if (!audioRef.current) return;
        if (frame >= 10) return clearInterval(smoothAdjust);
        audioRef.current.volume += step;
        frame++;
      }, 30);
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      toast('Audio paused');
    } else {
      audioRef.current.play().catch(() => toast('Play blocked: user gesture required'));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const increaseVolume = () => setVolume(v => Math.min(v + 0.1, 1));
  const decreaseVolume = () => setVolume(v => Math.max(v - 0.1, 0));

  return (
    <div className="fixed flex items-center justify-center z-40 bottom-5 right-5 p-2 bg-mostar-dark/80 backdrop-blur-md border border-mostar-light-blue/30 rounded-full shadow-lg shadow-mostar-blue/20 transition-all hover:shadow-mostar-cyan/30">
      <div className="flex items-center space-x-2">
        <button 
          onClick={togglePlay}
          className="p-2 rounded-full hover:bg-mostar-blue/20 text-mostar-light-blue transition-colors"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <span className="text-xs font-mono">◼</span> : <span className="text-xs font-mono">▶</span>}
        </button>

        <button 
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-mostar-blue/20 text-mostar-light-blue transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : volume < 0.4 ? (
            <Volume1 className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </button>

        <div className="flex ml-1 border border-mostar-light-blue/30 rounded overflow-hidden">
          <button 
            onClick={decreaseVolume}
            className="p-1 text-mostar-light-blue text-xs transition-colors hover:bg-mostar-blue/20 border-r border-mostar-light-blue/20"
            aria-label="Decrease volume"
          >
            -
          </button>
          <button 
            onClick={increaseVolume}
            className="p-1 text-mostar-light-blue text-xs transition-colors hover:bg-mostar-blue/20"
            aria-label="Increase volume"
          >
            +
          </button>
        </div>
      </div>

      <div className="ml-3 text-[10px] font-mono text-white/60 hidden sm:block">
        {trackName}
      </div>
    </div>
  );
};

export default MusicPlayer;
