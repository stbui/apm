import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformanceEntity } from './performance.entity'
import { PerformanceDb } from './performance.db';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(PerformanceEntity)
    private readonly repository: Repository<PerformanceEntity>,
  ) { }

  findAll() {
    return PerformanceDb.index
  }
}
