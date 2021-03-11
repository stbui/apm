import { $window } from './resource';
import { FRONTEND_URL } from './constant';

const URL_PROTOCOL = {
    HTTP: 'http://',
    HTTPS: 'https://',
};

function e() {
    return FRONTEND_URL + 'player';
}
function openSessionInNewWindow(sessionId, forceHttp, source) {
    let url = i({
        sessionId: sessionId,
        forceHttp: forceHttp,
    });
    url += stringify({
        source: source,
    });
    $window.open(url);
}
function openLiveSessionInNewWindow(sessionId, forceHttp) {
    let url = i({
        sessionId: sessionId,
        forceHttp: forceHttp,
    });

    url += stringify({
        play_live: true,
        source: 'online_users_dashboard',
    });

    $window.open(url);
}
function openLogInNewWindow(sessionId, logId, forceHttp) {
    let url = log(sessionId, logId, forceHttp);
    url += stringify({
        source: 'events_and_errors_dashboard',
    });
    $window.open(url);
}
function i(a: { sessionId: string | number; forceHttp: string }) {
    let url = e() + '/#/sessions/' + a.sessionId;

    if (a.forceHttp && url.startsWith(URL_PROTOCOL.HTTPS)) {
        url = url.replace(URL_PROTOCOL.HTTPS, URL_PROTOCOL.HTTP);
    }

    return url;
}
function stringify(a) {
    let b = '';
    let c = 0;

    for (var d in a) (b += 0 === c ? '?' : '&'), (b += d + '=' + a[d]), c++;

    return b;
}
function log(sessionId, logId, forceHttp) {
    var url = i({
        sessionId: sessionId,
        forceHttp: forceHttp,
    });

    url += '/logs/' + logId;

    return url;
}

export const navigation = {
    openSessionInNewWindow: openSessionInNewWindow,
    openLiveSessionInNewWindow: openLiveSessionInNewWindow,
    openLogInNewWindow: openLogInNewWindow,
};
