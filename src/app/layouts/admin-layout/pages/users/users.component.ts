import {Component, OnInit} from '@angular/core';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {User} from '@app/models/user';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {ngxCsv} from 'ngx-csv';
import Swal from 'sweetalert2';
import {Ticket} from '@app/models/ticket';

declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends GenericFilteringComponent implements OnInit {

  list: User[] = [];
  tickets: Ticket[] = [];
  listStates: String[] = ['is_completed', 'is_not_completed', 'not_validated'];
  listRoles = ['ADMIN', 'USER'];
  listStatus = [
    'Troll', 'Supporter', 'Fan', 'Fanatic', 'Ultra', 'Kapo'
  ];
  page = 1;
  pageSize = 10;
  totalLength = 0;

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: '_id,full_name,pseudo,email,type',
      keyword: '',
      type: '',
      state: '',
    };
  }

  getStatus(item) {
    switch (item.state) {
      // 0: active, 1: partial suspended, 2: defectively suspended
      case 1:
        return 'Suspendu temporairement jusuq\'à ' + moment(item.suspensionEndDate).format('DD/MM/YYYY');
      case 2:
        return 'Suspendu définitivement';
      default:
        return 'Active';
    }
  }

  getUserReports(concernedUser: User) {
    return this.list.length === 0 ? '-' +
      // tslint:disable-next-line:max-line-length
      '' : [...new Set(this.tickets.filter((d) => d.concernedUser != null && d.concernedUser._id === concernedUser._id).map((d) => d.user._id))].length;
  }

  ngOnInit() {
    this.apiService.tickets({}, 1, 100000).then(value => {
      this.tickets = value.data;
    });
    this.loadData();
  }

  alertUser(type: number, concernedUser: User) {
    const html = '<div class="input-group mb-3"><input id="swal-input1" placeholder="Message" class="form-control"></div>';
    const self = this;
    Swal.fire({
      title: 'Saisir le message d\'alert',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      showLoaderOnConfirm: true,
      html:
      html,
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
            $('#swal-input1').val(),
          ]);
        });
      },
    }).then(function (result) {
      const data: any = {
        type,
        message: result.value[0],
      };
      self.apiService.addAlertToUser(concernedUser._id, data).then((d) => {
        self.loadData();
      });
    });
  }

  partialSuspendUser(concernedUser: User) {
    const html = '<div class="input-group mb-3"><input id="swal-input1" placeholder="Date" type="date" class="form-control"></div>';
    const self = this;
    Swal.fire({
      title: 'Saisir la date de fin de la suspension',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      showLoaderOnConfirm: true,
      html: html,
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
            $('#swal-input1').val(),
          ]);
        });
      },
    }).then(function (result) {
      const date = moment(result.value[0]).toISOString();
      self.apiService.editUser(concernedUser._id, {
        state: 1,
        suspensionEndDate: date
      }).then((d) => {
        self.loadData();
      });
    });
  }

  defectivelySuspendUser(concernedUser: User) {
    Swal.fire({
      html: 'Êtes-vous sur de vouloir suspendre définitivement cet utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui',
      confirmButtonColor: 'red'
    }).then(data => {
      if (data.value) {
        this.apiService.editUser(concernedUser._id, {
          state: 2,
        }).then((d) => {
          this.loadData();
        });
      }
    });
  }

  cancelSuspension(concernedUser: User) {
    Swal.fire({
      html: 'Êtes-vous sur de vouloir annuler la suspension de cet utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui',
      confirmButtonColor: 'red'
    }).then(data => {
      if (data.value) {
        this.apiService.editUser(concernedUser._id, {
          state: 0,
        }).then((d) => {
          this.loadData();
        });
      }
    });
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
      new ngxCsv(d.data.reverse().map(v => {
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
        // tslint:disable-next-line:no-shadowed-variable
      }).map((  d) => {
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
          visibility: ['Invisible', 'Visible que pour les amis', 'Visible pour tous'][d.community_visibility],
          friends: d.friends.length,
          followers: d.stats.followers,
          total_score: d.total_score,
          last_connection_date: d.formated_last_connection_date,
          last_connection_days: d.last_connection_days,
          state: this.getUserStatus(d)
        };
      }), 'users-list', {
        fieldSeparator: ';',
        // tslint:disable-next-line:max-line-length
        headers: ['id', 'full_name', 'pseudo', 'email', 'language', 'type', 'favorite_team', 'national_favorite_team',
          'followedUsers', 'followedTeams', 'governorate', 'region', 'lastConnectionDate', 'status', 'previous_status',
          'status_change_date', 'knowledge', 'addiction', 'fidelity', 'contribution', 'reliability', 'visibility',
        'friends', 'followers', 'total_score', 'last_connection_date', 'last_connection_days', 'state'],
      });
    });
  }

}
