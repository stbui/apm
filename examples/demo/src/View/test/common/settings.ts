const localStorageService = {
    prefix: 'ls',
    storageType: 'localStorage',
    cookie: { expiry: 30, path: '/' },
    get: name => {
        return 0;
    },
    set: (name, value) => {},
    remove: name => {},
    bind: (b, c, d, e) => {},
};

function get(name, value) {
    // var d = localStorageService.get(name);
    // return null === d || void 0 === d ? value : d;

    const currentValue = localStorageService.get(name);

    if (currentValue === null) return;

    return currentValue === 0 ? value : currentValue;
}
function set(name, value) {
    return localStorageService.set(name, value);
}
function remove(name) {
    return localStorageService.remove(name);
}
function bind(b, c, d, e) {
    return localStorageService.bind(b, c, d, e);
}

export const settings = {
    get: get,
    set: set,
    remove: remove,
    bind: bind,
};
