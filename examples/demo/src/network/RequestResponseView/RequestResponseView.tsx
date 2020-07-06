import React, { useRef, useEffect } from 'react';
import { Widget, TabbedPane, Toolbar, ToolbarButton, Icon, Checkbox, Treeoutline, TextEditor } from '../../components';
import { PrettyPrint as PrettyPrintIcon } from '../../components/Icon';

export default () => {
    return (
        <div className="widget vbox request-view">
            <div className="vbox flex-auto">
                <div className="widget vbox">
                    <div className="vbox flex-auto searchable-view">
                        <div className="widget vbox">
                            <div className="widget vbox CodeMirror-readonly">
                                <TextEditor className="source-code fill" value="123" />
                            </div>
                        </div>
                    </div>
                    <Toolbar>
                        <button
                            class="toolbar-button toolbar-item toolbar-has-glyph toolbar-state-off hidden"
                            aria-label="Pretty print"
                            aria-pressed="false"
                        >
                            <PrettyPrintIcon />
                            <div class="toolbar-text hidden"></div>
                        </button>
                        <div class="toolbar-text toolbar-item">Line 1, Column 1</div>
                        <div class="toolbar-item"></div>
                    </Toolbar>
                </div>
            </div>
        </div>
    );
};
