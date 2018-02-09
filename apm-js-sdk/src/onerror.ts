import { Config } from "./config";
import { Report } from "./report";

export class OnError {}

window.onerror = function(messageOrEvent, url, lineNo, charNo, error) {
  let config = new Config();
  Report(config);
};
