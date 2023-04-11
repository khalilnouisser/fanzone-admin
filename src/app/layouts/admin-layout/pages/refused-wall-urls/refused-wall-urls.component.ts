import { Component, OnInit } from '@angular/core';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {Rss} from '@app/models/rss';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import {ngxCsv} from 'ngx-csv';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-refused-wall-urls',
  templateUrl: './refused-wall-urls.component.html',
  styleUrls: ['./refused-wall-urls.component.scss']
})
export class RefusedWallUrlsComponent extends GenericFilteringComponent implements OnInit {

  list: Rss[] = [];
  listLanguages: any[] = [];
  page = 1;
  pageSize = 10;
  totalLength = 0;

  constructor(private apiService: ApiService) {
    super();
    this.listLanguages = this.apiService.fullLanguages();
    this.filter = {
      attributes: 'name,url',
      keyword: '',
      league: '',
      language: ''
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
    this.apiService.refusedWallLinks(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

  exportData() {
    this.apiService.refusedWallLinks(this.filter, 1, 1000000).then(d => {
      // tslint:disable-next-line:no-shadowed-variable no-unused-expression
      new ngxCsv(d.data.reverse().map((d) => {
        return {
          id: d._id,
          name: d.name ?? '',
          url: d.url ?? '',
        };
      }), 'refused-wall-url-list', {
        fieldSeparator: ';',
        headers:  ['id', 'name', 'url'],
      });
    });
  }

  delete(item: any) {
    Swal.fire({
      html: 'Êtes-vous sur de vouloir supprimer cet élement ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Supprimer',
      confirmButtonColor: 'red'
    }).then(data => {
      if (data.value) {
        this.apiService.deleteRefusedWallLink(item._id).then(result => {
          Swal.fire({
            html: 'Lien supprimé avec succès',
            icon: 'success',
            timer: 2000,
            confirmButtonText: 'Fermer',
          });
          this.loadItems();
        }).catch(err => {
          Swal.fire({html: 'Erreur technique', icon: 'error'});
        });
      }
    });
  }
}
