import React, { useRef, useEffect, useState } from 'react';
import { SplitWidget, DataGrid } from '../../components';
import NetworkSummaryBar from '../NetworkSummaryBar';
import NetworkWaterfallColumn from '../NetworkWaterfallColumn';
import NetworkStatusPane from '../NetworkStatusPane';

const columns = [
    {
        id: 'name',
        title: 'Name',
        width: 200,
    },
    {
        id: 'url',
        title: 'Url',
        width: 508,
    },
    {
        id: 'status',
        title: 'Status',
        width: 50,
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
        width: 80,
    },
    {
        id: 'time',
        title: 'Time',
        width: 80,
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
];

export default ({ data }) => {
    const refWaterfallScroll = useRef();
    const [height, setHeigth] = useState(0);
    const [waterfallContentHeight, setWaterfallContentHeigth] = useState(800);
    const [dataGridBodyScrollTop, setDataGridBodyScrollTop] = useState(0);

    const onRef = dom => {
        setHeigth(dom.offsetHeight);
    };

    let _lastWheelTime = 0;

    const _updateScrollerWidthIfNeeded = () => {};

    const _syncScrollers = waterfallScroller => {
        _updateScrollerWidthIfNeeded();
        setDataGridBodyScrollTop(waterfallScroller.scrollTop);
    };

    const _onMouseWheel = (event, shouldConsume) => {
        if (shouldConsume) {
            event.stopImmediatePropagation();
            event.preventDefault();
        }

        const waterfallScroller = refWaterfallScroll.current;
        const hasRecentWheel = Date.now() - _lastWheelTime < 80;

        waterfallScroller.scrollBy({ top: -event.wheelDeltaY, behavior: hasRecentWheel ? 'instant' : 'smooth' });
        _syncScrollers(waterfallScroller);
        _lastWheelTime = Date.now();
    };

    const onWaterfallMouseWheel = event => _onMouseWheel(event, false);
    const onDataGridBodyMouseWheel = event => _onMouseWheel(event, true);

    return (
        <div className="widget vbox" id="network-container">
            <div className="vbox flex-auto split-widget">
                <SplitWidget drag>
                    <SplitWidget.Main>
                        <div className="widget vbox">
                            <DataGrid columns={columns} data={data}>
                                <DataGrid.Body
                                    columns={columns}
                                    data={data}
                                    scrollTop={dataGridBodyScrollTop}
                                    onMouseWheel={onDataGridBodyMouseWheel}
                                ></DataGrid.Body>
                            </DataGrid>
                        </div>
                    </SplitWidget.Main>
                    <SplitWidget.Sidebar onRef={onRef} width={200}>
                        <NetworkWaterfallColumn
                            data={data}
                            width={200}
                            height={height}
                            onMouseWheel={onWaterfallMouseWheel}
                        >
                            <div ref={refWaterfallScroll} class="network-waterfall-v-scroll small">
                                <div
                                    className="network-waterfall-v-scroll-content"
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
