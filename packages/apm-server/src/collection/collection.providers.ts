import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { CollectionEntity } from './collection.entity';
import { COLLECTION_TOKEN } from './collection.constants';

export const CollectionProviders = [
    {
        provide: COLLECTION_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(CollectionEntity),
        inject: [DB_CON_TOKEN],
    },
];
