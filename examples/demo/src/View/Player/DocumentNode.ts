import { URLTransformer } from './URLTransformer';
import { angular } from './angular';
import { timeout } from './timeout';
import utils from './utils';

interface attributes {
    name: string;
    value: string;
}

interface sessionNode {
    tagName: string;
    nodeType: number;
    id: number;
    attributes: attributes[];
    childNodes: any[];
    classes: any[];
    textContent: string;
    isSvg: boolean;
    styleRules: any;
    isCrossOriginFrame: boolean;
    left: number;
    top: number;
}

// declare global {
//     interface Element {
//         __sessionstack_player__: any;
//     }
// }
interface customElement extends Element {
    __sessionstack_player__: any;
}

const NAMESPACES = {
    HTML: 'http://www.w3.org/1999/xhtml',
    SVG: 'http://www.w3.org/2000/svg',
};

const CROSS_ORIGIN_FRAME_BACKGROUND =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAIAAACRuyQOAAAApElEQVRIib3Vyw2EMBADULNdTP+9JWVkL0gIFMh87Phs6cknH601ZGNm/vJvD9N7T0pRBrlNCSYj5ZiwlGZiUoUJSEXGK9UZl0Rh1hKLWUhE5kviMq8SnZlLCmYiiZinpGNukpS5JDVzShsYAMcYYwOD0GtUGDPzSkUGzk11xiVRmLXEYhYSkfmSuMyrRGfmkoKZSCLmKemYmyRlLknNnNIGBsAflNtr9IJvuy8AAAAASUVORK5CYII=';

const PROPERTY_OBJECT_KEY = '__sessionstack_player__';

const ALLOWED_SRC_PROTOCOLS = ['http', 'https', 'ftp', 'data'];

function j(obj: any = {}) {
    const frameElementId = obj.frameElementId;
    this.documentsCollection[frameElementId] = obj;

    obj.childDocuments = {};

    if (angular.isDefined(frameElementId)) {
        const documents = getDocumentsCollectionById.call(this, frameElementId);

        if (!documents) return;

        documents.childDocuments[frameElementId] = true;
    }
}

/**
 * k
 * @param frameElementId
 */
function getDocumentsCollectionById(frameElementId: number) {
    const node = this.getNode(frameElementId);
    const frameEl = getFrameElement(node);

    if (frameEl) {
        const nodeId = getNodePropertyObject(frameEl).nodeId;

        return this.documentsCollection[nodeId];
    }
}

/**
 * traverseDocuments
 * @param {*} frameElementId
 * @param {*} b
 */
function traverseDocuments(frameElementId, callback: Function) {
    for (var c, e = [frameElementId]; e.length > 0; )
        (c = this.documentsCollection[e.shift()]),
            c &&
                (callback.call(this, c),
                angular.forEach(c.childDocuments, (a, b) => {
                    e.push(b);
                }));
}

/**
 * m
 * @param {*} frameElementId
 */
function traverseDocumentsByAdd(frameElementId) {
    traverseDocuments.call(this, frameElementId, o);
}

/**
 * n
 * @param {*} frameElementId
 */
function traverseDocumentsByRemove(frameElementId) {
    traverseDocuments.call(this, frameElementId, a => {
        // angular.element(a.documentElement).remove();
        a.documentElement.remove();
    });
}

function o(a) {
    if (this.isAttached) {
        const doc: Document = z.call(this, a.frameElementId);

        if (doc) {
            initiaDocType(doc, a.docType);
            appendChild(doc, a.documentElement);
            r.call(this, doc.documentElement);
        }
    }
}

/**
 * p
 * @param {*} doc
 * @param {*} text
 */
function initiaDocType(doc: Document, docType: string) {
    doc.open();
    doc.write(docType || '');
    doc.close();
    removeChild(doc);
}

/**
 * q
 * 把这个节点插入到当前文档中
 * @param {*} doc
 * @param {*} documentElement
 */
function appendChild(doc: Document, documentElement) {
    if (documentElement) {
        doc.adoptNode(documentElement);
        doc.appendChild(documentElement);
    }
}

function r(documentElement) {
    if (this.isAttached) {
        s.call(this, documentElement, '[style]', 'style');
        s.call(this, documentElement, 'link[rel="stylesheet"]', 'href');
        s.call(this, documentElement, '[src]', 'src');
    }
}

/**
 *
 * @param {*} documentElement
 * @param {*} element
 * @param {*} attribute
 */
function s(documentElement, element: string, attribute: string) {
    var e,
        f = this;

    if (documentElement) {
        angular
            .element(element, documentElement)
            .addBack(element)
            .each(function(b, c) {
                e = c.getAttribute(attribute);

                if (e) {
                    this.setAttribute(c, attribute, undefined);
                    timeout(this.setAttribute.bind(this), 0, true, c, attribute, e);
                }
            });
    }
}

function t(data, baseUrl) {
    var element,
        d = this;

    if (data.snapshot) {
        // rootElement
        element = this.createElement(data.snapshot);

        // var e = angular.element('head', element);
        // if (e.length <= 0) {
        //     angular.element(element).prepend('<head></head>');
        //     e = angular.element('head', element);
        // }

        if (element.tagName !== 'head') {
            let head = document.createElement('head');
            element.prepend(head);
        }

        // 设置标签base 设置url
        setBaseUrl(element, baseUrl);
        // stylesheet 设置url
        setStylesheetUrl.call(this, element, data.frameElementId);
        A.call(this, element, data.frameElementId);
    }

    return element;
}

/**
 * 从DOM中删除一个子节点
 * removeDocumentElement
 * @param {*} doc
 */
function removeChild(doc: Document) {
    var documentElement = doc.documentElement;
    if (documentElement) {
        doc.removeChild(documentElement);
    }
}

/**
 * v
 * 设置标签base url
 * @param {*} element
 * @param {*} href
 */
function setBaseUrl(element: Element, href) {
    // var base = angular.element('base', element);

    // if (base.length <= 0) {
    //     base = angular.element('<base>');
    //     angular.element('head', element).prepend(base);
    // }

    // base.attr('href', href);

    if (element.tagName !== 'base') {
        let base = document.createElement('base');
        base.setAttribute('href', href);
        element.prepend(base);
    } else {
        element.setAttribute('href', href);
    }
}

/**
 *
 * @param {*} node
 * @returns url
 */
function w(data) {
    let url;

    traverseNode(data.snapshot, element => {
        if (element && 'BASE' === element.tagName && element.attributes) {
            url = getAttributeValueByName(element, 'href');
            return false;
        }
    });

    return url ? utils.evaluateAbsoluteUrl(data.origin, url) : data.origin;
}

/**
 * x
 * 获取元素属性值
 * @param {*} element
 * @param {*} name
 */
function getAttributeValueByName(element, name) {
    var value;

    angular.forEach(element.attributes, attribute => {
        if (attribute.name === name) {
            value = attribute.value;
        }
    });

    return value;
}

/**
 * y
 * stylesheet 设置url
 * @param {*} rootElement
 * @param {*} frameElementId
 */
function setStylesheetUrl(rootElement: Element, frameElementId) {
    var c = this;
    var d = this.documentsCollection[frameElementId].urlTransformer;

    // angular.element('link[rel="stylesheet"]', rootElement).each(function(a, b) {
    //     var c = angular.element(b);
    //     var baseUrl = c.attr('href');

    //     baseUrl = d.transform(baseUrl);
    //     c.attr('href', baseUrl);
    // });
}

function z(frameElementId): Document {
    if (!angular.isDefined(frameElementId)) {
        return this.documentContainer.contentWindow.document;
    }

    const node = this.documentElementIndex[frameElementId];

    return node ? node.contentDocument : undefined;
}

function A(elements: Element, frameElementId) {
    traverseNode(elements, (element: Element) => {
        const property = getNodePropertyObject(element);
        const nodeId = property.nodeId;

        property.frameElementId = frameElementId;
        this.documentElementIndex[nodeId] = element;

        if (property.styleRules) {
            this.styleRuleNodes[nodeId] = element;
        }
    });
}

/**
 * B
 * 删除所有挂载的节点
 * @param {*} referenceNode
 */
function traverseNodeByRemoveNode(referenceNode: Element) {
    traverseNode(referenceNode, (element: Element) => {
        const nodeId = getNodePropertyObject(element).nodeId;
        delete this.documentElementIndex[nodeId];
    });
}

/**
 * C
 * @param {Element} element
 * @param {*} callback
 */
function traverseNode(element: Element, callback: Function) {
    const elements = [element];

    while (elements.length > 0) {
      console.log(elements)
        const firstElement = elements.shift();
        if (firstElement) {
            const result = callback(firstElement);

            if (result === false) {
                return;
            }

            angular.forEach(firstElement.childNodes, childNode => {
                elements.push(childNode);
            });
        }
    }
}

/**
 * D
 * 父节点
 * @param {*} referenceNode
 */
function getParentNode(referenceNode: Element): ParentNode | undefined {
    // const node = angular.element(referenceNode).parent();

    // if (node.length > 0) {
    //     return node[0];
    // }

    const parentNode = referenceNode.parentNode;
    if (parentNode) {
        return parentNode;
    }
}

/**
 * E
 * @param {*} element
 */
function getFrameElement(element) {
    try {
        return element.ownerDocument.defaultView.frameElement;
    } catch (error) {}
}

function F(arr, node, c) {
    if (node.childNodes && node.childNodes.length > 0) {
        angular.forEach(node.childNodes, b => {
            arr.push({ parent: c, node: b });
        });
    }
}

/**
 *
 * @param node
 * @returns
 */
function G(node: sessionNode): Element | object {
    var element = {};
    switch (node.nodeType) {
        case Node.COMMENT_NODE:
            element = createComment.call(this, node);
            break;
        case Node.TEXT_NODE:
            element = createTextNode.call(this, node);
            break;
        case Node.ELEMENT_NODE:
            element = getElementNode.call(this, node);
    }

    // 将id添加到元素中
    getNodePropertyObject(element as Element).nodeId = node.id;

    return element;
}

/**
 * H
 * Node.COMMENT_NODE
 * @param {*} node
 */
function createComment(node: sessionNode): Comment {
    var doc: Document = z.call(this);
    return doc.createComment(node.textContent);
}

/**
 * I
 * Node.TEXT_NOD
 * @param {*} a
 */
function createTextNode(node: sessionNode): Text {
    const doc: Document = z.call(this);
    return doc.createTextNode(node.textContent);
}

/**
 * J
 * Node.ELEMENT_NODE
 * @param {*} a
 */
function getElementNode(node: sessionNode): Element {
    N(node.isSvg);

    const element = createElement.call(this, node);

    O.call(this, element, node);
    return element;
}

/**
 * K
 * @param {*} node
 */
function createElement(node: sessionNode): Element {
    try {
        return getElementNS.call(this, node);
    } catch (b) {
        return getChildNode.call(this, node);
    }
}

/**
 * 创建一个具有指定的命名空间URI和限定名称的元素
 * @param {*} element
 */
function getElementNS(node: sessionNode): Element {
    const doc: Document = z.call(this);
    const namespaceURI = N(node.isSvg);
    const qualifiedName = node.tagName.toLowerCase();

    const element: Element = doc.createElementNS(namespaceURI, qualifiedName);

    if (node.styleRules) {
        var property = getNodePropertyObject(element);
        property.styleRules = node.styleRules;
    }

    if (node.attributes) {
        angular.forEach(node.attributes, attribute => {
            this.setAttribute(element, attribute.name, attribute.value);
        });
    }

    return element;
}

/**
 * M
 * 返回树中节点的第一个子节点，如果节点是无子节点，则返回 null。
 * @param {*} node
 */
function getChildNode(node: sessionNode): ChildNode | null {
    var doc = z.call(this),
        tagName = node.tagName.toLowerCase(),
        // innerHTML = (node.attributes, utils.buildHtmlString(tagName, node.attributes));
        innerHTML = utils.buildHtmlString(tagName, node.attributes);

    const div: HTMLDivElement = doc.createElement('div');
    div.innerHTML = innerHTML;

    return div.firstChild;
}

/**
 * namespaceURI 类型
 * @param {*} isSvg
 */
function N(isSvg: boolean) {
    return isSvg ? NAMESPACES.SVG : NAMESPACES.HTML;
}

function O(element: HTMLElement, node: sessionNode) {
    if (node.top || node.left) {
        const property = getNodePropertyObject(element);
        property.top = node.top;
        property.left = node.left;
    }

    const isCrossOriginFrame = node.isCrossOriginFrame;
    // i = angular.element(element);

    const matches = document.documentElement.matches;

    if (matches.call(element, 'script')) {
        element.removeAttribute('src');
    } else if (matches.call(element, 'iframe')) {
        element.removeAttribute('sandbox');
        element.removeAttribute('src');

        if (isCrossOriginFrame) {
            // i.css({ 'background-image': 'url(' + CROSS_ORIGIN_FRAME_BACKGROUND + ')' });
            element.style.backgroundImage = 'url(' + CROSS_ORIGIN_FRAME_BACKGROUND + ')';
        }
    } else if (matches.call(element, 'a')) {
        // i.attr('href', 'javascript:void(0);');
        element.setAttribute('href', 'javascript:void(0);');
    } else if (
        matches.call(element, 'meta[http-equiv="X-Frame-Options"]') ||
        matches.call(element, 'meta[http-equiv="Content-Security-Policy"]')
    ) {
        element.removeAttribute('content');
    }

    var j: any = [];
    if (matches.call(element, '[src]')) {
        var k = utils.getUrlProtocol(element.getAttribute('src'));

        if (k && ALLOWED_SRC_PROTOCOLS.indexOf(k) < 0) {
            j.push('src');
        }
    }

    // 移除事件
    // angular.forEach(element.attributes, attribute => {
    //     if (attribute.name.startsWith('on')) {
    //         j.push(attribute.name);
    //     }
    // });

    // angular.forEach(j, a => {
    //     element.removeAttribute(a);
    // });
}

function P(element, name: string, value: string): boolean {
    // var d = angular.element(element);
    const matches = document.documentElement.matches;

    return (
        (matches.call(element, 'script') && 'src' === name) ||
        (matches.call(element, 'iframe') && 'src' === name) ||
        (matches.call(element, 'meta[http-equiv="X-Frame-Options"]') && 'content' === name) ||
        'integrity' === name ||
        (matches.call(element, 'meta[content]') &&
            'http-equiv' === name &&
            ('X-Frame-Options' === value || 'Content-Security-Policy' === value))
    );
}

interface nodeProperty {
    nodeId: number;
    frameElementId: number;
    styleRules: any;

    // 不确定
    top?: number;
    left?: number;
}
/**
 * 在 Element 上添加属性__sessionstack_player__，并返回__sessionstack_player__属性的值
 * @param {Element} element
 * @returns {Object} 返回__sessionstack_player__属性的值
 */
function getNodePropertyObject(element: Element): nodeProperty {
    // 自定义属性
    let value = element[PROPERTY_OBJECT_KEY];

    if (!value) {
        value = {};
        // 添加自定义属性
        element[PROPERTY_OBJECT_KEY] = value;
    }

    // __sessionstack_player__: {nodeId: 702}
    return value;
}

/**
 * 识别nodeId
 * @param {Element} element
 * @returns {boolean}
 */
function hasNodeId(element: Element): boolean {
    return angular.isNumber(getNodePropertyObject(element).nodeId);
}

interface documentsCollection {
    frameElementId?: number;
    urlTransformer?: URLTransformer;
    docType?: string;
}

export class DocumentNode {
    isAttached: boolean;
    documentContainer;
    documentElementIndex: any[];
    documentsCollection: documentsCollection;
    afterAttachCallbacks: any[];
    styleRuleNodes: object;

    constructor(documentContainer) {
        this.isAttached = true;
        this.documentContainer = documentContainer;
        this.documentElementIndex = [];
        this.documentsCollection = {};
        this.afterAttachCallbacks = [];
        this.styleRuleNodes = {};
    }

    detach() {
        this.afterAttachCallbacks.forEach(callback => {
            timeout.cancel(callback);
        });

        this.afterAttachCallbacks = [];

        if (this.isAttached) {
            this.isAttached = false;
            traverseDocumentsByRemove.call(this, undefined);
        }
    }

    attach(callback: Function) {
        this.isAttached = true;

        traverseDocumentsByAdd.call(this, undefined);
        this.afterAttachCallbacks.push(timeout(callback));
    }

    /**
     * 快照
     * @param node
     * @param sessionId
     */
    write(data, sessionId) {
        if (angular.isUndefined(data.frameElementId)) {
            initiaDocType(z.call(this), data.docType);
        }

        //
        if (angular.isUndefined(data.frameElementId)) {
            this.documentElementIndex = [];
            this.documentsCollection = {};
        }

        //  从快照中找到url
        const baseUrl = w(data);
        var f: any = {
            urlTransformer: new URLTransformer(baseUrl, sessionId),
            docType: data.docType,
            frameElementId: data.frameElementId,
        };

        j.call(this, f);
        f.documentElement = t.call(this, data, baseUrl);

        o.call(this, f);
    }

    getDocumentElement(frameElementId) {
        const doc: Document = z.call(this, frameElementId);

        if (doc) {
            return doc.documentElement;
        }
    }

    getNode(id: number): Element {
        return this.documentElementIndex[id];
    }

    prepend(referenceNode: Element, newNode: Element) {
        const matches = document.documentElement.matches;

        if (
            (!matches.call(referenceNode, 'script') || newNode.nodeType !== Node.TEXT_NODE) &&
            referenceNode &&
            newNode &&
            referenceNode.nodeType === Node.ELEMENT_NODE
        ) {
            referenceNode.insertBefore(newNode, referenceNode.firstChild);
            const frameElementId = getNodePropertyObject(referenceNode).frameElementId;
            // stylesheet 设置url
            setStylesheetUrl.call(this, newNode, frameElementId);
            A.call(this, newNode, frameElementId);
        }
    }

    replaceDocumentElement(node, frameElementId) {
        var c = this,
            d = this.documentsCollection[frameElementId];

        const matches = document.documentElement.matches;
        if (matches.call(node, 'html') && d) {
            d.documentElement = node;
            // stylesheet 设置url
            setStylesheetUrl.call(this, node, frameElementId);
            A.call(this, node, frameElementId);
            o.call(this, d);
        }
    }

    replaceDocType(docType, frameElementId) {
        var c = this,
            d = this.documentsCollection[frameElementId];

        if (docType && d) {
            traverseDocumentsByRemove.call(this, frameElementId);
            d.docType = docType;
            traverseDocumentsByAdd.call(this, frameElementId);
        }
    }

    insertAfter(referenceNode: Element, newNode: Element) {
        const parentNode = getParentNode(referenceNode);
        const matches = document.documentElement.matches;

        if (
            (!matches.call(parentNode, 'script') || newNode.nodeType !== Node.TEXT_NODE) &&
            parentNode &&
            newNode &&
            parentNode.nodeType === Node.ELEMENT_NODE
        ) {
            parentNode.insertBefore(newNode, referenceNode.nextSibling);
            const frameElementId = getNodePropertyObject(parentNode).frameElementId;
            // stylesheet 设置url
            setStylesheetUrl.call(this, newNode, frameElementId);
            A.call(this, newNode, frameElementId);
        }
    }

    /**
     * 删除所有节点
     * @param referenceNode
     */
    removeNode(referenceNode: Element) {
        var parentNode = getParentNode(referenceNode);
        if (parentNode) {
            parentNode.removeChild(referenceNode);
            // 删除所有挂载的节点
            traverseNodeByRemoveNode.call(this, referenceNode);
        }
    }

    traverseNode(element: Element, callback: Function) {
        traverseNode(element, callback);
    }

    traverseDocuments(frameElementId, callback) {
        traverseDocuments.call(this, frameElementId, callback);
    }
    /**
     *
     * @param element
     */
    getNodeOffset(element: Element): { top: number; left: number } {
        const offset = { top: 0, left: 0 };

        while (element && element !== this.documentContainer) {
            var rect = element.getBoundingClientRect();
            offset.top += rect.top;
            offset.left += rect.left;

            element = getFrameElement(element);
        }

        return offset;
    }
    /**
     *
     * @param {Element | Object} node
     */
    createElement(node: sessionNode): Element {
        var b;
        var c;
        var d;
        var e = G.call(this, node);
        var f = [];

        if (node.childNodes && node.childNodes.length > 0)
            for (F(f, node, e); f.length > 0; )
                (b = f.shift()),
                    (d = b.parent.tagName.toLowerCase()),
                    'script' !== d &&
                        'noscript' !== d &&
                        ((c = G.call(this, b.node)), F(f, b.node, c), b.parent.appendChild(c));
        return e;
    }

    /**
     *
     * @param element
     * @param name
     * @param value
     */
    setAttribute(element, name: string, value: string) {
        //
        if (!P(element, name, value)) {
            // 转换stylesheet链接地址
            const matches = document.documentElement.matches;

            if (matches.call(element, 'link[rel="stylesheet"]') && hasNodeId(element) && 'href' === name) {
                const frameElementId = getNodePropertyObject(element).frameElementId;
                const urlTransformer = this.documentsCollection[frameElementId].urlTransformer;

                value = urlTransformer.transform(value);
            }
            try {
                if (angular.isUndefined(value) || null === value) {
                    element.removeAttribute(name);
                } else {
                    element.setAttribute(name, value);
                }
            } catch (error) {}
        }
    }
    /**
     *
     * @param element
     */
    getNodePropertyObject(element: Element) {
        return getNodePropertyObject(element);
    }

    getFrameElementIds() {
        return this.documentsCollection.map(collection => {
            return collection.frameElementId;
        });
    }
}
