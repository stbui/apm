import { Injectable } from "@apm/common";
import { Http } from "@apm/http";

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

  report(options) {
    this.http.post(this.url, options);
  }
}
