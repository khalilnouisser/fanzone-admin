import {Component, OnInit} from '@angular/core';
import { Router, Routes } from '@angular/router';
import {AuthenticationService, CredentialsService} from '@app/core';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/users', title: 'Utilisateurs', icon: 'ni-building text-primary', class: ''},
  {path: '/groups', title: 'Group des utilisateurs', icon: 'ni-building text-primary', class: ''},
  {path: '/leagues', title: 'Compétitions', icon: 'ni-building text-primary', class: ''},
  {path: '/teams', title: 'Equipes', icon: 'ni-building text-primary', class: ''},
  {path: '/players', title: 'Joueurs', icon: 'ni-building text-primary', class: ''},
  {path: '/rss', title: 'RSS', icon: 'ni-building text-primary', class: ''},
  {path: '/wall/urls', title: 'Wall urls', icon: 'ni-building text-primary', class: ''},
  // {path: '/before/match', title: 'Avant matchs', icon: 'ni-building text-primary', class: ''},
  // {path: '/live/match', title: 'Live matchs', icon: 'ni-building text-primary', class: ''},
  {path: '/matchs', title: 'Matchs', icon: 'ni-building text-primary', class: ''},
  {path: '/quizs', title: 'Quizs', icon: 'ni-building text-primary', class: ''},
  {path: '/quiz/requests', title: 'Requêtes des quiz', icon: 'ni-building text-primary', class: ''},
  {path: '/quiz/responses', title: 'Réponses des quiz', icon: 'ni-building text-primary', class: ''},
  {path: '/podium', title: 'Podium', icon: 'ni-building text-primary', class: ''},
  // {path: '/wall', title: 'FanZone', icon: 'ni-building text-primary', class: ''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, public credentialsService: CredentialsService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
