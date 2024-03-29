export interface Team {
  _id: string;
  teamId: string;
  leagueId: string;
  name: string;
  displayName: string;
  logo: string;
  foundingDate: string;
  address: string;
  area: string;
  venue: string;
  capacity: number;
  coach: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  color1: string;
  color2: string;
  color3: string;
  __v: number;
  rank: number;
  formated_date: string;
  players: any[];
}
