/**
 * Class generik untuk mengelola data array di Local Storage.
 * @template T Tipe objek yang akan disimpan dalam array.
 */
class LocalStorageManager<T> {
    private storageKey: string;

    /**
     * @param key Kunci unik untuk data di Local Storage.
     */
    constructor(key: string) {
        this.storageKey = key;
    }

    /**
     * Mengambil semua data dari Local Storage.
     * Mengembalikan array kosong jika tidak ada data atau terjadi error.
     * @returns {T[]} Array data.
     */
    public getData(): T[] {
        try {
            const item = localStorage.getItem(this.storageKey);
            // Jika item ada, parse JSON-nya. Jika tidak, kembalikan array kosong.
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error(
                `Gagal membaca data dari local storage dengan key ${this.storageKey}:`,
                error,
            );
            return [];
        }
    }

    /**
     * Menyimpan (menimpa) semua data ke Local Storage.
     * @param {T[]} data Array data yang akan disimpan.
     */
    private saveData(data: T[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    /**
     * Menambahkan satu item baru ke dalam array data.
     * @param {T} newItem Item baru yang akan ditambahkan.
     */
    public addItem(newItem: T): void {
        const currentData = this.getData();
        currentData.push(newItem);
        this.saveData(currentData);
    }

    public filterData(animeName: string) {
        const data = this.getData() as string[];
        const result = data.includes(animeName);
        return result;
    }

    removeItem(itemToRemove: string) {
        let currentData = this.getData();
        currentData = currentData.filter((item) => item !== itemToRemove);
        this.saveData(currentData);
    }

    /**
     * Menghapus semua data dari Local Storage untuk key ini.
     */
    public clearData(): void {
        localStorage.removeItem(this.storageKey);
    }
}

export const watchlist = new LocalStorageManager<string>("anime-list");
