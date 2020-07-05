import React, { useRef, useEffect } from 'react';
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
        <div class="widget vbox resource-timing-view">
            <table class="network-timing-table resource-timing-table">
                <colgroup>
                    <col class="labels" />
                    <col class="bars" />
                    <col class="duration" />
                </colgroup>
                <thead class="network-timing-start">
                    <tr>
                        <th scope="col">
                            <span class="network-timing-hidden-header">
                                Label
                            </span>
                        </th>
                        <th scope="col">
                            <span class="network-timing-hidden-header">
                                Waterfall
                            </span>
                        </th>
                        <th scope="col">
                            <span class="network-timing-hidden-header">
                                Duration
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="3">Queued at 627.57&nbsp;ms</td>
                    </tr>
                    <tr>
                        <td colspan="3">Started at 628.41&nbsp;ms</td>
                    </tr>
                </thead>
                <tr class="network-timing-table-header">
                    <td role="heading" aria-level="2">
                        Resource Scheduling
                    </td>
                    <td></td>
                    <td>DURATION</td>
                </tr>
                <tr>
                    <td>Queueing</td>
                    <td>
                        <div
                            class="network-timing-row"
                            aria-label="Started at 627.57&nbsp;ms"
                        >
                            <span
                                class="network-timing-bar queueing"
                                style="left: 0%; right: 67.5926%;"
                            >
                                ​
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="network-timing-bar-title">0.84&nbsp;ms</div>
                    </td>
                </tr>
                <tr class="network-timing-table-header">
                    <td role="heading" aria-level="2">
                        Connection Start
                    </td>
                    <td></td>
                    <td>DURATION</td>
                </tr>
                <tr>
                    <td>Stalled</td>
                    <td>
                        <div
                            class="network-timing-row"
                            aria-label="Started at 628.41&nbsp;ms"
                        >
                            <span
                                class="network-timing-bar blocking"
                                style="left: 32.4074%; right: 52.4306%;"
                            >
                                ​
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="network-timing-bar-title">0.39&nbsp;ms</div>
                    </td>
                </tr>
                <tr class="network-timing-table-header">
                    <td role="heading" aria-level="2">
                        Request/Response
                    </td>
                    <td></td>
                    <td>DURATION</td>
                </tr>
                <tr>
                    <td>Request sent</td>
                    <td>
                        <div
                            class="network-timing-row"
                            aria-label="Started at 628.81&nbsp;ms"
                        >
                            <span
                                class="network-timing-bar sending"
                                style="left: 47.5694%; right: 52.4306%;"
                            >
                                ​
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="network-timing-bar-title">0</div>
                    </td>
                </tr>
                <tr>
                    <td>Waiting (TTFB)</td>
                    <td>
                        <div
                            class="network-timing-row"
                            aria-label="Started at 628.81&nbsp;ms"
                        >
                            <span
                                class="network-timing-bar waiting"
                                style="left: 47.5694%; right: 30.5556%;"
                            >
                                ​
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="network-timing-bar-title">0.57&nbsp;ms</div>
                    </td>
                </tr>
                <tr>
                    <td>Content Download</td>
                    <td>
                        <div
                            class="network-timing-row"
                            aria-label="Started at 629.37&nbsp;ms"
                        >
                            <span
                                class="network-timing-bar receiving"
                                style="left: 69.4444%; right: 0%;"
                            >
                                ​
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="network-timing-bar-title">0.79&nbsp;ms</div>
                    </td>
                </tr>
                <tr class="network-timing-footer">
                    <td colspan="1">
                        <x-link
                            class=" devtools-link"
                            role="link"
                            tabindex="0"
                            target="_blank"
                            href="https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#timing-explanation"
                            style="display: inline; cursor: pointer;"
                        >
                            Explanation
                        </x-link>
                    </td>
                    <td></td>
                    <td>2.59&nbsp;ms</td>
                </tr>
            </table>
        </div>
    );
};
