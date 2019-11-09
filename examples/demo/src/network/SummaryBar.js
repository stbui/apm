import { h } from '../core';

export default () => {
    return (
        <div className="network-summary-bar toolbar">
            <div className="toolbar-shadow">
                <div className="toolbar-item">
                    <div className="toolbar-text">4 requests</div>
                    <div className="toolbar-divider"></div>
                    <div className="toolbar-text">109 KB transferred</div>
                    <div className="toolbar-divider"></div>
                    <div className="toolbar-text">456 KB resources</div>
                    <div className="toolbar-divider"></div>
                    <div className="toolbar-text">Finish: 366 ms</div>
                    <div className="toolbar-divider"></div>
                    <div className="toolbar-text" style={{ color: '#0867CB' }}>
                        DOMContentLoaded: 302 ms
                    </div>
                    <div className="toolbar-divider"></div>
                    <div className="toolbar-text" style={{ color: '#B31412' }}>
                        Load: 324 ms
                    </div>
                </div>
            </div>
        </div>
    );
};
