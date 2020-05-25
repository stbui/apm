import React from 'react';
import { TreeElement } from './TreeElement';
/**
 * @unrestricted
 */
export class TreeOutline {
    selectedTreeElement;
    expandTreeElementsWhenArrowing;
    _comparator;
    _rootElement;
    contentElement;
    _preventTabOrder;
    _showSelectionOnKeyboardFocus;
    element;
    _focusable;
    _useLightSelectionColor;
    _treeElementToScrollIntoView;
    _centerUponScrollIntoView;

    constructor() {
        this._createRootElement();

        /** @type {?TreeElement} */
        this.selectedTreeElement = null;
        this.expandTreeElementsWhenArrowing = false;
        /** @type {?function(!TreeElement, !TreeElement):number} */
        this._comparator = null;

        this.contentElement = this._rootElement._childrenListNode;
        this.contentElement.addEventListener('keydown', this._treeKeyDown.bind(this), false);

        this._preventTabOrder = false;
        this._showSelectionOnKeyboardFocus = false;
        this.setFocusable(true);
        this.element = this.contentElement;
        // ARIAUtils.markAsTree(this.element);
    }

    /**
     * @param {boolean} show
     * @param {boolean=} preventTabOrder
     */
    setShowSelectionOnKeyboardFocus(show, preventTabOrder) {
        this.contentElement.classList.toggle('hide-selection-when-blurred', show);
        this._preventTabOrder = !!preventTabOrder;
        if (this._focusable) {
            this.contentElement.tabIndex = !!preventTabOrder ? -1 : 0;
        }
        this._showSelectionOnKeyboardFocus = show;
    }

    _createRootElement() {
        this._rootElement = new TreeElement();
        this._rootElement.treeOutline = this;
        this._rootElement.root = true;
        this._rootElement.selectable = false;
        this._rootElement.expanded = true;
        this._rootElement._childrenListNode.classList.remove('children');
    }

    /**
     * @return {!TreeElement}
     */
    rootElement() {
        return this._rootElement;
    }

    /**
     * @return {?TreeElement}
     */
    firstChild() {
        return this._rootElement.firstChild();
    }

    /**
     * @return {?TreeElement}
     */
    _lastDescendent() {
        let last = this._rootElement.lastChild();
        while (last.expanded && last.childCount()) {
            last = last.lastChild();
        }
        return last;
    }

    /**
     * @param {!TreeElement} child
     */
    appendChild(child) {
        this._rootElement.appendChild(child);
    }

    /**
     * @param {!TreeElement} child
     * @param {number} index
     */
    insertChild(child, index) {
        this._rootElement.insertChild(child, index);
    }

    /**
     * @param {!TreeElement} child
     */
    removeChild(child) {
        this._rootElement.removeChild(child);
    }

    removeChildren() {
        this._rootElement.removeChildren();
    }

    /**
     * @param {number} x
     * @param {number} y
     * @return {?TreeElement}
     */
    treeElementFromPoint(x, y) {
        const node = this.contentElement.ownerDocument.deepElementFromPoint(x, y);
        if (!node) {
            return null;
        }

        const listNode = node.enclosingNodeOrSelfWithNodeNameInArray(['ol', 'li']);
        if (listNode) {
            return listNode.parentTreeElement || listNode.treeElement;
        }
        return null;
    }

    /**
     * @param {?Event} event
     * @return {?TreeElement}
     */
    treeElementFromEvent(event) {
        return event ? this.treeElementFromPoint(event.pageX, event.pageY) : null;
    }

    /**
     * @param {?function(!TreeElement, !TreeElement):number} comparator
     */
    setComparator(comparator) {
        this._comparator = comparator;
    }

    /**
     * @param {boolean} focusable
     */
    setFocusable(focusable) {
        this._focusable = focusable;
        this.updateFocusable();
    }

    updateFocusable() {
        if (this._focusable) {
            this.contentElement.tabIndex = this._preventTabOrder || !!this.selectedTreeElement ? -1 : 0;
            if (this.selectedTreeElement) {
                this.selectedTreeElement._setFocusable(true);
            }
        } else {
            this.contentElement.removeAttribute('tabIndex');
            if (this.selectedTreeElement) {
                this.selectedTreeElement._setFocusable(false);
            }
        }
    }

    focus() {
        if (this.selectedTreeElement) {
            this.selectedTreeElement.listItemElement.focus();
        } else {
            this.contentElement.focus();
        }
    }

    useLightSelectionColor() {
        this._useLightSelectionColor = true;
    }

    /**
     * @param {!TreeElement} element
     */
    _bindTreeElement(element) {
        if (element.treeOutline) {
            console.error('Binding element for the second time: ' + new Error().stack);
        }
        element.treeOutline = this;
        element.onbind();
    }

    /**
     * @param {!TreeElement} element
     */
    _unbindTreeElement(element) {
        if (!element.treeOutline) {
            console.error('Unbinding element that was not bound: ' + new Error().stack);
        }

        element.deselect();
        element.onunbind();
        element.treeOutline = null;
    }

    /**
     * @return {boolean}
     */
    selectPrevious() {
        let nextSelectedElement = this.selectedTreeElement.traversePreviousTreeElement(true);
        while (nextSelectedElement && !nextSelectedElement.selectable) {
            nextSelectedElement = nextSelectedElement.traversePreviousTreeElement(!this.expandTreeElementsWhenArrowing);
        }
        if (!nextSelectedElement) {
            return false;
        }
        nextSelectedElement.select(false, true);
        return true;
    }

    /**
     * @return {boolean}
     */
    selectNext() {
        let nextSelectedElement = this.selectedTreeElement.traverseNextTreeElement(true);
        while (nextSelectedElement && !nextSelectedElement.selectable) {
            nextSelectedElement = nextSelectedElement.traverseNextTreeElement(!this.expandTreeElementsWhenArrowing);
        }
        if (!nextSelectedElement) {
            return false;
        }
        nextSelectedElement.select(false, true);
        return true;
    }

    /**
     * @param {boolean=} omitFocus
     * @param {boolean=} selectedByUser
     */
    forceSelect(omitFocus = false, selectedByUser = true) {
        if (this.selectedTreeElement) {
            this.selectedTreeElement.deselect();
        }
        this._selectFirst(omitFocus, selectedByUser);
    }

    /**
     * @param {boolean=} omitFocus
     * @param {boolean=} selectedByUser
     * @return {boolean}
     */
    _selectFirst(omitFocus = false, selectedByUser = true) {
        let first = this.firstChild();
        while (first && !first.selectable) {
            first = first.traverseNextTreeElement(true);
        }
        if (!first) {
            return false;
        }
        first.select(omitFocus, selectedByUser);
        return true;
    }

    /**
     * @return {boolean}
     */
    _selectLast() {
        let last = this._lastDescendent();
        while (last && !last.selectable) {
            last = last.traversePreviousTreeElement(true);
        }
        if (!last) {
            return false;
        }
        last.select(false, true);
        return true;
    }

    /**
     * @param {!Event} event
     */
    _treeKeyDown(event) {
        // if (event.shiftKey || event.metaKey || event.ctrlKey || isEditing()) {
        //     return;
        // }

        let handled = false;
        if (!this.selectedTreeElement) {
            if (event.key === 'ArrowUp' && !event.altKey) {
                handled = this._selectLast();
            } else if (event.key === 'ArrowDown' && !event.altKey) {
                handled = this._selectFirst();
            }
        } else if (event.key === 'ArrowUp' && !event.altKey) {
            handled = this.selectPrevious();
        } else if (event.key === 'ArrowDown' && !event.altKey) {
            handled = this.selectNext();
        } else if (event.key === 'ArrowLeft') {
            handled = this.selectedTreeElement.collapseOrAscend(event.altKey);
        } else if (event.key === 'ArrowRight') {
            if (!this.selectedTreeElement.revealed()) {
                this.selectedTreeElement.reveal();
                handled = true;
            } else {
                handled = this.selectedTreeElement.descendOrExpand(event.altKey);
            }
        } else if (event.keyCode === 8 /* Backspace */ || event.keyCode === 46 /* Delete */) {
            handled = this.selectedTreeElement.ondelete();
            // } else if (isEnterKey(event)) {
            //     handled = this.selectedTreeElement.onenter();
            // } else if (event.keyCode === Keys.Space.code) {
            //     handled = this.selectedTreeElement.onspace();
        } else if (event.key === 'Home') {
            handled = this._selectFirst();
        } else if (event.key === 'End') {
            handled = this._selectLast();
        }

        if (handled) {
            event.consume(true);
        }
    }

    /**
     * @param {!TreeElement} treeElement
     * @param {boolean} center
     */
    _deferredScrollIntoView(treeElement, center) {
        if (!this._treeElementToScrollIntoView) {
            this.element.window().requestAnimationFrame(deferredScrollIntoView.bind(this));
        }
        this._treeElementToScrollIntoView = treeElement;
        this._centerUponScrollIntoView = center;
        /**
         * @this {TreeOutline}
         */
        function deferredScrollIntoView() {
            // This function no longer uses scrollIntoViewIfNeeded because users were bothered
            // by the fact that it always scrolls in both direction even if only one is necessary
            // to bring the item into view.

            const itemRect = this._treeElementToScrollIntoView.listItemElement.getBoundingClientRect();
            const treeRect = this.contentElement.getBoundingClientRect();
            const viewRect = this.element.getBoundingClientRect();

            const currentScrollX = viewRect.left - treeRect.left;
            const currentScrollY = viewRect.top - treeRect.top;

            // Only scroll into view on each axis if the item is not visible at all
            // but if we do scroll and _centerUponScrollIntoView is true
            // then we center the top left corner of the item in view.
            let deltaLeft = itemRect.left - treeRect.left;
            if (deltaLeft > currentScrollX && deltaLeft < currentScrollX + viewRect.width) {
                deltaLeft = currentScrollX;
            } else if (this._centerUponScrollIntoView) {
                deltaLeft = deltaLeft - viewRect.width / 2;
            }
            let deltaTop = itemRect.top - treeRect.top;
            if (deltaTop > currentScrollY && deltaTop < currentScrollY + viewRect.height) {
                deltaTop = currentScrollY;
            } else if (this._centerUponScrollIntoView) {
                deltaTop = deltaTop - viewRect.height / 2;
            }
            this.element.scrollTo(deltaLeft, deltaTop);
            delete this._treeElementToScrollIntoView;
            delete this._centerUponScrollIntoView;
        }
    }
}

export default () => {
    return <div className="tree-outline-disclosure"></div>;
};
