import React, { useRef, useEffect } from 'react';
import DataContainer from './DataContainer';

// const columns = [
//     {
//         id: 'name',
//         title: 'Name',
//         width: 508,
//     },
//     {
//         id: 'status',
//         title: 'Status',
//         width: 153,
//     },
//     {
//         id: 'type',
//         title: 'Type',
//         width: 153,
//     },
//     {
//         id: 'initiator',
//         title: 'Initiator',
//         width: 254,
//     },
//     {
//         id: 'size',
//         title: 'Size',
//         width: 153,
//     },
//     {
//         id: 'time',
//         title: 'Time',
//         width: 153,
//     },
// ];

// const data = [
//     {
//         name: 'inspector.html',
//         status: 304,
//         type: 'document',
//         initiator: 'Other',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'root.js',
//         status: 200,
//         type: 'script',
//         initiator: 'inspector.html',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'Runtime.js',
//         status: 200,
//         type: 'script',
//         initiator: 'root.js:5',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'inspector.html',
//         status: 304,
//         type: 'document',
//         initiator: 'Other',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'root.js',
//         status: 200,
//         type: 'script',
//         initiator: 'inspector.html',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'Runtime.js',
//         status: 200,
//         type: 'script',
//         initiator: 'root.js:5',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'inspector.html',
//         status: 304,
//         type: 'document',
//         initiator: 'Other',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'root.js',
//         status: 200,
//         type: 'script',
//         initiator: 'inspector.html',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'Runtime.js',
//         status: 200,
//         type: 'script',
//         initiator: 'root.js:5',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'inspector.html',
//         status: 304,
//         type: 'document',
//         initiator: 'Other',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'root.js',
//         status: 200,
//         type: 'script',
//         initiator: 'inspector.html',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'Runtime.js',
//         status: 200,
//         type: 'script',
//         initiator: 'root.js:5',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'inspector.html',
//         status: 304,
//         type: 'document',
//         initiator: 'Other',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'root.js',
//         status: 200,
//         type: 'script',
//         initiator: 'inspector.html',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'Runtime.js',
//         status: 200,
//         type: 'script',
//         initiator: 'root.js:5',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'inspector.html',
//         status: 304,
//         type: 'document',
//         initiator: 'Other',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'root.js',
//         status: 200,
//         type: 'script',
//         initiator: 'inspector.html',
//         size: '2',
//         time: '2',
//     },
//     {
//         name: 'Runtime.js',
//         status: 200,
//         type: 'script',
//         initiator: 'root.js:5',
//         size: '2',
//         time: '2',
//     },
// ];

export default ({ children, data, columns, onBodyScroll }) => {
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

            {children}

            {/* <DataContainer
                onScroll={onBodyScroll}
                columns={columns}
                data={data}
            /> */}
        </div>
    );
};
