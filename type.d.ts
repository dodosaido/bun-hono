export {};

declare global {
    interface Anime {
        title: string;
        imgURL: string | null;
        slug: string | null;
    }
}
