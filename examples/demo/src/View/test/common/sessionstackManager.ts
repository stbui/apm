import { utils } from './utils';

const MILLISECONDS_IN_A_SECOND = 1e3;
const LOG_LEVEL = {
    INFO: 'info',
    DEBUG: 'debug',
    WARN: 'warn',
    ERROR: 'error',
};

var g = utils.isFunction(window.sessionstack);

function d(a, b) {
    g && window.sessionstack('log', a, b);
}
function e(a, c) {
    (c = c || {}), (c.level = LOG_LEVEL.WARN), d(a, c);
}
function f(a) {
    if (g && a) {
        var b = a.firstName + ' ' + a.lastName,
            d = new Date(a.created * MILLISECONDS_IN_A_SECOND).toString();
        window.sessionstack('identify', {
            userId: a.id,
            displayName: b,
            email: a.email,
            createdAt: d,
            hasActivePlan: a.hasActivePlan,
            role: a.role,
            isVerified: a.isVerified,
        });
    }
}

export const sessionstackManager = {
    log: d,
    identify: f,
    warn: e,
};
