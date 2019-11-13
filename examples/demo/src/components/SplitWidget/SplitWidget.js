import React from 'react';

export const Sidebar = ({ children, maximized }) => {
    const cls = `shadow-split-widget-contents shadow-split-widget-sidebar vbox ${maximized &&
        'maximized'}`;
        console.log(children)
    return <div class={cls}>{children}</div>;
};

export const Main = ({ children, maximized }) => {
    const cls = `shadow-split-widget-contents shadow-split-widget-main vbox ${maximized &&
        'maximized'}`;

    return <div class={cls}>{children}</div>;
};

export default ({
    children,
    defaultSidebarWidth = 200,
    sidebar,
    direction,
}) => {
    const _direction = direction === 'vertical' ? 'vbox' : 'hbox';

   

    return (
        <div class={`widget shadow-split-widget ${_direction}`}>
            {children}
            {/* {children ? (
                <div class="shadow-split-widget-contents shadow-split-widget-main vbox maximized">
                    {children}
                </div>
            ) : null}
            {sidebar ? (
                <div class="shadow-split-widget-contents shadow-split-widget-sidebar vbox maximized">
                    {sidebar}
                </div>
            ) : null} */}
            <div class="shadow-split-widget-resizer hidden" style=""></div>
            {/* <div class="shadow-split-widget-resizer" style="cursor: ew-resize; right: 200px; margin-right: -3px;"></div> */}
        </div>
    );
};
