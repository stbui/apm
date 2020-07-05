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

const Resizer = () => {
    const ref = useRef();
    const [position, setPositionn] = useState(200);

    const onDrop = ({ clientX, clientY }) => {
        console.log(clientX);
    };
    const dragEnter = ({ clientX, clientY }) => {
        console.log(clientX);
    };
    const onDragStart = ({ clientX, clientY }) => {
        console.log(clientX);
    };
    const onDragEnd = ({ clientX, clientY }) => {
        console.log(clientX);
        setPositionn(clientX);
    };
    const ondragleave = ({ clientX, clientY }) => {
        console.log(clientX);
    };
    const ondragover = ({ clientX, clientY }) => {
        console.log(clientX);
    };

    return (
        <div
            draggable
            className="shadow-split-widget-resizer"
            style={{ cursor: 'ew-resize', left: position, marginRight: -3, background: '#f00' }}
            onDrop={onDrop}
            onDragEnter={dragEnter}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        ></div>
    );
};

const SplitWidget: any = ({ children, direction, drag }) => {
    const _direction = direction === 'vertical' ? 'vbox' : 'hbox';

    return (
        <div className={`widget shadow-split-widget ${_direction}`}>
            {children}
            {drag ? <Resizer /> : null}
        </div>
    );
};

export default SplitWidget;
