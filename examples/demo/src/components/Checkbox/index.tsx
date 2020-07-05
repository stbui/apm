import React from 'react';
import './index.scss';

export default ({ children, label, id, onChange }) => {
    const $id = React.useMemo(() => (id ? id : Math.floor(Math.random() * 100)), [id]);

    return (
        <span is="dt-checkbox" className="toolbar-item checkbox">
            <input type="checkbox" id={`ui-checkbox-label-${$id}`} onChange={onChange} />
            <label className="dt-checkbox-text" for={`ui-checkbox-label-${$id}`}>
                {label}
                {children}
            </label>
        </span>
    );
};
