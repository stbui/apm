import React from 'react';

export default ({ children }) => {
    return (
        <div class="data-grid small network-log-grid">
            <div class="header-container">
                <table class="header">
                    <colgroup>
                        <col style="width: 508px;" />
                        <col style="width: 153px;" />
                        <col style="width: 153px;" />
                        <col style="width: 254px;" />
                        <col style="width: 153px;" />
                        <col style="width: 153px;" />
                        <col class="corner" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th class="name-column sortable">
                                <div>Name</div>
                                <div class="sort-order-icon-container">
                                    <span
                                        is="ui-icon"
                                        class="sort-order-icon"
                                    ></span>
                                </div>
                            </th>
                            <th class="status-column sortable">
                                <div>Status</div>
                                <div class="sort-order-icon-container">
                                    <span
                                        is="ui-icon"
                                        class="sort-order-icon"
                                    ></span>
                                </div>
                            </th>
                            <th class="type-column sortable">
                                <div>Type</div>
                                <div class="sort-order-icon-container">
                                    <span
                                        is="ui-icon"
                                        class="sort-order-icon"
                                    ></span>
                                </div>
                            </th>
                            <th class="initiator-column sortable">
                                <div>Initiator</div>
                                <div class="sort-order-icon-container">
                                    <span
                                        is="ui-icon"
                                        class="sort-order-icon"
                                    ></span>
                                </div>
                            </th>
                            <th class="size-column sortable">
                                <div>Size</div>
                                <div class="sort-order-icon-container">
                                    <span
                                        is="ui-icon"
                                        class="sort-order-icon"
                                    ></span>
                                </div>
                            </th>
                            <th class="time-column sortable">
                                <div>Time</div>
                                <div class="sort-order-icon-container">
                                    <span
                                        is="ui-icon"
                                        class="sort-order-icon"
                                    ></span>
                                </div>
                            </th>
                            <th class="corner"></th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="data-container">
                <table class="data">
                    <colgroup>
                        <col style="width: 508px;" />
                        <col style="width: 153px;" />
                        <col style="width: 153px;" />
                        <col style="width: 254px;" />
                        <col style="width: 153px;" />
                        <col style="width: 153px;" />
                        <col class="corner" />
                    </colgroup>
                    <tbody>
                        <tr
                            class="data-grid-filler-row revealed"
                            style="height: 0px;"
                        >
                            <th class="top-filler-td" scope="col">
                                Name
                            </th>
                            <th class="top-filler-td" scope="col">
                                Status
                            </th>
                            <th class="top-filler-td" scope="col">
                                Type
                            </th>
                            <th class="top-filler-td" scope="col">
                                Initiator
                            </th>
                            <th class="top-filler-td" scope="col">
                                Size
                            </th>
                            <th class="top-filler-td" scope="col">
                                Time
                            </th>
                            <th class="corner top-filler-td" scope="col"></th>
                        </tr>

                        <tr
                            class="data-grid-data-grid-node revealed odd"
                            style="background-color: rgb(221, 238, 255);"
                        >
                            <td class="name-column">
                                <img class="icon document" alt="Document" />
                                <span class="hidden network-badge"></span>
                                inspector.html
                                <div class="network-cell-subtitle"></div>
                            </td>
                            <td class="status-column">
                                304
                                <div class="network-cell-subtitle">
                                    Not Modified
                                </div>
                            </td>
                            <td class="type-column">document</td>
                            <td class="initiator-column network-dim-cell">
                                Other
                            </td>
                            <td class="size-column right">
                                238&nbsp;B
                                <div class="network-cell-subtitle">
                                    626&nbsp;B
                                </div>
                            </td>
                            <td class="time-column right">
                                2&nbsp;ms
                                <div class="network-cell-subtitle">
                                    2&nbsp;ms
                                </div>
                            </td>
                            <td class="corner"></td>
                        </tr>
                        <tr
                            class="data-grid-data-grid-node revealed"
                            style="background-color: rgb(255, 255, 255);"
                        >
                            <td class="name-column">
                                <img class="icon script" alt="Script" />
                                <span class="hidden network-badge"></span>
                                root.js<div class="network-cell-subtitle"></div>
                            </td>
                            <td class="status-column network-dim-cell">
                                200<div class="network-cell-subtitle">OK</div>
                            </td>
                            <td class="type-column">script</td>
                            <td class="initiator-column">
                                <span class="devtools-link" role="link">
                                    inspector.html
                                </span>
                                <div class="network-cell-subtitle">Parser</div>
                            </td>
                            <td class="size-column right network-dim-cell">
                                (disk cache)
                                <div class="network-cell-subtitle">
                                    698&nbsp;B
                                </div>
                            </td>
                            <td class="time-column right">
                                2&nbsp;ms
                                <div class="network-cell-subtitle">
                                    1&nbsp;ms
                                </div>
                            </td>
                            <td class="corner"></td>
                        </tr>
                        <tr
                            class="data-grid-data-grid-node revealed odd"
                            style="background-color: rgb(245, 245, 245);"
                        >
                            <td class="name-column">
                                <img class="icon script" alt="Script" />
                                <span class="hidden network-badge"></span>
                                inspector.js
                                <div class="network-cell-subtitle"></div>
                            </td>
                            <td class="status-column">
                                304
                                <div class="network-cell-subtitle">
                                    Not Modified
                                </div>
                            </td>
                            <td class="type-column">script</td>
                            <td class="initiator-column">
                                <span class="devtools-link" role="link">
                                    inspector.html
                                </span>
                                <div class="network-cell-subtitle">Parser</div>
                            </td>
                            <td class="size-column right">
                                238&nbsp;B
                                <div class="network-cell-subtitle">
                                    209&nbsp;B
                                </div>
                            </td>
                            <td class="time-column right">
                                3&nbsp;ms
                                <div class="network-cell-subtitle">
                                    2&nbsp;ms
                                </div>
                            </td>
                            <td class="corner"></td>
                        </tr>
                        <tr
                            class="data-grid-data-grid-node revealed"
                            style="background-color: rgb(255, 255, 255);"
                        >
                            <td class="name-column">
                                <img class="icon script" alt="Script" />
                                <span class="hidden network-badge"></span>
                                Runtime.js
                                <div class="network-cell-subtitle"></div>
                            </td>
                            <td class="status-column network-dim-cell">
                                200<div class="network-cell-subtitle">OK</div>
                            </td>
                            <td class="type-column">script</td>
                            <td class="initiator-column network-script-initiated">
                                <span class="devtools-link" role="link">
                                    root.js:5
                                </span>
                                <div class="network-cell-subtitle">Script</div>
                            </td>
                            <td class="size-column right network-dim-cell">
                                (disk cache)
                                <div class="network-cell-subtitle">
                                    32.0&nbsp;KB
                                </div>
                            </td>
                            <td class="time-column right">
                                3&nbsp;ms
                                <div class="network-cell-subtitle">
                                    2&nbsp;ms
                                </div>
                            </td>
                            <td class="corner"></td>
                        </tr>

                        <tr class="data-grid-filler-row revealed" style="height: auto;"><td class="bottom-filler-td"></td><td class="bottom-filler-td"></td><td class="bottom-filler-td"></td><td class="bottom-filler-td"></td><td class="bottom-filler-td"></td><td class="bottom-filler-td"></td><td class="corner bottom-filler-td"></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
