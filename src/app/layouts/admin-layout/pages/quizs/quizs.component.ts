import { Component, OnInit } from '@angular/core';
import {Group} from "@app/models/group";
import {ApiService} from "@app/core/http/api.service";
import {ToastrService} from "ngx-toastr";
import * as moment from "moment";
import {Quiz} from "@app/models/quiz";

@Component({
  selector: 'app-quizs',
  templateUrl: './quizs.component.html',
  styleUrls: ['./quizs.component.scss']
})
export class QuizsComponent implements OnInit {

  list: Quiz[] = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.apiService.quizs().then(value => {
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format("D MMMM YYYY");
        return v;
      });
    });
  }
}
