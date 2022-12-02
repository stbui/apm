import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Sessions } from './entity/Sessions';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'data.db',
    synchronize: true,
    logging: true,
    entities: [Sessions],
    subscribers: [],
    migrations: [],
});
