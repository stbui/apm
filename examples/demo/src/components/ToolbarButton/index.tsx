import React from 'react';
import './index.scss';

export default ({ children, text, state }) => {
    return (
        <button className={`toolbar-button toolbar-item toolbar-has-glyph toolbar-state-${state}`}>
            {children}
            <div className="toolbar-text hidden">{text}</div>
        </button>
    );
};
