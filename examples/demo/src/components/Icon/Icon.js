import { h } from '../../core';

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
