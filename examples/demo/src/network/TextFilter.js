import { h } from '../core';

export default () => (
    <div className="filter-text-filter">
        <span style={{ display: 'inline-block' }}>
            <div class="text-prompt-root">
                <span
                    class="filter-input-field text-prompt"
                    role="textbox"
                    contenteditable="plaintext-only"
                    data-placeholder="Filter"
                    aria-placeholder="Filter"
                ></span>
            </div>
        </span>
    </div>
);
