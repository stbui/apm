export const angular = {
    isDefined(value) {
        return typeof value !== 'undefined';
    },
    isUndefined(value) {
        return typeof value === 'undefined';
    },
    isObject(value) {
        return value !== null && typeof value === 'object';
    },
    isFunction(value) {
        return typeof value === 'function';
    },
    isNumber(value) {
        return typeof value === 'number';
    },
    isArray(arr) {
        return Array.isArray(arr) || arr instanceof Array;
    },

    element() {},

    parent() {},

    /**
     * 仅支持数组
     * @param {*} obj
     * @param {*} iterator
     */
    forEach(obj, iterator, context?) {
        if (this.isArray(obj)) {
            return obj.forEach(iterator);
        } else {
            for (let key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
        }
    },
};
