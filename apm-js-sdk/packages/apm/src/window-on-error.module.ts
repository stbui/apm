import { Module } from "@apm/common";

export class WindowOnError {
    // private prevOnError: any = window.onerror

    constructor() {
        window.onerror = this.onerror
    }

    onerror(messageOrEvent, url, lineNo, charNo, error) {
        console.log(messageOrEvent, url, lineNo, charNo, error)
    }
}


@Module({
    providers: [WindowOnError],
    exports: [WindowOnError]
})
export class WindowOnErrorModule { }