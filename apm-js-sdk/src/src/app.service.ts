import { Injectable } from "../../packages/common";
import { Http } from "../../packages/http";

@Injectable()
export class AppService {
  private url: string = "http://stbui.com/";

  constructor(private http: Http) {
    console.log(
      "initialization service:%c AppService",
      "color:blue",
      this.http
    );
  }

  save(options) {
    this.http.post(this.url, options);
  }
}
