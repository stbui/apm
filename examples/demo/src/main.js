// import Apm from 'apm';
// Apm('1dw43f34232424');

import { h, render, useState } from './core';
import { useRoutes, push } from './core/routes';
import './style/index.scss';

import {
    RootView,
    TabbedPane,
    Toolbar,
    ToolbarButton,
    Icon,
    SplitWidget,
} from './components';
import Element from './Element';
import Network from './Network';
import Console from './Console';
import Timeline from './Timeline';
import Resources from './Resources';

const renderModule = module => {
    switch (module) {
        case 0: {
            return <Element />;
        }
        case 1: {
            return <Console />;
        }
        case 2: {
            return <Console />;
        }
        case 3: {
            return <Network />;
        }
        default: {
            return <Network />;
        }
    }
};

const Home = () => {
    const [module, setModule] = useState(3);

    const onTabbedPaneChange = key => {
        setModule(key);
    };

    return (
        <RootView>
            <div class="vbox flex-auto split-widget">
                <SplitWidget>
                    <div class="widget vbox">
                        <div class="vbox flex-auto split-widget">
                            <SplitWidget direction="vertical">
                                <div class="vbox flex-auto tabbed-pane">
                                    <TabbedPane
                                        defaultSelect={module}
                                        onChange={onTabbedPaneChange}
                                        headerLeft={
                                            <Toolbar>
                                                <ToolbarButton>
                                                    <Icon
                                                        type="largeicons"
                                                        coordinates="-140px 96px"
                                                    />
                                                </ToolbarButton>
                                                <ToolbarButton>
                                                    <Icon
                                                        type="largeicons"
                                                        coordinates="-112px 72px"
                                                    />
                                                </ToolbarButton>
                                                <div class="toolbar-divider toolbar-item"></div>
                                            </Toolbar>
                                        }
                                        headerRight={
                                            <Toolbar>
                                                <div class="toolbar-divider toolbar-item"></div>
                                                <ToolbarButton>
                                                    <Icon
                                                        type="largeicons"
                                                        coordinates="-56px 96px"
                                                    />
                                                </ToolbarButton>
                                            </Toolbar>
                                        }
                                    >
                                        <div class="widget vbox flex-auto view-container overflow-auto">
                                            {renderModule(module)}
                                        </div>
                                    </TabbedPane>
                                </div>
                            </SplitWidget>
                        </div>
                    </div>
                </SplitWidget>
            </div>
        </RootView>
    );
};

window.onload = function() {
    const Header = () => (
        <div style={{ height: '64px', background: '#673ab8' }}></div>
    );

    const routes = {
        '/': () => <Home />,

        '/network': () => (
            <div>
                <Network />
                <button onClick={() => push('/')}>Go home</button>
            </div>
        ),
    };

    const App = () => useRoutes(routes);

    render(<App />, document.getElementById('apm'));
};
