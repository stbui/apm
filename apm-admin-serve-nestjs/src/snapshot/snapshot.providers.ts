import { Connection } from 'mongoose';
import { SnapshotSchema } from './snapshot.schema';

export const SnapshotProviders = [
  {
    provide: 'SnapshotModelToken',
    useFactory: (connection: Connection) =>
      connection.model('snaphot', SnapshotSchema),
    inject: ['DbConnectionToken'],
  },
];
