import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Rss} from '@app/models/rss';
import {League} from '@app/models/league';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '@app/core/http/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-wall-link',
  templateUrl: './add-edit-wall-link.component.html',
  styleUrls: ['./add-edit-wall-link.component.scss']
})
export class AddEditWallLinkComponent implements OnInit {

  id: string;
  form: FormGroup;
  rss: Rss;
  loading = false;
  listLanguages: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    this.listLanguages = this.apiService.fullLanguages();
  }


  ngOnInit(): void {
    this.form =  new FormGroup({
      name: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      language: new FormControl('', []),
    });
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loading = true;
        this.apiService.wallLinkById(this.id).then(d => {
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
    let promise;
    if (this.id) {
      promise = this.apiService.editWallLink(this.id, this.form.value);
    } else {
      promise = this.apiService.addWallLink(this.form.value);
    }
    promise.then(() => {
      Swal.fire({
        html: 'Lien ' + (this.id ? 'modifié' : 'créé') + ' avec succès',
        icon: 'success',
        timer: 2000,
        confirmButtonText: 'Fermer',
      });
      this.router.navigate(['/wall/urls']);
    });
  }

}
