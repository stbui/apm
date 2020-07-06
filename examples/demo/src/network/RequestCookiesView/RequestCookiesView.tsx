import React, { useRef, useEffect } from 'react';
import { Widget, TabbedPane, Toolbar, ToolbarButton, Icon, Checkbox, Treeoutline } from '../../components';

export default () => {
    return (
        <div className="widget request-cookies-view">
            <div class="widget vbox empty-view-scroller hidden">
                <div class="empty-view">
                    <div class="empty-bold-text">This request has no cookies.</div>
                </div>
            </div>

            <div>
                <span class="request-cookies-title">Request Cookies</span>
                <span is="dt-checkbox"></span>
            </div>
           
            <div class="cookies-panel-item hidden">No request cookies were sent.</div>

            <div class="request-cookies-title">Response Cookies</div>

            <div class="request-cookies-title hidden">Malformed Response Cookies</div>

            <div class="hidden"></div>
        </div>
    );
};
