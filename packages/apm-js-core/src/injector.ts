import { PluginContainer } from './container';
import { PluginInstanceLoader } from './instance-loader';

export class Injector {
    private instanceLoader = new PluginInstanceLoader();

    constructor(private container: PluginContainer) {}

    createInstances() {
        const plugins = this.container.getPlugins();

        plugins.forEach((w, pluginType) => {
            this.instanceLoader.loadInstance(pluginType, plugins);
        });
    }
}
