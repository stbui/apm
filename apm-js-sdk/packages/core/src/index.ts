import { Container } from './container';
import { DependenciesScanner } from './scanner';
import { Injector } from './injector';

export class Runner {
  private static container = new Container();
  private static dependenciesScanner = new DependenciesScanner(
    Runner.container
  );
  private static injector = new Injector(Runner.container);

  static run(module) {
    this.dependenciesScanner.scan(module);
    this.injector.createInstancesOfDependencies();
  }
}
