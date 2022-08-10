import { Component, OnInit } from '@angular/core';
import {Quiz} from "@app/models/quiz";
import {ApiService} from "@app/core/http/api.service";

import * as moment from "moment";
import {QuizResponse} from "@app/models/quizResponse";

@Component({
  selector: 'app-quiz-responses',
  templateUrl: './quiz-responses.component.html',
  styleUrls: ['./quiz-responses.component.scss']
})
export class QuizResponsesComponent implements OnInit {

  list: QuizResponse[] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.quizResponses().then(value => {
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format("D MMMM YYYY");
        return v;
      });
    });
  }

}
