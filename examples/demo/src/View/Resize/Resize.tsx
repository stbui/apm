import React, { useEffect, useState } from 'react';
import ResizePanel from 'react-resize-panel';

// https://github.com/bokuweb/re-resizable/blob/master/src/index.tsx
// https://github.com/bjgrosse/react-resize-panel/blob/master/src/ResizePanel.js

const Resize = ({ children, width, height, minConstraints, maxConstraints }) => {
    const [state, setState] = useState({ isDragging: false, initialPos: 0, delta: 0 });

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e);
    };

    // const onMouseMove = (e: React.TouchEvent<HTMLDivElement>) => {
    //     console.log(e);
    // };

    const stopResize = () => {
        if (state.isDragging) {
            setState({
                isDragging: false,
                delta: 0,
                initialPos: 0,
            });
        }
    };

    const startResize = event => {
        setState({
            isDragging: true,
            initialPos: event.clientX,
            delta: 0,
        });
    };

    const resize = event => {
        if (state.isDragging) {
            const delta = event.clientX - state.initialPos;
            setState(prevState => ({ ...prevState, delta }));
        }
    };

    useEffect(() => {
        // window.addEventListener('mouseup', stopResize);
        // window.addEventListener('mouseleave', stopResize);
        // window.addEventListener('mousemove', resize);

        return () => {};
    }, []);

    return (
        <ResizePanel direction="e">
            <div className="panel sidebar">left panel</div>
        </ResizePanel>
    );
};

export default Resize;
