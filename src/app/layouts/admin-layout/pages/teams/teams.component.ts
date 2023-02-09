import {Component, OnInit} from '@angular/core';
import {League} from '@app/models/league';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {Team} from '@app/models/team';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent extends GenericFilteringComponent implements OnInit {

  list: Team[] = [];
  listLeagues: League[] = [];
  listStates: String[] = ['is_completed', 'is_not_completed'];
  page = 1;
  pageSize = 10;
  totalLength = 100;

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'name,displayName,address,coach',
      keyword: '',
      leagueId: '',
      state: '',
    };
  }

  get leaguesListName() {
    return this.listLeagues.map((v) => v.name);
  }

  ngOnInit() {
    this.loadData();
    this.apiService.leagues(null, 1, 100).then(value => {
      this.listLeagues = value.data.filter((v) => v.type !== 2);
    });
  }

  pageChange(ev) {
    this.page = ev;
    this.loadData();
  }

  loadData() {
    this.list = [];
    this.apiService.teams(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

}
