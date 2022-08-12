import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from '../../pages/login/login.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: LoginComponent}
    ]),
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
  ]
})
export class AuthLayoutModule {
}
