/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

import 'reflect-metadata';

export class InstanceLoader {
    /**
     * 加载组件实例
     * @param componentType 组件的实例包装器
     * @param module 所属Module实例
     */
    loadInstanceOfComponent(componentType, module) {
        const components = module.components;
        this.loadInstance(componentType, components, module);
    }

    loadInstanceOfController(componentType, module) {
        const controllers = module.controllers;
        this.loadInstance(componentType, controllers, module);
    }

    /**
     * 根据集合加载包装器中实例，此时原型已经创建
     * @param type 组件实例包装器
     * @param collection 所属模块组件集合
     * @param module Module实例
     */
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

    /**
     * 加载组件原型对象
     * @param type 组件的实例包装器
     * @param collection 所属模块组件集合
     */
    loadPrototypeOfInstance<T>(type, collection) {
        if (!collection) {
            return;
        }

        collection.set(type, {
            ...collection.get(type),
            instance: Object.create(type.prototype),
        });
    }

    private resolveConstructorParams(type, module, callback) {
        let constructorParams = Reflect.getMetadata('design:paramtypes', type) || [];

        if (type.dependencies) {
            constructorParams = type.dependencies;
        }
        const argsInstances = constructorParams.map(param => this.resolveSingleParam(type, param, module));
        callback(argsInstances);
    }

    /**
     * 解析参数类，获取其包装器
     * @param targetType 所属组件包装器
     * @param param 参数类型
     * @param module
     */
    private resolveSingleParam(targetType, param, module) {
        if (typeof param === 'undefined') {
            throw new Error('resolveSingleParam');
        }

        return this.resolveComponentInstance(module, param, targetType);
    }

    private resolveComponentInstance(module, param, componentType) {
        const components = module.components;
        const instanceWrapper = this.scanForComponent(components, param, module, componentType);

        if (instanceWrapper.instance === null) {
            this.loadInstanceOfComponent(param, module);
        }
        return instanceWrapper.instance;
    }

    /**
     * 扫描指定名称参数组件包装器
     * @param components 所属模块组件集合
     * @param param 参数类名、下标、长度
     * @param module 模块实例
     * @param componentType 所属组件类
     */
    private scanForComponent(components, param, module, componentType) {
        if (!components.has(param)) {
            const instanceWrapper = this.scanForComponentInRelatedModules(module, param);

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
