import React from 'react';
import { SplitWidget, DataGrid } from '../../components';
import NetworkSummaryBar from '../NetworkSummaryBar';
import NetworkWaterfallColumn from '../NetworkWaterfallColumn';
import NetworkStatusPane from '../NetworkStatusPane';

export default () => {
    return (
        <div class="widget vbox" id="network-container">
            <div class="vbox flex-auto split-widget">
                <SplitWidget drag>
                    <SplitWidget.Main>
                        <div class="widget vbox">
                            <DataGrid />
                        </div>
                    </SplitWidget.Main>
                    <SplitWidget.Sidebar width={200}>
                        <NetworkWaterfallColumn />
                    </SplitWidget.Sidebar>
                </SplitWidget>
            </div>
            <NetworkSummaryBar />
            {/* <NetworkStatusPane /> */}
        </div>
    );
};
