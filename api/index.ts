import { Hono } from "hono";
import { handle } from "hono/vercel";
import { getAllEps, animeList, getAnime } from "./routes/index.js";

const app = new Hono().basePath("/api");

// Middleware cek kalau akses via browser → redirect
if (process.env.VERCEL_ENV !== "production") {
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

app.route("/", animeList);
app.route("/", getAnime);
app.route("/", getAllEps);

// Export default untuk dev (bun run api:dev)
export default app;

// Export handler untuk Vercel
const handler = handle(app);
export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
