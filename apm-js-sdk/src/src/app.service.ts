import { Injectable } from "../../packages/common";
import { Http } from "../../packages/http";

@Injectable()
export class AppService {
  private url: string = "http://stbui.com/";

  constructor(private http: Http) {
    console.log("service");
  }

  send() {
    console.log("service send");
  }

  save(options) {
    this.http.post(this.url, options);
  }
}
