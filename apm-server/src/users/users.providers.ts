import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { UsersEntity } from './users.entity';
import { USER_TOKEN } from './users.constants';

export const UsersProviders = {
    provide: USER_TOKEN,
    useFactory: (connection: Connection) =>
        connection.getRepository(UsersEntity),
    inject: [DB_CON_TOKEN],
};
