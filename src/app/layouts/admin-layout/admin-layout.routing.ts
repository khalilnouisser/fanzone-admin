import {Routes} from '@angular/router';
import {BeforeMatchComponent} from "@app/layouts/admin-layout/pages/before-match/before-match.component";
import {LiveMatchComponent} from "@app/layouts/admin-layout/pages/live-match/live-match.component";
import {GroupsComponent} from "@app/layouts/admin-layout/pages/groups/groups.component";
import {LeaguesComponent} from "@app/layouts/admin-layout/pages/leagues/leagues.component";
import {MatchsComponent} from "@app/layouts/admin-layout/pages/matchs/matchs.component";
import {MatchDetailsComponent} from "@app/layouts/admin-layout/pages/match-details/match-details.component";
import {PlayersComponent} from "@app/layouts/admin-layout/pages/players/players.component";
import {QuizsComponent} from "@app/layouts/admin-layout/pages/quizs/quizs.component";
import {QuizRequestsComponent} from "@app/layouts/admin-layout/pages/quiz-requests/quiz-requests.component";
import {QuizResponsesComponent} from "@app/layouts/admin-layout/pages/quiz-responses/quiz-responses.component";
import {TeamsComponent} from "@app/layouts/admin-layout/pages/teams/teams.component";
import {UsersComponent} from "@app/layouts/admin-layout/pages/users/users.component";
import {WallComponent} from "@app/layouts/admin-layout/pages/wall/wall.component";
import {PodiumComponent} from "@app/layouts/admin-layout/pages/podium/podium.component";

export const AdminLayoutRoutes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'before/match', component: BeforeMatchComponent},
  {path: 'live/match', component: LiveMatchComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'leagues', component: LeaguesComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'matchs', component: MatchsComponent},
  {path: 'matchs/:id', component: MatchDetailsComponent},
  {path: 'quizs', component: QuizsComponent},
  {path: 'quiz/requests', component: QuizRequestsComponent},
  {path: 'quiz/responses', component: QuizResponsesComponent},
  {path: 'wall', component: WallComponent},
  {path: 'podium', component: PodiumComponent},

];
