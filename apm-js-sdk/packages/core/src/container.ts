import 'reflect-metadata';
import { AppModule } from './interfaces/module.interface';
import { Component, InstanceWrapper } from './interfaces/component.interface';

export interface ModuleDependencies {
  components?: Map<Component, InstanceWrapper<Component>>;
}

export class Container {
  private readonly modules = new Map();

  addModule(module: AppModule) {
    if (!this.modules.has(module)) {
      this.modules.set(module, {
        relatedModules: new Set<ModuleDependencies>(),
        components: new Map<string, InstanceWrapper<any>>(),
        controllers: new Map<string, InstanceWrapper<any>>()
      });
    }
  }

  getModules(): Map<AppModule, ModuleDependencies> {
    return this.modules;
  }

  addRelatedModule(relatedModule, module) {
    if (this.modules.has(module)) {
      const storedModule = this.modules.get(module);
      const related = this.modules.get(relatedModule);

      storedModule.relatedModules.add(related);
    }
  }

  addComponent(component: any, module: AppModule) {
    if (this.modules.has(module)) {
      const storedModule = this.modules.get(module);
      storedModule.components.set(component, {
        instance: null
      });
    }
  }

  addController(controller: any, module: AppModule) {
    if (this.modules.has(module)) {
      const storedModule = this.modules.get(module);
      storedModule.controllers.set(controller, {
        instance: null
      });
    }
  }
}
