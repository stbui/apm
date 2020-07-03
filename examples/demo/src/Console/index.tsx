import React from 'react';
import { TabbedPane, Toolbar, ToolbarButton, Icon } from '../components';
import ConsoleView from './ConsoleView';

export default ({ addNewLogs }) => {
    return (
        <div class="widget vbox panel console">
            <div class="widget vbox console-view">
                <div class="console-toolbar-container">
                    <div class="console-main-toolbar toolbar">
                        <div class="toolbar-shadow">
                            <ToolbarButton>
                                <Icon type="largeicons" coordinates="-168px 120px" />
                            </ToolbarButton>
                            <ToolbarButton>
                                <Icon type="largeicons" coordinates="0px 144px" />
                            </ToolbarButton>

                            <div class="toolbar-divider toolbar-item"></div>

                            <div class="toolbar-divider toolbar-item"></div>
                            <ToolbarButton>
                                <Icon type="largeicons" coordinates="-196px 216px" />
                            </ToolbarButton>
                            <div class="toolbar-divider toolbar-item"></div>

                            <button
                                class="toolbar-button toolbar-item toolbar-has-dropdown"
                                aria-label="Log level: Default levels"
                                role="button"
                                aria-haspopup="true"
                            >
                                <span is="ui-icon" class="toolbar-glyph hidden"></span>
                                <div class="toolbar-text">Default levels</div>
                                <span
                                    is="ui-icon"
                                    class="toolbar-dropdown-arrow spritesheet-smallicons smallicon-triangle-down icon-mask"
                                    style="--spritesheet-position:-80px 30px; width: 10px; height: 10px;"
                                ></span>
                            </button>
                            <div class="toolbar-item"></div>
                        </div>
                    </div>

                    <div class="toolbar">
                        <div class="toolbar-shadow">
                            <div class="toolbar-divider toolbar-item"></div>
                            <div class="toolbar-text toolbar-item dimmed hidden">0 hidden</div>
                            <button
                                class="toolbar-button toolbar-item toolbar-has-glyph toolbar-state-off"
                                aria-label="Console settings"
                                aria-pressed="false"
                            >
                                <span
                                    is="ui-icon"
                                    class="toolbar-glyph spritesheet-largeicons largeicon-settings-gear icon-mask"
                                    style="--spritesheet-position:-168px 168px; width: 28px; height: 24px;"
                                ></span>
                                <div class="toolbar-text hidden"></div>
                            </button>
                            <slot></slot>
                        </div>
                    </div>
                </div>
                <div class="vbox flex-auto split-widget">
                    <div className="widget shadow-split-widget hbox">
                        <div className="shadow-split-widget-contents shadow-split-widget-sidebar vbox hidden"></div>
                        <div className="shadow-split-widget-contents shadow-split-widget-main vbox maximized">
                            <ConsoleView addNewLogs={addNewLogs} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
