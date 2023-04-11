import { Component, OnInit } from '@angular/core';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {Rss} from '@app/models/rss';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {Goat} from '@app/models/goat';
import {ngxCsv} from 'ngx-csv';

@Component({
  selector: 'app-list-goats',
  templateUrl: './list-goats.component.html',
  styleUrls: ['./list-goats.component.scss']
})
export class ListGoatsComponent extends GenericFilteringComponent implements OnInit {

  list: Goat[] = [];
  page = 1;
  pageSize = 10;
  totalLength = 0;

  constructor(private apiService: ApiService) {
    super();
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

  loadItems() {
    this.loadData();
  }

  pageChange(ev) {
    this.page = ev;
    this.loadData();
  }

  loadData() {
    this.list = [];
    this.apiService.goats(this.filter, this.page, this.pageSize).then(value => {
      this.totalLength = value.total;
      this.list = value.data;
    });
  }

  exportData() {
    this.apiService.goats(this.filter, this.page, 100000).then(d => {
      // tslint:disable-next-line:no-shadowed-variable no-unused-expression
      new ngxCsv(d.data.reverse().map((d) => {
        const sortedPlayers = d.players.sort((a, b) => b.score - a.score);
        return {
          id: d._id,
          name: d.name,
          icon: d.icon,
          startDate: d.startDate,
          endDate: d.endDate,
          plays: d.plays.length,
          top1: sortedPlayers.length > 0 ? sortedPlayers[0].name : '-',
          top2: sortedPlayers.length > 1 ? sortedPlayers[1].name : '-',
          top3: sortedPlayers.length > 2 ? sortedPlayers[2].name : '-',
        };
      }), 'goats-list', {
        fieldSeparator: ';',
        headers: ['id', 'name', 'icon', 'startDate', 'endDate', 'plays', 'top1', 'top2', 'top3'],
      });
    });
  }

  formatDate(date: Date): String {
    return moment(date).format('D MMMM YYYY');
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
        this.apiService.deleteGoat(item._id).then(result => {
          Swal.fire({
            html: 'Goat supprimé avec succès',
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
