import { utils } from './utils';

const APP_ID = 'h9g5kdue';

var i = {
        REACHED_50_PERCENT: '50%-daily-sessions-reached',
        REACHED_90_PERCENT: '90%-daily-sessions-reached',
    },
    j = utils.isFunction(window.Intercom);

function c() {}
function d(a) {
    j && window.Intercom('trackEvent', a);
}
function e(a) {
    if (j)
        if (a) {
            var b = g(a);
            window.Intercom('update', b);
        } else window.Intercom('update');
}
function f() {
    j && window.Intercom('shutdown');
}
function g(a) {
    return {
        name: a.firstName + ' ' + a.lastName,
        email: a.email,
        created_at: a.created,
        verification_token: a.verificationToken,
        special_offer: a.specialOffer,
        is_trial: a.isTrial,
        organization_role: a.organizationRole,
    };
}
function h(a) {
    j && window.Intercom('showNewMessage', a);
}

export const intercomManager = {
    boot: c,
    update: e,
    shutDown: f,
    trackEvent: d,
    showNewMessage: h,
    EVENTS: i,
};
