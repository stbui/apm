import { restSettings } from './restSettings';
import { tokenManager } from './tokenManager';
import { $resource, promise } from './resource';

//
const $q: any = {};
const $http: any = {};
const $rootScope: any = {};

//

var I = null,
    J = 'loggedIn',
    K = 'loggedOut',
    L = restSettings.buildUrl('login'),
    M = restSettings.buildUrl('auth_method/:organization'),
    N = $resource(M),
    O = restSettings.buildUrl('auth_settings/:organization'),
    P = $resource(O),
    Q = restSettings.buildUrl('me'),
    R = $resource(Q, null, {
        update: {
            method: 'PUT',
        },
    }),
    S = restSettings.buildUrl('password_reset/:token'),
    T = $resource(S, null, {
        update: {
            method: 'PUT',
        },
    }),
    U = restSettings.buildUrl('accept_invitation/:token'),
    V = $resource(U),
    W = restSettings.buildUrl('register/trial'),
    X = $resource(W),
    Y = restSettings.buildUrl('register/validation/user'),
    Z = $resource(Y),
    $ = restSettings.buildUrl('register/validation/email'),
    _ = $resource($),
    aa = restSettings.buildUrl('organization_url'),
    ba = $resource(aa);

function login(c, d) {
    var e = $q.defer(),
        g = tokenManager.generateBasicToken(c + ':' + d),
        h = {
            headers: {
                Authorization: g,
            },
        };
    return (
        $http
            .get(L, h)
            .success(function (a, b, c, d) {
                z(a), e.resolve(a);
            })
            .error(function (a, b, c, d) {
                j(),
                    e.reject({
                        data: a,
                        status: b,
                    });
            }),
        e.promise
    );
}
function i(a) {
    return promise.execute(N.get, {
        organization: a,
    });
}
function j() {
    (I = null), tokenManager.clearAuthToken(), t();
}
function k() {
    var b = $q.defer();
    return (
        I
            ? b.resolve(I)
            : r()
            ? promise.execute(R.get).then(
                  function (a) {
                      l(a),
                          s(a, {
                              hasLoggedFromLogin: !1,
                          }),
                          b.resolve(a);
                  },
                  function (a) {
                      b.reject(a), 403 === a.status && j();
                  }
              )
            : b.reject(),
        b.promise
    );
}
function l(a) {
    I = a;
}
function m() {
    I = null;
}
function getCurrentUser() {
    return I;
}
function o() {
    return !!I;
}
function p() {
    return tokenManager.getAuthToken();
}
function q() {
    return tokenManager.getAccessToken();
}
function r() {
    return tokenManager.hasAuthToken();
}
function s(a, b) {
    $rootScope.$broadcast(J, a, b);
}
function t(a?) {
    $rootScope.$broadcast(K, a);
}
function u(a) {
    $rootScope.$on(J, a);
}
function v(a) {
    $rootScope.$on(K, a);
}
function w(a) {
    return promise.execute(T.save, {
        email: a,
    });
}
function x(a) {
    return promise.execute(T.get, {
        token: a,
    });
}
function y(a, b, c) {
    return promise.execute(
        T.update,
        {
            token: a,
        },
        {
            newPassword: b,
            passwordConfirmation: c,
        }
    );
}
function z(a) {
    tokenManager.setAuthToken(a.token),
        l(a),
        s(a, {
            hasLoggedFromLogin: !0,
        });
}
function A(a, b) {
    return promise.execute(
        V.save,
        {
            token: b,
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
function B(a, b, c) {
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
        referrer: b,
        redeem: c,
        organizationUrl: a.organizationUrl,
    });
}
function C(a, b, c, d) {
    return promise.execute(R.update, {
        email: a,
        firstName: b,
        lastName: c,
        organizationName: d,
    });
}
function D(a) {
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
function E(a) {
    return promise.execute(_.save, {
        email: a.email,
    });
}
function F(a) {
    return promise.execute(P.get, {
        organization: a,
    });
}
function G(a, b) {
    return promise.execute(
        P.save,
        {
            organization: a,
        },
        {
            authMethod: b.authMethod,
            entityId: b.entityId,
            ssoURL: b.ssoURL,
            certificateFingerprint: b.certificateFingerprint,
        }
    );
}
function H(a) {
    return promise.execute(ba.save, {
        organizationUrl: a,
    });
}

export const auth = {
    login: login,
    getAuthMethod: i,
    logout: j,
    isCurrentUserLoaded: o,
    isLoggedIn: o,
    loadCurrentUser: k,
    getCurrentUser: getCurrentUser,
    clearCurrentUser: m,
    getAuthToken: p,
    hasAuthToken: r,
    getAccessToken: q,
    onLoggedIn: u,
    onLoggedOut: v,
    resetPassword: w,
    getPasswordResetEmail: x,
    setNewPassword: y,
    updateProfile: C,
    onAuthenticate: z,
    acceptInvitation: A,
    register: B,
    validateUser: D,
    validateEmail: E,
    getAuthSettings: F,
    saveAuthSettings: G,
    setUserOrganizationUrl: H,
};
