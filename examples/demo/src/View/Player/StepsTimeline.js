import React, { useState, useRef, useEffect } from 'react';

const StepsTimeline = ({
    addNewSteps,
    updateStepsTimeline,
    onSelectedStep,
    selectNextStep,
    disable,
    enable,
    selectedLogId,
    isCreated,
    handleUserDetailsResize,
    hideMask,
}) => {
    let isEnabled = true;
    let shouldShowMask = true;
    let isBuffering = true;
    let transformedSteps = [];
    let filteredSteps = [];
    let activityTypeStatuses = {};
    let LOG_LEVEL = [];
    // let EVENT_TYPE = [];
    let expandedStepIndex = null;
    let isCreated = true;

    let selectedStep = 0;
    let activityIndex = -1;

    let TYPES = [
        'mouse_click',
        'window_resize',
        'dom_snapshot',
        'visibility_change',
        // g.ERROR
    ];

    const millisecondsToSeconds = () => {
        // return Math.floor(d.millisecondsToSeconds(a));
    };

    const activityFilter = _activityIndex => {
        activityIndex = _activityIndex;
        let b;
        if (isEnabled) {
        }
    };

    const updateStepsTimeline = activityIndex => {
        activityFilter(activityIndex);
    };
    const setLastPlayedActivity = activityIndex => {
        activityFilter(activityIndex);
    };
    const addNewSteps = arr => {};
    const updateSelectedStep = () => {
        setTimeout(() => {
            activityFilter(activityIndex);
        }, 0);
    };
    const selectStep = currentStep => {
        if (!(selectedStep === currentStep || currentStep < 0 || currentStep >= filteredSteps.length)) {
            const step = filteredSteps[currentStep];
            onSelectedStep && onSelectedStep(step.activityIndex);
            selectedStep = currentStep;
        }
    };
    const selectNextStep = () => {
        selectStep(selectedStep + 1);
    };
    const enable = () => {
        isEnabled = true;
    };
    const disable = () => {
        isEnabled = false;
    };
    const hasInactiveFilters = () => {};

    const addActivityTYpes = (types, status) => {
        types.forEach((type, index) => {
            activityTypeStatuses[index] = status;
        });
    };

    const toggleFilter = index => {
        activityTypeStatuses[index] = !activityTypeStatuses[index];
        updateSelectedStep();
    };
    const showFilters = () => {
        addActivityTYpes(TYPES, true);
        updateSelectedStep();
    };
    const hideFilters = () => {
        addActivityTYpes(TYPES, false);
        updateSelectedStep();
    };
    const handleUserDetailsResize = () => {};
    const onStepExpand = index => {
        if (expandedStepIndex === index) {
            expandedStepIndex = null;
        } else {
            expandedStepIndex = index;
        }
    };
    const hideMask = () => {
        shouldShowMask = false;
    };

    return (
        <div class="steps-timeline" resize>
            <div class="filter-sections-mask" ng-show="shouldShowMask">
                <section class="filter-section">
                    <div class="filter-section-title-mask filter-section-search-bar-title-mask animated-background"></div>
                </section>

                <section class="filter-section header">
                    <span class="search-title-input" layout="row">
                        <div class="filter-section-search-bar-mask"></div>
                    </span>
                </section>

                <section class="filter-section">
                    <section class="header" layout="row" layout-align="space-between center">
                        <div class="filter-section-title-mask filter-section-events-title-mask animated-background"></div>
                        <section>
                            <div class="filter-section-title-mask filter-section-events-toggle-mask animated-background"></div>
                        </section>
                    </section>

                    <section layout="row" layout-align="start center" layout-wrap>
                        <div class="filter-section-event-type-mask filter-section-click-mask animated-background"></div>
                        <div class="filter-section-event-type-mask filter-section-visit-mask animated-background"></div>
                        <div class="filter-section-event-type-mask filter-section-resize-mask animated-background"></div>
                        <div class="filter-section-event-type-mask filter-section-tab-change-mask animated-background"></div>
                        <div class="filter-section-event-type-mask filter-section-error-mask animated-background"></div>
                    </section>
                </section>
            </div>

            <div class="filter-sections" ng-show="!shouldShowMask">
                <section
                    class="filter-section layout-align-space-between-center layout-row"
                    layout="row"
                    layout-align="space-between center"
                >
                    <span class="filter-label">搜索</span>
                </section>
                <section class="filter-section header" layout="row" layout-align="space-between center">
                    <span class="search-title-input" ng-model-options="{ debounce: 100 }" layout="row">
                        <span layout="column" layout-align="center center" class="icon-wrapper">
                            <svg width="15" height="17" viewBox="0 0 10 11">
                                <path
                                    d="M6.294 2.921a2.844 2.844 0 1 0-4.023 4.022 2.844 2.844 0 0 0 4.023-4.022m2.96 6.982a.57.57 0 0 1-.806 0L6.656 8.111c-1.56 1.166-3.772 1.056-5.19-.362A3.982 3.982 0 1 1 7.1 2.117c1.418 1.417 1.528 3.63.362 5.19l1.792 1.792a.57.57 0 0 1 0 .804"
                                    fill="#9EACBF"
                                    fill-rule="evenodd"
                                />
                            </svg>
                        </span>
                        <input
                            ng-model="searchText"
                            ng-change="updateSelectedStep()"
                            placeholder="e.g. 'click #element-id'"
                        />
                    </span>
                </section>
                <section class="filter-section" layout="column" layout-wrap>
                    <section class="header" layout="row" layout-align="space-between center">
                        <span class="filter-label">筛选</span>
                        <section class="filter-options">
                            <span ng-click="showFilters()"> 所有 </span>
                            <span class="vertical-divider"></span>
                            <span ng-click="hideFilters()"> 无 </span>
                        </section>
                    </section>
                    <section layout="row" layout-align="start center" layout-wrap>
                        <span
                            layout="column"
                            class="activity-type"
                            ng-class="{'selected': activityTypeStatuses[EVENT_TYPE.MOUSE_CLICK]}"
                            ng-click="toggleFilter(EVENT_TYPE.MOUSE_CLICK)"
                        >
                            Click
                        </span>
                        <span
                            layout="column"
                            class="activity-type"
                            ng-class="{'selected': activityTypeStatuses[EVENT_TYPE.DOM_SNAPSHOT]}"
                            ng-click="toggleFilter(EVENT_TYPE.DOM_SNAPSHOT)"
                        >
                            Visit
                        </span>
                        <span
                            layout="column"
                            class="activity-type"
                            ng-class="{'selected': activityTypeStatuses[EVENT_TYPE.WINDOW_RESIZE]}"
                            ng-click="toggleFilter(EVENT_TYPE.WINDOW_RESIZE)"
                        >
                            Resize
                        </span>
                        <span
                            layout="column"
                            class="activity-type"
                            ng-class="{'selected': activityTypeStatuses[EVENT_TYPE.VISIBILITY_CHANGE]}"
                            ng-click="toggleFilter(EVENT_TYPE.VISIBILITY_CHANGE)"
                        >
                            Tab change
                        </span>
                        <span
                            layout="column"
                            class="activity-type"
                            ng-class="{'selected': activityTypeStatuses[LOG_LEVEL.ERROR]}"
                            ng-click="toggleFilter(LOG_LEVEL.ERROR)"
                        >
                            Error
                        </span>
                    </section>
                </section>
            </div>

            <div class="steps-section-mask" ng-show="shouldShowMask">
                <div class="step" ng-repeat="n in [] | range:100">
                    <div class="step-mask animated-background"></div>
                </div>
            </div>

            <div class="steps-section" ng-hide="shouldShowMask">
                <div class="max-height steps-container">
                    <div
                        class="step"
                        md-virtual-repeat="step in (filteredSteps = (transformedSteps | filter: { searchLabel: searchText } | activityTypesFilter: activityTypeStatuses))"
                    >
                        <div style="height: 100%">
                            <step
                                data="step"
                                selected-log-id="selectedLogId"
                                is-selected="selectedStep === $index"
                                is-executed="selectedStep > $index"
                                is-expanded="expandedStepIndex === $index"
                                select-step="selectStep($index)"
                                on-step-expand="onStepExpand($index)"
                            ></step>
                        </div>
                    </div>
                    <div ng-show="isBuffering">
                        <div
                            ng-include="'../templates/loadingEllipsis.html'"
                            class="buffering-animation-container"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepsTimeline;
