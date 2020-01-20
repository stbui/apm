const localStorageService = {
    prefix: 'ls',
    storageType: 'localStorage',
    cookie: { expiry: 30, path: '/' },
    get: name => {},
    set: (name, value) => {},
    remove: name => {},
    bind: (b, c, d, e) => {},
};
const settings = {
    get: (name, value) => {
        const currentValue = localStorageService.get(name);
        if (currentValue === null || currentValue === 0) {
            return value;
        } else {
            return currentValue;
        }
    },
    set: (name, value) => {
        return localStorageService.set(name, value);
    },
    remove: name => {
        return localStorageService.remove(name);
    },
    bind: (b, c, d, e) => {
        return localStorageService.bind(b, c, d, e);
    },
};

class playerSettings {
    PAGE_LOAD = 'page_load';
    LOG_LEVEL = { INFO: 'info', DEBUG: 'debug', WARN: 'warn', ERROR: 'error' };
    EVENT_TYPE = {
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

    types = [
        this.LOG_LEVEL.ERROR,
        this.LOG_LEVEL.WARN,
        this.LOG_LEVEL.INFO,
        this.LOG_LEVEL.DEBUG,
        this.EVENT_TYPE.MOUSE_CLICK,
        this.EVENT_TYPE.WINDOW_RESIZE,
        this.EVENT_TYPE.DOM_SNAPSHOT,
        this.EVENT_TYPE.VISIBILITY_CHANGE,
    ];

    constructor() {}

    init(config) {
        this.settings = {};
        this.setGeneral();
        this.h(config);
    }

    getActivitiesFilterFromUrl() {
        const activities = this.getQueryParameter('activities');
        if (!activities) {
            return this.types;
        }

        if (typeof activities !== 'string') {
            return [];
        }

        var c = p(activities);
        return o(c);
    }

    p(a) {
        var c = [];
        b.forEach(a.split(','), function(a) {
            c.push(a.trim());
        });

        return c;
    }

    setGeneral() {
        this.settings.general = {
            playFrom: this.getQueryParameter('play_from'),
            pauseAt: this.getQueryParameter('pause_at'),
            playLive: this.getQueryParameter('play_live'),
            uiMode: this.getQueryParameter('ui_mode'),
            isDemo: this.getQueryParameter('is_demo') === true,
        };
    }

    // url 参数
    getQueryParameter() {}

    h(a) {
        // const b = {
        //     shouldSkipProlongedInactivity: undefined,
        //     shouldVisualizeClicks: undefined,
        //     shouldPauseOnMarker: undefined,
        //     speed: undefined,
        // };
        const b = this.should();
        // const c = {
        //     shouldSkipProlongedInactivity: true,
        //     shouldVisualizeClicks: true,
        //     shouldPauseOnMarker: true,
        //     speed: 1,
        // };
        const c = j();
        this.settings.playback = {};
        this.l(a, b, c);
    }

    should() {
        return {
            shouldSkipProlongedInactivity: this.getQueryParameter('skip_inactivity'),
            shouldVisualizeClicks: this.getQueryParameter('visualize_mouse_clicks'),
            shouldPauseOnMarker: this.getQueryParameter('pause_on_marker'),
            speed: this.getQueryParameter('speed'),
        };
    }

    j() {
        return {
            shouldSkipProlongedInactivity: this.getSettingNameValue('shouldSkipProlongedInactivity', true),
            shouldVisualizeClicks: this.getSettingNameValue('shouldVisualizeClicks', true),
            shouldPauseOnMarker: this.getSettingNameValue('shouldPauseOnMarker', true),
            speed: this.getSettingNameValue('speed', 1),
        };
    }

    getSettingNameValue(name, value) {
        return settings.get(name, value);
    }

    l(a, c, d) {
        b.forEach(d, function(d, e) {
            var f = c[e];
            if (b.isDefined(f)) {
                this.settings.playback[e] = f;
            } else {
                this.settings.playback[e] = d;
                this.m(a, e, this.settings.playback[e]);
            }
        });
    }

    m(b, field, playback) {
        var e = 'settings.playback.' + field,
            f = 'settings.' + field;
        settings.bind(b, e, playback, f);
    }
}
