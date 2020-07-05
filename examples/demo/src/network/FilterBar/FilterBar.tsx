import React, { useState } from 'react';
import TextFilter from './TextFilter';
import CheckboxFilter from './CheckboxFilter';
import { Checkbox } from '../../components';

const Types = ['XHR', 'JS', 'CSS', 'Img', 'Media', 'Font', 'Doc', 'WS', 'Manifest', 'Other'];

export default () => {
    const [selected, setSeleted] = useState('All');

    return (
        <div className="widget hbox filter-bar">
            <TextFilter />
            <CheckboxFilter />

            <div className="filter-bitset-filter">
                <span className={selected === 'All' ? 'selected' : null} onClick={() => setSeleted('All')}>
                    All
                </span>
                <div className="filter-bitset-filter-divider"></div>
                {Types.map(type => (
                    <span
                        className={selected === type ? 'selected' : null}
                        tabindex="-1"
                        role="option"
                        aria-selected="false"
                        onClick={() => setSeleted(type)}
                    >
                        {type}
                    </span>
                ))}
            </div>

            <div className="filter-checkbox-filter">
                <Checkbox label="Has blocked cookies" />
            </div>
            <div className="filter-checkbox-filter">
                <Checkbox label="Blocked Requests" />
            </div>
        </div>
    );
};
