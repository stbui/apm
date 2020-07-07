let timeoutId;

export function timeout(fn, delay?) {
    timeoutId = setTimeout(fn, delay);

    return timeoutId;
}

timeout.cancel = function() {
    clearTimeout(timeoutId);
    timeoutId = null;

    return timeout;
};
