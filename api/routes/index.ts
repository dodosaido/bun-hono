import { Hono } from "hono";
import {
    getAnimeController,
    getAnimeListController,
    getCategoryController,
} from "../controllers/index.js";

const animeList = new Hono().basePath("/anime-list");
animeList.get("/", getAnimeListController);

const getAnime = new Hono().basePath("/anime");
getAnime.get("/", getAnimeController);

const getCategory = new Hono().basePath("/category");
getCategory.get("/", getCategoryController);

export { animeList, getAnime, getCategory };
