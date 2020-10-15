/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

export class PluginInstanceLoader {
    loadInstance(pluginType, plugins) {
        const currentFetchedInstance = plugins.get(pluginType);

        if (currentFetchedInstance.isResolved) return;

        const argsInstances = null;

        currentFetchedInstance.instance = Object.assign(currentFetchedInstance.instance, new pluginType(argsInstances));
        currentFetchedInstance.isResolved = true;

        if (currentFetchedInstance.instance.onInit) {
            currentFetchedInstance.instance.onInit();
        }
    }
}
