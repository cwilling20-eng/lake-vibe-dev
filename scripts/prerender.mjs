// Post-build prerender: dist/index.html (client shell) + dist-ssr/entry-server.js
// → one static HTML file per route with route-specific <head> tags and JSON-LD,
// plus sitemap.xml. Run by `npm run build` after both Vite builds.
//
// Vercel serves dist/<route>/index.html for /<route> before the SPA rewrite
// kicks in, so crawlers get real HTML; the React bundle still boots on top.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");
const DOMAIN = "https://elementsccl.com";

const template = readFileSync(resolve(dist, "index.html"), "utf8");
const { render, routes } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);

// Strip the shell's static SEO tags; each route injects its own.
const shell = template
  .replace(/^\s*<title>.*<\/title>\s*$/m, "")
  .replace(/^\s*<meta name="(description|keywords)"[^>]*>\s*$/gm, "")
  .replace(/^\s*<meta property="(og|article):[^>]*>\s*$/gm, "")
  .replace(/^\s*<meta name="twitter:[^>]*>\s*$/gm, "")
  .replace(/^\s*<link rel="canonical"[^>]*>\s*$/gm, "")
  .replace(/^\s*<!--[\s\S]*?-->\s*$/gm, "");

let written = 0;
for (const { path } of routes) {
  const { html, head } = await render(path);
  const page = shell
    .replace("</head>", `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const outFile = path === "/" ? resolve(dist, "index.html") : resolve(dist, path.slice(1), "index.html");
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, page);
  written++;
}

// sitemap.xml with lastmod from src/lib/seo.ts
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ path, lastmod }) => `  <url>
    <loc>${DOMAIN}${path === "/" ? "/" : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === "/events" ? "daily" : path === "/" || path === "/menu" || path === "/specials" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : path === "/menu" || path === "/events" || path === "/reservations" ? "0.9" : "0.7"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync(resolve(dist, "sitemap.xml"), sitemap);

if (existsSync(ssrDir)) rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: wrote ${written} routes + sitemap.xml`);
