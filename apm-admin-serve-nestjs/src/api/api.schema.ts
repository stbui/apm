import * as mongoose from 'mongoose';

export const ApiSchema = new mongoose.Schema({
  data: Object,
  index: Number,
  time: Number,
  timestamp: Number,
  type: String,
  snaphot_id: String,
});
