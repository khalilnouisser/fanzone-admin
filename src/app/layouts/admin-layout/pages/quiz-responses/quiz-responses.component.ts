
import { Component, OnInit } from '@angular/core';
import {Quiz} from '@app/models/quiz';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {QuizResponse} from '@app/models/quizResponse';
import {League} from '@app/models/league';
import { User } from '@app/models/user';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';

@Component({
  selector: 'app-quiz-responses',
  templateUrl: './quiz-responses.component.html',
  styleUrls: ['./quiz-responses.component.scss']
})
export class QuizResponsesComponent extends GenericFilteringComponent implements OnInit {

  list: QuizResponse[] = [];
  quizzes: Quiz[] = [];
  users: User[] = [];
  leagues: League[] = [];

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'full_name,pseudo,email,type',
      keyword: '',
      userId: '',
      quiz: '',
    };
  }

  page = 1;
  pageSize = 10;
  totalLength = 0;

  getName(list) {
    return list.map((v) => v.name);
  }

  getTitle(list) {
    return list.map((v) => v.title);
  }

  ngOnInit() {
    this.loadData();
    this.apiService.leagues(null, 1, 100).then(d => {
      this.leagues = d.data;
    });
    this.apiService.quizs(null, 1, 100).then(value => {
      this.quizzes = value.data;
    });
    this.apiService.users(null, 1, 500).then(value => {
      this.users = value.data;
    });
  }

  pageChange(ev) {
    this.page = ev;
    this.loadData();
  }

  getQuiz(id: string) {
    return this.quizzes.find(l => l._id === id) ?? null;
  }

  getUser(id: string) {
    return this.users.find(l => l._id === id) ?? null;
  }

  getLeagueImage(item: Quiz) {
    if (this.leagues && item.leagueId) {
      return this.leagues.find(l => l.leagueId === item.leagueId)?.logo ?? null;
    }
    return null;
  }

  loadData() {
    this.list = [];
    this.apiService.quizResponses(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

}
