import React, { useRef, useEffect, useState } from 'react';
import { Widget, TabbedPane, Toolbar, ToolbarButton, Icon, Checkbox } from '../components';
import Frame from './Frame';
import Tree from './Frame/tree';
import { log } from './log';
import activities from './activities.json';

import './index.scss';

export default () => {
    const ref = useRef();
    const [state, setState] = useState({ left: 0, top: 0 });
    const [nodes, setNodes] = useState(activities.activities[0].data.snapshot);

    const test = {
        id: 1,
        childNodes: [
            { id: 2, childNodes: [] },
            { id: 3, childNodes: [] },
            { id: 4, childNodes: [{ id: 5, childNodes: [] }] },
        ],
    };

    const f = {
        parentId: 5,
        previousSiblingId: 1952,
        node: {
            tagName: 'STYLE',
            attributes: [{ name: 'type', value: 'text/css' }],
            nodeType: 1,
            id: 37400,
        },
    };

    const find = (arr, fn, result) => {
        arr.forEach(item => {
            if (item.childNodes && item.childNodes.length > 0) {
                find(item.childNodes, fn, result);
            }

            if (fn(item)) {
                // result.push(item);
                // console.log(item.id);
                item.childNodes.push(result);
            }
        });
    };

    var result = {
        tagName: 'STYLE',
        attributes: [{ name: 'type', value: 'text/css' }],
        nodeType: 1,
        id: 37400,
    };

    find(nodes.childNodes, item => item.id === 5, result);

    // console.log(nodes.childNodes);

    // const tree = new Tree(test);
    // console.log(tree);
    const a = {
        tagName: 'HTML',
        nodeType: 1,
        id: 2,
        childNodes: [
            {
                tagName: 'HEAD',
                nodeType: 1,
                id: 5,
                childNodes: [
                    {
                        textContent: '\n        ',
                        nodeType: 3,
                        id: 20,
                    },
                ],
            },
            {
                textContent: '\n\n    ',
                nodeType: 3,
                id: 9,
            },
            {
                tagName: 'BODY',
                attributes: [
                    {
                        name: 'class',
                        value: 'stbui-primary',
                    },
                ],
                nodeType: 1,
                id: 14,
                childNodes: [
                    {
                        textContent: '\n        ',
                        nodeType: 3,
                        id: 2079,
                    },
                ],
            },
        ],
    };
    var tree = new Tree(a);
    var result = {
        tagName: 'STYLE',
        attributes: [{ name: 'type', value: 'text/css' }],
        nodeType: 1,
        id: 37400,
    };
    // tree.add('two', 'one', tree.traverseBF);
    // tree.add('three', 'one', tree.traverseBF);
    // tree.remove(5, tree.traverseBF);

    console.log(tree);

    useEffect(() => {
        if (ref.current) {
            const width = ref.current.clientWidth;
            const height = ref.current.clientHeight;
            console.log(width, height);
            setState({ left: (width - 1000) / 2 });

            setTimeout(() => {
                // console.log(activities.activities[3]);
                // setNodes(log.session.snapshot);
                const snapshot = activities.activities[0].data.snapshot;

                const addedOrMoved = activities.activities;
                console.log(activities.activities[3]);

                // setNodes(log.session.snapshot);
                // setNodes(activities.activities[0].data.snapshot);
            }, 1000);
        }
    }, []);

    // console.log(activities.activities[0].data);
    // console.log(log.session.snapshot);

    return (
        <div class="widget vbox">
            <div class="vbox flex-auto" ref={ref}>
                <div className="cursour"></div>
                <div
                    style={{
                        width: '1000px',
                        height: '667px',
                        marginLeft: state.left + 'px',
                        marginTop: state.top + 'px',
                    }}
                >
                    <Frame id="viewer" nodes={nodes}></Frame>
                </div>
            </div>
            {/* <div class="widget hbox">
                <Toolbar>1</Toolbar>
            </div> */}
        </div>
    );
};
