import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { ScriptProviders } from './script.provider';
import { ScriptController } from './script.controller';
import { ScriptService } from './script.service';

@Module({
    modules: [DatabaseModule],
    controllers: [ScriptController],
    components: [
        ScriptService,
        ...ScriptProviders
    ],
    exports: [ScriptService]
})
export class ScriptModule { }
