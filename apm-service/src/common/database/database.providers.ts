import * as mongoose from 'mongoose';
import { DB_CON_TOKEN } from './database.constants';
import { Config } from '../../config/config';

export const DatabaseProviders = [
  {
    provide: DB_CON_TOKEN,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        `mongodb://${Config.database.host}:${Config.database.port}/${
          Config.database.database
        }`
      )
  }
];
