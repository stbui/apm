import { h, useState, useEffect } from '../core';

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
        <div className="panel network">
            <div className="network-container"></div>

            {/* <div className="network-toolbar-container toolbar">
                <div className="table-column">Status</div>
                <div className="table-column">Method</div>
                <div
                    className="table-column"
                    style={{ flex: '0 1 428.05px', minWidth: '428.05px' }}
                >
                    URL
                </div>
            </div>
            <br /> */}

            <div className="table">
                <div className="table-header">
                    <div className="table-column">Status</div>
                    <div className="table-column">Method</div>
                    <div
                        className="table-column"
                        style={{ flex: '0 1 428.05px', minWidth: '428.05px' }}
                    >
                        URL
                    </div>
                </div>
                <div className="table-body">
                    {state.map(item => (
                        <div className="table-row">
                            <div className="table-column">
                                {item.response.status}
                            </div>
                            <div className="table-column">
                                {item.request.method}
                            </div>
                            <div
                                className="table-column"
                                style={{
                                    flex: '0 1 428.05px',
                                    minWidth: '428.05px',
                                }}
                            >
                                {item.request.url}
                            </div>
                        </div>
                    ))}
                    <div className="table-row">
                        <div className="table-column">200</div>
                        <div className="table-column">GET</div>
                        <div
                            className="table-column"
                            style={{
                                flex: '0 1 428.05px',
                                minWidth: '428.05px',
                            }}
                        >
                            http://localhost:9000/
                        </div>
                    </div>

                    <div className="table-row">
                        <div className="table-column">200</div>
                        <div className="table-column">GET</div>
                        <div
                            className="table-column"
                            style={{
                                flex: '0 1 428.05px',
                                minWidth: '428.05px',
                            }}
                        >
                            http://localhost:9000/
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="tab">
                    <div className="tab-header">
                        <div>Header</div>
                        <div>Preview</div>
                        <div>Response</div>
                        <div>Cookies</div>
                        <div>Timing</div>
                    </div>
                    <div className="tab-body">
                        <div>Request URL: http://localhost:9000/</div>
                        <div>Request Method: GET</div>
                        <div>Status Code: 200 OK</div>
                        <div>Remote Address: 127.0.0.1:9000</div>
                        <div>
                            User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X
                            10_14_6) AppleWebKit/537.36 (KHTML, like Gecko)
                            Chrome/78.0.3904.70 Safari/537.36
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
