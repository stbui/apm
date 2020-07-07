import { LOG_LEVEL } from './constant';

function log(a, b?) {}

function warn(a, c) {
    c = c || {};
    c.level = LOG_LEVEL.WARN;
    log(a, c);
}
function identify(a) {}

export const sessionstackManager = {
    log: log,
    identify: identify,
    warn: warn,
};
