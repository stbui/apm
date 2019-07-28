/**
 * Crud controller.
 * @author Stbui <https://github.com/stbui>
 */

import {
    Get,
    Post,
    Body,
    Put,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseInterceptors,
    Query,
} from '@nestjs/common';
import { BaseEntity, DeleteResult, DeepPartial } from 'typeorm';
import {
    ApiUseTags,
    ApiBearerAuth,
    ApiOperation,
    ApiImplicitQuery,
    ApiResponse,
} from '@nestjs/swagger';
import { CrudService } from './crud.service';
import { TransformInterceptor } from '../interceptors/transform.interceptor';

export class CrudController<T extends BaseEntity> {
    protected service: CrudService<T>;

    @Get()
    @UseInterceptors(TransformInterceptor)
    @ApiImplicitQuery({
        name: 'q',
        required: false,
        type: String,
        description: 'Text for search (default: empty)',
    })
    @ApiImplicitQuery({
        name: 'sort',
        required: false,
        type: String,
        description: 'Column name for sort (default: -id)',
    })
    @ApiImplicitQuery({
        name: 'per_page',
        required: false,
        type: Number,
        description: 'Number of results to return per page. (default: 10)',
    })
    @ApiImplicitQuery({
        name: 'cur_page',
        required: false,
        type: Number,
        description:
            'A page number within the paginated result set. (default: 1)',
    })
    @ApiImplicitQuery({
        name: 'group',
        required: false,
        type: Number,
        description: 'Group id for filter data by group. (default: empty)',
    })
    @ApiResponse({ status: 200, description: 'Ok' })
    public async findAll(@Query() { page = 0, perPage = 10 }) {
        const [result, total] = await this.service.findAll({
            take: perPage,
            // skip: (page - 1) * perPage,
            // where: { name: Like('%' + keyword + '%') }, order: { name: "DESC" },
        });

        return {
            total,
            page,
            perPage,
            resultList: result,
        };
    }

    @Get(':id')
    @UseInterceptors(TransformInterceptor)
    @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Entity does not exist' })
    public async findOne(@Param('id', new ParseIntPipe()) id: number) {
        return this.service.findOneById(id);
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    public async create(@Body() data: DeepPartial<T>): Promise<T> {
        return this.service.create(data);
    }

    @Put(':id')
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
    public async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() data: DeepPartial<T>,
    ): Promise<T> {
        return this.service.patch(id, data);
    }

    @Patch('/:id')
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
    public async patch(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() data: DeepPartial<T>,
    ): Promise<T> {
        return this.service.patch(id, data);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    public async delete(@Param('id') id: number): Promise<DeleteResult> {
        return this.service.delete(id);
    }
}
