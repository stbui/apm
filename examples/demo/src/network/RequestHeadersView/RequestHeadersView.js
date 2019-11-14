import React, { useRef, useEffect } from 'react';
import {
    Widget,
    TabbedPane,
    Toolbar,
    ToolbarButton,
    Icon,
    Checkbox,
} from '../../components';

export default () => {
    return (
        <div class="widget vbox request-headers-view">
            <div class="request-headers-tree">
                <div class="tree-outline-disclosure">
                    <ol class="tree-outline tree-outline-dense" role="tree">
                        <li
                            role="treeitem"
                            class="parent expanded"
                            aria-expanded="true"
                        >
                            <div class="selection fill"></div>
                            <span class="tree-element-title">General</span>
                        </li>
                        <ol class="children expanded" role="group">
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Request URL: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    http://design.yonyoucloud.com/static/react/16.8.4/umd/react-dom.production.min.js
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Request Method: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">GET</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Status Code: </div>
                                <span class="header-separator"></span>
                                <span
                                    is="dt-icon-label"
                                    class="resource-status-image"
                                ></span>
                                <div class="header-value source-code status-from-cache">
                                    200 OK (from memory cache)
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem" class="">
                                <div class="selection fill"></div>
                                <div class="header-name">Remote Address: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    58.20.197.95:80
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem" class="">
                                <div class="selection fill"></div>
                                <div class="header-name">Referrer Policy: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    no-referrer-when-downgrade
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                        </ol>
                        <li
                            role="treeitem"
                            class="parent expanded"
                            aria-expanded="true"
                        >
                            Response Headers
                            <span class="header-count">&nbsp;(28)</span>
                        </li>
                        <ol class="children expanded" role="group">
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Accept-Ranges: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    bytes
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">
                                    Access-Control-Allow-Headers:{' '}
                                </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    X-Requested-With
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">
                                    Access-Control-Allow-Methods:{' '}
                                </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    GET,POST,OPTIONS
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">
                                    Access-Control-Allow-Origin:{' '}
                                </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">*</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Age: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    7817042
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">
                                    Ali-Swift-Global-Savetime:{' '}
                                </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    1565755038
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Cache-Control: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    max-age=31885519
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">
                                    Content-Encoding:{' '}
                                </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">gzip</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Content-MD5: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    kzHcgYGBwd80zIZsA77CDQ==
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Content-Type: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    text/javascript
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Date: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    Wed, 14 Aug 2019 03:57:18 GMT
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">EagleId: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    3a14c53815735720800485854e
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">ETag: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    W/"9331DC818181C1DF34CC866C03BEC20D"
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Expires: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    Mon, 17 Aug 2020 05:02:37 GMT
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Last-Modified: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    Thu, 14 Mar 2019 05:55:07 GMT
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Server: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    Tengine
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">
                                    Timing-Allow-Origin:{' '}
                                </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">*</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Vary: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    Accept-Encoding
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Via: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    cache26.l2cn1820[0,200-0,H],
                                    cache20.l2cn1820[43,0],
                                    kunlun2.cn1977[0,304-0,H],
                                    kunlun8.cn1977[1,0]
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">X-Cache: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    HIT TCP_IMS_HIT dirn:10:98801538
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">
                                    x-oss-hash-crc64ecma:{' '}
                                </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    7478088440577853334
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">
                                    x-oss-object-type:{' '}
                                </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    Normal
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">
                                    x-oss-request-id:{' '}
                                </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    5D53869E59157418CC09BFFC
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">
                                    x-oss-server-time:{' '}
                                </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">23</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">
                                    x-oss-storage-class:{' '}
                                </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    Standard
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">X-Sqd-Ctime: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    31104000
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">X-Sqd-GStime: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    1565755038
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">X-Sqd-Stime: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    Fri, 23 Aug 2019 05:02:37 GMT
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                        </ol>
                        <li
                            role="treeitem"
                            class="parent expanded"
                            aria-expanded="true"
                        >
                            Request Headers
                            <span class="header-count">&nbsp;(2)</span>
                        </li>
                        <ol class="children expanded" role="group">
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <span is="dt-icon-label"></span>
                                <div class="caution">
                                    Provisional headers are shown
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Referer: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    http://bee.tinper.org/tinper-acs/
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">User-Agent: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    Mozilla/5.0 (Macintosh; Intel Mac OS X
                                    10_14_6) AppleWebKit/537.36 (KHTML, like
                                    Gecko) Chrome/80.0.3963.0 Safari/537.36
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                        </ol>
                        <li
                            role="treeitem"
                            class="parent hidden expanded"
                            aria-expanded="true"
                        >
                            <div class="selection fill"></div>
                            <span class="tree-element-title"></span>
                        </li>
                        <ol class="children hidden expanded" role="group"></ol>
                        <li
                            role="treeitem"
                            class="parent hidden expanded"
                            aria-expanded="true"
                        >
                            <div class="selection fill"></div>
                            <span class="tree-element-title"></span>
                        </li>
                        <ol class="children hidden expanded" role="group"></ol>
                        <li
                            role="treeitem"
                            class="parent hidden expanded"
                            aria-expanded="true"
                        >
                            <div class="selection fill"></div>
                            <span class="tree-element-title">
                                Request Payload
                            </span>
                        </li>
                        <ol class="children hidden expanded" role="group"></ol>
                    </ol>
                </div>
            </div>
        </div>
    );
};
