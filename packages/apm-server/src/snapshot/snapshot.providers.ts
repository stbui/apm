import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { SnapshotEntity } from './snapshot.entity';
import { SNAPSHOT_TOKEN } from './snapshot.constants';

export const SnapshotProviders = [
    {
        provide: SNAPSHOT_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(SnapshotEntity),
        inject: [DB_CON_TOKEN],
    },
];
