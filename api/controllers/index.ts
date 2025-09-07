import { Context } from "hono";
import { getAnimeListModel } from "../models";

export const getAnimeList = async (c: Context) => {
    const data = await getAnimeListModel();

    return c.json(data);
};

export const getAnime = (c: Context) => {
    return c.json({ message: "anime detail" });
};
