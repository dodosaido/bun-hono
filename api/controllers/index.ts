import { Context } from "hono";
import {
  getAllEpisode,
  getAnimeListModel,
  getAnimeModel,
} from "../models/index.js";

export const getAnimeListController = async (c: Context) => {
  const page = c.req.query("page");
  const data = await getAnimeListModel(page);

  if (!data) {
    return c.json({ error: "error cung!!!" }, 400);
  }

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

export const getAllEpsController = async (c: Context) => {
  let query = c.req.query("c");

  const data = await getAllEpisode(query);
  if (!data || (!data.desc && !data.title && data.eps.length === 0)) {
    return c.json({ error: "error cung!!!" }, 400);
  }
  return c.json(data);
};
