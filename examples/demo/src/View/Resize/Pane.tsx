import React from 'react';

const Pane = ({ children, className, split, style: styleProps, size, eleRef }) => {
    const classes = ['shadow-split-widget-contents', split, className];

    let style: any = {
        flex: 1,
        position: 'relative',
        outline: 'none',
    };

    if (size !== undefined) {
        if (split === 'vertical') {
            style.width = size;
        } else {
            style.height = size;
            style.display = 'flex';
        }
        style.flex = 'none';
    }

    style = Object.assign({}, style, styleProps || {});

    return (
        <div ref={eleRef} className={classes.join(' ')} style={style}>
            {children}
        </div>
    );
};

export default Pane;
