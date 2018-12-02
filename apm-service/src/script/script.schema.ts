import * as mongoose from 'mongoose';

export const ScriptSchema = new mongoose.Schema({
  apiKey: String,
  notifier: {
    name: String,
    version: String,
    url: String,
  },
  events: Array,

  // apiKey: String,
  // projectRoot: String,
  // context: String,
  // metaDate: {
  //     script: String,
  //     content: String
  // },
  // releaseStage: String,
  // url: String,
  // userAgent: String,
  // language: String,
  // sevrity: String,
  // name: String,
  // message: String,
  // stacktrace: String,
  // file: String,
  // lineNumber: Number,
  // columnNumber: Number,
  // payloadVersion: Number,
  // ct: String,
  // cb: { type: Date, default: Date.now },
});
