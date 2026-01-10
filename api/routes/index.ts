import { Hono } from "hono";
import {
  getAnimeController,
  getAnimeListController,
  getAllEpsController,
} from "../controllers/index.js";

const animeList = new Hono().basePath("/anime-list");
animeList.get("/", getAnimeListController);

const getAnime = new Hono().basePath("/anime");
getAnime.get("/", getAnimeController);

const getAllEps = new Hono().basePath("/eps");
getAllEps.get("/", getAllEpsController);

export { animeList, getAnime, getAllEps };
