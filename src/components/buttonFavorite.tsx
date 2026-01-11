import { useFavoriteAnimeStore } from "../stores/favoriteAnimeStore";

interface Data {
    title: string;
    url: string | null;
}

export function ButtonFavorite({ data }: { data: Data }) {
    const addFavorite = useFavoriteAnimeStore((s) => s.addFavorite);
    const removeFavorite = useFavoriteAnimeStore((s) => s.removeFavorite);
    const isFavorite = useFavoriteAnimeStore((s) =>
        data.url ? s.isFavorite(data.url) : false,
    );

    const handleClick = () => {
        isFavorite && data.url
            ? removeFavorite(data.url)
            : addFavorite({ title: data.title, url: data.url || "" });
    };

    if (!data.url) {
        return null;
    }

    const bg = isFavorite ? "bg-rose-100" : "bg-sky-100";
    return (
        <button
            className={`btn btn-sm btn-outline ml-8 font-mono ${bg}`}
            onClick={handleClick}
        >
            {!isFavorite ? "🤍 Add to" : "❤️ Remove from"} Favorite
        </button>
    );
}
