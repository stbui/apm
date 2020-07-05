import React from 'react';

export default ({ count, transferSize, resourceSize }) => {
    return (
        <div className="network-summary-bar toolbar">
            <div className="toolbar-shadow">
                <div className="toolbar-text toolbar-item" aria-label="502 requests">
                    {count} requests
                </div>
                <div className="toolbar-divider toolbar-item"></div>
                <div className="toolbar-text toolbar-item" aria-label="915 B transferred">
                    {transferSize}&nbsp;B transferred
                </div>
                <div className="toolbar-divider toolbar-item"></div>
                <div className="toolbar-text toolbar-item" aria-label="4693505 B resources">
                    {resourceSize}&nbsp;MB resources
                </div>
                <div className="toolbar-divider toolbar-item"></div>
                <div className="toolbar-text toolbar-item" aria-label="Finish: 2.25&nbsp;s">
                    Finish: 0&nbsp;s
                </div>
                <div className="toolbar-divider toolbar-item"></div>
                <div
                    className="toolbar-text toolbar-item"
                    aria-label="DOMContentLoaded: 432&nbsp;ms"
                    style="color: rgb(8, 103, 203);"
                >
                    DOMContentLoaded: 0&nbsp;ms
                </div>
                <div className="toolbar-divider toolbar-item"></div>
                <div
                    className="toolbar-text toolbar-item"
                    aria-label="Load: 436&nbsp;ms"
                    style="color: rgb(179, 20, 18);"
                >
                    Load: 0&nbsp;ms
                </div>
            </div>
        </div>
    );
};
