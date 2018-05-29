import { Controller, Get, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
  constructor(private service: CollectionService) {

  }

  @Get('/')
  indexAction(@Query() q) {
    const { page } = q;
        return this.service.page(page).countSelect();
  }
}
