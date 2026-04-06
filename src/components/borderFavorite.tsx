import { useFavoriteAnimeStore } from "../stores/favoriteAnimeStore";
import iconFavorite from "../assets/favorite_icon.png";

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
        <div className="w-4 h-4">
            <img src={iconFavorite} alt="favorite icon" />
        </div>
    );
}
