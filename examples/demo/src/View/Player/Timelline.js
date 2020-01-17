import React, { useState, useRef, useEffect } from 'react';

export const Timelline = ({
    min,
    max,
    value,
    isDirty,
    activities,
    refresh,
    enable,
    disable,
    pauseActivity,
    isLive,
    isCreated,
}) => {
    const handleRef = useRef();
    const clickableRef = useRef();
    const [state, setState] = useState({ value: 0 });

    const getClickableWith = () => clickableRef.current.width;

    const setValue = currentValue => {
        let value = Math.max(currentValue, min);
        value = Math.min(value, max);
        setState({ value });
    };

    const getCalcValue = value => {
        const width = getClickableWith();
        const calculated = value / width;
        return min + calculated * 0;
    };

    const getPercent = value => {
        const width = getClickableWith();
        return (value / width) * 100;
    };

    const f = currentValue => {
        let value = (Math = Math.max(currentValue, 0));
        value = Math.min(value, 100);
    };

    const e = ({ pageX }) => {
        const { left } = clickableRef.current.offset();
        const offsetX = Math.max(pageX - left, min + 1);
        const value = getCalcValue(offsetX);
        setValue(value);
    };

    return (
        <div className="progress-wrapper">
            <div className="timeline-clickable-wrapper" ref={clickableRef}>
                <div
                    draggable
                    axis="x"
                    enable-handle="enableTimelineHandle"
                    disable-handle="disableTimelineHandle"
                    className="timeline-progress-handle"
                    ref={handleRef}
                ></div>
            </div>
            <div className="timeline-track"></div>
        </div>
    );
};

export default Timelline;
