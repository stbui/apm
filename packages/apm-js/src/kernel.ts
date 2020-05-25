import { Dispatcher } from './dispatcher';
import { Map } from './map';

export class Kernal {
    private readonly plugins: Map = new Map();
    public readonly dispatcher: Dispatcher = new Dispatcher();
    public readonly config;

    constructor(config) {
        this.config = config;
        this.initPlugin(config.plugins);
        this.onReady();
    }

    addPlugin(plugin) {
        if (!this.plugins.has(plugin)) {
            this.plugins.set(plugin, {});
        }

        return this;
    }

    getPlugins() {
        return this.plugins;
    }

    getPlugin(name) {
        return this.plugins[name];
    }

    hasPlugin(plugin) {
        return this.plugins.has(plugin);
    }

    onReady() {
        this.dispatcher.dispatch('ready');
        this.dispatcher.dispatch('load');
    }

    destroy() {
        this.dispatcher.off();
        this.plugins.clear();
    }

    /**
     * 允许覆盖已经注册后插件
     * @param {class} plugin
     */
    use(plugin) {
        const instance = new plugin(this);
        instance.runInitedHook();

        if (typeof plugin.pluginName === 'string' || typeof plugin.pluginName === 'number') {
            this[plugin.pluginName] = instance;
        }

        this.plugins.set(plugin.pluginName, instance);

        return this;
    }

    private initPlugin(plugins: Array<[]>) {
        return plugins.map(plugin => this.use(plugin));
    }
}
