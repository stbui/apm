export const ANALYTICS_EVENT_TYPES = {
    CONSOLE_OPENED: 'console_opened',
    SESSIONS_DATE_FILTER_APPLIED: 'sessions_date_filter_applied',
    SESSIONS_DATE_FILTER_OPENED: 'sessions_date_filter_opened',
    SUPPORT_TOOLKIT_ENABLED: 'support_toolkit_enabled',
    NETWORK_TAB_OPENED: 'network_tab_opened',
    LIVE_SESSION_OPENED: 'live_session_opened',
    LIVE_SESSION_STOPPED: 'live_session_stopped',
    SESSION_OPENED: 'session_opened',
    PROJECT_OPENED: 'project_opened',
    PROJECT_SETTINGS_OPENED: 'project_settings_opened',
};

export const SERVER_URL = 'api/';

export const BROKER_URL = 'wss://127.0.0.1/api/';

export const BUILD_ENV = {
    IS_DEV: !1,
    PLAYER_ONLINE_MODE: !0,
    IS_SAAS: !0,
    USE_TESTING_INTERCOM: !1,
};

export const FRONTEND_URL = 'http://127.0.0.1/';

export const HTTP_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
};

export const LOG_LEVEL = {
    INFO: 'info',
    DEBUG: 'debug',
    WARN: 'warn',
    ERROR: 'error',
};

export const MESSAGES = {
    GENERIC_ERROR: 'Please try again. If this message persists, please contact the support team.',
};

export const TIME_PERIOD = {
    HOUR: {
        label: '1 Hour',
        value: 3600,
    },
    DAY: {
        label: '1 Day',
        value: 86400,
    },
    WEEK: {
        label: '1 Week',
        value: 604800,
    },
    MONTH: {
        label: '1 Month',
        value: 2592e3,
    },
    ALL_TIME: {
        label: 'All time',
        value: null,
    },
};

export const ANIMATION_TIME = 500;

export const DOWNLOAD_COMPLETED_COOKIE = 'session_download_completed';
