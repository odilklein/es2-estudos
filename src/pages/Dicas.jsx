import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { modules, examTips } from "../data/modules.js";
import Rich from "../components/Rich.jsx";

const quickRef = [
  ["UML", "M1", "Linguagem visual de modelagem — não é linguagem de programação."],
  ["3 diagramas-base", "M1", "Casos de Uso (externo), Classes (estático), Sequência (dinâmico)."],
  ["«include»", "M1", "Execução obrigatória (base → incluído)."],
  ["«extend»", "M1", "Execução opcional/condicional (extensão → base)."],
  ["Agregação ◇", "M1", "Todo-parte fraco; a parte sobrevive. Ex.: Funcionário–Endereço."],
  ["Composição ◆", "M1", "Todo-parte forte; a parte morre com o todo. Ex.: Conta–Titular."],
  ["`+` / `#` / `-`", "M1", "Público / protegido / privado."],
  ["Análise gramatical", "M1", "Substantivo → classe/atributo; verbo → método; adjetivo → tipo."],
  ["Multiplicidade", "M1", "`1`, `0..1`, `1..*`, `0..*`, `m..n`."],
  ["Pool / Lane", "M2", "Processo-organização / papel-departamento."],
  ["Gateway X", "M2", "Exclusivo: apenas um caminho."],
  ["Gateway O", "M2", "Inclusivo: um ou mais (e/ou)."],
  ["Gateway +", "M2", "Paralelo: todos os caminhos."],
  ["MoSCoW", "M3", "Must / Should / Could / Won't have (DSDM)."],
  ["WIP", "M3", "Limite de trabalho em andamento (Kanban, fluxo pull)."],
  ["TDD / Par / CI", "M3", "Práticas do XP (Kent Beck)."],
  ["CAS + limite do caos", "M3", "Base teórica do ASD (Highsmith e Bayer)."],
  ["Especular-Colaborar-Aprender", "M3", "Ciclo tríplice do ASD."],
];

const moduleColors = {
  M1: "bg-brand-100 text-brand-700",
  M2: "bg-emerald-100 text-emerald-700",
  M3: "bg-amber-100 text-amber-700",
};

export default function Dicas() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <header>
        <p className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-600">
          <Icon icon="mdi:lightbulb-on-outline" width={18} />
          Dicas
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Dicas de prova e cola rápida
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
          Estratégias de resolução e uma tabela de referência cruzada para a última revisão antes
          da prova.
        </p>
      </header>

      <section>
        <h2 className="section-title">Estratégia</h2>
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

      <section>
        <h2 className="section-title">Cola rápida</h2>
        <div className="soft-scroll mt-4 space-y-2 sm:space-y-0">
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white sm:block">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">Conceito</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">Módulo</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">Resumo</th>
                </tr>
              </thead>
              <tbody>
                {quickRef.map((row, i) => (
                  <tr key={i} className={i % 2 ? "bg-slate-50" : "bg-white"}>
                    <td className="border-b border-slate-100 px-4 py-2 font-medium text-slate-800">
                      <Rich>{row[0]}</Rich>
                    </td>
                    <td className="border-b border-slate-100 px-4 py-2">
                      <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${moduleColors[row[1]]}`}>
                        {row[1]}
                      </span>
                    </td>
                    <td className="border-b border-slate-100 px-4 py-2 text-slate-600">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: cards instead of a wide table */}
          <div className="space-y-2 sm:hidden">
            {quickRef.map((row, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-800">
                    <Rich>{row[0]}</Rich>
                  </span>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${moduleColors[row[1]]}`}>
                    {row[1]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{row[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">Ir para os módulos</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {modules.map((m) => (
            <Link key={m.id} to={`/${m.id}`} className="card flex items-center gap-3 hover:border-brand-300 hover:shadow-soft">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon icon={m.icon} width={22} />
              </span>
              <span className="font-bold text-slate-900">{m.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
