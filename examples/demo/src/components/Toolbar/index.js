import { h } from '../../core';
import './index.scss';

export default ({ children }) => {
    return (
        <div class="toolbar">
            <div class="toolbar-shadow">{children}</div>
        </div>
    );
};
