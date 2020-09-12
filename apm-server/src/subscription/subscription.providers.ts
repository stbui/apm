import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { SubscriptionEntity } from './subscription.entity';
import { SubscriptionRepositoryToken } from './subscription.constants';

export const SubscriptionProviders = [
    {
        provide: SubscriptionRepositoryToken,
        useFactory: (connection: Connection) =>
            connection.getRepository(SubscriptionEntity),
        inject: [DB_CON_TOKEN],
    },
];
