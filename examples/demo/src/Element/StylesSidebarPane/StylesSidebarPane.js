import React from 'react';

export default () => {
    return (
        <div class="styles-sidebar-pane-toolbar-container">
            <div class="hbox styles-sidebar-pane-toolbar">
                <div class="styles-sidebar-pane-filter-box">
                    <input placeholder="Filter" aria-label="Filter Styles" />
                </div>
                <div class="styles-pane-toolbar toolbar">
                    <div class="toolbar-shadow toolbar-toggled-gray">
                        <button
                            class="toolbar-button toolbar-item toolbar-state-off monospace"
                            aria-label="Toggle Element State"
                            aria-pressed="false"
                        >
                            <span
                                is="ui-icon"
                                class="toolbar-glyph hidden"
                            ></span>
                            <div class="toolbar-text">:hov</div>
                        </button>
                        <button
                            class="toolbar-button toolbar-item toolbar-state-off monospace"
                            aria-label="Element Classes"
                            aria-pressed="false"
                        >
                            <span
                                is="ui-icon"
                                class="toolbar-glyph hidden"
                            ></span>
                            <div class="toolbar-text">.cls</div>
                        </button>
                        <button
                            class="toolbar-button toolbar-item toolbar-has-glyph"
                            aria-label="New Style Rule"
                        >
                            <span
                                is="ui-icon"
                                class="toolbar-glyph spritesheet-largeicons largeicon-add icon-mask"
                                style="--spritesheet-position:0px 192px; width: 28px; height: 24px;"
                            ></span>
                            <div class="toolbar-text hidden"></div>
                            <span
                                is="ui-icon"
                                class="long-click-glyph spritesheet-largeicons largeicon-longclick-triangle icon-mask"
                                style="--spritesheet-position:-28px 96px; width: 28px; height: 24px;"
                            ></span>
                        </button>
                        <slot></slot>
                    </div>
                </div>
            </div>
            <div class="styles-sidebar-toolbar-pane-container">
                <div class="styles-sidebar-toolbar-pane"></div>
            </div>
        </div>
    );
};
