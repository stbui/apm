import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { FeaturesEntity } from './features.entity';
import { featuresRepositoryToken } from './features.constants';

export const FeaturesProviders = [
    {
        provide: featuresRepositoryToken,
        useFactory: (connection: Connection) =>
            connection.getRepository(FeaturesEntity),
        inject: [DB_CON_TOKEN],
    },
];
