import React from 'react';
import { render } from 'react-dom';
import { RootView, TabbedPane, Toolbar, ToolbarButton, Icon, SplitWidget } from './components';

import View from './View';

import './style/index.scss';

window.onload = () => {
    render(
        <RootView>
            <div class="vbox flex-auto split-widget">
                <SplitWidget>
                    <SplitWidget.Main>
                        <div class="widget vbox">
                            <div class="vbox flex-auto split-widget">
                                <SplitWidget direction="vertical">
                                    <SplitWidget.Main>
                                        <View />
                                    </SplitWidget.Main>
                                </SplitWidget>
                            </div>
                        </div>
                    </SplitWidget.Main>
                </SplitWidget>
            </div>
        </RootView>,
        document.getElementById('apm')
    );
};
