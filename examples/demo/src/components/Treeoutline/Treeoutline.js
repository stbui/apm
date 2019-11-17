import React from 'react';

export default ({ children }) => {
    return (
        <ol class="tree-outline tree-outline-dense" role="tree" tabindex="-1">
            {children}
        </ol>
    );
};
