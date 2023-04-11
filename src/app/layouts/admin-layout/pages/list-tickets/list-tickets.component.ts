import { Component, OnInit } from '@angular/core';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {Rss} from '@app/models/rss';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {Ticket} from '@app/models/ticket';
import {ngxCsv} from 'ngx-csv';

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

  getTicketType(item: Ticket) {
    if (item.type === 2) {
      if (item.concernedWall != null) {
        return 'Report wall';
      } else if (item.concernedGroup != null) {
        return 'Report group';
      } else {
        return 'Report';
      }
    }
    return this.ticketTypes[item.type];
  }


  loadItems() {
    this.loadData();
  }

  pageChange(ev) {
    this.page = ev;
    this.loadData();
  }

  exportData() {
    this.apiService.tickets(this.filter, 1, 1000000).then(d => {
      // tslint:disable-next-line:no-shadowed-variable no-unused-expression
      new ngxCsv(d.data.reverse().map((d) => {
        return {
          id: d._id,
          user: d.user.pseudo,
          type: d.type,
          category: d.category,
          subCategory: d.subCategory,
          attachments: d.attachments.length,
        };
      }), 'tickets-list', {
        fieldSeparator: ';',
        headers:  ['id', 'user', 'type', 'category', 'subCategory', 'attachments'],
      });
    });
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
