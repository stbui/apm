/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

import 'reflect-metadata';

export class InstanceLoader {
  loadInstanceOfComponent(componentType, module) {
    const components = module.components;
    this.loadInstance(componentType, components, module);
  }

  loadInstanceOfController(componentType, module) {
    const controllers = module.controllers;
    this.loadInstance(componentType, controllers, module);
  }

  loadInstance(type, collection, module) {
    const currentFetchedInstance = collection.get(type);
    if (typeof currentFetchedInstance === 'undefined') {
      throw new Error('error');
    }
    if (!currentFetchedInstance.isResolved) {
      this.resolveConstructorParams(type, module, argsInstances => {
        currentFetchedInstance.instance = Object.assign(
          currentFetchedInstance.instance,
          new type(...argsInstances)
        );
        currentFetchedInstance.isResolved = true;
      });
    }
  }

  loadPrototypeOfInstance<T>(type, collection) {
    if (!collection) {
      return;
    }

    collection.set(type, {
      ...collection.get(type),
      instance: Object.create(type.prototype)
    });
  }

  private resolveConstructorParams(type, module, callback) {
    let constructorParams =
      Reflect.getMetadata('design:paramtypes', type) || [];

    if ((<any>type).dependencies) {
      constructorParams = (<any>type).dependencies;
    }
    const argsInstances = constructorParams.map(param =>
      this.resolveSingleParam(type, param, module)
    );
    callback(argsInstances);
  }

  private resolveSingleParam(targetType, param, module) {
    if (typeof param === 'undefined') {
      throw new Error('resolveSingleParam');
    }

    return this.resolveComponentInstance(module, param, targetType);
  }

  private resolveComponentInstance(module, param, componentType) {
    const components = module.components;
    const instanceWrapper = this.scanForComponent(
      components,
      param,
      module,
      componentType
    );

    if (instanceWrapper.instance === null) {
      this.loadInstanceOfComponent(param, module);
    }
    return instanceWrapper.instance;
  }

  private scanForComponent(components, param, module, componentType) {
    if (!components.has(param)) {
      const instanceWrapper = this.scanForComponentInRelatedModules(
        module,
        param
      );

      if (instanceWrapper === null) {
        throw new Error('UnkownDependenciesException');
      }
      return instanceWrapper;
    }
    return components.get(param);
  }

  private scanForComponentInRelatedModules(module, componentType) {
    const relatedModules = module.relatedModules;
    let component = null;

    relatedModules.forEach(relatedModule => {
      const { components, exports } = relatedModule;

      if (!exports.has(componentType) || !components.has(componentType)) {
        return;
      }

      component = components.get(componentType);
      // if (!component.isResolved) {
      //   this.loadInstanceOfComponent(componentType, relatedModule);
      // }
    });
    return component;
  }
}
