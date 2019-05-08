import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { CollectionEntity } from './collection.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CollectionEntity])],
  controllers: [CollectionController],
  providers: [CollectionService]
})
export class CollectionModule { }
