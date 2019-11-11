import { h } from '../../core';
import TextFilter from './TextFilter';
import CheckboxFilter from './CheckboxFilter';

export default () => {
    return (
        <div className="widget hbox filter-bar">
            <TextFilter />
            <CheckboxFilter />

            <div className="filter-bitset-filter">
                <span class="all selected">All</span>
                <div class="filter-bitset-filter-divider"></div>
                <span class="XHR and Fetch">XHR</span>
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
    );
};
