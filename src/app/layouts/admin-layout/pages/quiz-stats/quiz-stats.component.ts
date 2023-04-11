import { Component, OnInit } from '@angular/core';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {QuizResponse} from '@app/models/quizResponse';
import {Quiz} from '@app/models/quiz';
import {User} from '@app/models/user';
import {League} from '@app/models/league';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-quiz-stats',
  templateUrl: './quiz-stats.component.html',
  styleUrls: ['./quiz-stats.component.scss']
})
export class QuizStatsComponent  extends GenericFilteringComponent implements OnInit {

  list: QuizResponse[] = [];
  quizzes: Quiz[] = [];
  users: User[] = [];
  leagues: League[] = [];

  userQuery = '';
  filteredUsers: User[] = [];

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
    this.apiService.leagues(null, 1, 100).then(d => {
      this.leagues = d.data;
    });
    this.apiService.quizs(null, 1, 100).then(value => {
      this.quizzes = value.data;
    });
    this.apiService.users(null, 1, 50000).then(value => {
      this.users = value.data;
      this.onChangeQuery();
    });
    this.apiService.quizResponses(null, 1, 10000).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

  getQuiz(id: string) {
    return this.quizzes.find(l => l._id === id) ?? null;
  }

  getUser(id: string) {
    return this.users.find(l => l._id === id) ?? null;
  }

  getUserPlayedQuizes(list: QuizResponse[], user: User) {
    return list.filter((d) => d.userId === user._id);
  }

  getQuizzesTypes() {
    return [...new Set(this.quizzes.map((v) => v.type))];
  }

  getQuizzesTitle(list: Quiz[]) {
    return [...new Set(list.map((v) => v.title))];
  }

  getListByType(type: number) {
    return this.quizzes.filter((v) => v.type === type);
  }

  getListByTitleAndType(title: string, type: number) {
    return this.quizzes.filter((v) => v.type === type && v.title === title);
  }

  getResponsesByTitleAndType(title: string, type: number) {
    const quizzes: Quiz[] = this.getListByTitleAndType(title, type);
    return this.list.filter((v) => quizzes.map((d) => d._id).indexOf(v.quiz) !== -1);
  }

  getUserAverage(list: QuizResponse[], item: User) {
    const responses = list.filter((v) => v.userId === item._id);
    if (responses.length === 0) {
      return '-';
    }
    return ((responses.filter((v) => {
      return v.answers.length === v.numberMaxAnswers;
    }).length / parseFloat(responses.length.toString())) * 100).toFixed(2) + '%';
  }

  getLeagueImage(item: Quiz) {
    if (this.leagues && item.leagueId) {
      return this.leagues.find(l => l.leagueId === item.leagueId)?.logo ?? null;
    }
    return null;
  }

  onChangeQuery() {
    this.filteredUsers = this.filterData(this.users, this.userQuery);
  }

  get selectedUsers() {
    if (this.filter.userId && this.filter.userId.length > 0) {
      return this.users.filter((d) => this.filter.userId.split(',').indexOf(d._id) !== -1);
    }
    return this.users;
  }

}
