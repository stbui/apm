import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnapshotController } from './snapshot.controller';
import { SnapshotService } from './snapshot.service';
import { SnapshotEntity } from './snapshot.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SnapshotEntity])],
  controllers: [SnapshotController],
  providers: [SnapshotService],
  exports: [SnapshotService],
})
export class SnapshotModule { }
