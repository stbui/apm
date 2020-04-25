import { Dispatcher } from './dispatcher';

// class MyPlugin extends Plugin {
//     constructor(kernel) {
//         super(kernel)
//     }

//     apply() {
//         console.log('MyPlugin', 'apply')

//         setInterval(() => {
//             this.dispatcher.dispatch('notify', {
//                 name: 'error',
//                 message: 'error message'
//             })
//         }, 3000)
//     }
// }

// new Kernal({
//     apiKey: '1dw43f34232424',
//     endpoint: 'http://127.0.0.1:8080',
//     user: { name: 'stbui' },
//     plugin: [MyPlugin]
// })

export class Plugin {
    public pluginName: string | number = Math.random();

    public dispatcher: Dispatcher;
    public kernel;
    public config;

    constructor(kernel) {
        this.dispatcher = kernel.dispatcher;
        this.kernel = kernel;
        this.config = kernel.config;

        this.create();
    }

    create(...args) {}
    apply(...args) {}
    destroy(...args) {}
    init(...args) {}
    inited(...args) {}

    runInitedHook() {
        this.inited();
        this.apply();
        return this;
    }

    runInitHook() {
        this.init();
        return this;
    }
}
