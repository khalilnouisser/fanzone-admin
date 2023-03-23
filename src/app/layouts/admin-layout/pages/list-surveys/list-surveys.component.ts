import { Component, OnInit } from '@angular/core';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {Rss} from '@app/models/rss';
import {League} from '@app/models/league';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {Wall} from '@app/models/ticket';

@Component({
  selector: 'app-list-surveys',
  templateUrl: './list-surveys.component.html',
  styleUrls: ['./list-surveys.component.scss']
})
export class ListSurveysComponent  extends GenericFilteringComponent implements OnInit {

  list: Wall[] = [];
  listLanguages: String[] = [
    'fr',
    'en',
    'es',
    'zh',
    'ar',
    'pt',
    'it',
    'tr',
    'ja',
    'ru',
    'ko',
    'de',
    'fa',
  ];
  page = 1;
  pageSize = 10;
  totalLength = 0;

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'name,language',
      language: '',
      type: '2',
    };
  }

  ngOnInit() {
    this.loadItems();
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
    this.apiService.walls(this.filter, this.page, this.pageSize).then(value => {
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
        this.apiService.deleteWall(item._id).then(result => {
          Swal.fire({
            html: 'Wall supprimé avec succès',
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

