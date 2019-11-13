import React from 'react';
import ConsoleView from './ConsoleView';

export default () => {
    return (
        <ConsoleView>
            <div class="widget vbox console-view">
                <div class="console-toolbar-container">
                    <div class="console-main-toolbar toolbar">
                        <div class="toolbar-shadow">
                            <button
                                class="toolbar-button toolbar-item toolbar-has-glyph"
                                aria-label="Show console sidebar"
                            >
                                <span
                                    is="ui-icon"
                                    class="toolbar-glyph spritesheet-largeicons largeicon-show-left-sidebar icon-mask"
                                    style="--spritesheet-position:-168px 120px; width: 28px; height: 24px;"
                                ></span>
                                <div class="toolbar-text hidden"></div>
                            </button>
                            <button
                                class="toolbar-button toolbar-item toolbar-has-glyph"
                                aria-label="Clear console"
                            >
                                <span
                                    is="ui-icon"
                                    class="toolbar-glyph spritesheet-largeicons largeicon-clear icon-mask"
                                    style="--spritesheet-position:0px 144px; width: 28px; height: 24px;"
                                ></span>
                                <div class="toolbar-text hidden"></div>
                            </button>
                            <div class="toolbar-divider toolbar-item"></div>

                            <div class="toolbar-divider toolbar-item"></div>
                            <button
                                class="toolbar-button toolbar-item toolbar-has-glyph"
                                aria-label="Create live expression"
                            >
                                <span
                                    is="ui-icon"
                                    class="toolbar-glyph spritesheet-largeicons largeicon-visibility icon-mask"
                                    style="--spritesheet-position:-196px 216px; width: 28px; height: 24px;"
                                ></span>
                                <div class="toolbar-text hidden"></div>
                            </button>
                            <div class="toolbar-divider toolbar-item"></div>

                            <button
                                class="toolbar-button toolbar-item toolbar-has-dropdown"
                                aria-label="Log level: Default levels"
                                role="button"
                                aria-haspopup="true"
                            >
                                <span
                                    is="ui-icon"
                                    class="toolbar-glyph hidden"
                                ></span>
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
                            <div class="toolbar-text toolbar-item dimmed hidden">
                                0 hidden
                            </div>
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
                    <div class="vbox flex-auto console-searchable-view">
                        <div
                            id="console-messages"
                            class="monospace"
                            style="overflow: auto;"
                        >
                            <div
                                aria-hidden="true"
                                style="height: 0px; color: transparent;"
                            >
                                ﻿
                            </div>
                            <div class="console-group console-group-messages"></div>
                            <div
                                aria-hidden="true"
                                style="height: 0px; color: transparent;"
                            >
                                ﻿
                            </div>

                            <div class="source-code" id="console-prompt"></div>
                            <div
                                class="console-view-fix-select-all"
                                aria-hidden="true"
                            >
                                .
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ConsoleView>
    );
};
