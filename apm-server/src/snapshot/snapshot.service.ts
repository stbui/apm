import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnapshotEntity } from './snapshot.entity'

@Injectable()
export class SnapshotService {
  constructor(
    @InjectRepository(SnapshotEntity)
    private readonly repository: Repository<SnapshotEntity>,
  ) { }


}
