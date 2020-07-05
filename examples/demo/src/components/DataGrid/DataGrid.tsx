import React, { useRef, useEffect } from 'react';

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

const DataGrid: any = ({ children, data, columns, onBodyScroll }) => {
    return (
        <div className="data-grid small network-log-grid">
            <div className="header-container">
                <table className="header">
                    <colgroup>
                        {columns.map(column => (
                            <col style={{ width: column.width + 'px' }} />
                        ))}
                        <col className="corner" />
                    </colgroup>
                    <tbody>
                        <tr>
                            {columns.map(column => (
                                <th className={`${column.id}-column sortable`}>
                                    <div>{column.title}</div>
                                    <div className="sort-order-icon-container">
                                        <span is="ui-icon" className="sort-order-icon"></span>
                                    </div>
                                </th>
                            ))}
                            <th className="corner"></th>
                        </tr>
                    </tbody>
                </table>
            </div>

            {children}

            <div className="data-grid-resizer" style={{ cursor: 'col-resize', left: columns[0].width + 'px' }}></div>
        </div>
    );
};

export default DataGrid;
