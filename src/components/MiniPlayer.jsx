import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useAudio } from "../lib/audioContext.js";
import { formatTime, loadProgress, saveProgress } from "../lib/podcastProgress.js";

const speeds = [1, 1.25, 1.5, 2];

export default function MiniPlayer() {
  const {
    playerRef,
    track,
    active,
    collapsed,
    setCollapsed,
    playing,
    setPlaying,
    rate,
    setRate,
    stop,
  } = useAudio();

  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const restoredRef = useRef(false);
  const lastSaveRef = useRef(0);

  function persist(audio, overrides = {}) {
    if (!audio) return;
    saveProgress(track.id, {
      position: audio.currentTime || 0,
      rate: audio.playbackRate || 1,
      volume: audio.volume ?? 1,
      ...overrides,
    });
  }

  function handleLoadedMetaData(e) {
    const audio = e.target;
    setDuration(audio.duration || 0);
    if (restoredRef.current) return;
    restoredRef.current = true;

    const saved = loadProgress(track.id);
    if (!saved) return;
    if (saved.rate) {
      audio.playbackRate = saved.rate;
      setRate(saved.rate);
    }
    if (saved.volume != null) audio.volume = saved.volume;

    const pos = saved.position || 0;
    const total = audio.duration || 0;
    if (pos > 5 && (!total || pos < total - 15)) {
      audio.currentTime = pos;
      setCurrent(pos);
    }
  }

  function handleListen(e) {
    const audio = e.target;
    setCurrent(audio.currentTime || 0);
    const now = Date.now();
    if (now - lastSaveRef.current > 4000) {
      lastSaveRef.current = now;
      persist(audio);
    }
  }

  useEffect(() => {
    function saveNow() {
      const audio = playerRef.current?.audio?.current;
      if (audio) persist(audio);
    }
    window.addEventListener("pagehide", saveNow);
    document.addEventListener("visibilitychange", saveNow);
    return () => {
      window.removeEventListener("pagehide", saveNow);
      document.removeEventListener("visibilitychange", saveNow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.id]);

  const percent = duration > 0 ? Math.min(100, (current / duration) * 100) : 0;

  return (
    <footer
      aria-hidden={!active}
      inert={!active}
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
        active ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-3xl px-2 pb-[env(safe-area-inset-bottom)] sm:px-4">
        <div className="overflow-hidden rounded-t-2xl border border-b-0 border-slate-200 bg-white shadow-soft">
          <div className="flex items-center gap-2.5 p-2.5 sm:gap-3 sm:p-3">
            <button
              onClick={() => {
                const audio = playerRef.current?.audio?.current;
                if (!audio) return;
                if (audio.paused) audio.play().catch(() => {});
                else audio.pause();
              }}
              aria-label={playing ? "Pausar" : "Reproduzir"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white active:scale-95"
            >
              <Icon icon={playing ? "mdi:pause" : "mdi:play"} width={22} />
            </button>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">{track.title}</p>
              <p className="text-xs text-slate-500">
                {formatTime(current)} / {formatTime(duration)}
              </p>
            </div>

            <span className="hidden items-center gap-1 text-[11px] font-semibold text-slate-400 sm:flex">
              <Icon icon="mdi:headphones" width={14} />
              {track.subtitle}
            </span>

            <button
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expandir player" : "Recolher player"}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:text-brand-700 active:scale-95"
            >
              <Icon icon={collapsed ? "mdi:chevron-up" : "mdi:chevron-down"} width={18} />
            </button>
            <button
              onClick={stop}
              aria-label="Fechar player"
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 active:scale-95"
            >
              <Icon icon="mdi:close" width={18} />
            </button>
          </div>

          {collapsed && (
            <div className="h-1 w-full bg-slate-200">
              <div className="h-full bg-brand-500" style={{ width: `${percent}%` }} />
            </div>
          )}

          <div className={collapsed ? "h-0 overflow-hidden" : "border-t border-slate-100 px-2 pb-2 sm:px-3"}>
            <AudioPlayer
              className="mini-player"
              ref={playerRef}
              src={track.src}
              preload="metadata"
              showSkipControls={false}
              showJumpControls
              showFilledVolume={false}
              hasDefaultKeyBindings
              listenInterval={1000}
              onListen={handleListen}
              onLoadedMetaData={handleLoadedMetaData}
              onPlay={() => setPlaying(true)}
              onPause={(e) => {
                setPlaying(false);
                persist(e.target);
              }}
              onSeeked={(e) => {
                setCurrent(e.target.currentTime || 0);
                persist(e.target);
              }}
              onEnded={(e) => {
                setPlaying(false);
                setCurrent(0);
                persist(e.target, { position: 0 });
              }}
            />

            <div className="flex flex-wrap items-center gap-2 px-1 pb-1 pt-1">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Icon icon="mdi:speedometer" width={14} />
                Velocidade
              </span>
              {speeds.map((s) => (
                <button
                  key={s}
                  onClick={() => setRate(s)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition active:scale-95 ${
                    rate === s
                      ? "bg-brand-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:text-brand-700"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
