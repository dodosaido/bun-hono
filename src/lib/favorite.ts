// Definisikan struktur data untuk anime
// Ini membantu TypeScript tahu kalau setiap anime PASTI punya title dan link
interface Anime {
    title: string;
    url: string | null;
}

// Nama key untuk menyimpan data di LocalStorage.
const FAVORITES_KEY = "favoriteAnimes";

/**
 * Mengambil semua anime favorit dari LocalStorage.
 * @returns {Anime[]} Array berisi objek anime favorit.
 */
export function getFavorites(): Anime[] {
    const favoritesJSON = localStorage.getItem(FAVORITES_KEY);
    // Kalau belum ada data, kembalikan array kosong.
    // Kalau ada, ubah dari string JSON jadi array JavaScript.
    return favoritesJSON ? (JSON.parse(favoritesJSON) as Anime[]) : [];
}

/**
 * Menyimpan array anime favorit ke LocalStorage.
 * Fungsi ini akan menimpa data yang lama dengan yang baru.
 * @param {Anime[]} favorites - Array anime favorit yang mau disimpan.
 */
function saveFavorites(favorites: Anime[]): void {
    // Ubah array jadi string JSON sebelum disimpan.
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

/**
 * Menambahkan satu anime ke daftar favorit.
 * @param {Anime} anime - Objek anime yang mau ditambah.
 */
export function addFavorite(anime: Anime): void {
    const favorites = getFavorites();

    // Cek dulu apakah anime dengan link yang sama sudah ada.
    // Ini buat mencegah data duplikat.
    const isAlreadyFavorite = favorites.some(
        (fav: Anime) => fav.url === anime.url,
    );

    if (!isAlreadyFavorite) {
        favorites.push(anime);
        saveFavorites(favorites);
        console.log(`'${anime.title}' berhasil ditambahkan ke favorit!`);
    } else {
        console.log(`'${anime.title}' sudah ada di favorit.`);
    }
}

/**
 * Menghapus satu anime dari daftar favorit berdasarkan link-nya.
 * @param {string} animeLink - Link dari anime yang mau dihapus.
 */
export function removeFavorite(animeLink: string): void {
    const favorites = getFavorites();

    // Filter array, buang anime yang link-nya cocok.
    const updatedFavorites = favorites.filter(
        (fav: Anime) => fav.url !== animeLink,
    );

    // Simpan kembali array yang sudah difilter.
    saveFavorites(updatedFavorites);
    console.log(
        `Anime dengan link '${animeLink}' berhasil dihapus dari favorit.`,
    );
}

/**
 * Menghapus SEMUA anime dari daftar favorit.
 */
export function removeAllFavorites(): void {
    // Langsung hapus key-nya dari LocalStorage.
    localStorage.removeItem(FAVORITES_KEY);
    console.log("Semua favorit berhasil dihapus.");
}
