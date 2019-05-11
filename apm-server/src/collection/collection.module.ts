import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';

import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { CollectionProviders } from './collection.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CollectionController],
  providers: [CollectionService, ...CollectionProviders],
})
export class CollectionModule {}
