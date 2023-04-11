import { Component, OnInit } from '@angular/core';
import {Group} from '@app/models/group';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {Quiz} from '@app/models/quiz';
import {League} from '@app/models/league';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {Rss} from '@app/models/rss';
import Swal from 'sweetalert2';
import {QuizResponse} from '@app/models/quizResponse';
import {ngxCsv} from 'ngx-csv';
import { Team } from '@app/models/team';

@Component({
  selector: 'app-quizs',
  templateUrl: './quizs.component.html',
  styleUrls: ['./quizs.component.scss']
})
export class QuizsComponent extends GenericFilteringComponent implements OnInit {

  list: Quiz[] = [];
  listResponses: QuizResponse[] = [];
  leagues: League[] = [];
  teams: Team[] = [];

  leagueQuery = '';
  filteredLeagues: League[] = [];

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
  totalLength = 0;

  onChangeQuery() {
    this.filteredLeagues = this.filterData(this.leagues, this.leagueQuery);
  }

  getTitle(item: Quiz) {
    const round = item.round;
    const season = item.season;
    const team = this.getTeamName(item);
    const league = this.getLeagueName(item);

    switch (item.title) {
      case 'most_scored_player':
        return `Qui est le joueur qui a marqué plus de buts de ${league}, saison ${season} ?`;
      case 'most_assists_player':
        return `Qui est le joueur qui a fait plus d'assists de ${league}, saison ${season} ?`;
      case 'best_target_player':
        return `Qui est le meilleur cadreur de ${league}, saison ${season} ?`;
      case 'best_rating_player':
        return `Qui est le joueur le plus noté de ${league}, saison ${season} ?`;
      case 'most_pass_player':
        return `Qui est le meilleur passeur de ${league}, saison ${season} ?`;
      case 'most_played_player':
        return `Qui est le joueur qui a joué plus de temps de ${league}, saison ${season} ?`;
      case 'most_appearance_player':
        return `Qui est le joueur qui a joué le plus de matches de ${league}, saison ${season} ?`;
      case 'most_fouls_player':
        return `Qui est le joueur qui a fait plus de fautes de ${league}, saison ${season} ?`;
      case 'most_yellow_cards_player':
        return `Qui est le joueur qui a plus de carton jaune de ${league}, saison ${season} ?`;
      case 'most_red_cards_player':
        return `Qui est le joueur qui a plus de carton rouge de ${league}, saison ${season} ?`;
      case 'xi_team':
        return `Quel était le XI de départ de ${team} pour la journée ${round} de ${league} saison ${season} ?`;
      case 'top_goals':
        return `Quels étaient les 10 meilleurs buteurs de ${league}, saison ${season} ?`;
      case 'top_assists':
        return `Quels étaient les 10 meilleurs passeurs de ${league}, saison ${season} ?`;
      default:
        return item.title;
    }
  }

  ngOnInit() {
    this.loadData();
    this.apiService.leagues(null, 1, 100).then(d => {
      this.leagues = d.data;
      this.onChangeQuery();
    });
    this.apiService.teams(null, 1, 100000).then(value => {
      this.teams = value.data;
    });
    this.apiService.quizResponses(null, 1, 10000).then(value => {
      this.listResponses = value.data;
    });
  }

  getAverage(item: Quiz) {
    const responses = this.listResponses.filter((v) => v.quiz === item._id);
    if (responses.length === 0) {
      return '-';
    }
    return ((responses.filter((v) => {
      return v.answers.length === v.numberMaxAnswers;
    }).length / parseFloat(responses.length.toString())) * 100).toFixed(2) + '%';
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

  exportData() {
    this.apiService.quizs(this.filter, this.page, 100000).then(d => {
      // tslint:disable-next-line:no-shadowed-variable no-unused-expression
      new ngxCsv(d.data.reverse().map((d) => {
        return {
          id: d._id,
          title: d.title,
          type: d.type,
          leagueId: d.leagueId,
          answers: d.answers.length,
        };
      }), 'quizs-list', {
        fieldSeparator: ';',
        headers: ['id', 'title', 'type', 'leagueId', 'answers'],
      });
    });
  }

  getLeagueImage(item: Quiz) {
    if (this.leagues && item.leagueId) {
      return this.leagues.find(l => l.leagueId === item.leagueId)?.logo ?? null;
    }
    return null;
  }

  getLeagueName(item: Quiz) {
    if (this.leagues && item.leagueId) {
      return this.leagues.find(l => l.leagueId === item.leagueId)?.name ?? '-';
    }
    return '-';
  }

  getTeamImage(item: Quiz) {
    if (this.teams && item.teamId) {
      return this.teams.find(l => l.teamId === item.teamId)?.logo ?? null;
    }
    return null;
  }

  getTeamName(item: Quiz) {
    if (this.teams && item.teamId) {
      return this.teams.find(l => l.teamId === item.teamId)?.name ?? '-';
    }
    return '-';
  }

}
