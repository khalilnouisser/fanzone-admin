import { Component, OnInit } from '@angular/core';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {Group} from '@app/models/group';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import {WallPost} from '@app/models/wallpost';
import Swal from 'sweetalert2';
import {ngxCsv} from 'ngx-csv';

declare var $: any;

@Component({
  selector: 'app-link-requests',
  templateUrl: './link-requests.component.html',
  styleUrls: ['./link-requests.component.scss']
})
export class LinkRequestsComponent extends GenericFilteringComponent implements OnInit {

  list: WallPost[] = [];
  page = 1;
  pageSize = 10;
  totalLength = 0;
  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: '_id,link',
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

  exportData() {
    this.apiService.linkRequests(this.filter, 1, 1000000).then(d => {
      // tslint:disable-next-line:no-shadowed-variable no-unused-expression
      new ngxCsv(d.data.reverse().map((d) => {
        return {
          id: d._id,
          user: d.user?.pseudo ?? '-',
          link: d.link ?? '',
        };
      }), 'link-requests-list', {
        fieldSeparator: ';',
        headers:  ['id', 'user', 'link'],
      });
    });
  }

  accept(item: WallPost) {
    let html = '<div class="input-group mb-3"><input id="swal-input1" placeholder="Titre" class="form-control"></div><div class="input-group"><select id="swal-input2" class="form-control">';
    this.apiService.fullLanguages().forEach(language => {
      html = html + `<option value="${language.id}">${language.name}</option>`;
    });
    const self = this;
    Swal.fire({
      title: 'Sélectionner le titre et la langue',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      showLoaderOnConfirm: true,
      html:
         html + '</select></div>',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
            $('#swal-input1').val(),
            $('#swal-input2').val()
          ]);
        });
      },
    }).then(function (result) {
      self.apiService.acceptWall(item._id, {name: result.value[0], language: result.value[1]}).then((d) => {
        self.loadData();
      });
    });
  }

  refuse(item: WallPost) {
    const html = '<div class="input-group mb-3"><input id="swal-input1" placeholder="Titre" class="form-control"></div>';
    const self = this;
    Swal.fire({
      title: 'Sélectionner le titre',
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
      self.apiService.refuseWall(item._id, {name: result.value[0]}).then((d) => {
        self.loadData();
      });
    });
  }

}
