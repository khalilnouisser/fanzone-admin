import { Component, OnInit } from '@angular/core';
import {Team} from "@app/models/team";
import {ApiService} from "@app/core/http/api.service";
import {ToastrService} from "ngx-toastr";
import * as moment from "moment";
import {BeforeMatch} from "@app/models/beforeMatch";

@Component({
  selector: 'app-before-match',
  templateUrl: './before-match.component.html',
  styleUrls: ['./before-match.component.scss']
})
export class BeforeMatchComponent implements OnInit {

  list: BeforeMatch[] = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.apiService.beforeMatchs().then(value => {
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format("D MMMM YYYY");
        return v;
      }).reverse();
    });
  }

}
