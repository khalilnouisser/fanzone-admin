import {Component, OnInit} from '@angular/core';
import {Player} from '@app/models/player';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {Rss} from '@app/models/rss';
import Swal from 'sweetalert2';
import {League} from '@app/models/league';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {ngxCsv} from 'ngx-csv';

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

  leagueQuery = '';
  filteredLeagues: League[] = [];

  constructor(private apiService: ApiService) {
    super();
    this.filter = {
      attributes: 'name,url,language',
      keyword: '',
      league: '',
      language: ''
    };
  }

  onChangeQuery() {
    this.filteredLeagues = this.filterData(this.leagues, this.leagueQuery);
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
      this.onChangeQuery();
    });
    this.loadData();
  }

  exportData() {
    this.apiService.rss(this.filter, 1, 10000).then(d => {
      const t = new ngxCsv(d.data.reverse().map((d) => {
        return {
          id: d._id,
          name: d.name,
          url: d.url,
          league: d.league,
          language: d.language
        };
      }), 'rss-list', {
        fieldSeparator: ';',
        headers:  ['id', 'name', 'url', 'league', 'language'],
      });
    });
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
