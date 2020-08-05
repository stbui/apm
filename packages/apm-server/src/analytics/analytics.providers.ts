import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { AccountEntity } from './analytics.entity';
import { ACCOUNT_TOKEN } from './analytics.constants';

export const AccountProviders = [
    {
        provide: ACCOUNT_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(AccountEntity),
        inject: [DB_CON_TOKEN],
    },
];
