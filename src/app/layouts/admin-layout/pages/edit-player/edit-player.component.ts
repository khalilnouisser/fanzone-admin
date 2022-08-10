import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Team} from '@app/models/team';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '@app/core/http/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  id: string;
  form: FormGroup;
  team: Team;
  loading = false;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.form =  new FormGroup({
      name: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required]),
      photo: new FormControl('', []),
    });
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loading = true;
        this.apiService.playerById(this.id).then(d => {
          this.team = d.data[0];
          this.form.patchValue(this.team);
          this.loading = false;
        }).catch(async e => {
          await this.router.navigate(['/players']);
        });
      }
    });
  }

  submit() {
    this.apiService.editPlayer(this.id, this.form.value).then(() => {
      Swal.fire({
        html: 'Joueur ' + (this.id ? 'modifié' : 'créé') + ' avec succès',
        icon: 'success',
        timer: 2000,
        confirmButtonText: 'Fermer',
      });
      this.router.navigate(['/players']);
    });
  }

}
