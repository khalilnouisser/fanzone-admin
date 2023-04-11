import {Routes} from '@angular/router';
import {BeforeMatchComponent} from '@app/layouts/admin-layout/pages/before-match/before-match.component';
import {LiveMatchComponent} from '@app/layouts/admin-layout/pages/live-match/live-match.component';
import {GroupsComponent} from '@app/layouts/admin-layout/pages/groups/groups.component';
import {LeaguesComponent} from '@app/layouts/admin-layout/pages/leagues/leagues.component';
import {MatchsComponent} from '@app/layouts/admin-layout/pages/matchs/matchs.component';
import {MatchDetailsComponent} from '@app/layouts/admin-layout/pages/match-details/match-details.component';
import {PlayersComponent} from '@app/layouts/admin-layout/pages/players/players.component';
import {QuizsComponent} from '@app/layouts/admin-layout/pages/quizs/quizs.component';
import {QuizRequestsComponent} from '@app/layouts/admin-layout/pages/quiz-requests/quiz-requests.component';
import {QuizResponsesComponent} from '@app/layouts/admin-layout/pages/quiz-responses/quiz-responses.component';
import {TeamsComponent} from '@app/layouts/admin-layout/pages/teams/teams.component';
import {UsersComponent} from '@app/layouts/admin-layout/pages/users/users.component';
import {WallComponent} from '@app/layouts/admin-layout/pages/wall/wall.component';
import {PodiumComponent} from '@app/layouts/admin-layout/pages/podium/podium.component';
import {ListRssComponent} from '@app/layouts/admin-layout/pages/list-rss/list-rss.component';
import {AddEditRssComponent} from '@app/layouts/admin-layout/pages/add-edit-rss/add-edit-rss.component';
import {WallUrlsComponent} from '@app/layouts/admin-layout/pages/wall-urls/wall-urls.component';
import {EditPlayerComponent} from '@app/layouts/admin-layout/pages/edit-player/edit-player.component';
import {EditTeamComponent} from '@app/layouts/admin-layout/pages/edit-team/edit-team.component';
import {LinkRequestsComponent} from '@app/layouts/admin-layout/pages/link-requests/link-requests.component';
import {AddEditWallLinkComponent} from '@app/layouts/admin-layout/pages/add-edit-wall-link/add-edit-wall-link.component';
import { QuizStatsComponent } from './pages/quiz-stats/quiz-stats.component';
import {ListTicketsComponent} from '@app/layouts/admin-layout/pages/list-tickets/list-tickets.component';
import {TicketDetailsComponent} from '@app/layouts/admin-layout/pages/ticket-details/ticket-details.component';
import {ListGoatsComponent} from '@app/layouts/admin-layout/pages/list-goats/list-goats.component';
import {AddEditGoatComponent} from '@app/layouts/admin-layout/pages/add-edit-goat/add-edit-goat.component';
import {ListSurveysComponent} from '@app/layouts/admin-layout/pages/list-surveys/list-surveys.component';
import {AddEditSurveyComponent} from '@app/layouts/admin-layout/pages/add-edit-survey/add-edit-survey.component';
import {RefusedWallUrlsComponent} from '@app/layouts/admin-layout/pages/refused-wall-urls/refused-wall-urls.component';
import {
  AddEditRefusedWallLinkComponent
} from '@app/layouts/admin-layout/pages/add-edit-refused-wall-link/add-edit-refused-wall-link.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'rss', component: ListRssComponent},
  {path: 'rss/add', component: AddEditRssComponent},
  {path: 'rss/:id', component: AddEditRssComponent},
  {path: 'before/match', component: BeforeMatchComponent},
  {path: 'live/match', component: LiveMatchComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'leagues', component: LeaguesComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'teams/:id', component: EditTeamComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'players/:id', component: EditPlayerComponent},
  {path: 'matchs', component: MatchsComponent},
  {path: 'matchs/:id', component: MatchDetailsComponent},
  {path: 'quizs', component: QuizsComponent},
  {path: 'quiz/stats', component: QuizStatsComponent},
  {path: 'quiz/requests', component: QuizRequestsComponent},
  {path: 'quiz/responses', component: QuizResponsesComponent},
  {path: 'wall/urls', component: WallUrlsComponent},
  {path: 'wall/urls/add', component: AddEditWallLinkComponent},
  {path: 'wall/urls/:id', component: AddEditWallLinkComponent},
  {path: 'wall/refused-urls', component: RefusedWallUrlsComponent},
  {path: 'wall/refused-urls/add', component: AddEditRefusedWallLinkComponent},
  {path: 'wall/refused-urls/:id', component: AddEditRefusedWallLinkComponent},
  {path: 'surveys', component: ListSurveysComponent},
  {path: 'surveys/add', component: AddEditSurveyComponent},
  {path: 'surveys/:id', component: AddEditSurveyComponent},
  {path: 'goats', component: ListGoatsComponent},
  {path: 'goats/add', component: AddEditGoatComponent},
  {path: 'goats/:id', component: AddEditGoatComponent},
  {path: 'tickets', component: ListTicketsComponent},
  {path: 'tickets/:id', component: TicketDetailsComponent},
  {path: 'wall/approve', component: LinkRequestsComponent},
  {path: 'podium', component: PodiumComponent},

];
