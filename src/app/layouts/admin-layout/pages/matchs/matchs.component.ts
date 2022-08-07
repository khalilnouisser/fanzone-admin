import { Component, OnInit } from '@angular/core';
import {LiveMatch} from '@app/models/liveMatch';
import {ApiService} from '@app/core/http/api.service';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';
import {League} from '@app/models/league';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Match} from '@app/models/match';

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.scss']
})
export class MatchsComponent implements OnInit {

  list: Match[] = [];
  model: NgbDateStruct;

  constructor(private apiService: ApiService, private toastr: ToastrService) {
  }

  ngOnInit() {
    let date = new Date();
    this.model = {
      'year': date.getFullYear(),
      'month': date.getMonth() + 1,
      'day': date.getDate()
    };
    this.getData();
  }

  getData() {
    this.apiService.matchs(this.adaptNumber(this.model.month) + '/' + this.adaptNumber(this.model.day) + '/' + this.model.year).then(value => {
      this.list = value.data.map(v => {
        v.formated_date = moment((v.matchTime || 0) * 1000).format('D MMMM YYYY');
        return v;
      }).reverse();
    });
  }

  adaptNumber(x) {
    return x > 9 ? x.toString() : '0' + x;
  }

}
