/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

export class PluginContainer {
    private readonly plugins = new Map<string, any>();

    public addPlugin(plugin) {
        if (!this.plugins.has(plugin)) {
            this.plugins.set(plugin, {
                instance: null,
                isResolved: false,
            });
        }

        return this;
    }

    public getPlugins(): Map<string, any> {
        return this.plugins;
    }

    public getPlugin(name) {
        return this.plugins[name];
    }

    public hasPlugin(plugin) {
        return this.plugins.has(plugin);
    }

    public clear() {
        this.plugins.clear();
    }
}
