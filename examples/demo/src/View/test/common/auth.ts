import { restSettings } from './restSettings';
import { tokenManager } from './tokenManager';

//
// const $q: any = {};
// const $http: any = {};
const $rootScope: any = {};

// CurrentUser
let I = null;
const loggedIn = 'loggedIn';
const loggedOut = 'loggedOut';

function login(username: string, password: string) {
    const loginUrl = restSettings.buildUrl('login');

    const Authorization = tokenManager.generateBasicToken(username + ':' + password);
    const headers = {
        headers: {
            Authorization: Authorization,
        },
    };

    return fetch(loginUrl, headers)
        .then(res => res.json())
        .then(res => {
            onAuthenticate(res);
            return res;
        })
        .catch(error => {
            logout();
            return {
                data: error,
                status: error,
            };
        });
}
function getAuthMethod(organization) {
    const url = restSettings.buildUrl('auth_method/' + organization);
    return fetch(url).then(res => res.json());
}
function logout() {
    I = null;
    tokenManager.clearAuthToken();
    t();
}
function loadCurrentUser() {
    return new Promise((resolve, reject) => {
        if (I) {
            resolve(I);
        } else {
            if (hasAuthToken()) {
                let loadCurrentUserUrl = restSettings.buildUrl('me');

                fetch(loadCurrentUserUrl)
                    .then(res => res.json())
                    .then(res => {
                        // res => user => "stbui"
                        l(res);
                        s(res, {
                            hasLoggedFromLogin: false,
                        });
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);

                        if (403 === err.status) {
                            logout();
                        }
                    });
            } else {
                reject();
            }
        }
    });
}
function l(user) {
    I = user;
}
function clearCurrentUser() {
    I = null;
}
function getCurrentUser() {
    return I;
}
function isLoggedIn() {
    return !!I;
}
function getAuthToken() {
    return tokenManager.getAuthToken();
}
function getAccessToken() {
    return tokenManager.getAccessToken();
}
function hasAuthToken() {
    return tokenManager.hasAuthToken();
}
function s(a, b) {
    $rootScope.$broadcast(loggedIn, a, b);
}
function t(a?) {
    $rootScope.$broadcast(loggedOut, a);
}
function onLoggedIn(a) {
    $rootScope.$on(loggedIn, a);
}
function onLoggedOut(a) {
    $rootScope.$on(loggedOut, a);
}
function resetPassword(email: string) {
    const url = restSettings.buildUrl('password_reset/' + email);

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
        }),
    }).then(res => res.json());
}
function getPasswordResetEmail(token: string) {
    const url = restSettings.buildUrl('password_reset/' + token);

    return fetch(url).then(res => res.json());
}
function setNewPassword(token: string, newPassword: string, passwordConfirmation: string) {
    const url = restSettings.buildUrl('password_reset/' + token);

    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            newPassword: newPassword,
            passwordConfirmation: passwordConfirmation,
        }),
    }).then(res => res.json());
}
function onAuthenticate(data) {
    tokenManager.setAuthToken(data.token);
    l(data);
    s(data, {
        hasLoggedFromLogin: true,
    });
}
function acceptInvitation(a, token: string) {
    const url = restSettings.buildUrl('accept_invitation/' + token);
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            email: a.email,
            password: a.password,
            firstName: a.firstName,
            lastName: a.lastName,
            organizationName: a.organizationName,
        }),
    }).then(res => res.json());
}
function register(a, referrer, redeem) {
    const url = restSettings.buildUrl('register/trial');
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            email: a.email,
            password: a.password,
            firstName: a.firstName,
            lastName: a.lastName,
            phoneNumber: a.phoneNumber,
            organizationName: a.organizationName,
            organizationRole: a.organizationRole,
            supportTeamSize: a.supportTeamSize,
            requestedDemo: a.requestedDemo,
            referrer: referrer,
            redeem: redeem,
            organizationUrl: a.organizationUrl,
        }),
    }).then(res => res.json());
}
function updateProfile(email, firstName, lastName, organizationName) {
    const url = '';
    return fetch(url, {
        method: 'PUT',

        body: JSON.stringify({
            email: email,
            firstName: firstName,
            lastName: lastName,
            organizationName: organizationName,
        }),
    }).then(res => res.json());
}
function validateUser(a) {
    const url = restSettings.buildUrl('register/validation/user');
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            email: a.email,
            firstName: a.firstName,
            lastName: a.lastName,
            password: a.password,
            phoneNumber: a.phoneNumber,
            organizationRole: a.organizationRole,
            organizationName: a.organizationName,
            supportTeamSize: a.supportTeamSize,
        }),
    }).then(res => res.json());
}
function validateEmail(data) {
    const url = restSettings.buildUrl('register/validation/email');
    return fetch(url, { method: 'POST', body: JSON.stringify({ email: data.email }) }).then(res => res.json());
}
function getAuthSettings(organization) {
    const url = restSettings.buildUrl('auth_settings/' + organization);
    return fetch(url).then(res => res.json());
}
function saveAuthSettings(organization, b) {
    const url = restSettings.buildUrl('auth_settings/' + organization);
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            authMethod: b.authMethod,
            entityId: b.entityId,
            ssoURL: b.ssoURL,
            certificateFingerprint: b.certificateFingerprint,
        }),
    }).then(res => res.json());
}
function setUserOrganizationUrl(organizationUrl) {
    const url = restSettings.buildUrl('organization_url');
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            organizationUrl: organizationUrl,
        }),
    }).then(res => res.json());
}

export const auth = {
    login: login,
    getAuthMethod: getAuthMethod,
    logout: logout,
    isCurrentUserLoaded: isLoggedIn,
    isLoggedIn: isLoggedIn,
    loadCurrentUser: loadCurrentUser,
    getCurrentUser: getCurrentUser,
    clearCurrentUser: clearCurrentUser,
    getAuthToken: getAuthToken,
    hasAuthToken: hasAuthToken,
    getAccessToken: getAccessToken,
    onLoggedIn: onLoggedIn,
    onLoggedOut: onLoggedOut,
    resetPassword: resetPassword,
    getPasswordResetEmail: getPasswordResetEmail,
    setNewPassword: setNewPassword,
    updateProfile: updateProfile,
    onAuthenticate: onAuthenticate,
    acceptInvitation: acceptInvitation,
    register: register,
    validateUser: validateUser,
    validateEmail: validateEmail,
    getAuthSettings: getAuthSettings,
    saveAuthSettings: saveAuthSettings,
    setUserOrganizationUrl: setUserOrganizationUrl,
};
