import { Component, OnInit } from '@angular/core';
import {BeforeMatch} from "@app/models/beforeMatch";
import {ApiService} from "@app/core/http/api.service";
import {ToastrService} from "ngx-toastr";
import * as moment from "moment";
import {LiveMatch} from "@app/models/liveMatch";

@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.component.html',
  styleUrls: ['./live-match.component.scss']
})
export class LiveMatchComponent implements OnInit {

  list: LiveMatch[] = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.apiService.liveMatchs().then(value => {
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format("D MMMM YYYY");
        return v;
      }).reverse();
    });
  }

}
