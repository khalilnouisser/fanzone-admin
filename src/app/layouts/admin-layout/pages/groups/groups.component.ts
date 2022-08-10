import { Component, OnInit } from '@angular/core';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import {Group} from '@app/models/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  list: Group[] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.groups().then(value => {
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

}
