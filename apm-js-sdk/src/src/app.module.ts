import { Module } from "../../packages/common";
import { Http } from "../../packages/http";
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
