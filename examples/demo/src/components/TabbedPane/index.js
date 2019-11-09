import { h } from '../../core';
import './index';

export default ({ headerLeft, headerHeader, headerRight, children }) => {
    return (
        <div class="tabbed-pane">
            <div class="tabbed-pane-header">
                <div class="tabbed-pane-left-toolbar">{headerLeft}</div>
                <div class="tabbed-pane-header-contents">{headerHeader}</div>
                <div class="tabbed-pane-right-toolbar">{headerRight}</div>
            </div>
            <div class="tabbed-pane-content">{children}</div>
        </div>
    );
};
