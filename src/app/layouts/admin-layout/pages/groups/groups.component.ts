import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import {Group} from '@app/models/group';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {User} from '@app/models/user';
import {ngxCsv} from 'ngx-csv';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent extends GenericFilteringComponent implements OnInit {

  list: Group[] = [];
  users: User[] = [];
  page = 1;
  pageSize = 10;
  totalLength = 0;
  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'name',
      keyword: '',
    };
  }

  ngOnInit() {
    this.apiService.users(null, 1, 50000).then(value => {
      this.users = value.data;
    });
    this.loadData();
  }

  getUser(item: Group) {
    const creator = this.users.find((d) => d._id === item.creator);
    return creator && creator.pseudo ? creator.pseudo : '-';
  }

  exportData() {
    this.apiService.groups(this.filter, 1, 100000).then(d => {
      // tslint:disable-next-line:no-shadowed-variable no-unused-expression
      new ngxCsv(d.data.reverse().map((d) => {
        return {
          id: d._id,
          name: d.name,
          code: d.code,
          creator: d.creatorName,
          membres: d.membres.length,
          masked: d.masked,
        };
      }), 'groups-list', {
        fieldSeparator: ';',
        headers:  ['id', 'name', 'code', 'creator', 'membres', 'masked'],
      });
    });
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
