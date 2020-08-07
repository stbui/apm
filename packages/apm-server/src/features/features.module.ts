import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { FeaturesProviders } from './features.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [FeaturesController],
    providers: [FeaturesService, ...FeaturesProviders],
    exports: [FeaturesService],
})
export class FeaturesModule {}
