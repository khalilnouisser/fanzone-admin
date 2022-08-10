import { Component, OnInit } from '@angular/core';
import {Rss} from '@app/models/rss';
import {League} from '@app/models/league';
import {ApiService} from '@app/core/http/api.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-wall-urls',
  templateUrl: './wall-urls.component.html',
  styleUrls: ['./wall-urls.component.scss']
})
export class WallUrlsComponent implements OnInit {

  list: String[] = [];
  form: FormArray = new FormArray([]);
  id = '';
  key = 'wall_news_authorized_links';

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.apiService.getConfig().then(value => {
      const wallConfig = value.data.find(item => item.key === this.key);
      if (wallConfig) {
        console.log(wallConfig);
        this.list = wallConfig.value.split(',');
        this.form = new FormArray(this.list.map(item => new FormControl(item)));
        this.id = wallConfig._id;
      }
    });
  }

  addItem() {
    this.form.push(new FormControl(''));
  }

  delete(index: number) {
    Swal.fire({
      html: 'Êtes-vous sur de vouloir supprimer cet élement ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Supprimer',
      confirmButtonColor: 'red'
    }).then(data => {
      this.form.removeAt(index);
      this.submit();
    });
  }

  submit() {
    const data = this.form.value.filter(value => value !== '');
    this.apiService.editConfig(this.id, {
      key: this.key,
      value: data.join(',')
    }).then(value => {
      Swal.fire({
        title: 'Succès',
        text: 'Les modifications ont été enregistrées',
        icon: 'success'
      });
    });
  }

}
