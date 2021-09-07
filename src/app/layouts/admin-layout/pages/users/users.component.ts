import { Component, OnInit } from '@angular/core';
import {ApiService} from "@app/core/http/api.service";
import {ToastrService} from "ngx-toastr";
import * as moment from "moment";
import {User} from "@app/models/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  list: User[] = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.apiService.users().then(value => {
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format("D MMMM YYYY");
        return v;
      });
    });
  }

}
