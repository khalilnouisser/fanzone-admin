import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {NgbDatepickerModule, NgbDropdownModule, NgbModalModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
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
import {QuizRequestsComponent} from './pages/quiz-requests/quiz-requests.component';
import {MatchDetailsComponent} from './pages/match-details/match-details.component';
import {PodiumComponent} from './pages/podium/podium.component';
import {ListRssComponent} from './pages/list-rss/list-rss.component';
import {AddEditRssComponent} from './pages/add-edit-rss/add-edit-rss.component';
import {WallUrlsComponent} from './pages/wall-urls/wall-urls.component';
import {EditPlayerComponent} from './pages/edit-player/edit-player.component';
import {EditTeamComponent} from './pages/edit-team/edit-team.component';
import {LinkRequestsComponent} from './pages/link-requests/link-requests.component';
import {AddEditWallLinkComponent} from './pages/add-edit-wall-link/add-edit-wall-link.component';
import {QuizStatsComponent} from './pages/quiz-stats/quiz-stats.component';
import {ListTicketsComponent} from './pages/list-tickets/list-tickets.component';
import {TicketDetailsComponent} from './pages/ticket-details/ticket-details.component';
import {ListGoatsComponent} from './pages/list-goats/list-goats.component';
import {AddEditGoatComponent} from './pages/add-edit-goat/add-edit-goat.component';
import {ListSurveysComponent} from './pages/list-surveys/list-surveys.component';
import {AddEditSurveyComponent} from './pages/add-edit-survey/add-edit-survey.component';
import { RefusedWallUrlsComponent } from './pages/refused-wall-urls/refused-wall-urls.component';
import { AddEditRefusedWallLinkComponent } from './pages/add-edit-refused-wall-link/add-edit-refused-wall-link.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbPaginationModule,
    NgbDatepickerModule,
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
    PodiumComponent,
    ListRssComponent,
    AddEditRssComponent,
    WallUrlsComponent,
    EditPlayerComponent,
    EditTeamComponent,
    LinkRequestsComponent,
    AddEditWallLinkComponent,
    QuizStatsComponent,
    ListTicketsComponent,
    TicketDetailsComponent,
    ListGoatsComponent,
    AddEditGoatComponent,
    ListSurveysComponent,
    AddEditSurveyComponent,
    RefusedWallUrlsComponent,
    AddEditRefusedWallLinkComponent]
})

export class AdminLayoutModule {
}
