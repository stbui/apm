import React, { useState, useRef, useEffect } from 'react';
import { momentformat } from '../test/common';

export interface IPlayerTimeline {
    value: number;
    max: number;
    min: number;
    activities: any[];
    loadedTime: number;
    isTimelineSelectionInProgress?: boolean;
    isFirstLiveActivity?: boolean;
}

export const PlayerTimeline = ({
    value,
    max,
    activities,
    min,
    loadedTime,
    isTimelineSelectionInProgress,
    isFirstLiveActivity,
}: IPlayerTimeline) => {
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
        var newActivityBlocks: any = [];
        var c = timelineOffset() / getTrackWitdh();
        var _activityBlock = { time: 0 };
        var e = 0;

        activityBlocks.forEach(activityBlock => {
            if (activityBlock.isFirstLiveActivity) {
                const time: any = {
                    unknown: true,
                    time: _activityBlock.time,
                    duration: activityBlock.time - _activityBlock.time,
                };
                newActivityBlocks.push(time);
            }

            if (activityBlock.time >= e) {
                newActivityBlocks.push(activityBlock);
                e = activityBlock.time + c;
            }

            _activityBlock = activityBlock;
        });

        return newActivityBlocks;
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
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="timeline-progress-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="timeline-track" ref={timelineTrackRef}>
                    <div className="timeline-track-hover-area"></div>

                    <div
                        draggable
                        enable-handle="enableTimelineHandle"
                        disable-handle="disableTimelineHandle"
                        ng-style="{'left': handleOffset + '%'}"
                        className="timeline-progress-handle"
                        ref={timelineProgressHandleRef}
                        style={{ left: handleOffset + '%' }}
                    ></div>

                    <div className="timeline-activity-wrapper">
                        {activityBlocks.map((block: any) => {
                            return (
                                <div
                                    className="timeline-activity"
                                    style={{ left: timelineValueToPercentage(block.time) + '%', width: '1px' }}
                                ></div>
                            );
                        })}
                    </div>
                    <div
                        className="timeline-pause-activity-wrapper"
                        ng-style="{'left': pauseActivityOffset + '%'}"
                        ng-show="pauseActivity"
                        ref={timelinePauseActivityWrapperRef}
                        style={{ left: pauseActivityOffset + '%' }}
                    >
                        <div className="timeline-pause-activity"></div>
                        <i className="icon ion-android-arrow-dropdown timeline-pause-activity-marker"></i>
                    </div>
                    <div
                        className="timeline-progress-background"
                        ng-style="{'width': loadedTimePercentage + '%'}"
                        style={{ width: loadedTimePercentage + '%' }}
                    ></div>
                    <div
                        className="timeline-progress-bar"
                        ng-style="{'width': renderedTimePercentage + '%'}"
                        ref={timelineBufferingBar}
                        style={{ width: renderedTimePercentage + '%' }}
                    ></div>
                    <div
                        className="timeline-buffering-animation"
                        ng-show="value > loadedTime"
                        style={{ display: value > loadedTime ? 'block' : 'none' }}
                    ></div>
                    <div className="timeline-buffering-bar"></div>
                </div>
            </div>

            <div
                className="timeline-value layout-align-center-center layout-column"
                layout-align="center center"
                style={{ display: 'flex' }}
            >
                <span className="layout-row">
                    <span>
                        {momentformat(value)} / {momentformat(max)}
                    </span>
                </span>
            </div>
        </div>
    );
};

export default PlayerTimeline;
