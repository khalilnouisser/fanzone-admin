import {User} from '@app/models/user';

export interface WallPost {
  numberVues: number;
  numberShares: number;
  numberExternalShares: number;
  numberValidations: number;
  week: number;
  type: number;
  state: number;
  leaguesId: string[];
  teamsId: string[];
  playersId: any[];
  isRss: boolean;
  language: string;
  userPlayers: any[];
  likes: any[];
  views: any[];
  shares: string[];
  externalShares: any[];
  dislikes: any[];
  _id: string;
  title: string;
  formated_date: string;
  link: string;
  user: User;
  questions: any[];
  comments: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
