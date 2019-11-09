import { h } from '../../core';
import './index';

export default ({ label }) => {
    return (
        <span is="dt-checkbox" className="toolbar-item checkbox">
            <input type="checkbox" id="ui-checkbox-label2" />
            <label className="dt-checkbox-text" for="ui-checkbox-label2">
                {label}
            </label>
        </span>
    );
};
