import { Component, OnInit } from '@angular/core';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {Group} from '@app/models/group';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import {WallPost} from '@app/models/wallpost';

@Component({
  selector: 'app-link-requests',
  templateUrl: './link-requests.component.html',
  styleUrls: ['./link-requests.component.scss']
})
export class LinkRequestsComponent extends GenericFilteringComponent implements OnInit {

  list: WallPost[] = [];
  page = 1;
  pageSize = 10;
  totalLength = 100;
  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'link',
      keyword: '',
    };
  }

  ngOnInit() {
    this.loadData();
  }

  pageChange(ev) {
    this.page = ev;
    this.loadData();
  }

  loadData() {
    this.list = [];
    this.apiService.linkRequests(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

  accept(item: WallPost) {
    this.apiService.acceptWall(item._id).then((d) => {
      this.loadData();
    });
  }

  refuse(item: WallPost) {
    this.apiService.refuseWall(item._id).then((d) => {
      this.loadData();
    });
  }

}
