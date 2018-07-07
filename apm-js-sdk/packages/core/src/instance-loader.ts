import 'reflect-metadata';

export class InstanceLoader {
  public loadInstanceOfComponent(componentType, collection) {
    const currentFetchedComponentInstance = collection.get(componentType);

    if (currentFetchedComponentInstance.instance === null) {
      const argsInstances: any = [];
      const params =
        Reflect.getMetadata('design:paramtypes', componentType) || [];

      params.map(param => {
        if (typeof param === 'undefined')
          throw new Error(
            `Can't create instance of ` +
              componentType +
              `. It is possible that you are trying to do cycle-dependency A->B, B->A.`
          );

        const instance = this.resolveComponentInstance(
          collection,
          param,
          componentType
        );
        argsInstances.push(instance);
      });
      currentFetchedComponentInstance.instance = new componentType(
        ...argsInstances
      );
    }
  }

  loadInstanceOfController(controllerType, collection, components) {
    const currentFetchedRoute = collection.get(controllerType);

    if (currentFetchedRoute.instance === null) {
      const argsInstances: any = [];
      const params =
        Reflect.getMetadata('design:paramtypes', controllerType) || [];

      params.map(param => {
        if (typeof param === 'undefined')
          throw new Error(
            `Can't create instance of ` +
              controllerType +
              `. It is possible that you are trying to do cycle-dependency A->B, B->A.`
          );

        const componentType = this.resolveComponentInstance(
          components,
          param,
          controllerType
        );
        argsInstances.push(componentType);
      });
      currentFetchedRoute.instance = new controllerType(...argsInstances);
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

  private resolveComponentInstance(collection, param, componentType) {
    if (!collection.has(param))
      throw new Error(`Can't recognize dependencies of ` + componentType);

    const instanceWrapper = collection.get(param);

    if (instanceWrapper.instance === null) {
      this.loadInstanceOfComponent(param, collection);
    }
    return instanceWrapper.instance;
  }
}
