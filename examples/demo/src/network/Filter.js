import { h } from '../core';
import TextFilter from './TextFilter';
import CheckboxFilter from './CheckboxFilter';

export default () => {
    return (
        <div className="network-toolbar-container">
            <div className="filter-bar">
                <TextFilter />
                <CheckboxFilter />

                <div className="filter-bitset-filter">
                    <span>All</span>
                    <div className="filter-bitset-filter-divider"></div>
                    <span>XHR</span>
                    <span>JS</span>
                    <span>CSS</span>
                    <span>Img</span>
                    <span>Media</span>
                    <span>Font</span>
                    <span>Doc</span>
                    <span>WS</span>
                    <span>Manifest</span>
                    <span>Other</span>
                </div>
            </div>
        </div>
    );
};
