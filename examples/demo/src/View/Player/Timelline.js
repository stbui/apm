import React, { useState, useRef, useEffect } from 'react';
import './Timeline.scss';

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
    let activityBlocks = [
        {
            time: -1,
        },
        {
            time: 798,
        },
        {
            time: 911,
        },
        {
            time: 1143,
        },
        {
            time: 12017,
        },
        {
            time: 12411,
        },
        {
            time: 12544,
        },
        {
            time: 13094,
        },
        {
            time: 13221,
        },
        {
            time: 13378,
        },
        {
            time: 13779,
        },
        {
            time: 13896,
        },
        {
            time: 14010,
        },
        {
            time: 14142,
        },
        {
            time: 14820,
        },
        {
            time: 25014,
        },
        {
            time: 25407,
        },
        {
            time: 25530,
        },
        {
            time: 25647,
        },
        {
            time: 26072,
        },
        {
            time: 26182,
        },
        {
            time: 26294,
        },
        {
            time: 26552,
        },
        {
            time: 26663,
        },
        {
            time: 26944,
        },
        {
            time: 27062,
        },
        {
            time: 27213,
        },
        {
            time: 27326,
        },
        {
            time: 27451,
        },
        {
            time: 27665,
        },
        {
            time: 27780,
        },
        {
            time: 28050,
        },
        {
            time: 28231,
        },
        {
            time: 28411,
        },
        {
            time: 28550,
        },
        {
            time: 28665,
        },
        {
            time: 28978,
        },
        {
            time: 29094,
        },
        {
            time: 29248,
        },
        {
            time: 29814,
        },
        {
            time: 29930,
        },
        {
            time: 30065,
        },
    ];
    let activityIndex = -1;

    // let barWidth = 0;
    // test
    let barWidth = 100;

    let isEnabled = false;
    // 缓冲数据
    let isBuffering = false;

    let offset = max - min;

    const wrapperRef = useRef();
    const handleRef = useRef();
    const clickableRef = useRef();
    const bufferBarRef = useRef();
    const [state, setState] = useState({ value: 0 });
    const [position, setPosition] = useState({
        timelineProgressBarWidth: 0,
        timelineProgressHandleOffset: 0,
        pauseActivityOffset: -1,
        // test 100
        loadedBarWidth: 100,
    });

    const getClickableWith = () => clickableRef.current.clientWidth;

    const timelineValueToPercentage = value => (value / offset) * 100;

    const setValue = currentValue => {
        let value = Math.max(currentValue, min);
        value = Math.min(value, max);
        timelineProgress(value);
    };

    const getCalcValue = value => {
        const width = getClickableWith();
        const calculated = value / width;

        return min + calculated * offset;
    };

    const clickableWidthToPercentage = value => {
        const width = getClickableWith();
        return (value / width) * 100;
    };

    const filterActivityBlocks = a => {
        for (var b, c, d = [], e = offset / getClickableWith(), f = 0, g = a.length; f < g; )
            for (b = a[f], d.push(b), c = b.time + e, f++; f < g && a[f].time < c; ) f++;
        return d;
    };

    const setLoadedBarWidth = value => {
        // events_index
        if (activities[activityIndex]) {
            barWidth = timelineValueToPercentage(activities[activityIndex].time);
        } else if (value) {
            barWidth = 100;
        }

        setPosition(d => ({ ...d, loadedBarWidth: barWidth }));
    };

    const updatetimelineProgress = percent => {
        percent = Math.max(percent, 0);
        percent = Math.min(percent, 100);

        // const _percent = timelineValueToPercentage(value);
        const timelineProgressBarWidth = Math.min(percent, barWidth);
        const timelineProgressHandleOffset = percent - clickableWidthToPercentage(handleRef.current.clientWidth / 2);

        console.log(percent, timelineProgressBarWidth, timelineProgressHandleOffset);
        setPosition(d => ({ ...d, timelineProgressBarWidth, timelineProgressHandleOffset }));
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

            setLoadedBarWidth(state);
            timelineProgress(value);
        }
    };

    const updateProgress = ({ pageX }) => {
        const left = clickableRef.current.offsetLeft;
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

    // const enable = () => {
    //     isEnabled = true;
    //     enableTimelineHandle();
    // };

    // const disable = () => {
    //     isEnabled = false;
    //     disableTimelineHandle();
    // };

    // useEffect(() => {
    //     offset = max - min;
    // }, [min, max]);

    useEffect(() => {
        offset = max - min;

        timelineProgress(value);
    }, [value, min, max]);

    // useEffect(() => {
    //     onRefresh(activities.length);
    // }, [activities.length]);

    return (
        <div>
            <div className="timeline-progress-wrapper" ref={wrapperRef} onClick={onWrapperClick}>
                <div className="timeline-clickable-wrapper" ref={clickableRef}>
                    <div
                        draggable
                        axis="x"
                        enable-handle="enableTimelineHandle"
                        disable-handle="disableTimelineHandle"
                        className="timeline-progress-handle"
                        style={{
                            left: position.timelineProgressHandleOffset + '%',
                            transformOrigin: position.timelineProgressHandleOffset + '% 30%',
                        }}
                        ref={handleRef}
                    ></div>
                </div>
                <div className="timeline-track">
                    <div class="timeline-activity-wrapper">
                        {activityBlocks.map(block => {
                            return (
                                <div
                                    class="timeline-activity"
                                    style={{ left: timelineValueToPercentage(block.time) + '%', width: '1px' }}
                                ></div>
                            );
                        })}
                    </div>

                    <div class="timeline-pause-activity-wrapper" style={{ left: position.pauseActivityOffset + '%' }}>
                        <div class="timeline-pause-activity"></div>
                        <i class="icon ion-android-arrow-dropdown timeline-pause-activity-marker"></i>
                    </div>
                    <div class="timeline-progress-background" style={{ width: position.loadedBarWidth + '%' }}></div>
                    <div class="timeline-progress-bar" style={{ width: position.timelineProgressBarWidth + '%' }}></div>
                    <div
                        class="timeline-buffering-animation"
                        ng-show="isBuffering"
                        style={{ display: isBuffering ? 'block' : 'none' }}
                    ></div>
                    <div class="timeline-buffering-bar" ref={bufferBarRef}></div>
                </div>
            </div>

            <div class="timeline-value" layout-align="center center" layout="column">
                <span layout="row">
                    <span>
                        {value} / {max}
                    </span>
                </span>
            </div>
        </div>
    );
};

export default Timelline;
