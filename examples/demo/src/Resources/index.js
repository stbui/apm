import React from 'react';
import ApplicationPanelSidebar from './ApplicationPanelSidebar';
import './resourcesPanel.scss';

export default ({ children }) => {
    return (
        <div class="widget vbox panel resources">
            <div class="vbox flex-auto split-widget">
                <div class="widget vbox panel-sidebar">
                    <div class="widget vbox">
                        <ApplicationPanelSidebar />
                    </div>
                </div>

                <div class="widget vbox" slot="insertion-point-main">
                    <div class="vbox flex-auto">
                        <div class="vbox flex-auto"></div>
                    </div>
                    <div class="resources-toolbar toolbar"></div>
                </div>
                
            </div>
        </div>
    );
};
