import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { SettingEntity } from './setting.entity';
import { TOKEN } from './setting.constants';

export const SettingProviders = [
  {
    provide: TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(SettingEntity),
    inject: [DB_CON_TOKEN],
  },
];
