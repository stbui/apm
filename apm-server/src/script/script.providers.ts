import { Connection } from 'mongoose';
import { ScriptSchema } from './script.schema';

export const ScriptProviders = [
  {
    provide: 'ScriptModelToken',
    useFactory: (connection: Connection) =>
      connection.model('script', ScriptSchema),
    inject: ['DbConnectionToken'],
  },
];
