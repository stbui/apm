import React, { useState, useRef, useEffect } from 'react';

const StepsTimeline = ({
    // addNewSteps,
    // updateStepsTimeline,
    onSelectedStep,
    // selectNextStep,
    // disable,
    // enable,
    // selectedLogId,
    // isCreated,
    // handleUserDetailsResize,
    // hideMask,
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
    // const handleUserDetailsResize = () => {};
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
};

export default StepsTimeline;
