import { Component, OnInit } from '@angular/core';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {Rss} from '@app/models/rss';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {Ticket} from '@app/models/ticket';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.scss']
})
export class ListTicketsComponent extends GenericFilteringComponent implements OnInit {

  list: Ticket[] = [];
  listLanguages: any[] = [];
  ticketStates: string[] = [];
  ticketStatesClass: string[] = [];
  ticketTypes: string[] = [];
  page = 1;
  pageSize = 10;
  totalLength = 0;

  constructor(private apiService: ApiService) {
    super();
    this.listLanguages = this.apiService.fullLanguages();
    this.ticketStates = this.apiService.ticketStates();
    this.ticketStatesClass = this.apiService.ticketStatesClass();
    this.ticketTypes = this.apiService.ticketTypes();
    this.filter = {
      attributes: 'description,category,subCategory',
      keyword: '',
      language: '',
      type: '',
      state: ''
    };
  }

  ngOnInit() {
    this.loadItems();
  }

  get languagesName() {
    return this.listLanguages.map((v) => v.name);
  }


  loadItems() {
    this.loadData();
  }

  pageChange(ev) {
    this.page = ev;
    this.loadData();
  }

  loadData() {
    this.list = [];
    this.apiService.tickets(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

}
