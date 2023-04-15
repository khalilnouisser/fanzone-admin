import { Component, OnInit } from '@angular/core';
import {LiveMatch} from '@app/models/liveMatch';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {League} from '@app/models/league';
import {NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
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

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  hoveredDate: NgbDate | null = null;
  selectedDate = '';

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.afterDataChanges();
    this.getData();
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  constructor(private apiService: ApiService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    super();
    this.filter = {
      attributes: 'homeName,awayName,round,leagueName,leagueShortName',
      keyword: '',
    };
  }

  ngOnInit() {
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getToday();
    this.afterDataChanges();
    this.getData();
  }

  getDateAPI(date: NgbDate) {
    return this.adaptNumber(date.month) + '/' +
      this.adaptNumber(date.day) + '/' +
      date.year;
  }

  getDate(date: NgbDate) {
    return this.adaptNumber(date.day) + '/' +
      this.adaptNumber(date.month) + '/' +
      date.year;
  }

  afterDataChanges() {
    if (this.fromDate.equals(this.toDate)) {
      this.selectedDate = this.getDate(this.fromDate);
    } else {
      this.selectedDate = this.getDate(this.fromDate) + ' - ' + this.getDate(this.toDate);
    }
  }

  getData() {
    this.apiService.matchs(this.filter, this.getDateAPI(this.fromDate), this.getDateAPI(this.toDate)).then(value => {
      this.list = value.data.map(v => {
        v.formated_date = moment((v.matchTime || 0) * 1000).format('D MMMM YYYY');
        return v;
      }).reverse();
    });
  }

  exportData() {
    this.apiService.matchs(this.filter, this.getDateAPI(this.fromDate), this.getDateAPI(this.toDate)).then(d => {
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
          compoHomeFav: this.getCompoStats(d, true, true),
          compoHomeElse: this.getCompoStats(d, true, false),
          compoAwayFav: this.getCompoStats(d, false, true),
          compoAwayElse: this.getCompoStats(d, false, false),
          ratingHomeFav: this.getRatingStats(d, true, true),
          ratingHomeElse: this.getRatingStats(d, true, false),
          ratingAwayFav: this.getRatingStats(d, false, true),
          ratingAwayElse: this.getRatingStats(d, false, false),
          pronoFav: this.getPronoStats(d, true),
          pronoElse: this.getPronoStats(d, false),
        };
      }), 'matchs-' + this.adaptNumber(this.model.month) + '-' + this.adaptNumber(this.model.day) + '-' + this.model.year + '-list', {
        fieldSeparator: ';',
        headers: ['id', 'matchId', 'homeName', 'homeId', 'awayName', 'awayId', 'homeScore', 'awayScore', 'leagueName', 'leagueId', 'round', 'matchTime', 'liveRatings', 'beforeMatchPlayes', 'pronoVotes', 'homeQuote', 'drawQuote', 'awayQuote', 'compoHomeFav', 'compoHomeElse', 'compoAwayFav', 'compoAwayElse', 'ratingHomeFav', 'ratingHomeElse', 'ratingAwayFav', 'ratingAwayElse', 'pronoFav', 'pronoElse'],
      });
    });
  }

  getCote(item: Match, div) {
    return ((item.prono.numberDraw + item.prono.numberHome + item.prono.numberAway) / parseFloat(div.toString())).toFixed(1);
  }

  adaptNumber(x) {
    return x > 9 ? x.toString() : '0' + x;
  }

  getCompoStats(match: Match, isHome: boolean, isFav: boolean) {
    const teamId = isHome ? match.homeId : match.awayId;
    const compoList = match.beforeMatchPlayes.map((d) => {
      d.compo = isHome ? d.homeBetComposition : d.awayBetComposition;
      return d;
    }).filter((d) => {
      const teamCondition = !isFav || (isFav && (d.userId.favorite_team?.teamId ?? '') === teamId);
      return d.compo != null && (d.compo.lineups ?? []).length > 0 && d.compo.formation && teamCondition;
    });
    return compoList.length;
  }

  getRatingStats(match: Match, isHome: boolean, isFav: boolean) {
    const teamId = isHome ? match.homeId : match.awayId;
    const liveRatingList = match.liveRatings.filter((d) => {
      const teamCondition = !isFav || (isFav && (d.userId.favorite_team?.teamId ?? '') === teamId);
      return (isHome ? d.isHomeValidated : d.isAwayValidated) && teamCondition;
    });
    return liveRatingList.length;
  }

  getPronoStats(match: Match, isFav: boolean) {
    const compoList = match.beforeMatchPlayes.filter((d) => {
      return !isFav || (isFav && [match.homeId, match.awayId].indexOf((d.userId.favorite_team?.teamId ?? '')) !== -1);
    });
    return compoList.length;
  }

}
