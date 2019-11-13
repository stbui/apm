import React from 'react';
import './index';

export default ({ children, label, id }) => {
    return (
        <span is="dt-checkbox" className="toolbar-item checkbox">
            <input type="checkbox" id={`ui-checkbox-label${id}`} />
            <label className="dt-checkbox-text" for={`ui-checkbox-label${id}`}>
                {label}
                {children}
            </label>
        </span>
    );
};
