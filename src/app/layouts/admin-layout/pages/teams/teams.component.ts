import {Component, OnInit} from '@angular/core';
import {League} from '@app/models/league';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {Team} from '@app/models/team';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {Quiz} from '@app/models/quiz';
import {ngxCsv} from 'ngx-csv';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent extends GenericFilteringComponent implements OnInit {

  list: Team[] = [];
  listLeagues: League[] = [];

  leagueQuery = '';
  filteredLeagues: League[] = [];

  listStates: String[] = ['is_completed', 'is_not_completed'];
  page = 1;
  pageSize = 10;
  totalLength = 0;

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'name,displayName,address,coach,nameSynonyms',
      keyword: '',
      leagueId: '',
      state: '',
    };
  }

  onChangeQuery() {
    this.filteredLeagues = this.filterData(this.listLeagues, this.leagueQuery);
  }

  getLeagueImage(item: Team) {
    if (item.leagueId) {
      return this.listLeagues.find(l => l.leagueId === item.leagueId)?.logo ?? null;
    }
    return null;
  }


  get leaguesListName() {
    return this.listLeagues.map((v) => v.name);
  }

  componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  exportData() {
    this.apiService.teams(this.filter, 1, 100000).then(d => {
      // tslint:disable-next-line:no-shadowed-variable no-unused-expression
      new ngxCsv(d.data.reverse().map((d) => {
        return {
          id: d._id,
          teamId: d.teamId,
          name: d.name,
          displayName: d.displayName,
          leagueId: d.leagueId,
          logo: d.logo,
          coach: d.coach,
          color1: d.color1,
          color2: d.color2,
          color3: d.color3,
          nameSynonyms: d.nameSynonyms,
          foundingDate: d.foundingDate,
        };
      }), 'teams-list', {
        fieldSeparator: ';',
        headers: ['id', 'teamId', 'name', 'displayName', 'leagueId', 'logo', 'coach', 'color1', 'color2', 'color3', 'nameSynonyms', 'foundingDate'],
      });
    });
  }

  colorToHex(color) {
    if (!color) {
      return 'gray';
    }
    const splited = color.split(',');
    const r = splited.length > 0 ? +splited[0] : 0;
    const g = splited.length > 1 ? +splited[1] : 0;
    const b = splited.length > 2 ? +splited[2] : 0;
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  ngOnInit() {
    this.loadData();
    this.apiService.leagues(null, 1, 100).then(value => {
      this.listLeagues = value.data.filter((v) => v.type !== 2);
      this.onChangeQuery();
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
