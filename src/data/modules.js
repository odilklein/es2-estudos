import { module1 } from "./module1.js";
import { module2 } from "./module2.js";
import { module3 } from "./module3.js";

export const modules = [module1, module2, module3];

export const examTips = [
  {
    title: "Leia o enunciado procurando palavras-chave",
    body: "“obrigatório/sempre” → include; “opcional/pode” → extend; “possui/contém” → associação; “é um/tipo de” → herança; “sem o todo não existe” → composição.",
  },
  {
    title: "Substantivos x verbos",
    body: "No diagrama de classes: substantivos viram classes/atributos e verbos viram métodos. Faça essa varredura do texto antes de desenhar.",
  },
  {
    title: "Gateways BPMN",
    body: "Exclusivo (X) escolhe um caminho; Inclusivo (O) um ou mais; Paralelo (+) todos. Decisões sempre têm saídas nomeadas.",
  },
  {
    title: "Memorize as siglas",
    body: "MoSCoW (DSDM), WIP/pull (Kanban), TDD/pair/refatoração/CI (XP), Especular-Colaborar-Aprender (ASD), cores do Crystal (Clear → Yellow → Orange → Red).",
  },
  {
    title: "Justifique sempre com exemplo",
    body: "Em discursivas, defina o conceito, diferencie do conceito vizinho e dê um exemplo concreto. É o que garante a pontuação.",
  },
];
