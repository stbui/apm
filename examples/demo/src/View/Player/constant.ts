export const PAUSE_AT_ACTIVITY_ID = 'pause_at_activity_id';
export const USER_DETAILS_ANIMATION_TIME = 500;

export const SESSIONSTACK_HOVER_CLASS = '_ss-hover';
export const PROCESS_HOVER_STYLES_CONFIG = { DELAY: 100, TIMES_TO_REPEAT: 0 };
export const ERRORS = { SECURITY_ERROR: 'SecurityError' };
export const VIEWER_MARGINS = { HORIZONTAL: 20, VERTICAL: 20 };
export const SCROLL_POSITION_CHANGE = { MAX_RETRIES: 100, TIMEOUT: 50 };
export const ELEMENTS = { HTML: 'html' };
// export const CROSS_ORIGIN_FRAME_BACKGROUND

export const LOG_OFFSET = 5000;
export const LIVE_MODE_CONFIGS = { GO_LIVE_OFFSET_TIME: 1000, MAX_ATTEMPTS: 3 };
export const DEMO_USER_ROLE = 'demo';

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


export const NAMESPACES = {
    HTML: 'http://www.w3.org/1999/xhtml',
    SVG: 'http://www.w3.org/2000/svg',
};

export const CROSS_ORIGIN_FRAME_BACKGROUND =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAIAAACRuyQOAAAApElEQVRIib3Vyw2EMBADULNdTP+9JWVkL0gIFMh87Phs6cknH601ZGNm/vJvD9N7T0pRBrlNCSYj5ZiwlGZiUoUJSEXGK9UZl0Rh1hKLWUhE5kviMq8SnZlLCmYiiZinpGNukpS5JDVzShsYAMcYYwOD0GtUGDPzSkUGzk11xiVRmLXEYhYSkfmSuMyrRGfmkoKZSCLmKemYmyRlLknNnNIGBsAflNtr9IJvuy8AAAAASUVORK5CYII=';

export const PROPERTY_OBJECT_KEY = '__sessionstack_player__';

export const ALLOWED_SRC_PROTOCOLS = ['http', 'https', 'ftp', 'data'];

export const SERVER_URL = 'http://127.0.0.1:3000/api/';
