export interface Match {
  liveRatings: String[];
  beforeMatchPlayes: String[];
  isMatchEnded: boolean;
  isRatingEnded: boolean;
  isStatsCalculated: boolean;
  _id: string;
  matchId: string;
  leagueType: number;
  leagueId: string;
  leagueName: string;
  leagueShortName: string;
  subLeagueId: string;
  subLeagueName: string;
  matchTime: number;
  halfStartTime: number;
  status: number;
  homeId: string;
  homeName: string;
  awayId: string;
  awayName: string;
  homeScore: number;
  awayScore: number;
  season: string;
  round: string;
  group: string;
  location: string;
  weather: string;
  temperature: string;
  hasLineup: boolean;
  events: Event[];
  homeLineup: HomeLineup[];
  awayLineup: HomeLineup[];
  homeBackup: HomeLineup[];
  awayBackup: HomeLineup[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  awayFormation: string;
  homeFormation: string;
  formated_date: string;
  matchEndTime: number;
  matchEndVoteTime: number;
  prono: Prono;
  userPlayersRating?: any;
  userPlayBeforeMatch?: any;
}

interface HomeLineup {
  _id: string;
  playerId: string;
  name: string;
  number: number;
  position: number;
  played: boolean;
}

interface Event {
  _id: string;
  eventId: string;
  minute: string;
  type: number;
  playerId: string;
  playerName: string;
  assistPlayerId: string;
  homeEvent: boolean;
}

interface Prono {
  numberHome: number;
  numberDraw: number;
  numberAway: number;
}

interface LiveRatingAverage {
  matchRating: number;
  arbitratorRating: number;
  coachARating: number;
  coachBRating: number;
  playersRating: PlayersRating[];
}

interface PlayersRating {
  rate: number;
  _id: string;
  playerId: string;
}
