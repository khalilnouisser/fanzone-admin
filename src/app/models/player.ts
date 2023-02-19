import {Team} from "@app/models/team";

export interface Player {
  initialValue: number;
  birthDate: string;
  value: number;
  positions: number[];
  _id: string;
  playerId: string;
  teamId: string;
  team: Team;
  name: string;
  birthday: string;
  displayName: string;
  photo: string;
  position: number;
  positionAbr: string;
  country: string;
  positionDescription: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  formated_date: string;
}
