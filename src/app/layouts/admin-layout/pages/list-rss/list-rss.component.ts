import { Component, OnInit } from '@angular/core';
import {Player} from '@app/models/player';
import {ApiService} from '@app/core/http/api.service';

import * as moment from 'moment';
import {Rss} from '@app/models/rss';
import Swal from 'sweetalert2';
import {League} from '@app/models/league';

@Component({
  selector: 'app-list-rss',
  templateUrl: './list-rss.component.html',
  styleUrls: ['./list-rss.component.scss']
})
export class ListRssComponent implements OnInit {

  list: Rss[] = [];
  leagues: League[] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.apiService.leagues().then(d => {
      this.leagues = d.data;
    });
    this.apiService.rss().then(value => {
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
