import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { DataEntity } from './data.entity';
import { DataRepositoryToken } from './data.constants';

export const AccountProviders = [
    {
        provide: DataRepositoryToken,
        useFactory: (connection: Connection) =>
            connection.getRepository(DataEntity),
        inject: [DB_CON_TOKEN],
    },
];
