const localStorageService: any = {};

function b(b, c) {
    var d = localStorageService.get(b);
    return null === d || void 0 === d ? c : d;
}
function c(b, c) {
    return localStorageService.set(b, c);
}
function d(b) {
    return localStorageService.remove(b);
}
function e(b, c, d, e) {
    return localStorageService.bind(b, c, d, e);
}

export const settings = {
    get: b,
    set: c,
    remove: d,
    bind: e,
};
