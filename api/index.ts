import { Hono } from "hono";
import { handle } from "hono/vercel";
import { animeList, getAnime } from "./routes/index.js";
import { serveStatic } from "hono/bun";

const app = new Hono().basePath("/api");

// Middleware cek kalau akses via browser → redirect
app.use("/*", async (c, next) => {
    const accept = c.req.header("accept") || "";
    if (accept.includes("text/html")) {
        // Redirect ke home page
        return c.redirect("/notfound", 302);
    }
    await next();
});

app.get("/", (c) => {
    return c.json({ message: "angel... angel..." });
});

app.route("/", animeList);
app.route("/", getAnime);

app.use("/*", serveStatic({ root: "/dist" }));
app.use("/*", serveStatic({ root: "/dist", path: "index.html" }));

// Export default untuk dev (bun run api:dev)
export default app;

// Export handler untuk Vercel
const handler = handle(app);
export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
