import { createContext, useContext } from "react";
import podcastUml from "../../Por_que_todo_software_precisa_de_UML.m4a";

export const TRACK = {
  id: "podcast-uml",
  src: podcastUml,
  title: "Por que todo software precisa de UML",
  subtitle: "Podcast · Engenharia de Software 2",
};

export const AudioContext = createContext(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio deve ser usado dentro de AudioProvider");
  return ctx;
}
