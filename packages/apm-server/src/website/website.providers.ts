import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { WebsiteEntity } from './website.entity';
import { WEBSITE_TOKEN } from './website.constants';

export const WebsiteProviders = [
    {
        provide: WEBSITE_TOKEN,
        useFactory: (connection: Connection) =>
            connection.getRepository(WebsiteEntity),
        inject: [DB_CON_TOKEN],
    },
];
