import React from 'react';

export default ({ children }) => {
    return (
        <div className="toolbar">
            <div className="toolbar-shadow">{children}</div>
        </div>
    );
};
