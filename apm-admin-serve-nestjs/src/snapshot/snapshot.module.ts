import { Module } from '@nestjs/common';
import { SnapshotController } from './snapshot.controller';
import { SnapshotService } from './snapshot.service';
import { SnapshotProviders } from './snapshot.providers';
import { DatabaseModule } from '../common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SnapshotController],
  providers: [SnapshotService, ...SnapshotProviders],
  exports: [SnapshotService],
})
export class SnapshotModule {}
