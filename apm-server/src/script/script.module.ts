import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module'
import { ScriptController } from './script.controller';
import { ScriptService } from './script.service';
import { ScriptProviders } from './script.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ScriptController],
  providers: [ScriptService, ...ScriptProviders],
})
export class ScriptModule { }
