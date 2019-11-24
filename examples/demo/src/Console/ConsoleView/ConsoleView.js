import React from 'react';

import ConsolePrompt from '../ConsolePrompt';

export default ({ children }) => {
    return (
        <div className="vbox flex-auto console-searchable-view">
            <div className="widget vbox">
                <div
                    id="console-messages"
                    className="monospace"
                    style="overflow: auto;"
                >
                    <div
                        aria-hidden="true"
                        style="height: 0px; color: transparent;"
                    >
                        &#65279;
                    </div>
                    <div
                        tabindex="0"
                        class="console-group console-group-messages"
                        style=""
                    >
                        <div
                            tabindex="-1"
                            class="console-message-wrapper console-from-api console-info-level"
                        >
                            <div class="console-message">
                                <span class="source-code">
                                    <span class="console-message-anchor">
                                        <span
                                            class="devtools-link"
                                            role="link"
                                            tabindex="-1"
                                        >
                                            log.js?1afd:24
                                        </span>
                                    </span>
                                    <span class="hidden console-message-badge"></span>
                                    <span class="console-message-text">
                                        [HMR] Waiting for update signal from
                                        WDS...
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div
                            tabindex="-1"
                            class="console-message-wrapper console-from-api console-info-level"
                        >
                            <div class="console-message">
                                <span class="source-code">
                                    <span class="console-message-anchor">
                                        <span
                                            class="devtools-link"
                                            role="link"
                                            tabindex="-1"
                                        >
                                            react-dom.development.js?61bb:27705
                                        </span>
                                    </span>
                                    <span class="hidden console-message-badge"></span>
                                    <span class="console-message-text">
                                        <span style="contain: paint; display: inline-block; max-width: 100%; font-weight: bold;">
                                            Download the React DevTools for a
                                            better development experience:
                                            <span
                                                class="devtools-link"
                                                role="link"
                                                tabindex="-1"
                                                style="-webkit-text-stroke: 0px !important; text-decoration: underline !important; color: rgb(84, 84, 84) !important; background-color: rgb(255, 255, 255) !important;"
                                            >
                                                https://fb.me/react-devtools
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div tabindex="-1" class="console-message-wrapper">
                        <div class="console-user-command">
                            <span
                                is="ui-icon"
                                class="command-result-icon spritesheet-smallicons smallicon-user-command"
                                style="--spritesheet-position:-40px 10px; width: 10px; height: 10px;"
                            ></span>
                            <span class="source-code">
                                <span class="cm-js-variable">console</span>.
                                <span class="cm-js-property">error</span>(
                                <span class="cm-js-number">1</span>)
                            </span>
                        </div>
                    </div>
                    <div
                        tabindex="-1"
                        class="console-message-wrapper console-from-api console-error-level"
                    >
                        <div class="console-message">
                            <span
                                is="ui-icon"
                                class="message-level-icon spritesheet-smallicons smallicon-error"
                                aria-label="Error"
                                style="--spritesheet-position:-40px 70px; width: 10px; height: 10px;"
                            ></span>
                            <div class="console-message-stack-trace-toggle">
                                <div class="console-message-stack-trace-wrapper">
                                    <div tabindex="-1">
                                        <span
                                            is="ui-icon"
                                            class="console-message-expand-icon spritesheet-smallicons smallicon-triangle-right icon-mask"
                                            style="--spritesheet-position:0px 10px; width: 10px; height: 10px;"
                                        ></span>
                                        <span class="source-code">
                                            <span class="console-message-anchor">
                                                <span
                                                    class="devtools-link"
                                                    role="link"
                                                    tabindex="-1"
                                                >
                                                    VM3351:1
                                                </span>
                                            </span>
                                            <span class="console-message-text">
                                                <span class="object-value-number source-code">
                                                    1
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                    <div class="hidden">
                                        <span
                                            class="monospace"
                                            style="display: inline-block;"
                                        ></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        tabindex="-1"
                        class="console-message-wrapper console-info-level"
                    >
                        <div class="console-message console-user-command-result">
                            <span
                                is="ui-icon"
                                class="command-result-icon spritesheet-smallicons smallicon-command-result"
                                style="--spritesheet-position:0px 70px; width: 10px; height: 10px;"
                            ></span>
                            <span class="source-code">
                                <span class="console-message-text">
                                    <span class="object-value-undefined source-code">
                                        undefined
                                    </span>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div tabindex="-1" class="console-message-wrapper">
                        <div class="console-user-command">
                            <span
                                is="ui-icon"
                                class="command-result-icon spritesheet-smallicons smallicon-user-command"
                                style="--spritesheet-position:-40px 10px; width: 10px; height: 10px;"
                            ></span>
                            <span class="source-code">
                                <span class="cm-js-variable">apm</span>
                            </span>
                        </div>
                    </div>
                    <div
                        tabindex="-1"
                        class="console-message-wrapper console-error-level console-adjacent-user-command-result"
                    >
                        <div class="console-message console-user-command-result">
                            <span
                                is="ui-icon"
                                class="message-level-icon spritesheet-smallicons smallicon-error"
                                aria-label="Error"
                                style="--spritesheet-position:-40px 70px; width: 10px; height: 10px;"
                            ></span>
                            <div class="console-message-stack-trace-toggle">
                                <div class="console-message-stack-trace-wrapper">
                                    <div tabindex="-1">
                                        <span
                                            is="ui-icon"
                                            class="console-message-expand-icon spritesheet-smallicons smallicon-triangle-right icon-mask"
                                            style="--spritesheet-position:0px 10px; width: 10px; height: 10px;"
                                        ></span>
                                        <span class="source-code">
                                            <span class="console-message-anchor">
                                                <span
                                                    class="devtools-link"
                                                    role="link"
                                                    tabindex="-1"
                                                >
                                                    VM3366:1
                                                </span>
                                            </span>
                                            <span class="console-message-text">
                                                Uncaught
                                                <span class="object-value-error source-code">
                                                    ReferenceError: apm is not
                                                    defined at
                                                    &lt;anonymous&gt;:1:1
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                    <div class="hidden">
                                        <span
                                            class="monospace"
                                            style="display: inline-block;"
                                        ></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        aria-hidden="true"
                        style="height: 0px; color: transparent;"
                    >
                        &#65279;
                    </div>

                    <ConsolePrompt />
                </div>
                <div className="search-bar hidden"></div>
            </div>
        </div>
    );
};
