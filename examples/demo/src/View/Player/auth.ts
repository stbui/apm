import { tokenManager } from './tokenManager';

export const SERVER_URL = 'http://127.0.0.1:3000/api/';

export function restSettings() {
    function buildUrl(path) {
        return SERVER_URL + path;
    }
    function formatUrl(a, b, c) {
        var d = '{' + b + '}';
        return a.replace(d, c);
    }
    return {
        buildUrl,
        formatUrl,
    };
}

export function auth() {
    const D = null;
    const loggedIn = 'loggedIn';
    const loggedOut = 'loggedOut';
    const loginUrl = restSettings().buildUrl('login');
    const meUrl = restSettings().buildUrl('me');

    // todo

    const passwordReset = restSettings().buildUrl('password_reset/:token');
    const acceptInvitation = restSettings().buildUrl('accept_invitation/:token');
    const registerTrial = restSettings().buildUrl('register/trial');
    const registerValidation = restSettings().buildUrl('register/validation');

    function login(username, password) {
        const headers = { Authorization: tokenManager.generateBasicToken(username + ':' + password) };

        return fetch(loginUrl, { headers }).then(res => {
            return res;
        });
    }

    function logout() {
        D = null;
        tokenManager.clearAuthToken();
        // loggedOut
    }

    function loadCurrentUser() {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }

    return {
        login,
        logout,
        isCurrentUserLoaded: () => {},
        isLoggedIn: () => {},
        loadCurrentUser,
        getCurrentUser: () => {},
        clearCurrentUser: () => {},
        getAuthToken: () => {},
        hasAuthToken: () => {},
        getAccessToken: () => {},
        onLoggedIn: () => {},
        onLoggedOut: () => {},
        resetPassword: () => {},
        getPasswordResetEmail: () => {},
        setNewPassword: () => {},
        updateProfile: () => {},
        onAuthenticate: () => {},
        acceptInvitation: () => {},
        register: () => {},
        validateUser: () => {},
    };
}
