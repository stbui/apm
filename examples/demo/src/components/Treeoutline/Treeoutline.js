import { h } from '../../core';

export default ({ children }) => {
    return (
        <ol class="tree-outline" role="tree" tabindex="-1">
            {children}
        </ol>
    );
};
