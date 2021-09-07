import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ClipboardModule} from 'ngx-clipboard';

import {AdminLayoutRoutes} from './admin-layout.routing';
import {NgbDatepickerModule, NgbModalModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {UsersComponent} from './pages/users/users.component';
import {GroupsComponent} from './pages/groups/groups.component';
import {MatchsComponent} from './pages/matchs/matchs.component';
import {LiveMatchComponent} from './pages/live-match/live-match.component';
import {BeforeMatchComponent} from './pages/before-match/before-match.component';
import {LeaguesComponent} from './pages/leagues/leagues.component';
import {TeamsComponent} from './pages/teams/teams.component';
import {PlayersComponent} from './pages/players/players.component';
import {QuizsComponent} from './pages/quizs/quizs.component';
import {QuizResponsesComponent} from './pages/quiz-responses/quiz-responses.component';
import {WallComponent} from './pages/wall/wall.component';
import { QuizRequestsComponent } from './pages/quiz-requests/quiz-requests.component';
import { MatchDetailsComponent } from './pages/match-details/match-details.component';
import { PodiumComponent } from './pages/podium/podium.component';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbPaginationModule,
    NgbDatepickerModule
  ],
  declarations: [
    UsersComponent,
    GroupsComponent,
    MatchsComponent,
    LiveMatchComponent,
    BeforeMatchComponent,
    LeaguesComponent,
    TeamsComponent,
    PlayersComponent,
    QuizsComponent,
    QuizResponsesComponent,
    WallComponent,
    QuizRequestsComponent,
    MatchDetailsComponent,
    PodiumComponent]
})

export class AdminLayoutModule {
}
