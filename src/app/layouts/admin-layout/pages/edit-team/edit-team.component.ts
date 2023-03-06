import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Rss} from '@app/models/rss';
import {League} from '@app/models/league';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '@app/core/http/api.service';
import Swal from 'sweetalert2';
import {Team} from '@app/models/team';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {

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
      logo: new FormControl('', []),
      color1: new FormControl('', []),
      color2: new FormControl('', []),
      color3: new FormControl('', []),
      nameSynonyms: new FormControl('', []),
    });
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loading = true;
        this.apiService.teamById(this.id).then(d => {
          this.team = d.data[0];
          this.form.patchValue(this.team);
          this.loading = false;
        }).catch(async e => {
          await this.router.navigate(['/teams']);
        });
      }
    });
  }

  componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  colorToHex(color) {
    if (!color) {
      return 'gray';
    }
    const splited = color.split(',');
    const r = splited.length > 0 ? +splited[0] : 0;
    const g = splited.length > 1 ? +splited[1] : 0;
    const b = splited.length > 2 ? +splited[2] : 0;
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  submit() {
    this.apiService.editTeam(this.id, this.form.value).then(() => {
      Swal.fire({
        html: 'Équipe ' + (this.id ? 'modifié' : 'créé') + ' avec succès',
        icon: 'success',
        timer: 2000,
        confirmButtonText: 'Fermer',
      });
      this.router.navigate(['/teams']);
    });
  }

}
