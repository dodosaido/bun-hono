import { Context } from "hono";
import { getAnimeListModel, getAnimeModel } from "../models/index.js";

export const getAnimeListController = async (c: Context) => {
    const data = await getAnimeListModel();

    return c.json(data);
};

export const getAnimeController = async (c: Context) => {
    const query = c.req.query("slug");
    const data = await getAnimeModel(query);

    if (!data) {
        return c.json({ error: "error cung!!!" }, 400);
    }

    return c.json(data);
};
