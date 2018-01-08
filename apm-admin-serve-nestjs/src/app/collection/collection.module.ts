import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
    controllers:[CollectionController],
    components: [
        CollectionService
    ]
})
export class CollectionModule{}
