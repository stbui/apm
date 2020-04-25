import { Connection } from 'typeorm';
import { DB_CON_TOKEN } from '../common/database/database.constants';
import { ProjectEntity } from './project.entity';
import { PROJECT_TOKEN } from './project.constants';

export const ProjectProviders = [
    {
        provide: PROJECT_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(ProjectEntity),
        inject: [DB_CON_TOKEN],
    },
];
