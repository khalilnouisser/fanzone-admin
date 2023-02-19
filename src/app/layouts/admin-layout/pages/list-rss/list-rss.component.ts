import { Component, OnInit } from '@angular/core';
import {Player} from '@app/models/player';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {Rss} from '@app/models/rss';
import Swal from 'sweetalert2';
import {League} from '@app/models/league';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';

@Component({
  selector: 'app-list-rss',
  templateUrl: './list-rss.component.html',
  styleUrls: ['./list-rss.component.scss']
})
export class ListRssComponent extends GenericFilteringComponent implements OnInit {

  list: Rss[] = [];
  leagues: League[] = [];
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
      attributes: 'name,url,language',
      keyword: '',
      league: '',
      language: ''
    };
  }

  ngOnInit() {
    this.loadItems();
  }

  get leaguesListName() {
    return this.leagues.map((v) => v.name);
  }

  loadItems() {
    this.apiService.leagues(null, 1, 100).then(d => {
      this.leagues = d.data;
    });
    this.loadData();
  }

  pageChange(ev) {
    this.page = ev;
    this.loadData();
  }

  loadData() {
    this.list = [];
    this.apiService.rss(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data.map(v => {
        v.formated_date = moment(v.createdAt).format('D MMMM YYYY');
        return v;
      });
    });
  }

  getLeagueImage(item: Rss) {
    if (this.leagues && item.league) {
      return this.leagues.find(l => l.leagueId === item.league)?.logo ?? null;
    }
    return null;
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
        this.apiService.deleteRss(item._id).then(result => {
          Swal.fire({
            html: 'RSS supprimé avec succès',
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
