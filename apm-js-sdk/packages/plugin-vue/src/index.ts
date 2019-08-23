
import { Module } from "@apm/common";

class WindowUnhandledRejection {

}

@Module({
    providers: [WindowUnhandledRejection]
})
export class WindowUnhandledRejectionModule { }