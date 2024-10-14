class Service {
    constructor(primaryRepository, secondaryRepository) {
        this.primaryRepository = primaryRepository;
        this.secondaryRepository = secondaryRepository;
    }

    getItemById(id) {
        const item = this.primaryRepository.getItemById(id) || this.secondaryRepository.getItemById(id);
        if (!item) {
            throw new Error('Item not found in both repositories');
        }
        return item;
    }

    // Menambahkan metode getAllItems
    getAllItems() {
        const primaryItems = this.primaryRepository.getAllItems();
        const secondaryItems = this.secondaryRepository.getAllItems();
        return [...primaryItems, ...secondaryItems]; // Menggabungkan item dari kedua repositori
    }

    // Menambahkan metode addItem
    addItem(item) {
        return this.primaryRepository.addItem(item); // Menambahkan item ke primary repository
    }

    // Menambahkan metode removeItemById
    removeItemById(id) {
        return this.primaryRepository.removeItemById(id);
    }
}

module.exports = Service;