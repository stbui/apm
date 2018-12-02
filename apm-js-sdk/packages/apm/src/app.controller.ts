import { Controller } from "@apm/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private service: AppService) {
    console.log(
      "initialization controller:%c AppController",
      "color:green",
      this.service
    );
  }

  go() {
    console.log("controller go");
  }
}
