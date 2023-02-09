import { Component, OnInit } from '@angular/core';
import {Team} from '@app/models/team';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {Player} from '@app/models/player';
import {League} from '@app/models/league';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent extends GenericFilteringComponent implements OnInit {

  list: Player[] = [];
  listTeams: Team[] = [];
  listStates: String[] = ['is_completed', 'is_not_completed'];
  listPositions: String[] = ['DC', 'MD', 'MDF', 'AC', 'AG', 'AS', 'AD', 'AID', 'GK', 'MO', 'MG', 'MC', 'AIG'];

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'name,displayName',
      keyword: '',
      teamId: '',
      state: '',
      positionAbr: '',
    };
  }

  page = 1;
  pageSize = 10;
  totalLength = 100;

  ngOnInit() {
    this.loadData();
    this.apiService.teams(null, 1, 100000).then(value => {
      this.listTeams = value.data;
    });
  }

  get teamsListName() {
    return this.listTeams.map((v) => v.name);
  }

  pageChange(ev) {
    this.page = ev;
    this.loadData();
  }

  loadData() {
    this.list = [];
    this.apiService.players(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

}
