import { Hono } from "hono";
import path from "node:path";
import { Eta } from "eta";

const eta = new Eta({
    // Views directory path
    views: path.join(__dirname, "../views"), // on Deno : `${Deno.cwd()}/views/`

    // Any other option...
    cache: true,
});

const app = new Hono();

app.get("/", (c) => {
    const html = eta.render("index", { test: "Hello Eta" });
    return c.html(html);
});

export default app;
