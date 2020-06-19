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

    hasClass(className) {
        this.context.classList.hasClass(className);
    },

    removeClass(className) {
        this.context.classList.remove(className);
        return this;
    },

    addClass(className) {
        this.context.classList.add(className);
        return this;
    },

    val(text) {
        this[0].value;

        return this;
    },

    css(css) {
        if (typeof css === 'object') {
            var str = '';
            for (var k in css) {
                const val = typeof css[k] === 'number' ? css[k] + 'px' : css[k];
                str = str.concat(k, ':', val, ';');
            }

            this[0].style = str;
        }

        return this;
    },

    element(selector, context?) {
        selector = selector || document; //初始化选择器，默认值为document
        context = context || document; //初始化上下文对象，默认值为document
        if (selector.nodeType) {
            //如果是DOM元素
            this[0] = selector; //直接把该DOM元素传递给实例对象的伪数组
            this.length = 1; //设置实例对象的length属性，表示包含1个元素
            this.context = selector; //重新设置上下文为DOM元素
            return this; //返回当前实例
        }

        if (typeof selector === 'string') {
            //如果传进来的是标签字符串
            let ele = document.querySelectorAll(selector); //获取指定名称的元素
            for (let i = 0; i < ele.length; i++) {
                //将获取到的元素放入实例对象中
                this[i] = ele[i];
            }
            this.length = ele.length;
            return this;
        } else {
            this.length = 0;
            this.context = context;
            return this;
        }
    },

    parents() {
        return this;
    },

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
