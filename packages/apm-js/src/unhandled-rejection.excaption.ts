import { Plugin } from './plugin';

/**
 * Promise 错误拦截
 * 当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件；这可能发生在 window 下，但也可能发生在 Worker 中。 这对于调试回退错误处理非常有用。
 */
export class UnnHanndledRejectionExcaption extends Plugin {
    pluginName: string = 'UnnHanndledRejectionExcaption';

    constructor(kernel) {
        super(kernel);
    }

    apply(instance) {
        window.addEventListener('unhandledrejection', ({ reason }) => {
            const event = {
                errorClass: reason ? reason.name : 'UnhandledRejection',
                errorMessage: reason
                    ? reason.message
                    : 'Rejection reason was not an Error. See "Promise" tab for more detail.',
                severity: 'error',
                unhandled: true,
                severityReason: { type: 'unhandledPromiseRejection' },
            };

            this.dispatcher.dispatch('notify', event);
        });
    }
}
