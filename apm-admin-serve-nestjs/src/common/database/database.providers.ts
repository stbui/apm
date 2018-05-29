import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const DatabaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://localhost:27017/apm'),
  },
];
