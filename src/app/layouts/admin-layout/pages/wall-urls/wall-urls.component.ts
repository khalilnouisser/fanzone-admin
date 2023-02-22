import { Component, OnInit } from '@angular/core';
import {Rss} from '@app/models/rss';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';

@Component({
  selector: 'app-wall-urls',
  templateUrl: './wall-urls.component.html',
  styleUrls: ['./wall-urls.component.scss']
})
export class WallUrlsComponent  extends GenericFilteringComponent implements OnInit {

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
    this.apiService.wallLinks(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
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
        this.apiService.deleteWallLink(item._id).then(result => {
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

