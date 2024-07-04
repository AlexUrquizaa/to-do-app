import { createRoot } from "react-dom/client";
import App from "./src/app";
import './index.css';
import { FiltersProvider } from "./src/componentes/compsDeContexto/FilterContext";

const root = createRoot(document.getElementById('app'));
root.render(
  <FiltersProvider>
    <App />
  </FiltersProvider>
);