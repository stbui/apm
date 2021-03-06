import React, { useRef, useEffect, useState, useMemo } from 'react';
import { SplitWidget, DataGrid } from '../../components';
import NetworkSummaryBar from '../NetworkSummaryBar';
import NetworkWaterfallColumn from '../NetworkWaterfallColumn';
import NetworkStatusPane from '../NetworkStatusPane';

// let columns = [
//     {
//         id: 'name',
//         title: 'Name',
//         width: 200,
//     },
//     {
//         id: 'url',
//         title: 'Url',
//         width: 508,
//     },
//     {
//         id: 'status',
//         title: 'Status',
//         width: 50,
//     },
//     {
//         id: 'type',
//         title: 'Type',
//         width: 153,
//     },
//     {
//         id: 'initiator',
//         title: 'Initiator',
//         width: 254,
//     },
//     {
//         id: 'size',
//         title: 'Size',
//         width: 80,
//     },
//     {
//         id: 'time',
//         title: 'Time',
//         width: 80,
//     },
// ];

// const data = [
//     {
//         name: 'inspector.html',
//         status: 304,
//         type: 'document',
//         initiator: 'Other',
//         size: '2',
//         time: '2',
//     },
// ];

let _lastWheelTime = 0;

export default ({ columns, data, displayColumName, onDataGridClickCell }) => {
    const refWaterfallScroll: any = useRef();
    const [height, setHeigth] = useState(0);
    const [waterfallContentHeight, setWaterfallContentHeigth] = useState(231);
    const [dataGridBodyScrollTop, setDataGridBodyScrollTop] = useState(0);

    const onRef = dom => setHeigth(dom.offsetHeight);

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

    const onDataGridCell = cell => {
        onDataGridClickCell && onDataGridClickCell(cell);
    };

    return (
        <div className="widget vbox" id="network-container" slot="insertion-point-sidebar">
            <div className="vbox flex-auto split-widget">
                <SplitWidget>
                    <SplitWidget.Main>
                        <div className="widget vbox">
                            <DataGrid columns={columns} data={data}>
                                <DataGrid.Body
                                    columns={columns}
                                    data={data}
                                    scrollTop={dataGridBodyScrollTop}
                                    onMouseWheel={onDataGridBodyMouseWheel}
                                    onCell={onDataGridCell}
                                ></DataGrid.Body>
                            </DataGrid>
                        </div>
                    </SplitWidget.Main>
                    {!displayColumName ? (
                        <SplitWidget.Sidebar onRef={onRef} width={200}>
                            <NetworkWaterfallColumn
                                data={data}
                                width={200}
                                height={height}
                                onMouseWheel={onWaterfallMouseWheel}
                            >
                                <div ref={refWaterfallScroll} className="network-waterfall-v-scroll small">
                                    <div
                                        className="network-waterfall-v-scroll-content"
                                        style={{
                                            height: height + 'px',
                                        }}
                                    ></div>
                                </div>
                            </NetworkWaterfallColumn>
                        </SplitWidget.Sidebar>
                    ) : null}
                </SplitWidget>
            </div>
            <NetworkSummaryBar count={data.length} transferSize={0} resourceSize={0} />
            {/* <NetworkStatusPane /> */}
        </div>
    );
};
