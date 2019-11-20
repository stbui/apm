import React, { useRef, useEffect, useState } from 'react';

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

export default ({ data, columns, onScroll }) => {
    const ref = useRef();
    const [row, setRow] = useState([]);
    const [fillerRow, setFillerRow] = useState({ top: 0, bottom: '0' });

    const onMouseWheel = event => {
        onScroll && onScroll(event, ref.current.scrollHeight);
    };

    const onDataScroll = event => {
        console.log(event);
    };

    const _contentHeight = () => {
        const nodes = data;
        let result = 0;
        for (let i = 0, size = nodes.length; i < size; ++i) {
            result += 21;
        }
        return result;
    };

    const _calculateVisibleNodes = (clientHeight, scrollTop) => {
        const size = data.length;
        let i = 0;
        let y = 0;

        for (; i < size && y + 21 < scrollTop; ++i) {
            y += 21;
        }

        const start = i;
        const topPadding = y;
        for (; i < size && y < scrollTop + clientHeight; ++i) {
            y += 21;
        }
        const end = i;

        let bottomPadding = 0;
        for (; i < size; ++i) {
            bottomPadding += 21;
        }

        return {
            topPadding: topPadding,
            bottomPadding: bottomPadding,
            contentHeight: y - topPadding,
            visibleNodes: data.slice(start, end),
            offset: start,
        };
    };

    const setVerticalPadding = (top, bottom) => {
        const bottomPx = top || bottom ? bottom + 'px' : 'auto';

        setFillerRow({ top: top, bottom: bottomPx });
    };

    useEffect(() => {
        if (ref.current) {
            const clientHeight = ref.current.clientHeight;
            let scrollTop = ref.current.scrollTop;
            const currentScrollTop = scrollTop;
            const maxScrollTop = Math.max(0, _contentHeight() - clientHeight);
            scrollTop = Math.min(maxScrollTop, scrollTop);
            const viewportState = _calculateVisibleNodes(
                clientHeight,
                scrollTop
            );
            const visibleNodes = viewportState.visibleNodes;
            const visibleNodesSet = new Set(visibleNodes);

            // for (let i = 0; i < this._visibleNodes.length; ++i) {
            //     const oldNode = this._visibleNodes[i];
            //     if (!visibleNodesSet.has(oldNode) && oldNode.attached()) {
            //         const element = oldNode.existingElement();
            //         element.remove();
            //     }
            // }
            // let previousElement = this.topFillerRowElement();
            // const tBody = this.dataTableBody;
            let offset = viewportState.offset;

            // const lineNume = Math.floor(clientHeight / 21);
            // const newData = data.filter((_, index) => index < lineNume);
            setRow(visibleNodes);

            setVerticalPadding(
                viewportState.topPadding,
                viewportState.bottomPadding
            );
        }
    }, [ref]);

    return (
        <div
            ref={ref}
            class="data-container"
            onMouseWheel={onMouseWheel}
            onScroll={onDataScroll}
        >
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
                        height={fillerRow.top}
                    />

                    {row.map((row, index) => {
                        // select
                        // style="background-color: rgb(221, 238, 255);"
                        return (
                            <tr
                                class={`data-grid-data-grid-node revealed ${
                                    index % 2 === 1 ? 'odd' : ''
                                }`}
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
                                                        {row[column.id] === 200
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
                        style={{ height: fillerRow.bottom }}
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
    );
};
