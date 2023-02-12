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
  {path: 'quiz/requests', component: QuizRequestsComponent},
  {path: 'quiz/responses', component: QuizResponsesComponent},
  {path: 'wall/urls', component: WallUrlsComponent},
  {path: 'wall/approve', component: LinkRequestsComponent},
  {path: 'podium', component: PodiumComponent},

];
