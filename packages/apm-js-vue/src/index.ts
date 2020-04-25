export class VuejsPlugin {


  apply(instance) {
    // @ts-ignore
    if (!window.Vue) {
      throw new Error('Error');
    }

    // @ts-ignore
    window.Vue.config.errorHandler = (error, vm, info) => {
      const handledState = {
        severity: 'error',
        unhandled: true,
        severityReason: { type: 'unhandledException' },
      };

      const report = instance.report.create(error.name, error.message, [], handledState, error);

      instance.notify(report);
    };
  }
}
