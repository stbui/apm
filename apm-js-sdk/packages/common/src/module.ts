import 'reflect-metadata';

/**
 * module
 * - `controllers`
 * - `providers`
 * @param metadata
 */
export function Module(metadata): ClassDecorator {
  overrideModuleMetadata(metadata);

  console.log(metadata);

  return (target: object) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, metadata[property], target);
      }
    }
  };
}

function overrideModuleMetadata(moduleMetadata) {
  moduleMetadata.modules = moduleMetadata.imports
    ? moduleMetadata.imports
    : moduleMetadata.modules;

  moduleMetadata.components = moduleMetadata.providers
    ? moduleMetadata.providers
    : moduleMetadata.components;
}
