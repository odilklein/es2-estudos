import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { addCollection } from "@iconify/react";
import { mdiOffline } from "./data/icons.js";
import "./index.css";
import App from "./App.jsx";

addCollection(mdiOffline);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
