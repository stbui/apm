/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/apm
 */

import { Container } from './container';
import { DependenciesScanner } from './scanner';
import { Injector } from './injector';

export class Runner {
  private static container = new Container();
  private static dependenciesScanner = new DependenciesScanner(
    Runner.container
  );
  private static injector = new Injector(Runner.container);

  /**
   * 开始分析模块依赖
   * @param module 模块
   */
  static run(module) {
    this.dependenciesScanner.scan(module);
    this.injector.createInstancesOfDependencies();
  }
}
