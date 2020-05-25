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
                            <span is="ui-icon" class="toolbar-glyph hidden"></span>
                            <div class="toolbar-text">:hov</div>
                        </button>
                        <button
                            class="toolbar-button toolbar-item toolbar-state-off monospace"
                            aria-label="Element Classes"
                            aria-pressed="false"
                        >
                            <span is="ui-icon" class="toolbar-glyph hidden"></span>
                            <div class="toolbar-text">.cls</div>
                        </button>
                        <button class="toolbar-button toolbar-item toolbar-has-glyph" aria-label="New Style Rule">
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
            <div class="gray-info-message hidden">No matching selector or style</div>

            <div role="tree">
                <div
                    class="styles-section matched-styles monospace"
                    aria-label="element.style, css selector"
                    tabindex="0"
                    role="treeitem"
                >
                    <div>
                        <div class="styles-section-title ">
                            <div class="media-list media-matches"></div>
                            <div class="styles-section-subtitle"></div>
                            <div>
                                <span class="selector">element.style</span>
                                <span class="sidebar-pane-open-brace"> {'{'}</span>
                            </div>
                        </div>
                        <div class="style-properties matched-styles monospace"></div>
                        <button class="styles-show-all text-button hidden" type="button"></button>
                        <div class="sidebar-pane-closing-brace">
                            {'}'}
                            <div class="sidebar-pane-section-toolbar toolbar" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
                <div
                    class="styles-section matched-styles monospace read-only"
                    aria-label="style, css selector"
                    tabindex="-1"
                    role="treeitem"
                >
                    <div>
                        <div class="styles-section-title styles-selector">
                            <div class="media-list media-matches"></div>
                            <div class="styles-section-subtitle">user agent stylesheet</div>
                            <div>
                                <span class="selector">
                                    <span class="simple-selector selector-matches">style</span>
                                </span>
                                <span class="sidebar-pane-open-brace"> {'{'}</span>
                            </div>
                        </div>
                        <div class="style-properties matched-styles monospace read-only"></div>
                        <button class="styles-show-all text-button hidden" type="button"></button>
                        <div class="sidebar-pane-closing-brace">{'}'}</div>
                    </div>
                </div>
                <div class="sidebar-separator">
                    Inherited from <span class="monospace"></span>
                </div>
                <div
                    class="styles-section matched-styles monospace navigable"
                    aria-label="body, form, li, p, ul, css selector"
                    tabindex="-1"
                    role="treeitem"
                >
                    <div>
                        <div class="styles-section-title styles-selector">
                            <div class="media-list media-matches"></div>
                            <div class="styles-section-subtitle">
                                <span class="devtools-link" role="link" tabindex="-1">
                                    (index):6
                                </span>
                            </div>
                            <div>
                                <span class="selector">
                                    <span class="simple-selector selector-matches">body, </span>
                                    <span class="simple-selector">form, li, p, ul</span>
                                </span>
                                <span class="sidebar-pane-open-brace"> {'{'}</span>
                            </div>
                        </div>
                        <div class="style-properties matched-styles monospace"></div>
                        <button class="styles-show-all text-button hidden" type="button"></button>
                        <div class="sidebar-pane-closing-brace">
                            {'}'}
                            <div class="sidebar-pane-section-toolbar toolbar" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
                <div
                    class="styles-section matched-styles monospace navigable"
                    aria-label="body, css selector"
                    tabindex="-1"
                    role="treeitem"
                >
                    <div>
                        <div class="styles-section-title styles-selector">
                            <div class="media-list media-matches"></div>
                            <div class="styles-section-subtitle">
                                <span class="devtools-link" role="link" tabindex="-1">
                                    (index):6
                                </span>
                            </div>
                            <div>
                                <span class="selector">
                                    <span class="simple-selector selector-matches">body</span>
                                </span>
                                <span class="sidebar-pane-open-brace"> {'{'}</span>
                            </div>
                        </div>
                        <div class="style-properties matched-styles monospace"></div>
                        <button class="styles-show-all text-button hidden" type="button"></button>
                        <div class="sidebar-pane-closing-brace">
                            {'}'}
                            <div class="sidebar-pane-section-toolbar toolbar" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
                <div
                    class="styles-section matched-styles monospace navigable"
                    aria-label="body, button, input, select, textarea, css selector"
                    tabindex="-1"
                    role="treeitem"
                >
                    <div>
                        <div class="styles-section-title styles-selector">
                            <div class="media-list media-matches"></div>
                            <div class="styles-section-subtitle">
                                <span class="devtools-link" role="link" tabindex="-1">
                                    (index):6
                                </span>
                            </div>
                            <div>
                                <span class="selector">
                                    <span class="simple-selector selector-matches">body, </span>
                                    <span class="simple-selector">button, input, select, textarea</span>
                                </span>
                                <span class="sidebar-pane-open-brace"> {'{'}</span>
                            </div>
                        </div>
                        <div class="style-properties matched-styles monospace"></div>
                        <button class="styles-show-all text-button hidden" type="button"></button>
                        <div class="sidebar-pane-closing-brace">
                            {'}'}
                            <div class="sidebar-pane-section-toolbar toolbar" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
                <div class="sidebar-separator">
                    Inherited from <span class="monospace"></span>
                </div>
                <div
                    class="styles-section matched-styles monospace navigable"
                    aria-label="html, css selector"
                    tabindex="-1"
                    role="treeitem"
                >
                    <div>
                        <div class="styles-section-title styles-selector">
                            <div class="media-list media-matches"></div>
                            <div class="styles-section-subtitle">
                                <span class="devtools-link" role="link" tabindex="-1">
                                    (index):6
                                </span>
                            </div>
                            <div>
                                <span class="selector">
                                    <span class="simple-selector selector-matches">html</span>
                                </span>
                                <span class="sidebar-pane-open-brace"> {'{'}</span>
                            </div>
                        </div>
                        <div class="style-properties matched-styles monospace"></div>
                        <button class="styles-show-all text-button hidden" type="button"></button>
                        <div class="sidebar-pane-closing-brace">
                            {'}'}
                            <div class="sidebar-pane-section-toolbar toolbar" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
