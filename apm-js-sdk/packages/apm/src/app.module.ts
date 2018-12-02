import { Module } from "@apm/common";
import { Http } from "@apm/http";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ExceptionInterceptorController } from "./interceptor/exception.controller";
import { HttpInterceptorController } from "./interceptor/http.controller";

@Module({
  controllers: [
    AppController,
    ExceptionInterceptorController,
    HttpInterceptorController
  ],
  providers: [AppService, Http]
})
export class AppModule {}
