export const PLAYER_CONFIG = {
    PLAY_SPEED: 50,
    MAX_INACTIVITY_TIME: 3000,
    EVENTS_BATCH_SIZE: 50,
    EVENTS_BATCH_WAIT_TIME: 0,
    TAB_HIDDEN_MESSAGE_TIME: 1000,
    GO_LIVE_DELAY_TIME: 1500,
    LAG_TIME: 500,
    MILLISECONDS_PER_FRAME: 33,
};
export const TAB_VISIBILITY = { VISIBLE: 'visible', HIDDEN: 'hidden' };
export const UI_MODE = { SIMPLE: 'simple' };

export const EVENT_TYPE = {
    DOM_MUTATION: 'dom_mutation',
    DOM_ELEMENT_VALUE_CHANGE: 'dom_element_value_change',
    DOM_SNAPSHOT: 'dom_snapshot',
    MOUSE_MOVE: 'mouse_move',
    MOUSE_CLICK: 'mouse_click',
    MOUSE_OVER: 'mouse_over',
    MOUSE_OUT: 'mouse_out',
    SCROLL_POSITION_CHANGE: 'scroll_position_change',
    WINDOW_RESIZE: 'window_resize',
    RADIO_BUTTON_CHANGE: 'radio_button_change',
    CHECKBOX_CHANGE: 'checkbox_change',
    VISIBILITY_CHANGE: 'visibility_change',
    CSS_RULE_INSERT: 'css_rule_insert',
    CSS_RULE_DELETE: 'css_rule_delete',
};

export const MOUSE_TYPE = [EVENT_TYPE.MOUSE_CLICK, EVENT_TYPE.MOUSE_MOVE, EVENT_TYPE.WINDOW_RESIZE];
