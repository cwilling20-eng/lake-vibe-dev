import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "./App";
import { PAGES, renderHeadTags } from "./lib/seo";

// Build-time only (see scripts/prerender.mjs). Renders a route to static HTML
// so every page ships fully-formed content and <head> metadata to crawlers
// that don't execute JavaScript. The client bundle then takes over as usual.
//
// renderToPipeableStream + onAllReady (rather than renderToString) so the
// React.lazy() route chunks resolve before HTML is emitted — otherwise every
// lazy page would prerender as the Suspense spinner.
export function render(url: string): Promise<{ html: string; head: string }> {
  return new Promise((resolvePromise, reject) => {
    const chunks: Buffer[] = [];
    const sink = new Writable({
      write(chunk, _enc, cb) {
        chunks.push(Buffer.from(chunk));
        cb();
      },
    });
    sink.on("finish", () =>
      resolvePromise({ html: Buffer.concat(chunks).toString("utf8"), head: renderHeadTags(url) }),
    );
    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>,
      {
        onAllReady() {
          stream.pipe(sink);
        },
        onError(err) {
          reject(err);
        },
      },
    );
  });
}

export const routes = PAGES.map((p) => ({ path: p.path, lastmod: p.dateModified }));
