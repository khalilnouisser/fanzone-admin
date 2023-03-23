import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Rss} from '@app/models/rss';
import {League} from '@app/models/league';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '@app/core/http/api.service';
import Swal from 'sweetalert2';
import {Wall} from '@app/models/ticket';

@Component({
  selector: 'app-add-edit-survey',
  templateUrl: './add-edit-survey.component.html',
  styleUrls: ['./add-edit-survey.component.scss']
})
export class AddEditSurveyComponent implements OnInit {

  id: string;
  form: FormGroup;
  wall: Wall;
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
      title: new FormControl('', [Validators.required]),
      language: new FormControl('', []),
      type: new FormControl('2', []),
      leaguesId: new FormControl([], []),
      questions: new FormArray([]),
      isAdminPost: new FormControl(true),
      user: new FormControl(null),
      state: new FormControl(1),
    });
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loading = true;
        this.apiService.wallById(this.id).then(d => {
          this.wall = d.data[0];
          this.form.patchValue(this.wall);
          this.form.patchValue({
            title: this.wall.title,
            language: this.wall.language,
            type: this.wall.type,
            leaguesId: this.wall.leaguesId,
          });
          this.wall.questions.forEach((v) => {
            this.questions.push(new FormGroup({
              question: new FormControl(v.question, [Validators.required]),
              votes: new FormControl(v.votes ?? [], []),
            }));
          });
          this.loading = false;
        }).catch(async e => {
          console.log(e);
        });
      }
    });
  }

  get questions() {
    return this.form.get('questions') as FormArray;
  }

  addQuestion() {
    this.questions.push(new FormGroup({
      question: new FormControl('', [Validators.required]),
      votes: new FormControl([], []),
    }));
  }

  deleteItem(index: number) {
    this.questions.removeAt(index);
  }

  submit() {
    let promise;
    if (this.id) {
      promise = this.apiService.editWall(this.id, this.form.value);
    } else {
      promise = this.apiService.addWall(this.form.value);
    }
    promise.then(() => {
      Swal.fire({
        html: 'Sondage ' + (this.id ? 'modifié' : 'créé') + ' avec succès',
        icon: 'success',
        timer: 2000,
        confirmButtonText: 'Fermer',
      });
      this.router.navigate(['/surveys']);
    });
  }

}
