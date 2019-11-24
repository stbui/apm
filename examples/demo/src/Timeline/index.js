import React from 'react';
import './timelinePanel.scss';

import { Widget, TabbedPane, Toolbar, ToolbarButton, Icon, Checkbox, SplitWidget, Treeoutline } from '../components';

export default ({ children }) => {
    return (
        <div class="widget vbox panel timeline">
            <div class="timeline-toolbar-container">
                <div class="timeline-main-toolbar toolbar">
                    <div class="toolbar-shadow">
                        <button
                            class="toolbar-button toolbar-item toolbar-has-glyph toolbar-toggle-with-red-color toolbar-state-off"
                            aria-label="Record"
                            aria-pressed="false"
                        >
                            <span
                                is="ui-icon"
                                class="toolbar-glyph spritesheet-largeicons largeicon-start-recording icon-mask"
                                style="--spritesheet-position:-168px 48px; width: 28px; height: 24px;"
                            ></span>
                            <div class="toolbar-text hidden"></div>
                        </button>

                        <ToolbarButton>
                            <Icon type="largeicons" coordinates="-84px 48px" />
                        </ToolbarButton>
                        <ToolbarButton>
                            <Icon type="largeicons" coordinates="0px 144px" />
                        </ToolbarButton>

                        <div class="toolbar-divider toolbar-item"></div>

                        <ToolbarButton>
                            <Icon type="largeicons" coordinates="-196px 120px" />
                        </ToolbarButton>

                        <ToolbarButton>
                            <Icon type="largeicons" coordinates="-196px 144px" />
                        </ToolbarButton>

                        <div class="toolbar-divider toolbar-item"></div>

                        <button class="history-dropdown-button toolbar-item" disabled>
                            <span class="content">(no recordings)</span>
                            <span
                                is="ui-icon"
                                class="spritesheet-smallicons smallicon-triangle-down icon-mask"
                                style="--spritesheet-position:-80px 30px; width: 10px; height: 10px;"
                            ></span>
                        </button>

                        <div class="toolbar-divider toolbar-item"></div>

                        <div class="toolbar-divider toolbar-item hidden"></div>

                        <Checkbox id="41" label="Screenshots" />
                        <Checkbox id="42" label="Memory" />

                        <ToolbarButton>
                            <Icon type="largeicons" coordinates="-140px 24px" />
                        </ToolbarButton>
                    </div>
                </div>
                <Toolbar>
                    <div class="toolbar-divider toolbar-item"></div>

                    <ToolbarButton state="off">
                        <Icon type="largeicons" coordinates="-168px 168px" />
                    </ToolbarButton>
                </Toolbar>
            </div>

            <div class="widget hbox timeline-settings-pane hidden">
                <div class="toolbar flex-auto">
                    <div class="toolbar-shadow vertical">
                        <Checkbox id="30" label="Disable JavaScript samples" />
                        <Checkbox id="31" label="Enable advanced paint instrumentation (slow)" />
                    </div>
                </div>
                <div class="widget vbox flex-auto">
                    <div class="toolbar">
                        <div class="toolbar-shadow">
                            <div class="toolbar-text toolbar-item">Network:</div>
                            <span class="toolbar-select-container toolbar-item" aria-label="Network conditions">
                                <select class="toolbar-item" aria-label="Network conditions" style="max-width: 140px;">
                                    <optgroup label="Disabled">
                                        <option value="Online" aria-label="Disabled: Online">
                                            Online
                                        </option>
                                    </optgroup>
                                    <optgroup label="Presets">
                                        <option value="Fast 3G" aria-label="Presets: Fast 3G">
                                            Fast 3G
                                        </option>
                                        <option value="Slow 3G" aria-label="Presets: Slow 3G">
                                            Slow 3G
                                        </option>
                                        <option value="Offline" aria-label="Presets: Offline">
                                            Offline
                                        </option>
                                    </optgroup>
                                    <optgroup label="Custom">
                                        <option value="Add…" aria-label="Add Custom">
                                            Add…
                                        </option>
                                    </optgroup>
                                </select>
                                <span
                                    is="ui-icon"
                                    class="toolbar-dropdown-arrow spritesheet-smallicons smallicon-triangle-down icon-mask"
                                    style="--spritesheet-position:-80px 30px; width: 10px; height: 10px;"
                                ></span>
                            </span>
                            <slot></slot>
                        </div>
                    </div>
                    <div class="toolbar">
                        <div class="toolbar-shadow">
                            <div class="toolbar-text toolbar-item">CPU:</div>
                            <span class="toolbar-select-container toolbar-item" aria-label="CPU throttling">
                                <select class="toolbar-item" aria-label="CPU throttling">
                                    <option>No throttling</option>
                                    <option>4× slowdown</option>
                                    <option>6× slowdown</option>
                                </select>
                                <span
                                    is="ui-icon"
                                    class="toolbar-dropdown-arrow spritesheet-smallicons smallicon-triangle-down icon-mask"
                                    style="--spritesheet-position:-80px 30px; width: 10px; height: 10px;"
                                ></span>
                            </span>
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>

            <div class="widget vbox">
                <div class="hbox" id="timeline-overview-panel">
                    <div class="widget vbox" id="timeline-overview-pane">
                        <div id="timeline-overview-container">
                            <div id="timeline-overview-grid"><div class="resources-dividers"><div class="resources-divider" style="left: 0%;"></div><div class="resources-divider" style="left: 4.98652%;"></div><div class="resources-divider" style="left: 9.97305%;"></div><div class="resources-divider" style="left: 14.9596%;"></div><div class="resources-divider" style="left: 19.9461%;"></div><div class="resources-divider" style="left: 25%;"></div><div class="resources-divider" style="left: 29.9865%;"></div><div class="resources-divider" style="left: 34.973%;"></div><div class="resources-divider" style="left: 39.9596%;"></div><div class="resources-divider" style="left: 44.9461%;"></div><div class="resources-divider" style="left: 50%;"></div><div class="resources-divider" style="left: 54.9865%;"></div><div class="resources-divider" style="left: 59.973%;"></div><div class="resources-divider" style="left: 64.9596%;"></div><div class="resources-divider" style="left: 69.9461%;"></div><div class="resources-divider" style="left: 75%;"></div><div class="resources-divider" style="left: 79.9865%;"></div><div class="resources-divider" style="left: 84.973%;"></div><div class="resources-divider" style="left: 89.9596%;"></div><div class="resources-divider" style="left: 94.9461%;"></div><div class="resources-divider" style="left: 100%;"></div></div><div class="timeline-grid-header"><div class="resources-dividers-label-bar" style="top: 0px; cursor: -webkit-grab;"><div class="resources-divider" style="left: 0%;"><div class="resources-divider-label">0&nbsp;ms</div></div><div class="resources-divider" style="left: 4.98652%;"><div class="resources-divider-label">5&nbsp;ms</div></div><div class="resources-divider" style="left: 9.97305%;"><div class="resources-divider-label">10&nbsp;ms</div></div><div class="resources-divider" style="left: 14.9596%;"><div class="resources-divider-label">15&nbsp;ms</div></div><div class="resources-divider" style="left: 19.9461%;"><div class="resources-divider-label">20&nbsp;ms</div></div><div class="resources-divider" style="left: 25%;"><div class="resources-divider-label">25&nbsp;ms</div></div><div class="resources-divider" style="left: 29.9865%;"><div class="resources-divider-label">30&nbsp;ms</div></div><div class="resources-divider" style="left: 34.973%;"><div class="resources-divider-label">35&nbsp;ms</div></div><div class="resources-divider" style="left: 39.9596%;"><div class="resources-divider-label">40&nbsp;ms</div></div><div class="resources-divider" style="left: 44.9461%;"><div class="resources-divider-label">45&nbsp;ms</div></div><div class="resources-divider" style="left: 50%;"><div class="resources-divider-label">50&nbsp;ms</div></div><div class="resources-divider" style="left: 54.9865%;"><div class="resources-divider-label">55&nbsp;ms</div></div><div class="resources-divider" style="left: 59.973%;"><div class="resources-divider-label">60&nbsp;ms</div></div><div class="resources-divider" style="left: 64.9596%;"><div class="resources-divider-label">65&nbsp;ms</div></div><div class="resources-divider" style="left: 69.9461%;"><div class="resources-divider-label">70&nbsp;ms</div></div><div class="resources-divider" style="left: 75%;"><div class="resources-divider-label">75&nbsp;ms</div></div><div class="resources-divider" style="left: 79.9865%;"><div class="resources-divider-label">80&nbsp;ms</div></div><div class="resources-divider" style="left: 84.973%;"><div class="resources-divider-label">85&nbsp;ms</div></div><div class="resources-divider" style="left: 89.9596%;"><div class="resources-divider-label">90&nbsp;ms</div></div><div class="resources-divider" style="left: 94.9461%;"><div class="resources-divider-label">95&nbsp;ms</div></div><div class="resources-divider" style="left: 100%;"><div class="resources-divider-label">100&nbsp;ms</div></div></div><div class="resources-event-dividers" style="top: 0px;"></div></div></div>
                            <div class="overview-grid-window-resizer" tabindex="0" style="cursor: ew-resize; left: 0%;"></div>
                            <div class="overview-grid-window-resizer" tabindex="0" style="cursor: ew-resize; left: 100%;"></div>
                            <div class="window-curtain-left" style="width: 0%;"></div>
                            <div class="window-curtain-right" style="width: 0%;"></div>
                            <div class="overview-grid-cursor-area"></div>
                            <div class="overview-grid-cursor-position"></div>
                            <div class="widget vbox overview-strip" id="timeline-overview-responsiveness"><canvas class="fill" width="2968" height="10"></canvas></div>
                            <div class="widget vbox overview-strip" id="timeline-overview-framerate"><canvas class="fill" width="2968" height="32"></canvas><div class="timeline-overview-strip-title">FPS</div></div>
                            <div class="widget vbox overview-strip" id="timeline-overview-cpu-activity"><canvas class="fill" width="2968" height="40"></canvas><div class="timeline-overview-strip-title">CPU</div><canvas class="fill background" width="2968" height="40"></canvas></div>
                            <div class="widget vbox overview-strip" id="timeline-overview-network"><canvas class="fill" width="2968" height="16"></canvas><div class="timeline-overview-strip-title">NET</div></div>
                        </div>
                    </div>
                </div>

                <div class="status-pane-container fill hidden">
                    <div class="widget vbox timeline-landing-page fill">
                        <div>
                            <p>
                                <span>
                                    Click the record button
                                    <span class="inline-button"></span>
                                    or hit <b>⌘ E</b> to start a new recording. Click the reload button
                                    <span class="inline-button"></span> or hit <b>⌘ ⇧ E</b> to record the page load.
                                </span>
                            </p>
                            <p>
                                <span>
                                    After recording, select an area of interest in the overview by dragging. Then, zoom
                                    and pan the timeline with the mousewheel or <b>WASD</b> keys.
                                    <x-link
                                        class=" devtools-link"
                                        role="link"
                                        tabindex="0"
                                        target="_blank"
                                        href="https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/"
                                        style="display: inline; cursor: pointer;"
                                    >
                                        Learn&nbsp;more
                                    </x-link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <input type="file" tabindex="-1" style="display: none;" />


                <div class="vbox flex-auto searchable-view"><div class="widget vbox timeline-flamechart"><div class="vbox flex-auto split-widget timeline-details-split"><div class="vbox flex-auto split-widget" slot="insertion-point-main"><div class="vbox flex-auto split-widget" slot="insertion-point-main"><div class="vbox flex-auto" slot="insertion-point-main"></div><div class="widget vbox" slot="insertion-point-sidebar"><div class="vbox flex-auto"></div><div class="timeline-flamechart-resizer" style="cursor: ns-resize;"></div></div></div></div><div class="widget vbox timeline-details" slot="insertion-point-sidebar"><div class="vbox flex-auto tabbed-pane"><div class="widget vbox timeline-details-view"><div class="timeline-details-view-body vbox" tabindex="0"><div></div></div></div></div></div></div></div></div>
            </div>
        </div>
    );
};
