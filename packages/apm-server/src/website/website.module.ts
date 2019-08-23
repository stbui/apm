import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';
import { WebsiteProviders } from './website.providers';
import { SessionModule } from '../session/session.module';

@Module({
    imports: [DatabaseModule, SessionModule],
    controllers: [WebsiteController],
    providers: [WebsiteService, ...WebsiteProviders],
    exports: [WebsiteService],
})
export class WebsiteModule {}
