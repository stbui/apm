import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { AccountProviders } from './data.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [DataController],
    providers: [DataService, ...AccountProviders],
    exports: [DataService],
})
export class AccountModule {}
