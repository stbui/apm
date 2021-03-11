import { restSettings } from './restSettings';
import { tokenManager } from './tokenManager';
import { $resource, promise } from './resource';

//
// const $q: any = {};
// const $http: any = {};
const $rootScope: any = {};

//

// CurrentUser
let I = null;

let J = 'loggedIn';
let K = 'loggedOut';
let loginUrl = restSettings.buildUrl('login');
let M = restSettings.buildUrl('auth_method/:organization');
let N = $resource(M);
let O = restSettings.buildUrl('auth_settings/:organization');
let P = $resource(O);
let loadCurrentUserUrl = restSettings.buildUrl('me');

let S = restSettings.buildUrl('password_reset/:token');
let T = $resource(S, null, {
    update: {
        method: 'PUT',
    },
});
let U = restSettings.buildUrl('accept_invitation/:token');
let V = $resource(U);
let W = restSettings.buildUrl('register/trial');
let X = $resource(W);
let Y = restSettings.buildUrl('register/validation/user');
let Z = $resource(Y);
let validateEmailUrl = restSettings.buildUrl('register/validation/email');
let aa = restSettings.buildUrl('organization_url');
let ba = $resource(aa);

function login(username: string, password: string) {
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
    return promise.execute(N.get, {
        organization: organization,
    });
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
    $rootScope.$broadcast(J, a, b);
}
function t(a?) {
    $rootScope.$broadcast(K, a);
}
function onLoggedIn(a) {
    $rootScope.$on(J, a);
}
function onLoggedOut(a) {
    $rootScope.$on(K, a);
}
function resetPassword(email) {
    return promise.execute(T.save, {
        email: email,
    });
}
function getPasswordResetEmail(token) {
    return promise.execute(T.get, {
        token: token,
    });
}
function setNewPassword(token, newPassword, passwordConfirmation) {
    return fetch('T.update', {
        method: 'PUT',
        headers: {
            token: token,
        },
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
function acceptInvitation(a, token) {
    return promise.execute(
        V.save,
        {
            token: token,
        },
        {
            email: a.email,
            password: a.password,
            firstName: a.firstName,
            lastName: a.lastName,
            organizationName: a.organizationName,
        }
    );
}
function register(a, referrer, redeem) {
    return promise.execute(X.save, {
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
    });
}
function updateProfile(email, firstName, lastName, organizationName) {
    return fetch('R.update', {
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
    return promise.execute(Z.save, {
        email: a.email,
        firstName: a.firstName,
        lastName: a.lastName,
        password: a.password,
        phoneNumber: a.phoneNumber,
        organizationRole: a.organizationRole,
        organizationName: a.organizationName,
        supportTeamSize: a.supportTeamSize,
    });
}
function validateEmail(data) {
    return fetch(validateEmailUrl, { method: 'POST', body: JSON.stringify({ email: data.email }) }).then(res =>
        res.json()
    );
}
function getAuthSettings(organization) {
    return promise.execute(P.get, {
        organization: organization,
    });
}
function saveAuthSettings(organization, b) {
    return fetch('P.save', {
        method: 'POST',
        headers: {
            organization: organization,
        },
        body: JSON.stringify({
            authMethod: b.authMethod,
            entityId: b.entityId,
            ssoURL: b.ssoURL,
            certificateFingerprint: b.certificateFingerprint,
        }),
    }).then(res => res.json());
}
function setUserOrganizationUrl(organizationUrl) {
    return promise.execute(ba.save, {
        organizationUrl: organizationUrl,
    });
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
