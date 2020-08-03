import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { AuthMethodEntity } from './auth_method.entity';
import { AuthMethodRepositoryToken } from './auth_method.constants';

export const AuthMethodProviders = [
    {
        provide: AuthMethodRepositoryToken,
        useFactory: (connection: Connection) =>
            connection.getRepository(AuthMethodEntity),
        inject: [DB_CON_TOKEN],
    },
];
