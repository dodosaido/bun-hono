import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteAnime = {
    title: string;
    url: string;
};

type FavoriteAnimeStore = {
    favorites: FavoriteAnime[];
    isFavorite: (url: string) => boolean;
    addFavorite: (anime: FavoriteAnime) => void;
    removeFavorite: (url: string) => void;
    clearFavorites: () => void;
};

export const useFavoriteAnimeStore = create<FavoriteAnimeStore>()(
    persist(
        (set, get) => ({
            favorites: [],

            isFavorite: (url) => get().favorites.some((f) => f.url === url),

            addFavorite: (anime) => {
                if (get().isFavorite(anime.url)) return;

                set((state) => ({
                    favorites: [...state.favorites, anime],
                }));
            },

            removeFavorite: (url) =>
                set((state) => ({
                    favorites: state.favorites.filter((f) => f.url !== url),
                })),

            // clearFavorites: () => set({ favorites: [] }),
            clearFavorites: () => {
                useFavoriteAnimeStore.persist.clearStorage();
                set({ favorites: [] });
            },
        }),
        {
            name: "favorite-anime",
        },
    ),
);
