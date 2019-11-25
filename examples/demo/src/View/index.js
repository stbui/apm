import React, { useRef, useEffect, useState } from 'react';
import { Widget, TabbedPane, Toolbar, ToolbarButton, Icon, Checkbox } from '../components';
import Frame from './Frame';
import { log } from './log';
import activities from './activities.json';

import './index.scss';

export default () => {
    const ref = useRef();
    const [state, setState] = useState({ left: 0, top: 20 });

    useEffect(() => {
        if (ref.current) {
            const width = ref.current.clientWidth;
            const height = ref.current.clientHeight;
            console.log(width, height);
            setState({ left: (width - 375) / 2 });
        }
    }, []);

    console.log(activities.activities[0].data);
    console.log(log.session.snapshot);

    return (
        <div class="widget vbox">
            <div class="vbox flex-auto" ref={ref}>
                <div
                    style={{
                        width: '375px',
                        height: '667px',
                        marginLeft: state.left + 'px',
                        marginTop: state.top + 'px',
                    }}
                >
                    <Frame id="viewer" nodes={activities.activities[0].data.snapshot}>
                        <div>demo</div>
                    </Frame>
                </div>
            </div>
            {/* <div class="widget hbox">
                <Toolbar>1</Toolbar>
            </div> */}
        </div>
    );
};
