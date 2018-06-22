import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  email: String,
  displayName: {
    type: String,
    default: 'stbui',
  },
  role: {
    type: String,
    default: 'user',
  },
  priceingPlan: {
    type: String,
    default: 'free',
  },
  token: {
    type: String,
    required: true,
  },
});
