import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Pages are pre-rendered at build time (scripts/prerender.mjs), so #root
// already contains HTML for crawlers. React takes over by rendering into it.
createRoot(document.getElementById("root")!).render(<App />);
