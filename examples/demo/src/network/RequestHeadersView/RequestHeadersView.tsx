import React, { useRef, useEffect } from 'react';
import { Widget, TabbedPane, Toolbar, ToolbarButton, Icon, Checkbox, Treeoutline } from '../../components';

export default () => {
    return (
        <div class="widget vbox request-headers-view">
            <div class="request-headers-tree">
                <div class="tree-outline-disclosure">
                    <Treeoutline type="dense">
                        <Treeoutline.Item defaultExpanded title="General">
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Request URL: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">http://127.0.0.1:8081/inspector.html</div>
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
                                <span is="dt-icon-label" class="resource-status-image"></span>
                                <div class="header-value source-code">304 Not Modified</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem" class="">
                                <div class="selection fill"></div>
                                <div class="header-name">Remote Address: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">127.0.0.1:8081</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem" class="">
                                <div class="selection fill"></div>
                                <div class="header-name">Referrer Policy: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">no-referrer-when-downgrade</div>
                            </li>
                            <ol class="children" role="group"></ol>
                        </Treeoutline.Item>

                        <Treeoutline.Item
                            defaultExpanded
                            title={
                                <React.Fragment>
                                    Response Headers<span class="header-count">&nbsp;(7)</span>
                                    <span class="header-toggle">view source</span>
                                </React.Fragment>
                            }
                        >
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">cache-control: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">max-age=3600</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">content-length: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">626</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">content-type: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">text/html; charset=UTF-8</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Date: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">Sun, 10 Nov 2019 10:47:32 GMT</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">etag: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">W/"23271777-626-1985-10-26T08:15:00.000Z"</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">last-modified: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">Sat, 26 Oct 1985 08:15:00 GMT</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">server: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">ecstatic-3.3.0</div>
                            </li>
                            <ol class="children" role="group"></ol>
                        </Treeoutline.Item>

                        <Treeoutline.Item
                            defaultExpanded
                            title={
                                <React.Fragment>
                                    Request Headers<span class="header-count">&nbsp;(13)</span>
                                    <span class="header-toggle">view source</span>
                                </React.Fragment>
                            }
                        >
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Accept: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Accept-Encoding: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">gzip, deflate, br</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Accept-Language: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">zh-CN,zh;q=0.9</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Cache-Control: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">max-age=0</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Connection: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">keep-alive</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Host: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">127.0.0.1:8081</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">If-Modified-Since: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">Sat, 26 Oct 1985 08:15:00 GMT</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">If-None-Match: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">W/"23271777-626-1985-10-26T08:15:00.000Z"</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Sec-Fetch-Mode: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">navigate</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Sec-Fetch-Site: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">none</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Sec-Fetch-User: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">?1</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">Upgrade-Insecure-Requests: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">1</div>
                            </li>
                            <ol class="children" role="group"></ol>
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="header-name">User-Agent: </div>
                                <span class="header-separator"></span>
                                <div class="header-value source-code">
                                    Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like
                                    Gecko) Chrome/80.0.3963.0 Safari/537.36
                                </div>
                            </li>
                            <ol class="children" role="group"></ol>
                        </Treeoutline.Item>

                        {/* <Treeoutline.Item defaultExpanded title="Request Payload"></Treeoutline.Item> */}
                    </Treeoutline>
                </div>
            </div>
        </div>
    );
};
