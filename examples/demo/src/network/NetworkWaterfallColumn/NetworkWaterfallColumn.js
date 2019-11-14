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
    const ref = useRef();

    const drawCanvas = () => {
        const position = ref.current.getBoundingClientRect();
        const context = ref.current.getContext('2d');
        context.save();
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
        context.translate(0, 0);
        context.rect(0, 0, 0, 0);
        context.clip();

        console.log(position);
    };

    const resetCanvas = () => {};

    useEffect(() => {
        if (ref.current) {
            console.log(ref.current);
            drawCanvas();
        }
    }, [ref]);

    return (
        <div class="widget vbox network-waterfall-view">
            <canvas
                ref={ref}
                tabindex="0"
                width="398"
                height="864"
                style="width: 199px; height: 432px;"
            ></canvas>

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
