import { utils } from './utils';
import { BUILD_ENV } from './constant';
import { $location, $base64, $cookies } from './resource';

//
let TOKEN;
let accessToken;
let cookiesKey = 'authToken';

function _setAuthToken(token) {
    const now = new Date();
    const expires = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

    $cookies.put(cookiesKey, token, {
        expires: expires,
    });
}
function _getAuthToken() {
    let authToken = $location.search().auth_token;

    if (authToken) {
        $cookies.put(cookiesKey, authToken, {
            path: '/',
        });
    } else {
        authToken = $cookies.get(cookiesKey);
    }

    return authToken;
}
function _getAccessToken() {
    accessToken = $location.search().access_token;
    return accessToken;
}
function setAuthToken(token: string) {
    clearAuthToken();
    TOKEN = token;
    _setAuthToken(token);
}
function getAuthToken() {
    return TOKEN ? TOKEN : _getAuthToken();
}
function getAccessToken() {
    return accessToken ? accessToken : _getAccessToken();
}
function hasAuthToken() {
    const authToken = getAuthToken();
    return !!authToken;
}
function clearAuthToken() {
    TOKEN = null;
    $cookies.remove(cookiesKey);
    !BUILD_ENV.IS_DEV && BUILD_ENV.IS_SAAS && utils.removeCookieByName(cookiesKey);
}
function generateBasicToken(b) {
    const auth = $base64.encode(b);
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
