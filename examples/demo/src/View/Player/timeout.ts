var timeoutId;

export function timeout(fn, delay?) {
    timeoutId = setTimeout(fn, delay);
}

timeout.cancel = function() {
    clearTimeout(timeoutId);
    timeoutId = null;

    return timeout;
};
