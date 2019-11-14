import React from 'react';

export const Sidebar = ({ children, maximized, width }) => {
    const cls = `shadow-split-widget-contents shadow-split-widget-sidebar vbox ${maximized &&
        'maximized'}`;

    return (
        <div class={cls} style={{ flexBasis: width + 'px' }}>
            {children}
        </div>
    );
};

export const Main = ({ children, maximized }) => {
    const cls = `shadow-split-widget-contents shadow-split-widget-main vbox ${maximized &&
        'maximized'}`;

    return <div class={cls}>{children}</div>;
};

export default ({ children, defaultSidebarWidth = 200, direction, drag }) => {
    const _direction = direction === 'vertical' ? 'vbox' : 'hbox';

    return (
        <div class={`widget shadow-split-widget ${_direction}`}>
            {children}
            {drag ? (
                <div
                    class="shadow-split-widget-resizer"
                    style="cursor: ew-resize; right: 200px; margin-right: -3px;"
                ></div>
            ) : null}

            {/* <div class="shadow-split-widget-resizer" style="cursor: ew-resize; right: 200px; margin-right: -3px;"></div> */}
        </div>
    );
};
