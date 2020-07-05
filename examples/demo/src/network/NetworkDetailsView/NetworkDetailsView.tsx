import React, { useState } from 'react';
import { Widget, TabbedPane, Toolbar, ToolbarButton, Icon, Checkbox, Treeoutline } from '../../components';

import {
    Cross as CrossIcon,
    CrossRedHover as CrossRedHoverIcon,
    CrossRedActive as CrossRedActiveIcon,
    CrossRedHover,
} from '../../components/Icon';

import RequestHeadersView from '../RequestHeadersView';
import RequestPreviewView from '../RequestPreviewView';
import RequestResponseView from '../RequestResponseView';
import RequestInitiatorView from '../RequestInitiatorView';
import RequestTimingView from '../RequestTimingView';
import RequestCookiesView from '../RequestCookiesView';

const renderModule = module => {
    switch (module) {
        case 0: {
            return <RequestHeadersView />;
        }
        case 1: {
            return <RequestPreviewView />;
        }
        case 2: {
            return <RequestResponseView />;
        }
        case 3: {
            return <RequestInitiatorView />;
        }
        case 4: {
            return <RequestTimingView />;
        }
        case 5: {
            return <RequestCookiesView />;
        }
        default: {
            return <RequestHeadersView />;
        }
    }
};

const tablistData = [
    { label: 'Headers', width: 65 },
    { label: 'Preview', width: 65 },
    { label: 'Response', width: 73 },
    { label: 'Initiator', width: 60 },
    { label: 'Timing', width: 56 },
    { label: 'Cookies', width: 63 },
];

export default () => {
    const [module, setModule] = useState(0);

    const onTabbedPaneChange = key => setModule(key);

    return (
        <div class="widget vbox network-details-view" slot="insertion-point-main">
            <div class="vbox flex-auto tabbed-pane network-item-view">
                <div class="widget vbox tabbed-pane-shadow">
                    <TabbedPane
                        tablistData={tablistData}
                        onChange={onTabbedPaneChange}
                        headerLeft={
                            <div class="toolbar-shadow">
                                <div is="dt-close-button" class="toolbar-item" style="margin: 0px 5px;">
                                    <div class="close-button" aria-label="Close" role="button">
                                        <CrossIcon />
                                        {/* <CrossRedHoverIcon /> */}
                                        {/* <CrossRedActiveIcon /> */}
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        {renderModule(module)}
                    </TabbedPane>
                </div>
            </div>
        </div>
    );
};
