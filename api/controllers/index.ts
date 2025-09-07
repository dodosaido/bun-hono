import { Context } from "hono";
import { getAnimeListModel } from "../models/index";

export const getAnimeListController = async (c: Context) => {
    const data = await getAnimeListModel();

    return c.json(data);
};

export const getAnimeController = (c: Context) => {
    return c.json({ message: "anime detail" });
};
