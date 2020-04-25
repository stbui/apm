export class Hook {
    private hooks;
    subscribeList;

    constructor() {
        this.hooks = {};
        this.subscribeList = {};
    }

    tap(name: string, fn: any) {
        const hooks = this.hooks;

        if (hooks[name] instanceof Array) {
            if (hooks[name].indexOf(fn) === -1) {
                hooks[name].push(fn);
            }
        } else {
            hooks[name] = [].concat(fn);
        }
    }

    emit(name: string, ...args: any) {
        this.hooks[name].forEach(fn => {
            fn.apply(null, ...args);
        });
    }

    publish() {
        const signal = Array.prototype.shift.call(arguments);
        const fns = this.subscribeList[signal];

        if (!fns || fns.length === 0) {
            return false;
        }

        for (let i = 0, fn; (fn = fns[i++]); ) {
            fn.apply(this, arguments);
        }
    }

    subscribe(signal, fn) {
        if (!this.subscribeList[signal]) {
            this.subscribeList[signal] = [];
        }
        this.subscribeList[signal].push(fn);
    }

    unSubscribe(signal, fn) {
        const fns = this.subscribeList[signal];

        if (!fns) {
            return false;
        }

        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(1, 1);
                }
            }
        }
    }
}

// class SyncHook {
//     tasks

//     constructor() {
//         this.tasks = [];
//     }
//     tap(name, task) {
//         this.tasks.push(task);
//     }
//     call(...args) {
//         // 依次执行注册的函数
//         this.tasks.forEach(task => {
//             task(...args)
//         })
//     }
// }

// class SyncBailHook {
//     tasks

//     constructor() {
//         this.tasks = [];
//     }
//     tap(name, task) {
//         this.tasks.push(task);
//     }
//     call(...args) {
//         let ret;
//         let index = 0;

//         do {
//             ret = this.tasks[index++](...args)
//         } while (ret === undefined && index < this.tasks.length)
//     }
// }

// class SyncWaterfallHook {
//     tasks
//     constructor() {
//         this.tasks = [];
//     }
//     tap(name, task) {
//         this.tasks.push(task);
//     }
//     call(...args) {
//         const [first, ...others] = this.tasks;
//         const ret = first(...args);

//         others.reduce((a, b) => {
//             return a ? b(a) : b(...args) // 如果没有return，还是传默认参数
//         }, ret)
//     }
// }
