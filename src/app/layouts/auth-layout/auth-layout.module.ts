import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthLayoutRoutes} from './auth-layout.routing';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

import {LoginComponent} from '../../pages/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    ReactiveFormsModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
  ]
})
export class AuthLayoutModule {
}
