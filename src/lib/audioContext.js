import { createContext, useContext } from "react";
import uml from "../../Por_que_todo_software_precisa_de_UML.m4a";
import caos from "../../Do_caos_ao_código_com_diagramas_UML.m4a";
import controle from "../../Controle_ou_adaptação_na_engenharia_de_software.m4a";
import xpTimebox from "../../XP,_Timebox_e_UML_sem_decoreba.m4a";
import bpmn from "../../BPMN_para_reembolso_de_despesas.m4a";

export const EPISODES = [
  {
    id: "uml",
    title: "Por que todo software precisa de UML",
    subtitle: "Modelagem e UML",
    duration: "28 min",
    moduleId: "modulo-1",
    src: uml,
  },
  {
    id: "caos",
    title: "Do caos ao código com diagramas UML",
    subtitle: "Modelagem e UML",
    duration: "19 min",
    moduleId: "modulo-1",
    src: caos,
  },
  {
    id: "controle",
    title: "Controle ou adaptação na engenharia de software",
    subtitle: "Métodos ágeis",
    duration: "18 min",
    moduleId: "modulo-3",
    src: controle,
  },
  {
    id: "xp-timebox",
    title: "XP, Timebox e UML sem decoreba",
    subtitle: "Métodos ágeis e UML",
    duration: "9 min",
    moduleId: "modulo-3",
    src: xpTimebox,
  },
  {
    id: "bpmn",
    title: "BPMN para reembolso de despesas",
    subtitle: "Processos de negócio",
    duration: "2 min",
    moduleId: "modulo-2",
    src: bpmn,
  },
];

export const AudioContext = createContext(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio deve ser usado dentro de AudioProvider");
  return ctx;
}
