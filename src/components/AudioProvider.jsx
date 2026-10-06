import { useCallback, useMemo, useRef, useState } from "react";
import { AudioContext, EPISODES } from "../lib/audioContext.js";
import {
  loadLastTrackId,
  loadProgress,
  saveLastTrackId,
  saveProgress,
} from "../lib/podcastProgress.js";

function initialTrackId() {
  const last = loadLastTrackId();
  return EPISODES.some((e) => e.id === last) ? last : EPISODES[0].id;
}

export default function AudioProvider({ children }) {
  const playerRef = useRef(null);
  const [currentId, setCurrentId] = useState(initialTrackId);
  const [active, setActive] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [rate, setRateState] = useState(
    () => loadProgress(initialTrackId())?.rate || 1
  );
  const [savedPosition, setSavedPosition] = useState(
    () => loadProgress(initialTrackId())?.position || 0
  );

  const track = useMemo(
    () => EPISODES.find((e) => e.id === currentId) || EPISODES[0],
    [currentId]
  );
  const index = useMemo(
    () => EPISODES.findIndex((e) => e.id === track.id),
    [track.id]
  );

  const getAudio = useCallback(() => playerRef.current?.audio?.current, []);

  const saveCurrent = useCallback(() => {
    const audio = getAudio();
    if (audio && !audio.ended && audio.currentTime > 0) {
      saveProgress(currentId, {
        position: audio.currentTime,
        rate: audio.playbackRate || 1,
        volume: audio.volume ?? 1,
      });
    }
  }, [currentId, getAudio]);

  const play = useCallback(() => {
    setActive(true);
    const audio = getAudio();
    if (audio) audio.play().catch(() => {});
  }, [getAudio]);

  const toggle = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;
    setActive(true);
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }, [getAudio]);

  const playTrack = useCallback(
    (id) => {
      setActive(true);
      if (id && id !== currentId) {
        saveCurrent();
        setCurrentId(id);
        saveLastTrackId(id);
        setSavedPosition(loadProgress(id)?.position || 0);
      } else {
        const audio = getAudio();
        if (audio) audio.play().catch(() => {});
      }
    },
    [currentId, getAudio, saveCurrent]
  );

  const next = useCallback(() => {
    playTrack(EPISODES[(index + 1) % EPISODES.length].id);
  }, [index, playTrack]);

  const prev = useCallback(() => {
    playTrack(EPISODES[(index - 1 + EPISODES.length) % EPISODES.length].id);
  }, [index, playTrack]);

  const setRate = useCallback(
    (value) => {
      const audio = getAudio();
      if (audio) audio.playbackRate = value;
      setRateState(value);
    },
    [getAudio]
  );

  const stop = useCallback(() => {
    saveCurrent();
    const audio = getAudio();
    if (audio) audio.pause();
    setActive(false);
    setCollapsed(true);
  }, [getAudio, saveCurrent]);

  const value = useMemo(
    () => ({
      playerRef,
      episodes: EPISODES,
      track,
      currentId,
      active,
      setActive,
      collapsed,
      setCollapsed,
      playing,
      setPlaying,
      rate,
      setRate,
      savedPosition,
      setSavedPosition,
      play,
      playTrack,
      toggle,
      next,
      prev,
      stop,
      getAudio,
    }),
    [
      track,
      currentId,
      active,
      collapsed,
      playing,
      rate,
      savedPosition,
      play,
      playTrack,
      toggle,
      next,
      prev,
      stop,
      setRate,
      getAudio,
    ]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}
