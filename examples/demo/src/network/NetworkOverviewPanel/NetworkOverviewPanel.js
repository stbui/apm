import React from 'react';
import {
    Widget,
    TabbedPane,
    Toolbar,
    ToolbarButton,
    Icon,
    Checkbox,
} from '../../components';

export default () => {
    return (
        <div id="network-overview-container">
            <div class="resources-dividers">
                <div class="resources-divider" style="left: 0%;"></div>
                <div class="resources-divider" style="left: 9.16104%;"></div>
                <div class="resources-divider" style="left: 18.4185%;"></div>
                <div class="resources-divider" style="left: 27.5796%;"></div>
                <div class="resources-divider" style="left: 36.837%;"></div>
                <div class="resources-divider" style="left: 46.0945%;"></div>
                <div class="resources-divider" style="left: 55.2555%;"></div>
                <div class="resources-divider" style="left: 64.513%;"></div>
                <div class="resources-divider" style="left: 73.7705%;"></div>
                <div class="resources-divider" style="left: 82.9315%;"></div>
                <div class="resources-divider" style="left: 92.189%;"></div>
                <div class="resources-divider" style="left: 101.446%;"></div>
            </div>
            <div class="timeline-grid-header">
                <div
                    class="resources-dividers-label-bar"
                    style="top: 0px; cursor: -webkit-grab;"
                >
                    <div class="resources-divider" style="left: 0%;">
                        <div class="resources-divider-label">0&nbsp;ms</div>
                    </div>
                    <div class="resources-divider" style="left: 9.16104%;">
                        <div class="resources-divider-label">10&nbsp;ms</div>
                    </div>
                    <div class="resources-divider" style="left: 18.4185%;">
                        <div class="resources-divider-label">20&nbsp;ms</div>
                    </div>
                    <div class="resources-divider" style="left: 27.5796%;">
                        <div class="resources-divider-label">30&nbsp;ms</div>
                    </div>
                    <div class="resources-divider" style="left: 36.837%;">
                        <div class="resources-divider-label">40&nbsp;ms</div>
                    </div>
                    <div class="resources-divider" style="left: 46.0945%;">
                        <div class="resources-divider-label">50&nbsp;ms</div>
                    </div>
                    <div class="resources-divider" style="left: 55.2555%;">
                        <div class="resources-divider-label">60&nbsp;ms</div>
                    </div>
                    <div class="resources-divider" style="left: 64.513%;">
                        <div class="resources-divider-label">70&nbsp;ms</div>
                    </div>
                    <div class="resources-divider" style="left: 73.7705%;">
                        <div class="resources-divider-label">80&nbsp;ms</div>
                    </div>
                    <div class="resources-divider" style="left: 82.9315%;">
                        <div class="resources-divider-label">90&nbsp;ms</div>
                    </div>
                    <div class="resources-divider" style="left: 92.189%;">
                        <div class="resources-divider-label">100&nbsp;ms</div>
                    </div>
                    <div class="resources-divider" style="left: 101.446%;">
                        <div class="resources-divider-label">110&nbsp;ms</div>
                    </div>
                </div>
                <div class="resources-event-dividers" style="top: 0px;"></div>
            </div>

            <div class="overview-grid-cursor-area"></div>
            <div class="widget vbox network-overview">
                <canvas class="fill" width="2074" height="120"></canvas>
            </div>
        </div>
    );
};
