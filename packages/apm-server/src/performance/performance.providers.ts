import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { PerformanceEntity } from './performance.entity';
import { PERFORMANCE_TOKEN } from './performance.constants';

export const PerformanceProviders = [
    {
        provide: PERFORMANCE_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(PerformanceEntity),
        inject: [DB_CON_TOKEN],
    },
];
