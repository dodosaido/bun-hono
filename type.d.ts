export interface AnimeList {
    title: string;
    imgURL: string | null;
    slug: string | null;
}

export interface Anime {
    title: string;
    imgURL: string | null;
    download: { url: string | null; desc: string }[];
}
