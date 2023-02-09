import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Rss} from '@app/models/rss';
import {ActivatedRoute, Router} from '@angular/router';
import {League} from '@app/models/league';
import {ApiService} from '@app/core/http/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-rss',
  templateUrl: './add-edit-rss.component.html',
  styleUrls: ['./add-edit-rss.component.scss']
})
export class AddEditRssComponent implements OnInit {

  id: string;
  form: FormGroup;
  rss: Rss;
  loading = false;
  leagues: League[] = [];
  languages: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    this.getData();
    this.languages = this.apiService.languages();
  }

  getData() {
    this.apiService.leagues(null, 1, 100).then(d => {
      this.leagues = d.data;
      console.log(this.leagues);
    });
  }

  ngOnInit(): void {
    this.form =  new FormGroup({
      url: new FormControl('', [Validators.required]),
      league: new FormControl('', []),
      language: new FormControl('', []),
    });
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loading = true;
        this.apiService.rssById(this.id).then(d => {
          this.rss = d.data[0];
          this.form.patchValue(this.rss);
          this.loading = false;
        }).catch(async e => {
          console.log(e);
        });
      }
    });
  }

  submit() {
    var promise;
    if (this.id) {
      promise = this.apiService.editRss(this.id, this.form.value);
    } else {
      promise = this.apiService.addRss(this.form.value);
    }
    promise.then(() => {
      Swal.fire({
        html: 'RSS ' + (this.id ? 'modifié' : 'créé') + ' avec succès',
        icon: 'success',
        timer: 2000,
        confirmButtonText: 'Fermer',
      });
      this.router.navigate(['/rss']);
    });
  }

}
