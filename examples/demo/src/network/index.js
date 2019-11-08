import { h, useState, useEffect } from '../core';
import Datagrid from './Datagrid';
import Filter from './Filter';
import SummaryBar from './SummaryBar';

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
        <div className="">
            <div className="widget">
                <div className="vbox network-settings-pane">
                    <div className="network-toolbar-container">
                        {/* <div className="toolbar network-summary-bar">
                            <div className="toolbar-shadow">
                                <div className="filter-bar">
                                    <div className="filter-text-filter">
                                        <span className="filter-input-field">
                                            <input
                                                type="text"
                                                placeholder="Filter"
                                                className="text-prompt"
                                            />
                                        </span>
                                    </div>

                                    <div className="filter-checkbox-filter">
                                        <label
                                            is="dt-checkbox"
                                            className="checkboxTextLabel dt-checkbox-text"
                                        >
                                            <input type="checkbox" />
                                            Hide data URLs
                                        </label>
                                    </div>

                                    <div className="filter-bitset-filter">
                                        <span>All</span>
                                        <div className="filter-bitset-filter-divider"></div>
                                        <span>XHR</span>
                                        <span>JS</span>
                                        <span>CSS</span>
                                        <span>Img</span>
                                        <span>Media</span>
                                        <span>Font</span>
                                        <span>Doc</span>
                                        <span>WS</span>
                                        <span>Manifest</span>
                                        <span>Other</span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="hbox network-settings-pane">1</div>
            </div>
            <div id="network-container network-toolbar-container no-node-selected">
                {/* <div className="network-status-pane fill">
                    <div className="recording-hint">
                        <span>2</span>
                    </div>
                </div> */}
                <Filter />
                <Datagrid />
                <SummaryBar />
            </div>

            {/* <div className="network-details-view">
                <div className="network-details-view-tall-header"></div>
            </div>

            <div className="network-item-view"></div>

            <div className="network-container">
                
            </div> */}
        </div>
    );
};
