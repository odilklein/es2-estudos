import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAudio } from "../lib/audioContext.js";

const DISMISS_KEY = "es2-offline-notice-dismissed";

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    window.navigator.standalone === true
  );
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const iPadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  return /iPhone|iPad|iPod/i.test(ua) || iPadOS;
}

export function OfflineBadge() {
  const [online, setOnline] = useState(
    typeof navigator === "undefined" ? true : navigator.onLine
  );
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  if (online) return null;
  return (
    <span className="flex items-center gap-1 rounded-lg bg-amber-100 px-2 py-1 text-[11px] font-bold text-amber-800">
      <Icon icon="mdi:wifi-off" width={14} />
      Offline
    </span>
  );
}

export default function PwaNotice() {
  const { active, collapsed } = useAudio();
  const [visible, setVisible] = useState(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return false;
    } catch {
      /* localStorage indisponível */
    }
    return !isStandalone();
  });
  const [prompt, setPrompt] = useState(null);
  const [help, setHelp] = useState(false);
  const [ios] = useState(isIOS);

  useEffect(() => {
    function onPrompt(e) {
      e.preventDefault();
      setPrompt(e);
    }
    function onInstalled() {
      setVisible(false);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignora */
    }
  }

  async function install() {
    if (!prompt) {
      setHelp((h) => !h);
      return;
    }
    prompt.prompt();
    const choice = await prompt.userChoice;
    if (choice?.outcome === "accepted") setVisible(false);
    setPrompt(null);
  }

  if (!visible) return null;

  const bottomRem = active ? (collapsed ? 5.5 : 14) : 0.75;

  return (
    <div
      className="pointer-events-none fixed inset-x-3 z-40 flex justify-end sm:inset-x-auto sm:right-5"
      style={{ bottom: `calc(env(safe-area-inset-bottom, 0px) + ${bottomRem}rem)` }}
    >
      <div className="pointer-events-auto w-full max-w-md animate-slide-up rounded-2xl border border-brand-200 bg-white p-3.5 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Icon icon="mdi:download-circle-outline" width={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900">Estude sem internet</p>
            <p className="mt-0.5 text-xs text-slate-600">
              Instale na tela inicial para abrir como app, com diagramas e podcast offline.
            </p>
          </div>
          <button
            onClick={dismiss}
            aria-label="Fechar aviso"
            className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 active:scale-95"
          >
            <Icon icon="mdi:close" width={18} />
          </button>
        </div>

        {help && (
          <div className="mt-2 max-h-48 overflow-y-auto rounded-xl border border-brand-200 bg-brand-50 p-3 text-xs text-slate-700">
            {ios ? (
              <>
                <p className="font-semibold text-slate-800">No iPhone ou iPad (Safari)</p>
                <ol className="mt-1 list-decimal space-y-1 pl-4">
                  <li>Toque em Compartilhar (quadrado com seta para cima).</li>
                  <li>Escolha "Adicionar à Tela de Início".</li>
                  <li>Confirme em "Adicionar".</li>
                </ol>
              </>
            ) : (
              <>
                <p className="font-semibold text-slate-800">No Android ou desktop (Chrome, Edge)</p>
                <ol className="mt-1 list-decimal space-y-1 pl-4">
                  <li>Abra o menu do navegador (três pontos).</li>
                  <li>Escolha "Instalar app" ou "Adicionar à tela inicial".</li>
                  <li>Confirme a instalação.</li>
                </ol>
              </>
            )}
          </div>
        )}

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <button
            onClick={install}
            className={
              prompt
                ? "flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700 active:scale-95"
                : "flex items-center gap-1.5 rounded-lg border border-brand-300 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 active:scale-95"
            }
          >
            <Icon
              icon={prompt ? "mdi:cellphone-arrow-down" : help ? "mdi:chevron-down" : "mdi:help-circle-outline"}
              width={15}
            />
            {prompt ? "Instalar app" : help ? "Ocultar instruções" : "Como instalar"}
          </button>
          <Link
            to="/offline"
            onClick={dismiss}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-brand-700 hover:underline"
          >
            <Icon icon="mdi:information-outline" width={15} />
            Saiba mais
          </Link>
        </div>
      </div>
    </div>
  );
}
