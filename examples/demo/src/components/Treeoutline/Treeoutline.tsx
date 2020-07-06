import React, { useState, useRef, useEffect } from 'react';

export const Item = ({ title, children, defaultExpanded }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    const onClick = event => {
        setExpanded(!expanded);
    };

    const cls = expanded ? ' expanded' : '';

    return (
        <React.Fragment>
            <li role="treeitem" className={'parent' + cls} aria-expanded={expanded} onClick={onClick}>
                <div className="selection fill"></div>
                {title ? <span className="tree-element-title">{title}</span> : null}
            </li>
            <ol className={'children' + cls} role="group">
                {children}
            </ol>
        </React.Fragment>
    );
};

export const Treeoutline = ({ children, type, ...other }) => {
    const dense = type == 'dense' ? 'tree-outline-dense' : '';
    return (
        <ol className={`tree-outline ${dense}`} role="tree" tabindex="-1">
            {children}
        </ol>
    );
};

export default Treeoutline;
