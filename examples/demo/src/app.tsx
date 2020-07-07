import React, { useState } from 'react';

import { RootView, TabbedPane, Toolbar, ToolbarButton, Icon, SplitWidget } from './components';
import Element from './Element';
import Network from './Network';
import Console from './Console';
import Timeline from './Timeline';
import Resources from './Resources';

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
    { label: 'Lighthouse', width: 83 },
];

export const Home = ({ addNewLogs, addNewNetworkRequests, onChangeMode }) => {
    const [module, setModule] = useState(3);

    const onTabbedPaneChange = key => setModule(key);

    const renderModule = module => {
        switch (module) {
            case 0: {
                return <Element />;
            }
            case 1: {
                return <Element />;
            }
            case 2: {
                return <Console addNewLogs={addNewLogs} />;
            }
            case 3: {
                return <Console addNewLogs={addNewLogs} />;
            }
            case 4: {
                return <Network addNewNetworkRequests={addNewNetworkRequests} />;
            }
            case 5: {
                return <Timeline addNewNetworkRequests={addNewNetworkRequests} />;
            }
            case 6: {
                return <Resources />;
            }
            default: {
                return <Network addNewNetworkRequests={addNewNetworkRequests} />;
            }
        }
    };

    return (
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
                            <Icon type="largeicons" coordinates="-112px 72px" onClick={onChangeMode} />
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
                <div class="widget vbox flex-auto view-container overflow-auto" aria-label={module}>
                    {renderModule(module)}
                </div>
            </TabbedPane>
        </div>
    );
};
