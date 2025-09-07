import { Hono } from "hono";
import {
    getAnimeController,
    getAnimeListController,
} from "../controllers/index.ts";

const animeList = new Hono().basePath("/anime-list");
animeList.get("/", getAnimeListController);

const getAnime = new Hono().basePath("/anime");
getAnime.get("/", getAnimeController);

export { animeList, getAnime };
