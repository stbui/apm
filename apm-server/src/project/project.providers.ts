import { Connection } from 'mongoose';
import { ProjectSchema } from './project.schema';

export const ProjectProviders = [
  {
    provide: 'ProjectModelToken',
    useFactory: (connection: Connection) =>
      connection.model('project', ProjectSchema),
    inject: ['DbConnectionToken'],
  },
];
