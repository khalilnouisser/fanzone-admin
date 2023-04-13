import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Rss} from '@app/models/rss';
import {League} from '@app/models/league';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '@app/core/http/api.service';
import Swal from 'sweetalert2';
import {Ticket} from '@app/models/ticket';
import {User} from '@app/models/user';
import {AuthenticationService, CredentialsService} from '@app/core';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {

  id: string;
  form: FormGroup;
  ticket: Ticket;
  loading = false;
  ticketStates: string[] = [];
  ticketStatesClass: string[] = [];
  ticketTypes: string[] = [];
  languages: any[] = [];
  users: User[] = [];
  list: Ticket[] = [];
  content = '';

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private credentialsService: CredentialsService) {
    this.getData();
  }

  getData() {
    this.ticketStates = this.apiService.ticketStates();
    this.ticketStatesClass = this.apiService.ticketStatesClass();
    this.ticketTypes = this.apiService.ticketTypes();
    this.apiService.users(null, 1, 50000).then(value => {
      this.users = value.data;
    });
  }

  addComment(): void {
    console.log(this.content);
    if (this.content.length > 0) {
      this.ticket.comments.push({
        user: this.credentialsService.credentials.user._id,
        content: this.content,
      });
      this.apiService.addTicketComment(this.ticket._id, this.content);
      this.content = '';
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      state: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
    this.apiService.tickets({}, 1, 100000).then(value => {
      this.list = value.data;
    });
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loading = true;
        this.apiService.ticketById(this.id).then(d => {
          this.ticket = d.data[0];
          this.form.patchValue(this.ticket);
          this.loading = false;
        }).catch(async e => {
          console.log(e);
        });
      }
    });
  }

  getUserName(user): String {
    const item: User = this.users.find((d) => d._id.toString() === user.toString());
    return item ? item.pseudo : '-';
  }

  toggleWallVisiblity() {
    this.ticket.concernedWall.masked = !(this.ticket.concernedWall.masked ?? false);
    this.apiService.editWall(this.ticket.concernedWall._id, {
      masked: this.ticket.concernedWall.masked
    });
  }

  toggleGroupVisiblity() {
    this.ticket.concernedGroup.masked = !(this.ticket.concernedGroup.masked ?? false);
    this.apiService.editGroup(this.ticket.concernedGroup._id, {
      masked: this.ticket.concernedGroup.masked
    });
  }

  submit() {
    this.apiService.editTicket(this.id, this.form.value).then(() => {
      Swal.fire({
        html: 'Ticket modifié avec succès',
        icon: 'success',
        timer: 2000,
        confirmButtonText: 'Fermer',
      });
    });
  }

  getWallReports(item: Ticket) {
    return this.list.length === 0 ? '-' +
      // tslint:disable-next-line:max-line-length
      '' : [...new Set(this.list.filter((d) => d.concernedWall != null && d.concernedWall.link === item.concernedWall.link).map((d) => d.user._id))].length;
  }

  getUserReports(item: Ticket) {
    return this.list.length === 0 ? '-' +
      // tslint:disable-next-line:max-line-length
      '' : [...new Set(this.list.filter((d) => d.concernedUser != null && d.concernedUser._id === item.concernedUser._id).map((d) => d.user._id))].length;
  }

  getGroupReports(item: Ticket) {
    return this.list.length === 0 ? '-' +
      // tslint:disable-next-line:max-line-length
      '' : [...new Set(this.list.filter((d) => d.concernedGroup != null && d.concernedGroup._id === item.concernedGroup._id).map((d) => d.user._id))].length;
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

  alertUser(type: number) {
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
      const data : any = {
        type,
        message: result.value[0],
      };
      if (type === 1) {
        data.concernedGroup = self.ticket.concernedGroup._id;
        data.concernedGroupName = self.ticket.concernedGroup.name;
      }
      self.apiService.addAlertToUser(self.ticket.concernedUser._id, data).then((d) => {
        self.ticket.concernedUser = d.user;
      });
    });
  }

  partialSuspendUser() {
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
      self.apiService.editUser(self.ticket.concernedUser._id, {
        state: 1,
        suspensionEndDate: date
      }).then((d) => {
        self.ticket.concernedUser = d.user;
      });
    });
  }

  defectivelySuspendUser() {
    Swal.fire({
      html: 'Êtes-vous sur de vouloir suspendre définitivement cet utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui',
      confirmButtonColor: 'red'
    }).then(data => {
      if (data.value) {
        this.apiService.editUser(this.ticket.concernedUser._id, {
          state: 2,
        }).then((d) => {
          this.ticket.concernedUser = d.user;
        });
      }
    });
  }

  cancelSuspension() {
    Swal.fire({
      html: 'Êtes-vous sur de vouloir annuler la suspension de cet utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui',
      confirmButtonColor: 'red'
    }).then(data => {
      if (data.value) {
        this.apiService.editUser(this.ticket.concernedUser._id, {
          state: 0,
        }).then((d) => {
          this.ticket.concernedUser = d.user;
        });
      }
    });
  }

  partialSuspendGroup() {
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
      self.apiService.editGroup(self.ticket.concernedGroup._id, {
        state: 1,
        suspensionEndDate: date
      }).then((d) => {
        self.ticket.concernedGroup = d.item;
      });
    });
  }

  defectivelySuspendGroup() {
    Swal.fire({
      html: 'Êtes-vous sur de vouloir suspendre définitivement ce groupe ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui',
      confirmButtonColor: 'red'
    }).then(data => {
      if (data.value) {
        this.apiService.editGroup(this.ticket.concernedGroup._id, {
          state: 2,
        }).then((d) => {
          this.ticket.concernedGroup = d.item;
        });
      }
    });
  }

  cancelGroupSuspension() {
    Swal.fire({
      html: 'Êtes-vous sur de vouloir annuler la suspension de ce groupe ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui',
      confirmButtonColor: 'red'
    }).then(data => {
      if (data.value) {
        this.apiService.editGroup(this.ticket.concernedGroup._id, {
          state: 0,
        }).then((d) => {
          this.ticket.concernedGroup = d.item;
        });
      }
    });
  }

}
