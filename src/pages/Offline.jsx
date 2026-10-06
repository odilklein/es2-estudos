import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const platforms = [
  {
    icon: "mdi:android",
    title: "Android (Chrome, Edge)",
    steps: [
      "Abra o menu do navegador, nos três pontos no canto superior.",
      "Toque em \"Instalar app\" ou \"Adicionar à tela inicial\".",
      "Confirme. O ícone do ES2 aparece junto dos seus apps.",
    ],
  },
  {
    icon: "mdi:apple",
    title: "iPhone e iPad (Safari)",
    steps: [
      "Toque no botão Compartilhar, o quadrado com a seta para cima.",
      "Escolha \"Adicionar à Tela de Início\".",
      "Confirme em \"Adicionar\".",
    ],
  },
  {
    icon: "mdi:laptop",
    title: "Computador (Chrome, Edge)",
    steps: [
      "Clique no ícone de instalação na barra de endereços, quando aparecer.",
      "Ou abra o menu do navegador e escolha \"Instalar app\".",
      "O ES2 abre em uma janela própria, como um programa.",
    ],
  },
];

export default function Offline() {
  return (
    <div className="space-y-8">
      <header>
        <p className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-600">
          <Icon icon="mdi:wifi-off" width={18} />
          Modo offline
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Estudar sem internet
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
          O site é um aplicativo web instalável (PWA). No primeiro acesso com internet ele
          guarda o conteúdo no seu aparelho e, a partir daí, funciona sem conexão.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="card">
          <h2 className="flex items-center gap-2 font-bold text-slate-900">
            <Icon icon="mdi:check-circle-outline" width={18} className="text-brand-500" />
            O que fica disponível offline
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {[
              "Teoria, resumos e o banco de questões dos três módulos.",
              "O guia de diagramas com todos os gráficos Mermaid.",
              "O simulado, que roda inteiro no navegador.",
              "O podcast, depois de tocado uma vez com internet.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <Icon icon="mdi:chevron-right" width={16} className="mt-0.5 shrink-0 text-brand-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="flex items-center gap-2 font-bold text-slate-900">
            <Icon icon="mdi:information-outline" width={18} className="text-brand-500" />
            Como funciona
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {[
              "No primeiro acesso, o app baixa o conteúdo e o guarda em cache.",
              "O áudio do podcast é baixado na primeira reprodução, para economizar dados.",
              "Quando você publica uma versão nova, o app atualiza sozinho no próximo acesso.",
              "O funcionamento offline é garantido enquanto o cache não for apagado.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <Icon icon="mdi:chevron-right" width={16} className="mt-0.5 shrink-0 text-brand-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="section-title">Como instalar no seu aparelho</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {platforms.map((p) => (
            <div key={p.title} className="card">
              <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                <Icon icon={p.icon} width={20} className="text-brand-600" />
                {p.title}
              </h3>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-700">
                {p.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Dica: instale antes da prova, com internet, e faça um teste abrindo no modo avião.
        </p>
        <Link
          to="/"
          className="flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 active:scale-95"
        >
          <Icon icon="mdi:arrow-left" width={16} />
          Voltar ao início
        </Link>
      </section>
    </div>
  );
}
