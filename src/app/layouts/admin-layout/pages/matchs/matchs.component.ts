import { Component, OnInit } from '@angular/core';
import {LiveMatch} from '@app/models/liveMatch';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {League} from '@app/models/league';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Match} from '@app/models/match';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.scss']
})
export class MatchsComponent extends GenericFilteringComponent implements OnInit {

  list: Match[] = [];
  model: NgbDateStruct;

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'homeName,awayName,round,leagueName,leagueShortName',
      keyword: '',
    };
  }

  ngOnInit() {
    const date = new Date();
    this.model = {
      'year': date.getFullYear(),
      'month': date.getMonth() + 1,
      'day': date.getDate()
    };
    this.getData();
  }

  getData() {
    this.apiService.matchs(this.filter, this.adaptNumber(this.model.month) + '/' +
      this.adaptNumber(this.model.day) + '/' +
      this.model.year).then(value => {
      this.list = value.data.map(v => {
        v.formated_date = moment((v.matchTime || 0) * 1000).format('D MMMM YYYY');
        return v;
      }).reverse();
    });
  }

  adaptNumber(x) {
    return x > 9 ? x.toString() : '0' + x;
  }

}
