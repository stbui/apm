import 'reflect-metadata';
import { Container } from './container';
import { InstanceLoader } from './instance-loader';

export class Injector {
  private instanceLoader = new InstanceLoader();

  constructor(private container: Container) {}

  createInstancesOfDependencies() {
    const modules = this.container.getModules();

    this.createInstances(modules);
  }

  private createInstances(modules) {
    modules.forEach(module => {
      this.createInstancesOfComponents(module);
      this.createInstancesOfControllers(module);
    });
  }

  private createInstancesOfComponents(module) {
    module.components.forEach((wrapper, type) => {
      this.instanceLoader.loadInstanceOfComponent(type, module.components);
    });
  }

  private createInstancesOfControllers(module) {
    module.controllers.forEach((wrapper, type) => {
      this.instanceLoader.loadInstanceOfController(
        type,
        module.controllers,
        module.components
      );
    });
  }
}
