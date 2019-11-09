import { h } from '../core';

export default () => (
    <div className="filter-checkbox-filter">
        {/* <label is="dt-checkbox" className="checkboxTextLabel dt-checkbox-text">
            <input type="checkbox" />
            Hide data URLs
        </label> */}
        <span className="dt-checkbox" is="dt-checkbox">
            <input type="checkbox" id="ui-checkbox-label" />
            <label className="dt-checkbox-text" id="ui-checkbox-label">
                Hide data URLs
            </label>
        </span>
    </div>
);
