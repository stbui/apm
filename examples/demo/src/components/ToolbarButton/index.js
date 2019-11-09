import { h } from '../../core';
import './index';

export default ({ children, text, state }) => {
    return (
        <button
            class={`toolbar-button toolbar-item toolbar-has-glyph toolbar-state-${state}`}
        >
            {children}
            <div class="toolbar-text hidden">{text}</div>
        </button>
    );
};
