import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export class CrudController<T> {
  constructor(private readonly _service) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  findAll(): Promise<T[]> {
    return this._service.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  findfindByIdOne(@Param('id') id: number): Promise<T> {
    return this._service.findOneById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.'
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() entity: T) {
    return this._service.create(entity);
  }

  @Put(':id')
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
  update(@Body() entity: T): Promise<T> {
    return this._service.update(entity);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  delete(@Param('id') id: number) {
    return this._service.delete(id);
  }
}
