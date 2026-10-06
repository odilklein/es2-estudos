import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { modules } from "../data/modules.js";
import PwaNotice, { OfflineBadge } from "./PwaNotice.jsx";

const navBase =
  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition active:scale-[0.98]";
const navIdle = "text-slate-600 hover:bg-slate-100 hover:text-brand-700";
const navActive = "bg-brand-600 text-white shadow-soft";

function NavItem({ to, icon, children, onClick, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) => `${navBase} ${isActive ? navActive : navIdle}`}
    >
      {icon && <Icon icon={icon} width={19} className="shrink-0" />}
      <span className="truncate">{children}</span>
    </NavLink>
  );
}

function SidebarContent({ onNavigate }) {
  return (
    <nav className="flex h-full flex-col gap-1 overflow-y-auto p-3">
      <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
        Início
      </p>
      <NavItem to="/" end icon="mdi:home-variant-outline" onClick={onNavigate}>
        Página inicial
      </NavItem>
      <NavItem to="/diagramas" icon="mdi:chart-box-outline" onClick={onNavigate}>
        Guia de diagramas
      </NavItem>
      <NavItem to="/podcast" icon="mdi:headphones" onClick={onNavigate}>
        Podcast
      </NavItem>
      <NavItem to="/dicas" icon="mdi:lightbulb-on-outline" onClick={onNavigate}>
        Dicas de prova
      </NavItem>
      <NavItem to="/simulado" icon="mdi:clipboard-check-outline" onClick={onNavigate}>
        Simulado
      </NavItem>
      <NavItem to="/offline" icon="mdi:wifi-off" onClick={onNavigate}>
        Modo offline
      </NavItem>

      <p className="px-3 pb-1 pt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
        Módulos
      </p>
      {modules.map((m) => (
        <NavItem key={m.id} to={`/${m.id}`} icon={m.icon} onClick={onNavigate}>
          {m.short} · {m.title}
        </NavItem>
      ))}

      <div className="mt-auto flex items-start gap-2 rounded-xl bg-slate-100 p-3 text-xs text-slate-500">
        <Icon icon="mdi:information-outline" width={16} className="mt-0.5 shrink-0" />
        <span>
          Material de <strong className="text-slate-700">Engenharia de Software 2</strong>: teoria,
          resumos, diagramas e questões.
        </span>
      </div>
    </nav>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const close = () => setOpen(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 active:scale-95 lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            <Icon icon={open ? "mdi:close" : "mdi:menu"} width={22} />
          </button>
          <NavLink to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Icon icon="mdi:school-outline" width={22} />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-slate-900">Engenharia de Software 2</span>
              <span className="block text-[11px] text-slate-500">Plataforma de estudos</span>
            </span>
          </NavLink>
          <div className="ml-auto">
            <OfflineBadge />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-72 shrink-0 border-r border-slate-200 bg-white lg:block">
          <SidebarContent />
        </aside>

        {open && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <div className="absolute inset-0 bg-slate-900/30" onClick={close} />
            <div className="absolute left-0 top-[57px] h-[calc(100vh-57px)] w-[86%] max-w-xs border-r border-slate-200 bg-white shadow-soft">
              <SidebarContent onNavigate={close} />
            </div>
          </div>
        )}

        <main key={location.pathname} className="min-w-0 flex-1 px-4 py-5 sm:px-8 sm:py-8">
          <Outlet />
        </main>
      </div>

      <PwaNotice />
    </div>
  );
}
