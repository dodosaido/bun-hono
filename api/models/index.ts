import axios from "axios";
import * as cheerio from "cheerio";
import type { Anime } from "../../type.d.ts";

// /*
// ===================
//  MODELS
// ===================
// */
// interface Anime {
//     title: string;
//     imgURL: string | null;
//     slug: string | null;
// }

/*
===================
 FETCH
===================
*/
export const ANOBOY_URL = "https://ww3.anoboy.app";

const fetchURL = async () => {
    const html_raw = await axios.get(ANOBOY_URL, {
        responseType: "text",
        validateStatus: () => true,
    });

    if (html_raw.status !== 200) {
        console.log(`gagal scraping, (${html_raw.status})`);
    }

    return html_raw.data;
};

/*
===================
 GET ANIME LIST
===================
*/
export async function getAnimeListModel(): Promise<Anime[]> {
    const animelist: Anime[] = [];

    const html_raw = await fetchURL();
    const $ = cheerio.load(html_raw);

    const LIST = $("div.home_index > a[rel=bookmark]");
    for (const el of LIST) {
        const title = $(el).find("h3").text().trim();
        let imgURL = $(el).find("amp-img").attr("src") || null;
        imgURL = imgURL ? ANOBOY_URL + imgURL : null;
        const slug =
            $(el).attr("href")?.replace(ANOBOY_URL, "").slice(0, -1) || null;

        if (title.includes("Download")) continue;

        animelist.push({ title, imgURL, slug });
    }

    // const pagelist: Pagelist[] = [];
    // $("div[role=navigation]")
    //     .children(":not(:first-child)")
    //     .each((_, el) => {
    //         const prev_or_next = $(el).attr("rel") || null;
    //         const home = $(el).attr("class") || null;
    //         const text = $(el).text().trim();
    //         let url = $(el).attr("href") || null;
    //         url = url ? new URL(url).pathname : null;
    //
    //         if (home === "first") {
    //             pagelist.push({ url, desc: "Home" });
    //             return;
    //         }
    //
    //         if (prev_or_next === "prev") {
    //             pagelist.push({ url, desc: "Prev" });
    //             return;
    //         }
    //
    //         if (prev_or_next === "next") {
    //             pagelist.push({ url, desc: "Next" });
    //             return;
    //         }
    //
    //         pagelist.push({ url, desc: text });
    //     });

    return animelist;
}

/*
===================
 GET ANIME
===================
*/
// export async function anime(path: string = ""): Promise<Anime> {
//     const html_raw = await fetchURL({ anime: path });
//     const $ = cheerio.load(html_raw);
//
//     const title = $("div.pagetitle > h1").text().trim();
//     let imgURL = $("div.unduhan amp-img").attr("src") || null;
//     imgURL = imgURL ? anoboy_URL + imgURL : null;
//
//     const download: { url: string | null; desc: string }[] = [];
//     $("div.download a[href*='gofile']").each((_, el) => {
//         const text = $(el).text().trim();
//         const url = $(el).attr("href") || null;
//
//         if (text.includes("1K") || text.includes("720P")) {
//             download.push({ url, desc: text });
//         }
//     });
//
//     const webp = await convertImagesToWebP(imgURL);
//
//     // WATCH LATER
//     const saveToWatchLater: { titleToSave: string; urlToSave: string | null } =
//         {
//             titleToSave: "",
//             urlToSave: "",
//         };
//     saveToWatchLater.titleToSave = $("div.breadcrumb a[href*='category']")
//         .text()
//         .trim();
//     saveToWatchLater.urlToSave =
//         $("div.breadcrumb a[href*='category']")
//             .attr("href")
//             ?.replace(anoboy_URL, "")
//             .slice(0, -1) || null;
//
//     return { title, imgURL, download, webp, eps: saveToWatchLater } as Anime;
// }
//
// /*
// ===================
//  CATEGORY
// ===================
// */
// export async function category(path: string = "") {
//     const html_raw = await fetchURL({ category: path });
//     const $ = cheerio.load(html_raw);
//
//     const title = $("div.pagetitle h1").text().trim();
//     const desc = $("div.contentdeks").text().trim();
//
//     const eps: { title: string; url: string | null }[] = [];
//     $("div.column-content > a").each((_, el) => {
//         const title = $(el).find("h3").text().trim();
//         const url =
//             $(el).attr("href")?.replace(anoboy_URL, "").slice(0, -1) || null;
//
//         eps.push({ title, url });
//     });
//
//     return { title, desc, eps };
// }
