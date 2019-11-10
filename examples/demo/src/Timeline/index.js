import { h } from '../core';
import './timelinePanel.scss';

export default ({ children }) => {
    return (
        <div class="widget vbox panel timeline">
            <div class="timeline-toolbar-container">
                <div class="timeline-main-toolbar toolbar">
                    <div class="toolbar-shadow">
                        <button
                            class="toolbar-button toolbar-item toolbar-has-glyph toolbar-toggle-with-red-color toolbar-state-off"
                            aria-label="Record"
                            aria-pressed="false"
                        >
                            <span
                                is="ui-icon"
                                class="toolbar-glyph spritesheet-largeicons largeicon-start-recording icon-mask"
                                style="--spritesheet-position:-168px 48px; width: 28px; height: 24px;"
                            ></span>
                            <div class="toolbar-text hidden"></div>
                        </button>
                        <button
                            class="toolbar-button toolbar-item toolbar-has-glyph"
                            aria-label="Start profiling and reload page"
                        >
                            <span
                                is="ui-icon"
                                class="toolbar-glyph spritesheet-largeicons largeicon-refresh icon-mask"
                                style="--spritesheet-position:-84px 48px; width: 28px; height: 24px;"
                            ></span>
                            <div class="toolbar-text hidden"></div>
                        </button>
                        <button
                            class="toolbar-button toolbar-item toolbar-has-glyph"
                            aria-label="Clear"
                        >
                            <span
                                is="ui-icon"
                                class="toolbar-glyph spritesheet-largeicons largeicon-clear icon-mask"
                                style="--spritesheet-position:0px 144px; width: 28px; height: 24px;"
                            ></span>
                            <div class="toolbar-text hidden"></div>
                        </button>
                        <div class="toolbar-divider toolbar-item"></div>

                        <button
                            class="toolbar-button toolbar-item toolbar-has-glyph"
                            aria-label="Load profile..."
                        >
                            <span
                                is="ui-icon"
                                class="toolbar-glyph spritesheet-largeicons largeicon-load icon-mask"
                                style="--spritesheet-position:-196px 120px; width: 28px; height: 24px;"
                            ></span>
                            <div class="toolbar-text hidden"></div>
                        </button>
                        <button
                            class="toolbar-button toolbar-item toolbar-has-glyph"
                            aria-label="Save profile..."
                        >
                            <span
                                is="ui-icon"
                                class="toolbar-glyph spritesheet-largeicons largeicon-download icon-mask"
                                style="--spritesheet-position:-196px 144px; width: 28px; height: 24px;"
                            ></span>
                            <div class="toolbar-text hidden"></div>
                        </button>
                        <div class="toolbar-divider toolbar-item"></div>
                        <div class="toolbar-divider toolbar-item"></div>

                        <div class="toolbar-divider toolbar-item hidden"></div>

                        <span
                            is="dt-checkbox"
                            class="toolbar-item checkbox"
                        ></span>

                        <span
                            is="dt-checkbox"
                            class="toolbar-item checkbox"
                        ></span>

                        <button
                            class="toolbar-button toolbar-item toolbar-has-glyph"
                            aria-label="Collect garbage"
                        >
                            <span
                                is="ui-icon"
                                class="toolbar-glyph spritesheet-largeicons largeicon-trash-bin icon-mask"
                                style="--spritesheet-position:-140px 24px; width: 28px; height: 24px;"
                            ></span>
                            <div class="toolbar-text hidden"></div>
                        </button>
                    </div>
                </div>
                <div class="toolbar">
                    <div class="toolbar-shadow">
                        <div class="toolbar-divider toolbar-item"></div>
                        <button
                            class="toolbar-button toolbar-item toolbar-has-glyph toolbar-state-off"
                            aria-label="Capture settings"
                            aria-pressed="false"
                        >
                            <span
                                is="ui-icon"
                                class="toolbar-glyph spritesheet-largeicons largeicon-settings-gear icon-mask"
                                style="--spritesheet-position:-168px 168px; width: 28px; height: 24px;"
                            ></span>
                            <div class="toolbar-text hidden"></div>
                        </button>
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    );
};
