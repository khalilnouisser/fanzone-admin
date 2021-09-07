export interface Quiz {
  answers: string[];
  user_responses: string[];
  _id: string;
  title: string;
  type: number;
  leagueId: string;
  matchId: string;
  isHome: boolean;
  createdAt: string;
  updatedAt: string;
  formated_date: string;
  __v: number;
}
