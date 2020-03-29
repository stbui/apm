angular.module('playerApp').factory('player', function() {
    function a(a, b) {
        a.$broadcast(P, b);
    }
    function b(a, b) {
        a.$on(P, b);
    }
    function c(a, b) {
        a.$broadcast(O, b);
    }
    function d(a, b) {
        a.$on(O, b);
    }
    function e(a, b) {
        a.$broadcast(Q, b);
    }
    function f(a, b) {
        a.$on(Q, b);
    }
    function g(a, b) {
        a.$broadcast(R, b);
    }
    function h(a, b) {
        a.$on(R, b);
    }
    function i(a) {
        a.$broadcast(T);
    }
    function j(a, b) {
        a.$on(T, b);
    }
    function k(a) {
        a.$broadcast(S);
    }
    function l(a, b) {
        a.$on(S, b);
    }
    function m(a, b) {
        a.$broadcast(U, b);
    }
    function n(a, b) {
        a.$on(U, b);
    }
    function o(a) {
        a.$broadcast(V);
    }
    function p(a, b) {
        a.$on(V, b);
    }
    function q(a) {
        a.$broadcast(W);
    }
    function r(a, b) {
        a.$on(W, b);
    }
    function s(a) {
        a.$broadcast(X);
    }
    function t(a, b) {
        a.$on(X, b);
    }
    function u(a) {
        a.$broadcast($);
    }
    function v(a, b) {
        a.$on($, b);
    }
    function w(a) {
        a.$broadcast(_);
    }
    function x(a, b) {
        a.$on(_, b);
    }
    function y(a) {
        a.$emit(Y);
    }
    function z(a, b) {
        a.$on(Y, b);
    }
    function A(a) {
        a.$emit(Z);
    }
    function B(a, b) {
        a.$on(Z, b);
    }
    function C(a) {
        a.$emit(aa);
    }
    function D(a, b) {
        a.$on(aa, b);
    }
    function E(a) {
        a.$broadcast(ba);
    }
    function F(a, b) {
        a.$on(ba, b);
    }
    function G(a) {
        a.$broadcast(ca);
    }
    function H(a, b) {
        a.$on(ca, b);
    }
    function I(a, b) {
        a.$emit(da, b);
    }
    function J(a, b) {
        a.$on(da, b);
    }
    function K(a, b) {
        a.$emit(ea, b);
    }
    function L(a, b) {
        a.$on(ea, b);
    }
    function M(a, b) {
        a.$emit(fa, b);
    }
    function N(a, b) {
        a.$on(fa, b);
    }
    var O = 'execute',
        P = 'clear',
        Q = 'playerSpeedChange',
        R = 'visualizeClicks',
        S = 'playerStopped',
        T = 'playerStarted',
        U = 'attach',
        V = 'detach',
        W = 'showOverlay',
        X = 'hideOverlay',
        Y = 'startLiveStreaming',
        Z = 'stopLiveSteaming',
        $ = 'showBuffering',
        _ = 'hideBuffering',
        aa = 'playerIsInitialized',
        ba = 'hideStepsBuffering',
        ca = 'hideHiddenTabOverlay',
        da = 'userDetailsResize',
        ea = 'consoleResize',
        fa = 'openConsole';
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
    };
});
