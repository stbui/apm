import React from 'react';

export const SpriteSheets = {
    smallicons: { width: 10, height: 10, padding: 10 },
    mediumicons: { width: 16, height: 16, padding: 0 },
    largeicons: { width: 28, height: 24, padding: 0 },
    arrowicons: { width: 19, height: 19, padding: 0 },
};

export default ({ type, mask, coordinates }) => {
    return (
        <span
            is="ui-icon"
            class={`toolbar-glyph spritesheet-${type} ${type}-node-search icon-mask`}
            style={`--spritesheet-position:${coordinates}; width: 28px; height: 24px;`}
        ></span>
    );
};

export const StopRecording = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-stop-recording icon-mask"
            style="--spritesheet-position:-84px 24px; width: 28px; height: 24px;"
        ></span>
    );
};

export const StartRecording = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-start-recording icon-mask"
            style="--spritesheet-position:-168px 48px; width: 28px; height: 24px;"
        ></span>
    );
};

export const Refresh = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-refresh icon-mask"
            style="--spritesheet-position:-84px 48px; width: 28px; height: 24px;"
        ></span>
    );
};

export const Clear = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-clear icon-mask"
            style="--spritesheet-position:0px 144px; width: 28px; height: 24px;"
        ></span>
    );
};

export const Filter = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-filter icon-mask"
            style="--spritesheet-position:-56px 120px; width: 28px; height: 24px;"
        ></span>
    );
};

export const Search = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-search icon-mask"
            style="--spritesheet-position:-196px 96px; width: 28px; height: 24px;"
        ></span>
    );
};

export const Load = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-load icon-mask"
            style="--spritesheet-position:-196px 120px; width: 28px; height: 24px;"
        ></span>
    );
};

export const Download = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-download icon-mask"
            style="--spritesheet-position:-196px 144px; width: 28px; height: 24px;"
        ></span>
    );
};

export const Error = () => {
    return (
        <span
            is="ui-icon"
            class="message-level-icon spritesheet-smallicons smallicon-error"
            aria-label="Error"
            style="--spritesheet-position:-40px 70px; width: 10px; height: 10px;"
        ></span>
    );
};

export const TriangleRight = () => {
    return (
        <span
            is="ui-icon"
            class="console-message-expand-icon spritesheet-smallicons smallicon-triangle-right icon-mask"
            style="--spritesheet-position:0px 10px; width: 10px; height: 10px;"
        ></span>
    );
};

export const TriangleDown = () => {
    return (
        <span
            is="ui-icon"
            class="console-message-expand-icon spritesheet-smallicons smallicon-triangle-down icon-mask"
            style="--spritesheet-position:-80px 30px; width: 10px; height: 10px;"
        ></span>
    );
};

export const UserCommand = () => {
    return (
        <span
            is="ui-icon"
            class="command-result-icon spritesheet-smallicons smallicon-user-command"
            style="--spritesheet-position:-40px 10px; width: 10px; height: 10px;"
        ></span>
    );
};

export const CommandResult = () => {
    return (
        <span
            is="ui-icon"
            class="command-result-icon spritesheet-smallicons smallicon-command-result"
            style="--spritesheet-position:0px 70px; width: 10px; height: 10px;"
        ></span>
    );
};

export const TextPrompt = () => {
    return (
        <span
            is="ui-icon"
            class="console-prompt-icon spritesheet-smallicons smallicon-text-prompt"
            style="--spritesheet-position:-80px 90px; width: 10px; height: 10px;"
        ></span>
    );
};

export const Warning = () => {
    return (
        <span
            is="ui-icon"
            class="message-level-icon spritesheet-smallicons smallicon-warning"
            aria-label="Warning"
            style="--spritesheet-position:-60px 10px; width: 10px; height: 10px;"
        ></span>
    );
};

export const SettingGear = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-settings-gear icon-mask"
            style="--spritesheet-position:-168px 168px; width: 28px; height: 24px;"
        ></span>
    );
};

export const Menu = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-menu icon-mask"
            style="--spritesheet-position:-56px 96px; width: 28px; height: 24px;"
        ></span>
    );
};

export const NodeSearch = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-node-search icon-mask"
            style="--spritesheet-position:-140px 96px; width: 28px; height: 24px;"
        ></span>
    );
};

export const ShowLefrSidebar = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-show-left-sidebar icon-mask"
            style="--spritesheet-position:-168px 120px; width: 28px; height: 24px;"
        ></span>
    );
};

export const Visibility = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-visibility icon-mask"
            style="--spritesheet-position:-196px 216px; width: 28px; height: 24px;"
        ></span>
    );
};

export const LongclickTriangle = () => {
    return (
        <span
            is="ui-icon"
            class="long-click-glyph spritesheet-largeicons largeicon-longclick-triangle icon-mask"
            style="--spritesheet-position:-28px 96px; width: 28px; height: 24px;"
        ></span>
    );
};

export const Chevron = () => {
    return (
        <span
            is="ui-icon"
            class="chevron-icon spritesheet-largeicons largeicon-chevron icon-mask"
            style="--spritesheet-position:-56px 168px; width: 28px; height: 24px;"
        ></span>
    );
};

export const TrashBin = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-trash-bin icon-mask"
            style="--spritesheet-position:-140px 24px; width: 28px; height: 24px;"
        ></span>
    );
};

export const Manifest = () => {
    return (
        <span
            is="ui-icon"
            class="resource-tree-item spritesheet-mediumicons mediumicon-manifest icon-mask"
            style="--spritesheet-position:-48px 64px; width: 16px; height: 16px;"
        ></span>
    );
};

export const serviceWorker = () => {
    return (
        <span
            is="ui-icon"
            class="resource-tree-item spritesheet-mediumicons mediumicon-service-worker icon-mask"
            style="--spritesheet-position:0px 48px; width: 16px; height: 16px;"
        ></span>
    );
};

export const ClearStorage = () => {
    return (
        <span
            is="ui-icon"
            class="resource-tree-item spritesheet-mediumicons mediumicon-clear-storage icon-mask"
            style="--spritesheet-position:0px 64px; width: 16px; height: 16px;"
        ></span>
    );
};

export const Table = () => {
    return (
        <span
            is="ui-icon"
            class="resource-tree-item spritesheet-mediumicons mediumicon-table icon-mask"
            style="--spritesheet-position:-16px 48px; width: 16px; height: 16px;"
        ></span>
    );
};

export const Database = () => {
    return (
        <span
            is="ui-icon"
            class="resource-tree-item spritesheet-mediumicons mediumicon-database icon-mask"
            style="--spritesheet-position:-32px 64px; width: 16px; height: 16px;"
        ></span>
    );
};

export const Cookie = () => {
    return (
        <span
            is="ui-icon"
            class="resource-tree-item spritesheet-mediumicons mediumicon-cookie icon-mask"
            style="--spritesheet-position:-16px 64px; width: 16px; height: 16px;"
        ></span>
    );
};

export const Fetch = () => {
    return (
        <span
            is="ui-icon"
            class="resource-tree-item spritesheet-mediumicons mediumicon-fetch icon-mask"
            style="--spritesheet-position:-16px 80px; width: 16px; height: 16px;"
        ></span>
    );
};

export const Sync = () => {
    return (
        <span
            is="ui-icon"
            class="resource-tree-item spritesheet-mediumicons mediumicon-sync icon-mask"
            style="--spritesheet-position:0px 80px; width: 16px; height: 16px;"
        ></span>
    );
};

export const Bell = () => {
    return (
        <span
            is="ui-icon"
            class="resource-tree-item spritesheet-mediumicons mediumicon-bell icon-mask"
            style="--spritesheet-position:-16px 96px; width: 16px; height: 16px;"
        ></span>
    );
};

export const Payment = () => {
    return (
        <span
            is="ui-icon"
            class="resource-tree-item spritesheet-mediumicons mediumicon-payment icon-mask"
            style="--spritesheet-position:-32px 96px; width: 16px; height: 16px;"
        ></span>
    );
};

export const Schedule = () => {
    return (
        <span
            is="ui-icon"
            class="resource-tree-item spritesheet-mediumicons mediumicon-schedule icon-mask"
            style="--spritesheet-position:-48px 96px; width: 16px; height: 16px;"
        ></span>
    );
};

export const Cloud = () => {
    return (
        <span
            is="ui-icon"
            class="resource-tree-item spritesheet-mediumicons mediumicon-cloud icon-mask"
            style="--spritesheet-position:0px 96px; width: 16px; height: 16px;"
        ></span>
    );
};

export const NavigatorFrame = () => {
    return (
        <span
            is="ui-icon"
            class="navigator-tree-item spritesheet-largeicons largeicon-navigator-frame icon-mask navigator-frame-tree-item"
            style="--spritesheet-position:-140px 168px; width: 28px; height: 24px;"
        ></span>
    );
};

export const NavigatorFile = () => {
    return (
        <span
            is="ui-icon"
            class="navigator-tree-item spritesheet-largeicons largeicon-navigator-file icon-mask navigator-file-tree-item navigator-document-tree-item"
            style="--spritesheet-position:-112px 96px; width: 28px; height: 24px;"
        ></span>
    );
};

export const Cross = () => {
    return (
        <span
            is="ui-icon"
            class="default-icon spritesheet-smallicons smallicon-cross"
            style="--spritesheet-position:-20px 70px; width: 10px; height: 10px;"
        ></span>
    );
};

export const CrossRedHover = () => {
    return (
        <span
            is="ui-icon"
            class="hover-icon spritesheet-mediumicons mediumicon-red-cross-hover"
            style="--spritesheet-position:0px 16px; width: 16px; height: 16px;"
        ></span>
    );
};

export const CrossRedActive = () => {
    return (
        <span
            is="ui-icon"
            class="active-icon spritesheet-mediumicons mediumicon-red-cross-active"
            style="--spritesheet-position:-48px 32px; width: 16px; height: 16px;"
        ></span>
    );
};

export const PrettyPrint = () => {
    return (
        <span
            is="ui-icon"
            class="toolbar-glyph spritesheet-largeicons largeicon-pretty-print icon-mask"
            style="--spritesheet-position:-56px 48px; width: 28px; height: 24px;"
        ></span>
    );
};
