import { useCallback, useMemo, useRef, useState } from "react";
import { AudioContext, TRACK } from "../lib/audioContext.js";
import { loadProgress } from "../lib/podcastProgress.js";

export default function AudioProvider({ children }) {
  const playerRef = useRef(null);
  const [initial] = useState(() => loadProgress(TRACK.id) || {});
  const [active, setActive] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [rate, setRateState] = useState(initial.rate || 1);
  const [savedPosition, setSavedPosition] = useState(initial.position || 0);

  const getAudio = useCallback(() => playerRef.current?.audio?.current, []);

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

  const setRate = useCallback(
    (value) => {
      const audio = getAudio();
      if (audio) audio.playbackRate = value;
      setRateState(value);
    },
    [getAudio]
  );

  const stop = useCallback(() => {
    const audio = getAudio();
    if (audio) audio.pause();
    setActive(false);
    setCollapsed(true);
  }, [getAudio]);

  const value = useMemo(
    () => ({
      playerRef,
      track: TRACK,
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
      toggle,
      stop,
      getAudio,
    }),
    [
      active,
      collapsed,
      playing,
      rate,
      savedPosition,
      play,
      toggle,
      stop,
      setRate,
      getAudio,
    ]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}
