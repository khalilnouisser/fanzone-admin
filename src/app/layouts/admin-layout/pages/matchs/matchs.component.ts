import { Component, OnInit } from '@angular/core';
import {LiveMatch} from '@app/models/liveMatch';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {League} from '@app/models/league';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Match} from '@app/models/match';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {ngxCsv} from 'ngx-csv';
import {Quiz} from '@app/models/quiz';

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

  exportData() {
    this.apiService.matchs(this.filter, this.adaptNumber(this.model.month) + '/' +
      this.adaptNumber(this.model.day) + '/' +
      this.model.year).then(d => {
      // tslint:disable-next-line:no-shadowed-variable no-unused-expression
      new ngxCsv(d.data.reverse().map((d) => {
        return {
          id: d._id,
          matchId: d.matchId ?? '',
          homeName: d.homeName,
          homeId: d.homeId,
          awayName: d.awayName,
          awayId: d.awayId,
          homeScore: d.homeScore,
          awayScore: d.awayScore,
          leagueName: d.leagueName,
          leagueId: d.leagueId,
          round: d.round,
          matchTime: d.matchTime,
          liveRatings: d.liveRatings.length,
          beforeMatchPlayes: d.beforeMatchPlayes.length,
          pronoVotes: d.prono.numberHome + d.prono.numberDraw + d.prono.numberAway - 3,
          homeQuote: this.getCote(d, d.prono.numberHome),
          drawQuote: this.getCote(d, d.prono.numberDraw),
          awayQuote: this.getCote(d, d.prono.numberAway),
        };
      }), 'matchs-' + this.adaptNumber(this.model.month) + '-' + this.adaptNumber(this.model.day) + '-' + this.model.year + '-list', {
        fieldSeparator: ';',
        headers: ['id', 'matchId', 'homeName', 'homeId', 'awayName', 'awayId', 'homeScore', 'awayScore', 'leagueName', 'leagueId', 'round', 'matchTime', 'liveRatings', 'beforeMatchPlayes', 'pronoVotes', 'homeQuote', 'drawQuote', 'awayQuote'],
      });
    });
  }

  getCote(item: Match, div) {
    return ((item.prono.numberDraw + item.prono.numberHome + item.prono.numberAway) / parseFloat(div.toString())).toFixed(1);
  }

  adaptNumber(x) {
    return x > 9 ? x.toString() : '0' + x;
  }

}
