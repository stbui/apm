import React from 'react';
import StylesSidebarPane from './StylesSidebarPane';
import './ElementPanel.scss';

import ElementsTreeOutline from './ElementsTreeOutline';
import ElementsBreadcrumbs from './ElementsBreadcrumbs';

export default () => {
    return (
        <div class="widget vbox panel elements">
            <div class="vbox flex-auto split-widget">
                <div class="widget shadow-split-widget hbox">
                    <div class="shadow-split-widget-contents shadow-split-widget-main vbox" style="">
                        <div class="vbox flex-auto">
                            <div class="widget vbox">
                                <slot></slot>
                                <div id="elements-content" class="elements-wrap">
                                    <div>
                                        <ElementsTreeOutline />
                                    </div>
                                </div>
                                <div id="elements-crumbs">
                                    <div class="vbox flex-auto" aria-hidden="true">
                                        <ElementsBreadcrumbs />
                                    </div>
                                </div>

                                <div class="search-bar hidden" style="order: 100;">
                                    <div class="toolbar-search">
                                        <div class="replace-toggle-toolbar toolbar"></div>
                                        <div class="toolbar-search-inputs">
                                            <div class="toolbar-search-control">
                                                <input
                                                    is="history-input"
                                                    class="search-replace"
                                                    id="search-input-field"
                                                    placeholder="Find by string, selector, or XPath"
                                                />
                                                <label class="search-results-matches" for="search-input-field"></label>
                                                <div class="toolbar-search-navigation-controls">
                                                    <div class="toolbar-search-navigation toolbar-search-navigation-prev"></div>
                                                    <div class="toolbar-search-navigation toolbar-search-navigation-next"></div>
                                                </div>
                                            </div>
                                            <input
                                                class="search-replace toolbar-replace-control hidden"
                                                placeholder="Replace"
                                            />
                                        </div>
                                        <div class="toolbar-search-buttons">
                                            <div class="first-row-buttons">
                                                <div class="toolbar-search-options toolbar"></div>
                                                <button class="search-action-button text-button" type="button">
                                                    Cancel
                                                </button>
                                            </div>
                                            <div class="second-row-buttons hidden">
                                                <button
                                                    class="search-action-button text-button"
                                                    type="button"
                                                    disabled=""
                                                >
                                                    Replace
                                                </button>
                                                <button
                                                    class="search-action-button text-button"
                                                    type="button"
                                                    disabled=""
                                                >
                                                    Replace all
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="shadow-split-widget-contents shadow-split-widget-sidebar vbox"
                        style="flex-basis: 325px;"
                    >
                        <div class="vbox flex-auto tabbed-pane">
                            <div class="widget vbox tabbed-pane-shadow" tabindex="-1">
                                <div class="tabbed-pane-header">
                                    <div class="tabbed-pane-header-contents">
                                        <div class="tabbed-pane-header-tabs" role="tablist" style="">
                                            <div
                                                class="tabbed-pane-header-tab selected"
                                                id="tab-Styles"
                                                role="tab"
                                                aria-selected="true"
                                                aria-label="Styles"
                                                tabindex="0"
                                                style="width: 52px;"
                                            >
                                                <span class="tabbed-pane-header-tab-title">Styles</span>
                                            </div>
                                            <div
                                                class="tabbed-pane-header-tab"
                                                id="tab-Computed"
                                                role="tab"
                                                aria-selected="false"
                                                aria-label="Computed"
                                                style="width: 77px;"
                                            >
                                                <span class="tabbed-pane-header-tab-title">Computed</span>
                                            </div>
                                            <div
                                                class="tabbed-pane-header-tab"
                                                id="tab-elements.eventListeners"
                                                role="tab"
                                                aria-selected="false"
                                                aria-label="Event Listeners"
                                                style="width: 102px;"
                                            >
                                                <span class="tabbed-pane-header-tab-title">Event Listeners</span>
                                            </div>
                                        </div>
                                        <div
                                            class="tabbed-pane-header-tabs-drop-down-container"
                                            role="button"
                                            aria-haspopup="true"
                                            aria-label="More tabs"
                                            tabindex="0"
                                        >
                                            <span
                                                is="ui-icon"
                                                class="chevron-icon spritesheet-largeicons largeicon-chevron icon-mask"
                                                style="--spritesheet-position:-56px 168px; width: 28px; height: 24px;"
                                            ></span>
                                        </div>
                                        <div
                                            class="tabbed-pane-tab-slider enabled"
                                            style="width: 52px; transform: translateX(0px) scaleY(0.75);"
                                        ></div>
                                    </div>
                                </div>
                                <div class="tabbed-pane-content">
                                    {/* <slot></slot> */}
                                    <div
                                        class="widget vbox flex-auto view-container overflow-auto"
                                        tabindex="-1"
                                        role="tabpanel"
                                        aria-label="Styles panel"
                                    >
                                        <div class="widget vbox flex-auto">
                                            <div class="widget vbox style-panes-wrapper">
                                                <div class="vbox flex-auto flex-none">
                                                    <div class="widget vbox styles-pane">
                                                        <StylesSidebarPane></StylesSidebarPane>
                                                    </div>
                                                </div>
                                                <div class="vbox flex-auto flex-none"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="shadow-split-widget-resizer"
                        style="cursor: ew-resize; right: 325px; margin-right: -3px;"
                    ></div>
                </div>
            </div>
        </div>
    );
};
