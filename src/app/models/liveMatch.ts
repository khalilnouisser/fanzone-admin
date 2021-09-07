export interface LiveMatch {
  lastScore: number;
  hasDisplayedLineUpQuestion: boolean;
  hasDisplayedWinnerQuestion: boolean;
  isTheTopUser: boolean;
  _id: string;
  matchId: string;
  team: number;
  userId: string;
  playersRating: PlayersRating[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  isValidated: boolean;
  arbitratorRating: number;
  coachARating: number;
  coachBRating: number;
  matchRating: number;
  isDone: boolean;
  arbitratorRatingScore: number;
  coachARatingScore: number;
  coachBRatingScore: number;
  matchRatingScore: number;
  totalScore: number;
  questions_response: any[];
  scoreCalculatedDate: string;
  formated_date: string;
}

interface PlayersRating {
  nbrPositive: number;
  nbrNegative: number;
  _id: string;
  rate: number;
  playerId: string;
  score: number;
}
