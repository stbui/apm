import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScriptEntity } from './script.entity'
import { ScriptDb } from './script.db';

@Injectable()
export class ScriptService {
  constructor(
    @InjectRepository(ScriptEntity)
    private readonly repository: Repository<ScriptEntity>,
  ) { }

  findAll() {
    return ScriptDb.index
  }
}
