import { createConnection } from 'typeorm';
import { Config } from '../../config/config';
import { DB_CON_TOKEN } from './database.constants';

export const DatabaseProviders = [
    {
        provide: DB_CON_TOKEN,
        useFactory: async () => createConnection(Config.database),
    },
];
