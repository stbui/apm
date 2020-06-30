import React, { useState, useRef, useEffect } from 'react';
import { momentformat } from '../test/common';

export const PlayerTimeline = ({
    value,
    selectedValue,
    valueSelectionInProgress,
    max,
    enable,
    disable,
    pauseActivity,
    isLive,
    // refresh,
    isCreated,

    activities,
    onSelect,
    min,
    loadedTime,
    isTimelineSelectionInProgress,
    isFirstLiveActivity,
}) => {
    const timelineTrackRef: any = useRef();
    const timelineProgressHandleRef: any = useRef();
    const timelinePauseActivityWrapperRef: any = useRef();
    const timelineBufferingBar: any = useRef();

    const [activityBlocks, setActivityBlocks] = useState([]);
    const [handleOffset, setHandleOffset] = useState(0);
    const [pauseActivityOffset] = useState(0);
    const [loadedTimePercentage, setLoadedTimePercentage] = useState(0);
    const [renderedTimePercentage, setRenderedTimePercentage] = useState(10);

    //
    const getProgressHandleWidth = () => {
        return timelineProgressHandleRef.current.clientWidth;
    };
    const getTrackWitdh = () => {
        return timelineTrackRef.current.clientWidth;
    };

    const timelineOffset = () => max - min;
    const timelineValueToPercentage = time => (time / timelineOffset()) * 100;

    function e() {
        if (!isTimelineSelectionInProgress) {
            var b = Math.min(value, loadedTime);
            setRenderedTimePercentage(timelineValueToPercentage(b));
        }
    }

    function h(activityBlocks) {
        var b: any = [];
        var c = timelineOffset() / getTrackWitdh();
        var d = { time: 0 };
        var e = 0;

        activityBlocks.forEach(activityBlock => {
            if (activityBlock.isFirstLiveActivity) {
                const f: any = {
                    unknown: true,
                    time: d.time,
                    duration: activityBlock.time - d.time,
                };
                b.push(f);
            }

            if (activityBlock.time >= e) {
                b.push(activityBlock);
                e = activityBlock.time + c;
            }

            d = activityBlock;
        });

        return b;
    }

    const refresh = (isFinish, activities: any[]) => {
        const _activityBlocks: object[] = activityBlocks;

        activities.forEach(activity => {
            const times: object = { time: activity.time };
            isFirstLiveActivity && (isFinish.isFirstLiveActivity = true);
            _activityBlocks.push(times);
        });

        setActivityBlocks(h(_activityBlocks));

        setLoadedTimePercentage(timelineValueToPercentage(loadedTime));

        e();
    };

    // value 变更
    useEffect(() => {
        var b = (getProgressHandleWidth() / getTrackWitdh()) * 100,
            precentage = timelineValueToPercentage(value);

        setHandleOffset(precentage - b / 2);

        e();
    }, [value]);

    useEffect(() => {
        refresh(true, activities);
    }, [activities]);

    return (
        <div layout="row" style={{ display: 'flex', flexDirection: 'row' }}>
            <div
                class="timeline-progress-wrapper"
                layout="column"
                flex
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                <div class="timeline-track" ref={timelineTrackRef}>
                    <div class="timeline-track-hover-area"></div>

                    <div
                        draggable
                        axis="x"
                        enable-handle="enableTimelineHandle"
                        disable-handle="disableTimelineHandle"
                        ng-style="{'left': handleOffset + '%'}"
                        class="timeline-progress-handle"
                        ref={timelineProgressHandleRef}
                        style={{ left: handleOffset + '%' }}
                    ></div>

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
                        ng-style="{'left': pauseActivityOffset + '%'}"
                        ng-show="pauseActivity"
                        ref={timelinePauseActivityWrapperRef}
                        style={{ left: pauseActivityOffset + '%' }}
                    >
                        <div class="timeline-pause-activity"></div>
                        <i class="icon ion-android-arrow-dropdown timeline-pause-activity-marker"></i>
                    </div>
                    <div
                        class="timeline-progress-background"
                        ng-style="{'width': loadedTimePercentage + '%'}"
                        style={{ width: loadedTimePercentage + '%' }}
                    ></div>
                    <div
                        class="timeline-progress-bar"
                        ng-style="{'width': renderedTimePercentage + '%'}"
                        ref={timelineBufferingBar}
                        style={{ width: renderedTimePercentage + '%' }}
                    ></div>
                    <div
                        class="timeline-buffering-animation"
                        ng-show="value > loadedTime"
                        style={{ display: value > loadedTime ? 'block' : 'none' }}
                    ></div>
                    <div class="timeline-buffering-bar"></div>
                </div>
            </div>

            <div
                class="timeline-value layout-align-center-center layout-column"
                layout-align="center center"
                layout="column"
                style={{ display: 'flex' }}
            >
                <span layout="row" className="layout-row">
                    <span>
                        {momentformat(value)} / {momentformat(max)}
                    </span>
                </span>
            </div>
        </div>
    );
};

export default PlayerTimeline;
