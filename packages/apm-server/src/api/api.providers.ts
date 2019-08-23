import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { API_TOKEN } from './api.constants';
import { ApiEntity } from './api.entity';

export const ApiProviders = [
  {
    provide: API_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(ApiEntity),
    inject: [DB_CON_TOKEN],
  },
];
