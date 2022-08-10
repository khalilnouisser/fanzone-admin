import {Team} from "@app/models/team";

export interface Player {
  birthDate: string;
  value: number;
  positions: number[];
  _id: string;
  playerId: string;
  teamId: string;
  team: Team;
  name: string;
  displayName: string;
  photo: string;
  position: number;
  positionAbr: string;
  positionDescription: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  formated_date: string;
}
