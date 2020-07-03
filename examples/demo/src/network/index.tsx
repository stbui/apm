import React, { useState, useEffect } from 'react';

import NetworkToolbar from './NetworkToolbar';
import FilterBar from './FilterBar';
import NetworkSettingsPane from './NetworkSettingsPane';
import NetworkOverviewPanel from './NetworkOverviewPanel';
import NetworkLogView from './NetworkLogView';
import RequestHeadersView from './RequestHeadersView';
import RequestTimingView from './RequestTimingView';

import './networkPanel.scss';

import { Widget, TabbedPane, Toolbar, ToolbarButton, Icon, Checkbox, SplitWidget, Treeoutline } from '../components';

const renderModule = module => {
    switch (module) {
        case 0: {
            return <RequestTimingView />;
        }
        case 1: {
            return <RequestTimingView />;
        }
        case 2: {
            return <RequestHeadersView />;
        }
        case 3: {
            return <RequestHeadersView />;
        }
        default: {
            return <RequestTimingView />;
        }
    }
};

const tablistData = [
    { label: 'Headers', width: 65 },
    { label: 'Preview', width: 65 },
    { label: 'Response', width: 73 },
    { label: 'Timing', width: 56 },
];

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
        }));
        setRequest(request.concat(req));
    }, addNewNetworkRequests);

    console.log(request);

    return (
        <div className="widget vbox panel network">
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

                            <div className="vbox flex-auto split-widget">
                                <SplitWidget>
                                    <SplitWidget.Sidebar
                                        maximized={true}
                                        drag={true}
                                        // width={200}
                                    >
                                        {request.length ? <NetworkLogView data={request} /> : <span></span>}
                                    </SplitWidget.Sidebar>
                                    {0 ? (
                                        <SplitWidget.Main>
                                            <div class="widget vbox network-details-view" slot="insertion-point-main">
                                                <div class="vbox flex-auto tabbed-pane network-item-view">
                                                    <TabbedPane
                                                        tablistData={tablistData}
                                                        headerLeft={
                                                            <div class="toolbar-shadow">
                                                                <div
                                                                    is="dt-close-button"
                                                                    class="toolbar-item"
                                                                    style="margin: 0px 5px;"
                                                                >
                                                                    <div
                                                                        class="close-button"
                                                                        aria-label="Close"
                                                                        role="button"
                                                                    >
                                                                        <span
                                                                            is="ui-icon"
                                                                            class="default-icon spritesheet-smallicons smallicon-cross"
                                                                            style="--spritesheet-position:-20px 70px; width: 10px; height: 10px;"
                                                                        ></span>
                                                                        <span
                                                                            is="ui-icon"
                                                                            class="hover-icon spritesheet-mediumicons mediumicon-red-cross-hover"
                                                                            style="--spritesheet-position:0px 16px; width: 16px; height: 16px;"
                                                                        ></span>
                                                                        <span
                                                                            is="ui-icon"
                                                                            class="active-icon spritesheet-mediumicons mediumicon-red-cross-active"
                                                                            style="--spritesheet-position:-48px 32px; width: 16px; height: 16px;"
                                                                        ></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    >
                                                        {/* <div class="widget vbox request-view">
                                                <div class="vbox flex-auto">
                                                    <div class="widget vbox">
                                                        <div class="vbox flex-auto searchable-view"></div>
                                                        <div class="toolbar"><div class="toolbar-shadow"><button class="toolbar-button toolbar-item toolbar-has-glyph toolbar-state-on" aria-label="Pretty print" aria-pressed="true"><span is="ui-icon" class="toolbar-glyph spritesheet-largeicons largeicon-pretty-print icon-mask" style="--spritesheet-position:-56px 48px; width: 28px; height: 24px;"></span><div class="toolbar-text hidden"></div></button><div class="toolbar-text toolbar-item">Line 1, Column 1</div><slot></slot></div></div>
                                                    </div>
                                                </div>
                                            </div> */}

                                                        {renderModule(module)}
                                                    </TabbedPane>
                                                </div>
                                            </div>
                                        </SplitWidget.Main>
                                    ) : null}
                                </SplitWidget>
                            </div>
                        </div>
                    </SplitWidget.Main>
                </SplitWidget>
            </div>
        </div>
    );
};
