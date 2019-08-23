import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { SessionEntity } from './session.entity';
import { TOKEN } from './session.constants';

export const SessionProviders = [
  {
    provide: TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(SessionEntity),
    inject: [DB_CON_TOKEN],
  },
];
