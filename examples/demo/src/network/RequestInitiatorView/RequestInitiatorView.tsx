import React, { useRef, useEffect } from 'react';
import { Widget, TabbedPane, Toolbar, ToolbarButton, Icon, Checkbox, Treeoutline } from '../../components';

export default () => {
    return (
        <div class="widget vbox request-initiator-view">
            <div class="widget vbox empty-view-scroller hidden">
                <div class="empty-view">
                    <div class="empty-bold-text">This request has no initiator data.</div>
                </div>
            </div>

            <div class="request-initiator-view-section">
                <div class="request-initiator-view-section-title" tabindex="0">
                    <span
                        is="ui-icon"
                        class="spritesheet-smallicons smallicon-triangle-down icon-mask"
                        style="--spritesheet-position:-80px 30px; width: 10px; height: 10px;"
                    ></span>
                    Request call stack
                </div>
                <span class="monospace request-initiator-view-section-content" style="display: inline-block;">

                <table class="stack-preview-container"><tr><td>
</td><td class="function-name">send</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">aio-static2.f40c639.js:3</span></td></tr><tr><td>
</td><td class="function-name">ajax</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">aio-static2.f40c639.js:3</span></td></tr><tr><td>
</td><td class="function-name">ft.&lt;computed&gt;</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">aio-static2.f40c639.js:3</span></td></tr><tr><td>
</td><td class="function-name">getJSON</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">aio-static2.f40c639.js:3</span></td></tr><tr><td>
</td><td class="function-name">checkTn</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">(index):110</span></td></tr><tr><td>
</td><td class="function-name">(anonymous)</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">(index):110</span></td></tr><tr><td>
</td><td class="function-name">(anonymous)</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">a</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">emit</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">done</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">(anonymous)</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:2</span></td></tr><tr><td>
</td><td class="function-name">i</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">alog.msg</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">a</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">emit</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">done</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">(anonymous)</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:2</span></td></tr><tr><td>
</td><td class="function-name">i</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">alog.msg</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">(anonymous)</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:2</span></td></tr><tr><td>
</td><td class="function-name">a</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">emit</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">done</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">(anonymous)</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:2</span></td></tr><tr><td>
</td><td class="function-name">a</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">emit</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">e</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">t.onload</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="stack-preview-async-description">load (async)</td><td></td><td></td></tr><tr><td>
</td><td class="function-name">load</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">i</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:2</span></td></tr><tr><td>
</td><td class="function-name">load</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:2</span></td></tr><tr><td>
</td><td class="function-name">load</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:2</span></td></tr><tr><td>
</td><td class="function-name">f.async</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">a</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">c</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr><tr><td>
</td><td class="function-name">s</td><td> @ </td><td><span class="devtools-link" role="link" tabindex="0">main.a3158be.js:1</span></td></tr></table>
                </span>
            </div>

            <div class="request-initiator-view-section">
                <div class="request-initiator-view-section-title" tabindex="0">
                    <span
                        is="ui-icon"
                        class="spritesheet-smallicons smallicon-triangle-down icon-mask"
                        style="--spritesheet-position:-80px 30px; width: 10px; height: 10px;"
                    ></span>
                    Request initiator chain
                </div>
                <div class="request-initiator-view-section-content">
                <div class="tree-outline-disclosure"><ol class="tree-outline" role="tree" tabindex="-1"><li role="treeitem" class="parent expanded" aria-expanded="true"><div class="selection fill"></div><span class="tree-element-title">https://www.hao123.com/</span></li><ol class="children expanded" role="group"><li role="treeitem" class="parent expanded" aria-expanded="true"><div class="selection fill"></div><span class="tree-element-title">https://dgss2.bdstatic.com/5eR1dDebRNRTm2_p8IuM_a/her/static/indexnew/lib/main.a3158be.js</span></li><ol class="children expanded" role="group"><li role="treeitem" class="parent expanded" aria-expanded="true"><div class="selection fill"></div><span class="tree-element-title">https://dgss2.bdstatic.com/5eR1dDebRNRTm2_p8IuM_a/her/static/indexnew/pkg/aio-static2.f40c639.js</span></li><ol class="children expanded" role="group"><li role="treeitem" tabindex="0" class="selected" aria-selected="true"><div class="selection fill"></div><span class="tree-element-title" style="font-weight: bold;">https://www.hao123.com/api/tnwhilte?tn=sitehao123&amp;_=1593938931487</span></li><ol class="children" role="group"></ol></ol></ol></ol></ol></div>
                </div>
            </div>
        </div>
    );
};
