import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { modules, examTips } from "../data/modules.js";
import Rich from "../components/Rich.jsx";

export default function Home() {
  const totalMcq = modules.reduce((n, m) => n + m.quiz.mcq.length, 0);
  const totalDisc = modules.reduce((n, m) => n + m.quiz.discursive.length, 0);

  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white sm:p-8">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-100">
          <Icon icon="mdi:book-education-outline" width={16} />
          Revisão para a prova
        </p>
        <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-4xl">
          Engenharia de Software 2: do zero à prova
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-brand-50/90 sm:text-base">
          Teoria explicada, resumos de véspera, diagramas interativos e banco de questões
          comentadas. Estude pelo celular, no seu ritmo.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-3">
          <Link
            to={`/${modules[0].id}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 active:scale-95"
          >
            <Icon icon="mdi:play-circle-outline" width={18} />
            Começar pelo Módulo 1
          </Link>
          <Link
            to="/simulado"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white active:scale-95"
          >
            <Icon icon="mdi:clipboard-check-outline" width={18} />
            Fazer simulado
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { n: modules.length, l: "módulos", i: "mdi:books" },
            { n: totalMcq, l: "múltipla escolha", i: "mdi:format-list-checks" },
            { n: totalDisc, l: "discursivas", i: "mdi:text-box-edit-outline" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-white/10 p-3">
              <Icon icon={s.i} width={18} className="mx-auto text-brand-100" />
              <span className="mt-1 block text-xl font-bold">{s.n}</span>
              <span className="block text-[11px] text-brand-50/80">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">Módulos</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {modules.map((m) => (
            <Link
              key={m.id}
              to={`/${m.id}`}
              className="card group flex flex-col transition hover:border-brand-300 hover:shadow-soft"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon icon={m.icon} width={24} />
              </span>
              <span className="mt-3 text-xs font-bold uppercase tracking-wide text-brand-600">
                {m.short}
              </span>
              <h3 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-brand-700">
                {m.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{m.summary}</p>
              <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-600">
                Estudar <Icon icon="mdi:arrow-right" width={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <Link
          to="/diagramas"
          className="card group flex flex-col gap-3 hover:border-brand-300 hover:shadow-soft sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon icon="mdi:chart-box-outline" width={24} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Guia de diagramas</h2>
              <p className="text-sm text-slate-600">
                Os 9 diagramas de UML e BPMN, com quando usar cada um e exemplos.
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-brand-600">
            Abrir guia <Icon icon="mdi:arrow-right" width={16} />
          </span>
        </Link>
      </section>

      <section>
        <Link
          to="/podcast"
          className="card group flex flex-col gap-3 hover:border-brand-300 hover:shadow-soft sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon icon="mdi:headphones" width={24} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Podcasts de revisão</h2>
              <p className="text-sm text-slate-600">5 episódios de áudio com player no rodapé e retomada.</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-brand-600">
            Ouvir <Icon icon="mdi:play" width={16} />
          </span>
        </Link>
      </section>

      <section>
        <Link
          to="/offline"
          className="card group flex flex-col gap-3 hover:border-brand-300 hover:shadow-soft sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon icon="mdi:wifi-off" width={24} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Funciona sem internet</h2>
              <p className="text-sm text-slate-600">
                Instale na tela inicial e estude no modo offline.
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-brand-600">
            Como instalar <Icon icon="mdi:arrow-right" width={16} />
          </span>
        </Link>
      </section>

      <section>
        <h2 className="section-title">Estratégia de prova</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {examTips.map((t) => (
            <div key={t.title} className="card">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                <Icon icon="mdi:lightbulb-on-outline" width={18} className="text-brand-500" />
                {t.title}
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">
                <Rich>{t.body}</Rich>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
