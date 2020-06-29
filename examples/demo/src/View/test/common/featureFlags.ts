import { restSettings } from './restSettings';
import { utils } from './utils';
import { tokenManager } from './tokenManager';

import { $resource } from './resource';
import { angular } from './angular';

//
var i = restSettings.buildUrl('features/:id'),
    j = $resource(i);

function getSessionFeatureFlags(sessionId) {
    var b = h({
        id: sessionId,
    });
    // return promise.execute(j.get, b);

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
    // return promise.execute(j.get, {
    //     id: id,
    // });

    // debug:
    return Promise.resolve({
        isAssureCoWorkaroundEnabled: false,
        isToolkitEnabled: true,
        isControlTakeoverEnabled: true,
        ignoreFormsAutofill: false,
        captureMetadataOnly: true,
    });
}
function h(a) {
    var b = tokenManager.getAccessToken();
    return b && angular.isObject(a)
        ? utils.mergeObjects(a, {
              access_token: b,
          })
        : a;
}

export const featureFlags = {
    getSessionFeatureFlags: getSessionFeatureFlags,
    getWebsiteFeatureFlags: getWebsiteFeatureFlags,
};
