import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module'
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectProviders } from './project.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [ProjectService, ...ProjectProviders],
})
export class ProjectModule { }

