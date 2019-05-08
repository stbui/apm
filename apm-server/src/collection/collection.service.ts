import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionEntity } from './collection.entity'
import { CrudService } from '../common/crud/crud.service';


@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly repository: Repository<CollectionEntity>,
  ) { }

  async findAll(): Promise<CollectionEntity[]> {
    return await this.repository.find();
  }

  async create(body) {
    return await this.repository.save(body)
  }
}