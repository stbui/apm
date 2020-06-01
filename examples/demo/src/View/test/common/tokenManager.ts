import { utils } from './utils';
import { BUILD_ENV } from './constant';

// todo:
const lodash: any = {};
const $location: any = window.location;
const $document = [document];
const $window = window;

export const $base64: any = {};
export const $cookies: any = {};

//
var o,
    p,
    q = 'authToken';

function f(a) {
    var c = new Date(),
        d = new Date(c.getFullYear() + 1, c.getMonth(), c.getDate());
    $cookies.put(q, a, {
        expires: d,
    });
}
function g() {
    var a = $location.search().auth_token;
    return (
        a
            ? $cookies.put(q, a, {
                  path: '/',
              })
            : (a = $cookies.get(q)),
        a
    );
}
function h() {
    return (p = $location.search().access_token);
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
    return p ? p : h();
}
function hasAuthToken() {
    var a = getAuthToken();
    return !!a;
}
function clearAuthToken() {
    o = null;
    $cookies.remove(q);
    !BUILD_ENV.IS_DEV && BUILD_ENV.IS_SAAS && utils.removeCookieByName(q);
}
function generateBasicToken(b) {
    var c = $base64.encode(b);
    return 'Basic ' + c;
}

export const tokenManager = {
    setAuthToken: setAuthToken,
    getAuthToken: getAuthToken,
    getAccessToken: getAccessToken,
    hasAuthToken: hasAuthToken,
    clearAuthToken: clearAuthToken,
    generateBasicToken: generateBasicToken,
};
