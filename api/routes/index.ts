import { Hono } from "hono";
import * as controller from "../controllers/";

const animeList = new Hono().basePath("/anime-list");
animeList.get("/", controller.getAnimeList);

const getAnime = new Hono().basePath("/anime");
getAnime.get("/", controller.getAnime);

export { animeList, getAnime };
