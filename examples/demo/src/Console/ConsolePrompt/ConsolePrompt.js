import React from 'react';

export default () => {
    return (
        <div className="source-code" id="console-prompt">
            <div className="widget">
                <div className="console-prompt-editor-container">
                    <div className="widget vbox" style="overflow: hidden;">
                        <div
                            class="CodeMirror cm-s-default CodeMirror-wrap source-code fill"
                            style="height: auto; width: 1414px;"
                        >
                            <div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 3px; left: 4px;">
                                <textarea
                                    autocorrect="off"
                                    autocapitalize="off"
                                    spellcheck="false"
                                    aria-label="Console prompt"
                                    tabindex="0"
                                    style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; outline: none;"
                                ></textarea>
                            </div>
                            <div
                                class="CodeMirror-vscrollbar"
                                tabindex="-1"
                                cm-not-content="true"
                                style="width: 18px; pointer-events: none;"
                            >
                                <div style="min-width: 1px; height: 0px;"></div>
                            </div>
                            <div
                                class="CodeMirror-hscrollbar"
                                tabindex="-1"
                                cm-not-content="true"
                                style="height: 18px; pointer-events: none;"
                            >
                                <div style="height: 100%; min-height: 1px; width: 0px;"></div>
                            </div>
                            <div
                                class="CodeMirror-scrollbar-filler"
                                cm-not-content="true"
                            ></div>
                            <div
                                class="CodeMirror-gutter-filler"
                                cm-not-content="true"
                            ></div>
                            <div class="CodeMirror-scroll" tabindex="-1">
                                <div
                                    class="CodeMirror-sizer"
                                    style="margin-left: 0px; margin-bottom: 0px; border-right-width: 30px; min-height: 17px; padding-right: 0px; padding-bottom: 0px;"
                                >
                                    <div style="position: relative; top: 0px;">
                                        <div
                                            class="CodeMirror-lines"
                                            role="presentation"
                                        >
                                            <div
                                                role="presentation"
                                                style="position: relative; outline: none;"
                                            >
                                                <div class="CodeMirror-measure">
                                                    <span>
                                                        <span>​</span>x
                                                    </span>
                                                </div>
                                                <div class="CodeMirror-measure"></div>
                                                <div style="position: relative; z-index: 1;"></div>
                                                <div
                                                    class="CodeMirror-cursors"
                                                    style=""
                                                >
                                                    <div
                                                        class="CodeMirror-cursor"
                                                        style="left: 4px; top: 0px; height: 13px;"
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </div>
                                                <div
                                                    class="CodeMirror-code"
                                                    role="presentation"
                                                >
                                                    <div
                                                        class="CodeMirror-activeline"
                                                        style="position: relative;"
                                                    >
                                                        <div class="CodeMirror-activeline-background CodeMirror-linebackground"></div>
                                                        <div
                                                            class="CodeMirror-gutter-background CodeMirror-activeline-gutter"
                                                            style="left: 0px; width: 0px;"
                                                        ></div>
                                                        <pre
                                                            class=" CodeMirror-line "
                                                            role="presentation"
                                                        >
                                                            <span
                                                                role="presentation"
                                                                style="padding-right: 0.1px;"
                                                            >
                                                                <span cm-text="">
                                                                    ​
                                                                </span>
                                                            </span>
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="position: absolute; height: 30px; width: 1px; border-bottom: 0px solid transparent; top: 17px;"></div>
                                <div
                                    class="CodeMirror-gutters"
                                    style="display: none; height: 47px;"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="console-eager-preview">
                    <div class="console-eager-inner-preview"></div>
                    <span
                        is="ui-icon"
                        class="preview-result-icon spritesheet-smallicons smallicon-command-result"
                        style="--spritesheet-position:0px 70px; width: 10px; height: 10px;"
                    ></span>
                </div>
                <span
                    is="ui-icon"
                    class="console-prompt-icon spritesheet-smallicons smallicon-text-prompt"
                    style="--spritesheet-position:-80px 90px; width: 10px; height: 10px;"
                ></span>
            </div>
        </div>
    );
};
