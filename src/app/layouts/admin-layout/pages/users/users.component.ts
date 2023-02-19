import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {User} from '@app/models/user';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends GenericFilteringComponent implements OnInit {

  list: User[] = [];
  listStates: String[] = ['is_completed', 'is_not_completed'];
  listRoles = ['ADMIN', 'USER'];
  page = 1;
  pageSize = 10;
  totalLength = 0;

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'full_name,pseudo,email,type',
      keyword: '',
      type: '',
      state: '',
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
    this.apiService.users(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

}
