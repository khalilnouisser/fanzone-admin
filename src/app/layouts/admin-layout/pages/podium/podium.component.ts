import { Component, OnInit } from '@angular/core';
import {User} from '@app/models/user';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent extends GenericFilteringComponent implements OnInit {

  list: User[] = [];
  page = 1;
  pageSize = 100;
  totalLength = 0;

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'full_name,pseudo,email,type',
      keyword: ''
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
      this.list.sort(function(a, b) {
        return b.total_score - a.total_score;
      });
    });
  }

}
