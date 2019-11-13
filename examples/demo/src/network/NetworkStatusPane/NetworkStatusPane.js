import React from 'react';
import {
    Widget,
    TabbedPane,
    Toolbar,
    ToolbarButton,
    Icon,
    Checkbox,
} from '../../components';

export default () => {
    return (
        <div class="network-status-pane fill">
            <div class="recording-hint">
                <span>Recording network activity…</span>
                <br />
                <span>
                    Perform a request or hit <b>⌘ R</b> to record the reload.
                </span>
                <br />
                <x-link
                    class=" devtools-link"
                    role="link"
                    tabindex="0"
                    target="_blank"
                    href="https://developers.google.com/web/tools/chrome-devtools/network/?utm_source=devtools&amp;utm_campaign=2019Q1"
                    style="display: inline; cursor: pointer;"
                >
                    Learn more
                </x-link>
            </div>
        </div>
    );
};
