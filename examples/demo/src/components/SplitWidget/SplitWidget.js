import { h } from '../../core';

export default ({
    children,
    defaultSidebarWidth = 200,
    sidebar,
    direction,
}) => {
    const _direction = direction === 'vertical' ? 'vbox' : 'hbox';

    return (
        <div class={`widget shadow-split-widget ${_direction}`}>
            {children ? (
                <div class="shadow-split-widget-contents shadow-split-widget-main vbox maximized">
                    {children}
                </div>
            ) : null}
            {sidebar ? (
                <div class="shadow-split-widget-contents shadow-split-widget-sidebar vbox maximized">
                    {sidebar}
                </div>
            ) : null}
            <div class="shadow-split-widget-resizer hidden" style=""></div>
        </div>
    );
};
