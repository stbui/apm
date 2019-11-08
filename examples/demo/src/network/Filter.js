import { h } from '../core';

export default () => {
    return (
        <div className="toolbar network-summary-bar">
            <div className="toolbar-shadow">
                <div className="filter-bar">
                    <div className="filter-text-filter">
                        <span className="filter-input-field">
                            <input
                                type="text"
                                placeholder="Filter"
                                className="text-prompt"
                            />
                        </span>
                    </div>

                    <div className="filter-checkbox-filter">
                        <label
                            is="dt-checkbox"
                            className="checkboxTextLabel dt-checkbox-text"
                        >
                            <input type="checkbox" />
                            Hide data URLs
                        </label>
                    </div>

                    <div className="filter-bitset-filter">
                        <span>All</span>
                        <div className="filter-bitset-filter-divider"></div>
                        <span>XHR</span>
                        <span>JS</span>
                        <span>CSS</span>
                        <span>Img</span>
                        <span>Media</span>
                        <span>Font</span>
                        <span>Doc</span>
                        <span>WS</span>
                        <span>Manifest</span>
                        <span>Other</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
