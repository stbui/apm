import React from 'react';

// https://github.com/bokuweb/re-resizable/blob/master/src/index.tsx

const Resize = ({ children, width, height, minConstraints, maxConstraints }) => {
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e);
    };

    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        console.log(e);
    };

    return (
        <div
            style={{ height: 20, cursor: 'ns-resize', background: '#ccc' }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
        >
            {children}
        </div>
    );
};

export default Resize;
