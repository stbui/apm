import React from 'react';
import ApplicationPanelSidebar from './ApplicationPanelSidebar';
import './resourcesPanel.scss';

export default ({ children }) => {
    return (
        <div class="widget vbox panel resources">
            <div class="vbox flex-auto split-widget">
                <div class="widget shadow-split-widget hbox">
                    <div
                        class="shadow-split-widget-contents shadow-split-widget-sidebar vbox"
                        style="flex-basis: 220px; width: 220px; height: 491px;"
                    >
                        {/* <slot name="insertion-point-sidebar"></slot> */}
                        <div class="widget vbox panel-sidebar">
                            <div class="widget vbox">
                                <ApplicationPanelSidebar />
                            </div>
                        </div>
                    </div>
                    <div
                        class="shadow-split-widget-contents shadow-split-widget-main vbox"
                        style="width: 1097px; height: 491px;"
                    >
                        {/* <slot name="insertion-point-main"></slot> */}
                        <div class="widget vbox">
                            <div class="vbox flex-auto">
                                <div class="vbox flex-auto">
                                    <div class="widget vbox">
                                        <div class="background-service-toolbar toolbar">
                                            <div class="toolbar-shadow">
                                                <button
                                                    class="toolbar-button toolbar-item toolbar-has-glyph toolbar-state-off toolbar-toggle-with-red-color"
                                                    aria-label="Start recording events"
                                                    aria-pressed="false"
                                                >
                                                    <span
                                                        is="ui-icon"
                                                        class="toolbar-glyph spritesheet-largeicons largeicon-start-recording icon-mask"
                                                        style="--spritesheet-position:-168px 48px; width: 28px; height: 24px;"
                                                    ></span>
                                                    <div class="toolbar-text hidden"></div>
                                                </button>
                                                <button
                                                    class="toolbar-button toolbar-item toolbar-has-glyph"
                                                    aria-label="Clear"
                                                >
                                                    <span
                                                        is="ui-icon"
                                                        class="toolbar-glyph spritesheet-largeicons largeicon-clear icon-mask"
                                                        style="--spritesheet-position:0px 144px; width: 28px; height: 24px;"
                                                    ></span>
                                                    <div class="toolbar-text hidden"></div>
                                                </button>
                                                <div class="toolbar-divider toolbar-item"></div>
                                                <button
                                                    class="toolbar-button toolbar-item toolbar-has-glyph"
                                                    aria-label="Save events"
                                                    disabled=""
                                                >
                                                    <span
                                                        is="ui-icon"
                                                        class="toolbar-glyph spritesheet-largeicons largeicon-download icon-mask"
                                                        style="--spritesheet-position:-196px 144px; width: 28px; height: 24px;"
                                                    ></span>
                                                    <div class="toolbar-text hidden"></div>
                                                </button>
                                                <div class="toolbar-divider toolbar-item"></div>
                                                <span
                                                    is="dt-checkbox"
                                                    class="toolbar-item checkbox"
                                                ></span>
                                                <slot></slot>
                                            </div>
                                        </div>

                                        <div class="vbox flex-auto split-widget">
                                            <div class="widget shadow-split-widget vbox">
                                                <div
                                                    class="shadow-split-widget-contents shadow-split-widget-main vbox"
                                                    style=""
                                                >
                                                    <slot name="insertion-point-main"></slot>
                                                </div>
                                                <div
                                                    class="shadow-split-widget-contents shadow-split-widget-sidebar vbox"
                                                    style="flex-basis: 200px;"
                                                >
                                                    <slot name="insertion-point-sidebar"></slot>
                                                </div>
                                                <div
                                                    class="shadow-split-widget-resizer"
                                                    style="cursor: ns-resize; bottom: 200px; margin-bottom: -3px;"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="resources-toolbar toolbar hidden"></div>
                        </div>
                    </div>
                    <div
                        class="shadow-split-widget-resizer"
                        style="cursor: ew-resize; left: 220px; margin-left: -3px;"
                    ></div>
                </div>
            </div>
        </div>
    );
};
