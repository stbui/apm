import React, { useState } from 'react';

export default ({ headerLeft, headerContents, headerRight, children, onChange, defaultSelect = 0, tablistData }) => {
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
        <div className="widget vbox tabbed-pane-shadow">
            <div className="tabbed-pane-header">
                <div className="tabbed-pane-left-toolbar toolbar">{headerLeft}</div>
                <div className="tabbed-pane-header-contents">
                    <div className="tabbed-pane-header-tabs" role="tablist">
                        {tablistData.map((item, index) => (
                            <div
                                className={`tabbed-pane-header-tab${selectKey === index ? ' selected' : ''}`}
                                id={`tab-${item.label}`}
                                style={{
                                    cursor: 'pointer',
                                    width: `${item.width}px`,
                                }}
                                onClick={() => onSelectkey(index)}
                            >
                                <span className="tabbed-pane-header-tab-title">{item.label}</span>
                            </div>
                        ))}
                    </div>
                    <div
                        className="tabbed-pane-tab-slider enabled"
                        style={{
                            width: `${tablistData[selectKey].width}px`,
                            transform: `translateX(${translateX}px) scaleY(0.75)`,
                        }}
                    ></div>
                </div>
                <div className="tabbed-pane-right-toolbar toolbar">{headerRight}</div>
            </div>
            <div className="tabbed-pane-content">{children}</div>
        </div>
    );
};
