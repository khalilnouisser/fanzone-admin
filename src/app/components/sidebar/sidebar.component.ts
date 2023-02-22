
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
  {path: '/users', title: 'Utilisateurs', icon: 'fa-user', class: ''},
  {path: '/groups', title: 'Groupe des utilisateurs', icon: 'fa-users', class: ''},
  {path: '/leagues', title: 'Compétitions', icon: 'fa-medal', class: ''},
  {path: '/teams', title: 'Equipes', icon: 'fa-synagogue', class: ''},
  {path: '/players', title: 'Joueurs', icon: 'fa-people-group', class: ''},
  {path: '/rss', title: 'RSS', icon: 'fa-rss', class: ''},
  {path: '/tickets', title: 'Tickets', icon: 'fa-headset', class: ''},
  {path: '/wall/approve', title: 'Demande des liens', icon: 'fa-hand', class: ''},
  {path: '/wall/urls', title: 'Liens autorisés', icon: 'fa-link', class: ''},
  {path: '/matchs', title: 'Matchs', icon: 'fa-futbol', class: ''},
  {path: '/quizs', title: 'Quizs', icon: 'fa-circle-question', class: ''},
  {path: '/quiz/stats', title: 'Statistiques des Quizs', icon: 'fa-chart-pie', class: ''},
  {path: '/quiz/responses', title: 'Réponses des quiz', icon: 'fa-reply', class: ''},
  {path: '/podium', title: 'Podium', icon: 'fa-ranking-star', class: ''},
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
