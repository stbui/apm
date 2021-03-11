import React from 'react';
export const RESIZER_DEFAULT_CLASSNAME = 'Resizer';

const Resizer = ({
    className,
    onClick,
    onDoubleClick,
    onMouseDown,
    onTouchEnd,
    onTouchStart,
    resizerClassName,
    split,
    style,
}) => {
    const classes = [resizerClassName, split, className];

    return (
        <span
            className={classes.join(' ')}
            style={style}
            onMouseDown={event => onMouseDown(event)}
            onTouchStart={event => {
                event.preventDefault();
                onTouchStart(event);
            }}
            onTouchEnd={event => {
                event.preventDefault();
                onTouchEnd(event);
            }}
            onClick={event => {
                if (onClick) {
                    event.preventDefault();
                    onClick(event);
                }
            }}
            onDoubleClick={event => {
                if (onDoubleClick) {
                    event.preventDefault();
                    onDoubleClick(event);
                }
            }}
        />
    );
};

Resizer.defaultProps = {
    resizerClassName: RESIZER_DEFAULT_CLASSNAME,
};

export default Resizer;
