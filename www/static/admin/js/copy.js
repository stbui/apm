(function (doc) {
    
    var body = doc.body;
    
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (obj, fromIndex) {
            var index = fromIndex || 0;
            for(var i = index, l = this.length; i < l; i++) {
                if (this[i] == obj) {
                    return i;
                }
            }
            return -1;
        };
    }

    // 提供一些兼容性的方法
    var util = {
        getElementsByClassName: function (name, parent) {
            var parent = parent || document;
            
            if (document.getElementsByClassName) {
                return parent.getElementsByClassName(name);
            }

            var allElems = parent.getElementsByTagName('*'),
            result = [];

            for (var i = 0, l = allElems.length; i < l; i++) {
                var elem = allElems[i];
                // 这个方案不好。因为IE6、7、8 不支持indexOf
                // 再套一层循环吗
                // 正则匹配，带一个空格？
                if (~elem.className.split().indexOf(name)) {
                  result.push(elem);
                }
            }

            return result;
        },

        addEventListener: function (elem, type, func) {
            if (elem.addEventListener) {
                elem.addEventListener(type, func, false);
            } else {
                elem.attachEvent('on' + type, func);
            }
            return;
        },

        removeEventListener: function (elem, type, func) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type);
            } else {
                elem.detachEvent('on' + type);
            }
        },
        // 延时函数
        delay: function (second, func) {
            setTimeout(func, second * 1000);
        },

        addClass: function (elem, newClass) {
            if (elem.className === '') {
                elem.className = newClass;
            } else {
                elem.className += (' ' + newClass);
            }
        },
        removeClass: function (elem, oldClass) {

        }
    };

    var Copy = function () {
        var self = this;

        //ctrl + c 对应的span
        this.copytip = doc.createElement('span');
        this.copytip.className = 'copy-tip';
        this.copytip.innerHTML = 'Ctrl+C可复制';
        body.appendChild(this.copytip);

        // 复制成功对应的span
        this.success = doc.createElement('span');
        this.success.className = 'success-tip';
        this.success.innerHTML = '复制成功！';
        body.appendChild(this.success);
        // this.success = doc.getElementsByClassName('success-tip')[0];

        return this;
    };

    // 选中对应元素的内容
    // 参考：http://stackoverflow.com/a/987376/1189321
    Copy.prototype.selectText = function (element) {
        var text = element,
            range,
            selection;

        // 选中
        if (body.createTextRange) {
            // IE
            range = body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            // Others
            selection = window.getSelection();
            range = doc.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            return false;
        }
        // util.addClass(element, 'selected');
        
        
        // this.copytip = element.getElementsByClassName('copy-tip')[0];

        // 绑定键盘事件
        this._bindKeyDown();
    };

    // 取消选中
    Copy.prototype.cancleSelected = function (element) {
        var text = element,
            range,
            selection;

        if (body.createTextRange) {
            // IE
            range = body.createTextRange();
            range.moveToElementText(text);
        } else if (window.getSelection) {
            // Others
            selection = window.getSelection();
            range = doc.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
        } else {
            return false;
        }
        // util.removeClass(element, 'selected');
        this._removeKeyDown();
    };

    // 怎么判断同时按下 ctrl + c?
    Copy.prototype._bindKeyDown = function () {
        var self = this;
        // 显示ctrl + c的提示信息
        self.copytip.style.display =  'inline';
        // 绑定键盘事件
        util.addEventListener(doc, 'keydown', function (e) {
            if (e.ctrlKey && e.keyCode === 67) {
                // 按下 ctrl + c
                self.success.style.display = 'inline';
                // 复制成功，隐藏copytip
                self.copytip.style.display = 'none';
            }
        });
    };

    Copy.prototype._removeKeyDown = function () {
        this.copytip.style.display = 'none';
        this.success.style.display = 'none';
        util.removeEventListener(doc, 'keydown');
    };

    // Copy.prototype.

    window.copy = new Copy();

}(document));