import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { FeaturesEntity } from './features.entity';
import { ACCOUNT_TOKEN } from './features.constants';

export const AccountProviders = [
    {
        provide: ACCOUNT_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(FeaturesEntity),
        inject: [DB_CON_TOKEN],
    },
];
