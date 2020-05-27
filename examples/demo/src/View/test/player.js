angular.module('playerApp').factory('player', function() {
    function a(a, b) {
        a.$broadcast(T, b);
    }
    function b(a, b) {
        a.$on(T, b);
    }
    function c(a, b) {
        a.$broadcast(S, b);
    }
    function d(a, b) {
        a.$on(S, b);
    }
    function e(a, b) {
        a.$broadcast(U, b);
    }
    function f(a, b) {
        a.$on(U, b);
    }
    function g(a, b) {
        a.$broadcast(V, b);
    }
    function h(a, b) {
        a.$on(V, b);
    }
    function i(a) {
        a.$broadcast(X);
    }
    function j(a, b) {
        a.$on(X, b);
    }
    function k(a) {
        a.$broadcast(W);
    }
    function l(a, b) {
        a.$on(W, b);
    }
    function m(a, b) {
        a.$broadcast(Y, b);
    }
    function n(a, b) {
        a.$on(Y, b);
    }
    function o(a) {
        a.$broadcast(Z);
    }
    function p(a, b) {
        a.$on(Z, b);
    }
    function q(a) {
        a.$broadcast($);
    }
    function r(a, b) {
        a.$on($, b);
    }
    function s(a) {
        a.$broadcast(_);
    }
    function t(a, b) {
        a.$on(_, b);
    }
    function u(a) {
        a.$broadcast(ca);
    }
    function v(a, b) {
        a.$on(ca, b);
    }
    function w(a) {
        a.$broadcast(da);
    }
    function x(a, b) {
        a.$on(da, b);
    }
    function y(a, b) {
        a.$emit(aa, b);
    }
    function z(a, b) {
        a.$on(aa, b);
    }
    function A(a) {
        a.$emit(ba);
    }
    function B(a, b) {
        a.$on(ba, b);
    }
    function C(a) {
        a.$emit(ea);
    }
    function D(a, b) {
        a.$on(ea, b);
    }
    function E(a) {
        a.$broadcast(fa);
    }
    function F(a, b) {
        a.$on(fa, b);
    }
    function G(a) {
        a.$broadcast(ga);
    }
    function H(a, b) {
        a.$on(ga, b);
    }
    function I(a, b) {
        a.$emit(ha, b);
    }
    function J(a, b) {
        a.$on(ha, b);
    }
    function K(a, b) {
        a.$emit(ia, b);
    }
    function L(a, b) {
        a.$on(ia, b);
    }
    function M(a, b) {
        a.$emit(ja, b);
    }
    function N(a, b) {
        a.$on(ja, b);
    }
    function O(a, b) {
        a.$emit(ka, b);
    }
    function P(a, b) {
        a.$on(ka, b);
    }
    function Q(a, b) {
        a.$emit(la, b);
    }
    function R(a, b) {
        a.$on(la, b);
    }
    var S = 'execute',
        T = 'clear',
        U = 'playerSpeedChange',
        V = 'visualizeClicks',
        W = 'playerStopped',
        X = 'playerStarted',
        Y = 'attach',
        Z = 'detach',
        $ = 'showOverlay',
        _ = 'hideOverlay',
        aa = 'startLiveStreaming',
        ba = 'stopLiveSteaming',
        ca = 'showBuffering',
        da = 'hideBuffering',
        ea = 'playerIsInitialized',
        fa = 'hideStepsBuffering',
        ga = 'hideHiddenTabOverlay',
        ha = 'userDetailsResize',
        ia = 'consoleResize',
        ja = 'openConsole',
        ka = 'userPermissionRequestSend',
        la = 'userPermissionRequestCanceled';
    return {
        fireExecuteEvent: c,
        onExecuteEvent: d,
        fireClear: a,
        onClear: b,
        firePlayerSpeedChange: e,
        onPlayerSpeedChange: f,
        fireVisualizeClicks: g,
        onVisualizeClicks: h,
        firePlayerStarted: i,
        onPlayerStarted: j,
        firePlayerStopped: k,
        onPlayerStopped: l,
        fireAttach: m,
        onAttach: n,
        fireDetach: o,
        onDetach: p,
        fireShowViewerOverlay: q,
        onShowViewerOverlay: r,
        fireHideViewerOverlay: s,
        onHideViewerOverlay: t,
        fireStartLiveStreaming: y,
        onStartLiveStreaming: z,
        fireStopLiveStreaming: A,
        onStopLiveStreaming: B,
        fireShowBuffering: u,
        onShowBuffering: v,
        fireHideBuffering: w,
        onHideBuffering: x,
        firePlayerIsInitialized: C,
        onPlayerIsInitialized: D,
        fireHideStepsBuffering: E,
        onHideStepsBuffering: F,
        fireHideHiddenTabOverlay: G,
        onHideHiddenTabOverlay: H,
        fireUserDetailsResize: I,
        onUserDetailsResize: J,
        fireConsoleResize: K,
        onConsoleResize: L,
        fireOpenConsole: M,
        onOpenConsole: N,
        fireUserPermissionRequestSend: O,
        onUserPermissionRequestSend: P,
        fireUserPermissionRequestCanceled: Q,
        onUserPermissionRequestCanceled: R,
    };
});
