import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '@app/core/http/api.service';
import {CredentialsService} from '@app/core';
import {Router} from '@angular/router';
import { User } from '@app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private apiService: ApiService, private credentialsService: CredentialsService, private router: Router) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  error = '';

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  clickLogin() {
    const body = this.loginForm.value;
    body.email = body.email.toLowerCase();

    console.log(body);
    this.apiService.login(body).then(d => {
      let item = d;
      //item.token = item.accessToken;
      this.credentialsService.setCredentials(item, true);
      this.router.navigate(['/']);
    }).catch(e => {
      this.error = 'The email address or password is incorrect. Please retry...';
    });
  }

}
