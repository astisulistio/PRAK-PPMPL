class Repository {
    constructor() {
        this.data = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];
    }

    getAllItems() {
        return this.data;
    }

    getItemById(id) {
        return this.data.find(item => item.id === id);
    }

    addItem(item) {
        this.data.push(item);
        return item;
    }

    // Metode baru untuk menghapus item berdasarkan ID
    removeItemById(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('Item tidak ditemukan');
        }
        this.data.splice(index, 1);
        return { message: 'Item berhasil dihapus' };
    }
}

module.exports = Repository;