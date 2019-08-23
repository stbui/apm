import { Controller } from "@apm/common";
import { AppService } from "./app.service";
// import { WindowOnError } from './window-on-error.module'

@Controller()
export class AppController {
  constructor(private service: AppService, ) {
    console.log(this.service)
    // console.log(this.windowOnError)
  }

}
