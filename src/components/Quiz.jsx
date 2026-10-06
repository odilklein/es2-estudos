import { useState } from "react";
import { Icon } from "@iconify/react";
import Rich from "./Rich.jsx";

const letters = ["A", "B", "C", "D", "E"];

export function MCQ({ questions }) {
  const [picked, setPicked] = useState({});

  return (
    <div className="space-y-4">
      {questions.map((item, qi) => {
        const choice = picked[qi];
        const answered = choice !== undefined;
        return (
          <div key={qi} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <p className="font-medium text-slate-900">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white align-middle">
                {qi + 1}
              </span>
              <Rich>{item.q}</Rich>
            </p>
            <div className="mt-3 space-y-2">
              {item.options.map((opt, oi) => {
                const isCorrect = oi === item.answer;
                const isPicked = choice === oi;
                let cls = "flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition";
                if (!answered) cls += " border-slate-200 hover:border-brand-400 hover:bg-brand-50 active:scale-[0.99]";
                else if (isCorrect) cls += " border-emerald-300 bg-emerald-50";
                else if (isPicked) cls += " border-red-300 bg-red-50";
                else cls += " border-slate-200 opacity-60";
                return (
                  <button
                    key={oi}
                    disabled={answered}
                    onClick={() => setPicked((p) => ({ ...p, [qi]: oi }))}
                    className={cls}
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-xs font-bold">
                      {letters[oi]}
                    </span>
                    <span className="pt-0.5 text-slate-700">
                      <Rich>{opt}</Rich>
                    </span>
                    {answered && isCorrect && (
                      <Icon icon="mdi:check-circle" width={20} className="ml-auto shrink-0 text-emerald-500" />
                    )}
                    {answered && isPicked && !isCorrect && (
                      <Icon icon="mdi:close-circle" width={20} className="ml-auto shrink-0 text-red-400" />
                    )}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div
                className={`mt-3 flex gap-2 rounded-xl border-l-4 p-3 text-sm ${
                  choice === item.answer
                    ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                    : "border-red-400 bg-red-50 text-red-900"
                }`}
              >
                <Icon
                  icon={choice === item.answer ? "mdi:check-decagram" : "mdi:information-outline"}
                  width={18}
                  className="mt-0.5 shrink-0"
                />
                <span>
                  <strong className="block">
                    {choice === item.answer ? "Correto!" : `Incorreto — resposta: ${letters[item.answer]}`}
                  </strong>
                  <Rich>{item.explain}</Rich>
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DiscursiveItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <p className="font-medium text-slate-900">
        <span className="mr-2 inline-flex items-center gap-1 rounded-lg bg-slate-700 px-2 py-1 text-xs font-bold text-white align-middle">
          <Icon icon="mdi:text-box-edit-outline" width={14} />
          {index + 1}
        </span>
        <Rich>{item.q}</Rich>
      </p>
      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-3 flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-brand-700 active:scale-95"
      >
        <Icon icon={open ? "mdi:eye-off-outline" : "mdi:eye-outline"} width={17} />
        {open ? "Esconder resposta" : "Ver resposta esperada"}
      </button>
      {open && (
        <div className="mt-3 rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-slate-700">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
            <Icon icon="mdi:check-bold" width={14} />
            Resposta esperada
          </p>
          <Rich>{item.answer}</Rich>
          {item.topics && (
            <div className="mt-3">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Deve conter</p>
              <ul className="mt-1 space-y-1">
                {item.topics.map((t, i) => (
                  <li key={i} className="flex gap-2">
                    <Icon icon="mdi:checkbox-marked-circle-outline" width={16} className="mt-1 shrink-0 text-brand-500" />
                    <span>
                      <Rich>{t}</Rich>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Discursive({ questions }) {
  return (
    <div className="space-y-4">
      {questions.map((item, i) => (
        <DiscursiveItem key={i} item={item} index={i} />
      ))}
    </div>
  );
}

export default function QuizBank({ mcq, discursive }) {
  const [tab, setTab] = useState("mcq");
  const options = [
    { id: "mcq", label: "Múltipla escolha", icon: "mdi:format-list-checks", count: mcq.length },
    { id: "disc", label: "Discursivas", icon: "mdi:text-box-edit-outline", count: discursive.length },
  ];
  return (
    <div>
      <div className="soft-scroll mb-4 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => setTab(o.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition active:scale-95 ${
              tab === o.id ? "bg-brand-600 text-white" : "text-slate-600 hover:text-brand-700"
            }`}
          >
            <Icon icon={o.icon} width={17} />
            {o.label}
            <span className={`rounded-full px-1.5 text-xs ${tab === o.id ? "bg-white/20" : "bg-slate-100"}`}>
              {o.count}
            </span>
          </button>
        ))}
      </div>
      {tab === "mcq" ? <MCQ questions={mcq} /> : <Discursive questions={discursive} />}
    </div>
  );
}
