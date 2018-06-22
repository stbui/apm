import { Injectable } from '@nestjs/common';
import { ApiDb } from './api.db';

@Injectable()
export class ApiService {
  options;

  constructor() {
    this.options = {};
  }

  select() {
    const db = ApiDb;

    return db;
  }
}
