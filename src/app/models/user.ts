import {Governorate, Region} from "@app/models/region";
import {Group} from "@app/models/group";
import {Team} from "@app/models/team";

export class User {
  favorite_team: Team;
  businesses: any[];
  groups: Group[];
  friends: string[];
  img_url: string;
  leagues?: any;
  status: number;
  total_score: number;
  beforeMatchsScore: number;
  fantazyScore: number;
  liveRatingsScore: number;
  quizScore: number;
  _id: string;
  avatar: string;
  full_name: string;
  pseudo: string;
  email: string;
  password: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
  formated_date: string;
  code: string;
  community_visibility: boolean;
  governorate: Governorate;
  region: Region;
  filtredBeforeMatchsScore: number;
  filtredFantaziesScore: number;
  filtredLiveRatingsScore: number;
  filtredQuizsScore: number;
}
