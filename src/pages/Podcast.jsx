import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAudio } from "../lib/audioContext.js";
import { formatTime } from "../lib/podcastProgress.js";
import { modules } from "../data/modules.js";

const speeds = [1, 1.25, 1.5, 2];

const moduleById = Object.fromEntries(modules.map((m) => [m.id, m]));

export default function Podcast() {
  const {
    episodes,
    currentId,
    toggle,
    playTrack,
    playing,
    rate,
    setRate,
    savedPosition,
    active,
  } = useAudio();

  return (
    <div className="space-y-8">
      <header>
        <p className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-600">
          <Icon icon="mdi:headphones" width={18} />
          Podcasts
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Episódios de áudio</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
          Áudios de revisão sobre os temas da disciplina. O player fica no rodapé e continua
          tocando ao trocar de página. Sua posição e velocidade ficam salvas para a próxima
          visita.
        </p>
      </header>

      <section className="space-y-3">
        {episodes.map((ep, i) => {
          const isCurrent = ep.id === currentId;
          const isPlayingThis = isCurrent && playing;
          const mod = moduleById[ep.moduleId];
          return (
            <div
              key={ep.id}
              className={`flex items-center gap-3 rounded-2xl border bg-white p-3.5 shadow-soft sm:gap-4 sm:p-4 ${
                isCurrent ? "border-brand-300" : "border-slate-200"
              }`}
            >
              <button
                onClick={() => (isCurrent ? toggle() : playTrack(ep.id))}
                aria-label={isPlayingThis ? "Pausar" : "Reproduzir"}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700 active:scale-95"
              >
                <Icon icon={isPlayingThis ? "mdi:pause" : "mdi:play"} width={26} />
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-sm font-bold text-slate-900 sm:text-base">{ep.title}</h2>
                </div>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Icon icon="mdi:clock-outline" width={13} />
                    {ep.duration}
                  </span>
                  <span>{ep.subtitle}</span>
                  {mod && (
                    <Link
                      to={`/${mod.id}`}
                      className="flex items-center gap-1 font-semibold text-brand-600 hover:underline"
                    >
                      <Icon icon={mod.icon} width={13} />
                      {mod.short}
                    </Link>
                  )}
                </p>
                {isCurrent && savedPosition > 5 && !playing && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-brand-700">
                    <Icon icon="mdi:history" width={13} />
                    Retomar de {formatTime(savedPosition)}
                  </p>
                )}
              </div>

              {isCurrent && (
                <span className="hidden shrink-0 rounded-lg bg-brand-50 px-2 py-1 text-[11px] font-bold text-brand-700 sm:block">
                  {playing ? "Tocando" : "No player"}
                </span>
              )}
            </div>
          );
        })}
      </section>

      <section className="card">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
            <Icon icon="mdi:speedometer" width={16} />
            Velocidade
          </span>
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setRate(s)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition active:scale-95 ${
                rate === s
                  ? "bg-brand-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:text-brand-700"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <Icon icon="mdi:playlist-music-outline" width={15} />
          A velocidade vale para todos os episódios. Ao terminar um, o próximo inicia automaticamente.
        </p>
      </section>

      <section className="card">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <Icon icon="mdi:playlist-music-outline" width={20} className="text-brand-500" />
          O que os episódios cobrem
        </h2>
        <ul className="mt-3 space-y-2">
          {[
            "Por que projetos complexos exigem modelagem.",
            "Do caos ao código: como os diagramas UML organizam o sistema.",
            "Controle ou adaptação: como escolher o processo de desenvolvimento.",
            "XP, timebox e UML sem decoreba: práticas ágeis no dia a dia.",
            "BPMN aplicado ao processo de reembolso de despesas.",
          ].map((item) => (
            <li key={item} className="flex gap-2 text-sm text-slate-700">
              <Icon icon="mdi:check-circle-outline" width={16} className="mt-1 shrink-0 text-brand-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {!active && (
          <p className="mt-3 text-xs text-slate-500">
            Toque no play de um episódio para abrir o player no rodapé.
          </p>
        )}
      </section>
    </div>
  );
}
