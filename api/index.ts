import { Hono } from "hono";
// import { handle } from "hono/vercel"; // Commented for Vercel
import { handle } from "hono/cloudflare-pages"; // For Cloudflare Pages
import { getAllEps, getAnimeList, getAnime } from "./routes/index.js";

const app = new Hono().basePath("/api");

// Middleware cek kalau akses via browser → redirect
// Vercel env: process.env.VERCEL_ENV
// Cloudflare env: process.env.CF_PAGES_ENV
const isProduction = process.env.VERCEL_ENV === "production" || process.env.CF_PAGES_ENV === "production";

if (!isProduction) {
    app.use("/*", async (c, next) => {
        const accept = c.req.header("accept") || "";
        if (accept.includes("text/html")) {
            // Redirect ke home page
            return c.redirect("/notfound", 302);
        }
        await next();
    });
}

app.get("/", (c) => {
    return c.json({ message: "angel... angel..." });
});

app.route("/", getAnimeList);
app.route("/", getAnime);
app.route("/", getAllEps);

// Export default untuk dev (bun run api:dev)
export default app;

// Export handler untuk Vercel (commented)
// const handler = handle(app);
// export const GET = handler;
// export const POST = handler;
// export const PATCH = handler;
// export const PUT = handler;
// export const OPTIONS = handler;

// Export handler untuk Cloudflare Pages
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const OPTIONS = handle(app);
