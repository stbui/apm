import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';


@Controller()
export class CollectionController {

    constructor(private service: CollectionService) {

    }

    @Get('/collection.json')
    indexAction( @Query() q) {
        const { page } = q;
        return this.service.page(page).countSelect();
    }
}