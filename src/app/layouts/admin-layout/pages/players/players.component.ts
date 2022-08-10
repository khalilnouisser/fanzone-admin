import { Component, OnInit } from '@angular/core';
import {Team} from '@app/models/team';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {Player} from '@app/models/player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  list: Player[] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.players().then(value => {
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

}
