import React from 'react';

export default ({ children }) => {
    return (
        <div className="text-prompt-root">
            <span
                className="filter-input-field text-prompt"
                role="textbox"
                contenteditable="plaintext-only"
                data-placeholder="Filter"
                aria-placeholder="Filter"
            ></span>
        </div>
    );
};
