import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Rss} from '@app/models/rss';
import {League} from '@app/models/league';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '@app/core/http/api.service';
import Swal from 'sweetalert2';
import { Ticket } from '@app/models/ticket';
import {User} from '@app/models/user';
import {AuthenticationService, CredentialsService} from '@app/core';

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
  content = '';

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private credentialsService: CredentialsService) {
    this.getData();
  }

  getData() {
    this.ticketStates = this.apiService.ticketStates();
    this.ticketStatesClass = this.apiService.ticketStatesClass();
    this.ticketTypes = this.apiService.ticketTypes();
    this.apiService.users(null, 1, 500).then(value => {
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
    this.form =  new FormGroup({
      state: new FormControl('', [Validators.required]),
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

}
