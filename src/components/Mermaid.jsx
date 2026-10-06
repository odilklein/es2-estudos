import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import mermaid from "mermaid";

let initialized = false;
let uid = 0;

function init() {
  if (initialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    securityLevel: "loose",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
    flowchart: { useMaxWidth: false, htmlLabels: true, curve: "basis" },
    class: { useMaxWidth: false },
    state: { useMaxWidth: false },
    sequence: { useMaxWidth: false },
    themeVariables: {
      primaryColor: "#eef5f4",
      primaryBorderColor: "#477e77",
      primaryTextColor: "#263c3a",
      lineColor: "#a49b8c",
      secondaryColor: "#eae7e0",
      tertiaryColor: "#ffffff",
      actorBkg: "#eef5f4",
      actorBorder: "#477e77",
      actorTextColor: "#263c3a",
      signalColor: "#4a443c",
      noteBkgColor: "#fdf7ec",
      noteBorderColor: "#c2852b",
      fontSize: "15px",
    },
  });
  initialized = true;
}

function useSvg(code) {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    init();
    let active = true;
    mermaid
      .render(`mermaid-${uid++}`, code)
      .then(({ svg }) => active && setSvg(svg))
      .catch((e) => active && setError(e?.message ?? String(e)));
    return () => {
      active = false;
    };
  }, [code]);
  return { svg, error };
}

function DiagramBody({ svg }) {
  return (
    <div className="diagram-viewport soft-scroll max-h-[60vh] rounded-lg bg-white p-3 sm:p-4">
      <div className="diagram-svg w-max mx-auto" dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}

export default function Mermaid({ code, caption }) {
  const { svg, error } = useSvg(code);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (error) {
    return (
      <div className="my-4 rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-semibold text-red-700">Erro ao renderizar diagrama</p>
        <pre className="mt-2 overflow-x-auto text-xs text-red-600">{error}</pre>
      </div>
    );
  }

  return (
    <>
      <figure className="my-5 rounded-2xl border border-slate-200 bg-slate-100/60 p-2 sm:p-4">
        <div className="relative">
          {svg && (
            <button
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setZoom(1);
                setOpen(true);
              }}
              aria-label="Ampliar diagrama"
              className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-lg border border-slate-200 bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-brand-700 shadow-soft backdrop-blur active:scale-95"
            >
              <Icon icon="mdi:arrow-expand-all" width={16} />
              <span className="hidden sm:inline">Ampliar</span>
            </button>
          )}
          <DiagramBody svg={svg} />
        </div>
        <figcaption className="mt-2 flex items-center gap-1.5 px-1 text-center text-xs text-slate-500 sm:text-sm">
          <Icon icon="mdi:gesture-swipe-horizontal" width={14} className="shrink-0" />
          <span>{caption ?? "Arraste para ver o diagrama e toque em ampliar."}</span>
        </figcaption>
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-slate-900/70 p-2 sm:p-6"
          onClick={() => {
            setOpen(false);
            lastFocus.current?.focus?.();
          }}
        >
          <div
            className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-3 py-2.5">
              <p className="flex-1 truncate text-sm font-semibold text-slate-800">
                {caption ?? "Diagrama"}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
                  aria-label="Diminuir zoom"
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 active:scale-95"
                >
                  <Icon icon="mdi:magnify-minus-outline" width={18} />
                </button>
                <button
                  onClick={() => setZoom(1)}
                  className="min-w-[3rem] rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-semibold text-slate-600"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  onClick={() => setZoom((z) => Math.min(4, +(z + 0.25).toFixed(2)))}
                  aria-label="Aumentar zoom"
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 active:scale-95"
                >
                  <Icon icon="mdi:magnify-plus-outline" width={18} />
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    lastFocus.current?.focus?.();
                  }}
                  aria-label="Fechar"
                  className="ml-1 rounded-lg bg-slate-800 p-2 text-white active:scale-95"
                >
                  <Icon icon="mdi:close" width={18} />
                </button>
              </div>
            </div>
            <div className="diagram-viewport soft-scroll flex-1 bg-slate-50 p-3">
              <div
                className="diagram-svg w-max"
                style={{ zoom, transformOrigin: "top left" }}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
