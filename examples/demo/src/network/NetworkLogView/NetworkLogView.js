import React from 'react';
import { SplitWidget, DataGrid } from '../../components';
import NetworkSummaryBar from '../NetworkSummaryBar';
import NetworkStatusPane from '../NetworkStatusPane';

const Demo = () => <div>1</div>;

export default () => {
    return (
        <div class="widget vbox" id="network-container">
            <div class="vbox flex-auto split-widget">
                <Demo>123</Demo>
                <SplitWidget.Sidebar>1234</SplitWidget.Sidebar>
                <SplitWidget>
                    1234
                    <SplitWidget.Main>
                        <div class="widget vbox">
                            <DataGrid />
                        </div>
                    </SplitWidget.Main>
                </SplitWidget>
                {/* <div class="widget vbox network-waterfall-view">
                    <canvas
                        tabindex="0"
                        width="398"
                        height="864"
                        style="width: 199px; height: 432px;"
                    ></canvas>

                    <div class="network-waterfall-header small">
                        <div>Waterfall</div>
                        <div class="sort-order-icon-container">
                            <span
                                is="ui-icon"
                                class="sort-order-icon spritesheet-smallicons smallicon-triangle-up icon-mask"
                                style="--spritesheet-position:-20px 10px; width: 10px; height: 10px;"
                            ></span>
                        </div>
                    </div>
                </div> */}
            </div>
            <NetworkSummaryBar />
            {/* <NetworkStatusPane /> */}
        </div>
    );
};
