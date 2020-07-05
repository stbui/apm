import React from 'react';
import { Toolbar, ToolbarButton, Icon, Checkbox } from '../components';
import {
    StopRecording as StopRecordingIcon,
    Clear as ClearIcon,
    Filter as FilterIcon,
    SettingGear as SettingGearIcon,
    Download as DownloadIcon,
    TriangleDown as TriangleDownIcon,
} from '../components/Icon';

export default () => {
    return (
        <div className="network-toolbar-container">
            <Toolbar>
                <button
                    className="toolbar-button toolbar-item toolbar-has-glyph toolbar-toggle-with-red-color toolbar-state-on"
                    aria-label="Record network log"
                    aria-pressed="true"
                >
                    <StopRecordingIcon />
                    <div className="toolbar-text hidden"></div>
                </button>

                {/* <ToolbarButton state="on">
            <Icon type="largeicons" coordinates="-84px 24px" />
        </ToolbarButton> */}

                <ToolbarButton>
                    <ClearIcon />
                </ToolbarButton>

                <div className="toolbar-divider toolbar-item"></div>

                <ToolbarButton state="on">
                    <FilterIcon />
                </ToolbarButton>

                <ToolbarButton state="off">
                    <Icon type="largeicons" coordinates="-196px 96px" />
                </ToolbarButton>

                <div class="toolbar-divider toolbar-item"></div>

                <Checkbox label="Preserve log" />
                <Checkbox label="Disable cache" />

                <div className="toolbar-divider toolbar-item"></div>

                <span className="toolbar-select-container toolbar-item">
                    <select class="toolbar-item" aria-label="Throttling" style="max-width: 160px;">
                        <optgroup label="Disabled">
                            <option value="Online" aria-label="Disabled: Online">
                                Online
                            </option>
                        </optgroup>
                        <optgroup label="Presets">
                            <option value="Fast 3G" aria-label="Presets: Fast 3G">
                                Fast 3G
                            </option>
                            <option value="Slow 3G" aria-label="Presets: Slow 3G">
                                Slow 3G
                            </option>
                            <option value="Offline" aria-label="Presets: Offline">
                                Offline
                            </option>
                        </optgroup>
                        <optgroup label="Custom">
                            <option value="Add…" aria-label="Add Custom">
                                Add…
                            </option>
                        </optgroup>
                    </select>

                    <TriangleDownIcon />
                </span>
                <div class="toolbar-divider toolbar-item"></div>

                <ToolbarButton>
                    <Icon type="largeicons" coordinates="-196px 120px" />
                </ToolbarButton>
                <ToolbarButton>
                    <DownloadIcon />
                </ToolbarButton>
            </Toolbar>

            <Toolbar>
                <div class="toolbar-item"></div>
                <div class="toolbar-divider toolbar-item"></div>
                <ToolbarButton>
                    <SettingGearIcon />
                </ToolbarButton>
            </Toolbar>
        </div>
    );
};
