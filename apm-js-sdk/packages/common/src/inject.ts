import 'reflect-metadata';

export const isFunction = (fn): boolean => typeof fn === 'function';

export function Inject(token: any): ParameterDecorator {
  return (target, key, index) => {
    const args = Reflect.getMetadata('self:paramtypes', target) || [];
    const type = isFunction(token) ? token.name : token;

    args.push({ index, param: type });
    Reflect.defineMetadata('self:paramtypes', args, target);
  };
}
