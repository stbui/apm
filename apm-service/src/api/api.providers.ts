import { Connection } from 'mongoose';
import { ApiSchema } from './api.schema';

export const ApiProviders = [
  {
    provide: 'ApiModelToken',
    useFactory: (connection: Connection) =>
      connection.model('session', ApiSchema),
    inject: ['DbConnectionToken'],
  },
];
