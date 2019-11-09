import { h } from '../core';

export default () => (
    <div className="filter-text-filter">
        <span
            className="filter-input-field"
            style={{ display: 'inline-block' }}
        >
            <input type="text" placeholder="Filter" className="text-prompt" />
        </span>
    </div>
);
