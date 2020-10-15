/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

export class Queue {
    store: any = [];

    enqueue(element) {
        this.store.push(element);
    }

    front() {
        if (!this.empty()) {
            return this.store[0];
        }
    }

    back() {
        if (!this.empty()) {
            return this.store[this.store - 1];
        }
    }

    dequeue() {
        if (!this.empty()) {
            this.store.shift();
        }
    }

    empty(): boolean {
        if (this.store.length === 0) {
            return true;
        }
        return false;
    }

    clear() {
        this.store = [];
    }

    toString() {
        return this.store;
    }
}
