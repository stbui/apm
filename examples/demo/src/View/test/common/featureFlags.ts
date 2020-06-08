import { restSettings } from './restSettings';
import { utils } from './utils';
import { tokenManager } from './tokenManager';
import { $resource } from './resource';

//
//
const promise: any = {};

//
var i = restSettings.buildUrl('features/:id'),
    j = $resource(i);

function getSessionFeatureFlags(sessionId) {
    var b = h({
        id: sessionId,
    });
    return promise.execute(j.get, b);
}
function getWebsiteFeatureFlags(id) {
    return promise.execute(j.get, {
        id: id,
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
