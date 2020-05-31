import { utils, settings } from './common';

const PAGE_LOAD = 'page_load';

var q = [
    EVENT_TYPE.CONSOLE_ERROR,
    EVENT_TYPE.MOUSE_CLICK,
    EVENT_TYPE.WINDOW_RESIZE,
    EVENT_TYPE.DOM_SNAPSHOT,
    EVENT_TYPE.VISIBILITY_CHANGE,
];

function init(playerController) {
    playerController.settings = {};
    f(playerController);
    g(playerController);
    h(playerController);
}
function f(playerController) {
    playerController.settings.general = {
        playFrom: utils.getQueryParameter('play_from'),
        pauseAt: utils.getQueryParameter('pause_at'),
        playLive: utils.getQueryParameter('play_live'),
        uiMode: utils.getQueryParameter('ui_mode'),
        accessToken: utils.getQueryParameter('access_token'),
        isDemo: utils.getQueryParameter('is_demo') === true,
        domSnapshotsEnabled: utils.getQueryParameter('dom_snapshots') === true,
        liveSeparatePipeline: utils.getQueryParameter('live_separate_pipeline') === true,
        isAssureCoWorkaroundEnabled: utils.getQueryParameter('assure_co_workaround') === true,
    };
}
function g(playerController) {
    playerController.settings.analytics = { source: utils.getQueryParameter('source') };
}
function h(playerController) {
    var b = i(),
        c = j();
    playerController.settings.playback = {};
    l(playerController, b, c);
}
function i() {
    return {
        shouldSkipProlongedInactivity: utils.getQueryParameter('skip_inactivity'),
        shouldVisualizeClicks: utils.getQueryParameter('visualize_mouse_clicks'),
        shouldPauseOnMarker: utils.getQueryParameter('pause_on_marker'),
        speed: utils.getQueryParameter('speed'),
    };
}
function j() {
    return {
        shouldSkipProlongedInactivity: k('shouldSkipProlongedInactivity', true),
        shouldVisualizeClicks: k('shouldVisualizeClicks', true),
        shouldPauseOnMarker: k('shouldPauseOnMarker', true),
        speed: k('speed', 1),
    };
}
function k(type, value) {
    return settings.get(type, value);
}
function l(playerController, c, d) {
    utils.forEach(d, function (d, e) {
        var f = c[e];
        utils.isDefined(f)
            ? (playerController.settings.playback[e] = f)
            : ((playerController.settings.playback[e] = d),
              m(playerController, e, playerController.settings.playback[e]));
    });
}
function m(playerController, c, d) {
    var e = 'settings.playback.' + c,
        f = 'settings.' + c;
    settings.bind(playerController, e, d, f);
}
function getActivitiesFilterFromUrl() {
    var activities = utils.getQueryParameter('activities');
    if (utils.isUndefined(activities)) return q;
    if (!utils.isString(activities)) return [];
    var c = p(activities);
    return o(c);
}
function o(a) {
    var e = [];
    utils.forEach(a, function (a) {
        a === PAGE_LOAD ? e.push(EVENT_TYPE.DOM_SNAPSHOT) : e.push(a);
    });

    return e;
}
function p(activities) {
    var c = [];
    utils.forEach(activities.split(','), function (a) {
        c.push(a.trim());
    });

    return c;
}

export const playerSettings = { init: init, getActivitiesFilterFromUrl: getActivitiesFilterFromUrl };

// angular
//     .module('playerApp')
//     .constant('PAGE_LOAD', 'page_load')
//     .factory('playerSettings', [
//         'settings',
//         'utils',
//         'EVENT_TYPE',
//         'PAGE_LOAD',
//         function (settings, utils, EVENT_TYPE, PAGE_LOAD) {
//             function init(playerController) {
//                 playerController.settings = {};
//                 f(playerController);
//                 g(playerController);
//                 h(playerController);
//             }
//             function f(playerController) {
//                 playerController.settings.general = {
//                     playFrom: utils.getQueryParameter('play_from'),
//                     pauseAt: utils.getQueryParameter('pause_at'),
//                     playLive: utils.getQueryParameter('play_live'),
//                     uiMode: utils.getQueryParameter('ui_mode'),
//                     accessToken: utils.getQueryParameter('access_token'),
//                     isDemo: utils.getQueryParameter('is_demo') === true,
//                     domSnapshotsEnabled: utils.getQueryParameter('dom_snapshots') === true,
//                     liveSeparatePipeline: utils.getQueryParameter('live_separate_pipeline') === true,
//                     isAssureCoWorkaroundEnabled: utils.getQueryParameter('assure_co_workaround') === true,
//                 };
//             }
//             function g(playerController) {
//                 playerController.settings.analytics = { source: utils.getQueryParameter('source') };
//             }
//             function h(playerController) {
//                 var b = i(),
//                     c = j();
//                 playerController.settings.playback = {};
//                 l(playerController, b, c);
//             }
//             function i() {
//                 return {
//                     shouldSkipProlongedInactivity: utils.getQueryParameter('skip_inactivity'),
//                     shouldVisualizeClicks: utils.getQueryParameter('visualize_mouse_clicks'),
//                     shouldPauseOnMarker: utils.getQueryParameter('pause_on_marker'),
//                     speed: utils.getQueryParameter('speed'),
//                 };
//             }
//             function j() {
//                 return {
//                     shouldSkipProlongedInactivity: k('shouldSkipProlongedInactivity', true),
//                     shouldVisualizeClicks: k('shouldVisualizeClicks', true),
//                     shouldPauseOnMarker: k('shouldPauseOnMarker', true),
//                     speed: k('speed', 1),
//                 };
//             }
//             function k(type, value) {
//                 return settings.get(type, value);
//             }
//             function l(playerController, c, d) {
//                 utils.forEach(d, function (d, e) {
//                     var f = c[e];
//                     utils.isDefined(f)
//                         ? (playerController.settings.playback[e] = f)
//                         : ((playerController.settings.playback[e] = d),
//                           m(playerController, e, playerController.settings.playback[e]));
//                 });
//             }
//             function m(playerController, c, d) {
//                 var e = 'settings.playback.' + c,
//                     f = 'settings.' + c;
//                 settings.bind(playerController, e, d, f);
//             }
//             function getActivitiesFilterFromUrl() {
//                 var activities = utils.getQueryParameter('activities');
//                 if (utils.isUndefined(activities)) return q;
//                 if (!utils.isString(activities)) return [];
//                 var c = p(activities);
//                 return o(c);
//             }
//             function o(a) {
//                 var e = [];
//                 utils.forEach(a, function (a) {
//                     a === PAGE_LOAD ? e.push(EVENT_TYPE.DOM_SNAPSHOT) : e.push(a);
//                 });

//                 return e;
//             }
//             function p(activities) {
//                 var c = [];
//                 utils.forEach(activities.split(','), function (a) {
//                     c.push(a.trim());
//                 });

//                 return c;
//             }
//             var q = [
//                 EVENT_TYPE.CONSOLE_ERROR,
//                 EVENT_TYPE.MOUSE_CLICK,
//                 EVENT_TYPE.WINDOW_RESIZE,
//                 EVENT_TYPE.DOM_SNAPSHOT,
//                 EVENT_TYPE.VISIBILITY_CHANGE,
//             ];
//             return { init: init, getActivitiesFilterFromUrl: getActivitiesFilterFromUrl };
//         },
//     ]);
