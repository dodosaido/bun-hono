import { useFavoriteAnimeStore } from "../stores/favoriteAnimeStore";

import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/favorites")({
    component: About,
});

function About() {
    const listFav = useFavoriteAnimeStore((s) => s.favorites);
    const removeAll = useFavoriteAnimeStore((s) => s.clearFavorites);

    if (listFav.length === 0) return <div>Oops tidak ada favorite</div>;

    return (
        <div className="p-2">
            <ul className="mb-8 *:link *:link-hover font-mono">
                {listFav.map((a) => (
                    <li key={a.url}>
                        <span className="tracking-[-4px] text-gray-400">
                            {">>"}
                        </span>{" "}
                        <Link to="/eps/$eps" params={{ eps: a.url }}>
                            {a.title}
                        </Link>
                    </li>
                ))}
            </ul>

            <button
                className="btn btn-sm btn-active btn-error"
                onClick={() => removeAll()}
            >
                Remove All Favorites
            </button>
        </div>
    );
}
