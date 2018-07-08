import 'reflect-metadata';

export function Controller(): ClassDecorator {
  return (target: Object) => {
    Reflect.defineMetadata('stbui', 'apm', target);
  };
}
