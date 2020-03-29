import React, { useRef, useEffect, useState } from 'react';
import { Widget, TabbedPane, Toolbar } from '../components';
import { activities } from './activities.json';
import Timelline from './Player/Timelline';
import Controls from './Player/Controls';
import Player from './Player';

import './index.scss';

export default () => {
    const [timelineValue, setTimelineValue] = useState(27451);

    // return (
    //     <div style={{ background: '#242628' }}>
    //         <div style="height: 212px;"></div>
    //         <Controls>
    //             <Timelline min={0} max={144675} value={timelineValue}></Timelline>
    //         </Controls>
    //     </div>
    // );

    return <Player />;
};
