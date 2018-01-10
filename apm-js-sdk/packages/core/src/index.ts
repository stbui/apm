import { log } from './log';

export class test {

    constructor() {
        console.log(log);
    }

    log(message: string) {
        console.log(message);
    }

    error(message:string) {
        return message;
    }
}