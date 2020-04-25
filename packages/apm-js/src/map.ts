export class Map {
    private entries = {};

    clear() {
        this.entries = {};
    }

    delete(key): boolean {
        if (this.has(key)) {
            delete this.entries[key];
            return true;
        }

        return false;
    }

    has(key): boolean {
        if (this.entries[key]) {
            return true;
        }

        return false;
    }

    set(key, value) {
        this.entries[key] = value;

        return this;
    }
}
