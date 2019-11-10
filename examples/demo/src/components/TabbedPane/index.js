import { h } from '../../core';
import './index';

export default ({ headerLeft, headerContents, headerRight, children }) => {
    return (
        <div class="widget vbox tabbed-pane-shadow">
            <div class="tabbed-pane-header">
                <div class="tabbed-pane-left-toolbar toolbar">{headerLeft}</div>
                <div class="tabbed-pane-header-contents">
                    <div
                        class="tabbed-pane-header-tabs"
                        role="tablist"
                        aria-label="Panels"
                        style=""
                    >
                        <div
                            class="tabbed-pane-header-tab selected"
                            id="tab-elements"
                            role="tab"
                            aria-selected="true"
                            aria-label="Elements"
                            style="cursor: pointer; width: 73px;"
                            tabindex="0"
                        >
                            <span class="tabbed-pane-header-tab-title">
                                Elements
                            </span>
                        </div>
                        <div
                            class="tabbed-pane-header-tab"
                            id="tab-console"
                            role="tab"
                            aria-selected="false"
                            aria-label="Console"
                            style="cursor: pointer; width: 68px;"
                        >
                            <span class="tabbed-pane-header-tab-title">
                                Console
                            </span>
                        </div>
                        <div
                            class="tabbed-pane-header-tab"
                            id="tab-sources"
                            role="tab"
                            aria-selected="false"
                            aria-label="Sources"
                            style="cursor: pointer; width: 68px;"
                        >
                            <span class="tabbed-pane-header-tab-title">
                                Sources
                            </span>
                        </div>
                        <div
                            class="tabbed-pane-header-tab"
                            id="tab-network"
                            role="tab"
                            aria-selected="false"
                            aria-label="Network"
                            style="cursor: pointer; width: 69px;"
                        >
                            <span class="tabbed-pane-header-tab-title">
                                Network
                            </span>
                        </div>
                        <div
                            class="tabbed-pane-header-tab"
                            id="tab-timeline"
                            role="tab"
                            aria-selected="false"
                            aria-label="Performance"
                            style="cursor: pointer; width: 93px;"
                        >
                            <span class="tabbed-pane-header-tab-title">
                                Performance
                            </span>
                        </div>
                        <div
                            class="tabbed-pane-header-tab"
                            id="tab-heap_profiler"
                            role="tab"
                            aria-selected="false"
                            aria-label="Memory"
                            style="cursor: pointer; width: 68px;"
                        >
                            <span class="tabbed-pane-header-tab-title">
                                Memory
                            </span>
                        </div>
                        <div
                            class="tabbed-pane-header-tab"
                            id="tab-resources"
                            role="tab"
                            aria-selected="false"
                            aria-label="Application"
                            style="cursor: pointer; width: 84px;"
                        >
                            <span class="tabbed-pane-header-tab-title">
                                Application
                            </span>
                        </div>
                        <div
                            class="tabbed-pane-header-tab"
                            id="tab-security"
                            role="tab"
                            aria-selected="false"
                            aria-label="Security"
                            style="cursor: pointer; width: 67px;"
                        >
                            <span class="tabbed-pane-header-tab-title">
                                Security
                            </span>
                        </div>
                        <div
                            class="tabbed-pane-header-tab"
                            id="tab-audits"
                            role="tab"
                            aria-selected="false"
                            aria-label="Audits"
                            style="cursor: pointer; width: 58px;"
                        >
                            <span class="tabbed-pane-header-tab-title">
                                Audits
                            </span>
                        </div>
                    </div>
                    <div
                        class="tabbed-pane-tab-slider enabled"
                        style="width: 73px; transform: translateX(0px) scaleY(0.75);"
                    ></div>
                </div>
                <div class="tabbed-pane-right-toolbar toolbar">
                    {headerRight}
                </div>
            </div>
            <div class="tabbed-pane-content">{children}</div>
        </div>
    );
};
