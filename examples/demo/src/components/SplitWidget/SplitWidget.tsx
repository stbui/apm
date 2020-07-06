import React, { useRef, useEffect, useState } from 'react';

export const Sidebar = ({ onRef, children, maximized, width }) => {
    const ref: any = useRef();

    const cls = `shadow-split-widget-contents shadow-split-widget-sidebar vbox ${maximized ? 'maximized' : ''}`;

    useEffect(() => {
        if (ref.current) {
            onRef && onRef(ref.current);
        }
    }, [ref]);

    return (
        <div ref={ref} className={cls} style={{ flexBasis: width + 'px' }}>
            {children}
        </div>
    );
};

export const Main = ({ ref, children, maximized }) => {
    const cls = `shadow-split-widget-contents shadow-split-widget-main vbox ${maximized ? 'maximized' : ''}`;

    return (
        <div ref={ref} className={cls}>
            {children}
        </div>
    );
};

export const Resizer = ({ onDrap, x = 0 }) => {
    const [position, setPosition] = useState(x);

    const onMousedown = () => {
        document.onmousemove = ({ clientX }) => {
            onDrap && onDrap(clientX);
            setPosition(clientX);
            return false;
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
        return false;
    };

    return (
        <div
            className="shadow-split-widget-resizer"
            style={{ cursor: 'ew-resize', left: position, marginRight: -3,  }}
            onMousedown={onMousedown}
        ></div>
    );
};

const SplitWidget: any = ({ children, direction, drag, onDrap, x }) => {
    const _direction = direction === 'vertical' ? 'vbox' : 'hbox';

    return (
        <div className={`widget shadow-split-widget ${_direction}`}>
            {children}
            {drag ? <Resizer onDrap={onDrap} key={x} x={x} /> : null}
        </div>
    );
};

export default SplitWidget;
