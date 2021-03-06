import React, { useRef, useEffect, useState } from 'react';

const Icon = ({ type }) => {
    const iconClass = type ? ' document' : '';
    return type ? <img className={`icon${iconClass}`} alt={iconClass} /> : null;
};

const Td: any = ({ id, children, align, subtitle, icon, ...other }) => {
    const right = align === 'right' ? ' right' : '';
    const a = 'network-dim-cell';

    return (
        <td className={`${id}-column${right}`} {...other}>
            {children}
            <div className="network-cell-subtitle">{subtitle}</div>
        </td>
    );
};

const Row = ({ columns, index, row, selected, onSelected, onCell }) => {
    // select
    // style="background-color: rgb(221, 238, 255);"
    const onRowClick = () => onSelected(index);

    const errRow = row.statusCode === 500 ? 'network-error-row' : null;
    const oddRow = index % 2 === 1 ? 'odd' : null;
    const selectRow = selected ? 'selected' : null;

    return (
        <tr
            className={`data-grid-data-grid-node revealed ${errRow} ${oddRow} ${selectRow} `}
            style={{ backgroundColor: index % 2 === 1 ? 'var(--network-grid-stripe-color)' : '' }}
            onClick={onRowClick}
        >
            {columns.map(column => {
                switch (column.id) {
                    case 'name': {
                        return (
                            <Td
                                key={column.id}
                                id={column.id}
                                subtitle={row[column.id]}
                                onClick={() => onCell && onCell(row[column.id])}
                            >
                                <Icon type="document" />
                                {row[column.id]}
                            </Td>
                        );

                        // return (
                        //     <td className={`${column.id}-column`}>
                        //         <img className={`icon document`} alt="Document" />
                        //         <span className="hidden network-badge"></span>
                        //         {row[column.id]}
                        //         <div className="network-cell-subtitle"></div>
                        //     </td>
                        // );
                    }

                    case 'status': {
                        return (
                            <td
                                key={column.id}
                                className={`${column.id}-column ${row[column.id] === 200 && 'network-dim-cell'}`}
                            >
                                {row[column.id]}
                                <div className="network-cell-subtitle">
                                    {row[column.id] === 200 ? 'OK' : 'Not Modified'}
                                </div>
                            </td>
                        );
                    }

                    case 'size': {
                        return (
                            <Td key={column.id} id={column.id} align="right" subtitle={`${row[column.id]}&nbsp;B`}>
                                {row[column.id]}&nbsp;B
                            </Td>
                        );
                    }
                    case 'time': {
                        return (
                            <Td key={column.id} id={column.id} align="right" subtitle={`${row[column.id]}&nbsp;ms`}>
                                {row[column.id]}&nbsp;ms
                            </Td>
                        );
                    }

                    default: {
                        return (
                            <Td key={column.id} id={column.id}>
                                {row[column.id]}
                            </Td>
                        );
                    }
                }
            })}

            <td className="corner"></td>
        </tr>
    );
};

const GridFilterRow = ({ cells, height = 0 }) => {
    return (
        <tr className="data-grid-filler-row revealed" style={{ height }}>
            {cells.map(cell => (
                <td className="bottom-filler-td"></td>
            ))}
            <td className="corner bottom-filler-td"></td>
        </tr>
    );
};

let _stickToBottom = false;
let _updateIsFromUser = false;
let _lastScrollTop = 0;
let _firstVisibleIsStriped = false;
let _isStriped = false;
let _updateAnimationFrameId;

export default ({ data, columns, scrollTop, onMouseWheel, onCell }) => {
    const ref: any = useRef();
    const refTopFiller: any = useRef();
    const [row, setRow] = useState([]);
    const [fillerRow, setFillerRow] = useState({ top: 0, bottom: '0px' });

    const [selectedRow, setSelectedRow] = useState();

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
        const visibleNodesSet = new Set(visibleNodes);

        let previousElement = topFillerRowElement();
        let offset = viewportState.offset;
        let tBody: any = [];

        if (visibleNodes.length) {
            // const nodes = this.rootNode().flatChildren();
            // const index = nodes.indexOf(visibleNodes[0]);
            // this._updateStripesClass(!!(index % 2));
            // if (this._stickToBottom && index !== -1 && !!(index % 2) !== this._firstVisibleIsStriped) {
            //     offset += 1;
            // }
        }

        _firstVisibleIsStriped = !!(offset % 2);

        for (let i = 0; i < visibleNodes.length; ++i) {
            const node = visibleNodes[i];
            const element = node;
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
        }
    }, [ref, scrollTop]);

    return (
        <div ref={ref} className="data-container" onMouseWheel={onMouseWheel} onScroll={onScroll}>
            <table className="data">
                <colgroup>
                    {columns.map(column => (
                        <col style={{ width: column.width + 'px' }} />
                    ))}

                    <col className="corner" />
                </colgroup>
                <tbody>
                    <tr
                        ref={refTopFiller}
                        className="data-grid-filler-row revealed"
                        style={{ height: fillerRow.top + 'px' }}
                    >
                        {columns.map(column => (
                            <th className="top-filler-td" scope="col">
                                {column.title}
                            </th>
                        ))}

                        <th className="corner top-filler-td" scope="col"></th>
                    </tr>

                    {row.map((row, index) => {
                        return (
                            <Row
                                columns={columns}
                                index={index}
                                row={row}
                                selected={selectedRow === index}
                                onSelected={i => setSelectedRow(i)}
                                onCell={onCell}
                            ></Row>
                        );
                    })}

                    {/* <tr className="data-grid-filler-row revealed" style={{ height: fillerRow.bottom }}>
                        <td className="bottom-filler-td"></td>
                        <td className="bottom-filler-td"></td>
                        <td className="bottom-filler-td"></td>
                        <td className="bottom-filler-td"></td>
                        <td className="bottom-filler-td"></td>
                        <td className="corner bottom-filler-td"></td>
                    </tr> */}
                    <GridFilterRow height={fillerRow.bottom} cells={columns} />
                </tbody>
            </table>
        </div>
    );
};
