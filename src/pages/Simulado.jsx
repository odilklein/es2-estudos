import { useState } from "react";
import { Icon } from "@iconify/react";
import { modules } from "../data/modules.js";
import Rich from "../components/Rich.jsx";

const letters = ["A", "B", "C", "D", "E"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildBank() {
  return shuffle(
    modules.flatMap((m) => m.quiz.mcq.map((q) => ({ ...q, module: m.short })))
  ).slice(0, 12);
}

export default function Simulado() {
  const [bank, setBank] = useState(buildBank);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [round, setRound] = useState(0);

  const answeredCount = Object.keys(answers).length;
  const score = bank.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);
  const percent = Math.round((score / bank.length) * 100);

  function reset() {
    setAnswers({});
    setSubmitted(false);
    setBank(buildBank());
    setRound((r) => r + 1);
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-600">
          <Icon icon="mdi:clipboard-check-outline" width={18} />
          Simulado
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Simulado geral de ES2</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
          {bank.length} questões de múltipla escolha sorteadas dos três módulos. Responda tudo e
          toque em corrigir para ver o desempenho e o gabarito comentado.
        </p>
      </header>

      <div className="sticky top-[57px] z-20 -mx-4 border-y border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-600">
            Respondidas: {answeredCount}/{bank.length}
          </p>
          <div className="flex items-center gap-3">
            <div className="hidden h-2 w-32 overflow-hidden rounded-full bg-slate-200 sm:block sm:w-40">
              <div
                className="h-full bg-brand-500 transition-all"
                style={{ width: `${(answeredCount / bank.length) * 100}%` }}
              />
            </div>
            <button
              disabled={answeredCount === 0}
              onClick={() => setSubmitted(true)}
              className="flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
            >
              <Icon icon="mdi:check-all" width={17} />
              Corrigir
            </button>
          </div>
        </div>
      </div>

      {submitted && (
        <div
          key={round}
          className={`rounded-2xl p-6 text-white ${
            percent >= 70 ? "bg-emerald-600" : percent >= 50 ? "bg-amber-500" : "bg-red-500"
          }`}
        >
          <p className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide opacity-90">
            <Icon icon="mdi:chart-line" width={16} />
            Resultado
          </p>
          <p className="mt-1 text-4xl font-bold">
            {score}/{bank.length} · {percent}%
          </p>
          <p className="mt-2 text-sm opacity-90">
            {percent >= 70
              ? "Ótimo! Você está preparado. Revise apenas os erros."
              : percent >= 50
                ? "Quase lá. Reforce os módulos onde errou."
                : "Bora revisar a teoria e os resumos antes de tentar de novo."}
          </p>
          <button
            onClick={reset}
            className="mt-4 flex items-center gap-1.5 rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/30 active:scale-95"
          >
            <Icon icon="mdi:refresh" width={17} />
            Refazer com novas questões
          </button>
        </div>
      )}

      <div className="space-y-4">
        {bank.map((item, qi) => {
          const choice = answers[qi];
          const answered = choice !== undefined;
          return (
            <div key={`${round}-${qi}`} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
                  {qi + 1}
                </span>
                <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                  {item.module}
                </span>
              </div>
              <p className="font-medium text-slate-900">
                <Rich>{item.q}</Rich>
              </p>
              <div className="mt-3 space-y-2">
                {item.options.map((opt, oi) => {
                  const isCorrect = oi === item.answer;
                  const isPicked = choice === oi;
                  let cls = "flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition";
                  if (!submitted && !answered)
                    cls += " border-slate-200 hover:border-brand-400 hover:bg-brand-50 active:scale-[0.99]";
                  else if (submitted && isCorrect) cls += " border-emerald-300 bg-emerald-50";
                  else if (submitted && isPicked) cls += " border-red-300 bg-red-50";
                  else if (answered && isPicked) cls += " border-brand-300 bg-brand-50";
                  else cls += " border-slate-200 " + (submitted ? "opacity-60" : "");
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => !submitted && setAnswers((a) => ({ ...a, [qi]: oi }))}
                      className={cls}
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-xs font-bold">
                        {letters[oi]}
                      </span>
                      <span className="pt-0.5 text-slate-700">
                        <Rich>{opt}</Rich>
                      </span>
                      {submitted && isCorrect && (
                        <Icon icon="mdi:check-circle" width={20} className="ml-auto shrink-0 text-emerald-500" />
                      )}
                      {submitted && isPicked && !isCorrect && (
                        <Icon icon="mdi:close-circle" width={20} className="ml-auto shrink-0 text-red-400" />
                      )}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className="mt-3 flex gap-2 rounded-xl border-l-4 border-brand-300 bg-brand-50 p-3 text-sm text-slate-700">
                  <Icon icon="mdi:book-check-outline" width={18} className="mt-0.5 shrink-0 text-brand-600" />
                  <span>
                    <strong className="block text-brand-800">
                      Gabarito: {letters[item.answer]}
                      {choice === item.answer ? " · você acertou" : " · você errou"}
                    </strong>
                    <Rich>{item.explain}</Rich>
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <nav className="flex justify-end border-t border-slate-200 pt-6">
        <button
          onClick={() => {
            reset();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 active:scale-95"
        >
          <Icon icon="mdi:dice-multiple-outline" width={17} />
          Nova rodada
        </button>
      </nav>
    </div>
  );
}
