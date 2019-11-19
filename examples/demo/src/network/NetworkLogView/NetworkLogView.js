import React, { useRef, useEffect, useState } from 'react';
import { SplitWidget, DataGrid } from '../../components';
import NetworkSummaryBar from '../NetworkSummaryBar';
import NetworkWaterfallColumn from '../NetworkWaterfallColumn';
import NetworkStatusPane from '../NetworkStatusPane';

export default () => {
    const [height, setHeigth] = useState(0);

    const onRef = ref => {
        setHeigth(ref.current.offsetHeight);
    };

    const onScroll = () => {};
    const onBodyScroll = () => {};

    return (
        <div class="widget vbox" id="network-container">
            <div class="vbox flex-auto split-widget">
                <SplitWidget drag>
                    <SplitWidget.Main>
                        <div class="widget vbox">
                            <DataGrid onBodyScroll={onBodyScroll} />
                        </div>
                    </SplitWidget.Main>
                    <SplitWidget.Sidebar Ref={onRef} width={200}>
                        <NetworkWaterfallColumn
                            width={200}
                            height={height}
                            onScroll={onScroll}
                        />
                    </SplitWidget.Sidebar>
                </SplitWidget>
            </div>
            <NetworkSummaryBar />
            {/* <NetworkStatusPane /> */}
        </div>
    );
};
