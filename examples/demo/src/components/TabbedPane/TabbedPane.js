import React, { useState } from 'react';

export default ({
    headerLeft,
    headerContents,
    headerRight,
    children,
    onChange,
    defaultSelect = 0,
    tablistData,
}) => {
    const [selectKey, setSelectKey] = useState(defaultSelect);

    const onSelectkey = key => {
        setSelectKey(key);
        onChange && onChange(key);
    };

    const translateX =
        selectKey === 0
            ? 0
            : tablistData.slice(0, selectKey).reduce((a, b) => {
                  return { ...b, width: a.width + b.width };
              }).width;

    return (
        <div class="widget vbox tabbed-pane-shadow">
            <div class="tabbed-pane-header">
                <div class="tabbed-pane-left-toolbar toolbar">{headerLeft}</div>
                <div class="tabbed-pane-header-contents">
                    <div class="tabbed-pane-header-tabs" role="tablist">
                        {tablistData.map((item, index) => (
                            <div
                                class={`tabbed-pane-header-tab${
                                    selectKey === index ? ' selected' : ''
                                }`}
                                id={`tab-${item.label}`}
                                style={{
                                    cursor: 'pointer',
                                    width: `${item.width}px`,
                                }}
                                onClick={() => onSelectkey(index)}
                            >
                                <span class="tabbed-pane-header-tab-title">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div
                        class="tabbed-pane-tab-slider enabled"
                        style={{
                            width: `${tablistData[selectKey].width}px`,
                            transform: `translateX(${translateX}px) scaleY(0.75)`,
                        }}
                    ></div>
                </div>
                <div class="tabbed-pane-right-toolbar toolbar">
                    {headerRight}
                </div>
            </div>
            <div class="tabbed-pane-content">{children}</div>
        </div>
    );
};
