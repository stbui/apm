/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

import 'reflect-metadata';

export function Controller(): ClassDecorator {
  return (target: Object) => {
    Reflect.defineMetadata('stbui', 'apm', target);
  };
}
