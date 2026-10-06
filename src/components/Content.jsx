import { Icon } from "@iconify/react";
import Mermaid from "./Mermaid.jsx";
import Rich from "./Rich.jsx";

const calloutStyle = {
  info: "border-brand-200 bg-brand-50 text-brand-900",
  tip: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warn: "border-amber-200 bg-amber-50 text-amber-900",
  exam: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-900",
};

const calloutLabel = {
  info: "Conceito",
  tip: "Dica de prova",
  warn: "Atenção",
  exam: "Cai na prova",
};

const calloutIcon = {
  info: "mdi:lightbulb-on-outline",
  tip: "mdi:check-decagram-outline",
  warn: "mdi:alert-outline",
  exam: "mdi:target",
};

export function Block({ block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 border-b border-slate-200 pb-2 text-2xl font-bold text-slate-900">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-6 text-lg font-semibold text-brand-700">{block.text}</h3>;
    case "p":
      return (
        <p className="my-3 leading-relaxed text-slate-700">
          <Rich>{block.text}</Rich>
        </p>
      );
    case "ul":
      return (
        <ul className="my-3 list-disc space-y-1.5 pl-6 text-slate-700">
          {block.items.map((it, i) => (
            <li key={i}>
              <Rich>{it}</Rich>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="my-3 list-decimal space-y-1.5 pl-6 text-slate-700">
          {block.items.map((it, i) => (
            <li key={i}>
              <Rich>{it}</Rich>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="my-4 overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100">
                {block.headers.map((h, i) => (
                  <th key={i} className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-800">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className={r % 2 ? "bg-slate-50" : "bg-white"}>
                  {row.map((cell, c) => (
                    <td key={c} className="border-b border-slate-100 px-3 py-2 align-top text-slate-700">
                      <Rich>{cell}</Rich>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <div className={`my-4 rounded-r-xl border-l-4 p-4 ${calloutStyle[block.variant] ?? calloutStyle.info}`}>
          <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide opacity-80">
            <Icon icon={calloutIcon[block.variant] ?? calloutIcon.info} width={15} />
            {block.title ?? calloutLabel[block.variant] ?? "Nota"}
          </p>
          {block.text && <p className="leading-relaxed"><Rich>{block.text}</Rich></p>}
          {block.items && (
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {block.items.map((it, i) => (
                <li key={i}>
                  <Rich>{it}</Rich>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    case "mermaid":
      return <Mermaid code={block.code} caption={block.caption} />;
    case "keyvals":
      return (
        <dl className="my-4 grid gap-3 sm:grid-cols-2">
          {block.items.map((it, i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-white p-3">
              <dt className="text-sm font-bold text-brand-700">{it.k}</dt>
              <dd className="mt-1 text-sm text-slate-600">
                <Rich>{it.v}</Rich>
              </dd>
            </div>
          ))}
        </dl>
      );
    default:
      return null;
  }
}

export default function Content({ blocks }) {
  return (
    <div className="prose-es max-w-none">
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}
