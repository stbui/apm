import React, { useRef, useEffect } from 'react';
import {
    Widget,
    TabbedPane,
    Toolbar,
    ToolbarButton,
    Icon,
    Checkbox,
} from '../../components';

export default ({ width, height }) => {
    const ref = useRef();
    const refView = useRef();

    const _buildRequestTimeRangeStyle = () => {
        const types = {
            Push: 'push',
            Queueing: 'queueing',
            Blocking: 'blocking',
            Connecting: 'connecting',
            DNS: 'dns',
            Proxy: 'proxy',
            Receiving: 'receiving',
            ReceivingPush: 'receiving-push',
            Sending: 'sending',
            ServiceWorker: 'serviceworker',
            ServiceWorkerPreparation: 'serviceworker-preparation',
            SSL: 'ssl',
            Total: 'total',
            Waiting: 'waiting',
        };

        const styleMap = new Map();
        styleMap.set(types.Connecting, { fillStyle: '#FF9800' });
        styleMap.set(types.SSL, { fillStyle: '#9C27B0' });
        styleMap.set(types.DNS, { fillStyle: '#009688' });
        styleMap.set(types.Proxy, { fillStyle: '#A1887F' });
        styleMap.set(types.Blocking, { fillStyle: '#AAAAAA' });
        styleMap.set(types.Push, { fillStyle: '#8CDBff' });
        styleMap.set(types.Queueing, {
            fillStyle: 'white',
            lineWidth: 2,
            borderColor: 'lightgrey',
        });
        // This ensures we always show at least 2 px for a request.
        styleMap.set(types.Receiving, {
            fillStyle: '#03A9F4',
            lineWidth: 2,
            borderColor: '#03A9F4',
        });
        styleMap.set(types.Waiting, { fillStyle: '#00C853' });
        styleMap.set(types.ReceivingPush, { fillStyle: '#03A9F4' });
        styleMap.set(types.ServiceWorker, { fillStyle: 'orange' });
        styleMap.set(types.ServiceWorkerPreparation, { fillStyle: 'orange' });
        return styleMap;
    };

    const _buildResourceTypeStyle = () => {
        const baseResourceTypeColors = new Map([
            ['document', 'hsl(215, 100%, 80%)'],
            ['font', 'hsl(8, 100%, 80%)'],
            ['media', 'hsl(90, 50%, 80%)'],
            ['image', 'hsl(90, 50%, 80%)'],
            ['script', 'hsl(31, 100%, 80%)'],
            ['stylesheet', 'hsl(272, 64%, 80%)'],
            ['texttrack', 'hsl(8, 100%, 80%)'],
            ['websocket', 'hsl(0, 0%, 95%)'],
            ['xhr', 'hsl(53, 100%, 80%)'],
            ['fetch', 'hsl(53, 100%, 80%)'],
            ['other', 'hsl(0, 0%, 95%)'],
        ]);
        const waitingStyleMap = new Map();
        const downloadingStyleMap = new Map();
    };

    const drawCanvas = () => {
        const position = ref.current.getBoundingClientRect();
        const context = ref.current.getContext('2d');

        const ratio = window.devicePixelRatio;

        ref.current.width = width * ratio;
        ref.current.height = height * ratio;
        ref.current.style.width = width + 'px';
        ref.current.style.height = height + 'px';

        context.save();
        context.scale(ratio, ratio);
        context.translate(0, 27);
        context.rect(0, 0, width, height);
        context.clip();

        for (let i = 0; i < 21; i++) {
            const rowOffset = 21 * i;

            context.save();
            context.beginPath();
            context.fillStyle = i % 2 !== 0 ? '#f5f5f5' : '#ffffff';
            context.rect(0, rowOffset, width, 21);
            context.fill();
        }
    };

    const resetCanvas = () => {};

    const onScroll = e => {
        console.log(e);
    };

    const onMouseWheel = e => {
        console.log(e);
    };

    useEffect(() => {
        if (ref.current) {
            drawCanvas();
        }
    }, [ref, width, height]);

    useEffect(() => {
        if (refView.current) {
            refView.current.addEventListener('mousewheel', onMouseWheel);
        }
    }, [refView]);

    return (
        <div ref={refView} class="widget vbox network-waterfall-view">
            <canvas ref={ref}></canvas>

            <div class="network-waterfall-v-scroll small">
                <div
                    class="network-waterfall-v-scroll-content"
                    style="height: 862px;"
                ></div>
            </div>

            <div class="network-waterfall-header small">
                <div>Waterfall</div>
                <div class="sort-order-icon-container">
                    <span
                        is="ui-icon"
                        class="sort-order-icon spritesheet-smallicons smallicon-triangle-up icon-mask"
                        style="--spritesheet-position:-20px 10px; width: 10px; height: 10px;"
                    ></span>
                </div>
            </div>
        </div>
    );
};
