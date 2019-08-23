import { Module, } from "@apm/common";
import { Http } from "@apm/http";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { ExceptionInterceptorController } from "./interceptor/exception.controller";
// import { HttpInterceptorController } from "./interceptor/http.controller";

import { WindowOnErrorModule } from './window-on-error.module'

@Module({
  immports: [WindowOnErrorModule],
  controllers: [
    AppController,
  ],
  providers: [AppService, Http]
})
export class AppModule { }
