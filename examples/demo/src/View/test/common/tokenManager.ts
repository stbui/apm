import { utils } from './utils';
import { BUILD_ENV } from './constant';
import { $location, $base64, $cookies } from './resource';

//
var o,
    accessToken,
    q = 'authToken';

function f(a) {
    var now = new Date(),
        d = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

    $cookies.put(q, a, {
        expires: d,
    });
}
function g() {
    var a = $location.search().auth_token;

    if (a) {
        $cookies.put(q, a, {
            path: '/',
        });
    } else {
        a = $cookies.get(q);
    }

    return a;
}
function h() {
    accessToken = $location.search().access_token;
    return accessToken;
}
function setAuthToken(a) {
    clearAuthToken();
    o = a;
    f(a);
}
function getAuthToken() {
    return o ? o : g();
}
function getAccessToken() {
    return accessToken ? accessToken : h();
}
function hasAuthToken() {
    const authToken = getAuthToken();
    return !!authToken;
}
function clearAuthToken() {
    o = null;
    $cookies.remove(q);
    !BUILD_ENV.IS_DEV && BUILD_ENV.IS_SAAS && utils.removeCookieByName(q);
}
function generateBasicToken(b) {
    var auth = $base64.encode(b);
    return 'Basic ' + auth;
}

export const tokenManager = {
    setAuthToken: setAuthToken,
    getAuthToken: getAuthToken,
    getAccessToken: getAccessToken,
    hasAuthToken: hasAuthToken,
    clearAuthToken: clearAuthToken,
    generateBasicToken: generateBasicToken,
};
