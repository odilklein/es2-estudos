import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { modules } from "../data/modules.js";
import Content from "../components/Content.jsx";
import QuizBank from "../components/Quiz.jsx";
import Mermaid from "../components/Mermaid.jsx";
import Rich from "../components/Rich.jsx";

const tabs = [
  { id: "teoria", label: "Teoria", icon: "mdi:book-open-page-variant-outline" },
  { id: "resumos", label: "Resumos", icon: "mdi:lightning-bolt-outline" },
  { id: "diagramas", label: "Diagramas", icon: "mdi:chart-box-outline" },
  { id: "questoes", label: "Questões", icon: "mdi:help-circle-outline" },
];

export default function ModulePage() {
  const { id } = useParams();
  const [tab, setTab] = useState("teoria");
  const module = modules.find((m) => m.id === id);

  if (!module) return <Navigate to="/" replace />;

  const index = modules.indexOf(module);
  const prev = modules[index - 1];
  const next = modules[index + 1];

  return (
    <div>
      <header>
        <p className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-600">
          <Icon icon={module.icon} width={18} />
          {module.short}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">{module.title}</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">{module.summary}</p>
      </header>

      <div className="sticky top-[57px] z-20 -mx-4 mt-5 border-y border-slate-200 bg-slate-50/95 px-4 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="soft-scroll flex gap-1 overflow-x-auto py-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition active:scale-95 ${
                tab === t.id
                  ? "bg-brand-600 text-white shadow-soft"
                  : "text-slate-600 hover:bg-white hover:text-brand-700"
              }`}
            >
              <Icon icon={t.icon} width={18} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {tab === "teoria" && <Content blocks={module.theory} />}

        {tab === "resumos" && (
          <div className="grid gap-4 md:grid-cols-2">
            {module.cheat.map((card) => (
              <div key={card.title} className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="flex items-center gap-2 text-lg font-bold text-amber-900">
                  <Icon icon="mdi:flash-outline" width={18} />
                  {card.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {card.items.map((it, i) => (
                    <li key={i} className="flex gap-2 text-sm text-amber-900/90">
                      <Icon icon="mdi:check-circle-outline" width={16} className="mt-1 shrink-0 text-amber-500" />
                      <span>
                        <Rich>{it}</Rich>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5 md:col-span-2">
              <h3 className="flex items-center gap-2 text-lg font-bold text-brand-900">
                <Icon icon="mdi:clipboard-check-outline" width={18} />
                Checklist de véspera
              </h3>
              <p className="mt-2 text-sm text-brand-900/80">
                Revise os cartões acima, resolva as questões na aba “Questões” e finalize com o{" "}
                <Link className="font-semibold underline" to="/simulado">
                  simulado completo
                </Link>
                .
              </p>
            </div>
          </div>
        )}

        {tab === "diagramas" && (
          <div className="space-y-8">
            {module.diagrams.map((d, i) => (
              <section key={i}>
                <h3 className="text-lg font-bold text-slate-900">{d.title}</h3>
                {d.description && <p className="text-sm text-slate-500">{d.description}</p>}
                <Mermaid code={d.code} />
              </section>
            ))}
            <p className="text-sm text-slate-500">
              Toque em <strong>Ampliar</strong> para dar zoom e arrastar o diagrama.
            </p>
          </div>
        )}

        {tab === "questoes" && <QuizBank mcq={module.quiz.mcq} discursive={module.quiz.discursive} />}
      </div>

      <nav className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        {prev ? (
          <Link
            to={`/${prev.id}`}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-700"
          >
            <Icon icon="mdi:arrow-left" width={16} />
            {prev.short} · {prev.title}
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <Link
            to={`/${next.id}`}
            className="flex items-center justify-end gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-700"
          >
            {next.short} · {next.title}
            <Icon icon="mdi:arrow-right" width={16} />
          </Link>
        ) : (
          <Link
            to="/simulado"
            className="flex items-center justify-end gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Ir para o simulado
            <Icon icon="mdi:arrow-right" width={16} />
          </Link>
        )}
      </nav>
    </div>
  );
}
