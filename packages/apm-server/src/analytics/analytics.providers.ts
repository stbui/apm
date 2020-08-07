import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { AnalyticsEntity } from './analytics.entity';
import { AnalyticsRepositoryToken } from './analytics.constants';

export const AnalyticsProviders = [
    {
        provide: AnalyticsRepositoryToken,
        useFactory: (connection: Connection) =>
            connection.getRepository(AnalyticsEntity),
        inject: [DB_CON_TOKEN],
    },
];
