import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ScriptService } from './script.service';


@Controller()
export class ScriptController {

    constructor(private service: ScriptService) {

    }

    @Get('/script.json')
    getAction( @Query() q) {
        const { page } = q;
        // return this.service.page(page).countSelect();
        return this.service.select();
    }
   
}