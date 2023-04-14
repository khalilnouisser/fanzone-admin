import {Component, OnInit} from '@angular/core';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {User} from '@app/models/user';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {ngxCsv} from 'ngx-csv';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends GenericFilteringComponent implements OnInit {

  list: User[] = [];
  listStates: String[] = ['is_completed', 'is_not_completed', 'not_validated'];
  listRoles = ['ADMIN', 'USER'];
  listStatus = [
    'Troll', 'Footix', 'Footeux', 'Fan', 'Ultra', 'Kapo'
  ];
  page = 1;
  pageSize = 10;
  totalLength = 0;

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'full_name,pseudo,email,type',
      keyword: '',
      type: '',
      state: '',
    };
  }

  ngOnInit() {
    this.loadData();
  }

  pageChange(ev) {
    this.page = ev;
    this.loadData();
  }

  getUserStatus(user: User) {
    if (user.status === 0) {
      return 'Mail pas confirmé';
    } else if (
      user.favorite_team &&
      user.favorite_team.teamId &&
      user.favorite_euro_team &&
      user.favorite_euro_team.teamId &&
      user.language &&
      user.governorate &&
      user.region &&
      user.full_name &&
      user.pseudo
    ) {
      return '100% OK';
    } else {
      return 'Incomplet';
    }
  }

  loadData() {
    this.list = [];
    this.apiService.users(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        v.formated_last_connection_date = v.lastConnectionDate ? moment(v.lastConnectionDate).format('D MMMM YYYY HH:mm:ss') : '-';
        const date1 = new Date();
        const date2 = moment(v.lastConnectionDate).toDate();

        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        v.last_connection_days = diffDays;
        // tslint:disable-next-line:max-line-length
        v.status_level_change_date_formated = v.status_level_change_date ? moment(v.status_level_change_date).format('D MMMM YYYY HH:mm:ss') : '-';
        return v;
      });
    });
  }

  exportData() {
    this.apiService.users(this.filter, 1, 100000).then(d => {
      // tslint:disable-next-line:no-shadowed-variable no-unused-expression
      new ngxCsv(d.data.reverse().map((d) => {
        return {
          id: d._id,
          full_name: d.full_name,
          pseudo: d.pseudo,
          email: d.email,
          language: d.language,
          type: d.type,
          favorite_team: d.favorite_team?.name ?? '-',
          national_favorite_team: d.favorite_euro_team?.name ?? '-',
          followedUsers: d.followedUsers.length,
          followedTeams: d.followedTeams.length,
          governorate: d.governorate?.name ?? '-',
          region: d.region?.name ?? '-',
          lastConnectionDate: d.lastConnectionDate ?? '-',
          status: this.listStatus[d.status_level],
          previous_status: this.listStatus[d.previous_status_level],
          status_change_date: d.status_level_change_date,
          knowledge: d.stats.knowledge,
          addiction: d.stats.addiction,
          fidelity: d.stats.fidelity,
          contribution: d.stats.contribution,
          reliability: d.stats.reliability,
        };
      }), 'users-list', {
        fieldSeparator: ';',
        // tslint:disable-next-line:max-line-length
        headers: ['id', 'full_name', 'pseudo', 'email', 'language', 'type', 'favorite_team', 'national_favorite_team', 'followedUsers', 'followedTeams', 'governorate', 'region', 'lastConnectionDate', 'status', 'previous_status', 'status_change_date', 'knowledge', 'addiction', 'fidelity', 'contribution', 'reliability'],
      });
    });
  }

}
