import React, { useState, useRef, useEffect } from 'react';
import ConsoleLog from './ConsoleLog';

const Console = ({ openConsole, closeConsole, isExpanded, addNewLogs, updateConsole, onSelectedLog }) => {
    return (
        <div class="console-container">
            <div class="tabs" layout="row" style={{ display: 'flex', flexDirection: 'row' }}>
                <div class="tab no-outline" ng-class="{'active': selectedTab === 0 }" ng-click="selectTab(0)">
                    Console
                </div>
                <div class="tab disabled no-outline" ng-class="{'active': selectedTab === 1 }">
                    <span>Network</span>
                    <span class="label">soon</span>
                </div>
            </div>
            <div class="content-container">
                <div class="console-content" ng-show="selectedTab === 0">
                    <div class="filters-container" layout="row" style={{ display: 'flex', flexDirection: 'row' }}>
                        <input
                            class="filter-input no-outline"
                            ng-model="searchLog"
                            ng-change="searchChanged()"
                            type="text"
                            placeholder="Search"
                        />
                        <div layout="row" layout-align="start center" style={{ display: 'flex', flexDirection: 'row' }}>
                            <div
                                ng-repeat="(logType, active) in logTypes"
                                ng-click="toggleFilter(logType)"
                                class="log-type no-outline"
                                ng-class="{'active' : active}"
                            >
                                logType
                            </div>
                        </div>
                    </div>
                    <div class="logs-container">
                        <div className="log" md-virtual-repeat="log in (filteredLogs = (transformedLogs | filter: { searchLabel: searchLog } | activityTypesFilter: logTypes))">
                            <ConsoleLog
                                log="log"
                                is-executed="lastPlayedActivityIndex >= log.activityIndex"
                                is-selected="selectedLogIndex === log.activityIndex"
                                on-log-toggle="onLogToggle"
                                select-log="selectLog(log.activityIndex)"
                            ></ConsoleLog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Console;
