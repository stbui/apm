import { h, useState, useEffect } from '../core';
import Datagrid from './Datagrid';
import Filter from './Filter';
import SummaryBar from './SummaryBar';
import {
    Widget,
    TabbedPane,
    Toolbar,
    ToolbarButton,
    Icon,
    Checkbox,
} from '../components';

const data = [
    {
        startedDateTime: '2019-11-04T13:33:25.255Z',
        time: 253.83299999521114,
        request: {
            method: 'GET',
            url:
                'https://www.bilibili.com/tv/index/?spm_id_from=333.6.b_7375626e6176.4',
        },
        headers: [
            {
                name: 'User-Agent',
                value:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36',
            },
        ],
        response: { status: 200, statusText: 'OK' },
        timings: {},
        serverIPAddress: '119.3.32.96',
    },
    {
        startedDateTime: '2019-11-04T13:33:25.255Z',
        time: 253.83299999521114,
        request: {
            method: 'GET',
            url:
                'https://www.bilibili.com/tv/index/?spm_id_from=333.6.b_7375626e6176.4',
        },
        headers: [
            {
                name: 'User-Agent',
                value:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36',
            },
        ],
        response: { status: 200, statusText: 'OK' },
        timings: {},
        serverIPAddress: '119.3.32.96',
    },
];

export default () => {
    const [state, setState] = useState([]);

    useEffect(() => {
        // setInterval(() => {
        //     setState(newState => [
        //         {
        //             startedDateTime: '2019-11-04T13:33:25.255Z',
        //             time: 253.83299999521114,
        //             request: {
        //                 method: 'GET',
        //                 url:
        //                     'https://www.bilibili.com/tv/index/?spm_id_from=333.6.b_7375626e6176.4',
        //             },
        //             headers: [
        //                 {
        //                     name: 'User-Agent',
        //                     value:
        //                         'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36',
        //                 },
        //             ],
        //             response: { status: 200, statusText: 'OK' },
        //             timings: {},
        //             serverIPAddress: '119.3.32.96',
        //         },
        //         ...newState,
        //     ]);
        // }, 1000);
    }, []);

    return (
        <div className="vbox flex-auto panel network" id="network-container">
            <div className="hbox network-settings-pane">1</div>

            <div className="network-film-strip-placeholder">3</div>

            {/* <div>
                <Widget>
                    <div id="network-overview-panel network-overview">2</div>
                </Widget>
            </div> */}

            {/* <div className="vbox flex-auto shadow-split-widget shadow-split-widget-resizer">
                <div className="shadow-split-widget-contents shadow-split-widget-sidebar vbox">
                    aa
                </div>
                <div className="shadow-split-widget-contents shadow-split-widget-main vbox">
                    dd
                </div>
            </div> */}

            <div className="widget vbox">
                <div className="network-toolbar-container">
                    <Toolbar>
                        <button
                            className="toolbar-button toolbar-item toolbar-has-glyph toolbar-toggle-with-red-color toolbar-state-on"
                            aria-label="Record network log"
                            aria-pressed="true"
                        >
                            <span
                                is="ui-icon"
                                class="toolbar-glyph spritesheet-largeicons largeicon-stop-recording icon-mask"
                                style="--spritesheet-position:-84px 24px; width: 28px; height: 24px;"
                            ></span>
                            <div className="toolbar-text hidden"></div>
                        </button>

                        {/* <ToolbarButton state="on">
                            <Icon type="largeicons" coordinates="-84px 24px" />
                        </ToolbarButton> */}

                        <ToolbarButton>
                            <Icon type="largeicons" coordinates="0px 144px" />
                        </ToolbarButton>

                        <div className="toolbar-divider toolbar-item"></div>

                        <ToolbarButton state="on">
                            <Icon type="largeicons" coordinates="-56px 120px" />
                        </ToolbarButton>

                        <ToolbarButton state="off">
                            <Icon type="largeicons" coordinates="-196px 96px" />
                        </ToolbarButton>

                        <div class="toolbar-divider toolbar-item"></div>

                        <Checkbox label="Preserve log" />
                        <Checkbox label="Disable cache" />

                        <div className="toolbar-divider toolbar-item"></div>

                        <span className="toolbar-select-container toolbar-item">
                            <select className="toolbar-item">
                                <option value="1">Online</option>
                            </select>
                        </span>
                        <div class="toolbar-divider toolbar-item"></div>

                        <ToolbarButton>
                            <Icon
                                type="largeicons"
                                coordinates="-196px 120px"
                            />
                        </ToolbarButton>
                        <ToolbarButton>
                            <Icon
                                type="largeicons"
                                coordinates="-196px 144px"
                            />
                        </ToolbarButton>
                    </Toolbar>

                    <Toolbar>
                        <div class="toolbar-item"></div>
                        <div class="toolbar-divider toolbar-item"></div>
                        <ToolbarButton>
                            <Icon
                                type="largeicons"
                                coordinates="-168px 168px"
                            />
                        </ToolbarButton>
                    </Toolbar>
                </div>

                <Filter />
                <Datagrid />
                <SummaryBar />
            </div>

            {/* <div className="network-status-pane fill">
                    <div className="recording-hint">
                        <span>2</span>
                    </div>
                </div> */}

            {/* <div className="network-details-view">
                <div className="network-details-view-tall-header"></div>
            </div>

            <div className="network-item-view"></div>

            */}
        </div>
    );
};
