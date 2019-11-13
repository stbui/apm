import React from 'react';

export default () => {
    return (
        <div className="network-summary-bar toolbar">
            <div class="toolbar-shadow">
                <div
                    class="toolbar-text toolbar-item"
                    aria-label="502 requests"
                >
                    502 requests
                </div>
                <div class="toolbar-divider toolbar-item"></div>
                <div
                    class="toolbar-text toolbar-item"
                    aria-label="915 B transferred"
                >
                    915&nbsp;B transferred
                </div>
                <div class="toolbar-divider toolbar-item"></div>
                <div
                    class="toolbar-text toolbar-item"
                    aria-label="4693505 B resources"
                >
                    4.5&nbsp;MB resources
                </div>
                <div class="toolbar-divider toolbar-item"></div>
                <div
                    class="toolbar-text toolbar-item"
                    aria-label="Finish: 2.25&nbsp;s"
                >
                    Finish: 2.25&nbsp;s
                </div>
                <div class="toolbar-divider toolbar-item"></div>
                <div
                    class="toolbar-text toolbar-item"
                    aria-label="DOMContentLoaded: 432&nbsp;ms"
                    style="color: rgb(8, 103, 203);"
                >
                    DOMContentLoaded: 432&nbsp;ms
                </div>
                <div class="toolbar-divider toolbar-item"></div>
                <div
                    class="toolbar-text toolbar-item"
                    aria-label="Load: 436&nbsp;ms"
                    style="color: rgb(179, 20, 18);"
                >
                    Load: 436&nbsp;ms
                </div>
                <slot></slot>
            </div>
        </div>
    );
};
