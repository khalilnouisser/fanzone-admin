import {Component, OnInit} from '@angular/core';
import {League} from '@app/models/league';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {Team} from '@app/models/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  list: Team[] = [];
  page = 1;
  pageSize = 20;
  totalLength = 100;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.list = [];
    this.apiService.teams(this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

}
