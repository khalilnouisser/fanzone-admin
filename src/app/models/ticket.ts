import {User} from '@app/models/user';
import {Match} from '@app/models/match';
import {Group} from '@app/models/group';
export interface Comment {
  user: string;
  content: string;
}

export interface Ticket {
  state: number;
  attachments: string[];
  _id: string;
  type: number;
  description: string;
  category: string;
  subCategory: string;
  concernedWall: Wall;
  concernedGroup: Group;
  concernedUser: User;
  user: User;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  formated_date: String;
  __v: number;
}

export interface Wall {
  numberVues: number;
  numberShares: number;
  numberExternalShares: number;
  numberValidations: number;
  week: number;
  type: number;
  state: number;
  leaguesId: string[];
  teamsId: string[];
  playersId: string[];
  isRss: boolean;
  masked: boolean;
  language: string;
  userPlayers: any[];
  likes: any[];
  views: string[];
  shares: any[];
  externalShares: string[];
  dislikes: any[];
  _id: string;
  match: Match;
  questions: any[];
  comments: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  link: string;
  rssTitle: string;
  title: string;
  user: User;
  targetGroupName: string;
}
