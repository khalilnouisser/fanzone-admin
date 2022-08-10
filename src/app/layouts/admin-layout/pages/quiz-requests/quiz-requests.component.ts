import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import {QuizRequest} from '@app/models/quizRequest';

@Component({
  selector: 'app-quiz-requests',
  templateUrl: './quiz-requests.component.html',
  styleUrls: ['./quiz-requests.component.scss']
})
export class QuizRequestsComponent implements OnInit {

  list: QuizRequest[] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.quizRequests().then(value => {
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

}
