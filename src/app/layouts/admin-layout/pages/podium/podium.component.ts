import { Component, OnInit } from '@angular/core';
import {User} from "@app/models/user";
import {ApiService} from "@app/core/http/api.service";
import {ToastrService} from "ngx-toastr";
import * as moment from "moment";

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent implements OnInit {

  list: User[] = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.apiService.users().then(value => {
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format("D MMMM YYYY");
        return v;
      });
      this.list.sort(function(a, b) {
        return b.total_score-a.total_score;
      });
    });
  }

}
