import {Team} from "@app/models/team";

export interface League {
  teams: Team[];
  rounds: string[];
  groups: any[];
  _id: string;
  leagueId: string;
  type: number;
  color: string;
  logo: string;
  name: string;
  shortName: string;
  subLeagueName: string;
  totalRound: number;
  currentRound: number;
  currentSeason: string;
  countryId: string;
  country: string;
  countryLogo: string;
  areaId: number;
  createdAt: string;
  updatedAt: string;
  formated_date: string;
  __v: number;
  coefficient: number;
}
