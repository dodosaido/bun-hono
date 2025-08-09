import { Hono } from "hono";
import path from "node:path";
import { Eta } from "eta";

const eta = new Eta({
    // Views directory path
    views: path.join(__dirname, "../views"), // on Deno : `${Deno.cwd()}/views/`

    // Any other option...
    cache: true,
});

const app = new Hono().basePath("/api");

app.get("/", (c) => {
    return c.text("cok");
});

export default app;
