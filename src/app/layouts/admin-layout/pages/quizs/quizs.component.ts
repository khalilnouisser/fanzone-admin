import { Component, OnInit } from '@angular/core';
import {Group} from '@app/models/group';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {Quiz} from '@app/models/quiz';
import {League} from '@app/models/league';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {Rss} from '@app/models/rss';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quizs',
  templateUrl: './quizs.component.html',
  styleUrls: ['./quizs.component.scss']
})
export class QuizsComponent extends GenericFilteringComponent implements OnInit {

  list: Quiz[] = [];
  leagues: League[] = [];
  listTypes: String[] = [
    'most_scored_player',
    'most_assists_player',
    'best_target_player',
    'best_rating_player',
    'most_pass_player',
    'most_played_player',
    'most_appearance_player',
    'most_fouls_player',
    'most_yellow_cards_player',
    'most_red_cards_player'
  ];

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'title',
      keyword: '',
      title: '',
      leagueId: ''
    };
  }

  page = 1;
  pageSize = 10;
  totalLength = 100;

  ngOnInit() {
    this.loadData();
    this.apiService.leagues(null, 1, 100).then(d => {
      this.leagues = d.data;
    });
  }

  generateQuiz() {
    this.apiService.addQuiz({}).then(() => {
      Swal.fire({
        html: 'Quiz créé avec succès',
        icon: 'success',
        timer: 2000,
        confirmButtonText: 'Fermer',
      });
      this.loadData();
    });
  }

  get leaguesListName() {
    return this.leagues.map((v) => v.name);
  }

  pageChange(ev) {
    this.page = ev;
    this.loadData();
  }

  loadData() {
    this.list = [];
    this.apiService.quizs(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

  getLeagueImage(item: Quiz) {
    if (this.leagues && item.leagueId) {
      return this.leagues.find(l => l.leagueId === item.leagueId)?.logo ?? null;
    }
    return null;
  }

}
