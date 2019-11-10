import { h } from '../core';
import {
    Widget,
    TabbedPane,
    Toolbar,
    ToolbarButton,
    Icon,
    Checkbox,
} from '../components';

export default () => {
    return (
        <div class="widget hbox network-settings-pane hidden">
            <Toolbar>
                <Checkbox id="4" label="Use large request rows" />
                <Checkbox id="5" label="Show overview" />
            </Toolbar>
            <Toolbar>
                <Checkbox id="6" label="Group by frame" />
                <Checkbox id="7" label="Capture screenshots" />
            </Toolbar>
        </div>
    );
};
