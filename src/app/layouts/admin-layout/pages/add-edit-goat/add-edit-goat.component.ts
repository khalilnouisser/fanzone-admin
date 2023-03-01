import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Rss} from '@app/models/rss';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '@app/core/http/api.service';
import Swal from 'sweetalert2';
import {Goat} from '@app/models/goat';
import * as moment from 'moment';

@Component({
  selector: 'app-add-edit-goat',
  templateUrl: './add-edit-goat.component.html',
  styleUrls: ['./add-edit-goat.component.scss']
})
export class AddEditGoatComponent implements OnInit {

  id: string;
  form: FormGroup;
  goat: Goat;
  loading = false;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.form =  new FormGroup({
      name: new FormControl('', [Validators.required]),
      icon: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      players: new FormArray([]),
    });
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loading = true;
        this.apiService.goatById(this.id).then(d => {
          this.goat = d.data[0];
          console.log(this.goat.startDate);
          console.log(new Date(this.goat.startDate).getFullYear());
          this.form.patchValue({
            name: this.goat.name,
            icon: this.goat.icon,
            startDate: moment(this.goat.startDate).format('YYYY-MM-DD'),
            endDate: moment(this.goat.endDate).format('YYYY-MM-DD'),
          });
          this.goat.players.forEach((v) => {
            this.players.push(new FormGroup({
              name: new FormControl(v.name, [Validators.required]),
              photo: new FormControl(v.photo, [Validators.required]),
              likes: new FormControl(v.likes, [Validators.required]),
              disLikes: new FormControl(v.disLikes, [Validators.required]),
              score: new FormControl(v.score, [Validators.required]),
            }));
          });
          this.loading = false;
        }).catch(async e => {
          console.log(e);
        });
      }
    });
  }

  get players() {
    return this.form.get('players') as FormArray;
  }

  deleteItem(index: number) {
    this.players.removeAt(index);
  }

  addPlayer() {
    this.players.push(new FormGroup({
      name: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
      likes: new FormControl(0, [Validators.required]),
      disLikes: new FormControl(0, [Validators.required]),
      score: new FormControl(0, [Validators.required]),
    }));
  }

  submit() {
    const body = JSON.parse(JSON.stringify(this.form.value));
    body.startDate = moment(body.startDate).format('YYYY-MM-DDTHH:mm:ss');
    body.endDate = moment(body.endDate).format('YYYY-MM-DDTHH:mm:ss');
    let promise;
    if (this.id) {
      promise = this.apiService.editGoat(this.id, body);
    } else {
      promise = this.apiService.addGoat(body);
    }
    promise.then(() => {
      Swal.fire({
        html: 'Goat ' + (this.id ? 'modifié' : 'créé') + ' avec succès',
        icon: 'success',
        timer: 2000,
        confirmButtonText: 'Fermer',
      });
      this.router.navigate(['/goats']);
    });
  }

}
