
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Volume1, VolumeX, Play, Pause, Music } from 'lucide-react';
import { toast } from 'sonner';

// === Spotify configuration ===
const CLIENT_ID = 'a0b995b828d84555a8d9ed270780f395';
const REDIRECT_URI = 'https://v0-sigmanum.vercel.app/callback';
const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-modify-playback-state',
  'user-read-playback-state',
].join(' ');
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${encodeURIComponent(SCOPES)}`;

interface MusicPlayerProps {
  defaultVolume?: number;
  systemState?: 'overlord' | 'assessor' | 'oracle' | 'judge' | 'executor' | 'network';
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  defaultVolume = 0.3,
  systemState = 'overlord',
}) => {
  const [spotifyToken, setSpotifyToken] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);
  const [isMuted, setIsMuted] = useState(false);
  const [trackName, setTrackName] = useState('Initializing Grid Audio…');
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const playerRef = useRef<any>(null);

  // === Spotify URIs for each system state ===
  const spotifyTrackMap: Record<string, string> = {
    overlord: 'spotify:track:5jUQgikDAR8VdRidW1058F',
    assessor: 'spotify:track:6I3xxBk9bTRFqzVur1RZW0',
    oracle: 'spotify:track:0KLy8FhoIWjPwfcjQSJSZ9',
    judge: 'spotify:track:57cV6k2cWGacKcaAinpgFk',
    executor: 'spotify:track:4p2lyaJDrMW83XxAyHkcHE',
    network: 'spotify:track:5jUQgikDAR8VdRidW1058F',
  };
  const selectedSpotifyTrack = spotifyTrackMap[systemState] || spotifyTrackMap['overlord'];

  // === Token handling ===
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.substring(1).split('&').reduce((acc: any, kv) => {
      const [key, val] = kv.split('=');
      acc[key] = val;
      return acc;
    }, {});
    if (hash.access_token) {
      localStorage.setItem('spotify_token', hash.access_token);
      setSpotifyToken(hash.access_token);
      window.location.hash = '';
    } else {
      const stored = localStorage.getItem('spotify_token');
      if (stored) setSpotifyToken(stored);
    }
  }, []);

  // === Load Spotify SDK ===
  useEffect(() => {
    if (!spotifyToken) return;
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Mostar Grid Player',
        getOAuthToken: (cb: any) => cb(spotifyToken),
        volume,
      });

      player.addListener('ready', ({ device_id }: any) => {
        setDeviceId(device_id);
        toast('🎧 Spotify connected', { icon: <Music className="text-green-400" /> });
      });

      player.addListener('player_state_changed', (state: any) => {
        if (!state) return;
        setIsPlaying(!state.paused);
        setTrackName(state.track_window.current_track?.name || 'Unknown Track');
      });

      player.connect();
      playerRef.current = player;
    };

    return () => {
      playerRef.current?.disconnect();
    };
  }, [spotifyToken]);

  // === Play Spotify Track ===
  const playTrack = async () => {
    if (spotifyToken && deviceId) {
      try {
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uris: [selectedSpotifyTrack] }),
        });
        setIsPlaying(true);
      } catch (err) {
        console.warn('Spotify play failed:', err);
        toast.error('Unable to play track. Check Spotify connection.');
      }
    } else {
      toast.error('Spotify not connected. Please connect your account.');
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current?.pause();
      setIsPlaying(false);
    } else {
      playTrack();
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const inc = () => setVolume(v => Math.min(v + 0.1, 1));
  const dec = () => setVolume(v => Math.max(v - 0.1, 0));

  return (
    <div className="fixed z-40 bottom-5 right-5 flex items-center bg-black/80 border border-cyan-700 p-3 rounded-full shadow-lg">
      <button onClick={togglePlay} className="text-cyan-300 hover:text-cyan-100 mx-2">
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>
      <button onClick={toggleMute} className="text-cyan-300 hover:text-cyan-100 mx-2">
        {isMuted ? <VolumeX className="h-5 w-5" /> : volume < 0.5 ? <Volume1 className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
      <div className="flex ml-2 border border-cyan-800 rounded overflow-hidden">
        <button onClick={dec} className="px-2 text-cyan-300 hover:bg-cyan-900">−</button>
        <button onClick={inc} className="px-2 text-cyan-300 hover:bg-cyan-900">+</button>
      </div>
      <div className="ml-3 text-xs text-cyan-500 font-mono truncate max-w-[150px]">{trackName}</div>
      {!spotifyToken && (
        <button
          onClick={() => (window.location.href = AUTH_URL)}
          className="ml-3 text-green-400 text-xs font-bold underline"
        >
          Connect Spotify
        </button>
      )}
    </div>
  );
};

export default MusicPlayer;
