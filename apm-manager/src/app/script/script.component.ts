import { Component, OnInit } from '@angular/core';
import { ScriptService } from './script.service';
import userAgent from './user-agent';

@Component({
  selector: 'apm-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss']
})
export class ScriptComponent implements OnInit {

  rows: any[];
  loadingIndicator = true;
  reorderable = true;

  selected = [];
  openDetail: boolean = false;
  detail;

  constructor(private service: ScriptService) {

  }

  ngOnInit() {
    this.service.getScripts();
    this.service.onScriptsChangedSubject.subscribe(script => {
      this.rows = script.data;
      this.loadingIndicator = false;
    });
  }

  onSelect({ selected }) {
    this.selected = selected;
    this.detail = selected[0];
    this.openDetail = true;
  }

  onOpenedTriggered(opened) {
    this.openDetail = opened;
  }

  onClickOutside(e) {
    this.openDetail = false;
  }
}
