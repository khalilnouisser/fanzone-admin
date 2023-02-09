import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-filtering',
  templateUrl: './generic-filtering.component.html',
  styleUrls: ['./generic-filtering.component.scss']
})
export class GenericFilteringComponent implements OnInit {

  public filter: any;

  constructor() { }

  ngOnInit(): void {
  }

  getFilterValues(filterName: string): string[] {
    const fieldValue = this.filter[filterName];
    return fieldValue === '' ? [] : fieldValue.split(',');
  }

  isFilterSelected(filterName: string, appId: string): boolean {
    return this.filter[filterName].indexOf(appId) !== -1;
  }

  selectFilter(filterName: string, appId: string): void {
    const values = this.getFilterValues(filterName);
    const index = values.indexOf(appId);
    if (index !== -1) {
      values.splice(index, 1);
    } else {
      values.push(appId);
    }
    this.filter[filterName] = values.join(',');
  }

  getFilterLabels(modelList: any[], filterName: string): string {
    const values = this.getFilterValues(filterName);
    if (values.length === 0 || values.length === modelList.length) {
      return 'Tous';
    }
    return values.length + '&nbsp;&nbsp;&nbsp;';
  }

}
