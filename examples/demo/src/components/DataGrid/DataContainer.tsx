import React, { useRef, useEffect, useState } from 'react';

const GridFilterRow = ({ columns = [], type = 'top', height = 0 }) => {
    const ref = useRef();

    useEffect(() => {
        // console.log(ref.current);
    }, [ref]);

    return (
        <tr ref={ref} class="data-grid-filler-row revealed" style={{ height: height + 'px' }}>
            {columns.map(column => (
                <th class={`${type}-filler-td`} scope="col">
                    {column.title}
                </th>
            ))}

            <th class={`corner ${type}-filler-td`} scope="col"></th>
        </tr>
    );
};

export default ({ data, columns, scrollTop, onMouseWheel }) => {
    const ref = useRef();
    const refTopFiller = useRef();
    const [row, setRow] = useState([]);
    const [fillerRow, setFillerRow] = useState({ top: 0, bottom: '0px' });

    let _stickToBottom = false;
    let _updateIsFromUser = false;
    let _lastScrollTop = 0;
    let _firstVisibleIsStriped = false;
    let _isStriped = false;

    let _updateAnimationFrameId;

    const topFillerRowElement = () => {
        return refTopFiller.current;
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

        if (fillerRow.top === top && fillerRow.bottom === bottomPx) {
            return;
        }

        setFillerRow({ top: top, bottom: bottomPx });
    };

    const _update = () => {
        if (_updateAnimationFrameId) {
            document
                .getElementsByClassName('data-grid')[0]
                .ownerDocument.defaultView.cancelAnimationFrame(_updateAnimationFrameId);
            _updateAnimationFrameId = undefined;
        }

        const scrollContainer = ref.current;
        const clientHeight = scrollContainer.clientHeight;
        let scrollTop = scrollContainer.scrollTop;
        const currentScrollTop = scrollTop;
        const maxScrollTop = Math.max(0, _contentHeight() - clientHeight);
        if (!_updateIsFromUser && _stickToBottom) {
            scrollTop = maxScrollTop;
        }
        _updateIsFromUser = false;
        scrollTop = Math.min(maxScrollTop, scrollTop);
        const viewportState = _calculateVisibleNodes(clientHeight, scrollTop);
        const visibleNodes = viewportState.visibleNodes;

        let previousElement = topFillerRowElement();
        let offset = viewportState.offset;
        let tBody = [];

        for (let i = 0; i < visibleNodes.length; ++i) {
            const node = visibleNodes[i];
            console.log(node);
            const element = node;
            // if (element !== previousElement.nextSibling) {
            //     tBody.insertBefore(element, previousElement.nextSibling);
            // }
            tBody.push(element);
            previousElement = element;
        }

        setRow(tBody);

        setVerticalPadding(viewportState.topPadding, viewportState.bottomPadding);

        _lastScrollTop = scrollTop;
        if (scrollTop !== currentScrollTop) {
            scrollContainer.scrollTop = scrollTop;
        }
    };

    const scheduleUpdate = isFromUser => {
        const scrollContainer = ref.current;

        if (_stickToBottom && isFromUser) {
            _stickToBottom =
                Math.abs(scrollContainer.scrollTop + scrollContainer.clientHeight - scrollContainer.scrollHeight) <= 2;
        }
        _updateIsFromUser = _updateIsFromUser || isFromUser;
        if (_updateAnimationFrameId) {
            return;
        }
        _updateAnimationFrameId = document
            .getElementsByClassName('data-grid')[0]
            .ownerDocument.defaultView.requestAnimationFrame(_update);
    };

    const onScroll = event => {
        const scrollContainer = ref.current;

        _stickToBottom =
            Math.abs(scrollContainer.scrollTop + scrollContainer.clientHeight - scrollContainer.scrollHeight) <= 2;

        if (_lastScrollTop !== scrollContainer.scrollTop) {
            scheduleUpdate(true);
        }
    };

    useEffect(() => {
        if (ref.current) {
            _update();

            const scrollContainer = ref.current;
            scrollContainer.scrollTop = scrollTop;

            window.addEventListener(
                'resize',
                () => {
                    // _update();
                },
                true
            );
        }
    }, [ref, scrollTop]);

    return (
        <div ref={ref} class="data-container" onMouseWheel={onMouseWheel} onScroll={onScroll}>
            <table class="data">
                <colgroup>
                    {columns.map(column => (
                        <col style={{ width: column.width + 'px' }} />
                    ))}

                    <col class="corner" />
                </colgroup>
                <tbody>
                    <tr
                        ref={refTopFiller}
                        class="data-grid-filler-row revealed"
                        style={{ height: fillerRow.top + 'px' }}
                    >
                        {columns.map(column => (
                            <th class="top-filler-td" scope="col">
                                {column.title}
                            </th>
                        ))}

                        <th class="corner top-filler-td" scope="col"></th>
                    </tr>

                    {row.map((row, index) => {
                        // select
                        // style="background-color: rgb(221, 238, 255);"
                        return (
                            <tr
                                className={`data-grid-data-grid-node revealed ${index % 2 === 1 ? 'odd' : ''}`}
                                style={{ backgroundColor: index % 2 === 1 ? 'rgb(245, 245, 245)' : '' }}
                            >
                                {columns.map(column => {
                                    switch (column.id) {
                                        case 'name': {
                                            return (
                                                <td className={`${column.id}-column`}>
                                                    <img className={`icon document`} alt="Document" />
                                                    <span className="hidden network-badge"></span>
                                                    {row[column.id]}
                                                    <div className="network-cell-subtitle"></div>
                                                </td>
                                            );
                                        }

                                        case 'status': {
                                            return (
                                                <td
                                                    className={`${column.id}-column ${
                                                        row[column.id] === 200 && 'network-dim-cell'
                                                    }`}
                                                >
                                                    {row[column.id]}
                                                    <div className="network-cell-subtitle">
                                                        {row[column.id] === 200 ? 'OK' : 'Not Modified'}
                                                    </div>
                                                </td>
                                            );
                                        }

                                        case 'type': {
                                            return <td className={`${column.id}-column`}>{row[column.id]}</td>;
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
                                            return <td className={`${column.id}-column`}>{row[column.id]}</td>;
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
                                                <td className="size-column right">
                                                    {row[column.id]}&nbsp;B
                                                    <div className="network-cell-subtitle">626&nbsp;B</div>
                                                </td>
                                            );
                                        }
                                        case 'time': {
                                            return (
                                                <td className="time-column right">
                                                    {row[column.id]}&nbsp;ms
                                                    <div className="network-cell-subtitle">2&nbsp;ms</div>
                                                </td>
                                            );
                                        }

                                        default: {
                                            return <td className={`${column.id}-column`}>{row[column.id]}</td>;
                                        }
                                    }
                                })}

                                <td class="corner"></td>
                            </tr>
                        );
                    })}

                    <tr class="data-grid-filler-row revealed" style={{ height: fillerRow.bottom }}>
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
