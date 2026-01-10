import axios from "axios";
import * as cheerio from "cheerio";
import type { AnimeList, Anime, Pagelist, Eps } from "../../types.d.ts";

/*
===================
 FETCH
===================
*/
export const ANOBOY_URL = "https://ww1.anoboy.boo";

interface Fetch {
    slug?: string;
}

const fetchURL = async ({ slug }: Fetch = {}) => {
    let fullURL = ANOBOY_URL;

    if (slug) {
        fullURL += slug;
    }

    const html_raw = await axios.get(fullURL, {
        responseType: "text",
        validateStatus: () => true,
    });

    if (html_raw.status !== 200) {
        console.log(`gagal scraping, (${html_raw.status})`);
        throw new Error("gagal scraping");
    }

    return html_raw.data;
};

// hapus / pada route pagination
function trimSlash(path: string | null) {
    if (path === "/" || path === null) return path; // khusus root, jangan diubah
    return path.replace(/\/$/, ""); // hapus slash terakhir
}

/*
===================
 GET ANIME LIST
===================
*/
export async function getAnimeListModel(
    page: string = "",
): Promise<{ data: AnimeList[]; pages: Pagelist[] }> {
    const animelist: AnimeList[] = [];

    const html_raw = await fetchURL({ slug: page });
    const $ = cheerio.load(html_raw);

    const LIST = $("div.home_index > a[rel=bookmark]");
    for (const el of LIST) {
        const title = $(el).find("h3").text().trim();
        let imgURL = $(el).find(".amv img").attr("src") || null;
        imgURL = imgURL ? ANOBOY_URL + imgURL : null;
        const slug =
            $(el).attr("href")?.replace(ANOBOY_URL, "").slice(0, -1) || null;

        if (!title.includes("Episode")) continue;

        animelist.push({ title, imgURL, slug });
    }

    const pagelist: Pagelist[] = [];
    $("div[role=navigation]")
        .children(":not(:first-child)")
        .each((_, el) => {
            const prev_or_next = $(el).attr("rel") || null;
            const home = $(el).attr("class") || null;
            const text = $(el).text().trim();
            let url = $(el).attr("href") || null;
            url = url ? new URL(url).pathname : null;
            url = trimSlash(url);

            if (home === "first") {
                pagelist.push({ url, desc: "Home" });
                return;
            }

            if (prev_or_next === "prev") {
                pagelist.push({ url, desc: "Prev" });
                return;
            }

            if (prev_or_next === "next") {
                pagelist.push({ url, desc: "Next" });
                return;
            }

            pagelist.push({ url, desc: text });
        });

    return { data: animelist, pages: pagelist };
}

/*
===================
 GET ANIME
===================
*/
export async function getAnimeModel(slug: string = ""): Promise<Anime | null> {
    try {
        if (!slug) throw new Error("slug tidak ada");

        const html_raw = await fetchURL({ slug: slug });
        const $ = cheerio.load(html_raw);

        const title = $("div.pagetitle > h1").text().trim();
        let imgURL = $("div.deskripsi .entry-content img").attr("src") || null;
        imgURL = imgURL ? ANOBOY_URL + imgURL : null;

        const download: { url: string | null; desc: string }[] = [];
        $("div.download a[href*='gofile']").each((_, el) => {
            const text = $(el).text().trim();
            const url = $(el).attr("href") || null;

            if (!url) return;

            if (text.includes("1K") || text.includes("720P")) {
                download.push({ url, desc: text });
            }
        });

        const desc = $("div.sisi > div.contentdeks").text().trim();

        const info: { th: string; td: string }[] = [];
        $("div.sisi > div.contenttable tr").each((_, el) => {
            const th = $(el).find("th").text().trim();
            const td = $(el).find("td").text().trim();

            if (th === "Semua Episode") {
                info.push({ th: "Judul", td });
                return;
            }

            info.push({ th, td });
        });

        // for bookmark
        // lokasi tag di web asli
        const tagOri = "div.breadcrumb > span > span:nth-child(2) a";
        const bookmark: {
            title: string;
            url: string | null;
        } = { title: "", url: null };
        bookmark.title = $(tagOri).text().trim();
        bookmark.url =
            $(tagOri).attr("href")?.replace(ANOBOY_URL, "").slice(0, -1) ||
            null;

        return { title, imgURL, download, desc, info, bookmark };
    } catch (e) {
        console.error(e);
        return null;
    }
}

/*
===================
ALL EPS
===================
*/
export async function getAllEpisode(ep: string = ""): Promise<Eps> {
    const html_raw = await fetchURL({ slug: ep });
    const $ = cheerio.load(html_raw);

    const title = $("div.pagetitle h1").text().trim();
    const desc = $("div.contentdeks").text().trim();

    const eps: { title: string; url: string | null }[] = [];
    $("div.column-content > a").each((_, el) => {
        const title = $(el).find("h3").text().trim();
        const url =
            $(el).attr("href")?.replace(ANOBOY_URL, "").slice(0, -1) || null;

        if (title.includes("[Download]")) return;

        eps.push({ title, url });
    });

    const pages: { url: string | null; title: string }[] = [];
    $("div[role='navigation']")
        .children(":not(:first-child)")
        .each((_, el) => {
            const title = $(el).text().trim();
            const url =
                $(el).attr("href")?.replace(ANOBOY_URL, "").slice(0, -1) ||
                null;

            // const urlConvert = url ? url.replace(/\//g, "_") : null;

            if ($(el).attr("aria-label") === "First Page") {
                pages.push({ url, title: "first" });
                return;
            }

            if ($(el).attr("rel") === "prev") {
                pages.push({ url, title: "prev" });
                return;
            }

            if ($(el).attr("rel") === "next") {
                pages.push({ url, title: "next" });
                return;
            }

            pages.push({ url, title });
        });

    return { title, desc, eps, pages };
}
