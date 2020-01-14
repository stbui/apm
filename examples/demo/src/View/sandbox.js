export class Sandbox {
    config;
    iframe;

    constructor(config) {
        this.config = config;
    }

    getDocument() {
        return this.iframe.contentDocument;
    }

    onResize(Rect) {
        this.iframe.width = `${Rect.width}px`;
        this.iframe.height = `${Rect.height}px`;
    }

    updateElement({ tagName, attributes, nodeType, textContent, id }, doc) {
        let elem;
        switch (nodeType) {
            case 1:
                elem = doc.createElement(tagName);
                elem.id = id;
                break;
            case 3:
                elem = doc.createTextNode(textContent);
                break;
            case 8:
                elem = new Comment(textContent);
                break;
        }

        if (attributes && tagName !== 'SCRIPT') {
            attributes.forEach(({ name, value }) => {
                elem.setAttribute(name, value);
            });
        }

        return elem;
    }

    buildNode(n, doc) {
        let node = this.updateElement(n, doc);
        if (!node) {
            return null;
        }

        if (n.tagName === 'HTML') {
            doc.close();
            doc.open();
            doc.implementation.createDocument(null, '', null);
            doc.implementation.createDocumentType('html', '', '');
            // node = doc;
            console.log(doc)
        }

        if (n.childNodes) {
            for (const child of n.childNodes) {
                const childNode = this.buildNode(child, doc);
                if (childNode) {
                    node.appendChild(childNode);
                } else {
                    console.warn('Failed to rebuild', child);
                }
            }
        }

        return node;
    }

    render() {
        this.iframe = document.createElement('iframe');
        this.iframe.setAttribute('sandbox', 'allow-same-origin');
        this.iframe.setAttribute('scrolling', 'no');
        this.iframe.setAttribute('style', 'pointer-events: none');
        this.iframe.setAttribute('id', 'viewer');

        this.config.container.appendChild(this.iframe);

        const { documentElement, head, body } = this.iframe.contentDocument;

        const a = {
            tagName: 'div',
            nodeType: 1,
            id: 1,
            childNodes: [{ tagName: 'div', nodeType: 1, id: 1 }, { tagName: 'div', nodeType: 1, id: 1 }],
        };

        const b = {
            tagName: 'HTML',
            nodeType: 1,
            id: 2,
            childNodes: [
                { tagName: 'HEAD', nodeType: 1, id: 5 },
                {
                    textContent: '\n\n    ',
                    nodeType: 3,
                    id: 9,
                },
                {
                    tagName: 'BODY',
                    attributes: [
                        {
                            name: 'class',
                            value: 'stbui-primary',
                        },
                    ],
                    nodeType: 1,
                    id: 14,
                    childNodes: [
                        {
                            tagName: 'DIV',
                            attributes: [
                                {
                                    name: 'id',
                                    value: 'app',
                                },
                            ],
                            nodeType: 1,
                            id: 2277,
                        },
                    ],
                },
            ],
        };
        const node = this.buildNode(b, this.iframe.contentDocument);
        // this.iframe.contentDocument.appendChild(node)

        console.log(node);
        console.log(this.iframe.contentDocument.documentElement.appendChild);
    }
}
