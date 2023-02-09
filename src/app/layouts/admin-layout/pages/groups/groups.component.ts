import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import {Group} from '@app/models/group';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {User} from '@app/models/user';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent extends GenericFilteringComponent implements OnInit {

  list: Group[] = [];
  page = 1;
  pageSize = 10;
  totalLength = 100;
  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'name',
      keyword: '',
    };
  }

  ngOnInit() {
    this.loadData();
  }

  pageChange(ev) {
    this.page = ev;
    this.loadData();
  }

  loadData() {
    this.list = [];
    this.apiService.groups(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

}
