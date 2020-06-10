import React, { render, useState } from 'react';
import './style/index.scss';

import { RootView, TabbedPane, Toolbar, ToolbarButton, Icon, SplitWidget } from './components';
import Element from './Element';
import Network from './Network';
import Console from './Console';
import Timeline from './Timeline';
import Resources from './Resources';
import View from './View';
import { WebSocketConnection } from './sdk/Connections';

const renderModule = module => {
    switch (module) {
        case 0: {
            return <View />;
        }
        case 1: {
            return <Element />;
        }
        case 2: {
            return <Console />;
        }
        case 3: {
            return <Console />;
        }
        case 4: {
            return <Network />;
        }
        case 5: {
            return <Timeline />;
        }
        case 6: {
            return <Resources />;
        }
        default: {
            return <Network />;
        }
    }
};

const tablistData = [
    { label: 'View', width: 45 },
    { label: 'Elements', width: 73 },
    { label: 'Console', width: 68 },
    { label: 'Sources', width: 68 },
    { label: 'Network', width: 69 },
    { label: 'Performance', width: 93 },
    { label: 'Memory', width: 68 },
    { label: 'Application', width: 84 },
    { label: 'Security', width: 67 },
    { label: 'Audits', width: 58 },
];

const Home = () => {
    const [module, setModule] = useState(0);

    const onTabbedPaneChange = key => {
        setModule(key);
    };

    return (
        <RootView>
            <div class="vbox flex-auto split-widget">
                <SplitWidget>
                    <SplitWidget.Main>
                        <div class="widget vbox">
                            <div class="vbox flex-auto split-widget">
                                <SplitWidget direction="vertical">
                                    <SplitWidget.Main>
                                        <div class="vbox flex-auto tabbed-pane">
                                            <TabbedPane
                                                defaultSelect={module}
                                                tablistData={tablistData}
                                                onChange={onTabbedPaneChange}
                                                headerLeft={
                                                    <Toolbar>
                                                        <ToolbarButton>
                                                            <Icon type="largeicons" coordinates="-140px 96px" />
                                                        </ToolbarButton>
                                                        <ToolbarButton>
                                                            <Icon type="largeicons" coordinates="-112px 72px" />
                                                        </ToolbarButton>
                                                        <div class="toolbar-divider toolbar-item"></div>
                                                    </Toolbar>
                                                }
                                                headerRight={
                                                    <Toolbar>
                                                        <div class="toolbar-divider toolbar-item"></div>
                                                        <ToolbarButton>
                                                            <Icon type="largeicons" coordinates="-56px 96px" />
                                                        </ToolbarButton>
                                                    </Toolbar>
                                                }
                                            >
                                                <div class="widget vbox flex-auto view-container overflow-auto">
                                                    {renderModule(module)}
                                                </div>
                                            </TabbedPane>
                                        </div>
                                    </SplitWidget.Main>
                                </SplitWidget>
                            </div>
                        </div>
                    </SplitWidget.Main>
                </SplitWidget>
            </div>
        </RootView>
    );
};

window.onload = function() {
    const ws = new WebSocket('ws://localhost:9222/devtools/page/AADAA25366AC49AF0785BE403D7583A2');

    ws.onopen = function() {
        console.log('client：打开连接');
        const messages = [
            '{"id":1,"method":"Network.enable","params":{"maxPostDataSize":65536}}',
            '{"id":2,"method":"Page.enable"}',
            '{"id":3,"method":"Page.getResourceTree"}',
            '{"id":4,"method":"Runtime.enable"}',
            '{"id":5,"method":"Profiler.enable"}',
            // '{"id":6,"method":"Debugger.enable","params":{"maxScriptsCacheSize":10000000}}',
            // '{"id":7,"method":"Debugger.setPauseOnExceptions","params":{"state":"none"}}',
            // '{"id":8,"method":"Debugger.setAsyncCallStackDepth","params":{"maxDepth":32}}',
            // '{"id":9,"method":"DOM.enable"}',
            // '{"id":10,"method":"CSS.enable"}',
            // '{"id":11,"method":"Overlay.enable"}',
            // '{"id":12,"method":"Overlay.setShowViewportSizeOnResize","params":{"show":true}}',
            // '{"id":13,"method":"Emulation.setEmulatedMedia","params":{"media":"","features":[{"name":"prefers-color-scheme","value":""},{"name":"prefers-reduced-motion","value":""}]}}',
            // '{"id":14,"method":"Log.enable"}',
            // '{"id":15,"method":"Log.startViolationsReport","params":{"config":[{"name":"longTask","threshold":200},{"name":"longLayout","threshold":30},{"name":"blockedEvent","threshold":100},{"name":"blockedParser","threshold":-1},{"name":"handler","threshold":150},{"name":"recurringHandler","threshold":50},{"name":"discouragedAPIUse","threshold":-1}]}}',
            // '{"id":16,"method":"ServiceWorker.enable"}',
            // '{"id":17,"method":"Inspector.enable"}',
            // '{"id":18,"method":"Target.setAutoAttach","params":{"autoAttach":true,"waitForDebuggerOnStart":true,"flatten":true}}',
            // '{"id":19,"method":"Target.setDiscoverTargets","params":{"discover":true}}',
            // '{"id":20,"method":"Target.setRemoteLocations","params":{"locations":[{"host":"localhost","port":9229}]}}',
            // '{"id":21,"method":"Runtime.getIsolateId"}',
            // '{"id":22,"method":"Debugger.setBlackboxPatterns","params":{"patterns":[]}}',
            // '{"id":23,"method":"Page.getNavigationHistory","params":{}}',
            // '{"id":24,"method":"Runtime.runIfWaitingForDebugger"}',
            // '{"id":25,"method":"Page.setAdBlockingEnabled","params":{"enabled":false}}',
            // '{"id":26,"method":"Emulation.setFocusEmulationEnabled","params":{"enabled":false}}',

            // '{"id":27,"method":"Page.getNavigationHistory","params":{}}',
            // '{"id":28,"method":"Page.reload","params":{"ignoreCache":false}}',
            // '{"id":29,"method":"Overlay.setPausedInDebuggerMessage"}',
            // '{"id":30,"method":"Page.getNavigationHistory","params":{}}',
            // '{"id":102,"method":"Network.getResponseBody","params":{"requestId":"2514.137"}}'
            // '{"id":31,"method":"Page.reload","params":{"ignoreCache":false}}',
            // '{"id":32,"method":"Overlay.setPausedInDebuggerMessage"}',
            // '{"id":33,"method":"Page.getNavigationHistory","params":{}}',
            // '{"id":34,"method":"Page.reload","params":{"ignoreCache":false}}',
            // '{"id":35,"method":"Overlay.setPausedInDebuggerMessage"}',
            // '{"id":36,"method":"Page.getNavigationHistory","params":{}}',
            // '{"id":37,"method":"Overlay.setPausedInDebuggerMessage"}',
            // '{"id":39,"method":"Page.reload","params":{"ignoreCache":false}}'
        ];

        for (const message of messages) {
            ws.send(message);
        }
    };

    ws.onmessage = function(messageEvent) {
        // console.info(JSON.parse(messageEvent.data));
    };

    ws.onclose = function() {
        console.log('client：关闭连接');
    };

    render(<Home />, document.getElementById('apm'));
};
