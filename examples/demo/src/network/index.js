import React from 'react';

import NetworkToolbar from './NetworkToolbar';
import FilterBar from './FilterBar';
import NetworkSettingsPane from './NetworkSettingsPane';
import NetworkOverviewPanel from './NetworkOverviewPanel';
import NetworkLogView from './NetworkLogView';

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
                    <div class="widget vbox">
                        <NetworkToolbar />
                        <FilterBar />
                        <NetworkSettingsPane />
                        <div className="network-film-strip-placeholder"></div>

                        <div class="widget vbox" id="network-overview-panel">
                            <NetworkOverviewPanel />
                        </div>

                        <div className="vbox flex-auto split-widget">
                            <SplitWidget
                                sidebar={<NetworkLogView />}
                            ></SplitWidget>
                        </div>
                    </div>
                </SplitWidget>
            </div>
        </div>
    );
};
