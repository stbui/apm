import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PerformanceService {
  api = '/assets/data/apm';

  constructor(private http: HttpClient) {}

  getList() {
    const url = `${this.api}/performance.json`;
    return this.http.get<any>(url);
  }
}
