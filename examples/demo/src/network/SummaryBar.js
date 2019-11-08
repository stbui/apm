import { h } from '../core';

export default () => {
    return (
        <div className="toolbar network-summary-bar">
            <div className="toolbar-shadow">
                {/* <div className="toolbar-text">
            <div className="toolbar-item">
                <button className="toolbar-button">
                    <div className="toolbar-text hidden">
                        button
                    </div>
                </button>
            </div>
        </div>
        <div className="toolbar-divider"></div>
        <div className="toolbar-text">
            <div className="toolbar-item checkbox">
                <input type="checkbox" /> Disable cache
            </div>
        </div>
        <div className="toolbar-divider"></div>
        <div className="toolbar-text">
            <div className="toolbar-item">
                <select className="toolbar-select-container">
                    <option value="1">1</option>
                </select>
            </div>
        </div>
        <div className="toolbar-text">
            <div className="toolbar-item">
                <div className="toolbar-input">
                    <span className="toolbar-input-prompt">
                        <input type="text" />
                    </span>
                </div>
            </div>
        </div> */}

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
