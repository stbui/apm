import React, { useRef, useEffect, useState } from 'react';
import { Widget, TabbedPane, Toolbar } from '../components';
import activities from './activities.json';
import { Sandbox } from './sandbox';
import { UserCursor } from './UserCursor';

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

    const activitie = (data, time) => {
        let timestamp;
        let index;
        let g = [];

        data.forEach(item => {
            if (item.time > time) {
                g.push(item);
            }

            timestamp = item.timestamp;
            index = item.index;
        });

        return {
            activities: g,
            lastEventTimestamp: timestamp,
            lastEventIndex: index,
            lastLogTimestamp: timestamp,
        };
    };

    useEffect(() => {
        if (ref.current) {
            // const width = ref.current.clientWidth;
            // const height = ref.current.clientHeight;
            // setState({ left: (width - state.width) / 2 });

            // window.requestAnimationFrame(beginTimer);

            // 鼠标
            const userCursor = new UserCursor(ref.current);
            userCursor.step();

            // 快照
            const sandbox = new Sandbox({ container: ref.current });
            sandbox.run(activities.activities[0].data.snapshot);
            console.log(activities);
            const { lastEventTimestamp, lastEventIndex } = activities;
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
