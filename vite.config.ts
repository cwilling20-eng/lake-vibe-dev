import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Dev-only stand-in for the Vercel function at api/events.ts, so `npm run dev`
// serves /api/events without needing `vercel dev`. Production uses the real
// function; this plugin is never part of the build.
function devEventsApi(): Plugin {
  return {
    name: "elements-dev-events-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/events", async (_req, res) => {
        try {
          const mod = await server.ssrLoadModule("/src/lib/events/calendar.ts");
          const events = await mod.fetchCalendarEvents(new Date());
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.setHeader("Cache-Control", "no-store");
          res.end(
            JSON.stringify({
              events,
              updatedAt: new Date().toISOString(),
              source: "google-calendar",
            }),
          );
        } catch (err) {
          res.statusCode = 502;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify({ error: String(err) }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), devEventsApi()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
