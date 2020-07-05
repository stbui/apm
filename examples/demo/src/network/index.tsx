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

export default ({ addNewNetworkRequests }) => {
    const [request, setRequest] = useState([]);

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
                                <SplitWidget drag={true}>
                                    <SplitWidget.Sidebar maximized={true}>
                                        {request.length ? <NetworkLogView data={request} /> : null}
                                    </SplitWidget.Sidebar>
                                    <SplitWidget.Main>
                                        <NetworkDetailsView />
                                    </SplitWidget.Main>
                                </SplitWidget>
                            </div>
                        </div>
                    </SplitWidget.Main>
                </SplitWidget>
            </div>
        </Widget>
    );
};
