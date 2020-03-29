import React, { useState, useRef, useEffect } from 'react';
import './Timeline.scss';

function TimeComponents(time) {
    const ms = Math.floor(time / 1000);
    this.hours = Math.floor(ms / 3600);
    this.minutes = Math.floor((ms - 3600 * this.hours) / 60);
    this.seconds = Math.round(ms - 3600 * this.hours - 60 * this.minutes);
}

TimeComponents.prototype = {
    getHours: function() {
        return this.hours;
    },
    getMinutes: function() {
        return this.minutes;
    },
    getSeconds: function() {
        return this.seconds;
    },
};

const momentformat = time => {
    const timeComponents = new TimeComponents(time);
    let dateStr = '';

    if (timeComponents.getHours() > 0) {
        dateStr += timeComponents.getHours();
    }

    if (timeComponents.getMinutes() > 0 || timeComponents.getHours() > 0) {
        if (timeComponents.getHours() > 0) {
            dateStr += ':';
        }

        if (timeComponents.getMinutes() <= 9) {
            dateStr += '0';
        }

        dateStr += timeComponents.getMinutes();
    }

    if (timeComponents.getSeconds() >= 0) {
        dateStr += timeComponents.getMinutes() > 0 || timeComponents.getHours() > 0 ? ':' : '0:';

        if (timeComponents.getSeconds() <= 9) {
            dateStr += '0';
        }

        dateStr += timeComponents.getSeconds();
    }

    if (dateStr.length === 0) {
        dateStr = '0:00';
    }

    return dateStr;
};

export const Timelline = ({
    min,
    max,
    value,
    activities,
    // refresh,
    enable,
    disable,
    pauseActivity,
    isCreated,
    onSelect,
}) => {
    // 是否缓冲
    let isBuffering = false;
    //

    let activityIndex = -1;

    let hasEnable = false;
    let hasDrag = false;

    // test
    let barWidth = 100;

    /**
     * timelineMax - timelineMin
     */
    let timelineOffset = max - min;

    const wrapperRef = useRef();
    const progressHandleRef = useRef();
    const clickableRef = useRef();
    const bufferBarRef = useRef();
    const pauseActivityWrapperRef = useRef();
    const [position, setPosition] = useState({
        timelineProgressBarWidth: 0, // 进度条位置
        timelineProgressHandleOffset: 0,
        pauseActivityOffset: -1,
        // test 100
        loadedBarWidth: 100,
    });

    const [activityBlocks, setActivityBlocks] = useState([]);

    /**
     * timeline-clickable-wrapper 元素宽度
     */
    const getClickableWith = () => clickableRef.current.clientWidth;

    /**
     * 转换百分比
     * @param {*} value
     */
    const timelineValueToPercentage = value => (value / timelineOffset) * 100;

    /**
     * 百分比
     * @param {*} value
     */
    const clickableWidthToPercentage = value => {
        // wrapper 元素宽度
        const width = getClickableWith();
        return (value / width) * 100;
    };

    /**
     * 找出
     * @param {*} a
     */
    const filterActivityBlocks = a => {
        for (var b, c, d = [], e = timelineOffset / getClickableWith(), f = 0, g = a.length; f < g; )
            for (b = a[f], d.push(b), c = b.time + e, f++; f < g && a[f].time < c; ) f++;
        return d;
    };

    /**
     *
     * @param {*} value
     */
    const setLoadedBarWidth = value => {
        // events_index
        if (activities[activityIndex]) {
            barWidth = timelineValueToPercentage(activities[activityIndex].time);
        } else {
            if (value) {
                barWidth = 100;
            }
        }

        setPosition(d => ({ ...d, loadedBarWidth: barWidth }));
    };

    /**
     * 设定bar的位置
     * @param {*} percent
     */
    const updatetimelineProgress = percent => {
        percent = Math.max(percent, 0);
        percent = Math.min(percent, 100);

        const _barWidth = timelineValueToPercentage(value);
        const timelineProgressBarWidth = Math.min(_barWidth, barWidth);
        const timelineProgressHandleOffset =
            percent - clickableWidthToPercentage(progressHandleRef.current.clientWidth / 2);

        setPosition(d => ({ ...d, timelineProgressBarWidth, timelineProgressHandleOffset }));
    };

    /**
     * 指定位置
     * @param {*} value
     */
    const setProgress = value => {
        const percent = timelineValueToPercentage(value);
        updatetimelineProgress(percent);
    };

    /**
     *
     * @param {*} state
     */
    const refresh = state => {
        if (Array.isArray(activities)) {
            const newActivities = activities.slice(activityIndex + 1);
            const _activityBlocks = activityBlocks || [];

            newActivities.forEach(activity => {
                _activityBlocks.push({ time: activity.time });
            });

            const blocks = filterActivityBlocks(_activityBlocks);
            setActivityBlocks(blocks);
            activityIndex = activities.length - 1;

            setLoadedBarWidth(state);
            setProgress(value);

            if (pauseActivity) {
                // todo: 元素不被渲染
                pauseActivityWrapperRef.current.style.display = 'block';
                const pauseActivityOffset = timelineValueToPercentage(Math.max(0, pauseActivity.time));

                setPosition(d => ({ ...d, pauseActivityOffset }));
            } else {
                pauseActivityWrapperRef.current.style.display = 'none';
            }
        }
    };

    const getCalcValue = value => {
        const width = getClickableWith();
        const percent = value / width;

        return min + percent * timelineOffset;
    };

    function updateTimelineValue(value) {
        let newValue = Math.max(value, min);
        newValue = Math.min(newValue, max);

        // setValue(newValue);
        onChangeValue && onChangeValue(newValue);
    }

    const updateProgress = ({ pageX }) => {
        const left = clickableRef.current.offsetLeft;
        const offsetX = Math.max(pageX - left, min + 1);
        const value = getCalcValue(offsetX);

        updateTimelineValue(value);
    };

    const updateDirtyState = state => {
        isDirty = state;
    };

    /**
     * dom事件
     * @param {*} event
     */

    /**
     * 改变进度条位置
     * @param {*} event
     */
    const onWrapperClick = event => {
        if (hasEnable) {
            updateDirtyState(true);
            updateProgress(event);
            updateDirtyState(false);
            //
            onSelect && onSelect(value);
        }
    };

    const onDragstart = e => {
        if (hasEnable) {
            updateDirtyState(true);
        }
    };

    const onDrag = (b, c) => {
        if (hasEnable) {
            const offsetX = Math.max(c.position.left, min + 1);
            const value = getCalcValue(offsetX);

            hasDrag = true;
            updateTimelineValue(value);
            hasDrag = false;
        }
    };

    const onDragend = event => {
        updateProgress(event);
    };

    useEffect(() => {
        if (!hasDrag) {
            setProgress(value);
        }
    }, [value]);

    useEffect(() => {
        if (pauseActivity) {
            refresh();
        }
    }, [pauseActivity]);

    useEffect(() => {
        refresh(activities.length);
    }, [activities.length]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div
                className="timeline-progress-wrapper"
                style={{ display: 'flex', flexDirection: 'column' }}
                ref={wrapperRef}
                onClick={onWrapperClick}
            >
                <div className="timeline-clickable-wrapper" ref={clickableRef}>
                    <div
                        draggable
                        axis="x"
                        enable-handle="enableTimelineHandle"
                        disable-handle="disableTimelineHandle"
                        className="timeline-progress-handle"
                        onDrag={onDrag}
                        onDragstart={onDragstart}
                        onDragend={onDragend}
                        style={{
                            left: position.timelineProgressHandleOffset + '%',
                            transformOrigin: position.timelineProgressHandleOffset + '% 30%',
                        }}
                        ref={progressHandleRef}
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

                    <div
                        class="timeline-pause-activity-wrapper"
                        ref={pauseActivityWrapperRef}
                        style={{ left: position.pauseActivityOffset + '%' }}
                    >
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

            <div class="timeline-value" style={{ display: 'flex' }} layout-align="center center" layout="column">
                <span layout="row">
                    <span>
                        {momentformat(value)} / {momentformat(max)}
                    </span>
                </span>
            </div>
        </div>
    );
};

export default Timelline;
