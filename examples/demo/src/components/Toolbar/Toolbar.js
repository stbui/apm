import React from 'react';

export default ({ children }) => {
    return (
        <div class="toolbar">
            <div class="toolbar-shadow">{children}</div>
        </div>
    );
};
