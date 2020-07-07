import { restSettings } from './restSettings';
import { utils } from './utils';
import { tokenManager } from './tokenManager';
import { angular } from './angular';

function getSessionFeatureFlags(sessionId) {
    // const url = restSettings.buildUrl(`sessions/${sessionId}`);
    // return fetch(url).then(res => res.json());

    // debug:
    return Promise.resolve({
        isAssureCoWorkaroundEnabled: false,
        isToolkitEnabled: true,
        isControlTakeoverEnabled: true,
        ignoreFormsAutofill: false,
        captureMetadataOnly: true,
    });
}
function getWebsiteFeatureFlags(id) {
    // const url = restSettings.buildUrl(`sessions/${id}`);
    // return fetch(url).then(res => res.json());

    // debug:
    return Promise.resolve({
        isAssureCoWorkaroundEnabled: false,
        isToolkitEnabled: true,
        isControlTakeoverEnabled: true,
        ignoreFormsAutofill: false,
        captureMetadataOnly: true,
    });
}
function h(obj) {
    const token = tokenManager.getAccessToken();

    return token && angular.isObject(obj)
        ? utils.mergeObjects(obj, {
              access_token: token,
          })
        : obj;
}

export const featureFlags = {
    getSessionFeatureFlags: getSessionFeatureFlags,
    getWebsiteFeatureFlags: getWebsiteFeatureFlags,
};
