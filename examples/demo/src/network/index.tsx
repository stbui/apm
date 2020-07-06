import React, { useState, useEffect } from 'react';

import NetworkToolbar from './NetworkToolbar';
import FilterBar from './FilterBar';
import NetworkSettingsPane from './NetworkSettingsPane';
import NetworkLogView from './NetworkLogView';
import NetworkOverviewPanel from './NetworkOverviewPanel';
import RequestHeadersView from './RequestHeadersView';
import RequestTimingView from './RequestTimingView';
import NetworkDetailsView from './NetworkDetailsView';

import './networkPanel.scss';

import { Widget, TabbedPane, Toolbar, ToolbarButton, Icon, Checkbox, SplitWidget, Treeoutline } from '../components';

let columns = [
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

export default ({ addNewNetworkRequests }) => {
    const [request, setRequest] = useState([]);
    const [networkDetail, setNetworkDetail] = useState(false);
    const [position, setPosition] = useState(300);

    useEffect(() => {
        const req = addNewNetworkRequests.map(d => ({
            ...d.details.request,
            name: 'stbui.js',
            url: d.details.request.url,
            status: d.details.request.statusCode,
            type: 'script',
            initiator: 'stbui.js:5',
            time: d.details.request.endTime - d.details.request.timestamp,
            size: 0,
        }));

        setRequest(req);
    }, addNewNetworkRequests);

    const onDataGridClickCell = () => {
        columns = [
            {
                id: 'name',
                title: 'Name',
                width: 200,
            },
        ];
        setNetworkDetail(true);
    };
    const onNetworkDetailsClose = () => {
        columns = [
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
        setNetworkDetail(false);
    };
    const onResizer = value => {
        setPosition(value);
    };

    return (
        <Widget className="widget vbox panel network" aria-label="network">
            <div className="vbox flex-auto split-widget">
                <SplitWidget>
                    <SplitWidget.Main>
                        <div class="widget vbox">
                            <NetworkToolbar />
                            <FilterBar />
                            <NetworkSettingsPane />

                            <div className="network-film-strip-placeholder"></div>

                            {/* <div>
                                <div class="widget vbox" id="network-overview-panel">
                                    <NetworkOverviewPanel />
                                </div>
                            </div> */}
                            <div></div>
                            <div className="vbox flex-auto split-widget">
                                <SplitWidget>
                                    <SplitWidget.Sidebar
                                        maximized={!networkDetail}
                                        width={networkDetail ? position : null}
                                    >
                                        {request.length ? (
                                            <NetworkLogView
                                                columns={columns}
                                                data={request}
                                                displayColumName={networkDetail}
                                                onDataGridClickCell={onDataGridClickCell}
                                            />
                                        ) : null}
                                    </SplitWidget.Sidebar>
                                    {networkDetail ? (
                                        <SplitWidget.Main>
                                            <NetworkDetailsView onClose={onNetworkDetailsClose} />
                                        </SplitWidget.Main>
                                    ) : null}
                                    {networkDetail ? (
                                        <SplitWidget.Resizer x={position} onDrap={onResizer}></SplitWidget.Resizer>
                                    ) : null}
                                </SplitWidget>
                            </div>
                        </div>
                    </SplitWidget.Main>
                </SplitWidget>
            </div>
        </Widget>
    );
};
