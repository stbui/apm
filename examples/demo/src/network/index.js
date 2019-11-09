import { h, useState, useEffect } from '../core';
import Datagrid from './Datagrid';
import Filter from './Filter';
import SummaryBar from './SummaryBar';
import { Widget } from '../components';

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
        <div className="widget">
            <div className="vbox">
                <div className="panel network">
                    <div className="widget">
                        <div className="hbox network-settings-pane">1</div>
                    </div>

                    <div>
                        <Widget>
                            <div id="network-overview-panel network-overview">
                                2
                            </div>
                        </Widget>
                    </div>

                    <div className="network-film-strip-placeholder">3</div>

                    <div className="widget shadow-split-widget">
                        <div className="shadow-split-widget-contents shadow-split-widget-sidebar vbox">
                            aa
                        </div>
                        <div className="shadow-split-widget-contents shadow-split-widget-main vbox">
                            dd
                        </div>
                        <div className="shadow-split-widget-resizer">cc</div>
                    </div>
                </div>
            </div>

            <Widget>
                <div id="network-container" className="no-node-selected">
                    <Filter />
                    <Datagrid />
                    <SummaryBar />
                </div>
            </Widget>

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
