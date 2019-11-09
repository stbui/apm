import { h } from '../../core';
import './index';

export default ({ children }) => {
    return (
        <div class="toolbar">
            <div class="toolbar-shadow">{children}</div>
        </div>
    );
};
