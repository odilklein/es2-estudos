import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import podcastUml from "../../Por_que_todo_software_precisa_de_UML.m4a";

const speeds = [1, 1.25, 1.5, 2];

export default function Podcast() {
  const playerRef = useRef(null);
  const [speed, setSpeed] = useState(1);

  function changeSpeed(value) {
    setSpeed(value);
    const audio = playerRef.current?.audio?.current;
    if (audio) audio.playbackRate = value;
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-600">
          <Icon icon="mdi:headphones" width={18} />
          Podcast
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Por que todo software precisa de UML
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
          Episódio de áudio sobre a função da modelagem no desenvolvimento de software. Bom
          para revisar o Módulo 1 antes da prova, principalmente em uma segunda passada ou no
          caminho até a faculdade.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Icon icon="mdi:clock-outline" width={16} />
            cerca de 28 min
          </span>
          <Link to="/modulo-1" className="flex items-center gap-1 font-semibold text-brand-600 hover:underline">
            <Icon icon="mdi:shape-outline" width={16} />
            Ver o Módulo 1
          </Link>
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-soft sm:p-5">
        <AudioPlayer
          ref={playerRef}
          src={podcastUml}
          preload="metadata"
          showSkipControls={false}
          showJumpControls
          showFilledVolume
          hasDefaultKeyBindings
        />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
            <Icon icon="mdi:speedometer" width={16} />
            Velocidade
          </span>
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => changeSpeed(s)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition active:scale-95 ${
                speed === s
                  ? "bg-brand-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:text-brand-700"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <Icon icon="mdi:playlist-music-outline" width={20} className="text-brand-500" />
          O que o episódio cobre
        </h2>
        <ul className="mt-3 space-y-2">
          {[
            "Por que projetos complexos exigem modelagem e projetos simples não.",
            "O que a UML é e o que ela não é.",
            "Casos de uso como visão externa do sistema.",
            "Classes, atributos, métodos e relacionamentos.",
            "Como a modelagem sustenta a manutenção e a evolução do software.",
          ].map((item) => (
            <li key={item} className="flex gap-2 text-sm text-slate-700">
              <Icon icon="mdi:check-circle-outline" width={16} className="mt-1 shrink-0 text-brand-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500">
          Tópicos relacionados ao Módulo 1. Ajuste a velocidade e use os controles de avançar e
          retroceder durante a revisão.
        </p>
      </section>
    </div>
  );
}
