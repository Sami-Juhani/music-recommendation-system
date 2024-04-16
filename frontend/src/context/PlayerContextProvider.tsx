import React, {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserContext } from "./UserContextProvider";
import { usePlaylistGetContext } from "../hooks/usePlaylistGetContext";

type Song = {
  spotifyId: string;
  artist: string;
  name: string;
  progressMs: number;
  duration: string;
  imageUrl: string;
  isPlaying: boolean;
};

type PlayerContextProps = {
  currentSong: Song | undefined;
  isLoading: boolean;
  progressBarRef: RefObject<HTMLDivElement>;
  setCurrentSong: Dispatch<SetStateAction<Song | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  playPrevSong: () => void;
  playNextSong: () => void;
  playSong: (spotifyId?: string) => void;
  pause: () => void;
  getPlaybackState: (controller: AbortController, update?: boolean) => void;
};

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const PlayerContext = createContext<PlayerContextProps | null>(null);

export function PlayerContextProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song>();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { playlist } = usePlaylistGetContext();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const currentSongRef = useRef(currentSong);
  const getPlaybackStateRef = useRef(getPlaybackState);
  const seekRef = useRef(seek);
  getPlaybackStateRef.current = getPlaybackState;
  seekRef.current = seek;
  currentSongRef.current = currentSong;

  useEffect(() => {
    if (progressBarRef.current === null) return;

    const progressBar = document.querySelector(".player-progress-bar");
    if (progressBar === null) return;

    function getMillisecondsOnClick(e: MouseEvent) {
      const progressBar = progressBarRef.current;
      if (progressBar === null || currentSongRef.current === undefined) return;

      const rect = progressBar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.right - rect.left;
      const progress = (x / width) * 100;
      const offSet = Math.round((progress / 100) * parseFloat(currentSongRef.current.duration));
      seekRef.current(offSet);
    }

    progressBar.addEventListener("click", (e) => {
      getMillisecondsOnClick(e as MouseEvent);
    });

    return () => {
      progressBar.removeEventListener("click", (e) => {
        getMillisecondsOnClick(e as MouseEvent);
      });
    };
  }, [playlist]);

  const playNextSong = useCallback(() => {
    if (playlist === undefined || currentSong === undefined || progressBarRef.current == null) return;
    progressBarRef.current.style.setProperty("--progress", `0%`);

    const currentIndex = playlist.tracks.items.findIndex((item: any) => item.track.id === currentSong.spotifyId);

    if (currentIndex === -1 && currentSong === undefined) return;

    let nextIndex = currentIndex + 1;
    if (nextIndex === playlist.tracks.items.length || currentIndex === -1) {
      nextIndex = 0;
    }

    const nextSong = playlist.tracks.items[nextIndex];

    playSong(nextSong.track.id);
    setCurrentSong({
      name: nextSong.track.name,
      artist: nextSong.track?.artists[0]?.name,
      progressMs: 0,
      duration: nextSong.track.duration_ms,
      imageUrl: nextSong.track.album.images[0].url,
      isPlaying: true,
      spotifyId: nextSong.track.id,
    });
  }, [currentSong, playlist]);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    getPlaybackStateRef.current(controller);
    setIsLoading(false);

    return () => {
      controller.abort();
    };
  }, [user]);

  useEffect(() => {
    const controller = new AbortController();

    const updateProgressBar = async () => {
      if (progressBarRef.current == null || currentSong === undefined) return;
      if (!currentSong.isPlaying) clearInterval(updateInterval);
      if (currentSong.isPlaying) getPlaybackStateRef.current(controller, true);

      const progressTime = Math.ceil((currentSong.progressMs / parseFloat(currentSong.duration)) * 100);

      progressBarRef.current.style.setProperty("--progress", `${progressTime}%`);

      if (progressTime === 100) playNextSong();
    };

    const updateInterval = setInterval(() => {
      updateProgressBar();
    }, 700);

    return () => clearInterval(updateInterval);
  }, [currentSong, playNextSong]);

  async function getPlaybackState(controller: AbortController, update?: boolean) {
    let progressBar: HTMLDivElement | null = document.querySelector(".player-progress-bar");

    try {
      const response = await fetch(`${BASE_URL}/api/spotify/player/playbackstate/`, {
        signal: controller.signal,
        credentials: "include",
      });

      if (!response.ok) {
        setCurrentSong(undefined);
      }
      const playbackState = await response.json();

      const song: Song = {
        spotifyId: currentSong?.spotifyId !== playbackState.item.id ? playbackState.item.id : "",
        artist: playbackState.item?.artists[0]?.name || "",
        name: playbackState.item?.name || "",
        progressMs: playbackState.progress_ms,
        duration: playbackState.item?.duration_ms || 0,
        imageUrl: playbackState.item?.album?.images[0]?.url || "./assets/album.webp",
        isPlaying: playbackState.is_playing || false,
      };

      if (!update || currentSong?.spotifyId !== playbackState.item.id) setCurrentSong(song);
      else setCurrentSong((s: any) => ({ ...s, progressMs: playbackState.progress_ms }));
    } catch (error: any) {
      if (error.name === "AbortError") {
        return;
      }
      setCurrentSong(undefined);
      progressBar?.style.setProperty("--progress", "0%");
    }
  }

  async function playPrevSong() {
    if (playlist === undefined || currentSong === undefined) return;

    const currentIndex = playlist.tracks.items.findIndex((item: any) => item.track.id === currentSong.spotifyId);

    if (currentIndex === -1) return;

    let nextIndex = currentIndex - 1;
    if (nextIndex === -1) {
      nextIndex = playlist.tracks.items.length - 1;
    }

    const nextSong = playlist.tracks.items[nextIndex];

    playSong(nextSong.track.id);
    setCurrentSong({
      name: nextSong.track.name,
      artist: nextSong.track?.artists[0]?.name,
      progressMs: 0,
      duration: nextSong.track.duration_ms,
      imageUrl: nextSong.track.album.images[0].url,
      isPlaying: true,
      spotifyId: nextSong.track.id,
    });
  }

  async function playSong(spotifyId?: string) {
    let data;

    if (spotifyId === undefined) {
      data = {};
    } else {
      data = { uris: [`spotify:track:${spotifyId}`] };
    }

    try {
      const response = await fetch(`${BASE_URL}/api/spotify/player/play/`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) return;

      if (response.status === 204) setCurrentSong((s: any) => ({ ...s, isPlaying: true }));
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function pause() {
    if (currentSong === undefined || currentSong.isPlaying === false) return;

    try {
      const response = await fetch(`${BASE_URL}/api/spotify/player/pause/`, {
        method: "PUT",
        credentials: "include",
      });

      if (!response.ok) return;

      if (response.status === 204) setCurrentSong((s: any) => ({ ...s, isPlaying: false }));
    } catch (error: any) {
      return;
    }
  }

  async function seek(positionMs: number) {
    if (currentSong === undefined || currentSong.isPlaying === false) return;

    try {
      const response = await fetch(`${BASE_URL}/api/spotify/player/seek?position_ms=${positionMs}`, {
        method: "PUT",
        credentials: "include",
      });

      if (!response.ok) return;

      if (response.status === 204) return;
    } catch (error: any) {
      return;
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isLoading,
        progressBarRef,
        setCurrentSong,
        setIsLoading,
        playSong,
        playNextSong,
        playPrevSong,
        pause,
        getPlaybackState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
