import { useFavoriteAnimeStore } from "../stores/favoriteAnimeStore";

export function BorderFavorite({ slug }: { slug: string | null }) {
    const allFavorite = useFavoriteAnimeStore((s) => s.favorites);
    const isFav = allFavorite.some((fav) => {
        const slugWithEps = slug
            ? slug
                  ?.replace(/^\/\d{4}\/\d{2}\//, "")
                  .replace(/-episode-\d+.*$/i, "")
            : null;
        const slugWithSeason = slug
            ? slug
                  ?.replace(/^\/\d{4}\/\d{2}\//, "")
                  .replace(/-season-\d+.*$/i, "")
            : null;
        const fixSlug = slug?.includes("season") ? slugWithSeason : slugWithEps;

        return fav.url.includes(fixSlug!);
    });

    if (!isFav) return null;

    return (
        <span className="bg-rose-400 absolute bottom-0 left-0 w-52 h-0.5"></span>
    );
}
