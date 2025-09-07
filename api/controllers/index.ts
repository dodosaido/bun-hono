import { Context } from "hono";
import * as model from "../models/index";

export const getAnimeList = async (c: Context) => {
    const data = await model.getAnimeList();

    return c.json(data);
};

export const getAnime = (c: Context) => {
    return c.json({ message: "anime detail" });
};
