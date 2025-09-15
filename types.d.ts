export interface AnimeList {
    title: string;
    imgURL: string | null;
    slug: string | null;
}

export interface Anime {
    title: string;
    imgURL: string | null;
    download: { url: string | null; desc: string }[];
    info: { th: string; td: string }[];
    desc: string;
    bookmark: {
        title: string;
        url: string | null;
    };
}

export interface Pagelist {
    url: string | null;
    desc: string;
}

export interface Category {
    title: string;
    desc: string;
    eps: { title: string; url: string | null }[];
    pages: { url: string | null; title: string }[];
}
