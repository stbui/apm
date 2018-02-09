export class Http {

  constructor() {

  }

  request() {
    
  }

  get(
    url: string,
    options: {
      params?;
      responseType?: "json";
    }
  ) {

  }

  handle(req) {
    const xhr = new XMLHttpRequest();
    xhr.open(req.method, req.urlWithParams);
    if (!!req.withCredentials) {
      xhr.withCredentials = true;
    }

    req.headers.forEach((name, values) =>
      xhr.setRequestHeader(name, values.join(","))
    );

    const reqBody = req.serializeBody();

    xhr.send(reqBody);
  }
}
