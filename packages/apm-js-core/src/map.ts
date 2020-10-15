/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

export class Map {
    private entries = {};

    // 返回字典所包含的元素个数
    public size: number;

    /**
     * 将这个字典中的所有元素删除
     */
    clear() {
        this.entries = {};
        this.size = 0;
    }

    /**
     * 通过键值从字典中移除对应的数据
     * @param key
     */
    delete(key): boolean {
        if (this.has(key)) {
            delete this.entries[key];
            this.size--;
            return true;
        }

        return false;
    }

    forEach(callbackfn) {}

    /**
     * 通过键值查找特定的数值并返回
     * @param key
     */
    get(key) {
        return this.has(key) ? this.entries[key] : undefined;
    }

    /**
     * 如果键存在字典中返回true,否则false
     * @param key
     */
    has(key): boolean {
        if (this.entries[key]) {
            return true;
        }

        return false;
    }

    /**
     * 向字典中添加新元素
     * @param value
     */
    set(key, value) {
        this.entries[key] = value;
        this.size++;

        return this;
    }
}
