import React from 'react';
import { render } from 'react-dom';
import { RootView, TabbedPane, Toolbar, ToolbarButton, Icon, SplitWidget } from './components';

import View from './View';

import './style/index.scss';

render(
    <RootView>
        <div class="vbox flex-auto split-widget">
            <View />
        </div>
    </RootView>,
    document.getElementById('apm')
);
