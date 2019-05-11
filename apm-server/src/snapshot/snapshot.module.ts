import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';

import { SnapshotController } from './snapshot.controller';
import { SnapshotService } from './snapshot.service';
import { SnapshotProviders } from './snapshot.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SnapshotController],
  providers: [SnapshotService, ...SnapshotProviders],
  exports: [SnapshotService],
})
export class SnapshotModule {}
