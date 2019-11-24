import React, { useRef, useEffect } from 'react';
import { Widget, TabbedPane, Toolbar, ToolbarButton, Icon, Checkbox, SplitWidget, Treeoutline } from '../components';

import './index.scss';

export default () => {
    const ref = useRef();

    const init = () => {
        const element = ref.current;
        const _window = element.contentWindow;
        const _document = element.contentDocument;

        if (!_document.body) {
            _document.open();
            _document.write('<html><head></head><body></body></html>');
            _document.close();
        }

        _document.write('<div>1</div>')
    };

    useEffect(() => {
        if (ref.current) {
            init();
        }
    }, []);

    return (
        <div class="widget vbox">
            <div class="vbox flex-auto">
                <iframe ref={ref} id="viewer" sandbox="allow-scripts allow-same-origin"></iframe>
            </div>
            <div class="widget hbox">
                <Toolbar>1</Toolbar>
            </div>
        </div>
    );
};
