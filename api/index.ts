import { Hono } from "hono";
import { handle } from "hono/vercel";
import { animeList, getAnime } from "./routes/index.js";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
    return c.json({ message: "angel... angel..." });
});

app.route("/", animeList);
app.route("/", getAnime);

// Export default untuk dev (bun run api:dev)
export default app;

// Export handler untuk Vercel
const handler = handle(app);
export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
