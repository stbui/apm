import React, { useState, useEffect } from 'react';
import ConsoleLog from './ConsoleLog';

const networkRequests = [];

const Console = ({ openConsole, closeConsole, isExpanded, addNewLogs, updateConsole, onSelectedLog }) => {
    const [transformedLogs, setTransformedLogs] = useState([]);

    // console.log(addNewLogs);

    return (
        <div class="console-container">
            <div class="tabs" layout="row" style={{ display: 'flex', flexDirection: 'row' }}>
                <div class="tab no-outline" ng-class="{'active': selectedTab === TAB_INDEX.CONSOLE }" ng-click="selectTab(TAB_INDEX.CONSOLE)">Console</div>
                <div class="tab no-outline" ng-class="{'active': selectedTab === TAB_INDEX.NETWORK }" ng-click="selectTab(TAB_INDEX.NETWORK)">Network</div>
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
                        <div
                            className="log"
                            md-virtual-repeat="log in (filteredLogs = (transformedLogs | filter: { searchLabel: searchLog } | activityTypesFilter: logTypes))"
                        >
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
