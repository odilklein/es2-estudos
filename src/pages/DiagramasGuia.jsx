import { useState } from "react";
import { Icon } from "@iconify/react";
import { diagramGuide, diagramQuiz, categories } from "../data/diagramGuide.js";
import Mermaid from "../components/Mermaid.jsx";
import { MCQ } from "../components/Quiz.jsx";
import Rich from "../components/Rich.jsx";

const categoryIcon = {
  estrutural: "mdi:cube-outline",
  comportamental: "mdi:transit-connection-variant",
  bpmn: "mdi:sitemap-outline",
};

function CategoryBadge({ kind }) {
  const c = categories[kind];
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold ${c.color}`}>
      <Icon icon={categoryIcon[kind]} width={13} />
      {c.label}
    </span>
  );
}

export default function DiagramasGuia() {
  const [active, setActive] = useState(diagramGuide[0].id);
  const [showQuiz, setShowQuiz] = useState(false);
  const current = diagramGuide.find((d) => d.id === active);

  return (
    <div className="space-y-8">
      <header>
        <p className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-600">
          <Icon icon="mdi:chart-box-outline" width={18} />
          Guia de diagramas
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Diagramas de modelagem (UML e BPMN)
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
          Qual diagrama usar em cada situação, com um exemplo de cenário e os elementos que
          aparecem no desenho. Escolha um diagrama para ver o gráfico e a explicação.
        </p>
      </header>

      <section>
        <h2 className="section-title">Visão geral</h2>

        <div className="soft-scroll mt-4 hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white lg:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">Diagrama</th>
                <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">Categoria</th>
                <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">Quando usar</th>
                <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              {diagramGuide.map((d, i) => (
                <tr
                  key={d.id}
                  className={`${i % 2 ? "bg-slate-50" : "bg-white"} cursor-pointer hover:bg-brand-50`}
                  onClick={() => {
                    setActive(d.id);
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                >
                  <td className="border-b border-slate-100 px-4 py-2 font-semibold text-slate-800">{d.title}</td>
                  <td className="border-b border-slate-100 px-4 py-2">
                    <CategoryBadge kind={d.category} />
                  </td>
                  <td className="border-b border-slate-100 px-4 py-2 text-slate-600">{d.when}</td>
                  <td className="border-b border-slate-100 px-4 py-2 text-slate-500">{d.scenario.split(".")[0]}.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-2 lg:hidden">
          {diagramGuide.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setActive(d.id);
                document.getElementById("diagrama-detalhe")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left active:scale-[0.99]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-800">{d.title}</span>
                <CategoryBadge kind={d.category} />
              </div>
              <p className="mt-1 text-sm text-slate-600">{d.when}</p>
            </button>
          ))}
        </div>
      </section>

      <section id="diagrama-detalhe">
        <h2 className="section-title">Explore cada diagrama</h2>
        <div className="soft-scroll mt-4 flex gap-1 overflow-x-auto pb-1">
          {diagramGuide.map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition active:scale-95 ${
                active === d.id
                  ? "bg-brand-600 text-white shadow-soft"
                  : "border border-slate-200 bg-white text-slate-600 hover:text-brand-700"
              }`}
            >
              <Icon icon={categoryIcon[d.category]} width={15} />
              {d.title}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          <div>
            <Mermaid code={current.code} caption={`${current.title} · ${categories[current.category].label}`} />
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <CategoryBadge kind={current.category} />
              <h3 className="mt-2 text-xl font-bold text-slate-900">{current.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{current.objective}</p>
            </div>

            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
              <h4 className="flex items-center gap-1.5 text-sm font-bold text-brand-800">
                <Icon icon="mdi:target" width={16} />
                Quando usar
              </h4>
              <p className="mt-1 text-sm text-slate-700">{current.when}</p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <h4 className="flex items-center gap-1.5 text-sm font-bold text-amber-900">
                <Icon icon="mdi:lightbulb-on-outline" width={16} />
                Cenário de exemplo
              </h4>
              <p className="mt-1 text-sm text-amber-900/90">{current.scenario}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h4 className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                <Icon icon="mdi:format-list-bulleted" width={16} />
                Elementos do diagrama
              </h4>
              <ul className="mt-2 space-y-1.5">
                {current.elements.map((el, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <Icon icon="mdi:chevron-right" width={16} className="mt-0.5 shrink-0 text-brand-500" />
                    <span>
                      <Rich>{el}</Rich>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="card flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Qual diagrama usar?</h2>
            <p className="mt-1 text-sm text-slate-600">
              4 questões no formato de prova: leia o cenário e escolha o diagrama certo.
            </p>
          </div>
          <button
            onClick={() => setShowQuiz((v) => !v)}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 active:scale-95"
          >
            <Icon icon={showQuiz ? "mdi:eye-off-outline" : "mdi:play-outline"} width={17} />
            {showQuiz ? "Esconder questões" : "Começar"}
          </button>
        </div>
        {showQuiz && (
          <div className="mt-4">
            <MCQ questions={diagramQuiz} />
          </div>
        )}
      </section>
    </div>
  );
}
