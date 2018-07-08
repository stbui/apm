import 'reflect-metadata';
import { Container } from './container';
import { InstanceLoader } from './instance-loader';

export class Injector {
  private instanceLoader = new InstanceLoader();

  constructor(private container: Container) {}

  createInstancesOfDependencies() {
    const modules = this.container.getModules();

    this.createPrototypes(modules);
    this.createInstances(modules);
  }

  private createPrototypes(modules) {
    modules.forEach(module => {
      this.createPrototypesOfComponents(module);
      this.createPrototypesOfControllers(module);
    });
  }

  private createInstances(modules) {
    modules.forEach(module => {
      this.createInstancesOfComponents(module);
      this.createInstancesOfControllers(module);
    });
  }

  private createInstancesOfComponents(module) {
    module.components.forEach((wrapper, componentType) => {
      this.instanceLoader.loadInstanceOfComponent(componentType, module);
    });
  }

  private createInstancesOfControllers(module) {
    module.controllers.forEach((wrapper, componentType) => {
      this.instanceLoader.loadInstanceOfController(componentType, module);
    });
  }

  private createPrototypesOfComponents(module) {
    module.components.forEach((wrapper, componentType) => {
      this.instanceLoader.loadPrototypeOfInstance(
        componentType,
        module.components
      );
    });
  }

  private createPrototypesOfControllers(module) {
    module.controllers.forEach((wrapper, componentType) => {
      this.instanceLoader.loadPrototypeOfInstance(
        componentType,
        module.controllers
      );
    });
  }
}
