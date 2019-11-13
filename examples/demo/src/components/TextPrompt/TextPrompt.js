import React from 'react';

export default ({ children }) => {
    return (
        <div class="text-prompt-root">
            <span
                class="filter-input-field text-prompt"
                role="textbox"
                contenteditable="plaintext-only"
                data-placeholder="Filter"
                aria-placeholder="Filter"
            ></span>
        </div>
    );
};
