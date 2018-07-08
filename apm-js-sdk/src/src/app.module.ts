import { Module } from "../../packages/common";
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
  providers: [AppService]
})
export class AppModule {}
