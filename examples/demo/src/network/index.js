import React from 'react';

import NetworkToolbar from './NetworkToolbar';
import FilterBar from './FilterBar';
import NetworkSettingsPane from './NetworkSettingsPane';
import NetworkOverviewPanel from './NetworkOverviewPanel';
import NetworkLogView from './NetworkLogView';
import RequestHeadersView from './RequestHeadersView';

import './networkPanel.scss';

import {
    Widget,
    TabbedPane,
    Toolbar,
    ToolbarButton,
    Icon,
    Checkbox,
    SplitWidget,
    Treeoutline,
} from '../components';

export default () => {
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

                            <div
                                class="widget vbox"
                                id="network-overview-panel"
                            >
                                <NetworkOverviewPanel />
                            </div>

                            <div className="vbox flex-auto split-widget">
                                <SplitWidget>
                                    <SplitWidget.Sidebar
                                        maximized={false}
                                        drag={true}
                                        width={200}
                                    >
                                        <NetworkLogView />
                                    </SplitWidget.Sidebar>
                                    <SplitWidget.Main>
                                        <div
                                            class="widget vbox network-details-view"
                                            slot="insertion-point-main"
                                        >
                                            <div class="vbox flex-auto tabbed-pane network-item-view">
                                                <div class="widget vbox tabbed-pane-shadow">
                                                    <div class="tabbed-pane-header">
                                                        <div class="tabbed-pane-left-toolbar toolbar"></div>
                                                        <div class="tabbed-pane-header-contents">
                                                            <div
                                                                class="tabbed-pane-header-tabs"
                                                                role="tablist"
                                                                style=""
                                                            >
                                                                <div
                                                                    class="tabbed-pane-header-tab selected"
                                                                    id="tab-headers"
                                                                    role="tab"
                                                                    aria-selected="false"
                                                                    aria-label="Headers"
                                                                    style="width: 65px;"
                                                                >
                                                                    <span class="tabbed-pane-header-tab-title">
                                                                        Headers
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    class="tabbed-pane-header-tab"
                                                                    id="tab-preview"
                                                                    role="tab"
                                                                    aria-selected="true"
                                                                    aria-label="Preview"
                                                                    tabindex="0"
                                                                    style="width: 62px;"
                                                                >
                                                                    <span class="tabbed-pane-header-tab-title">
                                                                        Preview
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    class="tabbed-pane-header-tab"
                                                                    id="tab-response"
                                                                    role="tab"
                                                                    aria-selected="false"
                                                                    aria-label="Response"
                                                                    style="width: 73px;"
                                                                >
                                                                    <span class="tabbed-pane-header-tab-title">
                                                                        Response
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    class="tabbed-pane-header-tab"
                                                                    id="tab-timing"
                                                                    role="tab"
                                                                    aria-selected="false"
                                                                    aria-label="Timing"
                                                                    style="width: 56px;"
                                                                >
                                                                    <span class="tabbed-pane-header-tab-title">
                                                                        Timing
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="tabbed-pane-tab-slider enabled"
                                                                style="width: 62px; transform: translateX(0px) scaleY(0.75);"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div class="tabbed-pane-content">
                                                        {/* <div class="widget vbox request-view">
                                                            <div class="vbox flex-auto">
                                                                <div class="widget vbox">
                                                                    <div class="vbox flex-auto searchable-view"></div>
                                                                    <div class="toolbar"><div class="toolbar-shadow"><button class="toolbar-button toolbar-item toolbar-has-glyph toolbar-state-on" aria-label="Pretty print" aria-pressed="true"><span is="ui-icon" class="toolbar-glyph spritesheet-largeicons largeicon-pretty-print icon-mask" style="--spritesheet-position:-56px 48px; width: 28px; height: 24px;"></span><div class="toolbar-text hidden"></div></button><div class="toolbar-text toolbar-item">Line 1, Column 1</div><slot></slot></div></div>
                                                                </div>
                                                            </div>
                                                        </div> */}

                                                        <RequestHeadersView />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SplitWidget.Main>
                                </SplitWidget>
                            </div>
                        </div>
                    </SplitWidget.Main>
                </SplitWidget>
            </div>
        </div>
    );
};
