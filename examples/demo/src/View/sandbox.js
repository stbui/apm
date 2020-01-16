import activities from './activities.json';
import { log } from './log';

export function createElement({ tagName, attributes, nodeType, textContent, id }, doc) {
    let elem = null;

    switch (nodeType) {
        case 1:
            elem = doc.createElement(tagName);
            elem.id = id;
            break;
        case 3:
            elem = doc.createTextNode(textContent);
            break;
        case 8:
            elem = doc.createComment(textContent);
            break;
    }

    if (attributes && tagName !== 'SCRIPT') {
        attributes.forEach(({ name, value }) => {
            elem.setAttribute(name, value);
        });
    }

    return elem;
}

export function buildNode(n, doc) {
    let node = createElement(n, doc);
    if (!node) {
        return null;
    }

    if (n.childNodes && n.childNodes.length > 0) {
        for (const child of n.childNodes) {
            const childNode = buildNode(child, doc);
            if (childNode) {
                node.appendChild(childNode);
            } else {
                console.warn('Failed', child);
            }
        }
    }

    return node;
}

export class Sandbox {
    config;
    iframe;

    constructor(config) {
        this.config = config;
        this.renderIframe();
    }

    onResize(Rect) {
        this.iframe.width = `${Rect.width}px`;
        this.iframe.height = `${Rect.height}px`;
    }

    run(nodes) {
        const node = buildNode(nodes, this.iframe.contentDocument);
        this.iframe.contentDocument.appendChild(node);
        // HTML对象文档
        // console.log(this.iframe.contentDocument);
        return node;
    }

    test() {
        let nodes = activities.activities[0].data.snapshot;
        const n = this.run(nodes);
        setTimeout(() => {
            this.iframe.contentDocument.removeChild(n);
            nodes = log.session.snapshot;
            this.run(nodes);
        }, 3000);
    }

    renderIframe() {
        this.iframe = document.createElement('iframe');
        this.iframe.setAttribute('sandbox', 'allow-same-origin');
        this.iframe.setAttribute('scrolling', 'no');
        this.iframe.setAttribute('style', 'pointer-events: none');
        this.iframe.setAttribute('id', 'viewer');

        this.config.container.appendChild(this.iframe);

        this.iframe.contentDocument.close();
        this.iframe.contentDocument.open();

        const documentType = this.iframe.contentDocument.implementation.createDocumentType('html', '', '');
        this.iframe.contentDocument.appendChild(documentType);
    }
}
