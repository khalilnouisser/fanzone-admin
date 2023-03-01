import { Component, OnInit } from '@angular/core';
import {GenericFilteringComponent} from '@app/components/generic-filtering/generic-filtering.component';
import {Rss} from '@app/models/rss';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {Goat} from '@app/models/goat';

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
