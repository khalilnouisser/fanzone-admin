import { Component, OnInit } from '@angular/core';
import {Team} from '@app/models/team';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {Player} from '@app/models/player';
import {League} from '@app/models/league';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {Fantazy} from '@app/models/fantazy';
import {ngxCsv} from 'ngx-csv';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent extends GenericFilteringComponent implements OnInit {

  list: Player[] = [];
  listTeams: Team[] = [];

  teamsQuery = '';
  filteredTeams: Team[] = [];

  listFantazies: Fantazy[] = [];
  listStates: String[] = ['is_completed', 'is_not_completed'];
  listPositions: String[] = ['DC', 'MD', 'MDF', 'AC', 'AG', 'AS', 'AD', 'AID', 'GK', 'MO', 'MG', 'MC', 'AIG'];

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'name,displayName,country',
      keyword: '',
      teamId: '',
      state: '',
      positionAbr: '',
    };
  }

  page = 1;
  pageSize = 10;
  totalLength = 0;

  ngOnInit() {
    this.loadData();
    this.apiService.teams(null, 1, 100000).then(value => {
      this.listTeams = value.data;
      this.onChangeQuery();
    });
    this.apiService.getFantazies().then((d) => {
      this.listFantazies = d.data;
    });
  }

  onChangeQuery() {
    this.filteredTeams = this.filterData(this.listTeams, this.teamsQuery);
  }

  getNoteAverage(player: Player) {
    if (player.notes.length === 0) {
      return '-';
    }
    return (player.notes.reduce((a, b) => a + b) / parseFloat(player.notes.length.toString())).toFixed(1);
  }

  exportData() {
    this.apiService.players(this.filter, 1, 1000000).then(d => {
      // tslint:disable-next-line:no-shadowed-variable no-unused-expression
      new ngxCsv(d.data.reverse().map((d) => {
        return {
          id: d._id,
          playerId: d.playerId,
          name: d.name,
          displayName: d.displayName,
          teamId: d.teamId,
          teamName: d.team ? d.team.name : '-',
          birthday: d.birthday,
          number: d.number,
          position: d.positionAbr,
          country: d.country,
          initialValue: d.initialValue,
          value: d.value,
          averageRating: this.getNoteAverage(d),
          fantazyBuy: this.getNumberOfHistoriesByType(d.playerId, 0),
          fantazySell: this.getNumberOfHistoriesByType(d.playerId, 1),
          age: this.getAge(d)
        };
      }), 'players-list', {
        fieldSeparator: ';',
        headers:  ['id', 'playerId', 'name', 'displayName', 'teamId', 'teamName', 'birthday', 'number',
          'position', 'country', 'initialValue', 'value', 'averageRating', 'fantazyBuy', 'fantazySell', 'age'],
      });
    });
  }

  getAge(player: Player) {
    try {
      const date: Date = new Date(player.birthday);
      const ageDifMs = (Date.now() - date.getTime());
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    } catch (e) {
      return '-';
    }
  }

  getNumberOfHistoriesByType(playerId: string, type: number) {
    console.log(this.listFantazies
      .map((v) => v.history)
      .flat());
    return this.listFantazies
      .map((v) => v.history)
      .flat()
      .filter((d) => d.playerId === playerId && d.type === type).length;
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
