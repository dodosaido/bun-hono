import { Hono } from "hono";
import {
  getAnimeController,
  getAnimeListController,
  getAllEpsController,
} from "../controllers/index.js";

const getAnimeList = new Hono().basePath("/anime-list");
getAnimeList.get("/", getAnimeListController);

const getAnime = new Hono().basePath("/anime");
getAnime.get("/", getAnimeController);

const getAllEps = new Hono().basePath("/eps");
getAllEps.get("/", getAllEpsController);

export { getAnimeList, getAnime, getAllEps };
