import React, { useRef, useEffect, useState } from 'react';
import { SplitWidget, DataGrid } from '../../components';
import NetworkSummaryBar from '../NetworkSummaryBar';
import NetworkWaterfallColumn from '../NetworkWaterfallColumn';
import NetworkStatusPane from '../NetworkStatusPane';

const columns = [
    {
        id: 'name',
        title: 'Name',
        width: 508,
    },
    {
        id: 'status',
        title: 'Status',
        width: 153,
    },
    {
        id: 'type',
        title: 'Type',
        width: 153,
    },
    {
        id: 'initiator',
        title: 'Initiator',
        width: 254,
    },
    {
        id: 'size',
        title: 'Size',
        width: 153,
    },
    {
        id: 'time',
        title: 'Time',
        width: 153,
    },
];

const data = [
    {
        name: 'inspector.html',
        status: 304,
        type: 'document',
        initiator: 'Other',
        size: '2',
        time: '2',
    },
    {
        name: 'root.js',
        status: 200,
        type: 'script',
        initiator: 'inspector.html',
        size: '2',
        time: '2',
    },
    {
        name: 'Runtime.js',
        status: 200,
        type: 'script',
        initiator: 'root.js:5',
        size: '2',
        time: '2',
    },
    {
        name: 'inspector.html',
        status: 304,
        type: 'document',
        initiator: 'Other',
        size: '2',
        time: '2',
    },
    {
        name: 'root.js',
        status: 200,
        type: 'script',
        initiator: 'inspector.html',
        size: '2',
        time: '2',
    },
    {
        name: 'Runtime.js',
        status: 200,
        type: 'script',
        initiator: 'root.js:5',
        size: '2',
        time: '2',
    },
    {
        name: 'inspector.html',
        status: 304,
        type: 'document',
        initiator: 'Other',
        size: '2',
        time: '2',
    },
    {
        name: 'root.js',
        status: 200,
        type: 'script',
        initiator: 'inspector.html',
        size: '2',
        time: '2',
    },
    {
        name: 'Runtime.js',
        status: 200,
        type: 'script',
        initiator: 'root.js:5',
        size: '2',
        time: '2',
    },
    {
        name: 'inspector.html',
        status: 304,
        type: 'document',
        initiator: 'Other',
        size: '2',
        time: '2',
    },
    {
        name: 'root.js',
        status: 200,
        type: 'script',
        initiator: 'inspector.html',
        size: '2',
        time: '2',
    },
    {
        name: 'Runtime.js',
        status: 200,
        type: 'script',
        initiator: 'root.js:5',
        size: '2',
        time: '2',
    },
    {
        name: 'inspector.html',
        status: 304,
        type: 'document',
        initiator: 'Other',
        size: '2',
        time: '2',
    },
    {
        name: 'root.js',
        status: 200,
        type: 'script',
        initiator: 'inspector.html',
        size: '2',
        time: '2',
    },
    {
        name: 'Runtime.js',
        status: 200,
        type: 'script',
        initiator: 'root.js:5',
        size: '2',
        time: '2',
    },
    {
        name: 'inspector.html',
        status: 304,
        type: 'document',
        initiator: 'Other',
        size: '2',
        time: '2',
    },
    {
        name: 'root.js',
        status: 200,
        type: 'script',
        initiator: 'inspector.html',
        size: '2',
        time: '2',
    },
    {
        name: 'Runtime.js',
        status: 200,
        type: 'script',
        initiator: 'root.js:5',
        size: '2',
        time: '2',
    },
];

export default () => {
    const refWaterfallScroll = useRef();
    const [height, setHeigth] = useState(0);
    const [waterfallContentHeight, setWaterfallContentHeigth] = useState(800);

    const onRef = dom => {
        setHeigth(dom.offsetHeight);
    };

    let _lastWheelTime = 0;

    const onRefScroller = dom => {
        setRefWaterfallScroll(dom);
    };

    const onScroll = (event, scrollHeight) => {
        const waterfallScroller = refWaterfallScroll.current;
        const hasRecentWheel = Date.now() - _lastWheelTime < 80;

        waterfallScroller.scrollBy({
            top: -event.wheelDeltaY,
            behavior: hasRecentWheel ? 'instant' : 'smooth',
        });

        _lastWheelTime = Date.now();

        // console.log(waterfallScroller.scrollTop);

        // setWaterfallContentHeigth(scrollHeight);
    };

    // useEffect(() => {}, [refWaterfallScroll]);

    return (
        <div class="widget vbox" id="network-container">
            <div class="vbox flex-auto split-widget">
                <SplitWidget drag>
                    <SplitWidget.Main>
                        <div class="widget vbox">
                            <DataGrid columns={columns} data={data}>
                                <DataGrid.Body
                                    columns={columns}
                                    data={data}
                                    onScroll={onScroll}
                                ></DataGrid.Body>
                            </DataGrid>
                        </div>
                    </SplitWidget.Main>
                    <SplitWidget.Sidebar onRef={onRef} width={200}>
                        <NetworkWaterfallColumn
                            width={200}
                            height={height}
                            onRefScroller={onRefScroller}
                            onScroll={onScroll}
                        >
                            <div
                                ref={refWaterfallScroll}
                                class="network-waterfall-v-scroll small"
                            >
                                <div
                                    class="network-waterfall-v-scroll-content"
                                    style={{
                                        height: waterfallContentHeight + 'px',
                                    }}
                                ></div>
                            </div>
                        </NetworkWaterfallColumn>
                    </SplitWidget.Sidebar>
                </SplitWidget>
            </div>
            <NetworkSummaryBar />
            {/* <NetworkStatusPane /> */}
        </div>
    );
};
