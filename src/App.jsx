import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ModulePage from "./pages/ModulePage.jsx";
import Dicas from "./pages/Dicas.jsx";
import Simulado from "./pages/Simulado.jsx";
import DiagramasGuia from "./pages/DiagramasGuia.jsx";
import Podcast from "./pages/Podcast.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dicas" element={<Dicas />} />
        <Route path="/simulado" element={<Simulado />} />
        <Route path="/diagramas" element={<DiagramasGuia />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/:id" element={<ModulePage />} />
      </Route>
    </Routes>
  );
}
