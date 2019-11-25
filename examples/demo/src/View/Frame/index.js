import React, { useState, useRef, useEffect } from 'react';

const renderElem = ({ tagName, attributes, childNodes, nodeType, textContent }) => {
    let elem = document.createElement(tagName);
    if (nodeType === 1) {
        elem = document.createElement(tagName);
    } else if (nodeType === 3) {
        elem = document.createTextNode(textContent);
    } else if (nodeType === 8) {
        elem = new Comment(textContent);
    }

    if (attributes) {
        attributes.forEach(({ name, value }) => {
            elem.setAttribute(name, value);
        });
    }

    if (childNodes) {
        for (const child of childNodes) {
            elem.appendChild(renderElem(child));
        }
    }

    return elem;
};

const render = vNode => {
    if (typeof vNode === 'string') {
        return document.createTextNode(vNode);
    }
    return renderElem(vNode);
};

export default ({ children, nodes, ...other }) => {
    const [state, setState] = useState({
        initialContent: '<!DOCTYPE html><html><head></head><body></body></html>',
    });

    const ref = useRef();

    const getDocument = () => {
        // const _window = element.contentWindow;
        // const _document = element.contentDocument;
        return ref.current.contentDocument;
    };

    const initial = () => {
        const _document = getDocument();

        if (!_document.body) {
            _document.open('text/html', 'replace');
            _document.write(state.initialContent);
            _document.close();
        }

        const rootApp = render(nodes);

        console.log(rootApp);

        // getDocument().body.appendChild(rootApp);
        getDocument()
            .querySelector('html')
            .replaceChild(rootApp.querySelector('body'), getDocument().querySelector('body'));

        console.log(rootApp.querySelector('head'));

        getDocument()
            .querySelector('html')
            .replaceChild(rootApp.querySelector('head'), getDocument().querySelector('head'));
    };

    useEffect(() => {
        if (ref.current) {
            initial();
        }
    }, []);

    return <iframe {...other} ref={ref} sandbox="allow-scripts allow-same-origin"></iframe>;
};
