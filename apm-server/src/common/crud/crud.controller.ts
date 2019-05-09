import { Get, Post, Body, Put, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BaseEntity, DeleteResult, DeepPartial } from 'typeorm';
import { ApiResponse } from '@nestjs/swagger';
import { CrudService } from './crud.service';

export class CrudController<T extends BaseEntity> {
  protected service: CrudService<T>;

  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  public async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  public async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.findOneById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async create(@Body() data: DeepPartial<T>): Promise<T> {
    return this.service.create(data);
  }

  @Put(':id')
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
  public async update(@Body() data: DeepPartial<T>): Promise<T> {
    return this.service.update(data);
  }

  @Patch('/:id')
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
  public async patch(@Param('id', new ParseIntPipe()) id: number, @Body() data: DeepPartial<T>): Promise<T> {
    return this.service.patch(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.delete(id);
  }
}
