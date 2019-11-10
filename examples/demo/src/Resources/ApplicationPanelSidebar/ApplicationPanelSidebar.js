import { h } from '../../core';
import { Treeoutline } from '../../components';

export default () => {
    return (
        <div class="resources-sidebar filter-all">
            <div class="tree-outline-disclosure">
                <Treeoutline>
                    <li
                        role="treeitem"
                        class="parent storage-group-list-item always-parent expanded"
                        aria-expanded="true"
                    >
                        <div class="selection fill"></div>
                        <span class="tree-element-title">Application</span>
                    </li>
                    <ol class="children expanded" role="group">
                        <li role="treeitem" class="">
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-manifest icon-mask"
                                    style="--spritesheet-position:-48px 64px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">Manifest</span>
                        </li>
                        <ol class="children" role="group"></ol>
                        <li role="treeitem" class="">
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-service-worker icon-mask"
                                    style="--spritesheet-position:0px 48px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">
                                Service Workers
                            </span>
                        </li>
                        <ol class="children" role="group"></ol>
                        <li role="treeitem" class="">
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-clear-storage icon-mask"
                                    style="--spritesheet-position:0px 64px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">
                                Clear storage
                            </span>
                        </li>
                        <ol class="children" role="group"></ol>
                    </ol>
                    <li
                        role="treeitem"
                        class="parent storage-group-list-item always-parent expanded"
                        aria-expanded="true"
                    >
                        <div class="selection fill"></div>
                        <span class="tree-element-title">Storage</span>
                    </li>
                    <ol class="children expanded" role="group">
                        <li
                            role="treeitem"
                            class="parent expanded"
                            aria-expanded="true"
                        >
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-table icon-mask"
                                    style="--spritesheet-position:-16px 48px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">
                                Local Storage
                            </span>
                        </li>
                        <ol class="children expanded" role="group">
                            <li role="treeitem" class="">
                                <div class="selection fill"></div>
                                <div class="leading-icons icons-container">
                                    <span
                                        is="ui-icon"
                                        class="resource-tree-item spritesheet-mediumicons mediumicon-table icon-mask"
                                        style="--spritesheet-position:-16px 48px; width: 16px; height: 16px;"
                                    ></span>
                                </div>
                                <span class="tree-element-title">
                                    http://127.0.0.1:8081
                                </span>
                            </li>
                            <ol class="children" role="group"></ol>
                        </ol>
                        <li
                            role="treeitem"
                            class="parent expanded"
                            aria-expanded="true"
                        >
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-table icon-mask"
                                    style="--spritesheet-position:-16px 48px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">
                                Session Storage
                            </span>
                        </li>
                        <ol class="children expanded" role="group">
                            <li role="treeitem" class="">
                                <div class="selection fill"></div>
                                <div class="leading-icons icons-container">
                                    <span
                                        is="ui-icon"
                                        class="resource-tree-item spritesheet-mediumicons mediumicon-table icon-mask"
                                        style="--spritesheet-position:-16px 48px; width: 16px; height: 16px;"
                                    ></span>
                                </div>
                                <span class="tree-element-title">
                                    http://127.0.0.1:8081
                                </span>
                            </li>
                            <ol class="children" role="group"></ol>
                        </ol>
                        <li role="treeitem" class="">
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-database icon-mask"
                                    style="--spritesheet-position:-32px 64px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">IndexedDB</span>
                        </li>
                        <ol class="children" role="group"></ol>
                        <li role="treeitem" class="">
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-database icon-mask"
                                    style="--spritesheet-position:-32px 64px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">Web SQL</span>
                        </li>
                        <ol class="children" role="group"></ol>
                        <li
                            role="treeitem"
                            class="parent expanded"
                            aria-expanded="true"
                        >
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-cookie icon-mask"
                                    style="--spritesheet-position:-16px 64px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">Cookies</span>
                        </li>
                        <ol class="children expanded" role="group">
                            <li role="treeitem">
                                <div class="selection fill"></div>
                                <div class="leading-icons icons-container">
                                    <span
                                        is="ui-icon"
                                        class="resource-tree-item spritesheet-mediumicons mediumicon-cookie icon-mask"
                                        style="--spritesheet-position:-16px 64px; width: 16px; height: 16px;"
                                    ></span>
                                </div>
                                <span class="tree-element-title">
                                    http://127.0.0.1:8081
                                </span>
                            </li>
                            <ol class="children" role="group"></ol>
                        </ol>
                    </ol>
                    <li
                        role="treeitem"
                        class="parent storage-group-list-item always-parent expanded"
                        aria-expanded="true"
                    >
                        <div class="selection fill"></div>
                        <span class="tree-element-title">Cache</span>
                    </li>
                    <ol class="children expanded" role="group">
                        <li role="treeitem" class="">
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-database icon-mask"
                                    style="--spritesheet-position:-32px 64px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">
                                Cache Storage
                            </span>
                        </li>
                        <ol class="children" role="group"></ol>
                        <li role="treeitem" class="">
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-table icon-mask"
                                    style="--spritesheet-position:-16px 48px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">
                                Application Cache
                            </span>
                        </li>
                        <ol class="children" role="group"></ol>
                    </ol>
                    <li
                        role="treeitem"
                        class="parent storage-group-list-item always-parent expanded"
                        aria-expanded="true"
                    >
                        <div class="selection fill"></div>
                        <span class="tree-element-title">
                            Background Services
                        </span>
                    </li>
                    <ol class="children expanded" role="group">
                        <li role="treeitem" class="selected" tabindex="0">
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-fetch icon-mask"
                                    style="--spritesheet-position:-16px 80px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">
                                Background Fetch
                            </span>
                        </li>
                        <ol class="children" role="group"></ol>
                        <li role="treeitem" class="">
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-sync icon-mask"
                                    style="--spritesheet-position:0px 80px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">
                                Background Sync
                            </span>
                        </li>
                        <ol class="children" role="group"></ol>
                        <li role="treeitem">
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-bell icon-mask"
                                    style="--spritesheet-position:-16px 96px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">
                                Notifications
                            </span>
                        </li>
                        <ol class="children" role="group"></ol>
                        <li role="treeitem">
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-payment icon-mask"
                                    style="--spritesheet-position:-32px 96px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">
                                Payment Handler
                            </span>
                        </li>
                        <ol class="children" role="group"></ol>
                        <li role="treeitem">
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="resource-tree-item spritesheet-mediumicons mediumicon-cloud icon-mask"
                                    style="--spritesheet-position:0px 96px; width: 16px; height: 16px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">
                                Push Messaging
                            </span>
                        </li>
                        <ol class="children" role="group"></ol>
                    </ol>
                    <li
                        role="treeitem"
                        class="parent storage-group-list-item always-parent expanded"
                        aria-expanded="true"
                    >
                        <div class="selection fill"></div>
                        <span class="tree-element-title">Frames</span>
                    </li>
                    <ol class="children expanded" role="group">
                        <li
                            role="treeitem"
                            class="parent"
                            aria-expanded="false"
                        >
                            <div class="selection fill"></div>
                            <div class="leading-icons icons-container">
                                <span
                                    is="ui-icon"
                                    class="navigator-tree-item spritesheet-largeicons largeicon-navigator-frame icon-mask navigator-frame-tree-item"
                                    style="--spritesheet-position:-140px 168px; width: 28px; height: 24px;"
                                ></span>
                            </div>
                            <span class="tree-element-title">top</span>
                        </li>
                        <ol class="children" role="group"></ol>
                    </ol>
                </Treeoutline>
            </div>
        </div>
    );
};
