import React, { useRef, useEffect, useState } from 'react';
import { Widget, TabbedPane, Toolbar } from '../components';
import Frame from './Frame';
import activities from './activities.json';
import { Sandbox } from './sandbox';

import './index.scss';

let endTimer = 5000;
let timerId = null;
let lastTimestamp = performance.now();

export default () => {
    const ref = useRef();
    const [state, setState] = useState({ width: 1000, height: 600, left: 0, top: 0, bottom: 27 });
    const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0 });
    const [nodes, setNodes] = useState(activities.activities[0].data.snapshot);
    const [duration, setDuration] = useState();

    const addedOrMoved = () => {};

    const removed = () => {};

    const moveCursor = time => {};

    const beginTimer = time => {
        timerId = window.requestAnimationFrame(beginTimer);
        if (lastTimestamp <= endTimer) {
            lastTimestamp = time;
            const du = (time / 1000).toFixed(3);
            setDuration(du);

            moveCursor(time);
            addedOrMoved();
        } else {
            window.cancelAnimationFrame(timerId);
        }
    };

    useEffect(() => {
        if (ref.current) {
            // const width = ref.current.clientWidth;
            // const height = ref.current.clientHeight;
            // setState({ left: (width - state.width) / 2 });

            // window.requestAnimationFrame(beginTimer);

            const sandbox = new Sandbox({ container: ref.current });
            sandbox.run(activities.activities[0].data.snapshot);
        }
    }, []);

    return (
        <div class="widget vbox">
            <div class="vbox flex-auto">
                <div
                    style={{
                        width: state.width + 'px',
                        height: state.height + 'px',
                        marginLeft: state.left + 'px',
                        marginTop: state.top + 'px',
                        marginBottom: state.bottom + 'px',
                    }}
                    ref={ref}
                ></div>
            </div>
            <div className="controll">
                <Toolbar>开始</Toolbar>

                <Toolbar>
                    <div className="progress"></div>
                </Toolbar>
                <Toolbar>
                    {duration}/{endTimer}
                </Toolbar>
            </div>
        </div>
    );
};
