import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { ScriptEntity } from './script.entity';
import { SCRIPT_TOKEN } from './script.constants';

export const ScriptProviders = [
  {
    provide: SCRIPT_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(ScriptEntity),
    inject: [DB_CON_TOKEN],
  },
];
