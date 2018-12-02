import { Controller, Get, Query } from '@nestjs/common';
import { ScriptService } from './script.service';

@Controller('script')
export class ScriptController {
  constructor(private service: ScriptService) {}

  @Get('/')
  getAction(@Query() q) {
    const { page } = q;
    // return this.service.page(page).countSelect();
    return this.service.select();
  }
}
