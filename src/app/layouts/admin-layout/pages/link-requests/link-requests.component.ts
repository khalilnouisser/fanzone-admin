import { Component, OnInit } from '@angular/core';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {Group} from '@app/models/group';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import {WallPost} from '@app/models/wallpost';
import Swal from 'sweetalert2';

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

    return;
    Swal.fire({
      title: 'Donner un titre pour ce lien',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      showLoaderOnConfirm: true,
      preConfirm: (title) => {
        this.apiService.acceptWall(item._id, title).then((d) => {
          this.loadData();
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log('test');
      console.log(result);
    });
  }

  refuse(item: WallPost) {
    this.apiService.refuseWall(item._id).then((d) => {
      this.loadData();
    });
  }

}
