export interface Quiz {
  teamId: string;
  answers: string[];
  user_responses: string[];
  _id: string;
  title: string;
  type: number;
  round: number;
  leagueId: string;
  team: string;
  season: string;
  matchId: string;
  isHome: boolean;
  createdAt: string;
  updatedAt: string;
  formated_date: string;
  __v: number;
}
