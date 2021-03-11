import { utils, settings } from './common';
import { EVENT_TYPE } from './constant';

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
    var fromUrl = getSettingPlayerFromUrl();
    let fromLocal = getSettingPlayerFromlocalStorage();

    playerController.settings.playback = {};

    l(playerController, fromUrl, fromLocal);
}
function getSettingPlayerFromUrl() {
    return {
        shouldSkipProlongedInactivity: utils.getQueryParameter('skip_inactivity'),
        shouldVisualizeClicks: utils.getQueryParameter('visualize_mouse_clicks'),
        shouldPauseOnMarker: utils.getQueryParameter('pause_on_marker'),
        speed: utils.getQueryParameter('speed'),
    };
}
function getSettingPlayerFromlocalStorage() {
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
/**
 * 合并url&local的配置
 * @param playerController
 * @param queryParameter
 * @param local
 */
function l(playerController, queryParameter, local: object) {
    utils.forEach(local, function (value, key) {
        var params = queryParameter[key];

        if (utils.isDefined(f)) {
            playerController.settings.playback[key] = params;
        } else {
            playerController.settings.playback[key] = value;
            m(playerController, key, playerController.settings.playback[key]);
        }
    });
}
function m(playerController, key: string, value) {
    let e = 'settings.playback.' + key;
    let f = 'settings.' + key;

    settings.bind(playerController, e, value, f);
}
function getActivitiesFilterFromUrl(): any[] {
    const activities: string = utils.getQueryParameter('activities');

    if (utils.isUndefined(activities)) return q;
    if (!utils.isString(activities)) return [];

    var c = getActivitiesFromUrl(activities);

    return o(c);
}
function o(a) {
    var e: any = [];

    utils.forEach(a, function (a) {
        a === PAGE_LOAD ? e.push(EVENT_TYPE.DOM_SNAPSHOT) : e.push(a);
    });

    return e;
}
function getActivitiesFromUrl(activities: string): any[] {
    var c: any = [];

    utils.forEach(activities.split(','), function (a) {
        c.push(a.trim());
    });

    return c;
}

export const playerSettings = { init: init, getActivitiesFilterFromUrl: getActivitiesFilterFromUrl };
