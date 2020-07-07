const EVENTS = {
    REACHED_50_PERCENT: '50%-daily-sessions-reached',
    REACHED_90_PERCENT: '90%-daily-sessions-reached',
};

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

function boot() {}
function trackEvent(a) {}
function update(a) {}
function shutDown() {}

function showNewMessage(a) {}

export const intercomManager = {
    boot: boot,
    update: update,
    shutDown: shutDown,
    trackEvent: trackEvent,
    showNewMessage: showNewMessage,
    EVENTS: EVENTS,
};
