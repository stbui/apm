import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PerformanceService } from './performance.service';

@Component({
  selector: 'apm-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'releaseStage',
    'connect',
    'dns',
    'black_waiting_time',
    'total_time',
    'url'
  ];
  dataSource: any = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: PerformanceService) {}

  ngOnInit() {
    this.service.getList().subscribe(res => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  rowSelection(row) {
    console.log(row);
  }
}
