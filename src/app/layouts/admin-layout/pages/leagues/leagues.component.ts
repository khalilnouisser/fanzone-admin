import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {League} from '@app/models/league';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {ngxCsv} from 'ngx-csv';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss']
})
export class LeaguesComponent extends GenericFilteringComponent implements OnInit {

  list: League[] = [];
  page = 1;
  pageSize = 10;
  totalLength = 0;

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'name,shortName,subLeagueName,country,leagueId',
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

  exportData() {
    this.apiService.leagues(this.filter, 1, 100000).then(d => {
      // tslint:disable-next-line:no-shadowed-variable no-unused-expression
      new ngxCsv(d.data.reverse().map((d) => {
        return {
          id: d._id,
          leagueId: d.leagueId,
          name: d.name,
          shortName: d.shortName,
          currentRound: d.currentRound,
          totalRound: d.totalRound,
          teams: d.teams.length,
          currentSeason: d.currentSeason,
          coefficient: d.coefficient,
        };
      }), 'leagues-list', {
        fieldSeparator: ';',
        headers:  ['id', 'leagueId', 'name', 'shortName', 'currentRound', 'totalRound', 'teams', 'currentSeason', 'coefficient'],
      });
    });
  }

  loadData() {
    this.list = [];
    this.apiService.leagues(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

}
