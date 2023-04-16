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
  allTickets: Ticket[] = [];
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
    this.apiService.tickets({}, 1, 100000).then(value => {
      this.allTickets = value.data;
    });
  }

  getWallReports(item: Ticket) {
    return this.list.length === 0 || !item.concernedWall ? '-' +
      // tslint:disable-next-line:max-line-length
      '' : [...new Set(this.list.filter((d) => d.concernedWall != null && d.concernedWall.link === item.concernedWall.link).map((d) => d.user._id))].length;
  }

  getUserReports(item: Ticket) {
    return this.list.length === 0 || !item.concernedUser ? '-' +
      // tslint:disable-next-line:max-line-length
      '' : [...new Set(this.list.filter((d) => d.concernedUser != null && d.concernedUser._id === item.concernedUser._id).map((d) => d.user._id))].length;
  }

  getGroupReports(item: Ticket) {
    return this.list.length === 0 || !item.concernedGroup ? '-' +
      // tslint:disable-next-line:max-line-length
      '' : [...new Set(this.list.filter((d) => d.concernedGroup != null && d.concernedGroup._id === item.concernedGroup._id).map((d) => d.user._id))].length;
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
          description: d.description,
          attachments: d.attachments.length,
          state: this.ticketStates[d.state],
          reporter: d.user.pseudo,
          concernedWall: d.concernedWall ? d.concernedWall._id : '-',
          wallReports: this.getWallReports(d),
          concernedUser: d.concernedUser ? d.concernedUser.pseudo : '-',
          userReports: this.getUserReports(d),
          concernedGroup: d.concernedGroup ? d.concernedGroup.name : '-',
          groupReports: this.getGroupReports(d),
        };
      }), 'tickets-list', {
        fieldSeparator: ';',
        headers:  ['id', 'user', 'type', 'category', 'subCategory', 'description', 'attachments',
        'state', 'reporter', 'concernedWall', 'wallReports', 'concernedUser', 'userReports', 'concernedGroup', 'groupReports'],
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
