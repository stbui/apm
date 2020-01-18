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
    const wrapperRef = useRef();
    const handleRef = useRef();
    const clickableRef = useRef();
    const [state, setState] = useState({ value: 0 });

    let offset;

    const getClickableWith = () => clickableRef.current.width;

    const timelineValueToPercentage = value => {
        return (value / offset) * 100;
    };

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

    const clickableWidthToPercentage = value => {
        const width = getClickableWith();
        return (value / width) * 100;
    };

    let activityBlocks = [];
    let activityIndex = -1;
    let percent = 0;
    let timelineProgressBarWidth = 0;
    let timelineProgressHandleOffset = 0;

    const filterActivityBlocks = a => {
        for (var b, c, d = [], e = offset / getClickableWith(), f = 0, g = a.length; f < g; )
            for (b = a[f], d.push(b), c = b.time + e, f++; f < g && a[f].time < c; ) f++;
        return d;
    };

    const setPercent = state => {
        if (activities[activityIndex]) {
            percent = timelineValueToPercentage(activities[activityIndex].time);
        } else if (state) {
            percent = 100;
        }
    };

    const updatetimelineProgress = _value => {
        _value = Math.max(_value, 0);
        _value = Math.min(_value, 100);

        const _percent = timelineValueToPercentage(value);
        timelineProgressBarWidth = Math.min(_percent, percent);
        timelineProgressHandleOffset = _value - clickableWidthToPercentage(s / 2);
    };

    const timelineProgress = value => {
        const percent = timelineValueToPercentage(value);
        updatetimelineProgress(percent);
    };

    const onRefresh = state => {
        if (Array.isArray(activities)) {
            const newActivities = activities.slice(activityIndex + 1);
            const _activityBlocks = activityBlocks;

            newActivities.forEach(activity => {
                _activityBlocks.push({ time: activity.time });
            });

            activityBlocks = filterActivityBlocks(_activityBlocks);
            activityIndex = activities.length - 1;

            setPercent(state);
            timelineProgress(value);
        }
    };

    const updateProgress = ({ pageX }) => {
        const { left } = clickableRef.current.offset();
        const offsetX = Math.max(pageX - left, min + 1);
        const value = getCalcValue(offsetX);
        setValue(value);
    };

    const updateDirtyState = state => {
        isDirty = state;
    };

    const onWrapperClick = event => {
        updateDirtyState(true);
        updateProgress(event);
        updateDirtyState(false);
    };

    useEffect(() => {
        offset = max - min;
    }, [min, max]);

    return (
        <div className="progress-wrapper" ref={wrapperRef} onClick={onWrapperClick}>
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
