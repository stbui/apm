import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { AuthMethodController } from './auth_method.controller';
import { AuthMethodService } from './auth_method.service';
import { AuthMethodProviders } from './auth_method.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthMethodController],
    providers: [AuthMethodService, ...AuthMethodProviders],
    exports: [AuthMethodService],
})
export class AuthMethodModule {}
