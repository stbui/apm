import React, { useState, useRef, useEffect } from 'react';

const Console = ({}) => {
    return (
        <div
            layout="row"
            layout-align="start start"
            class="content-row"
            layout-wrap
            ng-class="{'executed': isExecuted || isSelected }"
            style={{ display: 'flex', flexDirection: 'row' }}
        >
            <div class="selected-row-marker">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6">
                    <path fill="#0060C8" fill-rule="evenodd" d="M0 0h6l2 3-2 2.7H0z" />
                </svg>
            </div>
            <div class="time no-outline" ng-click="selectLog()">
                {/* log.time | date: 'HH:mm:ss:sss' : 'UTC' */}
                00:00:22:792
            </div>
            <div ng-hide="log.count > 1" class="type-icon">
                {/* <img ng-src="images/{{log.type.svg" /> */}
            </div>
            <div ng-show="log.count > 1" ng-class="log.type" class="logs-count">
                log.count
            </div>
            <div
                class="message-container no-outline"
                layout="row"
                layout-align="start start"
                ng-click="toggleMessage($event)"
                flex
                style={{ display: 'flex', flexDirection: 'row', flex: 1 }}
            >
                <i
                    ng-class="log.isExpanded ? 'ion-ios-arrow-down' : 'ion-ios-arrow-right'"
                    class="ion-icon"
                    ng-show="log.isExpandable"
                ></i>
                <div class="message" ng-class="log.type" ng-hide="log.isExpanded && !log.details.stackFrames">
                    log.details.message
                    <div class="stack-frames" ng-show="log.isExpanded && log.details.stackFrames">
                        <div class="stack-frame" ng-repeat="stackFrame in log.details.stackFrames">
                            stackFrame
                        </div>
                    </div>
                </div>

                <div
                    class="message expanded"
                    ng-class="[log.type, {'multiline': log.isMultiLine}]"
                    ng-show="log.isExpanded && !log.details.stackFrames"
                    flex
                >
                    log.details.formattedMessage
                </div>
            </div>
        </div>
    );
};

export default Console;
