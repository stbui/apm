import { Module, Inject, OnModuleDestroy } from '@nestjs/common';
import { DatabaseProviders } from './database.providers';
import { DB_CON_TOKEN } from './database.constants';

@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(@Inject(DB_CON_TOKEN) private readonly dbConnection) { }

  public onModuleDestroy(): void {
    this.dbConnection.close();
  }
}

