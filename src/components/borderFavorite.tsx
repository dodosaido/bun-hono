import { useFavoriteAnimeStore } from "../stores/favoriteAnimeStore";

export function BorderFavorite({ slug }: { slug: string | null }) {
    const allFavorite = useFavoriteAnimeStore((s) => s.favorites);
    const isFav = allFavorite.some((fav) => slug?.includes(fav.url));
    if (!isFav) return null;

    return (
        <span className="bg-rose-400 absolute bottom-0 left-0 w-52 h-0.5"></span>
    );
}
