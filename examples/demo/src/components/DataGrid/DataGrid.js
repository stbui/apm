import React, { useRef, useEffect } from 'react';

const GridFilterRow = ({ columns = [], type = 'top', height = 0 }) => {
    const ref = useRef();

    useEffect(() => {
        // console.log(ref.current);
    }, [ref]);

    return (
        <tr
            ref={ref}
            class="data-grid-filler-row revealed"
            style={{ height: height + 'px' }}
        >
            {columns.map(column => (
                <th class={`${type}-filler-td`} scope="col">
                    {column.title}
                </th>
            ))}

            <th class={`corner ${type}-filler-td`} scope="col"></th>
        </tr>
    );
};

const columns = [
    {
        id: 'name',
        title: 'Name',
        width: 508,
    },
    {
        id: 'status',
        title: 'Status',
        width: 153,
    },
    {
        id: 'type',
        title: 'Type',
        width: 153,
    },
    {
        id: 'initiator',
        title: 'Initiator',
        width: 254,
    },
    {
        id: 'size',
        title: 'Size',
        width: 153,
    },
    {
        id: 'time',
        title: 'Time',
        width: 153,
    },
];

const data = [
    {
        name: 'inspector.html',
        status: 304,
        type: 'document',
        initiator: 'Other',
        size: '2',
        time: '2',
    },
    {
        name: 'root.js',
        status: 200,
        type: 'script',
        initiator: 'inspector.html',
        size: '2',
        time: '2',
    },
    {
        name: 'Runtime.js',
        status: 200,
        type: 'script',
        initiator: 'root.js:5',
        size: '2',
        time: '2',
    },
    {
        name: 'inspector.html',
        status: 304,
        type: 'document',
        initiator: 'Other',
        size: '2',
        time: '2',
    },
    {
        name: 'root.js',
        status: 200,
        type: 'script',
        initiator: 'inspector.html',
        size: '2',
        time: '2',
    },
    {
        name: 'Runtime.js',
        status: 200,
        type: 'script',
        initiator: 'root.js:5',
        size: '2',
        time: '2',
    },
    {
        name: 'inspector.html',
        status: 304,
        type: 'document',
        initiator: 'Other',
        size: '2',
        time: '2',
    },
    {
        name: 'root.js',
        status: 200,
        type: 'script',
        initiator: 'inspector.html',
        size: '2',
        time: '2',
    },
    {
        name: 'Runtime.js',
        status: 200,
        type: 'script',
        initiator: 'root.js:5',
        size: '2',
        time: '2',
    },
    {
        name: 'inspector.html',
        status: 304,
        type: 'document',
        initiator: 'Other',
        size: '2',
        time: '2',
    },
    {
        name: 'root.js',
        status: 200,
        type: 'script',
        initiator: 'inspector.html',
        size: '2',
        time: '2',
    },
    {
        name: 'Runtime.js',
        status: 200,
        type: 'script',
        initiator: 'root.js:5',
        size: '2',
        time: '2',
    },
    {
        name: 'inspector.html',
        status: 304,
        type: 'document',
        initiator: 'Other',
        size: '2',
        time: '2',
    },
    {
        name: 'root.js',
        status: 200,
        type: 'script',
        initiator: 'inspector.html',
        size: '2',
        time: '2',
    },
    {
        name: 'Runtime.js',
        status: 200,
        type: 'script',
        initiator: 'root.js:5',
        size: '2',
        time: '2',
    },
    {
        name: 'inspector.html',
        status: 304,
        type: 'document',
        initiator: 'Other',
        size: '2',
        time: '2',
    },
    {
        name: 'root.js',
        status: 200,
        type: 'script',
        initiator: 'inspector.html',
        size: '2',
        time: '2',
    },
    {
        name: 'Runtime.js',
        status: 200,
        type: 'script',
        initiator: 'root.js:5',
        size: '2',
        time: '2',
    },
];

export default ({ children }) => {
    return (
        <div class="data-grid small network-log-grid">
            <div class="header-container">
                <table class="header">
                    <colgroup>
                        {columns.map(column => (
                            <col style={{ width: column.width + 'px' }} />
                        ))}
                        <col class="corner" />
                    </colgroup>
                    <tbody>
                        <tr>
                            {columns.map(column => (
                                <th class={`${column.id}-column sortable`}>
                                    <div>{column.title}</div>
                                    <div class="sort-order-icon-container">
                                        <span
                                            is="ui-icon"
                                            class="sort-order-icon"
                                        ></span>
                                    </div>
                                </th>
                            ))}
                            <th class="corner"></th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="data-container">
                <table class="data">
                    <colgroup>
                        {columns.map(column => (
                            <col style={{ width: column.width + 'px' }} />
                        ))}

                        <col class="corner" />
                    </colgroup>
                    <tbody>
                        <GridFilterRow
                            columns={columns}
                            type="top"
                            // height={110}
                        />

                        {data.map((row, index) => {
                            // select
                            // style="background-color: rgb(221, 238, 255);"
                            return (
                                <tr
                                    class="data-grid-data-grid-node revealed odd"
                                    style={{
                                        'background-color':
                                            index % 2 === 1
                                                ? 'rgb(245, 245, 245)'
                                                : '',
                                    }}
                                >
                                    {columns.map(column => {
                                        switch (column.id) {
                                            case 'name': {
                                                return (
                                                    <td
                                                        class={`${column.id}-column`}
                                                    >
                                                        <img
                                                            class={`icon document`}
                                                            alt="Document"
                                                        />
                                                        <span class="hidden network-badge"></span>
                                                        {row[column.id]}
                                                        <div class="network-cell-subtitle"></div>
                                                    </td>
                                                );
                                            }

                                            case 'status': {
                                                return (
                                                    <td
                                                        class={`${
                                                            column.id
                                                        }-column ${row[
                                                            column.id
                                                        ] === 200 &&
                                                            'network-dim-cell'}`}
                                                    >
                                                        {row[column.id]}
                                                        <div class="network-cell-subtitle">
                                                            {row[column.id] ===
                                                            200
                                                                ? 'OK'
                                                                : 'Not Modified'}
                                                        </div>
                                                    </td>
                                                );
                                            }

                                            case 'type': {
                                                return (
                                                    <td
                                                        class={`${column.id}-column`}
                                                    >
                                                        {row[column.id]}
                                                    </td>
                                                );
                                            }

                                            case 'initiator': {
                                                // <td class="initiator-column network-script-initiated">
                                                //     <span
                                                //         class="devtools-link"
                                                //         role="link"
                                                //     >
                                                //         root.js:5
                                                //     </span>
                                                //     <div class="network-cell-subtitle">
                                                //         Script
                                                //     </div>
                                                // </td>;
                                                return (
                                                    <td
                                                        class={`${column.id}-column`}
                                                    >
                                                        {row[column.id]}
                                                    </td>
                                                );
                                            }

                                            case 'size': {
                                                // <td class="initiator-column">
                                                //     <span
                                                //         class="devtools-link"
                                                //         role="link"
                                                //     >
                                                //         inspector.html
                                                //     </span>
                                                //     <div class="network-cell-subtitle">
                                                //         Parser
                                                //     </div>
                                                // </td>;
                                                return (
                                                    <td class="size-column right">
                                                        238&nbsp;B
                                                        <div class="network-cell-subtitle">
                                                            626&nbsp;B
                                                        </div>
                                                    </td>
                                                );
                                            }
                                            case 'time': {
                                                return (
                                                    <td class="time-column right">
                                                        2&nbsp;ms
                                                        <div class="network-cell-subtitle">
                                                            2&nbsp;ms
                                                        </div>
                                                    </td>
                                                );
                                            }
                                        }
                                    })}

                                    <td class="corner"></td>
                                </tr>
                            );
                        })}

                        {/* <GridFilterRow
                            columns={columns}
                            type="bottom"
                            height={0}
                        /> */}

                        {/* <tr
                            class="data-grid-filler-row revealed"
                            style="height: 0;"
                        >
                            <td class="bottom-filler-td"></td>
                            <td class="bottom-filler-td"></td>
                            <td class="bottom-filler-td"></td>
                            <td class="bottom-filler-td"></td>
                            <td class="bottom-filler-td"></td>
                            <td class="bottom-filler-td"></td>
                            <td class="corner bottom-filler-td"></td>
                        </tr> */}

                        <tr
                            class="data-grid-filler-row revealed"
                            style="height: 0px;"
                        >
                            <td class="bottom-filler-td"></td>
                            <td class="bottom-filler-td"></td>
                            <td class="bottom-filler-td"></td>
                            <td class="bottom-filler-td"></td>
                            <td class="bottom-filler-td"></td>
                            <td class="corner bottom-filler-td"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* {resizes.map(resize => (
                <div
                    class="data-grid-resizer"
                    style={{
                        cursor: 'col-resize',
                        left: resize + 12 + 'px',
                    }}
                ></div>
            ))} */}
        </div>
    );
};
